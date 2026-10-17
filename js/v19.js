// v19：回复、回信、拍一拍、通话的概率照 milk；他会拍一拍你；顶栏名字旁边是他的状态；通话分视频和语音，视频能换壁纸；字体能导入 ttf
'use strict';
// milk 的默认值：回复 3~7 秒、已读不回默认关（开了是 20%）、拍一拍 3%、引用 30%、回信 10~24 小时、状态 1~7 小时换一次
// 通话：每 15~60 分钟掷一次，25% 打来；你打过去 35% 不接；他打来 30% 又自己挂掉
var MILK={replyMin:3,replyMax:7,readNo:false,readNoRate:20,pokeRate:3,quoteRate:30,mailRate:100,mailMin:600,mailMax:1440,ringRate:25,rejectRate:35,cancelRate:30,statMin:1,statMax:7};
var SPECIAL=['信','拍一拍','状态'];
function seedTag(tag,arr){
  if(S.lib.some(function(x){return x.tag===tag})||S.libEmpty.indexOf(tag)>=0)return;
  arr.forEach(function(t){S.lib.push({id:uid(),tag:tag,text:t})});
}
(function(){
  var p=S.prefs,k;
  if(!p.v19){for(k in MILK)p[k]=MILK[k];p.v19=1}
  for(k in MILK){if(p[k]===undefined)p[k]=MILK[k];P_DEF[k]=MILK[k]}
  if(typeof p.callWall!=='string')p.callWall='';
  lbEnsure();
  if(!p.v19seed){
    seedTag('拍一拍',['拍了拍我的脑袋','戳了戳我的脸','捏了捏我的手','揉了揉我的头发','拽了拽我的袖子','从背后抱了抱我']);
    seedTag('状态',['在线','想你中','在忙','发呆中','等你回消息','刚睡醒','在看你的照片']);
    p.v19seed=1;
  }
  save();
})();

// 字卡池：回复只用普通分组；拍一拍、状态、信各管各的
libPool=function(){
  var off=S.libOff||[];
  return S.lib.filter(function(x){return SPECIAL.indexOf(x.tag)<0&&!x.off&&off.indexOf(x.tag)<0}).map(function(x){return x.text});
};
function tagPool(t){
  if((S.libOff||[]).indexOf(t)>=0)return [];
  return S.lib.filter(function(x){return x.tag===t&&!x.off}).map(function(x){return x.text});
}
POKES=['拍了拍我的脑袋','戳了戳我的脸','捏了捏我的手','揉了揉我的头发','拽了拽我的袖子'];
function taPoke(){
  var pool=tagPool('拍一拍');if(!pool.length)pool=POKES;
  showTyping(false);
  addReplyCard({id:uid(),from:'ta',type:'poke',text:taName()+' '+pickOne(pool),at:Date.now()});
}

// 照 milk 的 simulateReply：已读 → 已读不回（开了才掷）→ 3% 拍一拍 → 回 1~3 张，第一张 30% 引用你最近 10 句里的一句
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
        var c={id:uid(),from:'ta',text:pickOne(pool),at:Date.now()};
        if(i===0&&mine.length&&Math.random()*100<(+p.quoteRate)){
          var m=pickOne(mine);c.quote={name:S.me.name||'我',text:m.text};
        }
        addReplyCard(c);
        if(i===n-1)showTyping(false);
      },delay);
    })(i);
  }
};

// 照 milk 的回信：8~12 句连成一段，句尾 20% 感叹号、再 20% 省略号、其余句号
composeMail=function(src){
  var pool=libPool().concat(tagPool('信')),n=8+Math.floor(Math.random()*5),s='';
  for(var i=0;i<n&&pool.length;i++){
    var t=pickOne(pool);
    if(!/[。！？!?…~～.」』）)]$/.test(t))t+=Math.random()<0.2?'！':(Math.random()<0.2?'...':'。');
    s+=t;
  }
  return{id:uid(),from:'ta',title:'回：'+src.title,body:s||'收到了。',at:Date.now(),read:false,replyAt:0};
};

