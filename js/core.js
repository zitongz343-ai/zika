// 核心：状态、工具函数、外观、侧栏、头像、主页、传讯
'use strict';
var S=null;
try{S=JSON.parse(localStorage.getItem(KEY)||'null')}catch(e){S=null}
if(!S||typeof S!=='object')S=defaults();
var D0=defaults();
if(!S.me)S.me=D0.me;if(!S.ta)S.ta=D0.ta;
if(!S.ta.name||S.ta.name==='他')S.ta.name=TA_NAME;
if(typeof S.me.img!=='string')S.me.img='';if(typeof S.ta.img!=='string')S.ta.img='';
if(!Array.isArray(S.cards))S.cards=[];if(!Array.isArray(S.days))S.days=[];
if(!Array.isArray(S.moments))S.moments=[];if(!Array.isArray(S.mails))S.mails=[];if(!Array.isArray(S.draws))S.draws=[];
if(!Array.isArray(S.lib)||!S.lib.length)S.lib=LIB_DEFAULT.slice();
if(!S.theme)S.theme='paper';
S.from='me'; // 聊天页只剩“我说”，他的话由自动回字卡来
if(!S.style)S.style='glass';
if(typeof S.bubbleCSS!=='string')S.bubbleCSS='';
function save(){try{localStorage.setItem(KEY,JSON.stringify(S));return true}catch(e){return false}}
save();
function uid(){return Math.random().toString(36).slice(2,8)+Date.now().toString(36).slice(-4)}
function esc(s){return String(s).replace(/[&<>"']/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
function pad(n){return n<10?'0'+n:''+n}
function fmt(t){var d=new Date(t);return pad(d.getMonth()+1)+'-'+pad(d.getDate())+' '+pad(d.getHours())+':'+pad(d.getMinutes())}
function fmtDay(t){var d=new Date(t);return(d.getMonth()+1)+'月'+d.getDate()+'日'}
function tiltOf(id){var h=0;for(var i=0;i<id.length;i++){h=(h+id.charCodeAt(i)*7)%11}return((h-5)*0.28).toFixed(2)+'deg'}
function dayDiff(str){var now=new Date();now.setHours(0,0,0,0);var p=String(str).split('-');var d=new Date(Number(p[0]),Number(p[1])-1,Number(p[2]));if(isNaN(d.getTime()))return null;return Math.round((now-d)/86400000)}
function nearDay(){var best=null,bestAbs=null,pick=null;for(var i=0;i<S.days.length;i++){var n=dayDiff(S.days[i].date);if(n===null)continue;var a=Math.abs(n);if(bestAbs===null||a<bestAbs){bestAbs=a;best=n;pick=S.days[i]}}return pick?{item:pick,n:best}:null}
function dayText(nd){return nd.item.title+' · '+(nd.n>=0?'第 '+(nd.n+1)+' 天':'还有 '+(-nd.n)+' 天')}
function setAv(el,who){
  if(!el)return;
  el.innerHTML='';
  if(who.img){var im=document.createElement('img');im.src=who.img;im.alt='';el.appendChild(im)}
  else el.textContent=who.avatar||'✦';
}
function avStr(who){return who.img?'<img src="'+esc(who.img)+'" alt="">':esc(who.avatar||'✦')}
function $(id){return document.getElementById(id)}
var stream=$('stream');
var input=$('input');
var sheet=$('sheet');
var sheetTitle=$('sheetTitle');
var sheetBody=$('sheetBody');
var reader=$('reader');
var currentMail=null;
var pickFor=null;
function taName(){return S.ta.name||TA_NAME}
function splash(){
  $('spSub').textContent=(S.me.name||'我')+' × '+taName();
  var sp=$('splash'),done=false;
  function end(){if(done)return;done=true;sp.classList.add('out');setTimeout(function(){sp.style.display='none'},650)}
  sp.addEventListener('click',end);setTimeout(end,2500);
}
function applySkin(){
  document.documentElement.dataset.theme=S.theme;
  document.documentElement.dataset.style=S.style;
  var meta=document.querySelector('meta[name="theme-color"]');
  if(meta)meta.setAttribute('content',S.style==='glass'?'#efe4d4':'#fdf7ec');
}
function paintStyleBtns(){
  $('btnStyle').textContent=S.style==='glass'?'◐':'◼';
  $('sbStyle').textContent=(S.style==='glass'?'◐ ':'◼ ')+'材质';
}
function toggleStyle(){
  S.style=S.style==='glass'?'solid':'glass';
  applySkin();save();paintStyleBtns();
}
function applyBubbleCSS(){
  var el=$('bubbleCustom');
  var css=(S.bubbleCSS||'').trim();
  if(!css){el.textContent='';return}
  el.textContent=css.indexOf('{')>=0?css:'.card{'+css+'}';
}
function paintNames(){
  $('hnMe').textContent=S.me.name||'我';
  $('hnTa').textContent=taName();
  $('nmMe').textContent=S.me.name||'我';
  $('nmTa').textContent=taName();
  setAv($('hpMe'),S.me);setAv($('hpTa'),S.ta);
  setAv($('avMe'),S.me);setAv($('avTa'),S.ta);
  input.placeholder='写一句，递过去…';
  $('moCoverName').textContent=(S.me.name||'我')+' 的朋友圈';
  document.title=taName()+' · 字卡传讯';
  updateNav();
}
function updateNav(){
  setAv($('sbMe'),S.me);setAv($('sbTa'),S.ta);
  $('sbNames').textContent=(S.me.name||'我')+' × '+taName();
  var nd=nearDay();
  $('sbDay').textContent=nd?dayText(nd):'';
  $('sbcChat').textContent=S.cards.length||'';
  $('sbcLib').textContent=S.lib.length||'';
  $('sbcMo').textContent=S.moments.length||'';
  var unread=S.mails.filter(function(m){return !m.read}).length;
  $('sbcMail').textContent=unread?unread+' 未读':(S.mails.length||'');
  $('sbcTarot').textContent=S.draws.length||'';
}
function openNav(){updateNav();document.body.classList.add('nav-open')}
function closeNav(){document.body.classList.remove('nav-open')}
function pickAvatar(k){
  pickFor=k;
  var f=$('avIn');
  f.value='';f.click();
}
$('avIn').addEventListener('change',function(e){
  var f=e.target.files&&e.target.files[0];
  var k=pickFor;
  if(!f||!k)return;
  var fr=new FileReader();
  fr.onload=function(){
    var img=new Image();
    img.onload=function(){
      var size=320,c=document.createElement('canvas');
      c.width=size;c.height=size;
      var s=Math.min(img.width,img.height);
      var sx=(img.width-s)/2,sy=(img.height-s)/2;
      c.getContext('2d').drawImage(img,sx,sy,s,s,0,0,size,size);
      var old=S[k].img;
      S[k].img=c.toDataURL('image/jpeg',0.86);
      if(!save()){S[k].img=old;alert('这张存不下，换一张试试。');return}
      paintNames();renderMoments();
    };
    img.onerror=function(){alert('这张读不出来，换一张试试。')};
    img.src=fr.result;
  };
  fr.readAsDataURL(f);
});
function go(v){
  var views=document.querySelectorAll('.view');
  for(var i=0;i<views.length;i++)views[i].classList.toggle('on',views[i].dataset.view===v);
  var tabs=document.querySelectorAll('.tab');
  for(var j=0;j<tabs.length;j++)tabs[j].classList.toggle('on',tabs[j].dataset.view===v);
  if(v==='home')renderHome();
  if(v==='chat')renderChat();
  if(v==='lib')renderLibPage();
  if(v==='moments')renderMoments();
  if(v==='mail')renderMail();
  if(v==='tarot')renderDraws();
}
function renderHome(){
  var d=new Date();
  $('hhDate').textContent=(d.getMonth()+1)+'月'+d.getDate()+'日 · 星期'+'日一二三四五六'[d.getDay()];
  var nd=nearDay();
  $('hhDay').textContent=nd?dayText(nd):'还没有开始的日子 · 设置里加一个';
  var pool=S.lib.filter(function(x){return x.tag!=='信'});
  var seed=d.getFullYear()*10000+(d.getMonth()+1)*100+d.getDate();
  $('qText').textContent=pool.length?pool[seed%pool.length].text:'写一句吧。';
  $('cChat').textContent=S.cards.length||'';
  $('cMo').textContent=S.moments.length||'';
  $('cMail').textContent=S.mails.length||'';
  $('cTarot').textContent=S.draws.length||'';
}
function renderChat(){
  stream.innerHTML='';
  if(!S.cards.length){
    var e=document.createElement('div');e.className='empty';
    e.innerHTML='<b>这里只放字</b>想说的话，一张一张递过去。<br>名字和头像点上面换。';
    stream.appendChild(e);
  }else{
    for(var i=0;i<S.cards.length;i++)stream.appendChild(cardEl(S.cards[i]));
  }
  requestAnimationFrame(function(){stream.scrollTop=stream.scrollHeight});
}
function cardEl(c){
  var who=c.from==='me'?S.me:S.ta;
  var el=document.createElement('article');
  el.className='card '+(c.from==='me'?'me':'ta');
  el.style.setProperty('--tilt',tiltOf(c.id));
  var head=document.createElement('div');head.className='head';
  var n=document.createElement('span');n.className='n';n.textContent=who.name||'';
  var t=document.createElement('span');t.textContent=fmt(c.at);
  head.appendChild(n);head.appendChild(t);
  var body=document.createElement('p');body.className='body';body.textContent=c.text;
  var seal=document.createElement('div');seal.className='seal';seal.textContent=(who.name||'夜').slice(-1);
  var del=document.createElement('button');del.className='del';del.textContent='撕掉';
  del.addEventListener('click',function(ev){
    ev.stopPropagation();
    if(confirm('撕掉这张？')){S.cards=S.cards.filter(function(x){return x.id!==c.id});save();renderChat()}
  });
  el.appendChild(head);el.appendChild(body);el.appendChild(seal);el.appendChild(del);
  el.addEventListener('click',function(ev){
    if(ev.target===del)return;
    var all=stream.querySelectorAll('.card.show-del');
    for(var i=0;i<all.length;i++)if(all[i]!==el)all[i].classList.remove('show-del');
    el.classList.toggle('show-del');
  });
  return el;
}
function send(){
  var text=input.value.trim();
  if(!text)return;
  if(text.indexOf('/css ')===0){
    S.bubbleCSS=text.slice(5);save();applyBubbleCSS();
    input.value='';input.style.height='auto';
    openBubble();
    return;
  }
  S.cards.push({id:uid(),from:'me',text:text,at:Date.now()});
  input.value='';input.style.height='auto';
  save();renderChat();input.focus();
}
