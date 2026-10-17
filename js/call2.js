// v30 通话：只有语音通话。打过去、打过来还是整屏响铃；接通以后是浮在聊天页上的小窗
// 小窗能拖、能改大小（迷你 / 小 / 标准 / 大，右下角也能拉）、能缩成胶囊；位置和大小会记住
// 深色底、头像外一圈光、声音小条。视频通话和「说一句」都去掉了
// 接在旧 call.js 和 v19.js 后面，把通话相关的函数整个换掉，旧的通话界面删掉
'use strict';
(function(){['call','callMini'].forEach(function(id){var e=document.getElementById(id);if(e)e.remove()})})();
(function(){
  var p=S.prefs;
  if(!p.callWin||typeof p.callWin!=='object')p.callWin={};
  if(typeof p.voiceWall!=='string')p.voiceWall='';
  save();
})();
var CWP=S.prefs.callWin;
var CW_SZ={mini:[160,210],sm:[230,320],std:[290,420],lg:[340,540]};
var CW_IC={
  big:'<path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>',
  min:'<path d="M5 12h14"/>',
  eye:'<path d="M3 3l18 18M10.6 6.2A9.6 9.6 0 0 1 12 6c5 0 8.5 4.5 9 6-.3.9-1.2 2.4-2.6 3.7M6.4 7.6C4.6 8.9 3.4 10.7 3 12c.5 1.5 4 6 9 6 1.6 0 3-.4 4.2-1.1M9.9 9.9a3 3 0 0 0 4.2 4.2"/>',
  pic:'<rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="10" r="2"/><path d="M21 16l-5-5-9 9"/>'
};
function cwIc(k){return '<svg viewBox="0 0 24 24" aria-hidden="true">'+CW_IC[k]+'</svg>'}
var CW_HANG='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="'+PH+'"/></svg>';

C.kind='voice';
function kindName(){return '语音通话'}

// ── 整屏响铃：打过去、打过来 ──
callBox=document.createElement('div');callBox.id='call';callBox.hidden=true;
callBox.innerHTML='<div class="cl-bg" id="clBg"></div><i class="cl-orb o1"></i><i class="cl-orb o2"></i><i class="cl-orb o3"></i>'
  +'<div class="cl-ring"><span class="cl-av" id="clAv"></span><b class="cl-name" id="clName"></b><span class="cl-state" id="clState"></span>'
  +'<div class="cl-acts"><button type="button" class="cl-btn cl-no" id="clCancel"><i>'+ICON_NO+'</i>取消</button><button type="button" class="cl-btn cl-no" id="clDecline"><i>'+ICON_NO+'</i>拒绝</button><button type="button" class="cl-btn cl-yes" id="clAccept"><i>'+ICON_YES+'</i>接听</button></div></div>';
document.body.appendChild(callBox);

// ── 接通后的小窗 ──
var cw=document.createElement('div');cw.id='cw';cw.hidden=true;
cw.innerHTML='<div class="cw-bg" id="cwBg"></div>'
  +'<div class="cw-top"><span class="cw-time"><i></i><b id="cwTime">00:00</b></span><span class="sp"></span>'
  +'<button type="button" class="cw-ib" id="cwSz" aria-label="窗口大小">'+cwIc('big')+'</button>'
  +'<button type="button" class="cw-ib" id="cwMin" aria-label="缩小">'+cwIc('min')+'</button></div>'
  +'<div class="cw-menu" id="cwMenu" hidden>'+[['mini','迷你'],['sm','小'],['std','标准'],['lg','大']].map(function(s){return '<button type="button" data-sz="'+s[0]+'"><i class="sz-'+s[0]+'"></i>'+s[1]+'</button>'}).join('')+'</div>'
  +'<div class="cw-mid"><div class="cw-ring"><span class="cw-av" id="cwAv"></span></div><b class="cw-name" id="cwName"></b><span class="cw-wave"><i></i><i></i><i></i><i></i><i></i></span><span class="cw-hint" id="clHint"></span></div>'
  +'<div class="cw-bot"><button type="button" class="cw-ib" id="cwEye" aria-label="只看画面">'+cwIc('eye')+'</button>'
  +'<button type="button" class="cw-hang" id="cwHang" aria-label="挂断">'+CW_HANG+'</button>'
  +'<button type="button" class="cw-ib" id="cwPic" aria-label="换背景">'+cwIc('pic')+'</button></div>'
  +'<i class="cw-rs" id="cwRs"></i>';
document.body.appendChild(cw);
var cwPill=document.createElement('div');cwPill.id='cwPill';cwPill.hidden=true;
cwPill.setAttribute('role','button');cwPill.setAttribute('aria-label','回到通话');
cwPill.innerHTML='<span class="cw-pav" id="cwPav"></span><b id="cwPt">00:00</b>';
document.body.appendChild(cwPill);