// 今日一句也别抽到拍一拍和状态
var _rhV19=renderHome;
renderHome=function(){
  _rhV19();
  var pool=libPool(),d=new Date(),seed=d.getFullYear()*10000+(d.getMonth()+1)*100+d.getDate();
  var q=$('qText');if(q)q.textContent=pool.length?pool[seed%pool.length]:'写一句吧。';
};

// 状态：从「状态」分组里抽，最快到最慢小时之间随机换一次。点一下状态马上换
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
(function(){
  var nm=$('nmTa');if(!nm||$('taSt'))return;
  var row=document.createElement('span');row.className='nmrow';
  nm.parentNode.insertBefore(row,nm);row.appendChild(nm);
  var st=document.createElement('span');st.id='taSt';st.className='ts';st.hidden=true;
  st.addEventListener('click',function(e){e.stopPropagation();stChange()});
  row.appendChild(st);
})();
var _rlV19=refreshLib;
refreshLib=function(){_rlV19();stCheck()};
setInterval(stCheck,60000);
document.addEventListener('visibilitychange',function(){if(!document.hidden)stCheck()});

// 字卡包：拍一拍、状态各进各的分组；导出时也分开写，milk 能认
function addTag(tag,arr,rep){
  arr=(Array.isArray(arr)?arr:[]).map(itemText).filter(Boolean);
  if(!arr.length)return 0;
  if(rep)S.lib=S.lib.filter(function(x){return x.tag!==tag});
  var have={},n=0;
  S.lib.forEach(function(x){if(x.tag===tag)have[x.text]=1});
  arr.forEach(function(t){if(have[t])return;have[t]=1;S.lib.push({id:uid(),tag:tag,text:t});n++});
  lbUnempty(tag);return n;
}
var _prV19=packRows;
packRows=function(d){
  return _prV19(d)+chkRow('pokes','拍一拍（单独一组）',(d.customPokes||[]).length,true)+chkRow('stats','状态（单独一组）',(d.customStatuses||[]).length,true);
};
var _apV19=applyPack;
applyPack=function(d,o,rep){
  var n=_apV19(d,o,rep);
  if(o.pokes)n+=addTag('拍一拍',d.customPokes,rep);
  if(o.stats)n+=addTag('状态',d.customStatuses,rep);
  return n;
};
var _mdV19=milkData;
milkData=function(d){
  var r=_mdV19(d),g=milkGetter(d),a=g('customPokes'),b=g('customStatuses');
  r.pack.customPokes=Array.isArray(a)?a:[];r.pack.customStatuses=Array.isArray(b)?b:[];
  return r;
};
exportPack=function(){
  var base=Date.now(),SP=['拍一拍','状态'];
  function texts(t){return S.lib.filter(function(x){return x.tag===t}).map(function(x){return x.text})}
  var groups=libTags().filter(function(g){return SP.indexOf(g.tag)<0}).map(function(g,i){
    return{id:base+i,name:g.tag,color:lbColor(g.tag),disabled:S.libOff.indexOf(g.tag)>=0,items:texts(g.tag)};
  });
  var plain=S.lib.filter(function(x){return SP.indexOf(x.tag)<0}).map(function(x){return x.text});
  downloadJSON({exportDate:new Date().toISOString(),modules:['replies','groups','pokes','statuses'],customReplies:uniqArr(plain),customReplyGroups:groups,customPokes:uniqArr(texts('拍一拍')),customStatuses:uniqArr(texts('状态'))},'reply-library-'+ymd()+'.json');
};

