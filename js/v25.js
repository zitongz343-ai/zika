// v25：普通气泡的时间和已读放到气泡外面；状态不再点一下就换，照 milk 1~8 小时自己从「对方状态」里抽；
// 随机拼字卡（2~N 张拼一句，中间随机加标点）；后台保活（照 milk 循环放一段听不见的声音）
var V25_DEF={comboOn:false,comboRate:100,comboMin:2,comboMax:3,keepAlive:false};
function v25Ensure(){
  var p=S.prefs,k;
  for(k in V25_DEF)if(p[k]===undefined||p[k]===null)p[k]=V25_DEF[k];
  if(!p.v25){if(+p.statMax===7)p.statMax=8;p.v25=1}
}
var _ensureV25=ensurePrefs;
ensurePrefs=function(){_ensureV25();v25Ensure()};
v25Ensure();
// milk：nextStatusChange = 1 + random*7 小时，也就是 1~8 小时
MILK.statMax=8;P_DEF.statMax=8;
for(var _k25 in V25_DEF)P_DEF[_k25]=V25_DEF[_k25];
save();

// ── 普通气泡：时间、已读、收藏星放到气泡下面 ──
function pmTime(t){
  var d=new Date(t),n=new Date();
  return d.toDateString()===n.toDateString()?pad(d.getHours())+':'+pad(d.getMinutes()):fmt(t);
}
var _ceV25=cardEl;
cardEl=function(c){
  var el=_ceV25(c);
  if(S.prefs.bubKind!=='plain'||!el||!el.classList)return el;
  var card=el.classList.contains('card')?el:el.querySelector('.card');
  if(!card)return el;
  var me=c.from==='me',col=document.createElement('div');
  col.className='pcol '+(me?'me':'ta');
  if(el===card){col.appendChild(card);el=col}
  else{card.parentNode.insertBefore(col,card);col.appendChild(card)}
  var m=document.createElement('div');m.className='pmeta';m.dataset.pm=c.id;
  var h='';
  if(me&&c.read)h+='<span class="rd2">已读</span>';
  h+='<span class="tm">'+esc(pmTime(c.at))+'</span>';
  if(!me&&isFav(c.id))h+='<span class="fv">★</span>';
  m.innerHTML=h;col.appendChild(m);
  return el;
};
var _tfV25=toggleFav;
toggleFav=function(c){
  _tfV25(c);
  var m=document.querySelector('.pmeta[data-pm="'+String(c.id).replace(/"/g,'')+'"]');if(!m)return;
  var s=m.querySelector('.fv');
  if(isFav(c.id)){if(!s){s=document.createElement('span');s.className='fv';s.textContent='★';m.appendChild(s)}}
  else if(s)s.remove();
};
// 便签和普通气泡来回切的时候重画一遍
var _acV25=applyChat;
applyChat=function(){
  var r=document.documentElement,was=r.dataset.bubble;
  _acV25();
  if(was&&was!==r.dataset.bubble)renderChat();
};
// 设置里的预览也放到外面
var _obV25=openBubble;
openBubble=function(){
  _obV25();
  var pv=document.getElementById('bkPrev');if(!pv)return;
  pv.querySelectorAll('.card').forEach(function(cd){
    var me=cd.classList.contains('me'),col=document.createElement('div');
    col.className='pcol '+(me?'me':'ta');
    cd.parentNode.insertBefore(col,cd);col.appendChild(cd);
    var m=document.createElement('div');m.className='pmeta';
    m.innerHTML=me?'<span class="rd2">已读</span><span class="tm">19:31</span>':'<span class="tm">19:30</span>';
    col.appendChild(m);
  });
};

// ── 状态：不能点着换了，只按时间自己换 ──
(function(){
  var o=document.getElementById('taSt');if(!o)return;
  var n=o.cloneNode(true);n.style.cursor='default';
  o.parentNode.replaceChild(n,o);
})();
var _orsV25=openReplySet;
openReplySet=function(){
  _orsV25();
  document.querySelectorAll('#sheetBody .hint').forEach(function(p){
    if(p.textContent.indexOf('点一下')>=0)p.textContent='从字卡库「氛围感 → 对方状态」里随机抽。照 milk 默认每 1 到 8 小时换一次，时间到了他自己换。';
  });
};

// ── 随机拼字卡 ──
var COMBO_P=['，','，','，','。','。','……','！','~','？'];
var COMBO_END=/[，。！？!?…~～、,.;；:：」』）)\s]$/;
function comboText(pool,force){
  var p=S.prefs;
  if(!pool.length)return '';
  if(!force&&(!p.comboOn||Math.random()*100>=(+p.comboRate)))return pickOne(pool);
  if(pool.length<2)return pickOne(pool);
  var a=Math.max(2,+p.comboMin||2),b=Math.max(a,+p.comboMax||a);
  var n=Math.min(pool.length,a+Math.floor(Math.random()*(b-a+1)));
  var used=[],s='';
  for(var i=0;i<n;i++){
    var t,k=0;
    do{t=String(pickOne(pool)).trim();k++}while(used.indexOf(t)>=0&&k<10);
    used.push(t);
    if(i>0&&!COMBO_END.test(s))s+=pickOne(COMBO_P);
    s+=t;
  }
  return s;
}
// 照 v19（milk）的回复流程，只是每张的字换成可能拼过的
simulateReply=function(token){
  if(token!==replyRun)return;
  var p=S.prefs,changed=false;
  S.cards.forEach(function(c){if(c.from==='me'&&!c.read){c.read=true;changed=true}});
  if(changed){save();renderChat()}
  if(p.readNo&&Math.random()*100<(+p.readNoRate)){showTyping(false);return}
  if(Math.random()*100<(+p.pokeRate)){taPoke();return}
  var pool=libPool();
  if(!pool.length){showTyping(false);return}
  showTyping(true);
  var mine=S.cards.filter(function(c){return c.from==='me'&&!c.type&&c.text}).slice(-10);
  var n=replyCount(),delay=0;
  for(var i=0;i<n;i++){
    delay+=rnd(REPLY.waitMin,REPLY.waitMax);
    (function(i){
      setTimeout(function(){
        if(token!==replyRun)return;
        var c={id:uid(),from:'ta',text:comboText(pool),at:Date.now()};
        if(i===0&&mine.length&&Math.random()*100<(+p.quoteRate)){
          var m=pickOne(mine);c.quote={name:S.me.name||'我',text:m.text};
        }
        addReplyCard(c);
        if(i===n-1)showTyping(false);
      },delay);
    })(i);
  }
};
PAIRS.comboMin=['comboMax',1];PAIRS.comboMax=['comboMin',-1];
var _fmtV25=fmtPref;
fmtPref=function(k,v){if(k==='comboMin'||k==='comboMax')return v+' 张';return _fmtV25(k,v)};
function openComboSet(){
  var w=document.createElement('div');w.className='v23';
  w.innerHTML='<div class="chk"><label><input type="checkbox" id="cbOn">随机拼字卡<span>默认关</span></label></div>'
    +'<div id="cbBox">'+rr('拼卡概率','comboRate',0,100)+rr('最少几张','comboMin',2,6)+rr('最多几张','comboMax',2,6)+'</div>'
    +'<p class="hint">开了以后，'+esc(taName())+'回你的每一张，按上面的概率从主字卡里随机挑几张拼成一句，中间随机加逗号、句号、省略号这些。字卡末尾本来就有标点的，就不再加。拍一拍、状态、每日一句不会拼进来。</p>'
    +'<button type="button" class="ghost" id="cbTry" style="width:100%;margin-top:6px">拼一句看看</button><p class="v25-demo" id="cbDemo" hidden></p>';
  var on=w.querySelector('#cbOn'),box=w.querySelector('#cbBox');
  function paintOn(){on.checked=!!S.prefs.comboOn;box.classList.toggle('v25-dis',!S.prefs.comboOn)}
  on.addEventListener('change',function(){S.prefs.comboOn=on.checked;save();paintOn()});
  bindRanges(w);
  w.querySelector('#cbTry').addEventListener('click',function(){
    var d=w.querySelector('#cbDemo'),t=comboText(libPool(),true);
    d.hidden=false;d.textContent=t||'主字卡是空的，先加几句。';
  });
  paintOn();openSheet('随机拼字卡',w);
}

