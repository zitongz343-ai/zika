// v62：QQ 音乐。接口在自己的 VPS 上（cookie 只在那台机器），这里只存服务器地址和密码
// 侧栏多一个「音乐」：搜歌、我的歌单；传讯页顶上一条「在听」小播放条；⊕ 里多一个「听歌」
'use strict';
(function(){var p=S.prefs;if(!p.mu||typeof p.mu!=='object')p.mu={base:'',tok:''};save()})();
// 链接里带 #mu=地址|密码 就直接填好，然后把它从地址栏抹掉
(function(){
  var m=location.hash.match(/mu=([^&]+)/);if(!m)return;
  try{var v=decodeURIComponent(m[1]).split('|');if(v[0]&&v[1]){S.prefs.mu.base=v[0].trim().replace(/\/+$/,'');S.prefs.mu.tok=v[1].trim();save()}}catch(e){}
  try{history.replaceState(null,'',location.pathname+location.search)}catch(e){}
})();

var MU={a:null,list:[],idx:-1,cur:null,tab:'search',q:'',res:null,sBusy:false,sErr:'',lists:null,listErr:'',lBusy:false,nick:'',pl:null,shown:[],errN:0};
var MI={
  play:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5.5v13l11-6.5z"/></svg>',
  pause:'<svg viewBox="0 0 24 24" fill="currentColor"><rect x="6.5" y="5" width="3.6" height="14" rx="1"/><rect x="13.9" y="5" width="3.6" height="14" rx="1"/></svg>',
  next:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M5 5.5v13l9-6.5z"/><rect x="15.5" y="5.5" width="3" height="13" rx="1"/></svg>',
  prev:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 5.5v13l-9-6.5z"/><rect x="5.5" y="5.5" width="3" height="13" rx="1"/></svg>',
  note:'<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V6l10-2v12"/><circle cx="6.5" cy="18" r="2.5"/><circle cx="16.5" cy="16" r="2.5"/></svg>'
};
function muBase(){var b=String(S.prefs.mu.base||'').trim().replace(/\/+$/,'');if(b&&!/^https?:\/\//.test(b))b='https://'+b;return b}
function muOk(){return !!(muBase()&&S.prefs.mu.tok)}
function muApi(p){
  return fetch(muBase()+p,{headers:{'x-token':S.prefs.mu.tok}}).then(function(r){
    if(r.status===401)throw new Error('token');
    if(!r.ok)throw new Error('http');
    return r.json();
  });
}
function muHttps(u){u=String(u||'');if(/^\/\//.test(u))u='https:'+u;return u.replace(/^http:\/\//,'https://')}
function muErrText(e){return e&&e.message==='token'?'密码不对，去设置 → QQ 音乐里看一下。':'连不上音乐服务器。可能地址换了，去设置 → QQ 音乐里重新填一下。'}
var muToastT=null;
function muToast(t){
  var el=$('muToast');if(!el){el=document.createElement('div');el.id='muToast';document.body.appendChild(el)}
  el.textContent=t;el.classList.add('on');clearTimeout(muToastT);muToastT=setTimeout(function(){el.classList.remove('on')},2400);
}

// ── 播放 ──
function muAudio(){
  if(MU.a)return MU.a;
  var a=new Audio();a.preload='auto';a.setAttribute('playsinline','');a.setAttribute('webkit-playsinline','');
  a.addEventListener('play',muPaintNow);a.addEventListener('pause',muPaintNow);
  a.addEventListener('playing',function(){MU.errN=0});
  a.addEventListener('ended',function(){muNext(1)});
  a.addEventListener('timeupdate',muProg);
  a.addEventListener('error',function(){
    if(!MU.cur||!a.getAttribute('src'))return;
    MU.errN++;muToast('《'+MU.cur.name+'》放不了'+(MU.errN<3&&MU.list.length>1?'，换下一首':''));
    if(MU.errN<3&&MU.list.length>1)setTimeout(function(){muNext(1)},800);
    else{MU.errN=0;muPaintNow()}
  });
  MU.a=a;return a;
}
function muPlay(list,i){if(!list||!list[i])return;MU.list=list.slice();MU.idx=i;muLoad()}
function muLoad(){
  var s=MU.list[MU.idx];if(!s)return;
  MU.cur=s;var a=muAudio();
  a.src=muBase()+'/stream?mid='+encodeURIComponent(s.mid)+'&t='+encodeURIComponent(S.prefs.mu.tok);
  var pr=a.play();if(pr&&pr.catch)pr.catch(function(){});
  muMeta();muPaintNow();
}
function muNext(d){if(!MU.list.length)return;MU.idx=(MU.idx+(d||1)+MU.list.length)%MU.list.length;muLoad()}
function muMeta(){
  if(!('mediaSession' in navigator)||!MU.cur)return;
  var s=MU.cur,ms=navigator.mediaSession;
  try{if(window.MediaMetadata)ms.metadata=new MediaMetadata({title:s.name,artist:s.singer,album:s.album||'',artwork:s.cover?[{src:muHttps(s.cover),sizes:'300x300',type:'image/jpeg'}]:[]})}catch(e){}
  try{
    ms.setActionHandler('play',function(){muAudio().play()});
    ms.setActionHandler('pause',function(){muAudio().pause()});
    ms.setActionHandler('nexttrack',function(){muNext(1)});
    ms.setActionHandler('previoustrack',function(){muNext(-1)});
  }catch(e){}
}

// ── 播放条：音乐页底下一条，传讯页顶上一条小的 ──
function muBarHTML(chat){
  return '<img alt=""><span class="mu-st" data-mu="open"><b></b><em></em></span>'
    +(chat?'':'<button type="button" data-mu="prev" aria-label="上一首">'+MI.prev+'</button>')
    +'<button type="button" data-mu="toggle" aria-label="播放">'+MI.play+'</button>'
    +'<button type="button" data-mu="next" aria-label="下一首">'+MI.next+'</button><i class="pg"></i>';
}
function muBarClick(e){
  var t=e.target.closest('[data-mu]'),self=this;
  if(!t||t.dataset.mu==='open'){if(self.id==='muNow')go('music');return}
  var a=t.dataset.mu,au=muAudio();
  if(a==='toggle'){if(!MU.cur)return;if(au.paused){var p=au.play();if(p&&p.catch)p.catch(function(){})}else au.pause()}
  if(a==='next')muNext(1);
  if(a==='prev')muNext(-1);
}
function muPaintNow(){
  var s=MU.cur,on=!!(MU.a&&!MU.a.paused);
  ['muNow','muPlay'].forEach(function(id){
    var el=$(id);if(!el)return;el.hidden=!s;if(!s)return;
    var im=el.querySelector('img'),c=muHttps(s.cover);
    if(im.getAttribute('src')!==c)im.src=c;
    el.querySelector('b').textContent=s.name;
    el.querySelector('em').textContent=(id==='muNow'?(on?'在听 · ':'暂停了 · '):'')+s.singer;
    var tg=el.querySelector('[data-mu="toggle"]');tg.innerHTML=on?MI.pause:MI.play;tg.setAttribute('aria-label',on?'暂停':'播放');
  });
  var r=$('muRes');
  if(r)r.querySelectorAll('.mu-s[data-i]').forEach(function(x){var it=MU.shown[+x.dataset.i];x.classList.toggle('on',!!(it&&s&&it.mid===s.mid))});
  var sb=$('sbcMu');if(sb)sb.textContent=on?'♪':'';
}
function muProg(){
  var a=MU.a,w=a&&a.duration?Math.min(100,a.currentTime/a.duration*100):0;
  document.querySelectorAll('.mu-bar .pg').forEach(function(p){p.style.width=w+'%'});
}

// ── 音乐页 ──
function muSongs(el,songs,none){
  MU.shown=songs||[];
  if(!MU.shown.length){el.innerHTML=none?'<p class="hint mu-wait">'+none+'</p>':'';return}
  el.innerHTML=MU.shown.map(function(s,i){
    return '<button type="button" class="mu-s'+(MU.cur&&MU.cur.mid===s.mid?' on':'')+'" data-i="'+i+'"><img src="'+esc(muHttps(s.cover))+'" alt="" loading="lazy"><span class="mu-st"><b>'+esc(s.name||'')+'</b><em>'+esc(s.singer||'')+(s.album?' · '+esc(s.album):'')+'</em></span></button>';
  }).join('');
}
function muSearch(q){
  MU.q=q;if(!q)return;
  MU.sBusy=true;MU.sErr='';muDraw();
  muApi('/search?q='+encodeURIComponent(q)).then(function(j){MU.res=j.songs||[]}).catch(function(e){MU.res=[];MU.sErr=muErrText(e)}).then(function(){MU.sBusy=false;muDraw()});
}
function muLoadLists(){
  if(MU.lBusy)return;MU.lBusy=true;
  muApi('/me').then(function(j){
    MU.nick=j.nick||'';
    MU.lists=(j.lists||[]).filter(function(l){return l.id&&l.id!=='undefined'&&l.id!=='0'&&+l.count>0});
  }).catch(function(e){MU.lists=[];MU.listErr=muErrText(e)}).then(function(){MU.lBusy=false;muDraw()});
}
function muOpenPl(id){
  var l=(MU.lists||[]).filter(function(x){return x.id===id})[0]||{};
  MU.pl={id:id,name:l.name||'歌单',songs:[],loading:true,err:''};muDraw();
  muApi('/playlist?id='+encodeURIComponent(id)).then(function(j){
    if(!MU.pl||MU.pl.id!==id)return;MU.pl.songs=j.songs||[];
  }).catch(function(e){if(MU.pl&&MU.pl.id===id)MU.pl.err=muErrText(e)}).then(function(){if(MU.pl&&MU.pl.id===id){MU.pl.loading=false;muDraw()}});
}
function muDraw(){
  var b=$('muBody');if(!b)return;
  $('muSeg').querySelectorAll('[data-t]').forEach(function(x){x.classList.toggle('on',x.dataset.t===MU.tab)});
  if(!muOk()){
    MU.shown=[];
    b.innerHTML='<div class="empty"><b>还没连上 QQ 音乐</b>去设置里填一下服务器地址和密码。</div><button type="button" class="primary" data-mu="set" style="width:100%">去 填</button>';
    return;
  }
  if(MU.tab==='search'){
    if(!b.querySelector('#muQ')){
      b.innerHTML='<form class="mu-q" id="muQ"><input type="search" placeholder="搜歌名、歌手…" enterkeyhint="search" autocomplete="off"><button type="submit" class="primary">搜</button></form><div id="muRes"></div>';
      var inp=b.querySelector('input');inp.value=MU.q;
      b.querySelector('form').addEventListener('submit',function(e){e.preventDefault();inp.blur();muSearch(inp.value.trim())});
    }
    var r=$('muRes');
    if(MU.sBusy){r.innerHTML='<p class="hint mu-wait">找找…</p>';return}
    if(MU.sErr){r.innerHTML='<p class="hint mu-wait">'+esc(MU.sErr)+'</p>';return}
    muSongs(r,MU.res||[],MU.res?'没找到，换个词试试。':'搜一首想听的。');
    return;
  }
  if(MU.pl){
    b.innerHTML='<button type="button" class="sh-back" data-mu="back">‹ 歌单</button><div class="mu-plh"><span class="mu-st"><b>'+esc(MU.pl.name)+'</b><em>'+(MU.pl.loading?'':MU.pl.songs.length+' 首')+'</em></span>'+(MU.pl.songs.length?'<button type="button" class="ghost" data-mu="all">全部播放</button>':'')+'</div><div id="muRes"></div>';
    var pr=$('muRes');
    if(MU.pl.loading){pr.innerHTML='<p class="hint mu-wait">在翻这个歌单…</p>';return}
    if(MU.pl.err){pr.innerHTML='<p class="hint mu-wait">'+esc(MU.pl.err)+'</p>';return}
    muSongs(pr,MU.pl.songs,'这个歌单是空的。');
    return;
  }
  MU.shown=[];
  if(MU.lists===null){b.innerHTML='<p class="hint mu-wait">在拿你的歌单…</p>';muLoadLists();return}
  if(MU.listErr){b.innerHTML='<p class="hint mu-wait">'+esc(MU.listErr)+'</p><button type="button" class="ghost" data-mu="retry" style="width:100%">再试一次</button>';return}
  if(!MU.lists.length){b.innerHTML='<p class="hint mu-wait">没找到你建的歌单。</p>';return}
  b.innerHTML=MU.lists.map(function(l){
    return '<button type="button" class="mu-s" data-pl="'+esc(l.id)+'"><img src="'+esc(muHttps(l.cover))+'" alt="" loading="lazy"><span class="mu-st"><b>'+esc(l.name||'歌单')+'</b><em>'+(+l.count||0)+' 首</em></span></button>';
  }).join('');
}
function muBodyClick(e){
  var t=e.target.closest('[data-mu],[data-i],[data-pl]');if(!t)return;
  if(t.dataset.i!==undefined){muPlay(MU.shown,+t.dataset.i);return}
  if(t.dataset.pl){muOpenPl(t.dataset.pl);return}
  var a=t.dataset.mu;
  if(a==='set')openMuSet();
  if(a==='back'){MU.pl=null;muDraw()}
  if(a==='all'&&MU.pl&&MU.pl.songs.length)muPlay(MU.pl.songs,0);
  if(a==='retry'){MU.lists=null;MU.listErr='';muDraw()}
}

// ── 搭页面：侧栏一项、音乐页、传讯页小条、⊕ 里一格 ──
(function(){
  var vs=$('views');if(!vs||document.querySelector('.view[data-view="music"]'))return;
  var v=document.createElement('section');v.className='view';v.dataset.view='music';
  v.innerHTML='<div class="mo-bar" style="padding-top:24px"><h3>音 乐</h3><span class="hh-date">QQ 音乐</span></div>'
    +'<div class="l4-seg" id="muSeg"><button type="button" data-t="search">搜歌</button><button type="button" data-t="lists">我的歌单</button></div>'
    +'<div id="muBody"></div><div id="muPlay" class="mu-bar" hidden></div>';
  vs.appendChild(v);
  var pl=$('muPlay');pl.innerHTML=muBarHTML(false);pl.addEventListener('click',muBarClick);
  $('muSeg').addEventListener('click',function(e){var b=e.target.closest('[data-t]');if(!b)return;MU.tab=b.dataset.t;muDraw()});
  $('muBody').addEventListener('click',muBodyClick);
  var tb=$('tabbar');
  if(tb&&!tb.querySelector('[data-view="music"]')){
    var t=document.createElement('button');t.className='tab';t.dataset.view='music';
    t.innerHTML='<i>♪</i><span>音乐</span><em id="sbcMu"></em>';
    tb.appendChild(t);
    t.addEventListener('click',function(){go('music');if(typeof closeNav==='function')closeNav()});
  }
  if(typeof IC_DEF==='object'){IC_DEF.music='♪';IC_NAME.music='音乐'}
})();
(function(){
  var cv=document.querySelector('.view[data-view="chat"]'),top=cv&&cv.querySelector('.chat-top');
  if(!top||$('muNow'))return;
  var d=document.createElement('div');d.id='muNow';d.className='mu-bar mini';d.hidden=true;d.innerHTML=muBarHTML(true);
  top.parentNode.insertBefore(d,top.nextSibling);d.addEventListener('click',muBarClick);
})();
(function(){
  var pp=$('plusp');if(!pp||pp.querySelector('[data-mu-go]'))return;
  var t=document.createElement('button');t.type='button';t.dataset.muGo='1';
  t.innerHTML='<i>'+MI.note+'</i><span>听歌</span>';
  t.addEventListener('click',function(){pp.classList.remove('on');var p=$('btnPlus');if(p)p.classList.remove('on');go('music')});
  pp.appendChild(t);
})();
var _goV62=go;
go=function(v){var r=_goV62.apply(this,arguments);if(v==='music')muDraw();return r};

// ── 设置 → 音乐 → QQ 音乐 ──
function openMuSet(){
  var w=document.createElement('div');w.className='v23';
  w.innerHTML='<div class="field"><label>服务器地址</label><input id="muB" placeholder="https://….trycloudflare.com" autocapitalize="off" autocorrect="off" spellcheck="false"></div>'
    +'<div class="field"><label>密码</label><input id="muT" type="password" autocapitalize="off" autocorrect="off" spellcheck="false"></div>'
    +'<button type="button" class="primary" id="muSave" style="width:100%">保存并测试</button><p class="hint" id="muStt"></p>'
    +'<p class="hint">歌是从你自己的服务器转过来的，QQ 音乐的登录只存在服务器上，这里只记地址和密码。登录过期了会搜得到但放不出来，到时候重新登一次 y.qq.com 就行。</p>';
  var b=w.querySelector('#muB'),t=w.querySelector('#muT'),st=w.querySelector('#muStt');
  b.value=S.prefs.mu.base||'';t.value=S.prefs.mu.tok||'';
  w.querySelector('#muSave').addEventListener('click',function(){
    S.prefs.mu.base=b.value.trim().replace(/\/+$/,'');S.prefs.mu.tok=t.value.trim();save();
    MU.lists=null;MU.listErr='';MU.pl=null;
    if(!muOk()){st.textContent='地址和密码都要填。';return}
    st.textContent='在连…';
    muApi('/ping').then(function(j){st.textContent='连上了 · QQ '+(j.uin||'')}).catch(function(e){st.textContent=muErrText(e)}).then(function(){muDraw()});
  });
  openSheet('QQ 音乐',w);
}
(function(){
  if(SET_GROUPS.some(function(g){return g[1].some(function(i){return i[0]==='openMuSet'})}))return;
  SET_GROUPS.splice(Math.max(0,SET_GROUPS.length-1),0,['音乐',[['openMuSet','QQ 音乐',function(){return muOk()?'已填':'没填'}]]]);
})();
