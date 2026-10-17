// v9：数据备份与导入。认三种文件：本站备份 json、milk 字卡包、milk 全量备份（v4 json / v5 zip）
function ymd(){var d=new Date();return d.getFullYear()+pad(d.getMonth()+1)+pad(d.getDate())}
function downloadJSON(obj,name){
  var blob=new Blob([JSON.stringify(obj)],{type:'application/json'});
  var a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=name;
  document.body.appendChild(a);a.click();
  setTimeout(function(){URL.revokeObjectURL(a.href);a.remove()},1500);
}
function kb(n){return n>1048576?(n/1048576).toFixed(1)+' MB':Math.ceil(n/1024)+' KB'}
function rerenderAll(){
  ensurePrefs();save();applySkin();applyBubbleCSS();paintNames();paintStyleBtns();applyAllPrefs();
  renderHome();renderChat();renderMoments();renderMail();renderDraws();if(LIB.built)drawLib();updateNav();
}

// 读文件：zip 的话先联网加载 JSZip（固定 3.10.1），再把 media/ 里的图还原成 data url
var JSZIP_URL='https://cdn.jsdelivr.net/npm/jszip@3.10.1/dist/jszip.min.js';
function needZip(){
  if(window.JSZip)return Promise.resolve(window.JSZip);
  return new Promise(function(ok,no){
    var s=document.createElement('script');s.src=JSZIP_URL;
    s.onload=function(){window.JSZip?ok(window.JSZip):no(new Error('zip'))};
    s.onerror=function(){no(new Error('zip'))};document.head.appendChild(s);
  });
}
function readZip(zip){
  var f=zip.file('backup.json');
  if(!f){var ns=Object.keys(zip.files).filter(function(n){return !zip.files[n].dir&&/\.json$/i.test(n)});if(ns.length)f=zip.file(ns[0])}
  if(!f)throw new Error('nojson');
  return f.async('string').then(function(t){
    if(t.charCodeAt(0)===0xFEFF)t=t.slice(1);
    var d=JSON.parse(t),idx=d.mediaIndex||{};d.mediaStore=d.mediaStore||{};
    return Promise.all(Object.keys(idx).map(function(id){
      var m=idx[id]||{},zf=zip.file(m.path||('media/'+id));if(!zf)return null;
      if(m.mime==='text/plain+dataurl')return zf.async('string').then(function(s){d.mediaStore[id]=s});
      return zf.async('base64').then(function(b){d.mediaStore[id]='data:'+(m.mime||'application/octet-stream')+';base64,'+b});
    })).then(function(){return d});
  });
}
function readBackup(file){
  return file.arrayBuffer().then(function(ab){
    var u=new Uint8Array(ab);
    if(u.length>3&&u[0]===0x50&&u[1]===0x4b)return needZip().then(function(Z){return Z.loadAsync(ab)}).then(readZip);
    var t=new TextDecoder('utf-8').decode(u);if(t.charCodeAt(0)===0xFEFF)t=t.slice(1);
    return JSON.parse(t);
  });
}
function isMilkFull(d){return d&&typeof d==='object'&&!Array.isArray(d.cards)&&(/chatapp-backup/.test(d.type||'')||!!d.localforage||!!d.indexedDB)}
function isPack(d){return d&&!d.localforage&&(Array.isArray(d.customReplyGroups)||Array.isArray(d.customReplies))}