// 通话：先选视频还是语音。视频能铺一张壁纸，语音就是头像糊成背景
C.kind='video';
function kindName(){return C.kind==='voice'?'语音通话':'视频通话'}
var IC_VIDEO='<svg viewBox="0 0 24 24"><path d="M17 10.5V7a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-3.5l4 4v-11l-4 4z"/></svg>';
var IC_VOICE='<svg viewBox="0 0 24 24"><path d="'+PH+'"/></svg>';
var IC_PIC='<svg viewBox="0 0 24 24" fill-rule="evenodd"><path d="M5 4h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zm0 2v9.6l3.6-3.6a1 1 0 0 1 1.4 0l3 3 2-2a1 1 0 0 1 1.4 0L19 15.6V6H5zm10.5 1.5a1.75 1.75 0 1 1 0 3.5 1.75 1.75 0 0 1 0-3.5z"/></svg>';
var _pwV19=paintWho;
paintWho=function(){
  _pwV19();
  var v=C.kind!=='voice',w=v?S.prefs.callWall:'';
  callBox.dataset.kind=v?'video':'voice';
  callBox.classList.toggle('has-wall',!!w);
  if(w)$('clBg').style.backgroundImage='url("'+w+'")';
};
var _orV19=openRing;
openRing=function(m,t){_orV19(m,String(t||'').replace('视频通话',kindName()))};
var _clV19=callLog;
callLog=function(t){_clV19(String(t||'').replace('视频通话',kindName()))};
// 他打来：视频语音随机；有 30% 响几秒自己挂掉（milk 的 autoRejectChance）
var _incV19=incoming;
incoming=function(){
  if(C.state!=='idle')return;
  C.kind=Math.random()<0.5?'voice':'video';
  _incV19();
  if(C.state==='incoming'&&Math.random()*100<(+S.prefs.cancelRate)){
    clearTimeout(C.timer);
    C.timer=setTimeout(function(){
      if(C.state!=='incoming')return;
      callLog(taName()+' 取消了'+kindName());closeCall();
    },rnd(4000,10000));
  }
};
function callPick(){
  if(C.state!=='idle')return;
  var w=document.createElement('div');
  w.innerHTML='<div class="ck-pick"><button type="button" data-k="video"><i>'+IC_VIDEO+'</i>视频通话</button><button type="button" data-k="voice"><i>'+IC_VOICE+'</i>语音通话</button></div><p class="hint" style="text-align:center">只是界面，不会打开摄像头和麦克风。</p>';
  w.addEventListener('click',function(e){var b=e.target.closest('[data-k]');if(!b)return;C.kind=b.dataset.k;closeSheet();setTimeout(dial,120)});
  openSheet('给 '+taName()+' 打过去',w);
}
(function(){
  var ob=$('btnCall');if(!ob)return;
  var nb=ob.cloneNode(false);
  nb.innerHTML='<svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor"><path d="'+PH+'"/></svg>';
  nb.setAttribute('aria-label','通话');
  ob.parentNode.replaceChild(nb,ob);
  nb.addEventListener('click',callPick);
})();
function setCallWall(cb){
  pickImage(function(src){shrinkSafe(src,1080,false,0.8).then(function(u){
    if(!u){alert('这张读不出来，换一张试试。');return}
    var old=S.prefs.callWall;S.prefs.callWall=u;
    if(!save()){S.prefs.callWall=old;save();alert('这张太大存不下，换一张试试。');return}
    if(cb)cb();
  })});
}
(function(){
  var top=callBox.querySelector('.cl-top');if(!top||$('clWall'))return;
  var b=document.createElement('button');b.id='clWall';b.type='button';b.setAttribute('aria-label','换视频壁纸');b.innerHTML=IC_PIC;
  b.addEventListener('click',function(){setCallWall(function(){paintWho()})});
  top.replaceChild(b,top.lastElementChild);
})();
function openCallWall(){
  var w=document.createElement('div');
  w.innerHTML='<div class="wallprev" id="cwPv" style="height:240px"></div><div class="two"><button class="ghost" id="cwPick" style="flex:1">选一张图</button><button class="ghost" id="cwDel" style="flex:1">去掉</button></div><p class="hint">只在视频通话里用，铺满整个画面，就像他那边的镜头。没设的话用他的头像糊一层当背景。通话中右上角也能换。</p>';
  var pv=w.querySelector('#cwPv');
  function paint(){var s=S.prefs.callWall;pv.style.backgroundImage=s?'url("'+s+'")':'';pv.textContent=s?'':'还没有视频壁纸'}
  w.querySelector('#cwPick').addEventListener('click',function(){setCallWall(paint)});
  w.querySelector('#cwDel').addEventListener('click',function(){S.prefs.callWall='';save();paint()});
  paint();openSheet('视频通话壁纸',w);
}

