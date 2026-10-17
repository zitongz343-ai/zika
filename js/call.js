// 视频通话：纯界面装饰，不调用摄像头和麦克风。概率照 milk 的 call.js
var CALL={
  rejectRate:0.2,                    // 你打过去，20% 不接
  rejectMin:4000,rejectMax:12000,    // 不接的话先响 4~12 秒
  connectMin:1400,connectMax:2800,   // 接的话 1.4~2.8 秒接通
  ringMin:15*60000,ringMax:60*60000, // 每隔 15~60 分钟掷一次
  ringRate:0.35,                     // 掷中 35% 他主动打来
  ringTimeout:22000                  // 响 22 秒没接算未接
};
var REJECT_LABELS=[' 未接听',' 拒绝了通话',' 正在忙，稍后再打'];
if(!S.call||typeof S.call!=='object')S.call={reject:true,random:true};
var C={state:'idle',timer:null,tick:null,start:0,ring:null};
function mmss(ms){var s=Math.floor(ms/1000);return pad(Math.floor(s/60))+':'+pad(s%60)}

var PH='M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z';
var ICON_YES='<svg viewBox="0 0 24 24"><path d="'+PH+'"/></svg>';
var ICON_NO='<svg class="hu" viewBox="0 0 24 24"><path d="'+PH+'"/></svg>';

// 通话界面
var callBox=document.createElement('div');
callBox.id='call';callBox.hidden=true;
callBox.innerHTML='<div class="cl-bg" id="clBg"></div><i class="cl-orb o1"></i><i class="cl-orb o2"></i><i class="cl-orb o3"></i>'
+'<div class="cl-ring"><span class="cl-av" id="clAv"></span><b class="cl-name" id="clName"></b><span class="cl-state" id="clState"></span>'
+'<div class="cl-acts"><button class="cl-btn cl-no" id="clCancel"><i>'+ICON_NO+'</i>取消</button><button class="cl-btn cl-no" id="clDecline"><i>'+ICON_NO+'</i>拒绝</button><button class="cl-btn cl-yes" id="clAccept"><i>'+ICON_YES+'</i>接听</button></div></div>'
+'<div class="cl-live"><div class="cl-top"><button id="clMin" aria-label="缩小">⌄</button><span class="cl-time" id="clTime">00:00</span><span style="width:36px"></span></div>'
+'<span class="cl-self" id="clSelf"></span><span class="cl-av" id="clAv2"></span><b class="cl-name" id="clName2"></b><span class="cl-hint" id="clHint"></span>'
+'<div class="cl-subs" id="clSubs"></div><div class="cl-say"><input id="clIn" placeholder="说一句…" enterkeyhint="send"><button id="clSend">说</button></div>'
+'<div class="cl-acts"><button class="cl-btn cl-no" id="clHang"><i>'+ICON_NO+'</i>挂断</button></div></div>';
document.body.appendChild(callBox);
var mini=document.createElement('button');
mini.id='callMini';mini.hidden=true;mini.setAttribute('aria-label','回到通话');
mini.innerHTML='<span class="cl-av" id="clAvM"></span><b id="clTimeM">00:00</b>';
document.body.appendChild(mini);

// 传讯页右上角的通话按钮
var callBtn=document.createElement('button');
callBtn.className='ico';callBtn.id='btnCall';callBtn.setAttribute('aria-label','视频通话');
callBtn.innerHTML='<svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor"><path d="M17 10.5V7a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-3.5l4 4v-11l-4 4z"/></svg>';
document.querySelector('.chat-top').appendChild(callBtn);

function paintWho(){
  setAv($('clAv'),S.ta);setAv($('clAv2'),S.ta);setAv($('clAvM'),S.ta);setAv($('clSelf'),S.me);
  $('clName').textContent=$('clName2').textContent=taName();
  $('clBg').style.backgroundImage=S.ta.img?'url("'+S.ta.img+'")':'';
}
function setMode(m){
  callBox.dataset.mode=m;
  $('clCancel').hidden=m!=='dial';
  $('clDecline').hidden=m!=='incoming';
  $('clAccept').hidden=m!=='incoming';
}
function openRing(m,text){paintWho();setMode(m);$('clState').textContent=text;mini.hidden=true;callBox.hidden=false}
function callLog(text){S.cards.push({id:uid(),from:'sys',type:'call',text:'',call:text,at:Date.now()});save();renderChat();updateNav()}
function closeCall(){
  clearTimeout(C.timer);clearInterval(C.tick);
  C.state='idle';callBox.hidden=true;mini.hidden=true;$('clHint').textContent='';
}
function paintTime(){var t=mmss(Date.now()-C.start);$('clTime').textContent=t;$('clTimeM').textContent=t}

