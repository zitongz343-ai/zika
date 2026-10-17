// 字卡传讯 · 外观：日夜、配色、字体颜色和大小、聊天气泡和头像的样子、壁纸、板块图标、字体
// 依赖 state.js、shell.js、chat.js。设置里对应的几页也写在这里
'use strict';
var LOOK_T={
  paper:{n:'米白',accent:'#b07b62',bgA:'#f3e8d8',bgB:'#e4d2bb',ink:'#3a322a',sub:'#94816d'},
  rose:{n:'玫瑰',accent:'#b96f74',bgA:'#f7e5e5',bgB:'#efd3d3',ink:'#42312f',sub:'#a5898a'},
  sage:{n:'青草',accent:'#6f8a6d',bgA:'#e6ebdf',bgB:'#d3ddcb',ink:'#303a31',sub:'#7a887a'}
};
function hexRGB(h){h=String(h||'').replace('#','');if(h.length===3)h=h.replace(/./g,'$&$&');var n=parseInt(h,16);if(h.length!==6||isNaN(n))return [0,0,0];return [n>>16&255,n>>8&255,n&255]}
function mixRGB(a,b,t){var x=hexRGB(a),y=hexRGB(b);return x.map(function(v,i){return Math.round(v+(y[i]-v)*t)})}
function rgbS(a){return 'rgb('+a.join(',')+')'}
function rgbaS(a,al){return 'rgba('+a.join(',')+','+al+')'}
function lookBase(){return LOOK_T[S.theme]||LOOK_T.paper}
function palVal(k){var p=S.prefs.pal;return isHex(p[k])?p[k]:lookBase()[k]}

// ── 日夜和配色：日间用选的配色或自定义；夜间用夜间配色，只带上自定义的主色 ──
var LOOK_VARS=['--accent','--bg-a','--bg-b','--blob1','--blob2','--blob3','--solid','--solid-2','--solid-3','--card-b','--ink','--sub'];
function applyLook(){
  var p=S.prefs,r=document.documentElement,st=r.style,dark=!!p.dark;
  r.dataset.theme=dark?'night':S.theme;r.dataset.style=S.style;
  LOOK_VARS.forEach(function(v){st.removeProperty(v)});
  if(p.pal.on){
    var ac=palVal('accent');st.setProperty('--accent',ac);
    if(!dark){
      var a=palVal('bgA'),b=palVal('bgB'),s3=rgbS(mixRGB(ac,'#ffffff',.84));
      st.setProperty('--bg-a',a);st.setProperty('--bg-b',b);
      st.setProperty('--blob1',rgbaS(hexRGB(ac),.3));st.setProperty('--blob2','rgba(255,255,255,.78)');st.setProperty('--blob3',rgbaS(hexRGB(b),.85));
      st.setProperty('--solid',rgbS(mixRGB(a,'#ffffff',.72)));st.setProperty('--solid-2',rgbS(mixRGB(a,'#ffffff',.3)));st.setProperty('--solid-3',s3);
      st.setProperty('--card-b',S.style==='glass'?rgbaS(mixRGB(ac,'#ffffff',.82),.5):s3);
    }
  }
  if(!dark){if(isHex(p.ink))st.setProperty('--ink',p.ink);if(isHex(p.sub))st.setProperty('--sub',p.sub)}
  var meta=document.querySelector('meta[name="theme-color"]');
  if(meta)meta.setAttribute('content',dark?'#17161c':(p.pal.on?palVal('bgA'):lookBase().bgA));
  txt('sbDark',dark?'☀ 日间':'☾ 夜间');
}
function toggleDark(){S.prefs.dark=!S.prefs.dark;save();applyLook()}
// 侧栏左下角是日夜切换
(function(){
  var b=$('sbDark')||$('sbStyle');if(!b)return;
  var n=b.cloneNode(false);n.id='sbDark';n.type='button';b.parentNode.replaceChild(n,b);
  n.addEventListener('click',toggleDark);
})();