// 从 milk 备份里按键名后缀找东西；同名多个时优先当前会话、优先 localforage
function milkGetter(d){
  var lf=Object.assign({},d.indexedDB||{},d.localforage||{}),ls=d.localStorage||{},ms=d.mediaStore||{},sid=d.sessionId||'';
  function inl(v){
    if(v&&typeof v==='object'){
      if(!Array.isArray(v)&&typeof v.__mRef==='string')return ms[v.__mRef]||'';
      if(Array.isArray(v))return v.map(inl);
      var o={};for(var k in v)if(Object.prototype.hasOwnProperty.call(v,k))o[k]=inl(v[k]);return o;
    }
    return v;
  }
  return function(name){
    var best=null;
    [lf,ls].forEach(function(src,si){Object.keys(src).forEach(function(k){
      if(k.slice(-name.length)!==name)return;
      var sc=(sid&&k.indexOf(sid)>=0?2:0)+(si===0?1:0);
      if(!best||sc>best.s)best={s:sc,v:src[k]};
    })});
    if(!best)return undefined;
    var v=best.v;if(typeof v==='string'){try{v=JSON.parse(v)}catch(e){}}
    return inl(v);
  };
}
function isImg(s){return typeof s==='string'&&/^(data:image|https?:)/.test(s)}
function toYmd(x){
  if(typeof x==='string'&&/^\d{4}-\d{2}-\d{2}/.test(x))return x.slice(0,10);
  var t=new Date(x);if(isNaN(t.getTime()))return '';
  return t.getFullYear()+'-'+pad(t.getMonth()+1)+'-'+pad(t.getDate());
}
function milkData(d){
  var g=milkGetter(d),st=g('chatSettings')||{};if(typeof st!=='object')st={};
  var names={me:String(st.myName||st.userName||g('myName')||'').trim(),ta:String(st.partnerName||g('partnerName')||'').trim()};
  var meNm=names.me||S.me.name||'我',taNm=names.ta||taName();
  var msgs=g('chatMessages');if(!Array.isArray(msgs))msgs=[];
  var cards=[];
  msgs.forEach(function(m){
    if(!m||m.type==='system')return;
    var t=String(m.text||'').trim();if(!t)return;
    var at=new Date(m.timestamp||m.time||Date.now()).getTime();if(isNaN(at))at=Date.now();
    var c={id:'mk'+(m.id||uid()),at:at,text:t};
    if(m.type==='poke'){c.from='ta';c.type='poke'}
    else{c.from=m.sender==='user'?'me':'ta';if(c.from==='me')c.read=true}
    var q=m.replyTo;
    if(q&&typeof q==='object'&&q.text)c.quote={name:q.sender==='user'?meNm:taNm,text:String(q.text)};
    cards.push(c);
  });
  var ta=[g('partnerAvatar'),g('home_avatar_partner')].filter(isImg)[0]||'';
  var me=[g('myAvatar'),g('home_avatar_me'),g('home_avatar_user'),g('home_avatar_my')].filter(isImg)[0]||'';
  var anns=g('anniversaries');if(!Array.isArray(anns))anns=[];
  var days=anns.map(function(a){
    if(!a)return null;var dt=toYmd(a.date||a.startDate||a.time);var tt=String(a.name||a.title||'').trim();
    return dt&&tt?{id:uid(),title:tt.slice(0,16),date:dt}:null;
  }).filter(Boolean);
  var wall=[g('home_bg'),g('homeBackground'),g('home_background')].filter(isImg)[0]||'';
  var pack={customReplyGroups:g('customReplyGroups')||[],customReplies:g('customReplies')||[],kaomojiLibrary:g('kaomojiLibrary')||g('kaomojis')||[],customIntros:g('customIntros')||[]};
  return{names:names,imgs:{me:me,ta:ta},cards:cards,days:days,wall:wall,pack:pack};
}

