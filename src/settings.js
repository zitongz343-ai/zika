// 字卡传讯 · 设置：总目录、名字和头像、纪念日、回复概率、拼字卡、提示音、后台保活
// 依赖 state.js、shell.js、chat.js、reply.js、look.js。其余几页（朋友圈互动、视频壁纸、字卡分组、数据）在各自模块里
'use strict';

// ── 名字和头像 ──
function openProfile(){
  var w=document.createElement('div');
  w.innerHTML='<div class="field"><label>我的名字</label><input id="inMeName" maxlength="12"></div>'
    +'<div class="field"><label>他的名字</label><input id="inTaName" maxlength="12"></div>'
    +'<div class="two"><div class="field"><label>我没照片时的符号</label><input id="inMeAv" maxlength="4"></div><div class="field"><label>他没照片时的符号</label><input id="inTaAv" maxlength="4"></div></div>'
    +'<div class="two" style="margin-bottom:12px"><button type="button" class="ghost" data-pick="me" style="flex:1">换我的照片</button><button type="button" class="ghost" data-pick="ta" style="flex:1">换他的照片</button></div>'
    +'<button type="button" class="primary" id="pfSave" style="width:100%">收 好</button>'
    +'<button type="button" class="ghost" id="pfNoImg" style="width:100%;margin-top:10px">照片都换回符号</button>';
  w.querySelector('#inMeName').value=S.me.name||'';w.querySelector('#inMeAv').value=S.me.avatar||'';
  w.querySelector('#inTaName').value=S.ta.name||'';w.querySelector('#inTaAv').value=S.ta.avatar||'';
  w.querySelector('#pfSave').addEventListener('click',function(){
    S.me.name=(w.querySelector('#inMeName').value||'我').trim().slice(0,12);
    S.me.avatar=(w.querySelector('#inMeAv').value||'🌙').trim().slice(0,4);
    S.ta.name=(w.querySelector('#inTaName').value||TA_NAME).trim().slice(0,12);
    S.ta.avatar=(w.querySelector('#inTaAv').value||'✦').trim().slice(0,4);
    save();paintNames();renderHome();openSettings();
  });
  w.querySelector('#pfNoImg').addEventListener('click',function(){
    if(confirm('把两张照片都去掉？')){S.me.img='';S.ta.img='';save();paintNames()}
  });
  subPage('名字和头像',w);
}