// ── 气泡、头像、整体字号：都是根上的变量，改了马上生效 ──
var LAST_BUB='';
function applyChat(){
  var p=S.prefs,r=document.documentElement,st=r.style,kind=p.bubKind==='plain'?'plain':'note';
  r.dataset.bubble=kind;r.dataset.bubtime=p.bubTime?'1':'0';
  function col(v,k){st.setProperty(v,isHex(p[k])?p[k]:PREF_DEF[k])}
  col('--bub-me','bubMe');col('--bub-me-ink','bubMeInk');col('--bub-ta','bubTa');col('--bub-ta-ink','bubTaInk');
  var rad=Math.max(0,+p.bubR||0);
  st.setProperty('--bub-r',rad+'px');st.setProperty('--bub-tail-r',(p.bubTail?Math.min(rad,5):rad)+'px');
  st.setProperty('--bub-pad',(+p.bubPad||10)+'px');st.setProperty('--bub-max',(+p.bubMax||78)+'%');
  st.setProperty('--bub-sh',p.bubShadow?'0 3px 10px rgba(0,0,0,.08)':'none');
  var s=Math.max(20,+p.avSize||34);
  st.setProperty('--cav-s',s+'px');st.setProperty('--cav-r',p.avShape==='square'?Math.round(s*.26)+'px':'50%');
  st.setProperty('--fz',String(Math.max(70,+p.fontScale||100)/100));
  if(LAST_BUB&&LAST_BUB!==kind&&curView()==='chat')renderChat();
  LAST_BUB=kind;
}
var FZ=[['.card .body',15.5],['.card .head',10.5],['.quote p',14.5],['.entry b',15.5],['.entry span',10.5],['.hp-nm',13.5],['.hh-day',12],['.tab',15],['.sb-names',14.5],['.l4-card .t',14.5],['.lb-pill',12],['.l4-gh b',14],['.m2-text',15],['.m2-ia',12.5],['.mail-title',15],['.mail-prev',12.5],['.letter-body',15],['.fav p',15],['.mi',14],['.hint',11.5],['.chat-top .who:first-child .nm',16],['.t2-nm',16],['.qt',11.5],['.cl-subs p',14.5],['.poke',11],['#typing',11],['.pmeta',10.5]];
(function(){
  var st=document.createElement('style');st.id='lookFz';
  st.textContent=FZ.map(function(x){return 'html body '+x[0]+'{font-size:calc('+x[1]+'px * var(--fz,1))}'}).join('\n')
    +'\nhtml body #input{font-size:max(16px,calc(15px * var(--fz,1)))!important}'
    +'\nhtml[data-bubtime="0"] .pmeta .tm{display:none}';
  document.head.appendChild(st);
})();

