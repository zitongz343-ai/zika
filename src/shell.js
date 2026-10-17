// 字卡传讯 · 外壳：页面切换、侧栏、弹层、开屏、主页、头像，还有各模块共用的表单和图片小工具
// 依赖 src/state.js。各模块用 onView / onGo / onWho / NAV_COUNT / HOME 挂进来，不再一层层改写别人的函数
'use strict';
var sheet=$('sheet'),sheetTitle=$('sheetTitle'),sheetBody=$('sheetBody'),reader=$('reader');
var VIEW_HOOK={},GO_HOOK=[],WHO_HOOK=[],BOOT_HOOK=[],NAV_COUNT={};
var HOME={day:null}; // 纪念日模块填进来：返回主页和侧栏那一行字
function onView(v,fn){VIEW_HOOK[v]=fn}
function onGo(fn){GO_HOOK.push(fn)}
function onWho(fn){WHO_HOOK.push(fn)}
function onBoot(fn){BOOT_HOOK.push(fn)}
function txt(id,v){var e=$(id);if(e)e.textContent=v}
function runHooks(list,arg){list.forEach(function(f){try{f(arg)}catch(e){console.error(e)}})}
function curView(){var v=document.querySelector('.view.on');return v?v.dataset.view:'home'}
function go(v){
  document.querySelectorAll('.view').forEach(function(x){x.classList.toggle('on',x.dataset.view===v)});
  document.querySelectorAll('#tabbar .tab').forEach(function(x){x.classList.toggle('on',x.dataset.view===v)});
  document.body.dataset.view=v;
  if(VIEW_HOOK[v]){try{VIEW_HOOK[v]()}catch(e){console.error(e)}}
  runHooks(GO_HOOK,v);
}

// ── 头像 ──
function setAv(el,who){
  if(!el)return;
  el.innerHTML='';
  if(who.img){var im=document.createElement('img');im.src=who.img;im.alt='';el.appendChild(im)}
  else el.textContent=who.avatar||'✦';
}
function avStr(who){return who.img?'<img src="'+esc(who.img)+'" alt="">':esc(who.avatar||'✦')}
function paintNames(){
  txt('hnMe',meName());txt('hnTa',taName());
  setAv($('hpMe'),S.me);setAv($('hpTa'),S.ta);
  document.title=taName()+' · 字卡传讯';
  runHooks(WHO_HOOK);
  updateNav();
}

// ── 图片和文件 ──
function readFileURL(f){return new Promise(function(ok,no){var fr=new FileReader();fr.onload=function(){ok(fr.result)};fr.onerror=no;fr.readAsDataURL(f)})}
// square=true 裁成 max×max 的正方形，否则长边缩到 max
function shrinkImg(src,max,square,q){
  return new Promise(function(ok,no){
    var im=new Image();
    if(/^https?:/.test(src))im.crossOrigin='anonymous';
    im.onload=function(){
      var w=im.width,h=im.height,sx=0,sy=0,sw=w,sh=h,cw,ch;
      if(square){var s=Math.min(w,h);sx=(w-s)/2;sy=(h-s)/2;sw=sh=s;cw=ch=max}
      else{var r=Math.min(1,max/Math.max(w,h));cw=Math.round(w*r);ch=Math.round(h*r)}
      var c=document.createElement('canvas');c.width=cw;c.height=ch;
      c.getContext('2d').drawImage(im,sx,sy,sw,sh,0,0,cw,ch);
      try{ok(c.toDataURL('image/jpeg',q||0.85))}catch(e){/^https?:/.test(src)?ok(src):no(e)}
    };
    im.onerror=no;im.src=src;
  });
}
function shrinkSafe(src,max,square,q){return src?shrinkImg(src,max,square,q).catch(function(){return ''}):Promise.resolve('')}
// file input 必须在点击里同步 click()，iOS 才肯弹选择框
function pickFile(accept,multiple,cb){
  var f=document.createElement('input');f.type='file';f.accept=accept;f.multiple=!!multiple;f.hidden=true;
  document.body.appendChild(f);
  f.addEventListener('change',function(){var fs=Array.prototype.slice.call(f.files||[]);f.remove();if(fs.length)cb(fs)});
  f.click();
}
function pickImage(cb){pickFile('image/*',false,function(fs){readFileURL(fs[0]).then(cb)})}
function pickAvatar(k){
  pickImage(function(src){shrinkSafe(src,320,true,0.86).then(function(u){
    if(!u){alert('这张读不出来，换一张试试。');return}
    var old=S[k].img;S[k].img=u;
    if(!save()){S[k].img=old;save();alert('这张存不下，换一张试试。');return}
    paintNames();
  })});
}
function downloadJSON(obj,name){
  var blob=new Blob([JSON.stringify(obj)],{type:'application/json'});
  var a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=name;
  document.body.appendChild(a);a.click();
  setTimeout(function(){URL.revokeObjectURL(a.href);a.remove()},1500);
}