// ── 纪念日：一个日子一张卡；点进去单独一页改；能每年倒数；能选主页数哪一个 ──
function dyNext(d){
  var p=String(d.date).split('-'),now=new Date();now.setHours(0,0,0,0);
  var t=new Date(now.getFullYear(),Number(p[1])-1,Number(p[2]));
  if(isNaN(t.getTime()))return null;
  if(t<now)t.setFullYear(t.getFullYear()+1);
  return Math.round((t-now)/864e5);
}
function dyInfo(d){
  var n=dayDiff(d.date);if(n===null)return {num:'—',unit:'',label:''};
  if(d.kind==='yearly'){
    var k=dyNext(d);if(k===null)return {num:'—',unit:'',label:''};
    return k===0?{num:'今天',unit:'',label:''}:{num:k,unit:'天',label:'还有'};
  }
  return n>=0?{num:n+1,unit:'天',label:'第'}:{num:-n,unit:'天',label:'还有'};
}
function dyText(d){
  var i=dyInfo(d);
  if(i.num==='今天')return d.title+' · 就是今天';
  if(i.num==='—')return d.title;
  return d.title+' · '+(i.label==='第'?'第 '+i.num+' 天':'还有 '+i.num+' 天');
}
function dyHome(){
  var pin=S.prefs.dayPin,best=null,ba=null;
  for(var i=0;i<S.days.length;i++)if(S.days[i].id===pin)return S.days[i];
  S.days.forEach(function(d){var n=dayDiff(d.date);if(n===null)return;var a=Math.abs(n);if(ba===null||a<ba){ba=a;best=d}});
  return best;
}
HOME.day=function(){var d=dyHome();return d?dyText(d):''};
function dyFmt(s){var p=String(s).split('-');return p.length===3?p[0]+'.'+p[1]+'.'+p[2]:s}
function dySaved(){save();renderHome();updateNav();openDays()}
function openDays(){
  var w=document.createElement('div');w.className='v27';
  var home=dyHome();
  if(!S.days.length)w.innerHTML=emptyBox('还没有日子','记下在一起的那天，<br>主页会一直替你数着。');
  else w.innerHTML='<div class="v27-list">'+S.days.map(function(d){
    var i=dyInfo(d);
    return '<button type="button" class="v27-d" data-id="'+esc(d.id)+'"><div class="l"><b>'+esc(d.title)+(home&&d.id===home.id?'<span class="v27-tag">主页</span>':'')+'</b><span>'+esc(dyFmt(d.date))+' · '+(d.kind==='yearly'?'每年倒数':'从那天数起')+'</span></div>'
      +'<div class="r">'+(i.label?'<em>'+i.label+'</em>':'')+'<strong>'+esc(String(i.num))+'</strong>'+(i.unit?'<i>'+i.unit+'</i>':'')+'</div></button>';
  }).join('')+'</div>';
  var add=document.createElement('button');add.type='button';add.className='primary v27-add';add.textContent='＋ 记一个日子';
  add.addEventListener('click',function(){dyForm(null)});
  w.appendChild(add);
  var h=document.createElement('p');h.className='hint';h.textContent='点一个日子可以改名字、改日期、删掉，也能选主页上数哪一个。';w.appendChild(h);
  w.addEventListener('click',function(e){
    var b=e.target.closest('[data-id]');if(!b)return;
    var d=S.days.filter(function(x){return x.id===b.dataset.id})[0];if(d)dyForm(d);
  });
  subPage('纪念日',w);
}
function dyForm(d){
  var isNew=!d,kind=d&&d.kind==='yearly'?'yearly':'up';
  var w=document.createElement('div');w.className='v27';
  w.innerHTML='<div class="field"><label>名字</label><input id="dyT" maxlength="16" placeholder="在一起"></div>'
    +'<div class="field"><label>那天</label><label class="v28-date"><span class="v28-dshow" id="dyShow"></span><input id="dyD" type="date"></label></div>'
    +'<div class="field"><label>怎么数</label><div class="seg" id="dyK"><button type="button" data-k="up">从那天数起</button><button type="button" data-k="yearly">每年倒数</button></div></div>'
    +'<p class="hint" id="dyH" style="margin:-6px 0 14px"></p>'
    +'<label class="l4-swrow"><span>显示在主页</span><input type="checkbox" id="dyPin"><i class="l4-tg"></i></label>'
    +'<button type="button" class="primary" id="dyOk" style="width:100%;height:48px">'+(isNew?'记 下':'收 好')+'</button>'
    +(isNew?'':'<button type="button" class="ghost v27-del" id="dyDel">删掉这个日子</button>');
  var t=w.querySelector('#dyT'),dt=w.querySelector('#dyD'),show=w.querySelector('#dyShow'),pin=w.querySelector('#dyPin');
  if(d){t.value=d.title;dt.value=d.date}
  var h=dyHome();pin.checked=isNew?!S.days.length:!!(h&&h.id===d.id&&S.prefs.dayPin===d.id);
  function paintD(){
    var p=dt.value?dt.value.split('-'):null;
    if(p&&p.length===3){show.textContent=p[0]+' 年 '+Number(p[1])+' 月 '+Number(p[2])+' 日';show.classList.remove('ph')}
    else{show.textContent='点这里选日子';show.classList.add('ph')}
  }
  ['change','input','blur'].forEach(function(ev){dt.addEventListener(ev,paintD)});
  function paintK(){
    w.querySelectorAll('#dyK [data-k]').forEach(function(b){b.classList.toggle('on',b.dataset.k===kind)});
    txt('dyH',kind==='yearly'?'生日这种每年都有的，数到下一次还有几天。':'过去的日子数第几天，还没到的数还有几天。');
  }
  w.querySelector('#dyK').addEventListener('click',function(e){var b=e.target.closest('[data-k]');if(!b)return;kind=b.dataset.k;paintK()});
  w.querySelector('#dyOk').addEventListener('click',function(){
    var tt=t.value.trim(),dd=dt.value;
    if(!tt||!dd){alert('名字和日期都填一下。');return}
    var item=d;
    if(isNew){item={id:uid(),title:tt.slice(0,16),date:dd,kind:kind};S.days.push(item)}
    else{item.title=tt.slice(0,16);item.date=dd;item.kind=kind}
    if(pin.checked)S.prefs.dayPin=item.id;else if(S.prefs.dayPin===item.id)S.prefs.dayPin='';
    dySaved();
  });
  var del=w.querySelector('#dyDel');
  if(del)del.addEventListener('click',function(){
    if(!confirm('删掉「'+d.title+'」？'))return;
    S.days=S.days.filter(function(x){return x.id!==d.id});
    if(S.prefs.dayPin===d.id)S.prefs.dayPin='';
    dySaved();
  });
  paintK();paintD();
  subPage(isNew?'记一个日子':'改一下',w,openDays,'纪念日');
}