// ── 壁纸：每个板块单独设，或者全部同步一张；能存成方案 ──
var WALL_VIEWS=['home','chat','lib','fav','moments','mail','tarot'];
var WALL_NAME={home:'主页',chat:'传讯',lib:'字卡库',fav:'收藏',moments:'朋友圈',mail:'信箱',tarot:'塔罗'};
var wallEl=$('wall');
if(!wallEl){wallEl=document.createElement('div');wallEl.id='wall';document.body.insertBefore(wallEl,document.body.firstChild)}
function wallPut(src){var m=S.prefs.wallImgs;for(var k in m)if(m[k]===src)return k;var id='w'+uid();m[id]=src;return id}
// 没有任何地方用到的图删掉，省地方
function wallGC(){
  var p=S.prefs,used={};
  function mark(all,ws){if(all)used[all]=1;WALL_VIEWS.forEach(function(v){var id=(ws||{})[v];if(id)used[id]=1})}
  mark(p.wallAll,p.walls);
  p.wallSchemes.forEach(function(s){mark(s.all,s.walls)});
  Object.keys(p.wallImgs).forEach(function(k){if(!used[k])delete p.wallImgs[k]});
}
function wallSrc(id){return id&&S.prefs.wallImgs[id]||''}
function wallOf(v){var p=S.prefs;return wallSrc(p.wallSync?p.wallAll:p.walls[v])}
function applyWall(v){
  v=v||curView();
  var src=wallOf(v);
  wallEl.style.backgroundImage=src?'url("'+src+'")':'';
  wallEl.style.setProperty('--dim',(+S.prefs.wallDim||0)/100);
  document.body.classList.toggle('has-wall',!!src);
}
// 切页面时：换壁纸，body 上挂 on-xxx，旧样式要用
onGo(function(v){
  WALL_VIEWS.forEach(function(x){document.body.classList.toggle('on-'+x,x===v)});
  applyWall(v);
});
// 改壁纸都走这里：存不下就整个退回去
function wallChange(fn){
  var p=S.prefs,bak=JSON.stringify({i:p.wallImgs,w:p.walls,a:p.wallAll,s:p.wallSchemes,y:p.wallSync,d:p.wallDim});
  fn(p);wallGC();
  if(!save()){
    var b=JSON.parse(bak);p.wallImgs=b.i;p.walls=b.w;p.wallAll=b.a;p.wallSchemes=b.s;p.wallSync=b.y;p.wallDim=b.d;save();
    alert('图太多存不下了。删掉几张壁纸或者几个方案再试。');return false;
  }
  applyWall();return true;
}
function wallPick(cb){pickImage(function(src){shrinkSafe(src,1080,false,0.78).then(function(u){if(!u){alert('这张读不出来，换一张试试。');return}cb(u)})})}
function openWallSet(){
  var w=document.createElement('div');
  w.innerHTML='<div class="seg" id="wsMode"><button type="button" data-m="sync">全部同步</button><button type="button" data-m="each">每个板块单独</button></div><div id="wsBox"></div>'
    +rr('遮一层底色','wallDim',0,80)
    +'<div class="sec">方案</div><div id="wsList"></div><button type="button" class="ghost" id="wsSave" style="width:100%;margin-top:10px">＋ 把现在这套存成方案</button>'
    +'<p class="hint">遮得多一点，字更清楚。方案只记用了哪几张图，同一张图存进几个方案也只占一份地方。</p>';
  var box=w.querySelector('#wsBox'),list=w.querySelector('#wsList');
  function bg(el,src){el.style.backgroundImage=src?'url("'+src+'")':''}
  function draw(){
    var p=S.prefs;
    w.querySelectorAll('#wsMode [data-m]').forEach(function(b){b.classList.toggle('on',(b.dataset.m==='sync')===!!p.wallSync)});
    if(p.wallSync){
      box.innerHTML='<div class="wallprev" id="wsPv"></div><div class="two" style="margin-bottom:12px"><button type="button" class="ghost" data-wp="__all" style="flex:1">选一张图</button><button type="button" class="ghost" data-wx="__all" style="flex:1">去掉</button></div>';
      var pv=box.querySelector('#wsPv'),s=wallSrc(p.wallAll);bg(pv,s);pv.textContent=s?'':'还没有壁纸，所有板块都会铺这一张';
    }else{
      box.innerHTML=WALL_VIEWS.map(function(v){return '<div class="wrow"><span class="wth" data-th="'+v+'"></span><span class="wnm">'+WALL_NAME[v]+'</span><button type="button" data-wp="'+v+'">换</button><button type="button" data-wx="'+v+'">去掉</button></div>'}).join('');
      box.querySelectorAll('[data-th]').forEach(function(el){bg(el,wallSrc(p.walls[el.dataset.th]))});
    }
    list.innerHTML=p.wallSchemes.length?'':'<p class="hint" style="margin:0">还没有存过方案。</p>';
    p.wallSchemes.forEach(function(s,i){
      var r=document.createElement('div');r.className='wsc';
      var fid=s.sync?s.all:WALL_VIEWS.map(function(v){return (s.walls||{})[v]}).filter(Boolean)[0];
      r.innerHTML='<span class="wth"></span><span class="wnm"></span><button type="button" data-a="use">用这套</button><button type="button" data-a="rm">删</button>';
      bg(r.querySelector('.wth'),wallSrc(fid));
      r.querySelector('.wnm').textContent=s.name+(s.sync?' · 同步':' · 分开');
      r.addEventListener('click',function(e){
        var b=e.target.closest('[data-a]');if(!b)return;
        if(b.dataset.a==='use')wallChange(function(p){p.wallSync=!!s.sync;p.wallAll=s.all||'';p.walls=clone(s.walls||{});if(typeof s.dim==='number')p.wallDim=s.dim});
        if(b.dataset.a==='rm'){if(!confirm('删掉方案「'+s.name+'」？'))return;wallChange(function(p){p.wallSchemes.splice(i,1)})}
        draw();paint();
      });
      list.appendChild(r);
    });
  }
  var paint=bindRanges(w,function(){applyWall()});
  w.addEventListener('click',function(e){
    var m=e.target.closest('#wsMode [data-m]');
    if(m){wallChange(function(p){p.wallSync=m.dataset.m==='sync'});draw();return}
    var pk=e.target.closest('[data-wp]'),x=e.target.closest('[data-wx]');
    if(pk){var k=pk.dataset.wp;wallPick(function(u){wallChange(function(p){var id=wallPut(u);if(k==='__all')p.wallAll=id;else p.walls[k]=id});draw()});return}
    if(x){var k2=x.dataset.wx;wallChange(function(p){if(k2==='__all')p.wallAll='';else delete p.walls[k2]});draw()}
  });
  w.querySelector('#wsSave').addEventListener('click',function(){
    var p=S.prefs,def='方案 '+(p.wallSchemes.length+1),n=prompt('给这套起个名字',def);
    if(n===null)return;n=n.trim().slice(0,16)||def;
    wallChange(function(p){p.wallSchemes.push({id:uid(),name:n,sync:!!p.wallSync,all:p.wallAll,walls:clone(p.walls),dim:+p.wallDim||0})});
    draw();
  });
  draw();subPage('壁纸',w);
}
function wallSummary(){var p=S.prefs;if(p.wallSync)return p.wallAll?'全部同步':'没有';var n=WALL_VIEWS.filter(function(v){return p.walls[v]}).length;return n?n+' 个板块':'没有'}

