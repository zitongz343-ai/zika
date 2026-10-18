// 图片大仓 · media.js
// 表情包、壁纸、头像、照片这些图搬进 IndexedDB，localStorage 里只留一行短引用。
// 做法：在 app.js 跑起来之前裹住 localStorage 的读写，只认 mj_zika_v2 这一个键。
//   写：把 data:image 换成 "idb:xxx"，图存进仓
//   读：把 "idb:xxx" 换回真图
// app.js 一行都不用改。IndexedDB 用不了（无痕模式之类）就什么都不做，照旧全存 localStorage。

(function(){

var KEY='mj_zika_v2',DB='zika_media',STORE='img',VER=1;
var MEM=Object.create(null);   // id -> data url
var SIG=Object.create(null);   // 短签名 -> id，省得每次存都重算一遍
var db=null,ok=false,queue=[],writing=false,warned=false;
var rawGet=null;               // 原生 getItem，算真实占用用

var RE_REF=/"idb:([A-Za-z0-9_]+)"/g;
var RE_IMG=/"data:image\/[a-zA-Z.+-]+;base64,[A-Za-z0-9+\/=]+"/g;

function h1(s){var h=5381;for(var i=0;i<s.length;i++)h=((h<<5)+h+s.charCodeAt(i))|0;return(h>>>0).toString(36)}
function h2(s){var h=2166136261;for(var i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619)}return(h>>>0).toString(36)}
function sig(u){return u.length+'|'+u.slice(24,88)+'|'+u.slice(-24)}
function idOf(u){
  var k=sig(u);
  if(SIG[k])return SIG[k];
  var id='m'+u.length.toString(36)+'_'+h1(u)+h2(u);
  SIG[k]=id;return id;
}

function openDB(){
  return new Promise(function(res,rej){
    if(!window.indexedDB){rej(new Error('no indexedDB'));return}
    var r=indexedDB.open(DB,VER);
    r.onupgradeneeded=function(){
      var d=r.result;
      if(!d.objectStoreNames.contains(STORE))d.createObjectStore(STORE,{keyPath:'id'});
    };
    r.onsuccess=function(){res(r.result)};
    r.onerror=function(){rej(r.error||new Error('open'))};
    r.onblocked=function(){rej(new Error('blocked'))};
  });
}

function readAll(d){
  return new Promise(function(res,rej){
    var t=d.transaction(STORE,'readonly'),q=t.objectStore(STORE).openCursor();
    q.onsuccess=function(){
      var c=q.result;
      if(!c){res();return}
      var v=c.value;
      if(v&&v.id&&typeof v.u==='string'){MEM[v.id]=v.u;SIG[sig(v.u)]=v.id}
      c.continue();
    };
    t.onerror=function(){rej(t.error||new Error('read'))};
    t.onabort=function(){rej(t.error||new Error('abort'))};
  });
}

// 排队往仓里写。一次没写进去就留着，下次存或者退出前再试
function flush(){
  if(!ok||writing||!queue.length||!db)return;
  var batch=queue;queue=[];writing=true;
  new Promise(function(res,rej){
    var t=db.transaction(STORE,'readwrite'),s=t.objectStore(STORE);
    batch.forEach(function(id){var u=MEM[id];if(typeof u==='string')s.put({id:id,u:u})});
    t.oncomplete=function(){res()};
    t.onerror=function(){rej(t.error||new Error('put'))};
    t.onabort=function(){rej(t.error||new Error('abort'))};
  }).then(function(){
    writing=false;flush();
  },function(e){
    writing=false;queue=batch.concat(queue);
    console.error('[zika] 图片仓写不进去',e);
    if(!warned){
      warned=true;
      setTimeout(function(){alert('图没存进仓里，刚加的几张下次打开可能不在。先去设置里导一份备份。')},0);
    }
  });
}

// 开页面时清一次：存着的文字里没人引用的图，从仓里删掉
function gc(raw){
  if(!ok||!db)return;
  var used=Object.create(null),m;
  RE_REF.lastIndex=0;
  while((m=RE_REF.exec(raw||''))!==null)used[m[1]]=1;
  var dead=Object.keys(MEM).filter(function(id){return !used[id]});
  if(!dead.length)return;
  dead.forEach(function(id){delete SIG[sig(MEM[id])];delete MEM[id]});
  try{
    var t=db.transaction(STORE,'readwrite'),s=t.objectStore(STORE);
    dead.forEach(function(id){s.delete(id)});
  }catch(e){console.error('[zika] 清旧图失败',e)}
}

function wipe(){
  MEM=Object.create(null);SIG=Object.create(null);queue=[];
  if(!ok||!db)return;
  try{db.transaction(STORE,'readwrite').objectStore(STORE).clear()}catch(e){}
}

function pack(json){
  if(!ok)return json;
  var out=String(json).replace(RE_IMG,function(q){
    var u=q.slice(1,-1),id=idOf(u);
    if(MEM[id]!==u){MEM[id]=u;queue.push(id)}
    return '"idb:'+id+'"';
  });
  flush();
  return out;
}

function unpack(json){
  if(!ok)return json;
  return String(json).replace(RE_REF,function(q,id){
    var u=MEM[id];
    return u?JSON.stringify(u):'""';
  });
}

function stats(){
  var n=0,b=0;
  for(var k in MEM){n++;b+=MEM[k].length}
  return{ok:ok,count:n,bytes:Math.round(b*0.75),pending:queue.length};
}

// 文字真实占用：绕过 unpack 读原始值
function rawSize(){
  try{
    var g=rawGet||window.localStorage.getItem.bind(window.localStorage);
    return (g.call(window.localStorage,KEY)||'').length*2;
  }catch(e){return 0}
}

// 裹住 localStorage：只管 mj_zika_v2 这一个键，其余原样走
function hook(){
  var P=window.Storage&&window.Storage.prototype;
  if(!P)return false;
  var g=P.getItem,s=P.setItem,r=P.removeItem,c=P.clear;
  rawGet=g;
  P.getItem=function(k){
    var v=g.call(this,k);
    return(this===window.localStorage&&k===KEY&&typeof v==='string')?unpack(v):v;
  };
  P.setItem=function(k,v){
    if(this===window.localStorage&&k===KEY)return s.call(this,k,pack(String(v)));
    return s.call(this,k,v);
  };
  P.removeItem=function(k){
    if(this===window.localStorage&&k===KEY)wipe();
    return r.call(this,k);
  };
  P.clear=function(){
    if(this===window.localStorage)wipe();
    return c.call(this);
  };
  return true;
}

// 先把仓里的图读进内存，再按顺序加载传进来的脚本（app.js 一跑就要读 localStorage）
function boot(list){
  var srcs=[].concat(list||[]),started=false;
  function load(){
    if(started)return;started=true;
    (function next(i){
      if(i>=srcs.length)return;
      var el=document.createElement('script');
      el.src=srcs[i];
      el.onload=el.onerror=function(){next(i+1)};
      (document.body||document.documentElement).appendChild(el);
    })(0);
  }
  var guard=setTimeout(function(){console.error('[zika] 图片仓打开太慢，先起页面');load()},8000);
  openDB().then(function(d){
    db=d;
    return readAll(d).then(function(){
      ok=hook();
      if(ok)gc(rawGet?rawGet.call(window.localStorage,KEY)||'':'');
    });
  }).catch(function(e){
    ok=false;
    console.error('[zika] 图片仓用不了，先照旧存着',e);
  }).then(function(){clearTimeout(guard);load()},function(){clearTimeout(guard);load()});
}

window.addEventListener('pagehide',flush);
document.addEventListener('visibilitychange',function(){if(document.visibilityState==='hidden')flush()});

window.ZikaMedia={boot:boot,pack:pack,unpack:unpack,stats:stats,rawSize:rawSize,flush:flush};

})();