// ── 回复 · 回信 · 状态 · 通话，默认值照 milk ──
function openReplySet(){
  var w=document.createElement('div');
  w.innerHTML='<p class="hint" style="margin:0 0 4px">默认值都照 milk。「恢复 milk 默认」就是回到 milk 的数。</p>'
    +'<div class="sec">字卡回复</div>'+rr('最快多久回一张','replyMin',0,60)+rr('最慢多久回一张','replyMax',0,60)
    +'<div class="chk">'+ckRow('readNo','允许已读不回','milk 默认关')+'</div>'
    +rr('已读不回概率','readNoRate',0,100)+rr('拍一拍你的概率','pokeRate',0,100)+rr('引用你的话','quoteRate',0,100)
    +'<p class="hint">他一次回 1 到 3 张（75% 一张）。掷中拍一拍就不回字，从「氛围感 → 拍一拍」里抽。</p>'
    +'<div class="sec">回信</div>'+rr('回信概率','mailRate',0,100)+rr('最快多久回信','mailMin',0,2880,10)+rr('最慢多久回信','mailMax',0,2880,10)
    +'<p class="hint">回信是 8 到 12 句字卡连成一段。从你寄出开始算，页面关着也照算。</p>'
    +'<div class="sec">状态</div>'+rr('最快多久换一次','statMin',1,24)+rr('最慢多久换一次','statMax',1,48)
    +'<p class="hint">从「氛围感 → 对方状态」里随机抽，时间到了他自己换。</p>'
    +'<div class="sec">通话</div>'+rr('主动打来','ringRate',0,100)+rr('你打过去不接','rejectRate',0,100)+rr('打来后又自己挂掉','cancelRate',0,100)
    +'<p class="hint">页面开着时每 15 到 60 分钟掷一次看他打不打来，视频还是语音随机。</p>'
    +'<button type="button" class="ghost" id="rsReset" style="width:100%;margin-top:14px">恢复 milk 默认</button>';
  var rn=w.querySelector('[data-k="readNoRate"]').closest('.field'),ck=w.querySelector('[data-ck="readNo"]');
  function paintTg(){rn.classList.toggle('dis',!S.prefs.readNo)}
  function reRing(){if(typeof planRing==='function')planRing()}
  bindChecks(w,paintTg);
  var paint=bindRanges(w,null,function(k){if(k==='statMin'||k==='statMax'){stRoll();save()}if(/^(ring|reject|cancel)/.test(k))reRing()});
  w.querySelector('#rsReset').addEventListener('click',function(){
    MILK_KEYS.forEach(function(k){S.prefs[k]=clone(PREF_DEF[k])});
    stRoll();save();paint();ck.checked=!!S.prefs.readNo;paintTg();reRing();
  });
  paintTg();subPage('回复 · 回信 · 通话',w);
}