// ── 后台保活：照 milk 循环放一段听不见的声音。声音在手机上现做，不联网 ──
var KA={a:null,bound:false,url:''};
function kaWav(){
  if(KA.url)return KA.url;
  var sr=8000,n=sr,buf=new ArrayBuffer(44+n*2),v=new DataView(buf);
  function s(o,t){for(var i=0;i<t.length;i++)v.setUint8(o+i,t.charCodeAt(i))}
  s(0,'RIFF');v.setUint32(4,36+n*2,true);s(8,'WAVE');s(12,'fmt ');
  v.setUint32(16,16,true);v.setUint16(20,1,true);v.setUint16(22,1,true);
  v.setUint32(24,sr,true);v.setUint32(28,sr*2,true);v.setUint16(32,2,true);v.setUint16(34,16,true);
  s(36,'data');v.setUint32(40,n*2,true);
  for(var i=0;i<n;i++)v.setInt16(44+i*2,(i%2)?1:-1,true); // 小到听不见
  KA.url=URL.createObjectURL(new Blob([buf],{type:'audio/wav'}));
  return KA.url;
}
function kaPlaying(){return !!(KA.a&&!KA.a.paused)}
function kaPaint(){
  var e=document.getElementById('kaSt');
  if(e)e.textContent=!S.prefs.keepAlive?'关着':(kaPlaying()?'运行中':'点一下页面就开始');
}
function kaAudio(){
  if(KA.a)return KA.a;
  var a=new Audio(kaWav());
  a.loop=true;a.preload='auto';a.volume=0.01;
  a.setAttribute('playsinline','');a.setAttribute('webkit-playsinline','');
  a.addEventListener('play',kaPaint);a.addEventListener('pause',kaPaint);
  KA.a=a;return a;
}
function kaUnlock(){
  if(KA.bound)return;KA.bound=true;
  function go(){
    document.removeEventListener('touchend',go,true);document.removeEventListener('click',go,true);
    KA.bound=false;if(S.prefs.keepAlive&&!kaPlaying())kaStart();
  }
  document.addEventListener('touchend',go,true);document.addEventListener('click',go,true);
}
function kaStart(){
  var a=kaAudio(),pr;
  try{pr=a.play()}catch(e){kaUnlock();return}
  if(pr&&pr.catch)pr.catch(function(){kaUnlock();kaPaint()});
  if('mediaSession' in navigator&&window.MediaMetadata){
    try{navigator.mediaSession.metadata=new MediaMetadata({title:'字卡传讯',artist:taName()+' 在等你'})}catch(e){}
  }
}
function kaStop(){if(KA.a)KA.a.pause();kaPaint()}
document.addEventListener('visibilitychange',function(){
  if(S.prefs.keepAlive&&document.visibilityState==='visible'&&!kaPlaying())kaStart();
});
function openKaSet(){
  var w=document.createElement('div');w.className='v23';
  w.innerHTML='<div class="chk"><label><input type="checkbox" id="kaOn">后台保活<span id="kaSt"></span></label></div>'
    +'<p class="hint">照 milk 的办法：一直循环放一段听不见的声音，让手机觉得这个页面还在用。切去别的 App 时不容易被系统挂起，回复、回信和来电的计时就不会断。</p>'
    +'<p class="hint">有几件事：开着会多耗一点电；会打断你在别的 App 里放的音乐；iPhone 刚打开页面时要先点一下屏幕才会开始放，控制中心里会显示正在播放。系统内存实在不够的时候还是可能被关掉，这个没办法完全保证。</p>';
  var on=w.querySelector('#kaOn');on.checked=!!S.prefs.keepAlive;
  on.addEventListener('change',function(){
    S.prefs.keepAlive=on.checked;save();
    if(on.checked)kaStart();else kaStop();
    kaPaint();
  });
  openSheet('后台保活',w);kaPaint();
}

// ── 设置里加入口 ──
SET_GROUPS.forEach(function(g){
  if(g[0]==='聊天'&&!g[1].some(function(i){return i[0]==='openComboSet'}))
    g[1].push(['openComboSet','随机拼字卡',function(){return S.prefs.comboOn?S.prefs.comboMin+'~'+S.prefs.comboMax+' 张':'关'}]);
});
if(!SET_GROUPS.some(function(g){return g[0]==='后台'})){
  var _di25=-1;SET_GROUPS.forEach(function(g,i){if(g[0]==='数据')_di25=i});
  SET_GROUPS.splice(_di25<0?SET_GROUPS.length:_di25,0,['后台',[['openKaSet','后台保活',function(){return S.prefs.keepAlive?(kaPlaying()?'运行中':'开'):'关'}]]]);
}

if(S.prefs.keepAlive)kaStart();
renderChat();