// ── 侧栏 ──
function openNav(){updateNav();document.body.classList.add('nav-open')}
function closeNav(){document.body.classList.remove('nav-open')}
function updateNav(){
  setAv($('sbMe'),S.me);setAv($('sbTa'),S.ta);
  txt('sbNames',meName()+' × '+taName());
  txt('sbDay',HOME.day?HOME.day()||'':'');
  function cnt(el,v){var em=el.querySelector('em'),f=NAV_COUNT[v];if(em)em.textContent=f?String(f()||''):''}
  document.querySelectorAll('#tabbar .tab').forEach(function(t){cnt(t,t.dataset.view)});
  document.querySelectorAll('.entry[data-go]').forEach(function(e){cnt(e,e.dataset.go)});
}

// ── 弹层：o.full 全屏；o.back 左上角返回。全屏开着时再开全屏，原地换内容，不关不开，不会闪 ──
function openSheet(title,node,o){
  o=o||{};
  var swap=!sheet.hidden&&sheet.classList.contains('full')&&!!o.full;
  closeNav();
  sheetTitle.textContent=title;sheetBody.innerHTML='';
  if(o.back){
    var b=document.createElement('button');b.type='button';b.className='sh-back';b.textContent='‹ '+(o.backLabel||'设置');
    b.addEventListener('click',o.back);sheetBody.appendChild(b);
  }
  sheetBody.appendChild(node);
  sheet.classList.toggle('full',!!o.full);
  sheet.hidden=false;
  var inr=sheet.querySelector('.inner');if(inr)inr.scrollTop=0;
  if(swap){sheetBody.classList.remove('swap');void sheetBody.offsetWidth;sheetBody.classList.add('swap')}
}
function closeSheet(){sheet.hidden=true;sheet.classList.remove('full');sheetBody.innerHTML=''}
// 设置下面的每一页都用这个：全屏，左上角「‹ 设置」
function subPage(title,node,back,backLabel){
  openSheet(title,node,{full:true,back:back||function(){if(typeof openSettings==='function')openSettings()},backLabel:backLabel});
}

// ── 共用表单：滑杆 ──
// 最快/最慢一对会互相推，最快不会超过最慢
var PAIRS={replyMin:'replyMax',mailMin:'mailMax',statMin:'statMax',moMin:'moMax',comboMin:'comboMax'};
var PAIRS_R={};for(var _pk in PAIRS)PAIRS_R[PAIRS[_pk]]=_pk;
function fmtPref(k,v){
  if(/Rate$|Dim$|Vol$/.test(k)||k==='bubMax'||k==='fontScale')return v+'%';
  if(k==='replyMin'||k==='replyMax')return v+' 秒';
  if(k==='statMin'||k==='statMax')return v+' 小时';
  if(k==='comboMin'||k==='comboMax')return v+' 张';
  if(k==='moCmtMax')return v+' 条';
  if(k==='bubR'||k==='bubPad'||k==='avSize')return v+' px';
  if((k==='moMin'||k==='moMax')&&v===0)return '马上';
  if(v<60)return v+' 分钟';
  var h=v/60;return(h%1?h.toFixed(1):h)+' 小时';
}
function rr(label,k,min,max,step){
  return '<div class="field"><label>'+label+'</label><div class="rg"><input type="range" data-k="'+k+'" min="'+min+'" max="'+max+'" step="'+(step||1)+'"><b data-v="'+k+'"></b></div></div>';
}
function bindRanges(w,onInput,onChange){
  var rs=w.querySelectorAll('input[type=range][data-k]');
  function paint(){rs.forEach(function(r){var k=r.dataset.k;r.value=S.prefs[k];var b=w.querySelector('[data-v="'+k+'"]');if(b)b.textContent=fmtPref(k,+S.prefs[k])})}
  rs.forEach(function(r){
    r.addEventListener('input',function(){
      var k=r.dataset.k,v=+r.value;S.prefs[k]=v;
      if(PAIRS[k]&&+S.prefs[PAIRS[k]]<v)S.prefs[PAIRS[k]]=v;
      if(PAIRS_R[k]&&+S.prefs[PAIRS_R[k]]>v)S.prefs[PAIRS_R[k]]=v;
      paint();if(onInput)onInput(k);
    });
    r.addEventListener('change',function(){save();if(onChange)onChange(r.dataset.k)});
  });
  paint();return paint;
}
// 勾选行：<label><input type=checkbox data-ck=k>名字<span>说明</span></label>，放进 .chk 里
function ckRow(k,label,sub){return '<label><input type="checkbox" data-ck="'+k+'">'+label+'<span>'+(sub||'')+'</span></label>'}
function bindChecks(w,onChange){
  w.querySelectorAll('input[data-ck]').forEach(function(i){
    var k=i.dataset.ck;i.checked=!!S.prefs[k];
    i.addEventListener('change',function(){S.prefs[k]=i.checked;save();if(onChange)onChange(k,i.checked)});
  });
}
// 分段按钮：<div class=seg data-sg=k><button data-v=..>，选中写进 S.prefs[k]
function bindSeg(w,onChange){
  w.querySelectorAll('.seg[data-sg]').forEach(function(g){
    var k=g.dataset.sg;
    function paint(){g.querySelectorAll('[data-v]').forEach(function(b){b.classList.toggle('on',String(S.prefs[k])===b.dataset.v)})}
    g.addEventListener('click',function(e){var b=e.target.closest('[data-v]');if(!b)return;S.prefs[k]=b.dataset.v;save();paint();if(onChange)onChange(k,b.dataset.v)});
    paint();
  });
}
function emptyBox(t,s){return '<div class="empty"><b>'+t+'</b>'+s+'</div>'}