// ── 随机拼字卡 ──
function openComboSet(){
  var w=document.createElement('div');w.className='v23';
  w.innerHTML='<div class="chk">'+ckRow('comboOn','随机拼字卡','默认关')+'</div>'
    +'<div id="cbBox">'+rr('拼卡概率','comboRate',0,100)+rr('最少几张','comboMin',2,6)+rr('最多几张','comboMax',2,6)+'</div>'
    +'<p class="hint">开了以后，'+esc(taName())+'回你的每一张，按上面的概率从主字卡里随机挑几张拼成一句，中间随机加逗号、句号、省略号这些。字卡末尾本来就有标点的，就不再加。拍一拍、状态、每日一句不会拼进来。</p>'
    +'<button type="button" class="ghost" id="cbTry" style="width:100%;margin-top:6px">拼一句看看</button><p class="v25-demo" id="cbDemo" hidden></p>';
  var box=w.querySelector('#cbBox');
  function paintOn(){box.classList.toggle('v25-dis',!S.prefs.comboOn)}
  bindChecks(w,paintOn);bindRanges(w);
  w.querySelector('#cbTry').addEventListener('click',function(){
    var d=w.querySelector('#cbDemo'),t=comboText(libPool(),true);
    d.hidden=false;d.textContent=t||'主字卡是空的，先加几句。';
  });
  paintOn();subPage('随机拼字卡',w);
}

// ── 提示音 ──
function openSndSet(){
  var w=document.createElement('div');w.className='v23';
  w.innerHTML='<div class="chk">'+ckRow('snd','收到消息响一声','默认开')+ckRow('sndPoke','拍一拍也响','')+'</div>'
    +'<div class="field"><label>声音（点一下试听）</label><div class="v26-snds" id="sdList"></div></div>'
    +rr('音量','sndVol',0,100,5)
    +'<p class="hint">声音是手机现做的，不联网。每次打开页面要先点一下屏幕，声音才放得出来。手机开着静音键的时候不会响。</p>';
  var list=w.querySelector('#sdList');
  function draw(){list.innerHTML=Object.keys(SND).map(function(k){return '<button type="button" class="lb-pill'+(S.prefs.sndKind===k?' on':'')+'" data-s="'+k+'">'+SND[k].n+'</button>'}).join('')}
  list.addEventListener('click',function(e){
    var b=e.target.closest('[data-s]');if(!b)return;
    S.prefs.sndKind=b.dataset.s;save();draw();playSnd(b.dataset.s,true);
  });
  bindChecks(w);bindRanges(w,null,function(){playSnd(null,true)});
  draw();subPage('提示音',w);
}
(function(){var st=document.createElement('style');st.textContent='.v26-snds{display:flex;flex-wrap:wrap;gap:8px}.v26-snds .lb-pill{padding:8px 14px;font-size:13px}';document.head.appendChild(st)})();