// ── 板块图标：侧栏和主页入口共用一套，符号或图片 ──
var IC_DEF={home:'⌂',chat:'▤',lib:'❏',fav:'☆',moments:'◍',mail:'\u2709\uFE0E',tarot:'✦'};
var IC_NAME={home:'主页',chat:'传讯',lib:'字卡库',fav:'收藏',moments:'朋友圈',mail:'信箱',tarot:'塔罗'};
function isImgVal(v){return /^(data:|https?:)/.test(v||'')}
function icHTML(k){var v=S.prefs.icons[k]||IC_DEF[k]||'';return isImgVal(v)?'<img src="'+esc(v)+'" alt="">':esc(v)}
function applyIcons(){
  document.querySelectorAll('#tabbar .tab').forEach(function(t){var i=t.querySelector('i');if(i)i.innerHTML=icHTML(t.dataset.view)});
  document.querySelectorAll('.entry[data-go]').forEach(function(e){
    var s=e.querySelector('.ei');
    if(!s){s=document.createElement('i');s.className='ei';e.appendChild(s)}
    s.innerHTML=icHTML(e.dataset.go);
  });
}
function openIconSet(){
  var w=document.createElement('div');
  w.innerHTML='<p class="hint" style="margin:0 0 12px">侧栏和主页入口用同一套。填一个符号或 emoji，也可以换成图片。</p>';
  Object.keys(IC_DEF).forEach(function(k){
    var row=document.createElement('div');row.className='icrow';
    row.innerHTML='<span class="nm2">'+IC_NAME[k]+'</span><span class="icprev"></span><input maxlength="4" placeholder="'+esc(IC_DEF[k])+'"><button type="button" data-a="img">图片</button><button type="button" data-a="def">默认</button>';
    var pv=row.querySelector('.icprev'),inp=row.querySelector('input');
    function paint(){pv.innerHTML=icHTML(k);var v=S.prefs.icons[k]||'';inp.value=isImgVal(v)?'':v}
    inp.addEventListener('change',function(){var v=inp.value.trim();if(v)S.prefs.icons[k]=v;else delete S.prefs.icons[k];save();applyIcons();paint()});
    row.addEventListener('click',function(e){
      var b=e.target.closest('[data-a]');if(!b)return;
      if(b.dataset.a==='def'){delete S.prefs.icons[k];save();applyIcons();paint()}
      if(b.dataset.a==='img')pickImage(function(src){shrinkSafe(src,96,true,0.9).then(function(u){
        if(!u)return;S.prefs.icons[k]=u;
        if(!save()){delete S.prefs.icons[k];save();alert('存不下，换一张小点的。');return}
        applyIcons();paint();
      })});
    });
    paint();w.appendChild(row);
  });
  subPage('板块图标',w);
}

