// 字卡传讯 · 数据备份与导入：本站备份、milk 全量备份（v4 json / v5 zip）、milk 字卡包；导出字卡包
// 依赖 state.js、shell.js、lib.js（cleanTag / itemText / isAtmo / lbColor / mainTags / lbUnempty / refreshLib）、look.js（needZip）
'use strict';
function chkRow(k,label,n,on){return n?'<label><input type="checkbox" data-o="'+k+'"'+(on?' checked':'')+'>'+label+'<span>'+n+'</span></label>':''}
function readOpts(w){var o={};w.querySelectorAll('[data-o]').forEach(function(i){o[i.dataset.o]=i.checked});return o}
function segPick(el,cb){
  el.addEventListener('click',function(e){
    var b=e.target.closest('[data-m]');if(!b)return;
    el.querySelectorAll('[data-m]').forEach(function(x){x.classList.toggle('on',x===b)});cb(b.dataset.m);
  });
}

// ── 字卡包 ──
// milk 里叫「状态」的回复分组，跟氛围感的「状态」撞名，改叫「状态卡」
function packTag(n){var t=cleanTag(n);return isAtmo(t)?(t+'卡').slice(0,8):t}
function packLines(d,o){
  var out=[],seen={};
  (d.customReplyGroups||[]).forEach(function(g){
    if(!g)return;var tag=packTag(g.name);
    (g.items||[]).forEach(function(t){t=itemText(t);if(!t)return;seen[t]=1;if(o.groups)out.push({tag:tag,text:t,off:!!g.disabled,color:g.color})});
  });
  if(o.loose)(d.customReplies||[]).forEach(function(t){t=itemText(t);if(t&&!seen[t]){seen[t]=1;out.push({tag:'未分组',text:t})}});
  if(o.kao)(d.kaomojiLibrary||d.kaomojis||[]).forEach(function(t){t=itemText(t);if(t)out.push({tag:'颜文字',text:t})});
  return out;
}
var PACK_ATMO=[['pokes','customPokes','拍一拍','拍一拍（进氛围感）'],['stats','customStatuses','状态','对方状态（进氛围感）'],['mottos','customMottos','每日一句','每日一句（milk 的顶部格言）']];
function packIntros(d){
  return (d.customIntros||[]).map(function(s){
    s=itemText(s);if(!s)return null;
    var p=s.split('|');return p.length>1?[p[0].trim(),p.slice(1).join('|').trim()]:['∞',s];
  }).filter(Boolean);
}
function packRows(d){
  var gs=(d.customReplyGroups||[]).filter(function(g){return g&&(g.items||[]).length}).length;
  var h=chkRow('groups','主字卡（'+gs+' 个分组）',packLines(d,{groups:1}).length,true)
    +chkRow('loose','没分组的散句',packLines(d,{loose:1}).length,true)
    +chkRow('kao','颜文字（单独一组）',packLines(d,{kao:1}).length,false);
  PACK_ATMO.forEach(function(a){h+=chkRow(a[0],a[3],(d[a[1]]||[]).length,true)});
  return h+chkRow('intros','开屏文案',packIntros(d).length,false);
}
function addTag(tag,arr,rep){
  arr=(Array.isArray(arr)?arr:[]).map(itemText).filter(Boolean);
  if(!arr.length)return 0;
  if(rep)S.lib=S.lib.filter(function(x){return x.tag!==tag});
  var have={},n=0;
  S.lib.forEach(function(x){if(x.tag===tag)have[x.text]=1});
  arr.forEach(function(t){if(have[t])return;have[t]=1;S.lib.push({id:uid(),tag:tag,text:t});n++});
  lbUnempty(tag);return n;
}
// 按勾选写进库，返回新加了几句。替换只清主字卡；氛围感各组勾了哪个就替换哪个
function applyPack(d,o,rep){
  var add=0,lines=packLines(d,o);
  if(rep&&(o.groups||o.loose||o.kao)){
    S.lib=S.lib.filter(function(x){return isAtmo(x.tag)});
    S.libOff=S.libOff.filter(function(t){return isAtmo(t)});
  }
  var have={};
  S.lib.forEach(function(x){have[x.tag+'\u0001'+x.text]=1});
  lines.forEach(function(x){
    if(x.off&&S.libOff.indexOf(x.tag)<0)S.libOff.push(x.tag);
    if(x.color&&!S.libColors[x.tag])S.libColors[x.tag]=x.color;
    var k=x.tag+'\u0001'+x.text;if(have[k])return;have[k]=1;
    S.lib.push({id:uid(),tag:x.tag,text:x.text});lbUnempty(x.tag);add++;
  });
  PACK_ATMO.forEach(function(a){if(o[a[0]])add+=addTag(a[2],d[a[1]],rep)});
  if(o.intros){var it=packIntros(d);if(it.length)S.prefs.intros=it}
  return add;
}
function openPackImport(d){
  var rows=packRows(d);
  if(!rows){alert('这个字卡包里没有能用的字卡。');return}
  var w=document.createElement('div');
  w.innerHTML='<div class="chk">'+rows+'</div><div class="seg" id="pkMode"><button type="button" data-m="merge" class="on">合并进库</button><button type="button" data-m="replace">替换</button></div>'
    +'<button type="button" class="primary" id="pkGo" style="width:100%">收 进 库</button>'
    +'<p class="hint">合并会跳过库里已经有的同一句。milk 里关掉的分组，导进来也是关着的。替换只换勾上的那几类。</p>';
  var mode='merge';segPick(w.querySelector('#pkMode'),function(m){mode=m});
  w.querySelector('#pkGo').addEventListener('click',function(){
    var o=readOpts(w);
    if(mode==='replace'&&!confirm('勾上的几类会先清掉再导入，确定？'))return;
    var bak=JSON.stringify({lib:S.lib,off:S.libOff,col:S.libColors,it:S.prefs.intros});
    var add=applyPack(d,o,mode==='replace');
    if(!save()){var b=JSON.parse(bak);S.lib=b.lib;S.libOff=b.off;S.libColors=b.col;S.prefs.intros=b.it;save();alert('存不下了，没导进去。');return}
    refreshLib();closeSheet();alert('收进来 '+add+' 句。');
  });
  openSheet('导入字卡包',w,{full:true});
}
function exportPack(){
  var base=Date.now();
  function texts(t){return uniqArr(S.lib.filter(function(x){return x.tag===t}).map(function(x){return x.text}))}
  var groups=mainTags().map(function(g,i){return{id:base+i,name:g.tag,color:lbColor(g.tag),disabled:S.libOff.indexOf(g.tag)>=0,items:texts(g.tag)}});
  var plain=uniqArr(S.lib.filter(function(x){return !isAtmo(x.tag)}).map(function(x){return x.text}));
  downloadJSON({exportDate:new Date().toISOString(),modules:['replies','groups','pokes','statuses','mottos'],
    customReplies:plain,customReplyGroups:groups,customPokes:texts('拍一拍'),customStatuses:texts('状态'),customMottos:texts('每日一句')},'reply-library-'+ymd()+'.json');
}