// ── 位置和大小：都记在 S.prefs.callWin 里，超出屏幕就推回来 ──
function cwFit(){
  var W=window.innerWidth,H=window.innerHeight;
  var w=+CWP.w||CW_SZ.std[0],h=+CWP.h||CW_SZ.std[1];
  w=Math.max(150,Math.min(w,W-16));h=Math.max(190,Math.min(h,H-24));
  var x=CWP.x,y=CWP.y;
  if(typeof x!=='number'||typeof y!=='number'){x=(W-w)/2;y=Math.max(60,(H-h)/2-30)}
  x=Math.max(8,Math.min(x,W-w-8));y=Math.max(8,Math.min(y,H-h-8));
  CWP.x=x;CWP.y=y;CWP.w=w;CWP.h=h;
  cw.style.left=x+'px';cw.style.top=y+'px';cw.style.width=w+'px';cw.style.height=h+'px';
  cw.dataset.size=(w<200||h<260)?'mini':(w<260||h<360)?'sm':w<320?'std':'lg';
}
function cwPillFit(){
  var W=window.innerWidth,H=window.innerHeight,pw=cwPill.offsetWidth||110,ph=cwPill.offsetHeight||44;
  var x=CWP.px,y=CWP.py;
  if(typeof x!=='number'||typeof y!=='number'){x=W-pw-14;y=90}
  x=Math.max(6,Math.min(x,W-pw-6));y=Math.max(6,Math.min(y,H-ph-6));
  CWP.px=x;CWP.py=y;cwPill.style.left=x+'px';cwPill.style.top=y+'px';
}
// 按住拖。手指挪不到 6px 算点了一下
function cwDrag(el,o){
  el.addEventListener('pointerdown',function(e){
    if(o.skip&&o.skip(e.target))return;
    e.stopPropagation();
    var sx=e.clientX,sy=e.clientY,st=o.start(),moved=false,id=e.pointerId;
    try{el.setPointerCapture(id)}catch(_){}
    function mv(ev){
      if(ev.pointerId!==id)return;
      var dx=ev.clientX-sx,dy=ev.clientY-sy;
      if(!moved&&Math.abs(dx)+Math.abs(dy)<6)return;
      moved=true;ev.preventDefault();o.move(st.x+dx,st.y+dy);
    }
    function up(ev){
      if(ev.pointerId!==id)return;
      el.removeEventListener('pointermove',mv);el.removeEventListener('pointerup',up);el.removeEventListener('pointercancel',up);
      o.end(moved);
    }
    el.addEventListener('pointermove',mv);el.addEventListener('pointerup',up);el.addEventListener('pointercancel',up);
  });
}
cwDrag(cw,{
  skip:function(t){return !!t.closest('button,.cw-rs,.cw-menu')},
  start:function(){return{x:CWP.x,y:CWP.y}},
  move:function(x,y){CWP.x=x;CWP.y=y;cwFit()},
  end:function(moved){
    if(moved){save();return}
    if(!$('cwMenu').hidden){$('cwMenu').hidden=true;return}
    cw.classList.remove('clean');
  }
});
cwDrag($('cwRs'),{start:function(){return{x:CWP.w,y:CWP.h}},move:function(w,h){CWP.w=w;CWP.h=h;cwFit()},end:function(m){if(m)save()}});
cwDrag(cwPill,{start:function(){return{x:CWP.px,y:CWP.py}},move:function(x,y){CWP.px=x;CWP.py=y;cwPillFit()},end:function(m){if(m){save();return}cwRestore()}});
window.addEventListener('resize',function(){
  if(!cw.hidden)cwFit();
  if(!cwPill.hidden)cwPillFit();
});

function cwMenuPaint(){var cur=cw.dataset.size;$('cwMenu').querySelectorAll('[data-sz]').forEach(function(b){b.classList.toggle('on',b.dataset.sz===cur)})}
function cwMinimize(){$('cwMenu').hidden=true;cw.hidden=true;cwPill.hidden=false;cwPillFit()}
function cwRestore(){cwPill.hidden=true;cw.hidden=false;cwFit()}
$('cwSz').addEventListener('click',function(){var m=$('cwMenu');m.hidden=!m.hidden;cwMenuPaint()});
$('cwMenu').addEventListener('click',function(e){
  var b=e.target.closest('[data-sz]');if(!b)return;
  var s=CW_SZ[b.dataset.sz],cx=CWP.x+CWP.w/2;
  CWP.w=s[0];CWP.h=s[1];CWP.x=cx-s[0]/2;
  cwFit();save();$('cwMenu').hidden=true;
});
$('cwMin').addEventListener('click',cwMinimize);
$('cwEye').addEventListener('click',function(){$('cwMenu').hidden=true;cw.classList.add('clean')});
$('cwHang').addEventListener('click',function(){hang()});
$('cwPic').addEventListener('click',cwPic);
$('clCancel').addEventListener('click',function(){hang()});
$('clDecline').addEventListener('click',function(){hang()});
$('clAccept').addEventListener('click',function(){startLive()});

// 换小窗背景
function cwPic(){
  pickImage(function(src){shrinkSafe(src,1080,false,0.8).then(function(u){
    if(!u){alert('这张读不出来，换一张试试。');return}
    var old=S.prefs.voiceWall;S.prefs.voiceWall=u;
    if(!save()){S.prefs.voiceWall=old;save();alert('这张太大存不下，换一张试试。');return}
    paintWho();
  })});
}