// ── 后台保活：「不显示」用 Web Audio 放听不见的声音，灵动岛一般不出现；「更稳」照 milk 用网页播放器 ──
var KA={a:null,url:'',src:null,bound:false};
function kaWav(){
  if(KA.url)return KA.url;
  var sr=8000,n=sr,buf=new ArrayBuffer(44+n*2),v=new DataView(buf);
  function s(o,t){for(var i=0;i<t.length;i++)v.setUint8(o+i,t.charCodeAt(i))}
  s(0,'RIFF');v.setUint32(4,36+n*2,true);s(8,'WAVE');s(12,'fmt ');
  v.setUint32(16,16,true);v.setUint16(20,1,true);v.setUint16(22,1,true);
  v.setUint32(24,sr,true);v.setUint32(28,sr*2,true);v.setUint16(32,2,true);v.setUint16(34,16,true);
  s(36,'data');v.setUint32(40,n*2,true);
  for(var i=0;i<n;i++)v.setInt16(44+i*2,(i%2)?1:-1,true);
  KA.url=URL.createObjectURL(new Blob([buf],{type:'audio/wav'}));
  return KA.url;
}
function kaMedia(){return S.prefs.kaMode==='media'}
function kaPlaying(){return kaMedia()?!!(KA.a&&!KA.a.paused):!!(KA.src&&AC&&AC.state==='running')}
function kaPaint(){txt('kaSt',!S.prefs.keepAlive?'关着':(kaPlaying()?'运行中':'点一下页面就开始'))}
function kaUnlock(){
  if(KA.bound)return;KA.bound=true;
  function go2(){
    document.removeEventListener('touchend',go2,true);document.removeEventListener('click',go2,true);
    KA.bound=false;if(S.prefs.keepAlive&&!kaPlaying())setTimeout(kaStart,60);
  }
  document.addEventListener('touchend',go2,true);document.addEventListener('click',go2,true);
}
function clearMS(){
  if(!('mediaSession' in navigator))return;
  try{navigator.mediaSession.metadata=null}catch(e){}
  try{navigator.mediaSession.playbackState='none'}catch(e){}
}
function kaStopQuiet(){if(KA.src){try{KA.src.stop()}catch(e){}try{KA.src.disconnect()}catch(e){}KA.src=null}}
function kaStopMedia(){if(KA.a)KA.a.pause()}
function kaStop(){kaStopQuiet();kaStopMedia();kaPaint()}
function kaStart(){
  if(!S.prefs.keepAlive){kaStop();return}
  if(kaMedia()){
    kaStopQuiet();
    if(!KA.a){
      var a=new Audio(kaWav());a.loop=true;a.preload='auto';a.volume=0.01;
      a.setAttribute('playsinline','');a.setAttribute('webkit-playsinline','');
      a.addEventListener('play',kaPaint);a.addEventListener('pause',kaPaint);KA.a=a;
    }
    var pr;try{pr=KA.a.play()}catch(e){kaUnlock();return}
    if(pr&&pr.catch)pr.catch(function(){kaUnlock();kaPaint()});
    if('mediaSession' in navigator&&window.MediaMetadata){try{navigator.mediaSession.metadata=new MediaMetadata({title:'字卡传讯',artist:taName()+' 在等你'})}catch(e){}}
  }else{
    kaStopMedia();clearMS();
    var c=ac();
    if(!c||c.state!=='running'){kaUnlock();kaPaint();return}
    if(!KA.src){
      var b=c.createBuffer(1,c.sampleRate,c.sampleRate),d=b.getChannelData(0);
      for(var i=0;i<d.length;i++)d[i]=(i%2?1:-1)*0.00002;
      var s=c.createBufferSource();s.buffer=b;s.loop=true;s.connect(c.destination);s.start(0);KA.src=s;
    }
  }
  kaPaint();
}
AC_HOOK.push(function(st){if(st==='running'&&S.prefs.keepAlive&&!kaMedia()&&!KA.src)kaStart();kaPaint()});
document.addEventListener('visibilitychange',function(){if(S.prefs.keepAlive&&document.visibilityState==='visible'&&!kaPlaying())kaStart()});
var KA_HINT={
  quiet:'不走网页播放器，灵动岛和控制中心一般不会出现，也不会打断你放的音乐。代价是切到别的 App 以后，iOS 更容易把它停掉。',
  media:'跟 milk 一样，最稳。但灵动岛和控制中心会显示「正在播放」，还会打断你在别的 App 里放的音乐。'
};
function openKaSet(){
  var w=document.createElement('div');w.className='v23';
  w.innerHTML='<div class="chk"><label><input type="checkbox" data-ck="keepAlive">后台保活<span id="kaSt"></span></label></div>'
    +'<div class="field" style="margin-top:10px"><label>方式</label><div class="seg" data-sg="kaMode"><button type="button" data-v="quiet">不显示</button><button type="button" data-v="media">更稳（会显示）</button></div><p class="hint" id="kaModeHint" style="margin-top:0"></p></div>'
    +'<p class="hint">一直循环放一段听不见的声音，让手机觉得这个页面还在用，切去别的 App 时不容易被挂起，回复、回信和来电的计时就不会断。开着会多耗一点电；刚打开页面时要先点一下屏幕才会开始。系统内存不够、开了低电量模式，或者在多任务里划掉，还是会断，这个没办法完全保证。</p>';
  function paintH(){txt('kaModeHint',KA_HINT[S.prefs.kaMode]||'')}
  bindChecks(w,function(){kaStart()});
  bindSeg(w,function(){paintH();if(S.prefs.keepAlive)kaStart()});
  paintH();subPage('后台保活',w);kaPaint();
}
onBoot(function(){if(S.prefs.keepAlive)kaStart()});

