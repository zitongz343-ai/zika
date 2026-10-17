// 字卡传讯 · 他怎么回你：回复（照 milk）、拍一拍、随机拼字卡、状态、提示音
// 依赖 state.js、shell.js、chat.js
'use strict';
var replyTimer=null,replyRun=0;
function waitMs(){var p=S.prefs,a=Math.max(0,+p.replyMin||0),b=Math.max(a,+p.replyMax||0);return rnd(a,b)*1000}
// milk：75% 回一张，剩下的里 95% 两张，其余三张
function replyCount(){return Math.random()<0.75?1:(Math.random()<0.95?2:3)}
// 你又递了一张，就打断他正在回的，重新等
function scheduleReply(){
  clearTimeout(replyTimer);
  var t=++replyRun;showTyping(false);
  replyTimer=setTimeout(function(){simulateReply(t)},waitMs());
}
function markRead(){
  var ch=false;
  S.cards.forEach(function(c){if(c.from==='me'&&!c.read){c.read=true;ch=true}});
  if(ch){save();renderChat()}
}

// ── 拍一拍：从「氛围感 → 拍一拍」里抽 ──
var POKE_DEF=['拍了拍我的脑袋','戳了戳我的脸','捏了捏我的手','揉了揉我的头发','拽了拽我的袖子'];
function taPoke(){
  var pool=tagPool('拍一拍');if(!pool.length)pool=POKE_DEF;
  showTyping(false);
  addCard({id:uid(),from:'ta',type:'poke',text:taName()+' '+pickOne(pool),at:Date.now()});
}

// ── 随机拼字卡：挑几张拼一句，中间随机加标点；本来带标点结尾的不再加 ──
var COMBO_P=['，','，','，','。','。','……','！','~','？'];
var COMBO_END=/[，。！？!?…~～、,.;；:：」』）)\s]$/;
function comboText(pool,force){
  var p=S.prefs;
  if(!pool.length)return '';
  if(!force&&(!p.comboOn||Math.random()*100>=(+p.comboRate)))return pickOne(pool);
  if(pool.length<2)return pickOne(pool);
  var a=Math.max(2,+p.comboMin||2),b=Math.max(a,+p.comboMax||a);
  var n=Math.min(pool.length,a+Math.floor(Math.random()*(b-a+1))),used=[],s='';
  for(var i=0;i<n;i++){
    var t,k=0;
    do{t=String(pickOne(pool)).trim();k++}while(used.indexOf(t)>=0&&k<10);
    used.push(t);
    if(i>0&&!COMBO_END.test(s))s+=pickOne(COMBO_P);
    s+=t;
  }
  return s;
}

// ── 回复，照 milk 的 simulateReply：已读 → 已读不回（开了才掷）→ 拍一拍 → 回 1~3 张，第一张按概率引用你最近 10 句里的一句 ──
function simulateReply(token){
  if(token!==replyRun)return;
  var p=S.prefs;
  markRead();
  if(p.readNo&&Math.random()*100<(+p.readNoRate)){showTyping(false);return}
  if(Math.random()*100<(+p.pokeRate)){taPoke();return}
  var pool=libPool();
  if(!pool.length){showTyping(false);return}
  showTyping(true);
  var mine=S.cards.filter(function(c){return c.from==='me'&&!c.type&&c.text}).slice(-10);
  var n=replyCount(),delay=0;
  for(var i=0;i<n;i++){
    delay+=waitMs();
    (function(i){
      setTimeout(function(){
        if(token!==replyRun)return;
        var c={id:uid(),from:'ta',text:comboText(pool),at:Date.now()};
        if(i===0&&mine.length&&Math.random()*100<(+p.quoteRate)){var m=pickOne(mine);c.quote={name:meName(),text:m.text}}
        addCard(c);
        if(i===n-1)showTyping(false);
      },delay);
    })(i);
  }
}