// 你打给他
function dial(){
  if(C.state!=='idle')return;
  C.state='dial';
  openRing('dial','正在呼叫…');
  var no=S.call.reject&&Math.random()<CALL.rejectRate;
  C.timer=setTimeout(function(){
    if(!no){startLive();return}
    var lbl=taName()+pickOne(REJECT_LABELS);
    C.state='ending';
    $('clState').textContent=lbl;
    callLog(lbl);
    C.timer=setTimeout(closeCall,1600);
  },no?rnd(CALL.rejectMin,CALL.rejectMax):rnd(CALL.connectMin,CALL.connectMax));
}
// 他打给你
function incoming(){
  if(C.state!=='idle')return;
  C.state='incoming';
  openRing('incoming','邀请你视频通话');
  C.timer=setTimeout(function(){callLog('未接 '+taName()+' 的视频通话');closeCall()},CALL.ringTimeout);
}
function startLive(){
  clearTimeout(C.timer);
  C.state='live';C.start=Date.now();
  paintWho();setMode('live');
  $('clSubs').innerHTML='';$('clHint').textContent='已接通';
  clearInterval(C.tick);C.tick=setInterval(paintTime,1000);paintTime();
}
function hang(){
  if(C.state==='live')callLog('视频通话 · '+mmss(Date.now()-C.start));
  else if(C.state==='dial')callLog('已取消视频通话');
  else if(C.state==='incoming')callLog('已拒绝 '+taName()+' 的视频通话');
  closeCall();
}

// 通话里说话，他照字卡库回，显示成字幕
function sub(text,me){
  var box=$('clSubs'),p=document.createElement('p');
  if(me)p.className='me';p.textContent=text;box.appendChild(p);
  while(box.children.length>3)box.removeChild(box.firstChild);
}
function say(){
  var inp=$('clIn'),t=inp.value.trim();
  if(!t||C.state!=='live')return;
  inp.value='';
  S.cards.push({id:uid(),from:'me',text:t,at:Date.now()});save();renderChat();updateNav();
  sub(t,true);
  clearTimeout(replyTimer);
  var token=++replyRun;
  showTyping(false);
  replyTimer=setTimeout(function(){simulateReply(token)},rnd(REPLY.waitMin,REPLY.waitMax));
}
var _addReply=addReplyCard;
addReplyCard=function(c){_addReply(c);if(C.state==='live'&&c.from==='ta')sub(c.text)};
var _showTyping=showTyping;
showTyping=function(on){_showTyping(on);if(C.state==='live')$('clHint').textContent=on?taName()+' 在说话…':''};

// 聊天里的通话记录
var _cardElC=cardEl;
cardEl=function(c){
  if(c.type==='call'){var p=document.createElement('div');p.className='poke';p.textContent='◉ '+c.call;return p}
  return _cardElC(c);
};

// 页面开着的时候，他偶尔主动打来
function planRing(){
  clearTimeout(C.ring);
  if(!S.call.random)return;
  C.ring=setTimeout(function(){
    if(C.state==='idle'&&!document.hidden&&Math.random()<CALL.ringRate)incoming();
    planRing();
  },rnd(CALL.ringMin,CALL.ringMax));
}

callBtn.addEventListener('click',dial);
$('clCancel').addEventListener('click',hang);
$('clDecline').addEventListener('click',hang);
$('clHang').addEventListener('click',hang);
$('clAccept').addEventListener('click',startLive);
$('clSend').addEventListener('click',say);
$('clIn').addEventListener('keydown',function(e){if(e.key==='Enter'){e.preventDefault();say()}});
$('clMin').addEventListener('click',function(){callBox.hidden=true;mini.hidden=false});
mini.addEventListener('click',function(){mini.hidden=true;callBox.hidden=false});
planRing();