// ── 设置总目录 ──
var SET_GROUPS=[
  ['我们',[['openProfile','名字和头像',function(){return meName()+' × '+taName()}],['openDays','纪念日',function(){return HOME.day()||'还没有'}]]],
  ['外观',[['sw:dark','夜间模式'],['openLook','材质与配色',function(){return lookSummary()}],['openWallSet','壁纸',function(){return wallSummary()}],['openIconSet','板块图标',function(){return ''}],['openFontSet','全局字体',function(){return fontName()+' · '+S.prefs.fontScale+'%'}]]],
  ['聊天样式',[['openBubble','聊天气泡',function(){return S.prefs.bubKind==='plain'?'普通气泡':'便签'}],['openAvSet','聊天头像',function(){return avSummary()}]]],
  ['他怎么回你',[['openReplySet','回复 · 回信 · 通话',function(){return '照 milk'}],['openComboSet','随机拼字卡',function(){return S.prefs.comboOn?S.prefs.comboMin+'~'+S.prefs.comboMax+' 张':'关'}],['openMoSet','朋友圈互动',function(){return '赞 '+S.prefs.moLikeRate+'% · 评 '+S.prefs.moCmtRate+'%'}],['openSndSet','提示音',function(){return S.prefs.snd?(SND[S.prefs.sndKind]||SND.bell).n:'关'}]]],
  ['字卡与通话',[['l4GroupsSheet','字卡分组',function(){return mainTags().length+' 组'}],['openCallWall','视频通话壁纸',function(){return S.prefs.callWall?'已设置':'没有'}]]],
  ['后台与数据',[['openKaSet','后台保活',function(){if(!S.prefs.keepAlive)return '关';return (kaMedia()?'更稳':'不显示')+' · '+(kaPlaying()?'运行中':'等点一下')}],['openData','数据备份与导入',function(){return '也认 milk'}]]]
];
function swVal(k){return k==='dark'?!!S.prefs.dark:!!S.prefs[k]}
// 别的模块的页面要是自己开的半屏，这里补成全屏，并加上「‹ 设置」
function asSubPage(){
  if(sheet.hidden)return;
  sheet.classList.add('full');
  if(!sheetBody.querySelector('.sh-back')){
    var b=document.createElement('button');b.type='button';b.className='sh-back';b.textContent='‹ 设置';
    b.addEventListener('click',openSettings);sheetBody.insertBefore(b,sheetBody.firstChild);
  }
}
function openSettings(){
  var w=document.createElement('div');
  SET_GROUPS.forEach(function(g){
    var items=g[1].filter(function(it){return it[0].indexOf('sw:')===0||typeof window[it[0]]==='function'});
    if(!items.length)return;
    var h=document.createElement('div');h.className='sec';h.textContent=g[0];w.appendChild(h);
    var box=document.createElement('div');box.className='menu-list set-grp';
    items.forEach(function(it){
      var b=document.createElement('button');b.type='button';b.className='mi';
      if(it[0].indexOf('sw:')===0){
        var k=it[0].slice(3);b.dataset.sw=k;
        b.innerHTML='<b>'+esc(it[1])+'</b><span class="tg'+(swVal(k)?' on':'')+'"></span>';
      }else{
        b.dataset.fn=it[0];
        var v='';try{v=it[2]?it[2]():''}catch(e){}
        b.innerHTML='<b>'+esc(it[1])+'</b><span>'+esc(v)+' ›</span>';
      }
      box.appendChild(b);
    });
    w.appendChild(box);
  });
  w.addEventListener('click',function(e){
    var s=e.target.closest('[data-sw]');
    if(s){
      var k=s.dataset.sw;
      if(k==='dark')toggleDark();else{S.prefs[k]=!S.prefs[k];save()}
      s.querySelector('.tg').classList.toggle('on',swVal(k));
      return;
    }
    var b=e.target.closest('[data-fn]');if(!b)return;
    var fn=window[b.dataset.fn];if(typeof fn!=='function')return;
    fn();asSubPage();
  });
  openSheet('设置',w,{full:true});
}
(function(){
  var b=$('btnSet');if(b)b.addEventListener('click',openSettings);
  var s=$('sbSet');if(s)s.addEventListener('click',function(){closeNav();openSettings()});
})();
