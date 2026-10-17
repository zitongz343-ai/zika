// 字卡传讯 · 通话：视频 / 语音两种，只是界面，不开摄像头和麦克风。概率照 milk，在设置里调
// 依赖 state.js、shell.js、chat.js、reply.js
'use strict';
var PH='M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z';
function svgP(d,cls,extra){return '<svg'+(cls?' class="'+cls+'"':'')+' viewBox="0 0 24 24"'+(extra||'')+'><path d="'+d+'"/></svg>'}
var IC_PHONE=svgP(PH),IC_HANG=svgP(PH,'hu');
var IC_VIDEO=svgP('M17 10.5V7a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-3.5l4 4v-11l-4 4z');
var IC_PIC=svgP('M5 4h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zm0 2v9.6l3.6-3.6a1 1 0 0 1 1.4 0l3 3 2-2a1 1 0 0 1 1.4 0L19 15.6V6H5zm10.5 1.5a1.75 1.75 0 1 1 0 3.5 1.75 1.75 0 0 1 0-3.5z','',' fill-rule="evenodd"');
// milk 的时间：接通 1.4~2.8 秒；不接的话先响 4~12 秒；他打来响 22 秒没接算未接；每 15~60 分钟掷一次看他打不打来
var CT={connect:[1400,2800],reject:[4000,12000],cancel:[4000,10000],timeout:22000,ring:[15*60000,60*60000]};
var REJECT_LABELS=[' 未接听',' 拒绝了通话',' 正在忙，稍后再打'];
var C={state:'idle',kind:'video',timer:null,tick:null,start:0,ring:null};
function kindName(){return C.kind==='voice'?'语音通话':'视频通话'}
function mmss(ms){var s=Math.floor(ms/1000);return pad(Math.floor(s/60))+':'+pad(s%60)}

var callBox=document.createElement('div');callBox.id='call';callBox.hidden=true;
callBox.innerHTML='<div class="cl-bg" id="clBg"></div><i class="cl-orb o1"></i><i class="cl-orb o2"></i><i class="cl-orb o3"></i>'
  +'<div class="cl-ring"><span class="cl-av" id="clAv"></span><b class="cl-name" id="clName"></b><span class="cl-state" id="clState"></span>'
  +'<div class="cl-acts"><button type="button" class="cl-btn cl-no" id="clCancel"><i>'+IC_HANG+'</i>取消</button><button type="button" class="cl-btn cl-no" id="clDecline"><i>'+IC_HANG+'</i>拒绝</button><button type="button" class="cl-btn cl-yes" id="clAccept"><i>'+IC_PHONE+'</i>接听</button></div></div>'
  +'<div class="cl-live"><div class="cl-top"><button type="button" id="clMin" aria-label="缩小">⌄</button><span class="cl-time" id="clTime">00:00</span><button type="button" id="clWall" aria-label="换视频壁纸">'+IC_PIC+'</button></div>'
  +'<span class="cl-self" id="clSelf"></span><span class="cl-av" id="clAv2"></span><b class="cl-name" id="clName2"></b><span class="cl-hint" id="clHint"></span>'
  +'<div class="cl-subs" id="clSubs"></div><div class="cl-say"><input id="clIn" placeholder="说一句…" enterkeyhint="send"><button type="button" id="clSend">说</button></div>'
  +'<div class="cl-acts"><button type="button" class="cl-btn cl-no" id="clHang"><i>'+IC_HANG+'</i>挂断</button></div></div>';
document.body.appendChild(callBox);
var mini=document.createElement('button');mini.type='button';mini.id='callMini';mini.hidden=true;mini.setAttribute('aria-label','回到通话');
mini.innerHTML='<span class="cl-av" id="clAvM"></span><b id="clTimeM">00:00</b>';
document.body.appendChild(mini);
var callBtn=document.createElement('button');callBtn.type='button';callBtn.className='ico';callBtn.id='btnCall';callBtn.setAttribute('aria-label','通话');
callBtn.innerHTML=svgP(PH,'',' width="17" height="17" fill="currentColor"');
document.querySelector('.chat-top').appendChild(callBtn);

// 视频：铺视频壁纸，没有就用他的头像糊一层；语音：只用头像
function paintWho(){
  setAv($('clAv'),S.ta);setAv($('clAv2'),S.ta);setAv($('clAvM'),S.ta);setAv($('clSelf'),S.me);
  txt('clName',taName());txt('clName2',taName());
  var v=C.kind!=='voice',w=v?S.prefs.callWall:'';
  callBox.dataset.kind=v?'video':'voice';callBox.classList.toggle('has-wall',!!w);
  $('clBg').style.backgroundImage=w?'url("'+w+'")':(S.ta.img?'url("'+S.ta.img+'")':'');
  $('clWall').style.visibility=v?'':'hidden';
}
function setMode(m){callBox.dataset.mode=m;$('clCancel').hidden=m!=='dial';$('clDecline').hidden=m!=='incoming';$('clAccept').hidden=m!=='incoming'}
function openRing(m,t){paintWho();setMode(m);txt('clState',t);mini.hidden=true;callBox.hidden=false}
function callLog(t){addCard({id:uid(),from:'sys',type:'call',text:'',call:t,at:Date.now()})}
function closeCall(){clearTimeout(C.timer);clearInterval(C.tick);C.state='idle';callBox.hidden=true;mini.hidden=true;txt('clHint','')}
function paintTime(){var t=mmss(Date.now()-C.start);txt('clTime',t);txt('clTimeM',t)}

