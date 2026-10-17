// 字卡传讯 · 传讯页：字卡怎么画（便签 / 普通气泡、头像、引用、收藏）、发送、引用条、正在输入、收藏页、键盘
// 依赖 state.js、shell.js。他回的字卡走 addCard，提示音和通话字幕用 onTaCard / onTyping 挂进来
'use strict';
var stream=$('stream'),input=$('input'),QUOTE=null;
var TA_CARD_HOOK=[],TYPING_HOOK=[];
function onTaCard(fn){TA_CARD_HOOK.push(fn)}
function onTyping(fn){TYPING_HOOK.push(fn)}
var typingEl=document.createElement('div');typingEl.id='typing';typingEl.hidden=true;
var qBar=document.createElement('div');qBar.id='qBar';qBar.hidden=true;
(function(){var f=document.querySelector('.chat-foot');f.parentNode.insertBefore(typingEl,f);f.insertBefore(qBar,f.firstChild)})();

function mk(tag,cls,text){var e=document.createElement(tag);if(cls)e.className=cls;if(text!==undefined)e.textContent=text;return e}
function actBtn(t,cls,fn){var b=mk('button',cls,t);b.type='button';b.addEventListener('click',function(e){e.stopPropagation();fn(b)});return b}
function sid(id){return String(id).replace(/["\\]/g,'')}

// ── 收藏 ──
function isFav(id){return S.favs.some(function(f){return f.cardId===id})}
function toggleFav(c){
  if(isFav(c.id))S.favs=S.favs.filter(function(f){return f.cardId!==c.id});
  else S.favs.unshift({id:uid(),cardId:c.id,name:taName(),text:c.text,at:c.at,favAt:Date.now()});
  save();updateNav();
  var on=isFav(c.id);
  document.querySelectorAll('[data-fav="'+sid(c.id)+'"]').forEach(function(b){b.textContent=on?'取消收藏':'收藏'});
  document.querySelectorAll('[data-star="'+sid(c.id)+'"]').forEach(function(s){s.hidden=!on});
}
function starEl(c){var s=mk('span','fv','★');s.dataset.star=c.id;s.hidden=!isFav(c.id);return s}

// ── 一张字卡 ──
// 便签：名字、时间、已读都在卡里；普通气泡：时间和已读挂在气泡下面。开了头像就再包一层
function cardEl(c){
  if(c.type==='poke')return mk('div','poke','✦ '+c.text+' ✦');
  if(c.type==='call')return mk('div','poke','◉ '+c.call);
  var me=c.from==='me',who=me?S.me:S.ta,plain=S.prefs.bubKind==='plain';
  var el=mk('article','card '+(me?'me':'ta'));
  el.style.setProperty('--tilt',tiltOf(c.id));
  var head=mk('div','head');
  head.appendChild(mk('span','n',who.name||''));head.appendChild(mk('span','',fmt(c.at)));
  if(!plain){
    if(me&&c.read)head.appendChild(mk('span','rd','已读'));
    if(!me)head.appendChild(starEl(c));
  }
  el.appendChild(head);
  if(c.quote){
    var q=mk('div','qt');q.appendChild(mk('b','',c.quote.name||''));
    q.appendChild(document.createTextNode(c.quote.text||''));el.appendChild(q);
  }
  el.appendChild(mk('p','body',c.text));
  el.appendChild(mk('div','seal',(who.name||'夜').slice(-1)));
  var acts=mk('div','acts');
  if(!me){
    acts.appendChild(actBtn('引用','',function(){setQuote({name:taName(),text:c.text});el.classList.remove('show-del')}));
    var fb=actBtn(isFav(c.id)?'取消收藏':'收藏','',function(){toggleFav(c)});fb.dataset.fav=c.id;acts.appendChild(fb);
  }
  acts.appendChild(actBtn('撕掉','del',function(){
    if(!confirm('撕掉这张？'))return;
    S.cards=S.cards.filter(function(x){return x.id!==c.id});save();renderChat();updateNav();
  }));
  el.appendChild(acts);
  el.addEventListener('click',function(){
    stream.querySelectorAll('.card.show-del').forEach(function(x){if(x!==el)x.classList.remove('show-del')});
    el.classList.toggle('show-del');
  });
  var out=el;
  if(plain){
    var col=mk('div','pcol '+(me?'me':'ta')),m=mk('div','pmeta');
    col.appendChild(el);
    if(me&&c.read)m.appendChild(mk('span','rd2','已读'));
    m.appendChild(mk('span','tm',fmtHM(c.at)));
    if(!me)m.appendChild(starEl(c));
    col.appendChild(m);out=col;
  }
  if(S.prefs.msgAv){
    var row=mk('div','crow '+(me?'me':'ta')),av=mk('span','cav');
    setAv(av,who);row.appendChild(av);row.appendChild(out);out=row;
  }
  return out;
}
function renderChat(){
  stream.innerHTML='';
  if(!S.cards.length){
    var e=mk('div','empty');e.innerHTML='<b>这里只放字</b>想说的话，一张一张递过去。';stream.appendChild(e);
  }else{
    var f=document.createDocumentFragment();
    S.cards.forEach(function(c){f.appendChild(cardEl(c))});
    stream.appendChild(f);
  }
  requestAnimationFrame(function(){stream.scrollTop=stream.scrollHeight});
}
// 新来一张只往后接，不整页重画
function addCard(c){
  S.cards.push(c);save();
  var em=stream.querySelector('.empty');if(em)em.remove();
  stream.appendChild(cardEl(c));
  requestAnimationFrame(function(){stream.scrollTop=stream.scrollHeight});
  updateNav();
  if(c.from==='ta')runHooks(TA_CARD_HOOK,c);
}
onView('chat',renderChat);
NAV_COUNT.chat=function(){return S.cards.length};

// ── 正在输入 ──
function showTyping(on){
  typingEl.hidden=!on;
  if(on)typingEl.innerHTML='<span class="ty-av">'+avStr(S.ta)+'</span><span>'+esc(taName())+' 正在输入</span><i></i><i></i><i></i>';
  var st=document.querySelector('.chat-top .who .st');if(st)st.textContent=on?'正在输入…':'在线';
  runHooks(TYPING_HOOK,on);
}

// ── 引用条和发送 ──
function setQuote(q){
  QUOTE=q;qBar.hidden=!q;qBar.innerHTML='';
  if(!q)return;
  var s=mk('span');s.appendChild(mk('b','',q.name));s.appendChild(document.createTextNode(q.text));
  qBar.appendChild(s);
  qBar.appendChild(actBtn('×','',function(){setQuote(null)}));
  input.focus();
}
function fitInput(){input.style.height='auto';input.style.height=Math.min(input.scrollHeight,120)+'px'}
function fillInput(t){input.value=t;input.focus();fitInput()}
function useLine(t){go('chat');fillInput(t)}
function send(){
  var text=input.value.trim();if(!text)return;
  var c={id:uid(),from:'me',text:text,at:Date.now()};
  if(QUOTE){c.quote=QUOTE;setQuote(null)}
  input.value='';fitInput();
  addCard(c);input.focus();
  if(typeof scheduleReply==='function')scheduleReply();
}
$('btnSend').addEventListener('click',send);
input.addEventListener('input',fitInput);
input.addEventListener('keydown',function(e){if(e.key==='Enter'&&!e.shiftKey&&!e.isComposing){e.preventDefault();send()}});

// 自定义气泡 CSS：写声明就套到 .card 上，写整段规则就原样用
function applyBubbleCSS(){
  var el=$('bubbleCustom');if(!el)return;
  var css=(S.bubbleCSS||'').trim();
  el.textContent=!css?'':(css.indexOf('{')>=0?css:'.card{'+css+'}');
}

// 顶栏：只留他的名字和状态，点名字进设置
onWho(function(){
  setAv($('avTa'),S.ta);setAv($('avMe'),S.me);
  txt('nmTa',taName());txt('nmMe',meName());
  input.placeholder='写一句，递过去…';
  if(curView()==='chat')renderChat();
});
document.querySelectorAll('.chat-top .who').forEach(function(b){
  b.addEventListener('click',function(){if(typeof openSettings==='function')openSettings()});
});

// ── 收藏页 ──
function renderFav(){
  var box=$('favList');if(!box)return;
  txt('favCount',S.favs.length?S.favs.length+' 句':'');
  if(!S.favs.length){box.innerHTML=emptyBox('还没有收藏','在传讯页点一下'+esc(taName())+'的字卡，<br>选「收藏」就会放到这里。');return}
  box.innerHTML='';
  S.favs.forEach(function(f){
    var a=mk('article','fav');
    a.innerHTML='<p></p><div class="fm"><span></span><button type="button" data-f="q">引用回他</button><button type="button" data-f="rm">取消收藏</button></div>';
    a.querySelector('p').textContent=f.text;
    a.querySelector('.fm span').textContent=(f.name||taName())+' · '+fmt(f.at);
    a.addEventListener('click',function(e){
      var b=e.target.closest('[data-f]');if(!b)return;
      if(b.dataset.f==='q'){go('chat');setQuote({name:f.name||taName(),text:f.text})}
      if(b.dataset.f==='rm'){S.favs=S.favs.filter(function(x){return x.id!==f.id});save();renderFav();updateNav()}
    });
    box.appendChild(a);
  });
}
onView('fav',renderFav);
NAV_COUNT.fav=function(){return S.favs.length};

// ── 键盘：页面高度跟着键盘上方那块可见区域，顶栏不被顶出去 ──
(function(){
  var vv=window.visualViewport,root=document.documentElement;
  function fit(){
    root.style.setProperty('--app-h',Math.round(vv?vv.height:window.innerHeight)+'px');
    root.style.setProperty('--app-top',Math.round(vv?vv.offsetTop:0)+'px');
  }
  if(vv){vv.addEventListener('resize',fit);vv.addEventListener('scroll',fit)}
  window.addEventListener('resize',fit);
  document.addEventListener('focusin',function(e){
    var t=e.target;if(!t||!t.matches||!t.matches('input,textarea'))return;
    setTimeout(function(){fit();if(t===input)stream.scrollTop=stream.scrollHeight},320);
  });
  document.addEventListener('focusout',function(){setTimeout(fit,120)});
  fit();
})();
onBoot(applyBubbleCSS);