// ── 状态：照 milk 每 1~8 小时从「氛围感 → 对方状态」里换一条，不能点着换 ──
(function(){
  var nm=$('nmTa');if(!nm||$('taSt'))return;
  var row=document.createElement('span');row.className='nmrow';
  nm.parentNode.insertBefore(row,nm);row.appendChild(nm);
  var st=document.createElement('span');st.id='taSt';st.className='ts';st.hidden=true;
  row.appendChild(st);
})();
function stPaint(){var el=$('taSt');if(!el)return;var s=S.prefs.taStatus||'';el.textContent=s;el.title=s;el.hidden=!s}
function stRoll(){var p=S.prefs,a=Math.max(0.1,+p.statMin||1),b=Math.max(a,+p.statMax||a);p.statNext=rnd(a,b)}
function stChange(){
  var p=S.prefs,pool=tagPool('状态'),cur=p.taStatus,c=pool.filter(function(x){return x!==cur});
  p.taStatus=pool.length?pickOne(c.length?c:pool):'';
  p.statAt=Date.now();stRoll();save();stPaint();
}
function stCheck(){
  var p=S.prefs,pool=tagPool('状态');
  if(!pool.length){if(p.taStatus){p.taStatus='';save()}stPaint();return}
  if(!p.taStatus||pool.indexOf(p.taStatus)<0||!p.statAt||Date.now()-p.statAt>=(+p.statNext||1)*36e5)stChange();
  else stPaint();
}
setInterval(stCheck,60000);
document.addEventListener('visibilitychange',function(){if(!document.hidden)stCheck()});
onBoot(stCheck);

// ── 提示音：声音在手机上现做，不联网。iOS 要先点一下屏幕才能出声 ──
var AC=null,AC_HOOK=[];
function ac(){
  if(!AC){
    var C=window.AudioContext||window.webkitAudioContext;if(!C)return null;
    AC=new C();AC.onstatechange=function(){runHooks(AC_HOOK,AC.state)};
  }
  if(AC.state==='suspended'){try{AC.resume()}catch(e){}}
  return AC;
}
function acUnlock(){
  if(AC&&AC.state==='running')return;
  var c=ac();if(!c)return;
  try{var b=c.createBuffer(1,1,22050),s=c.createBufferSource();s.buffer=b;s.connect(c.destination);s.start(0)}catch(e){}
}
document.addEventListener('touchend',acUnlock,true);
document.addEventListener('click',acUnlock,true);
document.addEventListener('visibilitychange',function(){
  if(document.visibilityState==='visible'&&AC&&AC.state!=='running'){try{AC.resume()}catch(e){}}
});
var SND={
  bell:{n:'清铃',type:'sine',notes:[[1318.5,0,.5],[1975.5,.09,.6]]},
  drop:{n:'水滴',type:'sine',slide:true,notes:[[880,0,.18],[1320,.06,.22]]},
  soft:{n:'轻敲',type:'triangle',notes:[[523.25,0,.35],[659.25,.12,.42]]},
  pop:{n:'啵',type:'sine',slide:true,notes:[[620,0,.13]]},
  star:{n:'星星',type:'sine',notes:[[1046.5,0,.4],[1318.5,.08,.4],[1568,.16,.55]]}
};
function tone(c,f,t0,dur,type,vol,slide){
  var o=c.createOscillator(),g=c.createGain();
  o.type=type;o.frequency.setValueAtTime(f,t0);
  if(slide)o.frequency.exponentialRampToValueAtTime(f*1.6,t0+dur*.6);
  g.gain.setValueAtTime(0.0001,t0);
  g.gain.exponentialRampToValueAtTime(vol,t0+0.012);
  g.gain.exponentialRampToValueAtTime(0.0001,t0+dur);
  o.connect(g);g.connect(c.destination);o.start(t0);o.stop(t0+dur+0.05);
}
function playSnd(kind,force){
  var p=S.prefs;if(!force&&!p.snd)return;
  var s=SND[kind||p.sndKind]||SND.bell,v=Math.max(0,Math.min(1,(+p.sndVol||0)/100))*0.35;
  if(v<=0)return;
  var c=ac();if(!c)return;
  function play(){var t=c.currentTime+0.02;s.notes.forEach(function(n){tone(c,n[0],t+n[1],n[2],s.type,v,s.slide)})}
  if(c.state==='running')play();
  else if(c.resume){var pr=c.resume();if(pr&&pr.then)pr.then(function(){if(c.state==='running')play()}).catch(function(){})}
}
var SND_LAST=0;
onTaCard(function(c){
  if(c.type==='poke'&&!S.prefs.sndPoke)return;
  var n=Date.now();if(n-SND_LAST<600)return;SND_LAST=n;
  playSnd();
});