// 设置 → 聊天 → 回复 · 回信 · 通话：每个滑杆都直接接在上面的逻辑里
PAIRS.statMin=['statMax',1];PAIRS.statMax=['statMin',-1];
var _fmtV19=fmtPref;
fmtPref=function(k,v){if(k==='statMin'||k==='statMax')return v+' 小时';return _fmtV19(k,v)};
openReplySet=function(){
  var w=document.createElement('div');
  w.innerHTML='<p class="hint" style="margin:0 0 4px">默认值都照 milk。「恢复默认」就是回到 milk 的数。</p>'
    +'<div class="sec">字卡回复</div>'+rr('最快多久回一张','replyMin',0,60)+rr('最慢多久回一张','replyMax',0,60)
    +'<div class="chk"><label><input type="checkbox" id="rnTg">允许已读不回<span>milk 默认关</span></label></div>'
    +rr('已读不回概率','readNoRate',0,100)+rr('拍一拍你的概率','pokeRate',0,100)+rr('引用你的话','quoteRate',0,100)
    +'<p class="hint">他一次回 1 到 3 张（75% 一张）。掷中拍一拍就不回字，改成「'+esc(taName())+' 拍了拍我…」，从字卡库「拍一拍」分组里抽。</p>'
    +'<div class="sec">回信</div>'+rr('回信概率','mailRate',0,100)+rr('最快多久回信','mailMin',0,2880,10)+rr('最慢多久回信','mailMax',0,2880,10)
    +'<p class="hint">回信是 8 到 12 句字卡连成一段。从你封好信开始算，页面关着也照算。</p>'
    +'<div class="sec">状态</div>'+rr('最快多久换一次','statMin',1,24)+rr('最慢多久换一次','statMax',1,48)
    +'<p class="hint">从「状态」分组里抽。传讯页名字旁边那个小标签点一下也会换。</p>'
    +'<div class="sec">通话</div>'+rr('主动打来','ringRate',0,100)+rr('你打过去不接','rejectRate',0,100)+rr('打来后又自己挂掉','cancelRate',0,100)
    +'<p class="hint">页面开着时每 15 到 60 分钟掷一次看他打不打来，视频还是语音随机。</p>'
    +'<button class="ghost" id="rsReset" style="width:100%;margin-top:14px">恢复 milk 默认</button>';
  var tg=w.querySelector('#rnTg'),rnRow=w.querySelector('[data-k="readNoRate"]').closest('.field');
  function paintTg(){tg.checked=!!S.prefs.readNo;rnRow.classList.toggle('dis',!S.prefs.readNo)}
  tg.addEventListener('change',function(){S.prefs.readNo=tg.checked;save();paintTg()});
  var paint=bindRanges(w,null,function(k){if(k==='statMin'||k==='statMax'){stRoll();save()}applyReplyPrefs()});
  w.querySelector('#rsReset').addEventListener('click',function(){
    for(var k in MILK)S.prefs[k]=MILK[k];
    stRoll();save();applyReplyPrefs();paint();paintTg();
  });
  paintTg();openSheet('回复 · 回信 · 通话',w);
};
SET_GROUPS.forEach(function(g){
  g[1].forEach(function(it){if(it[0]==='openReplySet'){it[1]='回复 · 回信 · 通话';it[2]=function(){return '照 milk'}}});
  if(g[0]==='聊天'&&!g[1].some(function(i){return i[0]==='openCallWall'}))
    g[1].push(['openCallWall','视频通话壁纸',function(){return S.prefs.callWall?'已设置':'没有'}]);
});

