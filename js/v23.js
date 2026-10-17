// v23：日夜模式、自定义配色和字体颜色、整体字号、普通气泡、聊天头像方角和大小、设置全屏
'use strict';
var LOOK_T={
  paper:{n:'米白',accent:'#b07b62',bgA:'#f3e8d8',bgB:'#e4d2bb',ink:'#3a322a',sub:'#94816d'},
  rose:{n:'玫瑰',accent:'#b96f74',bgA:'#f7e5e5',bgB:'#efd3d3',ink:'#42312f',sub:'#a5898a'},
  sage:{n:'青草',accent:'#6f8a6d',bgA:'#e6ebdf',bgB:'#d3ddcb',ink:'#303a31',sub:'#7a887a'}
};
var V23_DEF={dark:false,ink:'',sub:'',fontScale:100,bubKind:'note',bubMe:'#b9787d',bubMeInk:'#ffffff',bubTa:'#ffffff',bubTaInk:'#3a322a',bubR:18,bubTail:true,bubPad:10,bubMax:78,bubShadow:true,bubTime:true,avShape:'round',avSize:34};
var BUB_KEYS=['bubKind','bubMe','bubMeInk','bubTa','bubTaInk','bubR','bubTail','bubPad','bubMax','bubShadow','bubTime'];
function v23Ensure(){
  var p=S.prefs,k;
  for(k in V23_DEF)if(p[k]===undefined||p[k]===null)p[k]=V23_DEF[k];
  if(!p.pal||typeof p.pal!=='object')p.pal={on:false,accent:'',bgA:'',bgB:''};
  if(S.theme==='night'){S.theme='paper';p.dark=true}
  if(!LOOK_T[S.theme])S.theme='paper';
}
var _ensureV23=ensurePrefs;
ensurePrefs=function(){_ensureV23();v23Ensure()};
v23Ensure();save();

