// v26：收到消息的提示音（手机现做，不联网）；后台保活多一种「不显示在灵动岛」的方式
'use strict';
var V26_DEF={snd:true,sndKind:'bell',sndVol:60,sndPoke:true,kaMode:'quiet'};
(function(){var p=S.prefs,k;for(k in V26_DEF){if(p[k]===undefined||p[k]===null)p[k]=V26_DEF[k];P_DEF[k]=V26_DEF[k]}save()})();
(function(){var st=document.createElement('style');st.textContent='.v26-snds{display:flex;flex-wrap:wrap;gap:8px}.v26-snds .lb-pill{padding:8px 14px;font-size:13px}';document.head.appendChild(st)})();

// 一个共用的 AudioContext。iOS 要先点一下屏幕才能出声，所以每次点屏幕都顺手唤醒一下
var AC=null;
function ac(){
  if(!AC){var C=window.AudioContext||window.webkitAudioContext;if(!C)return null;AC=new C();AC.onstatechange=acState}
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

// ── 提示音 ──
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
  function go(){var t=c.currentTime+0.02;s.notes.forEach(function(n){tone(c,n[0],t+n[1],n[2],s.type,v,s.slide)})}
  if(c.state==='running')go();
  else if(c.resume){var pr=c.resume();if(pr&&pr.then)pr.then(function(){if(c.state==='running')go()}).catch(function(){})}
}
var SND_LAST=0;
var _arcV26=addReplyCard;
addReplyCard=function(c){
  _arcV26(c);
  if(!c||c.from!=='ta')return;
  if(c.type==='poke'&&!S.prefs.sndPoke)return;
  var n=Date.now();if(n-SND_LAST<600)return;SND_LAST=n;
  playSnd();
};
var _fmtV26=fmtPref;
fmtPref=function(k,v){if(k==='sndVol')return v+'%';return _fmtV26(k,v)};
function openSndSet(){
  var w=document.createElement('div');w.className='v23';
  w.innerHTML='<div class="chk"><label><input type="checkbox" id="sdOn">收到消息响一声<span>默认开</span></label><label><input type="checkbox" id="sdPoke">拍一拍也响<span></span></label></div>'
    +'<div class="field"><label>声音（点一下试听）</label><div class="v26-snds" id="sdList"></div></div>'
    +rr('音量','sndVol',0,100,5)
    +'<p class="hint">声音是手机现做的，不联网。每次打开页面要先点一下屏幕，声音才放得出来。手机开着静音键的时候不会响。</p>';
  var list=w.querySelector('#sdList');
  function draw(){
    list.innerHTML=Object.keys(SND).map(function(k){return '<button type="button" class="lb-pill'+(S.prefs.sndKind===k?' on':'')+'" data-s="'+k+'">'+SND[k].n+'</button>'}).join('');
  }
  list.addEventListener('click',function(e){
    var b=e.target.closest('[data-s]');if(!b)return;
    S.prefs.sndKind=b.dataset.s;save();draw();playSnd(b.dataset.s,true);
  });
  var on=w.querySelector('#sdOn'),pk=w.querySelector('#sdPoke');
  on.checked=!!S.prefs.snd;pk.checked=!!S.prefs.sndPoke;
  on.addEventListener('change',function(){S.prefs.snd=on.checked;save()});
  pk.addEventListener('change',function(){S.prefs.sndPoke=pk.checked;save()});
  bindRanges(w,null,function(){playSnd(null,true)});
  draw();openSheet('提示音',w);
}