// 你打过去：按「你打过去不接」的概率决定接不接
function dial(){
  if(C.state!=='idle')return;
  C.state='dial';openRing('dial','正在呼叫…');
  var no=Math.random()*100<(+S.prefs.rejectRate);
  C.timer=setTimeout(function(){
    if(!no){startLive();return}
    var l=taName()+pickOne(REJECT_LABELS);
    C.state='ending';txt('clState',l);callLog(l);
    C.timer=setTimeout(closeCall,1600);
  },no?rnd(CT.reject[0],CT.reject[1]):rnd(CT.connect[0],CT.connect[1]));
}
// 他打来：视频语音随机；按概率响几秒又自己挂掉（milk 的 autoRejectChance）
function incoming(){
  if(C.state!=='idle')return;
  C.kind=Math.random()<0.5?'voice':'video';C.state='incoming';
  openRing('incoming','邀请你'+kindName());
  if(Math.random()*100<(+S.prefs.cancelRate)){
    C.timer=setTimeout(function(){if(C.state!=='incoming')return;callLog(taName()+' 取消了'+kindName());closeCall()},rnd(CT.cancel[0],CT.cancel[1]));
  }else{
    C.timer=setTimeout(function(){if(C.state!=='incoming')return;callLog('未接 '+taName()+' 的'+kindName());closeCall()},CT.timeout);
  }
}
function startLive(){
  clearTimeout(C.timer);C.state='live';C.start=Date.now();
  paintWho();setMode('live');$('clSubs').innerHTML='';txt('clHint','已接通');
  clearInterval(C.tick);C.tick=setInterval(paintTime,1000);paintTime();
}
function hang(){
  if(C.state==='live')callLog(kindName()+' · '+mmss(Date.now()-C.start));
  else if(C.state==='dial')callLog('已取消'+kindName());
  else if(C.state==='incoming')callLog('已拒绝 '+taName()+' 的'+kindName());
  closeCall();
}

// 通话里说话：他照字卡库回，显示成字幕，也记进传讯
function sub(t,me){
  var b=$('clSubs'),p=document.createElement('p');
  if(me)p.className='me';p.textContent=t;b.appendChild(p);
  while(b.children.length>3)b.removeChild(b.firstChild);
}
function say(){
  var inp=$('clIn'),t=inp.value.trim();if(!t||C.state!=='live')return;
  inp.value='';addCard({id:uid(),from:'me',text:t,at:Date.now()});sub(t,true);scheduleReply();
}
onTaCard(function(c){if(C.state==='live'&&c.text)sub(c.text)});
onTyping(function(on){if(C.state==='live')txt('clHint',on?taName()+' 在说话…':'')});

// 页面开着的时候，每 15~60 分钟按「主动打来」的概率掷一次。改了概率后设置会重新调用
function planRing(){
  clearTimeout(C.ring);
  if(!(+S.prefs.ringRate>0))return;
  C.ring=setTimeout(function(){
    if(C.state==='idle'&&!document.hidden&&Math.random()*100<(+S.prefs.ringRate))incoming();
    planRing();
  },rnd(CT.ring[0],CT.ring[1]));
}

function callPick(){
  if(C.state!=='idle')return;
  var w=document.createElement('div');
  w.innerHTML='<div class="ck-pick"><button type="button" data-k="video"><i>'+IC_VIDEO+'</i>视频通话</button><button type="button" data-k="voice"><i>'+IC_PHONE+'</i>语音通话</button></div><p class="hint" style="text-align:center">只是界面，不会打开摄像头和麦克风。</p>';
  w.addEventListener('click',function(e){var b=e.target.closest('[data-k]');if(!b)return;C.kind=b.dataset.k;closeSheet();setTimeout(dial,120)});
  openSheet('给 '+taName()+' 打过去',w);
}
function setCallWall(cb){
  pickImage(function(src){shrinkSafe(src,1080,false,0.8).then(function(u){
    if(!u){alert('这张读不出来，换一张试试。');return}
    var old=S.prefs.callWall;S.prefs.callWall=u;
    if(!save()){S.prefs.callWall=old;save();alert('这张太大存不下，换一张试试。');return}
    if(cb)cb();
  })});
}
function openCallWall(){
  var w=document.createElement('div');
  w.innerHTML='<div class="wallprev" id="cwPv" style="height:240px"></div><div class="two"><button type="button" class="ghost" id="cwPick" style="flex:1">选一张图</button><button type="button" class="ghost" id="cwDel" style="flex:1">去掉</button></div><p class="hint">只在视频通话里用，铺满整个画面，就像他那边的镜头。没设的话用他的头像糊一层当背景。通话中右上角也能换。</p>';
  var pv=w.querySelector('#cwPv');
  function paint(){var s=S.prefs.callWall;pv.style.backgroundImage=s?'url("'+s+'")':'';pv.textContent=s?'':'还没有视频壁纸'}
  w.querySelector('#cwPick').addEventListener('click',function(){setCallWall(paint)});
  w.querySelector('#cwDel').addEventListener('click',function(){S.prefs.callWall='';save();paint()});
  paint();subPage('视频通话壁纸',w);
}

callBtn.addEventListener('click',callPick);
$('clCancel').addEventListener('click',hang);
$('clDecline').addEventListener('click',hang);
$('clHang').addEventListener('click',hang);
$('clAccept').addEventListener('click',startLive);
$('clSend').addEventListener('click',say);
$('clIn').addEventListener('keydown',function(e){if(e.key==='Enter'&&!e.isComposing){e.preventDefault();say()}});
$('clMin').addEventListener('click',function(){callBox.hidden=true;mini.hidden=false});
$('clWall').addEventListener('click',function(){setCallWall(paintWho)});
mini.addEventListener('click',function(){mini.hidden=true;callBox.hidden=false});
onBoot(planRing);