// 字体：导入 ttf / otf / woff / woff2，或者装着字体的 zip。字体放在 IndexedDB，localStorage 装不下
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
      if(FILE_FONT){try{document.fonts.delete(FILE_FONT)}catch(e){}}
      document.fonts.add(f);FILE_FONT=f;return f;
    });
  }
  var st=document.getElementById('fontFile');
  if(!st){st=document.createElement('style');st.id='fontFile';document.head.appendChild(st)}
  st.textContent='@font-face{font-family:"ZikaFile";src:url("'+URL.createObjectURL(new Blob([buf]))+'");font-display:swap}';
  FILE_FONT=true;return Promise.resolve(true);
}
function loadFileFont(){
  if(FILE_FONT)return Promise.resolve(FILE_FONT);
  return fGet().then(function(b){if(!b)throw new Error('none');return useFontBuf(b)});
}
function ensureFileFontItem(){
  if(!S.prefs.fontFile)return;
  var it=FONTS.filter(function(o){return o.id==='file'})[0];
  if(!it){it={id:'file'};FONTS.splice(FONTS.length-1,0,it)}
  it.n='导入的字体';it.d=S.prefs.fontFile;it.f='"ZikaFile","Songti SC",serif';
}
ensureFileFontItem();
var _afV19=applyFont;
applyFont=function(){
  var f=S.prefs.font||{};
  if(f.id!=='file'){_afV19();return}
  loadFileFont().then(function(){
    var fam='"ZikaFile","Songti SC",serif',r=document.documentElement.style;
    r.setProperty('--serif',fam);r.setProperty('--sans',fam);
  }).catch(function(){S.prefs.font={id:'serif',name:'',url:''};save();_afV19()});
};
function fontFromFile(x){
  return x.arrayBuffer().then(function(buf){
    var u=new Uint8Array(buf);
    if(!(u.length>3&&u[0]===0x50&&u[1]===0x4b))return{buf:buf,name:x.name||'字体'};
    return needZip().then(function(Z){return Z.loadAsync(buf)}).then(function(z){
      var ks=Object.keys(z.files).filter(function(k){return !z.files[k].dir&&!/__MACOSX|\/\._/.test(k)&&/\.(ttf|otf|woff2?|ttc)$/i.test(k)});
      if(!ks.length)throw new Error('nofont');
      return z.file(ks[0]).async('arraybuffer').then(function(b){return{buf:b,name:ks[0].split('/').pop()}});
    });
  });
}
function importFont(btn,done){
  var f=document.createElement('input');f.type='file';f.hidden=true;
  document.body.appendChild(f);
  f.addEventListener('change',function(){
    var x=f.files&&f.files[0];f.remove();if(!x)return;
    var old=btn.textContent;btn.disabled=true;btn.textContent='读字体中…';
    var got=null;
    fontFromFile(x).then(function(r){got=r;return useFontBuf(r.buf)}).then(function(){return fPut(got.buf)}).then(function(){
      S.prefs.fontFile=got.name.replace(/\.[^.]+$/,'').slice(0,24)||'字体';
      S.prefs.font={id:'file',name:'',url:''};
      ensureFileFontItem();save();applyFont();
      btn.disabled=false;btn.textContent=old;if(done)done();
    }).catch(function(e){
      btn.disabled=false;btn.textContent=old;
      var m=e&&e.message;
      alert(m==='zip'?'zip 要联网加载一次解压工具，检查网络再试。':m==='nofont'?'zip 里没找到 ttf / otf / woff 字体文件。':(e&&e.name==='QuotaExceededError')?'手机上的空间不够存这个字体了。':'这个文件读不出来，可能不是字体，或者格式不支持。');
    });
  });
  f.click();
}
var _ofV19=openFontSet;
openFontSet=function(){
  _ofV19();
  var box=document.createElement('div');
  box.innerHTML='<div class="sec">导入字体文件</div><button class="ghost" id="ffImp" style="width:100%">'+(S.prefs.fontFile?'换一个字体文件':'选一个字体文件')+'</button><p class="hint">支持 .ttf / .otf / .woff / .woff2，也可以是装着字体的 .zip。字体存在这台手机上，以后不用联网。中文字体一般好几 MB，导入要等几秒。备份文件里不带字体，换手机要重新导一次。</p>';
  box.querySelector('#ffImp').addEventListener('click',function(){importFont(this,function(){closeSheet();setTimeout(function(){openFontSet();addBack()},80)})});
  sheetBody.appendChild(box);
};

applyReplyPrefs();applyFont();stCheck();renderHome();updateNav();