// ── 字体：系统自带、联网的霞鹜文楷、自定义名字或链接、导入字体文件（存在 IndexedDB） ──
var FONTS=[
  {id:'serif',n:'宋体',d:'默认',f:''},
  {id:'sans',n:'苹方',d:'系统黑体',f:'-apple-system,BlinkMacSystemFont,"PingFang SC","Helvetica Neue",sans-serif'},
  {id:'kai',n:'楷体',d:'系统自带',f:'"Kaiti SC","STKaiti","KaiTi",serif'},
  {id:'round',n:'圆体',d:'系统自带',f:'"Yuanti SC","YouYuan",-apple-system,sans-serif'},
  {id:'wenkai',n:'霞鹜文楷',d:'要联网加载',f:'"LXGW WenKai Screen","Kaiti SC",serif',css:'https://cdn.jsdelivr.net/npm/lxgw-wenkai-screen-webfont/style.css'},
  {id:'custom',n:'自定义',d:'填字体名或链接',f:''}
];
function fontList(){
  var a=FONTS.slice();
  if(S.prefs.fontFile)a.splice(a.length-1,0,{id:'file',n:'导入的字体',d:S.prefs.fontFile,f:'"ZikaFile","Songti SC",serif'});
  return a;
}
function fontName(){var f=fontList().filter(function(x){return x.id===S.prefs.font.id})[0];return f?f.n:''}
function loadFontCss(url){
  var l=$('fontCss');
  if(!l){l=document.createElement('link');l.id='fontCss';l.rel='stylesheet';document.head.appendChild(l)}
  if(l.getAttribute('href')!==url)l.setAttribute('href',url);
}
var JSZIP_URL='https://cdn.jsdelivr.net/npm/jszip@3.10.1/dist/jszip.min.js';
function needZip(){
  if(window.JSZip)return Promise.resolve(window.JSZip);
  return new Promise(function(ok,no){
    var s=document.createElement('script');s.src=JSZIP_URL;
    s.onload=function(){window.JSZip?ok(window.JSZip):no(new Error('zip'))};
    s.onerror=function(){no(new Error('zip'))};document.head.appendChild(s);
  });
}
var FILE_FONT=null;
function fdb(){
  return new Promise(function(ok,no){
    if(!window.indexedDB){no(new Error('idb'));return}
    var r=indexedDB.open('zika_fonts',1);
    r.onupgradeneeded=function(){r.result.createObjectStore('f')};
    r.onsuccess=function(){ok(r.result)};r.onerror=function(){no(r.error)};
  });
}
function fPut(buf){return fdb().then(function(db){return new Promise(function(ok,no){var t=db.transaction('f','readwrite');t.objectStore('f').put(buf,'custom');t.oncomplete=function(){ok()};t.onerror=function(){no(t.error)};t.onabort=function(){no(t.error||new Error('abort'))}})})}
function fGet(){return fdb().then(function(db){return new Promise(function(ok,no){var q=db.transaction('f','readonly').objectStore('f').get('custom');q.onsuccess=function(){ok(q.result||null)};q.onerror=function(){no(q.error)}})})}
function useFontBuf(buf){
  if(window.FontFace&&document.fonts){
    return new FontFace('ZikaFile',buf.slice(0)).load().then(function(f){
      if(FILE_FONT&&FILE_FONT!==true){try{document.fonts.delete(FILE_FONT)}catch(e){}}
      document.fonts.add(f);FILE_FONT=f;return f;
    });
  }
  var st=$('fontFile');
  if(!st){st=document.createElement('style');st.id='fontFile';document.head.appendChild(st)}
  st.textContent='@font-face{font-family:"ZikaFile";src:url("'+URL.createObjectURL(new Blob([buf]))+'");font-display:swap}';
  FILE_FONT=true;return Promise.resolve(true);
}
function loadFileFont(){
  if(FILE_FONT)return Promise.resolve(FILE_FONT);
  return fGet().then(function(b){if(!b)throw new Error('none');return useFontBuf(b)});
}
function setFam(fam){
  var r=document.documentElement.style;
  if(fam){r.setProperty('--serif',fam);r.setProperty('--sans',fam)}
  else{r.removeProperty('--serif');r.removeProperty('--sans')}
}
function applyFont(){
  var f=S.prefs.font||{};
  var face=$('fontFace');
  if(!face){face=document.createElement('style');face.id='fontFace';document.head.appendChild(face)}
  face.textContent='';
  if(f.id==='file'){
    loadFileFont().then(function(){setFam('"ZikaFile","Songti SC",serif')})
      .catch(function(){S.prefs.font={id:'serif',name:'',url:''};save();setFam('')});
    return;
  }
  var o=FONTS.filter(function(x){return x.id===f.id})[0]||FONTS[0],fam=o.f;
  if(o.css)loadFontCss(o.css);
  if(o.id==='custom'){
    var url=(f.url||'').trim(),name=(f.name||'').trim();
    if(url&&/\.css(\?|$)/i.test(url))loadFontCss(url);
    else if(url){face.textContent='@font-face{font-family:"ZikaCustom";src:url("'+url.replace(/"/g,'')+'");font-display:swap}';name=name||'ZikaCustom'}
    fam=name?'"'+name.replace(/"/g,'')+'","Songti SC",serif':'';
  }
  setFam(fam);
}
function fontFromFile(x){
  return x.arrayBuffer().then(function(buf){
    var u=new Uint8Array(buf);
    if(!(u.length>3&&u[0]===0x50&&u[1]===0x4b))return {buf:buf,name:x.name||'字体'};
    return needZip().then(function(Z){return Z.loadAsync(buf)}).then(function(z){
      var ks=Object.keys(z.files).filter(function(k){return !z.files[k].dir&&!/__MACOSX|\/\._/.test(k)&&/\.(ttf|otf|woff2?|ttc)$/i.test(k)});
      if(!ks.length)throw new Error('nofont');
      return z.file(ks[0]).async('arraybuffer').then(function(b){return {buf:b,name:ks[0].split('/').pop()}});
    });
  });
}
function importFont(btn,done){
  pickFile('',false,function(fs){
    var x=fs[0],old=btn.textContent,got=null;
    btn.disabled=true;btn.textContent='读字体中…';
    fontFromFile(x).then(function(r){got=r;return useFontBuf(r.buf)}).then(function(){return fPut(got.buf)}).then(function(){
      S.prefs.fontFile=got.name.replace(/\.[^.]+$/,'').slice(0,24)||'字体';
      S.prefs.font={id:'file',name:'',url:''};
      save();applyFont();btn.disabled=false;btn.textContent=old;if(done)done();
    }).catch(function(e){
      btn.disabled=false;btn.textContent=old;
      var m=e&&e.message;
      alert(m==='zip'?'zip 要联网加载一次解压工具，检查网络再试。':m==='nofont'?'zip 里没找到 ttf / otf / woff 字体文件。':(e&&e.name==='QuotaExceededError')?'手机上的空间不够存这个字体了。':'这个文件读不出来，可能不是字体，或者格式不支持。');
    });
  });
}
function openFontSet(){
  var w=document.createElement('div');
  var list=document.createElement('div');list.className='fontlist';
  function paint(){list.querySelectorAll('[data-id]').forEach(function(b){b.classList.toggle('on',b.dataset.id===S.prefs.font.id)})}
  fontList().forEach(function(o){
    var b=document.createElement('button');b.type='button';b.dataset.id=o.id;
    b.innerHTML=esc(o.n)+'<small>'+esc(o.d)+'</small>';
    b.style.fontFamily=o.f||'"Songti SC","Noto Serif SC",serif';
    b.addEventListener('click',function(){S.prefs.font={id:o.id,name:S.prefs.font.name||'',url:S.prefs.font.url||''};save();applyFont();paint()});
    list.appendChild(b);
  });
  w.appendChild(list);
  var cf=document.createElement('div');
  cf.innerHTML='<div class="field"><label>自定义字体名</label><input id="fName" placeholder="比如 Kaiti SC"></div><div class="field"><label>或者字体链接（.ttf / .woff2 / .css）</label><input id="fUrl" placeholder="https://…"></div><button type="button" class="primary" id="fApply" style="width:100%">用 这 个</button><p class="hint">只填名字的话，要是手机上本来就有的字体。填链接每次打开页面会联网加载一次。</p>'
    +'<div class="sec">导入字体文件</div><button type="button" class="ghost" id="ffImp" style="width:100%">'+(S.prefs.fontFile?'换一个字体文件':'选一个字体文件')+'</button><p class="hint">支持 .ttf / .otf / .woff / .woff2，也可以是装着字体的 .zip。字体存在这台手机上，以后不用联网。中文字体一般好几 MB，导入要等几秒。备份文件里不带字体，换手机要重新导一次。</p>'
    +'<div class="sec">字体大小</div>'+rr('整体字号','fontScale',80,140,5)
    +'<p class="hint" style="font-size:calc(14px * var(--fz,1));color:var(--ink)">今天也想你。拖一下看这行字变多大。</p>'
    +'<button type="button" class="ghost" id="fzReset" style="width:100%">恢复 100%</button>';
  w.appendChild(cf);
  cf.querySelector('#fName').value=S.prefs.font.name||'';
  cf.querySelector('#fUrl').value=S.prefs.font.url||'';
  cf.querySelector('#fApply').addEventListener('click',function(){
    S.prefs.font={id:'custom',name:cf.querySelector('#fName').value.trim(),url:cf.querySelector('#fUrl').value.trim()};
    save();applyFont();paint();
  });
  cf.querySelector('#ffImp').addEventListener('click',function(){importFont(this,openFontSet)});
  var paintR=bindRanges(cf,function(){applyChat()});
  cf.querySelector('#fzReset').addEventListener('click',function(){S.prefs.fontScale=100;save();applyChat();paintR()});
  paint();subPage('全局字体',w);
}

// ── 材质与配色 ──
function openLook(){
  var w=document.createElement('div');w.className='v23';
  function crow(label,k,v){return '<label class="v23-crow"><span>'+label+'</span><input type="color" data-pal="'+k+'" value="'+v+'"></label>'}
  function inkRow(label,k){
    var own=isHex(S.prefs[k]);
    return '<div class="v23-crow"><span>'+label+'</span><em>'+(own?'':'跟随配色')+'</em><input type="color" data-ink="'+k+'" value="'+(own?S.prefs[k]:lookBase()[k])+'"><button type="button" data-fol="'+k+'">跟随</button></div>';
  }
  function draw(){
    var p=S.prefs;
    w.innerHTML='<div class="field"><label>日间 / 夜间</label><div class="seg" data-g="dark"><button type="button" data-v="0">☀ 日间</button><button type="button" data-v="1">☾ 夜间</button></div></div>'
      +'<div class="field"><label>材质</label><div class="seg" data-g="style"><button type="button" data-v="glass">毛玻璃</button><button type="button" data-v="solid">纯色</button></div></div>'
      +'<div class="field"><label>配色</label><div class="swatches" id="lkSw"></div></div>'
      +(p.pal.on?'<div class="v23-card">'+crow('主色','accent',palVal('accent'))+crow('背景（上）','bgA',palVal('bgA'))+crow('背景（下）','bgB',palVal('bgB'))+'</div>':'')
      +'<div class="sec">字体颜色</div><div class="v23-card">'+inkRow('正文','ink')+inkRow('浅色字','sub')+'</div>'
      +'<p class="hint">最后那个彩色圆点是自定义配色。夜间模式用夜间的颜色，自定义的背景和字体颜色只在日间生效，主色日夜都用。</p>'
      +'<button type="button" class="ghost" data-rs="1" style="width:100%;margin-top:12px">恢复默认配色</button>';
    w.querySelectorAll('[data-g="dark"] [data-v]').forEach(function(b){b.classList.toggle('on',(b.dataset.v==='1')===!!p.dark)});
    w.querySelectorAll('[data-g="style"] [data-v]').forEach(function(b){b.classList.toggle('on',b.dataset.v===S.style)});
    var sw=w.querySelector('#lkSw');
    Object.keys(LOOK_T).forEach(function(id){
      var t=LOOK_T[id],b=document.createElement('button');b.type='button';
      b.className='sw'+(!p.pal.on&&S.theme===id?' on':'');b.dataset.th=id;b.style.background=t.bgA;b.setAttribute('aria-label',t.n);
      var i=document.createElement('i');i.style.background=t.accent;b.appendChild(i);sw.appendChild(b);
    });
    var c=document.createElement('button');c.type='button';c.className='sw custom'+(p.pal.on?' on':'');c.dataset.th='custom';c.setAttribute('aria-label','自定义配色');
    c.appendChild(document.createElement('i'));sw.appendChild(c);
  }
  w.addEventListener('click',function(e){
    var p=S.prefs,t=e.target;
    var sb=t.closest('.seg [data-v]');
    if(sb){var g=sb.parentNode.dataset.g;if(g==='dark')p.dark=sb.dataset.v==='1';if(g==='style')S.style=sb.dataset.v;save();applyLook();draw();return}
    var th=t.closest('[data-th]');
    if(th){
      if(th.dataset.th==='custom'){
        if(!p.pal.on){var b=lookBase();['accent','bgA','bgB'].forEach(function(k){if(!isHex(p.pal[k]))p.pal[k]=b[k]});p.pal.on=true}
      }else{S.theme=th.dataset.th;p.pal.on=false}
      save();applyLook();draw();return;
    }
    var f=t.closest('[data-fol]');if(f){p[f.dataset.fol]='';save();applyLook();draw();return}
    if(t.closest('[data-rs]')){p.pal={on:false,accent:'',bgA:'',bgB:''};p.ink='';p.sub='';save();applyLook();draw()}
  });
  w.addEventListener('input',function(e){
    var t=e.target,p=S.prefs;
    if(t.dataset.pal){p.pal[t.dataset.pal]=t.value;applyLook()}
    if(t.dataset.ink){p[t.dataset.ink]=t.value;applyLook();var em=t.parentNode.querySelector('em');if(em)em.textContent=''}
  });
  w.addEventListener('change',function(e){if(e.target.dataset.pal||e.target.dataset.ink)save()});
  draw();subPage('材质与配色',w);
}
function lookSummary(){return S.prefs.pal.on?'自定义':lookBase().n+' · '+(S.style==='glass'?'毛玻璃':'纯色')}

// ── 聊天气泡：便签（默认）/ 普通气泡。预览直接用真的字卡画 ──
var BUB_KEYS=['bubKind','bubMe','bubMeInk','bubTa','bubTaInk','bubR','bubTail','bubPad','bubMax','bubShadow','bubTime'];
function bubPreview(box){
  box.innerHTML='';
  var t=Date.now();
  box.appendChild(cardEl({id:'pv_ta',from:'ta',text:'吃饭了没。',at:t-60000}));
  box.appendChild(cardEl({id:'pv_me',from:'me',text:'吃了，不是面包。',at:t,read:true}));
}
function openBubble(){
  var w=document.createElement('div');w.className='v23';
  function bc(label,k){return '<label class="v23-crow"><span>'+label+'</span><input type="color" data-bk="'+k+'"></label>'}
  w.innerHTML='<div class="seg" data-sg="bubKind"><button type="button" data-v="note">便签</button><button type="button" data-v="plain">普通气泡</button></div>'
    +'<div class="v23-prev" id="bkPrev"></div>'
    +'<p class="hint" id="bkNote">便签是原来那种：有一点歪，带名字和小印章。</p>'
    +'<div id="bkPlain"><div class="sec">颜色</div><div class="v23-card">'+bc('我的气泡','bubMe')+bc('我的字','bubMeInk')+bc('他的气泡','bubTa')+bc('他的字','bubTaInk')+'</div>'
    +'<div class="sec">形状</div>'+rr('圆角','bubR',0,28)+rr('内边距','bubPad',4,18)+rr('最宽','bubMax',55,95)
    +'<div class="chk">'+ckRow('bubTail','小尾巴','靠底那个角收尖')+ckRow('bubShadow','阴影','')+ckRow('bubTime','显示时间','')+'</div></div>'
    +'<details class="v23-css"><summary>自定义 CSS</summary><p class="hint" style="margin-top:6px">写 CSS 声明就行，会套到字卡上；也可以写整段规则，比如 .card.me{…}。两种样式都能叠。</p><textarea id="bubbleBox" class="l4-ta" style="min-height:120px;font-family:ui-monospace,Menlo,monospace" placeholder="background:#fff;border-radius:20px;"></textarea><div class="two" style="margin-top:10px"><button type="button" class="ghost" id="bkCssClr" style="flex:1">清空</button><button type="button" class="primary" id="bkCssOk" style="flex:1">应用 CSS</button></div></details>'
    +'<button type="button" class="ghost" id="bkReset" style="width:100%;margin-top:14px">恢复默认</button>';
  var prev=w.querySelector('#bkPrev');
  function paint(){
    var plain=S.prefs.bubKind==='plain';
    w.querySelector('#bkPlain').hidden=!plain;w.querySelector('#bkNote').hidden=plain;
    w.querySelectorAll('[data-bk]').forEach(function(i){i.value=isHex(S.prefs[i.dataset.bk])?S.prefs[i.dataset.bk]:PREF_DEF[i.dataset.bk]});
    w.querySelectorAll('[data-ck]').forEach(function(i){i.checked=!!S.prefs[i.dataset.ck]});
    bubPreview(prev);
  }
  bindSeg(w,function(){applyChat();paint()});
  bindChecks(w,function(){applyChat();bubPreview(prev)});
  var paintR=bindRanges(w,function(){applyChat()});
  w.addEventListener('input',function(e){var k=e.target.dataset.bk;if(k){S.prefs[k]=e.target.value;applyChat()}});
  w.addEventListener('change',function(e){if(e.target.dataset.bk)save()});
  var box=w.querySelector('#bubbleBox');box.value=S.bubbleCSS||'';
  w.querySelector('#bkCssOk').addEventListener('click',function(){S.bubbleCSS=box.value.trim();save();applyBubbleCSS()});
  w.querySelector('#bkCssClr').addEventListener('click',function(){S.bubbleCSS='';box.value='';save();applyBubbleCSS()});
  w.querySelector('#bkReset').addEventListener('click',function(){
    BUB_KEYS.forEach(function(k){S.prefs[k]=PREF_DEF[k]});save();applyChat();paintR();
    w.querySelectorAll('.seg[data-sg] [data-v]').forEach(function(b){b.classList.toggle('on',b.dataset.v===S.prefs.bubKind)});
    paint();
  });
  paint();subPage('聊天气泡',w);
}

// ── 聊天头像：开关、圆形 / 方角、大小 ──
function openAvSet(){
  var w=document.createElement('div');w.className='v23';
  w.innerHTML='<div class="chk">'+ckRow('msgAv','每句话显示头像','关着的话传讯页看不到')+'</div>'
    +'<div class="field"><label>形状</label><div class="seg" data-sg="avShape"><button type="button" data-v="round">圆形</button><button type="button" data-v="square">方角</button></div></div>'
    +rr('大小','avSize',24,56,2)
    +'<div class="v23-avp"><div class="crow ta"><span class="cav" id="avP1"></span><span class="v23-ph"></span></div><div class="crow me"><span class="cav" id="avP2"></span><span class="v23-ph"></span></div></div>';
  setAv(w.querySelector('#avP1'),S.ta);setAv(w.querySelector('#avP2'),S.me);
  var ph=w.querySelectorAll('.v23-ph');ph[0].textContent=taName();ph[1].textContent=meName();
  bindChecks(w,function(){if(curView()==='chat')renderChat()});
  bindSeg(w,function(){applyChat()});
  bindRanges(w,function(){applyChat()});
  subPage('聊天头像',w);
}
function avSummary(){if(!S.prefs.msgAv)return '不显示';return (S.prefs.avShape==='square'?'方角':'圆形')+' · '+S.prefs.avSize+'px'}

onBoot(function(){
  applyLook();applyChat();applyIcons();applyFont();applyWall('home');
  // 「回信」统一叫「信箱」
  var t=document.querySelector('#tabbar .tab[data-view="mail"] span');if(t)t.textContent='信箱';
  var e=document.querySelector('.entry[data-go="mail"]');
  if(e){var b=e.querySelector('b'),s=e.querySelector('span');if(b)b.textContent='信箱';if(s)s.textContent='寄出去，等他回'}
});