// ── 读文件：zip 先联网加载一次 JSZip，再把 media/ 里的图还原成 data url ──
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

// 按键名后缀从 milk 备份里找东西；同名多个时优先当前会话、优先 localforage
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
function arrOf(v){return Array.isArray(v)?v:[]}
function milkData(d){
  var g=milkGetter(d),st=g('chatSettings');if(!st||typeof st!=='object')st={};
  var names={me:String(st.myName||g('myName')||'').trim(),ta:String(st.partnerName||g('partnerName')||'').trim()};
  var meNm=names.me||meName(),taNm=names.ta||taName(),cards=[];
  arrOf(g('chatMessages')).forEach(function(m){
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
  var days=arrOf(g('anniversaries')).map(function(a){
    if(!a)return null;var dt=toYmd(a.date||a.startDate||a.time),tt=String(a.name||a.title||'').trim();
    return dt&&tt?{id:uid(),title:tt.slice(0,16),date:dt,kind:'up'}:null;
  }).filter(Boolean);
  var wall=[g('home_bg'),g('homeBackground'),g('home_background')].filter(isImg)[0]||'';
  var pack={customReplyGroups:arrOf(g('customReplyGroups')),customReplies:arrOf(g('customReplies')),kaomojiLibrary:arrOf(g('kaomojiLibrary')||g('kaomojis')),
    customIntros:arrOf(g('customIntros')),customPokes:arrOf(g('customPokes')),customStatuses:arrOf(g('customStatuses')),customMottos:arrOf(g('customMottos'))};
  return{names:names,imgs:{me:me,ta:ta},cards:cards,days:days,wall:wall,pack:pack};
}
function openMilkImport(d){
  var m=milkData(d),pk=m.pack,hasWho=m.names.me||m.names.ta||m.imgs.me||m.imgs.ta;
  var rows=packRows(pk)+chkRow('chat','聊天记录',m.cards.length,true)+chkRow('who','名字和头像',hasWho?'有':0,true)+chkRow('days','纪念日',m.days.length,true)+chkRow('wall','主页壁纸',m.wall?'有':0,false);
  if(!rows){alert('这个备份里没找到这边能用的东西。');return}
  var w=document.createElement('div');
  w.innerHTML='<div class="chk">'+rows+'</div><div class="field"><label>字卡和聊天记录</label><div class="seg" id="mkMode"><button type="button" data-m="merge" class="on">合并</button><button type="button" data-m="replace">替换</button></div></div>'
    +'<button type="button" class="primary" id="mkGo" style="width:100%">导 进 来</button>'
    +'<p class="hint">聊天记录只带文字，图片和表情包消息会跳过。头像和壁纸会压小再存，省地方。</p>';
  var mode='merge';segPick(w.querySelector('#mkMode'),function(x){mode=x});
  var btn=w.querySelector('#mkGo');
  btn.addEventListener('click',function(){
    var o=readOpts(w),rep=mode==='replace';
    if(rep&&!confirm('勾上的字卡和聊天记录会先清掉再导入，确定？'))return;
    btn.disabled=true;btn.textContent='导入中…';
    var bak=JSON.stringify(S);
    Promise.all([o.who?shrinkSafe(m.imgs.me,320,true,0.86):'',o.who?shrinkSafe(m.imgs.ta,320,true,0.86):'',o.wall?shrinkSafe(m.wall,1080,false,0.8):'']).then(function(r){
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
      if(o.wall&&r[2]){var id='w'+uid();S.prefs.wallImgs[id]=r[2];S.prefs.walls.home=id}
      if(!save()){S=JSON.parse(bak);save();btn.disabled=false;btn.textContent='导 进 来';alert('东西太多存不下，没导进去。少勾几项再试。');return}
      closeSheet();rerenderAll();
      alert('导进来了。字卡新加 '+add+' 句'+(o.chat?'，聊天 '+got+' 条':'')+'。');
    });
  });
  openSheet('导入 milk 备份',w,{full:true});
}

// ── 本站备份 ──
function restoreOwn(d){
  if(!confirm('导入会覆盖现在的全部数据，确定？'))return;
  var bak=JSON.stringify(S);
  S=fixState(Object.assign(defaults(),d));
  if(!save()){S=JSON.parse(bak);save();alert('存不下，没导进去。');return}
  closeSheet();rerenderAll();alert('回来了。');
}
// 换了一整份数据以后，各模块都重新画一遍
function rerenderAll(){
  ['applyLook','applyChat','applyFont','applyIcons','applyWall','applyBubbleCSS','stCheck','mailTick','moTick','planRing'].forEach(function(n){
    if(typeof window[n]==='function'){try{window[n]()}catch(e){console.error(e)}}
  });
  paintNames();go(curView());
}
// 一个入口认三种文件
function importAny(){
  pickFile('.json,.zip,application/json,application/zip',false,function(fs){
    readBackup(fs[0]).then(function(d){
      if(d&&Array.isArray(d.cards))return restoreOwn(d);
      if(isMilkFull(d))return openMilkImport(d);
      if(isPack(d))return openPackImport(d);
      alert('认不出这个文件。');
    }).catch(function(e){
      alert(e&&e.message==='zip'?'zip 备份要联网加载一次解压工具，检查网络再试。':'这个文件读不出来。');
    });
  });
}
function openData(){
  var used=0;try{used=(localStorage.getItem(KEY)||'').length*2}catch(e){}
  var w=document.createElement('div');
  w.innerHTML='<div class="menu-list set-grp">'
    +'<button type="button" class="mi" data-d="exp"><b>导出备份</b><span>json ›</span></button>'
    +'<button type="button" class="mi" data-d="imp"><b>导入备份</b><span>本站 / milk / 字卡包 ›</span></button>'
    +'<button type="button" class="mi" data-d="pack"><b>只导出字卡包</b><span>milk 能导入 ›</span></button></div>'
    +'<div class="menu-list set-grp" style="margin-top:12px"><button type="button" class="mi" data-d="clear"><b class="lb-danger">全部清空</b><span></span></button></div>'
    +'<p class="hint">现在存着 '+S.cards.length+' 张字卡记录、'+S.lib.length+' 句字卡库，大约占 '+kb(used)+'。<br>milk 的全量备份（.json 或 .zip）能导入字卡分组、拍一拍、状态、每日一句、聊天记录、名字头像、纪念日和主页壁纸。表情包、音乐这些这边没有，会跳过。导入的字体不在备份里，换手机要重新导。</p>';
  w.addEventListener('click',function(e){
    var b=e.target.closest('[data-d]');if(!b)return;var a=b.dataset.d;
    if(a==='exp')downloadJSON(S,'字卡-'+ymd()+'.json');
    if(a==='imp')importAny();
    if(a==='pack')exportPack();
    if(a==='clear'&&confirm('清空所有字卡、动态、信件和设置？')&&confirm('真的清？不能撤回。')){localStorage.removeItem(KEY);location.reload()}
  });
  subPage('数据备份与导入',w);
}