// ── 下面这些把旧 call.js / v19.js 里的同名函数整个换掉 ──
function paintWho(){
  C.kind='voice';
  setAv($('clAv'),S.ta);setAv($('cwAv'),S.ta);setAv($('cwPav'),S.ta);
  $('clName').textContent=taName();$('cwName').textContent=taName();
  var wall=S.prefs.voiceWall;
  callBox.dataset.kind='voice';
  callBox.classList.remove('has-wall');
  var ri=S.ta.img||'';
  $('clBg').style.backgroundImage=ri?'url("'+ri+'")':'';
  $('cwBg').style.backgroundImage=wall?'url("'+wall+'")':'';
  cw.dataset.kind='voice';
  cw.classList.toggle('has-img',!!wall);
  cw.classList.toggle('own',!!wall);
}
function setMode(m){
  callBox.dataset.mode=m;
  $('clCancel').hidden=m!=='dial';$('clDecline').hidden=m!=='incoming';$('clAccept').hidden=m!=='incoming';
}
function openRing(m,text){paintWho();setMode(m);$('clState').textContent=text;cw.hidden=true;cwPill.hidden=true;callBox.hidden=false}
function callLog(text){S.cards.push({id:uid(),from:'sys',type:'call',text:'',call:text,at:Date.now()});save();renderChat();updateNav()}
function closeCall(){
  clearTimeout(C.timer);clearInterval(C.tick);
  C.state='idle';callBox.hidden=true;cw.hidden=true;cwPill.hidden=true;
  cw.classList.remove('clean');$('cwMenu').hidden=true;$('clHint').textContent='';
}
function paintTime(){var t=mmss(Date.now()-C.start);$('cwTime').textContent=t;$('cwPt').textContent=t}
function dial(){
  if(C.state!=='idle')return;
  C.kind='voice';
  C.state='dial';openRing('dial',kindName()+' · 正在呼叫…');
  var no=S.call.reject!==false&&Math.random()<CALL.rejectRate;
  C.timer=setTimeout(function(){
    if(C.state!=='dial')return;
    if(!no){startLive();return}
    var lbl=taName()+pickOne(REJECT_LABELS);
    C.state='ending';$('clState').textContent=lbl;callLog(lbl);
    C.timer=setTimeout(closeCall,1600);
  },no?rnd(CALL.rejectMin,CALL.rejectMax):rnd(CALL.connectMin,CALL.connectMax));
}
// 他打来：照 milk 有一定概率响几秒自己挂掉
function incoming(){
  if(C.state!=='idle')return;
  C.kind='voice';
  C.state='incoming';openRing('incoming','邀请你'+kindName());
  var cancel=Math.random()*100<(+S.prefs.cancelRate||0);
  C.timer=setTimeout(function(){
    if(C.state!=='incoming')return;
    callLog(cancel?taName()+' 取消了'+kindName():'未接 '+taName()+' 的'+kindName());
    closeCall();
  },cancel?rnd(4000,10000):CALL.ringTimeout);
}
function startLive(){
  clearTimeout(C.timer);
  C.state='live';C.start=Date.now();
  callBox.hidden=true;cwPill.hidden=true;
  cw.classList.remove('clean');$('cwMenu').hidden=true;$('clHint').textContent='';
  paintWho();cw.hidden=false;cwFit();
  clearInterval(C.tick);C.tick=setInterval(paintTime,1000);paintTime();
}
function hang(){
  if(C.state==='live')callLog(kindName()+' · '+mmss(Date.now()-C.start));
  else if(C.state==='dial')callLog('已取消'+kindName());
  else if(C.state==='incoming')callLog('已拒绝 '+taName()+' 的'+kindName());
  closeCall();
}
// 「说一句」去掉了：他回字卡时不再往通话里塞字幕
function sub(){}
function say(){}
function planRing(){
  clearTimeout(C.ring);
  if(!S.call.random)return;
  C.ring=setTimeout(function(){
    if(C.state==='idle'&&!document.hidden&&Math.random()<CALL.ringRate)incoming();
    planRing();
  },rnd(CALL.ringMin,CALL.ringMax));
}

// 顶栏的电话按钮：点了直接打语音
(function(){
  var ob=$('btnCall');if(!ob)return;
  var nb=ob.cloneNode(true);nb.setAttribute('aria-label','语音通话');
  ob.parentNode.replaceChild(nb,ob);
  nb.addEventListener('click',function(){if(C.state!=='idle')return;dial()});
})();
// 设置里去掉「视频通话壁纸」
if(typeof SET_GROUPS!=='undefined'){
  SET_GROUPS.forEach(function(g){
    g[1]=g[1].filter(function(i){return i[0]!=='openCallWall'});
    if(g[0]==='字卡与通话')g[0]='字卡';
  });
}
if(typeof openReplySet==='function'){
  var _orsC2=openReplySet;
  openReplySet=function(){
    _orsC2();
    document.querySelectorAll('#sheetBody .hint').forEach(function(p){p.textContent=p.textContent.replace('，视频还是语音随机','')});
  };
}

C.state='idle';planRing();