// ── 后台保活：「不显示」用 Web Audio 放一段听不见的声音，不走网页播放器，灵动岛和控制中心一般不会出现 ──
var KQ={src:null};
function clearMS(){
  if(!('mediaSession' in navigator))return;
  try{navigator.mediaSession.metadata=null}catch(e){}
  try{navigator.mediaSession.playbackState='none'}catch(e){}
}
function kqStart(){
  var c=ac();if(!c){kaUnlock();return}
  if(c.state!=='running'){kaUnlock();kaPaint();return}
  if(KQ.src){kaPaint();return}
  var b=c.createBuffer(1,c.sampleRate,c.sampleRate),d=b.getChannelData(0);
  for(var i=0;i<d.length;i++)d[i]=(i%2?1:-1)*0.00002;
  var s=c.createBufferSource();s.buffer=b;s.loop=true;s.connect(c.destination);s.start(0);
  KQ.src=s;kaPaint();
}
function kqStop(){
  if(KQ.src){try{KQ.src.stop()}catch(e){}try{KQ.src.disconnect()}catch(e){}KQ.src=null}
}
function acState(){
  if(AC&&AC.state==='running'&&S.prefs.keepAlive&&S.prefs.kaMode==='quiet'&&!KQ.src)kqStart();
  kaPaint();
}
var _kaStartV26=kaStart,_kaStopV26=kaStop,_kaPlayingV26=kaPlaying;
kaPlaying=function(){
  if(S.prefs.kaMode==='quiet')return !!(KQ.src&&AC&&AC.state==='running');
  return _kaPlayingV26();
};
kaStart=function(){
  if(S.prefs.kaMode==='quiet'){_kaStopV26();clearMS();kqStart()}
  else{kqStop();_kaStartV26()}
};
kaStop=function(){kqStop();_kaStopV26();kaPaint()};
var KA_HINT={
  quiet:'不走网页播放器，灵动岛和控制中心一般不会出现。代价是切到别的 App 以后，iOS 更容易把它停掉，保活效果比另一种弱一些。',
  media:'跟 milk 一样，最稳。但灵动岛和控制中心会显示「正在播放」，还会打断你在别的 App 里放的音乐。'
};
var _okV26=openKaSet;
openKaSet=function(){
  _okV26();
  var chk=sheetBody.querySelector('.chk');if(!chk)return;
  var f=document.createElement('div');f.className='field';f.style.marginTop='10px';
  f.innerHTML='<label>方式</label><div class="seg" id="kaMode"><button type="button" data-v="quiet">不显示</button><button type="button" data-v="media">更稳（会显示）</button></div><p class="hint" id="kaModeHint" style="margin-top:0"></p>';
  chk.parentNode.insertBefore(f,chk.nextSibling);
  function paint(){
    f.querySelectorAll('[data-v]').forEach(function(b){b.classList.toggle('on',b.dataset.v===S.prefs.kaMode)});
    f.querySelector('#kaModeHint').textContent=KA_HINT[S.prefs.kaMode]||'';
  }
  f.querySelector('#kaMode').addEventListener('click',function(e){
    var b=e.target.closest('[data-v]');if(!b)return;
    S.prefs.kaMode=b.dataset.v;save();
    if(S.prefs.keepAlive)kaStart();
    paint();kaPaint();
  });
  sheetBody.querySelectorAll('.hint').forEach(function(p){
    if(p.textContent.indexOf('控制中心')>=0&&p.id!=='kaModeHint')p.textContent='开着会多耗一点电。iPhone 刚打开页面时要先点一下屏幕才会开始。系统内存不够、开了低电量模式，或者在多任务里划掉，还是会断，这个没办法完全保证。';
  });
  paint();
};

// ── 设置入口 ──
SET_GROUPS.forEach(function(g){
  if(g[0]==='聊天'&&!g[1].some(function(i){return i[0]==='openSndSet'}))
    g[1].push(['openSndSet','提示音',function(){return S.prefs.snd?(SND[S.prefs.sndKind]||SND.bell).n:'关'}]);
  if(g[0]==='后台')g[1].forEach(function(i){
    if(i[0]==='openKaSet')i[2]=function(){if(!S.prefs.keepAlive)return '关';return(S.prefs.kaMode==='quiet'?'不显示':'更稳')+' · '+(kaPlaying()?'运行中':'等点一下')};
  });
});

if(S.prefs.keepAlive)kaStart();