function openMilkImport(d){
  var m=milkData(d),pk=m.pack,hasWho=m.names.me||m.names.ta||m.imgs.me||m.imgs.ta;
  var rows=packRows(pk)+chkRow('chat','聊天记录',m.cards.length,true)+chkRow('who','名字和头像',hasWho?'有':0,true)+chkRow('days','纪念日',m.days.length,true)+chkRow('wall','主页壁纸',m.wall?'有':0,false);
  if(!rows){alert('这个备份里没找到这边能用的东西。');return}
  var w=document.createElement('div');
  w.innerHTML='<div class="chk">'+rows+'</div><div class="field"><label>字卡和聊天记录</label><div class="seg" id="mkMode"><button data-m="merge" class="on">合并</button><button data-m="replace">替换</button></div></div><button class="primary" id="mkGo" style="width:100%">导 进 来</button><p class="hint">聊天记录只带文字，图片和表情包消息会跳过。头像和壁纸会压小再存，省地方。</p>';
  var mode='merge';bindSeg(w.querySelector('#mkMode'),function(x){mode=x});
  var btn=w.querySelector('#mkGo');
  btn.addEventListener('click',function(){
    var o=readOpts(w),rep=mode==='replace';
    if(rep&&!confirm('勾上的字卡和聊天记录会先清掉再导入，确定？'))return;
    btn.disabled=true;btn.textContent='导入中…';
    var bak=JSON.stringify(S);
    Promise.all([o.who?shrinkSafe(m.imgs.me,320,true,0.86):'',o.who?shrinkSafe(m.imgs.ta,320,true,0.86):'',o.wall?shrinkSafe(m.wall,1400,false,0.82):'']).then(function(r){
      var add=applyPack(pk,o,rep),got=0;
      if(o.chat){
        if(rep)S.cards=[];
        var have={};S.cards.forEach(function(c){have[c.id]=1});
        m.cards.forEach(function(c){if(!have[c.id]){have[c.id]=1;S.cards.push(c);got++}});
        S.cards.sort(function(a,b){return a.at-b.at});
      }
      if(o.who){
        if(m.names.me)S.me.name=m.names.me.slice(0,12);if(m.names.ta)S.ta.name=m.names.ta.slice(0,12);
        if(r[0])S.me.img=r[0];if(r[1])S.ta.img=r[1];
      }
      if(o.days)m.days.forEach(function(x){if(!S.days.some(function(y){return y.title===x.title&&y.date===x.date}))S.days.push(x)});
      if(o.wall&&r[2])S.prefs.wall=r[2];
      if(!save()){S=JSON.parse(bak);save();btn.disabled=false;btn.textContent='导 进 来';alert('东西太多存不下，没导进去。少勾几项再试。');return}
      closeSheet();rerenderAll();
      alert('导进来了。字卡新加 '+add+' 句'+(o.chat?'，聊天 '+got+' 条':'')+'。');
    });
  });
  openSheet('导入 milk 备份',w);
}

function restoreOwn(d){
  if(!confirm('导入会覆盖现在的全部数据，确定？'))return;
  var bak=JSON.stringify(S);
  S=Object.assign(defaults(),d);S.from='me';S.autoReply=true;
  if(!save()){S=JSON.parse(bak);save();alert('存不下，没导进去。');return}
  closeSheet();rerenderAll();alert('回来了。');
}
// 一个入口认所有文件。file input 要在点击里同步触发，iOS 才肯弹选择框
function importAny(){
  var f=document.createElement('input');f.type='file';f.accept='.json,.zip,application/json,application/zip';f.hidden=true;
  document.body.appendChild(f);
  f.addEventListener('change',function(){
    var x=f.files&&f.files[0];f.remove();if(!x)return;
    readBackup(x).then(function(d){
      if(d&&Array.isArray(d.cards))return restoreOwn(d);
      if(isMilkFull(d))return openMilkImport(d);
      if(isPack(d))return openPackImport(d);
      alert('认不出这个文件。');
    }).catch(function(e){
      alert(e&&e.message==='zip'?'zip 备份要联网加载一次解压工具，检查网络再试。':'这个文件读不出来。');
    });
  });
  f.click();
}

function openData(){
  var used=0;try{used=(localStorage.getItem(KEY)||'').length*2}catch(e){}
  var w=document.createElement('div');
  w.innerHTML='<div class="menu-list"><button class="mi" data-d="exp"><span>导出备份</span><span>json</span></button><button class="mi" data-d="imp"><span>导入备份</span><span>本站 / milk 备份 / 字卡包</span></button><button class="mi" data-d="pack"><span>只导出字卡包</span><span>milk 能导入</span></button><button class="mi" data-d="clear"><span>全部清空</span><span></span></button></div>'
    +'<p class="hint">现在存着 '+S.cards.length+' 张字卡记录、'+S.lib.length+' 句字卡库，大约占 '+kb(used)+'。<br>milk 的全量备份（.json 或 .zip）能导入字卡分组、聊天记录、名字头像、纪念日和主页壁纸。表情包、朋友圈、音乐这些这边没有，会跳过。</p>';
  w.addEventListener('click',function(e){
    var b=e.target.closest('[data-d]');if(!b)return;var a=b.dataset.d;
    if(a==='exp')downloadJSON(S,'字卡-'+ymd()+'.json');
    if(a==='imp')importAny();
    if(a==='pack')exportPack();
    if(a==='clear'&&confirm('清空所有字卡、动态、信件和设置？')&&confirm('真的清？不能撤回。')){localStorage.removeItem(KEY);location.reload()}
  });
  openSheet('数据备份与导入',w);
}