// ── 主页 ──
function renderHome(){
  var d=new Date();
  txt('hhDate',(d.getMonth()+1)+'月'+d.getDate()+'日 · 星期'+'日一二三四五六'[d.getDay()]);
  txt('hhDay',(HOME.day&&HOME.day())||'还没有开始的日子 · 设置里加一个');
  var pool=tagPool('每日一句');if(!pool.length)pool=libPool();
  var seed=d.getFullYear()*10000+(d.getMonth()+1)*100+d.getDate();
  txt('qText',pool.length?pool[seed%pool.length]:'写一句吧。');
  updateNav();
}
onView('home',renderHome);

// ── 开屏：导入过 milk 的开屏文案就从里面挑 ──
var SPLASH_LINES=[['Love','若要由我来谈论爱的话'],['Echo','听见我的回音了吗'],['Soulmate','灵魂正在共振'],['Melody','心跳的旋律为你奏响'],['Destiny','命运的红线将我们相连'],['Memory','创造属于我们的回忆'],['∞','无限循环的思念'],['Serendipity','最美丽的意外'],['Paracosm','共同构建的私宇宙'],['Kiss','未说出口的告白'],['Lucky','此生最大的幸运'],['Comet','划过天际的相遇'],['Étoile','你是我唯一的星辰'],['Aurore','黎明前的极光']];
function splash(){
  var sp=$('splash');if(!sp)return;
  var it=Array.isArray(S.prefs.intros)&&S.prefs.intros.length?S.prefs.intros:SPLASH_LINES,p=pickOne(it);
  var m=sp.querySelector('.sp-mark'),t=sp.querySelector('.sp-title');
  if(m)m.textContent=p[0];if(t)t.textContent=p[1];
  txt('spSub',meName()+' × '+taName());
  var done=false;
  function end(){if(done)return;done=true;sp.classList.add('out');setTimeout(function(){sp.style.display='none'},650)}
  sp.addEventListener('click',end);setTimeout(end,2500);
}

// ── 事件 ──
(function(){
  $('sheetX').addEventListener('click',closeSheet);
  sheet.addEventListener('click',function(e){if(e.target===sheet&&!sheet.classList.contains('full'))closeSheet()});
  $('navBtn').addEventListener('click',openNav);
  $('navMask').addEventListener('click',closeNav);
  $('tabbar').addEventListener('click',function(e){var b=e.target.closest('.tab');if(!b)return;go(b.dataset.view);closeNav()});
  document.addEventListener('click',function(e){
    var pk=e.target.closest('[data-pick]');if(pk){pickAvatar(pk.dataset.pick);return}
    var g=e.target.closest('[data-go]');if(g&&!g.closest('#tabbar')){go(g.dataset.go);return}
  });
  document.addEventListener('keydown',function(e){
    if(e.key!=='Escape')return;
    if(!sheet.hidden)closeSheet();else closeNav();
  });
  // 从左边缘往右滑开侧栏，开着时往左滑收起
  var sx=0,sy=0,mode=null;
  document.addEventListener('touchstart',function(e){
    var t=e.touches[0];sx=t.clientX;sy=t.clientY;
    if(document.body.classList.contains('nav-open'))mode='close';
    else mode=(sx<22&&sheet.hidden&&(!reader||reader.hidden))?'open':null;
  },{passive:true});
  document.addEventListener('touchend',function(e){
    if(!mode)return;
    var t=e.changedTouches[0],dx=t.clientX-sx,dy=Math.abs(t.clientY-sy);
    if(dy<60){if(mode==='open'&&dx>50)openNav();if(mode==='close'&&dx<-50)closeNav()}
    mode=null;
  },{passive:true});
  window.addEventListener('beforeunload',save);
})();

// 所有模块加载完以后，index 最后调用 boot()
function boot(){
  runHooks(BOOT_HOOK);
  paintNames();
  go('home');
  splash();
}