function v23hex(h){h=String(h||'').replace('#','');if(h.length===3)h=h.replace(/./g,'$&$&');var n=parseInt(h,16);if(h.length!==6||isNaN(n))return [0,0,0];return [n>>16&255,n>>8&255,n&255]}
function v23isHex(s){return /^#[0-9a-f]{6}$/i.test(s||'')}
function v23mix(a,b,t){var x=v23hex(a),y=v23hex(b);return x.map(function(v,i){return Math.round(v+(y[i]-v)*t)})}
function v23rgb(arr){return 'rgb('+arr.join(',')+')'}
function v23rgba(arr,al){return 'rgba('+arr.join(',')+','+al+')'}
function lookBase(){return LOOK_T[S.theme]||LOOK_T.paper}
function palVal(k){var p=S.prefs.pal;return v23isHex(p[k])?p[k]:lookBase()[k]}

// 去掉：主页右上角材质按钮、主页底下那句、侧栏收起。侧栏左下换成日夜切换
paintStyleBtns=function(){};
(function(){
  var hf=document.querySelector('.home-foot');if(hf)hf.remove();
  var sc=$('sbClose');if(sc)sc.remove();
  var bs=$('btnStyle');if(bs)bs.remove();
  var sb=$('sbStyle');
  if(sb&&!$('sbDark')){
    var nb=sb.cloneNode(false);nb.id='sbDark';nb.type='button';
    sb.parentNode.replaceChild(nb,sb);
    nb.addEventListener('click',function(){S.prefs.dark=!S.prefs.dark;save();applyLook()});
  }
})();

// 配色：日间用选的配色或自定义；夜间用夜间配色，只带上自定义的主色
var LOOK_VARS=['--accent','--bg-a','--bg-b','--blob1','--blob2','--blob3','--solid','--solid-2','--solid-3','--card-b','--ink','--sub'];
function applyLook(){
  v23Ensure();
  var p=S.prefs,r=document.documentElement,st=r.style,dark=!!p.dark;
  r.dataset.theme=dark?'night':S.theme;r.dataset.style=S.style;
  LOOK_VARS.forEach(function(v){st.removeProperty(v)});
  if(p.pal.on){
    var ac=palVal('accent');st.setProperty('--accent',ac);
    if(!dark){
      var a=palVal('bgA'),b=palVal('bgB'),s3=v23rgb(v23mix(ac,'#ffffff',.84));
      st.setProperty('--bg-a',a);st.setProperty('--bg-b',b);
      st.setProperty('--blob1',v23rgba(v23hex(ac),.3));st.setProperty('--blob2','rgba(255,255,255,.78)');st.setProperty('--blob3',v23rgba(v23hex(b),.85));
      st.setProperty('--solid',v23rgb(v23mix(a,'#ffffff',.72)));st.setProperty('--solid-2',v23rgb(v23mix(a,'#ffffff',.3)));st.setProperty('--solid-3',s3);
      st.setProperty('--card-b',S.style==='glass'?v23rgba(v23mix(ac,'#ffffff',.82),.5):s3);
    }
  }
  if(!dark){if(v23isHex(p.ink))st.setProperty('--ink',p.ink);if(v23isHex(p.sub))st.setProperty('--sub',p.sub)}
  var meta=document.querySelector('meta[name="theme-color"]');
  if(meta)meta.setAttribute('content',dark?'#17161c':(p.pal.on?palVal('bgA'):lookBase().bgA));
  var d=$('sbDark');if(d)d.textContent=dark?'☀ 日间':'☾ 夜间';
}
applySkin=applyLook;

// 气泡、头像、字号都是根上的变量，改了马上生效
function applyChat(){
  var p=S.prefs,r=document.documentElement,st=r.style;
  r.dataset.bubble=p.bubKind==='plain'?'plain':'note';
  r.dataset.bubtime=p.bubTime?'1':'0';
  st.setProperty('--bub-me',v23isHex(p.bubMe)?p.bubMe:V23_DEF.bubMe);
  st.setProperty('--bub-me-ink',v23isHex(p.bubMeInk)?p.bubMeInk:V23_DEF.bubMeInk);
  st.setProperty('--bub-ta',v23isHex(p.bubTa)?p.bubTa:V23_DEF.bubTa);
  st.setProperty('--bub-ta-ink',v23isHex(p.bubTaInk)?p.bubTaInk:V23_DEF.bubTaInk);
  var rad=Math.max(0,+p.bubR||0);
  st.setProperty('--bub-r',rad+'px');st.setProperty('--bub-tail-r',(p.bubTail?Math.min(rad,5):rad)+'px');
  st.setProperty('--bub-pad',(+p.bubPad||10)+'px');st.setProperty('--bub-max',(+p.bubMax||78)+'%');
  st.setProperty('--bub-sh',p.bubShadow?'0 3px 10px rgba(0,0,0,.08)':'none');
  var s=Math.max(20,+p.avSize||34);
  st.setProperty('--cav-s',s+'px');st.setProperty('--cav-r',p.avShape==='square'?Math.round(s*.26)+'px':'50%');
  st.setProperty('--fz',String(Math.max(70,+p.fontScale||100)/100));
}
var FZ=[['.card .body',15.5],['.card .head',10.5],['.quote p',14.5],['.entry b',15.5],['.entry span',10.5],['.hp-nm',13.5],['.hh-day',12],['.tab',15],['.sb-names',14.5],['.l4-card .t',14.5],['.lb-pill',12],['.l4-gh b',14],['.m2-text',15],['.m2-ia',12.5],['.mail-title',15],['.mail-prev',12.5],['.letter-body',15],['.fav p',15],['.mi',14],['.hint',11.5],['.chat-top .who:first-child .nm',16],['.t2-nm',16],['.qt',11.5],['.cl-subs p',14.5],['.poke',11],['#typing',11]];
(function(){
  var st=$('v23fz');if(!st){st=document.createElement('style');st.id='v23fz';document.head.appendChild(st)}
  st.textContent=FZ.map(function(x){return 'html body '+x[0]+'{font-size:calc('+x[1]+'px * var(--fz,1))}'}).join('\n')
    +'\nhtml body #input{font-size:max(16px,calc(15px * var(--fz,1)))!important}';
})();
var _fmtV23=fmtPref;
fmtPref=function(k,v){
  if(k==='bubR'||k==='bubPad'||k==='avSize')return v+' px';
  if(k==='bubMax'||k==='fontScale')return v+'%';
  return _fmtV23(k,v);
};

// 材质与配色
openLook=function(){
  var w=document.createElement('div');w.className='v23';
  function crow(label,k,v){return '<label class="v23-crow"><span>'+label+'</span><input type="color" data-pal="'+k+'" value="'+v+'"></label>'}
  function inkRow(label,k){
    var p=S.prefs,own=v23isHex(p[k]);
    return '<div class="v23-crow"><span>'+label+'</span><em>'+(own?'':'跟随配色')+'</em><input type="color" data-ink="'+k+'" value="'+(own?p[k]:lookBase()[k])+'"><button type="button" data-fol="'+k+'">跟随</button></div>';
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
        if(!p.pal.on){var b=lookBase();['accent','bgA','bgB'].forEach(function(k){if(!v23isHex(p.pal[k]))p.pal[k]=b[k]});p.pal.on=true}
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
  draw();openSheet('材质与配色',w);
};

// 聊天气泡：便签（原来那种，默认）/ 普通气泡
openBubble=function(){
  var w=document.createElement('div');w.className='v23';
  function bc(label,k){return '<label class="v23-crow"><span>'+label+'</span><input type="color" data-bk="'+k+'"></label>'}
  function bt(k,label,sub){return '<label><input type="checkbox" data-bt="'+k+'">'+label+'<span>'+sub+'</span></label>'}
  w.innerHTML='<div class="seg" id="bkSeg"><button type="button" data-k="note">便签</button><button type="button" data-k="plain">普通气泡</button></div>'
    +'<div class="v23-prev" id="bkPrev"></div>'
    +'<p class="hint" id="bkNote">便签是原来那种：有一点歪，带名字和小印章。</p>'
    +'<div id="bkPlain"><div class="sec">颜色</div><div class="v23-card">'+bc('我的气泡','bubMe')+bc('我的字','bubMeInk')+bc('他的气泡','bubTa')+bc('他的字','bubTaInk')+'</div>'
    +'<div class="sec">形状</div>'+rr('圆角','bubR',0,28)+rr('内边距','bubPad',4,18)+rr('最宽','bubMax',55,95)
    +'<div class="chk">'+bt('bubTail','小尾巴','靠底那个角收尖')+bt('bubShadow','阴影','')+bt('bubTime','显示时间','')+'</div></div>'
    +'<details class="v23-css"><summary>自定义 CSS</summary><p class="hint" style="margin-top:6px">写 CSS 声明就行，会套到字卡上；也可以写整段规则，比如 .card.me{…}。两种样式都能叠。</p><textarea id="bubbleBox" class="l4-ta" style="min-height:120px;font-family:ui-monospace,Menlo,monospace" placeholder="background:#fff;border-radius:20px;"></textarea><div class="two" style="margin-top:10px"><button type="button" class="ghost" id="bkCssClr" style="flex:1">清空</button><button type="button" class="primary" id="bkCssOk" style="flex:1">应用 CSS</button></div></details>'
    +'<button type="button" class="ghost" id="bkReset" style="width:100%;margin-top:14px">恢复默认</button>';
  var prev=w.querySelector('#bkPrev');
  prev.innerHTML='<article class="card ta" style="--tilt:-.5deg"><div class="head"><span class="n"></span><span>19:30</span></div><p class="body">吃饭了没。</p><div class="seal"></div></article>'
    +'<article class="card me" style="--tilt:.6deg"><div class="head"><span class="n"></span><span>19:31</span><span class="rd">已读</span></div><p class="body">吃了，不是面包。</p><div class="seal"></div></article>';
  var ns=prev.querySelectorAll('.n'),ss=prev.querySelectorAll('.seal');
  ns[0].textContent=taName();ns[1].textContent=S.me.name||'我';
  ss[0].textContent=taName().slice(-1);ss[1].textContent=(S.me.name||'我').slice(-1);
  function paint(){
    var p=S.prefs,plain=p.bubKind==='plain';
    w.querySelectorAll('#bkSeg [data-k]').forEach(function(b){b.classList.toggle('on',b.dataset.k===(plain?'plain':'note'))});
    w.querySelector('#bkPlain').hidden=!plain;w.querySelector('#bkNote').hidden=plain;
    w.querySelectorAll('[data-bk]').forEach(function(i){i.value=v23isHex(p[i.dataset.bk])?p[i.dataset.bk]:V23_DEF[i.dataset.bk]});
    w.querySelectorAll('[data-bt]').forEach(function(i){i.checked=!!p[i.dataset.bt]});
  }
  var paintR=bindRanges(w,function(){applyChat()});
  w.querySelector('#bkSeg').addEventListener('click',function(e){
    var b=e.target.closest('[data-k]');if(!b)return;
    S.prefs.bubKind=b.dataset.k;save();applyChat();paint();
  });
  w.addEventListener('input',function(e){var k=e.target.dataset.bk;if(k){S.prefs[k]=e.target.value;applyChat()}});
  w.addEventListener('change',function(e){
    var t=e.target;
    if(t.dataset.bk)save();
    if(t.dataset.bt){S.prefs[t.dataset.bt]=t.checked;save();applyChat()}
  });
  var box=w.querySelector('#bubbleBox');box.value=S.bubbleCSS||'';
  w.querySelector('#bkCssOk').addEventListener('click',function(){S.bubbleCSS=box.value.trim();save();applyBubbleCSS()});
  w.querySelector('#bkCssClr').addEventListener('click',function(){S.bubbleCSS='';box.value='';save();applyBubbleCSS()});
  w.querySelector('#bkReset').addEventListener('click',function(){
    BUB_KEYS.forEach(function(k){S.prefs[k]=V23_DEF[k]});save();applyChat();paint();paintR();
  });
  paint();openSheet('聊天气泡',w);
};

// 聊天头像：开关、圆形 / 方角、大小
function openAvSet(){
  var w=document.createElement('div');w.className='v23';
  w.innerHTML='<div class="chk"><label><input type="checkbox" id="avOn">每句话显示头像<span>关着的话传讯页看不到</span></label></div>'
    +'<div class="field"><label>形状</label><div class="seg" id="avSeg"><button type="button" data-v="round">圆形</button><button type="button" data-v="square">方角</button></div></div>'
    +rr('大小','avSize',24,56,2)
    +'<div class="v23-avp"><div class="crow ta"><span class="cav" id="avP1"></span><span class="v23-ph"></span></div><div class="crow me"><span class="cav" id="avP2"></span><span class="v23-ph"></span></div></div>';
  setAv(w.querySelector('#avP1'),S.ta);setAv(w.querySelector('#avP2'),S.me);
  var ph=w.querySelectorAll('.v23-ph');ph[0].textContent=taName();ph[1].textContent=S.me.name||'我';
  function paint(){
    w.querySelector('#avOn').checked=!!S.prefs.msgAv;
    w.querySelectorAll('#avSeg [data-v]').forEach(function(b){b.classList.toggle('on',b.dataset.v===S.prefs.avShape)});
  }
  w.querySelector('#avOn').addEventListener('change',function(){setMsgAv(this.checked)});
  w.querySelector('#avSeg').addEventListener('click',function(e){
    var b=e.target.closest('[data-v]');if(!b)return;
    S.prefs.avShape=b.dataset.v;save();applyChat();paint();
  });
  bindRanges(w,function(){applyChat()});
  paint();openSheet('聊天头像',w);
}

// 全局字体那页最下面加字号
var _ofV23=openFontSet;
openFontSet=function(){
  _ofV23();
  var box=document.createElement('div');
  box.innerHTML='<div class="sec">字体大小</div>'+rr('整体字号','fontScale',80,140,5)
    +'<p class="hint" style="font-size:calc(14px * var(--fz,1));color:var(--ink)">今天也想你。拖一下看这行字变多大。</p>'
    +'<button type="button" class="ghost" id="fzReset" style="width:100%">恢复 100%</button>';
  var paint=bindRanges(box,function(){applyChat()});
  box.querySelector('#fzReset').addEventListener('click',function(){S.prefs.fontScale=100;save();applyChat();paint()});
  sheetBody.appendChild(box);
};

// 设置和它下面的每一页都全屏
var _openSheetV23=openSheet;
openSheet=function(t,n){sheet.classList.remove('full');_openSheetV23(t,n)};
var _openSetV23=openSettings;
openSettings=function(){_openSetV23();sheet.classList.add('full')};
var _addBackV23=addBack;
addBack=function(){_addBackV23();if(!sheet.hidden)sheet.classList.add('full')};
// 设置里的「夜间模式」开关：原来的处理先改值，这里接着刷新颜色
sheetBody.addEventListener('click',function(e){if(e.target.closest('[data-sw="dark"]'))applyLook()});

SET_GROUPS.forEach(function(g){
  var it=g[1];
  if(g[0]==='外观'){
    if(!it.some(function(i){return i[0]==='sw:dark'}))it.unshift(['sw:dark','夜间模式']);
    it.forEach(function(i){
      if(i[0]==='openLook')i[2]=function(){return S.prefs.pal.on?'自定义':lookBase().n+' · '+(S.style==='glass'?'毛玻璃':'纯色')};
      if(i[0]==='openFontSet')i[2]=function(){var f=FONTS.filter(function(x){return x.id===S.prefs.font.id})[0];return(f?f.n:'')+' · '+S.prefs.fontScale+'%'};
    });
  }
  if(g[0]==='聊天'){
    if(!it.some(function(i){return i[0]==='openAvSet'})){
      var at=0;it.forEach(function(i,n){if(i[0]==='sw:msgAv')at=n+1});
      it.splice(at,0,['openAvSet','聊天头像',function(){return(S.prefs.avShape==='square'?'方角':'圆形')+' · '+S.prefs.avSize+'px'}]);
    }
    it.forEach(function(i){if(i[0]==='openBubble')i[2]=function(){return S.prefs.bubKind==='plain'?'普通气泡':'便签'}});
  }
});

var _rraV23=rerenderAll;
rerenderAll=function(){_rraV23();applyLook();applyChat()};
applyLook();applyChat();renderChat();updateNav();
