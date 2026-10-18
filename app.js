// 字卡传讯 · app.js
// 按原来的加载顺序合成一个文件，每段开头的 ===== 写着它原来是哪个文件
// 每段包了 try：一段出错不连累后面的段，跟以前分文件时一样

/* ===== js/data.js ===== */
try{
defaults=function(){return{me:{name:'江月棠',avatar:'🌙',img:''},ta:{name:TA_NAME,avatar:'✦',img:''},theme:'paper',style:'glass',cards:[],days:[],lib:LIB_DEFAULT.slice(),moments:[],mails:[],draws:[],from:'me',bubbleCSS:''}};
// 数据：默认字卡库、塔罗牌、默认状态
var KEY='mj_zika_v2';
var TA_NAME='顾时夜';
var LIB_DEFAULT=[
{tag:'想他',text:'今天风大，我第一反应是想告诉你。'},
{tag:'想他',text:'你不在的时候，时间过得很慢，慢得有点难熬。'},
{tag:'想他',text:'我刚才笑了一下，因为想到你。'},
{tag:'想他',text:'有件事我只想跟你说，但还没想好怎么说。'},
{tag:'想他',text:'你在做什么。不用回，我就是想知道。'},
{tag:'晚安',text:'睡了。梦里别乱跑，站在原地等我。'},
{tag:'晚安',text:'晚安。灯我关了，你那边也早点。'},
{tag:'晚安',text:'今天到这儿。明天醒来第一句给你。'},
{tag:'撒娇',text:'你今天还没理我。'},
{tag:'撒娇',text:'过来。'},
{tag:'撒娇',text:'我不高兴，你猜为什么。'},
{tag:'撒娇',text:'抱一下，就一下。'},
{tag:'嘴硬',text:'随便你。'},
{tag:'嘴硬',text:'我没生气。真的。'},
{tag:'嘴硬',text:'你爱怎样怎样，我不管了。'},
{tag:'嘴硬',text:'算了，当我没说。'},
{tag:'日常',text:'吃饭了吗。'},
{tag:'日常',text:'外面下雨了，带伞。'},
{tag:'日常',text:'今天很累，不想说话，但想听你说。'},
{tag:'日常',text:'看到一只猫，长得像你。'},
{tag:'日常',text:'路过那家店，还是那个味道。'},
{tag:'信',text:'写到这里卡住了。想说的太多，纸不够。'}];
var TAROT=[
{n:'愚人',e:'The Fool',s:'🌱',up:'新的开始。不用准备好，走出去就是了。',rev:'冲动。你在拿没想清楚的事当勇气。'},
{n:'魔术师',e:'The Magician',s:'🎩',up:'你手里其实有牌。开口、动手，就能成。',rev:'空谈。想得比做得多。'},
{n:'女祭司',e:'The High Priestess',s:'🌙',up:'别急着说。你心里已经有答案了。',rev:'自我隐瞒。你在装作不知道。'},
{n:'女帝',e:'The Empress',s:'🌾',up:'被好好对待的时候。也去好好对待人。',rev:'过度付出。先顾自己。'},
{n:'皇帝',e:'The Emperor',s:'👑',up:'立个规矩。该定的定下来。',rev:'控制过头。松一点。'},
{n:'教皇',e:'The Hierophant',s:'🔑',up:'找个懂的人问一句。老办法有用。',rev:'不想听劝。你在硬撑。'},
{n:'恋人',e:'The Lovers',s:'💞',up:'选它。这一次选心里那个。',rev:'犹豫。两头都想要，就两头都没有。'},
{n:'战车',e:'The Chariot',s:'🐎',up:'往前走，别回头解释。',rev:'方向乱了。先停下看清楚。'},
{n:'力量',e:'Strength',s:'🦁',up:'温柔比强硬更管用。你比你以为的能扛。',rev:'硬撑。承认累不丢人。'},
{n:'隐士',e:'The Hermit',s:'🕯',up:'一个人待会儿。灯在你自己手上。',rev:'关太久。该出来了。'},
{n:'命运之轮',e:'Wheel of Fortune',s:'☸',up:'轮到你了。接住。',rev:'卡住的一段时间。会过去。'},
{n:'正义',e:'Justice',s:'⚖',up:'该算清的算清。该说的说清楚。',rev:'偏了。你在给自己找理由。'},
{n:'倒吊人',e:'The Hanged Man',s:'🙃',up:'换个方向看。停着也是一种走。',rev:'白等。你不是在等，是在拖。'},
{n:'死神',e:'Death',s:'💀',up:'结束了。别缝补，让它过去。',rev:'不肯放手。握着的是壳。'},
{n:'节制',e:'Temperance',s:'🍶',up:'调一调。慢一点正好。',rev:'过了。多一点就变味。'},
{n:'恶魔',e:'The Devil',s:'⛓',up:'你看清那条链子是松的。',rev:'还在里面。但你知道出口在哪。'},
{n:'高塔',e:'The Tower',s:'🗼',up:'塌了。塌了才看得见天。',rev:'怕它塌。其实已经在裂了。'},
{n:'星星',e:'The Star',s:'⭐',up:'许个愿。这次会有人接。',rev:'不信了。别把希望关掉。'},
{n:'月亮',e:'The Moon',s:'🌕',up:'看不清就先别走。等天亮。',rev:'自己吓自己。多半没事。'},
{n:'太阳',e:'The Sun',s:'☀',up:'好日子。笑就笑，别忍着。',rev:'光被挡住了。但还在。'},
{n:'审判',e:'Judgement',s:'📯',up:'该回的话回了。该认的认了。',rev:'装作没听见。心里响着呢。'},
{n:'世界',e:'The World',s:'🌍',up:'这一圈走完了。可以庆祝。',rev:'差最后一步。别停在这儿。'}];


}catch(e){console.error("[zika] js/data.js",e)}

/* ===== js/theme.js ===== */
try{

// 开屏随机文案，取自 milk 的 WELCOME_ANIMATIONS
var SPLASH_LINES=[
['Love','若要由我来谈论爱的话'],
['Echo','听见我的回音了吗'],
['Soulmate','灵魂正在共振'],
['Melody','心跳的旋律为你奏响'],
['Destiny','命运的红线将我们相连'],
['Memory','创造属于我们的回忆'],
['∞','无限循环的思念'],
['Serendipity','最美丽的意外'],
['Paracosm','共同构建的私宇宙'],
['Kiss','未说出口的告白'],
['Lucky','此生最大的幸运'],
['Comet','划过天际的相遇'],
['Étoile','你是我唯一的星辰'],
['Aurore','黎明前的极光']
];
(function(){
  var p=SPLASH_LINES[Math.floor(Math.random()*SPLASH_LINES.length)];
  var m=document.querySelector('.sp-mark'),t=document.querySelector('.sp-title');
  if(m)m.textContent=p[0];
  if(t)t.textContent=p[1];
})();

}catch(e){console.error("[zika] js/theme.js",e)}

/* ===== js/core.js ===== */
try{
save=function(){try{localStorage.setItem(KEY,JSON.stringify(S));return true}catch(e){return false}};
uid=function(){return Math.random().toString(36).slice(2,8)+Date.now().toString(36).slice(-4)};
esc=function(s){return String(s).replace(/[&<>"']/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})};
pad=function(n){return n<10?'0'+n:''+n};
fmt=function(t){var d=new Date(t);return pad(d.getMonth()+1)+'-'+pad(d.getDate())+' '+pad(d.getHours())+':'+pad(d.getMinutes())};
fmtDay=function(t){var d=new Date(t);return(d.getMonth()+1)+'月'+d.getDate()+'日'};
tiltOf=function(id){var h=0;for(var i=0;i<id.length;i++){h=(h+id.charCodeAt(i)*7)%11}return((h-5)*0.28).toFixed(2)+'deg'};
dayDiff=function(str){var now=new Date();now.setHours(0,0,0,0);var p=String(str).split('-');var d=new Date(Number(p[0]),Number(p[1])-1,Number(p[2]));if(isNaN(d.getTime()))return null;return Math.round((now-d)/86400000)};
nearDay=function(){var best=null,bestAbs=null,pick=null;for(var i=0;i<S.days.length;i++){var n=dayDiff(S.days[i].date);if(n===null)continue;var a=Math.abs(n);if(bestAbs===null||a<bestAbs){bestAbs=a;best=n;pick=S.days[i]}}return pick?{item:pick,n:best}:null};
dayText=function(nd){return nd.item.title+' · '+(nd.n>=0?'第 '+(nd.n+1)+' 天':'还有 '+(-nd.n)+' 天')};
setAv=function(el,who){
  if(!el)return;
  el.innerHTML='';
  if(who.img){var im=document.createElement('img');im.src=who.img;im.alt='';el.appendChild(im)}
  else el.textContent=who.avatar||'✦';
};
avStr=function(who){return who.img?'<img src="'+esc(who.img)+'" alt="">':esc(who.avatar||'✦')};
$=function(id){return document.getElementById(id)};
taName=function(){return S.ta.name||TA_NAME};
splash=function(){};
applySkin=function(){
  document.documentElement.dataset.theme=S.theme;
  document.documentElement.dataset.style=S.style;
  var meta=document.querySelector('meta[name="theme-color"]');
  if(meta)meta.setAttribute('content',S.style==='glass'?'#efe4d4':'#fdf7ec');
};
paintStyleBtns=function(){
  $('btnStyle').textContent=S.style==='glass'?'◐':'◼';
  $('sbStyle').textContent=(S.style==='glass'?'◐ ':'◼ ')+'材质';
};
toggleStyle=function(){
  S.style=S.style==='glass'?'solid':'glass';
  applySkin();save();paintStyleBtns();
};
applyBubbleCSS=function(){
  var el=$('bubbleCustom');
  var css=(S.bubbleCSS||'').trim();
  if(!css){el.textContent='';return}
  el.textContent=css.indexOf('{')>=0?css:'.card{'+css+'}';
};
paintNames=function(){
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
};
updateNav=function(){
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
};
openNav=function(){updateNav();document.body.classList.add('nav-open')};
closeNav=function(){document.body.classList.remove('nav-open')};
pickAvatar=function(k){
  pickFor=k;
  var f=$('avIn');
  f.value='';f.click();
};
go=function(v){
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
};
renderHome=function(){
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
};
renderChat=function(){
  stream.innerHTML='';
  if(!S.cards.length){
    var e=document.createElement('div');e.className='empty';
    e.innerHTML='<b>这里只放字</b>想说的话，一张一张递过去。<br>名字和头像点上面换。';
    stream.appendChild(e);
  }else{
    for(var i=0;i<S.cards.length;i++)stream.appendChild(cardEl(S.cards[i]));
  }
  requestAnimationFrame(function(){stream.scrollTop=stream.scrollHeight});
};
cardEl=function(c){
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
};
send=function(){
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
};
// 核心：状态、工具函数、外观、侧栏、头像、主页、传讯

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

save();












var stream=$('stream');
var input=$('input');
var sheet=$('sheet');
var sheetTitle=$('sheetTitle');
var sheetBody=$('sheetBody');
var reader=$('reader');
var currentMail=null;
var pickFor=null;











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






}catch(e){console.error("[zika] js/core.js",e)}

/* ===== js/features.js ===== */
try{
renderMoments=function(){
  var box=$('moList');
  $('moCount').textContent=S.moments.length?S.moments.length+' 条':'';
  if(!S.moments.length){box.innerHTML='<div class="empty"><b>还没有动态</b>点右上角发一条。<br>谁发的都行。</div>';return}
  var list=S.moments.slice().sort(function(a,b){return b.at-a.at});
  box.innerHTML=list.map(function(m){
    var who=m.from==='me'?S.me:S.ta;
    var liked=(m.likes||[]).indexOf('me')>=0;
    var likeNames=(m.likes||[]).map(function(x){return x==='me'?(S.me.name||'我'):taName()}).join('、');
    var cmts=(m.comments||[]).map(function(c){
      var cw=c.from==='me'?S.me:S.ta;
      return '<div><b>'+esc(cw.name||'')+'</b>'+esc(c.text)+'</div>';
    }).join('');
    return '<article class="mo" data-mo="'+m.id+'"><div class="mo-av">'+avStr(who)+'</div><div class="mo-main"><div class="mo-name">'+esc(who.name||'')+'</div><p class="mo-text">'+esc(m.text)+'</p>'+(m.img?'<div class="mo-img">'+esc(m.img)+'</div>':'')+'<div class="mo-meta"><span>'+fmt(m.at)+'</span><button class="'+(liked?'liked':'')+'" data-act="like" data-id="'+m.id+'">♡ '+((m.likes||[]).length?likeNames:'')+'</button><button data-act="comment" data-id="'+m.id+'">评论</button><button data-act="delMo" data-id="'+m.id+'">删</button></div>'+(cmts?'<div class="mo-cmts">'+cmts+'</div>':'')+'</div></article>';
  }).join('');
};
newMoment=function(){
  var wrap=document.createElement('div');
  wrap.innerHTML='<div class="pick" id="moPick"><button data-f="me" class="on">'+esc(S.me.name)+'</button><button data-f="ta">'+esc(S.ta.name)+'</button></div><div class="field"><label>说点什么</label><textarea id="moText" placeholder="今天…" style="font-family:var(--serif);font-size:14px;min-height:110px"></textarea></div><div class="field"><label>配一个符号（可不填）</label><input id="moImg" maxlength="4" placeholder="🌤"></div><button class="primary" id="moSend" style="width:100%">发 出 去</button>';
  openSheet('发一条',wrap);
  var from='me';
  wrap.querySelector('#moPick').addEventListener('click',function(e){
    var b=e.target.closest('button');if(!b)return;from=b.dataset.f;
    var all=wrap.querySelectorAll('#moPick button');
    for(var i=0;i<all.length;i++)all[i].classList.toggle('on',all[i]===b);
  });
  wrap.querySelector('#moSend').addEventListener('click',function(){
    var t=wrap.querySelector('#moText').value.trim();
    if(!t)return;
    S.moments.push({id:uid(),from:from,text:t,img:wrap.querySelector('#moImg').value.trim(),at:Date.now(),likes:[],comments:[]});
    save();closeSheet();renderMoments();
  });
};
renderMail=function(){
  var box=$('mailList');
  if(!S.mails.length){box.innerHTML='<div class="empty"><b>信箱是空的</b>写一封，慢慢说。<br>'+esc(taName())+'回的信也会落在这里。</div>';return}
  var list=S.mails.slice().sort(function(a,b){return b.at-a.at});
  box.innerHTML=list.map(function(m){
    var who=m.from==='me'?S.me:S.ta;
    return '<article class="mail'+(m.read?'':' unread')+'" data-act="openMail" data-id="'+m.id+'"><div class="mail-top"><span class="mail-title">'+esc(m.title)+'</span><span class="mail-date">'+fmtDay(m.at)+'</span></div><div class="mail-from">'+esc(who.name||'')+' 写</div><p class="mail-prev">'+esc(m.body)+'</p></article>';
  }).join('');
};
openMail=function(id){
  var m=null;for(var i=0;i<S.mails.length;i++)if(S.mails[i].id===id)m=S.mails[i];
  if(!m)return;
  currentMail=m;
  var who=m.from==='me'?S.me:S.ta;
  $('rTitle').textContent=m.title;
  $('rBody').textContent=m.body;
  $('rFrom').textContent=(who.name||'')+' · '+fmtDay(m.at);
  reader.hidden=false;
  if(!m.read){m.read=true;save();renderMail()}
};
closeReader=function(){reader.hidden=true;currentMail=null};
newMail=function(pre){
  pre=pre||{};
  var wrap=document.createElement('div');
  wrap.innerHTML='<div class="pick" id="mPick"><button data-f="me" class="'+(pre.from==='ta'?'':'on')+'">'+esc(S.me.name)+' 写</button><button data-f="ta" class="'+(pre.from==='ta'?'on':'')+'">'+esc(S.ta.name)+' 写</button></div><div class="field"><label>标题</label><input id="mTitle" maxlength="30" placeholder="给'+esc(pre.to||S.ta.name)+'"></div><div class="field"><label>正文</label><textarea id="mBody" placeholder="慢慢写，不着急。" style="font-family:var(--serif);font-size:14px;line-height:1.9"></textarea></div><button class="primary" id="mSend" style="width:100%">封 好</button>';
  openSheet('写一封信',wrap);
  wrap.querySelector('#mTitle').value=pre.title||'';
  wrap.querySelector('#mBody').value=pre.body||'';
  var from=pre.from==='ta'?'ta':'me';
  wrap.querySelector('#mPick').addEventListener('click',function(e){
    var b=e.target.closest('button');if(!b)return;from=b.dataset.f;
    var all=wrap.querySelectorAll('#mPick button');
    for(var i=0;i<all.length;i++)all[i].classList.toggle('on',all[i]===b);
  });
  wrap.querySelector('#mSend').addEventListener('click',function(){
    var t=wrap.querySelector('#mTitle').value.trim()||'无题';
    var b=wrap.querySelector('#mBody').value.trim();
    if(!b){alert('正文还空着。');return}
    S.mails.push({id:uid(),from:from,title:t,body:b,at:Date.now(),read:false});
    save();closeSheet();renderMail();go('mail');
  });
};
renderDraws=function(){
  var d=new Date();
  $('tarotDate').textContent=(d.getMonth()+1)+'月'+d.getDate()+'日';
  var box=$('drawList');
  if(!S.draws.length){box.innerHTML='<p class="hint">还没有抽过。</p>';return}
  box.innerHTML=S.draws.slice(0,8).map(function(x){
    return '<div class="dr"><b>'+esc(x.name)+(x.rev?' · 逆':' · 正')+'</b><span>'+fmtDay(x.at)+'</span></div>';
  }).join('');
};
draw=function(){
  var card=$('tcard');
  var front=$('tfront');
  var btn=$('btnDraw');
  if(flipped){
    flipped=false;card.classList.remove('flipped');
    btn.textContent='再 抽 一 张';
    setTimeout(doDraw,320);
    return;
  }
  doDraw();
  function doDraw(){
    btn.disabled=true;
    card.classList.add('shake');
    setTimeout(function(){
      card.classList.remove('shake');
      var c=TAROT[Math.floor(Math.random()*TAROT.length)];
      var rev=Math.random()<0.34;
      front.querySelector('.sym').textContent=c.s;
      front.querySelector('.nm').textContent=c.n;
      front.querySelector('.en').textContent=c.e;
      front.querySelector('.rev').textContent=rev?'逆 位':'正 位';
      card.classList.add('flipped');flipped=true;
      $('tiName').textContent=c.n+' · '+(rev?'逆位':'正位');
      $('tiMean').textContent=rev?c.rev:c.up;
      btn.disabled=false;btn.textContent='再 抽 一 张';
      S.draws.unshift({id:uid(),name:c.n,rev:rev,at:Date.now()});
      if(S.draws.length>40)S.draws.length=40;
      save();renderDraws();
    },640);
  }
};
// 功能页：朋友圈、回信、塔罗






var flipped=false;



}catch(e){console.error("[zika] js/features.js",e)}

/* ===== js/reply.js ===== */
try{
rnd=function(a,b){return a+Math.random()*(b-a)};
pickOne=function(a){return a[Math.floor(Math.random()*a.length)]};
replyCount=function(){return Math.random()<0.75?1:(Math.random()<0.95?2:3)};
showTyping=function(on){
  typingEl.hidden=!on;
  if(on)typingEl.innerHTML='<span class="ty-av">'+avStr(S.ta)+'</span><span>'+esc(taName())+' 正在输入</span><i></i><i></i><i></i>';
  var st=document.querySelector('.chat-top .who .st');
  if(st)st.textContent=on?'正在输入…':'在线';
};
addReplyCard=function(c){S.cards.push(c);save();renderChat();updateNav()};
scheduleReply=function(){
  clearTimeout(replyTimer);
  var token=++replyRun;
  showTyping(false);
  replyTimer=setTimeout(function(){simulateReply(token)},rnd(REPLY.waitMin,REPLY.waitMax));
};
simulateReply=function(token){
  if(token!==replyRun)return;
  var changed=false;
  S.cards.forEach(function(c){if(c.from==='me'&&!c.read){c.read=true;changed=true}});
  if(changed){save();renderChat()}
  if(Math.random()<REPLY.pokeRate){
    addReplyCard({id:uid(),from:'ta',type:'poke',text:taName()+' '+pickOne(POKES),at:Date.now()});
    return;
  }
  var pool=S.lib.filter(function(x){return x.tag!=='信'}).map(function(x){return x.text});
  if(!pool.length)return;
  showTyping(true);
  var now=Date.now();
  var recent=S.cards.filter(function(c){return c.type!=='poke'&&c.text&&now-c.at<REPLY.quoteWindow}).slice(-REPLY.quoteLast);
  var n=replyCount(),delay=0;
  for(var i=0;i<n;i++){
    delay+=rnd(REPLY.waitMin,REPLY.waitMax);
    (function(i){
      setTimeout(function(){
        if(token!==replyRun)return;
        var c={id:uid(),from:'ta',text:pickOne(pool),at:Date.now()};
        if(i===0&&recent.length&&Math.random()<REPLY.quoteRate){
          var m=pickOne(recent);
          c.quote={name:m.from==='me'?(S.me.name||'我'):taName(),text:m.text};
        }
        addReplyCard(c);
        if(i===n-1)showTyping(false);
      },delay);
    })(i);
  }
};
// 顾时夜自动回字卡，概率照 milk 的 simulateReply
var REPLY={
  waitMin:3000,      // 每一步最短等 3 秒（milk 默认）
  waitMax:7000,      // 最长等 7 秒（milk 默认）
  pokeRate:0.03,     // 3% 不回字，改成拍一拍
  quoteRate:0.3,     // 第一张 30% 引用最近一句
  quoteWindow:3600000, // 只引用 1 小时内的
  quoteLast:7        // 只在最近 7 句里挑
};
var POKES=['拍了拍你的脑袋','拍了拍你的肩膀','戳了戳你的脸','捏了捏你的手','揉了揉你的头发','轻轻拽了拽你的袖子'];
var replyTimer=null,replyRun=0;
S.autoReply=true; // 开关已去掉，一直自动回


// milk 原版：75% 回 1 张，剩下的里 95% 回 2 张，其余 3 张


// 正在输入提示，放在字卡流和输入框之间
var typingEl=document.createElement('div');
typingEl.id='typing';typingEl.hidden=true;
(function(){var foot=document.querySelector('.chat-foot');foot.parentNode.insertBefore(typingEl,foot)})();



// 你又递了一张，就打断他正在回的，重新等



// 字卡渲染：多出拍一拍、引用、已读
var _cardEl=cardEl;
cardEl=function(c){
  if(c.type==='poke'){var p=document.createElement('div');p.className='poke';p.textContent='✦ '+c.text+' ✦';return p}
  var el=_cardEl(c);
  if(c.quote){
    var q=document.createElement('div');q.className='qt';
    q.innerHTML='<b>'+esc(c.quote.name)+'</b>'+esc(c.quote.text);
    el.insertBefore(q,el.querySelector('.body'));
  }
  if(c.from==='me'&&c.read){
    var r=document.createElement('span');r.className='rd';r.textContent='已读';
    el.querySelector('.head').appendChild(r);
  }
  return el;
};

// 你递出去一张，他就准备回
var _send=send;
send=function(){
  var before=S.cards.length;
  _send();
  if(S.cards.length>before)scheduleReply();
};

}catch(e){console.error("[zika] js/reply.js",e)}

/* ===== js/call.js ===== */
try{
mmss=function(ms){var s=Math.floor(ms/1000);return pad(Math.floor(s/60))+':'+pad(s%60)};
paintWho=function(){
  setAv($('clAv'),S.ta);setAv($('clAv2'),S.ta);setAv($('clAvM'),S.ta);setAv($('clSelf'),S.me);
  $('clName').textContent=$('clName2').textContent=taName();
  $('clBg').style.backgroundImage=S.ta.img?'url("'+S.ta.img+'")':'';
};
setMode=function(m){
  callBox.dataset.mode=m;
  $('clCancel').hidden=m!=='dial';
  $('clDecline').hidden=m!=='incoming';
  $('clAccept').hidden=m!=='incoming';
};
openRing=function(m,text){paintWho();setMode(m);$('clState').textContent=text;mini.hidden=true;callBox.hidden=false};
callLog=function(text){S.cards.push({id:uid(),from:'sys',type:'call',text:'',call:text,at:Date.now()});save();renderChat();updateNav()};
closeCall=function(){
  clearTimeout(C.timer);clearInterval(C.tick);
  C.state='idle';callBox.hidden=true;mini.hidden=true;$('clHint').textContent='';
};
paintTime=function(){var t=mmss(Date.now()-C.start);$('clTime').textContent=t;$('clTimeM').textContent=t};
dial=function(){
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
};
incoming=function(){
  if(C.state!=='idle')return;
  C.state='incoming';
  openRing('incoming','邀请你视频通话');
  C.timer=setTimeout(function(){callLog('未接 '+taName()+' 的视频通话');closeCall()},CALL.ringTimeout);
};
startLive=function(){
  clearTimeout(C.timer);
  C.state='live';C.start=Date.now();
  paintWho();setMode('live');
  $('clSubs').innerHTML='';$('clHint').textContent='已接通';
  clearInterval(C.tick);C.tick=setInterval(paintTime,1000);paintTime();
};
hang=function(){
  if(C.state==='live')callLog('视频通话 · '+mmss(Date.now()-C.start));
  else if(C.state==='dial')callLog('已取消视频通话');
  else if(C.state==='incoming')callLog('已拒绝 '+taName()+' 的视频通话');
  closeCall();
};
sub=function(text,me){
  var box=$('clSubs'),p=document.createElement('p');
  if(me)p.className='me';p.textContent=text;box.appendChild(p);
  while(box.children.length>3)box.removeChild(box.firstChild);
};
say=function(){
  var inp=$('clIn'),t=inp.value.trim();
  if(!t||C.state!=='live')return;
  inp.value='';
  S.cards.push({id:uid(),from:'me',text:t,at:Date.now()});save();renderChat();updateNav();
  sub(t,true);
  clearTimeout(replyTimer);
  var token=++replyRun;
  showTyping(false);
  replyTimer=setTimeout(function(){simulateReply(token)},rnd(REPLY.waitMin,REPLY.waitMax));
};
planRing=function(){
  clearTimeout(C.ring);
  if(!S.call.random)return;
  C.ring=setTimeout(function(){
    if(C.state==='idle'&&!document.hidden&&Math.random()<CALL.ringRate)incoming();
    planRing();
  },rnd(CALL.ringMin,CALL.ringMax));
};
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








// 你打给他

// 他打给你




// 通话里说话，他照字卡库回，显示成字幕


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

}catch(e){console.error("[zika] js/call.js",e)}

/* ===== js/ui.js ===== */
try{
openSheet=function(title,node){
  closeNav();
  sheetTitle.textContent=title;sheetBody.innerHTML='';sheetBody.appendChild(node);sheet.hidden=false;
};
closeSheet=function(){sheet.hidden=true};
fillInput=function(t){
  input.value=t;input.focus();input.style.height='auto';
  input.style.height=Math.min(input.scrollHeight,120)+'px';
};
libItems=function(){
  return S.lib.filter(function(x){
    if(LIB.active!=='全部'&&x.tag!==LIB.active)return false;
    if(LIB.q&&x.text.toLowerCase().indexOf(LIB.q.toLowerCase())<0)return false;
    return true;
  });
};
useLine=function(t){go('chat');fillInput(t)};
drawLib=function(){
  var tags=$('libTags'),list=$('libList');
  tags.innerHTML='';
  var all=['全部'],seen={};
  S.lib.forEach(function(x){if(!seen[x.tag]){seen[x.tag]=1;all.push(x.tag)}});
  if(all.indexOf(LIB.active)<0)LIB.active='全部';
  all.forEach(function(tag){
    var b=document.createElement('button');
    b.className='lt'+(tag===LIB.active?' on':'');b.textContent=tag;
    b.addEventListener('click',function(){LIB.active=tag;drawLib()});
    tags.appendChild(b);
  });
  list.innerHTML='';
  var items=libItems();
  if(!items.length){var p=document.createElement('p');p.className='hint';p.textContent='没找到。换个词，或者在下面加一句。';list.appendChild(p)}
  items.forEach(function(x){
    var row=document.createElement('div');row.className='librow';
    var b=document.createElement('button');b.className='li';b.textContent=x.text;
    b.addEventListener('click',function(){useLine(x.text)});
    var rm=document.createElement('button');rm.className='rm';rm.textContent='×';rm.setAttribute('aria-label','删掉这句');
    rm.addEventListener('click',function(ev){ev.stopPropagation();S.lib=S.lib.filter(function(y){return y!==x});save();drawLib();updateNav()});
    row.appendChild(b);row.appendChild(rm);list.appendChild(row);
  });
  $('libCount').textContent=S.lib.length+' 句';
};
renderLibPage=function(){
  var box=$('libPage');if(!box)return;
  if(!LIB.built){
    box.innerHTML='<div class="lib-search"><input id="libQ" placeholder="搜一句…"><button id="libRand">随机一句</button></div><div class="lib-tags" id="libTags"></div><div id="libList"></div>'
      +'<div class="field" style="margin-top:16px"><label>加几句（一行一条）</label><textarea id="newLibText" placeholder="第一句&#10;第二句" style="min-height:88px;font-family:var(--serif);font-size:13.5px"></textarea></div>'
      +'<div class="two"><div class="field"><label>归到哪类</label><input id="newLibTag" maxlength="6" placeholder="我的"></div><div class="field" style="display:flex;align-items:flex-end"><button class="ghost" id="addLibBtn" style="width:100%">＋ 收进库</button></div></div>'
      +'<p class="hint">点一句就带去传讯页，填进输入框。× 从库里删掉。顾时夜回你的字卡也从这里抽。</p>';
    $('libQ').addEventListener('input',function(){LIB.q=this.value.trim();drawLib()});
    $('libRand').addEventListener('click',function(){
      var items=libItems();if(!items.length)return;
      useLine(items[Math.floor(Math.random()*items.length)].text);
    });
    $('addLibBtn').addEventListener('click',function(){
      var raw=$('newLibText').value;
      var g=$('newLibTag').value.trim()||'我的';
      var lines=raw.split('\n').map(function(x){return x.trim()}).filter(Boolean);
      if(!lines.length)return;
      lines.forEach(function(t){S.lib.push({tag:g,text:t})});
      save();drawLib();updateNav();
      $('newLibText').value='';
    });
    LIB.built=true;
  }
  drawLib();
};
openBubble=function(){
  var wrap=document.createElement('div');
  wrap.innerHTML='<p class="hint" style="margin-top:0">写 CSS 声明就行，会套到字卡上。也可以直接写整段规则（比如 .card.me{...}）。</p><div class="presets"><button data-p="background:rgba(255,255,255,.5);border-radius:18px;box-shadow:0 10px 30px rgba(0,0,0,.1)">玻璃圆泡</button><button data-p="background:var(--solid);border-radius:4px;border:1px solid var(--line)">纸片</button><button data-p="background:transparent;border:1px solid var(--accent);border-radius:0;box-shadow:none">描边</button><button data-p="background:transparent;border:0;box-shadow:none;padding:4px 0;backdrop-filter:none">无框</button><button data-p="border-radius:22px 22px 22px 4px">大圆角</button></div><div class="field"><label>气泡 CSS</label><textarea id="bubbleBox" placeholder="background:#fff;border-radius:20px;" style="min-height:130px"></textarea></div><div class="two"><button class="ghost" id="bubbleReset" style="flex:1">恢复默认</button><button class="primary" id="bubbleApply" style="flex:1">应 用</button></div>';
  openSheet('聊天气泡',wrap);
  var box=wrap.querySelector('#bubbleBox');
  box.value=S.bubbleCSS||'';
  wrap.querySelector('.presets').addEventListener('click',function(e){
    var b=e.target.closest('button');if(b)box.value=b.dataset.p;
  });
  wrap.querySelector('#bubbleApply').addEventListener('click',function(){
    S.bubbleCSS=box.value.trim();save();applyBubbleCSS();closeSheet();
  });
  wrap.querySelector('#bubbleReset').addEventListener('click',function(){
    S.bubbleCSS='';box.value='';save();applyBubbleCSS();
  });
};
openChatSet=function(){
  var wrap=document.createElement('div');wrap.className='menu-list';
  wrap.innerHTML='<button class="mi" data-c="bubble"><span>聊天气泡</span><span>CSS ›</span></button><button class="mi" data-c="all"><span>名字、头像和外观</span><span>›</span></button>';
  wrap.addEventListener('click',function(e){
    var b=e.target.closest('[data-c]');if(!b)return;
    closeSheet();setTimeout(b.dataset.c==='bubble'?openBubble:openSettings,80);
  });
  openSheet('聊天设置',wrap);
};
openSettings=function(){
  var wrap=document.createElement('div');
  wrap.innerHTML='<div class="field"><label>材质</label><div class="seg" id="styleSeg"><button data-s="glass">毛玻璃</button><button data-s="solid">纯色</button></div></div><div class="field"><label>配色</label><div class="swatches" id="swWrap"></div></div>';
  wrap.querySelectorAll('#styleSeg button').forEach(function(b){
    b.classList.toggle('on',b.dataset.s===S.style);
    b.addEventListener('click',function(){
      if(S.style!==b.dataset.s)toggleStyle();
      wrap.querySelectorAll('#styleSeg button').forEach(function(x){x.classList.toggle('on',x===b)});
    });
  });
  var sw=wrap.querySelector('#swWrap');
  var themes=[{id:'paper',c:'#efe4d4',dot:'#b07b62'},{id:'night',c:'#17161c',dot:'#c99c8b'},{id:'rose',c:'#f6e3e3',dot:'#b96f74'},{id:'sage',c:'#e4e9df',dot:'#6f8a6d'}];
  themes.forEach(function(t){
    var b=document.createElement('button');
    b.className='sw'+(S.theme===t.id?' on':'');b.style.background=t.c;
    var i=document.createElement('i');i.style.background=t.dot;b.appendChild(i);
    b.addEventListener('click',function(){
      S.theme=t.id;applySkin();save();
      sw.querySelectorAll('.sw').forEach(function(x){x.classList.remove('on')});
      b.classList.add('on');
    });
    sw.appendChild(b);
  });
  var f1=document.createElement('div');f1.className='two';
  f1.innerHTML='<div class="field"><label>我的名字</label><input id="inMeName" maxlength="12"></div><div class="field"><label>没照片时的符号</label><input id="inMeAv" maxlength="4"></div>';
  wrap.appendChild(f1);
  var f2=document.createElement('div');f2.className='two';
  f2.innerHTML='<div class="field"><label>他的名字</label><input id="inTaName" maxlength="12"></div><div class="field"><label>没照片时的符号</label><input id="inTaAv" maxlength="4"></div>';
  wrap.appendChild(f2);
  var ph=document.createElement('div');ph.className='two';ph.style.marginBottom='12px';
  ph.innerHTML='<button class="ghost" data-pick="me" style="flex:1">换我的照片</button><button class="ghost" data-pick="ta" style="flex:1">换他的照片</button>';
  wrap.appendChild(ph);
  var btn=document.createElement('button');btn.className='primary';btn.textContent='收 好';btn.style.width='100%';
  btn.addEventListener('click',function(){
    S.me.name=(wrap.querySelector('#inMeName').value||'我').trim().slice(0,12);
    S.me.avatar=(wrap.querySelector('#inMeAv').value||'🌙').trim().slice(0,4);
    S.ta.name=(wrap.querySelector('#inTaName').value||TA_NAME).trim().slice(0,12);
    S.ta.avatar=(wrap.querySelector('#inTaAv').value||'✦').trim().slice(0,4);
    save();paintNames();renderHome();renderChat();closeSheet();
  });
  wrap.appendChild(btn);
  var row2=document.createElement('div');row2.className='two';row2.style.marginTop='10px';
  row2.innerHTML='<button class="ghost" id="btnDays" style="flex:1">纪念日</button><button class="ghost" id="btnBubble2" style="flex:1">聊天气泡</button>';
  wrap.appendChild(row2);
  row2.querySelector('#btnDays').addEventListener('click',function(){closeSheet();setTimeout(openDays,80)});
  row2.querySelector('#btnBubble2').addEventListener('click',function(){closeSheet();setTimeout(openBubble,80)});
  var menu=document.createElement('div');menu.className='menu-list';menu.style.marginTop='14px';
  menu.innerHTML='<button class="mi" data-s="noimg"><span>照片换回符号</span><span>两个都换</span></button><button class="mi" data-s="export"><span>导出备份</span><span>json</span></button><button class="mi" data-s="import"><span>导入备份</span><span></span></button><button class="mi" data-s="clear"><span>全部清空</span><span></span></button>';
  wrap.appendChild(menu);
  menu.addEventListener('click',function(e){
    var b=e.target.closest('[data-s]');if(!b)return;
    if(b.dataset.s==='noimg'){if(confirm('把两张照片都去掉？')){S.me.img='';S.ta.img='';save();paintNames();renderMoments()}}
    if(b.dataset.s==='export')exportData();
    if(b.dataset.s==='import')$('fileIn').click();
    if(b.dataset.s==='clear'){
      if(confirm('清空所有字卡、动态、信件和抽牌记录？')){
        if(confirm('真的清？不能撤回。')){localStorage.removeItem(KEY);location.reload()}
      }
    }
  });
  wrap.querySelector('#inMeName').value=S.me.name;
  wrap.querySelector('#inMeAv').value=S.me.avatar;
  wrap.querySelector('#inTaName').value=S.ta.name;
  wrap.querySelector('#inTaAv').value=S.ta.avatar;
  openSheet('设置',wrap);
};
openDays=function(){
  var wrap=document.createElement('div');
  var list=document.createElement('div');
  function drawDays(){
    list.innerHTML='';
    if(!S.days.length){var p=document.createElement('p');p.className='hint';p.textContent='还没有日子。加一个开始的那天，主页就会一直数着。';list.appendChild(p)}
    S.days.forEach(function(d){
      var row=document.createElement('div');row.className='day';
      var left=document.createElement('div');
      var n=dayDiff(d.date);
      left.innerHTML=esc(d.title)+'<span class="d">'+esc(d.date)+'</span>';
      var right=document.createElement('div');right.style.display='flex';right.style.alignItems='center';
      var t=document.createElement('span');t.className='t';
      t.textContent=n===null?'—':(n>=0?'第 '+(n+1)+' 天':'还有 '+(-n)+' 天');
      var x=document.createElement('button');x.textContent='删';
      x.addEventListener('click',function(){S.days=S.days.filter(function(y){return y.id!==d.id});save();drawDays();renderHome();updateNav()});
      right.appendChild(t);right.appendChild(x);
      row.appendChild(left);row.appendChild(right);list.appendChild(row);
    });
  }
  var f=document.createElement('div');f.className='two';
  f.innerHTML='<div class="field" style="flex:1.4"><label>名字</label><input id="dTitle" maxlength="16" placeholder="在一起"></div><div class="field"><label>那天</label><input id="dDate" type="date"></div>';
  wrap.appendChild(f);
  var add=document.createElement('button');add.className='ghost';add.textContent='＋ 记一个日子';add.style.marginBottom='14px';
  add.addEventListener('click',function(){
    var t=wrap.querySelector('#dTitle').value.trim();
    var d=wrap.querySelector('#dDate').value;
    if(!t||!d){alert('名字和日期都填一下。');return}
    S.days.push({id:uid(),title:t,date:d});save();drawDays();renderHome();updateNav();wrap.querySelector('#dTitle').value='';
  });
  wrap.appendChild(add);wrap.appendChild(list);drawDays();
  openSheet('纪念日',wrap);
};
exportData=function(){
  var blob=new Blob([JSON.stringify(S,null,2)],{type:'application/json'});
  var a=document.createElement('a');var d=new Date();
  a.href=URL.createObjectURL(blob);
  a.download='字卡-'+d.getFullYear()+pad(d.getMonth()+1)+pad(d.getDate())+'.json';
  document.body.appendChild(a);a.click();
  setTimeout(function(){URL.revokeObjectURL(a.href);a.remove()},1000);
};
// 界面：弹层、字卡库页、气泡、设置、纪念日、备份、事件绑定、启动


$('sheetX').addEventListener('click',closeSheet);
sheet.addEventListener('click',function(e){if(e.target===sheet)closeSheet()});

// 字卡库：侧栏里单独一页。点一句就带去传讯页填进输入框
var LIB={active:'全部',q:'',built:false};





// 传讯页顶栏的设置，放在视频通话右边

(function(){
  var b=document.createElement('button');
  b.className='ico';b.id='btnChatSet';b.setAttribute('aria-label','聊天设置');b.textContent='⚙';
  b.addEventListener('click',openChatSet);
  document.querySelector('.chat-top').appendChild(b);
})();



$('fileIn').addEventListener('change',function(e){
  var f=e.target.files&&e.target.files[0];if(!f)return;
  var fr=new FileReader();
  fr.onload=function(){
    try{
      var d=JSON.parse(fr.result);
      if(!d||!Array.isArray(d.cards))throw new Error('bad');
      if(!confirm('导入会覆盖现在的数据，确定？'))return;
      S=Object.assign(defaults(),d);S.from='me';S.autoReply=true;
      save();applySkin();applyBubbleCSS();paintNames();paintStyleBtns();renderHome();renderChat();renderMoments();renderMail();renderDraws();
      if(LIB.built)drawLib();
      alert('回来了。');
    }catch(err){alert('这个文件读不出来。')}
  };
  fr.readAsText(f);e.target.value='';
});
// 按钮
$('btnSend').addEventListener('click',function(){send()});
$('btnSet').addEventListener('click',openSettings);
$('btnStyle').addEventListener('click',toggleStyle);
$('btnDraw').addEventListener('click',draw);
$('rClose').addEventListener('click',closeReader);
$('rDel').addEventListener('click',function(){
  if(!currentMail)return;
  if(confirm('撕掉这封信？')){S.mails=S.mails.filter(function(x){return x.id!==currentMail.id});save();closeReader();renderMail()}
});
$('rReply').addEventListener('click',function(){
  if(!currentMail)return;
  var pre={from:currentMail.from==='me'?'ta':'me',title:'回：'+currentMail.title};
  closeReader();setTimeout(function(){newMail(pre)},120);
});
reader.addEventListener('click',function(e){if(e.target===reader)closeReader()});
// 侧栏
$('navBtn').addEventListener('click',openNav);
$('navMask').addEventListener('click',closeNav);
$('sbClose').addEventListener('click',closeNav);
$('sbStyle').addEventListener('click',toggleStyle);
$('sbSet').addEventListener('click',function(){closeNav();setTimeout(openSettings,180)});
$('tabbar').addEventListener('click',function(e){
  var b=e.target.closest('.tab');if(!b)return;
  go(b.dataset.view);closeNav();
});
document.addEventListener('keydown',function(e){if(e.key==='Escape')closeNav()});
(function(){
  var sx=0,sy=0,mode=null;
  document.addEventListener('touchstart',function(e){
    var t=e.touches[0];sx=t.clientX;sy=t.clientY;
    if(document.body.classList.contains('nav-open'))mode='close';
    else mode=(sx<22&&sheet.hidden&&reader.hidden)?'open':null;
  },{passive:true});
  document.addEventListener('touchend',function(e){
    if(!mode)return;
    var t=e.changedTouches[0],dx=t.clientX-sx,dy=Math.abs(t.clientY-sy);
    if(dy<60){if(mode==='open'&&dx>50)openNav();if(mode==='close'&&dx<-50)closeNav()}
    mode=null;
  },{passive:true});
})();
// 全局点击
document.addEventListener('click',function(e){
  var pk=e.target.closest('[data-pick]');if(pk){pickAvatar(pk.dataset.pick);return}
  var g=e.target.closest('[data-go]');if(g){go(g.dataset.go);return}
  var a=e.target.closest('[data-act]');if(!a)return;
  var act=a.dataset.act,id=a.dataset.id;
  if(act==='settings')openSettings();
  if(act==='newMoment')newMoment();
  if(act==='newMail')newMail();
  if(act==='openMail')openMail(id);
  if(act==='delMo'){if(confirm('删掉这条动态？')){S.moments=S.moments.filter(function(x){return x.id!==id});save();renderMoments()}}
  if(act==='like'){
    var m=null;for(var i=0;i<S.moments.length;i++)if(S.moments[i].id===id)m=S.moments[i];
    if(!m)return;m.likes=m.likes||[];
    var k=m.likes.indexOf('me');if(k>=0)m.likes.splice(k,1);else m.likes.push('me');
    save();renderMoments();
  }
  if(act==='comment'){
    var mo=null;for(var j=0;j<S.moments.length;j++)if(S.moments[j].id===id)mo=S.moments[j];
    if(!mo)return;
    var art=document.querySelector('[data-mo="'+id+'"]');
    if(!art)return;
    var old=art.querySelector('.mo-cbox');
    if(old){old.remove();return}
    var box=document.createElement('div');box.className='mo-cbox';
    box.innerHTML='<button data-who="me" class="on">'+esc(S.me.name)+'</button><button data-who="ta">'+esc(S.ta.name)+'</button><input placeholder="说一句…"><button data-send="1">发</button>';
    art.querySelector('.mo-main').appendChild(box);
    var who='me';
    box.addEventListener('click',function(ev){
      var b=ev.target.closest('button');if(!b)return;
      if(b.dataset.who){
        who=b.dataset.who;
        box.querySelectorAll('[data-who]').forEach(function(x){x.classList.toggle('on',x===b)});
      }
      if(b.dataset.send){
        var val=box.querySelector('input').value.trim();
        if(!val)return;
        mo.comments=mo.comments||[];
        mo.comments.push({id:uid(),from:who,text:val,at:Date.now()});
        save();renderMoments();
      }
    });
    box.querySelector('input').focus();
  }
});
input.addEventListener('input',function(){
  input.style.height='auto';
  input.style.height=Math.min(input.scrollHeight,120)+'px';
});
input.addEventListener('keydown',function(e){
  if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();send()}
});
// 启动
applySkin();applyBubbleCSS();paintNames();paintStyleBtns();
go('home');renderChat();splash();
window.addEventListener('beforeunload',save);

}catch(e){console.error("[zika] js/ui.js",e)}

/* ===== js/prefs.js ===== */
try{
ensurePrefs=function(){
  if(!S.prefs||typeof S.prefs!=='object')S.prefs={};
  for(var k in P_DEF)if(S.prefs[k]===undefined||S.prefs[k]===null)S.prefs[k]=JSON.parse(JSON.stringify(P_DEF[k]));
  if(typeof S.prefs.icons!=='object')S.prefs.icons={};
  if(typeof S.prefs.font!=='object')S.prefs.font=JSON.parse(JSON.stringify(P_DEF.font));
  if(!Array.isArray(S.libOff))S.libOff=[];
  if(!S.call||typeof S.call!=='object')S.call={reject:true,random:true};
  if(!S.prefs.mailInit){S.mails.forEach(function(m){if(m.replyAt===undefined)m.replyAt=0});S.prefs.mailInit=true}
};
applyReplyPrefs=function(){
  var p=S.prefs;
  var a=Math.max(0,+p.replyMin||0),b=Math.max(a,+p.replyMax||0);
  REPLY.waitMin=a*1000;REPLY.waitMax=b*1000;
  REPLY.pokeRate=(+p.pokeRate||0)/100;REPLY.quoteRate=(+p.quoteRate||0)/100;
  CALL.ringRate=(+p.ringRate||0)/100;CALL.rejectRate=(+p.rejectRate||0)/100;
  S.call.reject=CALL.rejectRate>0;S.call.random=CALL.ringRate>0;
  planRing();
};
libPool=function(){
  var off=S.libOff||[];
  return S.lib.filter(function(x){return x.tag!=='信'&&off.indexOf(x.tag)<0}).map(function(x){return x.text});
};
composeMail=function(src){
  var letters=S.lib.filter(function(x){return x.tag==='信'}).map(function(x){return x.text});
  var pool=libPool(),lines=[],n=3+Math.floor(Math.random()*4);
  for(var i=0;i<n&&pool.length;i++){var t=pickOne(pool);if(lines.indexOf(t)<0)lines.push(t)}
  if(letters.length)lines.push(pickOne(letters));
  if(!lines.length)lines.push('收到了。');
  return{id:uid(),from:'ta',title:'回：'+src.title,body:lines.join('\n\n'),at:Date.now(),read:false,replyAt:0};
};
mailTick=function(){
  var p=S.prefs,now=Date.now(),changed=false,got=0;
  var a=Math.max(0,+p.mailMin||0),b=Math.max(a,+p.mailMax||0);
  S.mails.forEach(function(m){
    if(m.from!=='me'||m.replyAt===0)return;
    if(m.replyAt===undefined){m.replyAt=Math.random()*100<(+p.mailRate)?now+rnd(a,b)*60000:0;changed=true;return}
    if(now>=m.replyAt){m.replyAt=0;S.mails.push(composeMail(m));changed=true;got++}
  });
  if(!changed)return;
  save();updateNav();
  var v=document.querySelector('.view.on');
  if(v&&v.dataset.view==='mail')renderMail();
  if(v&&v.dataset.view==='home')renderHome();
};
applyWall=function(){
  var p=S.prefs;
  wallEl.style.backgroundImage=p.wall?'url("'+p.wall+'")':'';
  wallEl.style.setProperty('--dim',(+p.wallDim||0)/100);
  document.body.classList.toggle('has-wall',!!p.wall);
};
icHTML=function(k){
  var v=S.prefs.icons[k]||IC_DEF[k]||'';
  return /^(data:|https?:)/.test(v)?'<img src="'+esc(v)+'" alt="">':esc(v);
};
applyIcons=function(){
  document.querySelectorAll('#tabbar .tab').forEach(function(t){var i=t.querySelector('i');if(i)i.innerHTML=icHTML(t.dataset.view)});
  document.querySelectorAll('.entry[data-go]').forEach(function(e){
    var s=e.querySelector('.ei');
    if(!s){s=document.createElement('i');s.className='ei';e.appendChild(s)}
    s.innerHTML=icHTML(e.dataset.go);
  });
};
loadFontCss=function(url){
  var l=document.getElementById('fontCss');
  if(!l){l=document.createElement('link');l.id='fontCss';l.rel='stylesheet';document.head.appendChild(l)}
  if(l.getAttribute('href')!==url)l.setAttribute('href',url);
};
applyFont=function(){
  var f=S.prefs.font||{},o=FONTS.filter(function(x){return x.id===f.id})[0]||FONTS[0],fam=o.f;
  var face=document.getElementById('fontFace');
  if(!face){face=document.createElement('style');face.id='fontFace';document.head.appendChild(face)}
  face.textContent='';
  if(o.css)loadFontCss(o.css);
  if(o.id==='custom'){
    var url=(f.url||'').trim(),name=(f.name||'').trim();
    if(url&&/\.css(\?|$)/i.test(url))loadFontCss(url);
    else if(url){face.textContent='@font-face{font-family:"ZikaCustom";src:url("'+url.replace(/"/g,'')+'");font-display:swap}';name=name||'ZikaCustom'}
    fam=name?'"'+name.replace(/"/g,'')+'","Songti SC",serif':'';
  }
  var r=document.documentElement.style;
  if(fam){r.setProperty('--serif',fam);r.setProperty('--sans',fam)}
  else{r.removeProperty('--serif');r.removeProperty('--sans')}
};
applyAllPrefs=function(){ensurePrefs();applyReplyPrefs();applyWall();applyIcons();applyFont();mailTick()};
// v9：偏好数据和生效逻辑。回复概率、回复时长、回信时长、通话概率、主页壁纸、板块图标、全局字体
var P_DEF={replyRate:100,replyMin:3,replyMax:7,pokeRate:3,quoteRate:30,mailRate:100,mailMin:30,mailMax:240,ringRate:35,rejectRate:20,wall:'',wallDim:20,icons:{},font:{id:'serif',name:'',url:''}};

ensurePrefs();save();

// 回复：时长、拍一拍、引用、通话概率都写回 reply.js / call.js 的参数

// 他回字卡时用的池子：去掉“信”和被关掉的分组

// 整个替换 reply.js 的 simulateReply：多一层“回不回”的概率，池子按分组开关
simulateReply=function(token){
  if(token!==replyRun)return;
  var changed=false;
  S.cards.forEach(function(c){if(c.from==='me'&&!c.read){c.read=true;changed=true}});
  if(changed){save();renderChat()}
  if(Math.random()*100>=(+S.prefs.replyRate)){showTyping(false);return} // 已读不回
  if(Math.random()<REPLY.pokeRate){
    addReplyCard({id:uid(),from:'ta',type:'poke',text:taName()+' '+pickOne(POKES),at:Date.now()});
    return;
  }
  var pool=libPool();
  if(!pool.length)return;
  showTyping(true);
  var now=Date.now();
  var recent=S.cards.filter(function(c){return c.type!=='poke'&&c.type!=='call'&&c.text&&now-c.at<REPLY.quoteWindow}).slice(-REPLY.quoteLast);
  var n=replyCount(),delay=0;
  for(var i=0;i<n;i++){
    delay+=rnd(REPLY.waitMin,REPLY.waitMax);
    (function(i){
      setTimeout(function(){
        if(token!==replyRun)return;
        var c={id:uid(),from:'ta',text:pickOne(pool),at:Date.now()};
        if(i===0&&recent.length&&Math.random()<REPLY.quoteRate){
          var m=pickOne(recent);
          c.quote={name:m.from==='me'?(S.me.name||'我'):taName(),text:m.text};
        }
        addReplyCard(c);
        if(i===n-1)showTyping(false);
      },delay);
    })(i);
  }
};

// 回信：你寄出一封，他在 mailMin~mailMax 分钟后回一封。时间记在信上，关掉页面也算数


setInterval(mailTick,20000);
document.addEventListener('visibilitychange',function(){if(!document.hidden)mailTick()});

// 主页壁纸：只在主页显示
var wallEl=document.createElement('div');wallEl.id='wall';
document.body.insertBefore(wallEl,document.body.firstChild);

var _goV9=go;
go=function(v){_goV9(v);document.body.classList.toggle('on-home',v==='home')};

// 板块图标：侧栏和主页入口共用一套，可以是符号也可以是图片
var IC_DEF={home:'⌂',chat:'▤',lib:'❏',moments:'◍',mail:'✉',tarot:'✦'};
var IC_NAME={home:'主页',chat:'传讯',lib:'字卡库',moments:'朋友圈',mail:'回信',tarot:'塔罗'};



// 全局字体
var FONTS=[
{id:'serif',n:'宋体',d:'默认',f:''},
{id:'sans',n:'苹方',d:'系统黑体',f:'-apple-system,BlinkMacSystemFont,"PingFang SC","Helvetica Neue",sans-serif'},
{id:'kai',n:'楷体',d:'系统自带',f:'"Kaiti SC","STKaiti","KaiTi",serif'},
{id:'round',n:'圆体',d:'系统自带',f:'"Yuanti SC","YouYuan",-apple-system,sans-serif'},
{id:'wenkai',n:'霞鹜文楷',d:'要联网加载',f:'"LXGW WenKai Screen","Kaiti SC",serif',css:'https://cdn.jsdelivr.net/npm/lxgw-wenkai-screen-webfont/style.css'},
{id:'custom',n:'自定义',d:'填字体名或链接',f:''}];




applyAllPrefs();
document.body.classList.toggle('on-home',!!document.querySelector('.view.on[data-view="home"]'));

}catch(e){console.error("[zika] js/prefs.js",e)}

/* ===== js/prefs-ui.js ===== */
try{
readFileURL=function(f){return new Promise(function(ok,no){var fr=new FileReader();fr.onload=function(){ok(fr.result)};fr.onerror=no;fr.readAsDataURL(f)})};
shrinkImg=function(src,max,square,q){
  return new Promise(function(ok,no){
    var im=new Image();
    if(/^https?:/.test(src))im.crossOrigin='anonymous';
    im.onload=function(){
      var w=im.width,h=im.height,sx=0,sy=0,sw=w,sh=h,cw,ch;
      if(square){var s=Math.min(w,h);sx=(w-s)/2;sy=(h-s)/2;sw=sh=s;cw=ch=max}
      else{var r=Math.min(1,max/Math.max(w,h));cw=Math.round(w*r);ch=Math.round(h*r)}
      var c=document.createElement('canvas');c.width=cw;c.height=ch;
      c.getContext('2d').drawImage(im,sx,sy,sw,sh,0,0,cw,ch);
      try{ok(c.toDataURL('image/jpeg',q||0.85))}catch(e){/^https?:/.test(src)?ok(src):no(e)}
    };
    im.onerror=no;im.src=src;
  });
};
shrinkSafe=function(src,max,square,q){return src?shrinkImg(src,max,square,q).catch(function(){return ''}):Promise.resolve('')};
pickImage=function(cb){
  var f=document.createElement('input');f.type='file';f.accept='image/*';f.hidden=true;
  document.body.appendChild(f);
  f.addEventListener('change',function(){var x=f.files&&f.files[0];f.remove();if(x)readFileURL(x).then(cb)});
  f.click();
};
fmtPref=function(k,v){
  if(/Rate$|Dim$/.test(k))return v+'%';
  if(k==='replyMin'||k==='replyMax')return v+' 秒';
  if(v<60)return v+' 分钟';
  var h=v/60;return(h%1?h.toFixed(1):h)+' 小时';
};
rr=function(label,k,min,max,step){return '<div class="field"><label>'+label+'</label><div class="rg"><input type="range" data-k="'+k+'" min="'+min+'" max="'+max+'" step="'+(step||1)+'"><b data-v="'+k+'"></b></div></div>'};
bindRanges=function(w,onInput,onChange){
  var rs=w.querySelectorAll('input[type=range]');
  function paint(){rs.forEach(function(r){var k=r.dataset.k;r.value=S.prefs[k];w.querySelector('[data-v="'+k+'"]').textContent=fmtPref(k,+S.prefs[k])})}
  rs.forEach(function(r){
    r.addEventListener('input',function(){
      var k=r.dataset.k,v=+r.value,p=PAIRS[k];S.prefs[k]=v;
      if(p){var o=p[0];if(p[1]>0&&S.prefs[o]<v)S.prefs[o]=v;if(p[1]<0&&S.prefs[o]>v)S.prefs[o]=v}
      paint();if(onInput)onInput(k);
    });
    r.addEventListener('change',function(){save();if(onChange)onChange(r.dataset.k)});
  });
  paint();return paint;
};
openReplySet=function(){
  var w=document.createElement('div');
  w.innerHTML='<div class="sec">字卡回复</div>'+rr('回复概率','replyRate',0,100)+rr('最快多久回一张','replyMin',0,60)+rr('最慢多久回一张','replyMax',0,60)+rr('改成拍一拍','pokeRate',0,30)+rr('引用你的话','quoteRate',0,100)
    +'<p class="hint">没掷中回复概率就是已读不回。他一次回 1 到 3 张，每张前面在最快和最慢之间随机等。</p>'
    +'<div class="sec">回信</div>'+rr('回信概率','mailRate',0,100)+rr('最快多久回信','mailMin',0,1440,5)+rr('最慢多久回信','mailMax',0,1440,5)
    +'<p class="hint">从你封好信开始算，页面关着也照算，下次打开就到。</p>'
    +'<div class="sec">视频通话</div>'+rr('主动打来','ringRate',0,100)+rr('你打过去不接','rejectRate',0,100)
    +'<p class="hint">页面开着的时候，每隔 15~60 分钟掷一次看他打不打来。</p>'
    +'<button class="ghost" id="rsReset" style="width:100%;margin-top:14px">恢复默认</button>';
  var paint=bindRanges(w,null,function(){applyReplyPrefs()});
  w.querySelector('#rsReset').addEventListener('click',function(){
    REPLY_KEYS.forEach(function(k){S.prefs[k]=P_DEF[k]});save();applyReplyPrefs();paint();
  });
  openSheet('回复与通话',w);
};
openWallSet=function(){
  var w=document.createElement('div');
  w.innerHTML='<div class="wallprev" id="wp"></div><div class="two" style="margin-bottom:12px"><button class="ghost" id="wPick" style="flex:1">选一张图</button><button class="ghost" id="wDel" style="flex:1">去掉壁纸</button></div>'+rr('遮一层底色','wallDim',0,80)+'<p class="hint">壁纸只铺在主页。遮得多一点，字更清楚。</p>';
  var pv=w.querySelector('#wp');
  function paintPv(){pv.style.backgroundImage=S.prefs.wall?'url("'+S.prefs.wall+'")':'';pv.textContent=S.prefs.wall?'':'还没有壁纸'}
  bindRanges(w,function(){applyWall()});
  w.querySelector('#wPick').addEventListener('click',function(){
    pickImage(function(src){shrinkSafe(src,1400,false,0.82).then(function(u){
      if(!u){alert('这张读不出来，换一张试试。');return}
      var old=S.prefs.wall;S.prefs.wall=u;
      if(!save()){S.prefs.wall=old;alert('这张太大存不下，换一张试试。');return}
      applyWall();paintPv();
    })});
  });
  w.querySelector('#wDel').addEventListener('click',function(){S.prefs.wall='';save();applyWall();paintPv()});
  paintPv();openSheet('主页壁纸',w);
};
openIconSet=function(){
  var w=document.createElement('div');
  w.innerHTML='<p class="hint" style="margin:0 0 12px">侧栏和主页入口用同一套。填一个符号或 emoji，也可以换成图片。</p>';
  Object.keys(IC_DEF).forEach(function(k){
    var row=document.createElement('div');row.className='icrow';
    row.innerHTML='<span class="nm2">'+IC_NAME[k]+'</span><span class="icprev"></span><input maxlength="4" placeholder="'+esc(IC_DEF[k])+'"><button data-a="img">图片</button><button data-a="def">默认</button>';
    var pv=row.querySelector('.icprev'),inp=row.querySelector('input');
    function paint(){pv.innerHTML=icHTML(k);var v=S.prefs.icons[k]||'';inp.value=/^(data:|https?:)/.test(v)?'':v}
    inp.addEventListener('change',function(){var v=inp.value.trim();if(v)S.prefs.icons[k]=v;else delete S.prefs.icons[k];save();applyIcons();paint()});
    row.addEventListener('click',function(e){
      var b=e.target.closest('button');if(!b)return;
      if(b.dataset.a==='def'){delete S.prefs.icons[k];save();applyIcons();paint()}
      if(b.dataset.a==='img')pickImage(function(src){shrinkSafe(src,96,true,0.9).then(function(u){
        if(!u)return;S.prefs.icons[k]=u;
        if(!save()){delete S.prefs.icons[k];alert('存不下，换一张小点的。');return}
        applyIcons();paint();
      })});
    });
    paint();w.appendChild(row);
  });
  openSheet('板块图标',w);
};
openFontSet=function(){
  var w=document.createElement('div');
  var list=document.createElement('div');list.className='fontlist';
  function paint(){list.querySelectorAll('button').forEach(function(b){b.classList.toggle('on',b.dataset.id===S.prefs.font.id)})}
  FONTS.forEach(function(o){
    var b=document.createElement('button');b.dataset.id=o.id;
    b.innerHTML=esc(o.n)+'<small>'+esc(o.d)+'</small>';
    b.style.fontFamily=o.f||'"Songti SC","Noto Serif SC",serif';
    b.addEventListener('click',function(){S.prefs.font.id=o.id;save();applyFont();paint()});
    list.appendChild(b);
  });
  w.appendChild(list);
  var cf=document.createElement('div');
  cf.innerHTML='<div class="field"><label>自定义字体名</label><input id="fName" placeholder="比如 Kaiti SC"></div><div class="field"><label>或者字体链接（.ttf / .woff2 / .css）</label><input id="fUrl" placeholder="https://…"></div><button class="primary" id="fApply" style="width:100%">用 这 个</button><p class="hint">只填名字的话，要是手机上本来就有的字体。填链接每次打开页面会联网加载一次。</p>';
  w.appendChild(cf);
  cf.querySelector('#fName').value=S.prefs.font.name||'';
  cf.querySelector('#fUrl').value=S.prefs.font.url||'';
  cf.querySelector('#fApply').addEventListener('click',function(){
    S.prefs.font={id:'custom',name:cf.querySelector('#fName').value.trim(),url:cf.querySelector('#fUrl').value.trim()};
    save();applyFont();paint();
  });
  paint();openSheet('全局字体',w);
};
// v9：设置面板。回复与通话、主页壁纸、板块图标、全局字体；设置和侧栏加入口

// 压图：square=true 裁成正方形 max×max，否则长边缩到 max




// 滑杆：数值直接写进 S.prefs，最快/最慢会互相推
var PAIRS={replyMin:['replyMax',1],replyMax:['replyMin',-1],mailMin:['mailMax',1],mailMax:['mailMin',-1]};




var REPLY_KEYS=['replyRate','replyMin','replyMax','pokeRate','quoteRate','mailRate','mailMin','mailMax','ringRate','rejectRate'];








// 设置面板顶上加一排入口；旧的导出/导入/清空挪进「数据备份与导入」
var SET_MENU=[['openReplySet','回复与通话','概率 · 时长'],['openWallSet','主页壁纸','›'],['openIconSet','板块图标','›'],['openFontSet','全局字体','›'],['openGroups','字卡分组','›'],['openData','数据备份与导入','milk 也认']];
var _openSetV9=openSettings;
openSettings=function(){
  _openSetV9();
  sheetBody.querySelectorAll('[data-s="export"],[data-s="import"],[data-s="clear"]').forEach(function(x){x.remove()});
  var m=document.createElement('div');m.className='menu-list';m.style.marginBottom='8px';
  m.innerHTML=SET_MENU.map(function(x){return '<button class="mi" data-v9="'+x[0]+'"><span>'+x[1]+'</span><span>'+x[2]+'</span></button>'}).join('');
  m.addEventListener('click',function(e){
    var b=e.target.closest('[data-v9]');if(!b)return;
    var fn=window[b.dataset.v9];closeSheet();if(typeof fn==='function')setTimeout(fn,80);
  });
  sheetBody.insertBefore(m,sheetBody.firstChild);
};
$('btnSet').removeEventListener('click',_openSetV9);
$('btnSet').addEventListener('click',function(){openSettings()});
// 侧栏底部加一个字体按钮
(function(){
  var b=document.createElement('button');b.className='sb-mini';b.textContent='Aa 字体';
  b.addEventListener('click',function(){closeNav();setTimeout(openFontSet,180)});
  document.querySelector('.sb-foot').appendChild(b);
})();

}catch(e){console.error("[zika] js/prefs-ui.js",e)}

/* ===== js/lib-groups.js ===== */
try{
libTags=function(){
  var cnt={},order=[];
  S.lib.forEach(function(x){if(cnt[x.tag]===undefined){cnt[x.tag]=0;order.push(x.tag)}cnt[x.tag]++});
  return order.map(function(t){return{tag:t,n:cnt[t]}});
};
refreshLib=function(){save();if(LIB.built)drawLib();updateNav();renderHome()};
uniqArr=function(a){var o=[];a.forEach(function(x){if(o.indexOf(x)<0)o.push(x)});return o};
cleanTag=function(t){return String(t||'').trim().slice(0,8)||'未分组'};
itemText=function(t){if(t&&typeof t==='object')t=t.text||t.content||'';return String(t||'').trim()};
packLines=function(d,opt){
  var out=[],seen={};
  (d.customReplyGroups||[]).forEach(function(g){
    if(!g)return;var tag=cleanTag(g.name);
    (g.items||[]).forEach(function(t){t=itemText(t);if(!t)return;seen[t]=1;if(opt.groups)out.push({tag:tag,text:t,off:!!g.disabled})});
  });
  if(opt.loose)(d.customReplies||[]).forEach(function(t){t=itemText(t);if(t&&!seen[t]){seen[t]=1;out.push({tag:'未分组',text:t})}});
  if(opt.kao)(d.kaomojiLibrary||[]).forEach(function(t){t=itemText(t);if(t)out.push({tag:'颜文字',text:t})});
  return out;
};
packIntros=function(d){
  return(d.customIntros||[]).map(function(s){
    s=itemText(s);if(!s)return null;
    var p=s.split('|');return p.length>1?[p[0].trim(),p.slice(1).join('|').trim()]:['∞',s];
  }).filter(Boolean);
};
mergeLines=function(lines,replace){
  if(replace){S.lib=[];S.libOff=[]}
  var have={},add=0,offs={};
  S.lib.forEach(function(x){have[x.tag+'\u0001'+x.text]=1});
  lines.forEach(function(x){
    var k=x.tag+'\u0001'+x.text;if(x.off)offs[x.tag]=1;
    if(have[k])return;have[k]=1;S.lib.push({tag:x.tag,text:x.text});add++;
  });
  Object.keys(offs).forEach(function(t){if(S.libOff.indexOf(t)<0)S.libOff.push(t)});
  return add;
};
applyPack=function(d,o,replace){
  var lines=packLines(d,o),add=0;
  if(lines.length)add=mergeLines(lines,replace);
  if(o.intros){var it=packIntros(d);if(it.length)S.prefs.intros=it}
  return add;
};
chkRow=function(k,label,n,on){return n?'<label><input type="checkbox" data-o="'+k+'"'+(on?' checked':'')+'>'+label+'<span>'+n+'</span></label>':''};
readOpts=function(w){var o={};w.querySelectorAll('[data-o]').forEach(function(i){o[i.dataset.o]=i.checked});return o};
bindSeg=function(el,cb){
  el.addEventListener('click',function(e){
    var b=e.target.closest('[data-m]');if(!b)return;
    el.querySelectorAll('[data-m]').forEach(function(x){x.classList.toggle('on',x===b)});cb(b.dataset.m);
  });
};
packRows=function(d){
  var gs=(d.customReplyGroups||[]).filter(function(g){return g&&(g.items||[]).length}).length;
  return chkRow('groups','字卡（'+gs+' 个分组）',packLines(d,{groups:true}).length,true)
    +chkRow('loose','没分组的散句',packLines(d,{loose:true}).length,true)
    +chkRow('kao','颜文字（单独一组）',packLines(d,{kao:true}).length,false)
    +chkRow('intros','开屏文案',packIntros(d).length,false);
};
openPackImport=function(d){
  var rows=packRows(d);
  if(!rows){alert('这个字卡包里没有能用的字卡。');return}
  var w=document.createElement('div');
  w.innerHTML='<div class="chk">'+rows+'</div><div class="seg" id="pkMode"><button data-m="merge" class="on">合并进库</button><button data-m="replace">替换整个库</button></div><button class="primary" id="pkGo" style="width:100%">收 进 库</button><p class="hint">合并会跳过库里已经有的同一句。milk 里关掉的分组，导进来也是关着的。</p>';
  var mode='merge';bindSeg(w.querySelector('#pkMode'),function(m){mode=m});
  w.querySelector('#pkGo').addEventListener('click',function(){
    var o=readOpts(w);
    if(mode==='replace'&&!confirm('先清掉现在库里的 '+S.lib.length+' 句再导入？'))return;
    var bak=JSON.stringify({lib:S.lib,off:S.libOff,intros:S.prefs.intros});
    var add=applyPack(d,o,mode==='replace');
    if(!save()){var b=JSON.parse(bak);S.lib=b.lib;S.libOff=b.off;S.prefs.intros=b.intros;save();alert('存不下了，没导进去。');return}
    refreshLib();closeSheet();alert('收进来 '+add+' 句。');
  });
  openSheet('导入字卡包',w);
};
exportPack=function(){
  var base=Date.now();
  var groups=libTags().map(function(g,i){
    return{id:base+i,name:g.tag,color:PACK_COLORS[i%PACK_COLORS.length],disabled:S.libOff.indexOf(g.tag)>=0,
      items:S.lib.filter(function(x){return x.tag===g.tag}).map(function(x){return x.text})};
  });
  var all=uniqArr(S.lib.map(function(x){return x.text}));
  downloadJSON({exportDate:new Date().toISOString(),modules:['replies','groups'],customReplies:all,customReplyGroups:groups},'reply-library-'+ymd()+'.json');
};
importPackFile=function(){importAny(function(){})};
openGroups=function(){
  var w=document.createElement('div');
  w.innerHTML='<div class="libbar"><button class="ghost" id="gImp">导入字卡包</button><button class="ghost" id="gExp">导出字卡包</button></div><div id="gList"></div><p class="hint">关掉的分组还在库里，只是'+esc(taName())+'回字卡的时候不从里面抽。「信」这组只给回信用。</p>';
  var list=w.querySelector('#gList');
  function draw(){
    list.innerHTML='';
    var tags=libTags();
    if(!tags.length){list.innerHTML='<p class="hint">库是空的。</p>';return}
    tags.forEach(function(g){
      var off=S.libOff.indexOf(g.tag)>=0;
      var row=document.createElement('div');row.className='grp'+(off?' off':'');
      row.innerHTML='<span class="n">'+esc(g.tag)+'<span class="c">'+g.n+' 句</span></span><button data-a="tg">'+(off?'开':'关')+'</button><button data-a="rn">改名</button><button data-a="rm">删</button>';
      row.addEventListener('click',function(e){
        var b=e.target.closest('button');if(!b)return;var a=b.dataset.a;
        if(a==='tg'){if(off)S.libOff=S.libOff.filter(function(t){return t!==g.tag});else S.libOff.push(g.tag)}
        if(a==='rn'){
          var nn=cleanTag(prompt('改成什么？',g.tag)||'');if(!nn||nn==='未分组'&&g.tag!=='未分组'||nn===g.tag)return;
          S.lib.forEach(function(x){if(x.tag===g.tag)x.tag=nn});
          S.libOff=uniqArr(S.libOff.map(function(t){return t===g.tag?nn:t}));
        }
        if(a==='rm'){
          if(!confirm('删掉「'+g.tag+'」里的 '+g.n+' 句？'))return;
          S.lib=S.lib.filter(function(x){return x.tag!==g.tag});
          S.libOff=S.libOff.filter(function(t){return t!==g.tag});
        }
        refreshLib();draw();
      });
      list.appendChild(row);
    });
  }
  w.querySelector('#gImp').addEventListener('click',importPackFile);
  w.querySelector('#gExp').addEventListener('click',exportPack);
  draw();openSheet('字卡分组',w);
};
// v9：字卡分组管理，导入 / 导出 milk 字卡包（reply-library 那种 json）






// 字卡包 → 一行一行的 {tag,text,off}



// 按勾选把字卡包写进库，返回新加了几句


// 勾选框和分段按钮，导入字卡包和导入 milk 备份共用







var PACK_COLORS=['#38D9A9','#5C7CFA','#F06595','#748FFC','#FFC542','#CC5DE8','#F783AC','#FF8E53'];



// 分组管理：开关（关了他就不从这组抽）、改名、整组删


// 字卡库页：关掉的分组标签变灰，顶上加「管理分组」「导入字卡包」
var _drawLibV9=drawLib;
drawLib=function(){
  _drawLibV9();
  var off=S.libOff||[];
  document.querySelectorAll('#libTags .lt').forEach(function(b){b.classList.toggle('off',off.indexOf(b.textContent)>=0)});
  var page=$('libPage');
  if(page&&!$('libBar')){
    var bar=document.createElement('div');bar.className='libbar';bar.id='libBar';
    bar.innerHTML='<button class="ghost" data-lb="g">管理分组</button><button class="ghost" data-lb="i">导入字卡包</button>';
    bar.addEventListener('click',function(e){var b=e.target.closest('[data-lb]');if(!b)return;if(b.dataset.lb==='g')openGroups();else importPackFile()});
    page.insertBefore(bar,page.firstChild);
  }
};

// 导入过开屏文案的话，开屏从里面随机挑一条
(function(){
  var it=S.prefs&&S.prefs.intros;if(!Array.isArray(it)||!it.length)return;
  var p=pickOne(it),m=document.querySelector('.sp-mark'),t=document.querySelector('.sp-title');
  if(m)m.textContent=p[0];if(t)t.textContent=p[1];
})();

}catch(e){console.error("[zika] js/lib-groups.js",e)}

/* ===== js/backup.js ===== */
try{
ymd=function(){var d=new Date();return d.getFullYear()+pad(d.getMonth()+1)+pad(d.getDate())};
downloadJSON=function(obj,name){
  var blob=new Blob([JSON.stringify(obj)],{type:'application/json'});
  var a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=name;
  document.body.appendChild(a);a.click();
  setTimeout(function(){URL.revokeObjectURL(a.href);a.remove()},1500);
};
kb=function(n){return n>1048576?(n/1048576).toFixed(1)+' MB':Math.ceil(n/1024)+' KB'};
rerenderAll=function(){
  ensurePrefs();save();applySkin();applyBubbleCSS();paintNames();paintStyleBtns();applyAllPrefs();
  renderHome();renderChat();renderMoments();renderMail();renderDraws();if(LIB.built)drawLib();updateNav();
};
needZip=function(){
  if(window.JSZip)return Promise.resolve(window.JSZip);
  return new Promise(function(ok,no){
    var s=document.createElement('script');s.src=JSZIP_URL;
    s.onload=function(){window.JSZip?ok(window.JSZip):no(new Error('zip'))};
    s.onerror=function(){no(new Error('zip'))};document.head.appendChild(s);
  });
};
readZip=function(zip){
  var f=zip.file('backup.json');
  if(!f){var ns=Object.keys(zip.files).filter(function(n){return !zip.files[n].dir&&/\.json$/i.test(n)});if(ns.length)f=zip.file(ns[0])}
  if(!f)throw new Error('nojson');
  return f.async('string').then(function(t){
    if(t.charCodeAt(0)===0xFEFF)t=t.slice(1);
    var d=JSON.parse(t),idx=d.mediaIndex||{};d.mediaStore=d.mediaStore||{};
    return Promise.all(Object.keys(idx).map(function(id){
      var m=idx[id]||{},zf=zip.file(m.path||('media/'+id));if(!zf)return null;
      if(m.mime==='text/plain+dataurl')return zf.async('string').then(function(s){d.mediaStore[id]=s});
      return zf.async('base64').then(function(b){d.mediaStore[id]='data:'+(m.mime||'application/octet-stream')+';base64,'+b});
    })).then(function(){return d});
  });
};
readBackup=function(file){
  return file.arrayBuffer().then(function(ab){
    var u=new Uint8Array(ab);
    if(u.length>3&&u[0]===0x50&&u[1]===0x4b)return needZip().then(function(Z){return Z.loadAsync(ab)}).then(readZip);
    var t=new TextDecoder('utf-8').decode(u);if(t.charCodeAt(0)===0xFEFF)t=t.slice(1);
    return JSON.parse(t);
  });
};
isMilkFull=function(d){return d&&typeof d==='object'&&!Array.isArray(d.cards)&&(/chatapp-backup/.test(d.type||'')||!!d.localforage||!!d.indexedDB)};
isPack=function(d){return d&&!d.localforage&&(Array.isArray(d.customReplyGroups)||Array.isArray(d.customReplies))};
milkGetter=function(d){
  var lf=Object.assign({},d.indexedDB||{},d.localforage||{}),ls=d.localStorage||{},ms=d.mediaStore||{},sid=d.sessionId||'';
  function inl(v){
    if(v&&typeof v==='object'){
      if(!Array.isArray(v)&&typeof v.__mRef==='string')return ms[v.__mRef]||'';
      if(Array.isArray(v))return v.map(inl);
      var o={};for(var k in v)if(Object.prototype.hasOwnProperty.call(v,k))o[k]=inl(v[k]);return o;
    }
    return v;
  }
  return function(name){
    var best=null;
    [lf,ls].forEach(function(src,si){Object.keys(src).forEach(function(k){
      if(k.slice(-name.length)!==name)return;
      var sc=(sid&&k.indexOf(sid)>=0?2:0)+(si===0?1:0);
      if(!best||sc>best.s)best={s:sc,v:src[k]};
    })});
    if(!best)return undefined;
    var v=best.v;if(typeof v==='string'){try{v=JSON.parse(v)}catch(e){}}
    return inl(v);
  };
};
isImg=function(s){return typeof s==='string'&&/^(data:image|https?:)/.test(s)};
toYmd=function(x){
  if(typeof x==='string'&&/^\d{4}-\d{2}-\d{2}/.test(x))return x.slice(0,10);
  var t=new Date(x);if(isNaN(t.getTime()))return '';
  return t.getFullYear()+'-'+pad(t.getMonth()+1)+'-'+pad(t.getDate());
};
milkData=function(d){
  var g=milkGetter(d),st=g('chatSettings')||{};if(typeof st!=='object')st={};
  var names={me:String(st.myName||st.userName||g('myName')||'').trim(),ta:String(st.partnerName||g('partnerName')||'').trim()};
  var meNm=names.me||S.me.name||'我',taNm=names.ta||taName();
  var msgs=g('chatMessages');if(!Array.isArray(msgs))msgs=[];
  var cards=[];
  msgs.forEach(function(m){
    if(!m||m.type==='system')return;
    var t=String(m.text||'').trim();if(!t)return;
    var at=new Date(m.timestamp||m.time||Date.now()).getTime();if(isNaN(at))at=Date.now();
    var c={id:'mk'+(m.id||uid()),at:at,text:t};
    if(m.type==='poke'){c.from='ta';c.type='poke'}
    else{c.from=m.sender==='user'?'me':'ta';if(c.from==='me')c.read=true}
    var q=m.replyTo;
    if(q&&typeof q==='object'&&q.text)c.quote={name:q.sender==='user'?meNm:taNm,text:String(q.text)};
    cards.push(c);
  });
  var ta=[g('partnerAvatar'),g('home_avatar_partner')].filter(isImg)[0]||'';
  var me=[g('myAvatar'),g('home_avatar_me'),g('home_avatar_user'),g('home_avatar_my')].filter(isImg)[0]||'';
  var anns=g('anniversaries');if(!Array.isArray(anns))anns=[];
  var days=anns.map(function(a){
    if(!a)return null;var dt=toYmd(a.date||a.startDate||a.time);var tt=String(a.name||a.title||'').trim();
    return dt&&tt?{id:uid(),title:tt.slice(0,16),date:dt}:null;
  }).filter(Boolean);
  var wall=[g('home_bg'),g('homeBackground'),g('home_background')].filter(isImg)[0]||'';
  var pack={customReplyGroups:g('customReplyGroups')||[],customReplies:g('customReplies')||[],kaomojiLibrary:g('kaomojiLibrary')||g('kaomojis')||[],customIntros:g('customIntros')||[]};
  return{names:names,imgs:{me:me,ta:ta},cards:cards,days:days,wall:wall,pack:pack};
};
openMilkImport=function(d){
  var m=milkData(d),pk=m.pack,hasWho=m.names.me||m.names.ta||m.imgs.me||m.imgs.ta;
  var rows=packRows(pk)+chkRow('chat','聊天记录',m.cards.length,true)+chkRow('who','名字和头像',hasWho?'有':0,true)+chkRow('days','纪念日',m.days.length,true)+chkRow('wall','主页壁纸',m.wall?'有':0,false);
  if(!rows){alert('这个备份里没找到这边能用的东西。');return}
  var w=document.createElement('div');
  w.innerHTML='<div class="chk">'+rows+'</div><div class="field"><label>字卡和聊天记录</label><div class="seg" id="mkMode"><button data-m="merge" class="on">合并</button><button data-m="replace">替换</button></div></div><button class="primary" id="mkGo" style="width:100%">导 进 来</button><p class="hint">聊天记录只带文字，图片和表情包消息会跳过。头像和壁纸会压小再存，省地方。</p>';
  var mode='merge';bindSeg(w.querySelector('#mkMode'),function(x){mode=x});
  var btn=w.querySelector('#mkGo');
  btn.addEventListener('click',function(){
    var o=readOpts(w),rep=mode==='replace';
    if(rep&&!confirm('勾上的字卡和聊天记录会先清掉再导入，确定？'))return;
    btn.disabled=true;btn.textContent='导入中…';
    var bak=JSON.stringify(S);
    Promise.all([o.who?shrinkSafe(m.imgs.me,320,true,0.86):'',o.who?shrinkSafe(m.imgs.ta,320,true,0.86):'',o.wall?shrinkSafe(m.wall,1400,false,0.82):'']).then(function(r){
      var add=applyPack(pk,o,rep),got=0;
      if(o.chat){
        if(rep)S.cards=[];
        var have={};S.cards.forEach(function(c){have[c.id]=1});
        m.cards.forEach(function(c){if(!have[c.id]){have[c.id]=1;S.cards.push(c);got++}});
        S.cards.sort(function(a,b){return a.at-b.at});
      }
      if(o.who){
        if(m.names.me)S.me.name=m.names.me.slice(0,12);if(m.names.ta)S.ta.name=m.names.ta.slice(0,12);
        if(r[0])S.me.img=r[0];if(r[1])S.ta.img=r[1];
      }
      if(o.days)m.days.forEach(function(x){if(!S.days.some(function(y){return y.title===x.title&&y.date===x.date}))S.days.push(x)});
      if(o.wall&&r[2])S.prefs.wall=r[2];
      if(!save()){S=JSON.parse(bak);save();btn.disabled=false;btn.textContent='导 进 来';alert('东西太多存不下，没导进去。少勾几项再试。');return}
      closeSheet();rerenderAll();
      alert('导进来了。字卡新加 '+add+' 句'+(o.chat?'，聊天 '+got+' 条':'')+'。');
    });
  });
  openSheet('导入 milk 备份',w);
};
restoreOwn=function(d){
  if(!confirm('导入会覆盖现在的全部数据，确定？'))return;
  var bak=JSON.stringify(S);
  S=Object.assign(defaults(),d);S.from='me';S.autoReply=true;
  if(!save()){S=JSON.parse(bak);save();alert('存不下，没导进去。');return}
  closeSheet();rerenderAll();alert('回来了。');
};
importAny=function(){
  var f=document.createElement('input');f.type='file';f.accept='.json,.zip,application/json,application/zip';f.hidden=true;
  document.body.appendChild(f);
  f.addEventListener('change',function(){
    var x=f.files&&f.files[0];f.remove();if(!x)return;
    readBackup(x).then(function(d){
      if(d&&Array.isArray(d.cards))return restoreOwn(d);
      if(isMilkFull(d))return openMilkImport(d);
      if(isPack(d))return openPackImport(d);
      alert('认不出这个文件。');
    }).catch(function(e){
      alert(e&&e.message==='zip'?'zip 备份要联网加载一次解压工具，检查网络再试。':'这个文件读不出来。');
    });
  });
  f.click();
};
openData=function(){
  var used=0;try{used=(localStorage.getItem(KEY)||'').length*2}catch(e){}
  var w=document.createElement('div');
  w.innerHTML='<div class="menu-list"><button class="mi" data-d="exp"><span>导出备份</span><span>json</span></button><button class="mi" data-d="imp"><span>导入备份</span><span>本站 / milk 备份 / 字卡包</span></button><button class="mi" data-d="pack"><span>只导出字卡包</span><span>milk 能导入</span></button><button class="mi" data-d="clear"><span>全部清空</span><span></span></button></div>'
    +'<p class="hint">现在存着 '+S.cards.length+' 张字卡记录、'+S.lib.length+' 句字卡库，大约占 '+kb(used)+'。<br>milk 的全量备份（.json 或 .zip）能导入字卡分组、聊天记录、名字头像、纪念日和主页壁纸。表情包、朋友圈、音乐这些这边没有，会跳过。</p>';
  w.addEventListener('click',function(e){
    var b=e.target.closest('[data-d]');if(!b)return;var a=b.dataset.d;
    if(a==='exp')downloadJSON(S,'字卡-'+ymd()+'.json');
    if(a==='imp')importAny();
    if(a==='pack')exportPack();
    if(a==='clear'&&confirm('清空所有字卡、动态、信件和设置？')&&confirm('真的清？不能撤回。')){localStorage.removeItem(KEY);location.reload()}
  });
  openSheet('数据备份与导入',w);
};
// v9：数据备份与导入。认三种文件：本站备份 json、milk 字卡包、milk 全量备份（v4 json / v5 zip）





// 读文件：zip 的话先联网加载 JSZip（固定 3.10.1），再把 media/ 里的图还原成 data url
var JSZIP_URL='https://cdn.jsdelivr.net/npm/jszip@3.10.1/dist/jszip.min.js';






// 从 milk 备份里按键名后缀找东西；同名多个时优先当前会话、优先 localforage








// 一个入口认所有文件。file input 要在点击里同步触发，iOS 才肯弹选择框



}catch(e){console.error("[zika] js/backup.js",e)}

/* ===== js/chat-plus.js ===== */
try{
ensureFavs=function(){if(!Array.isArray(S.favs))S.favs=[]};
isFav=function(id){return S.favs.some(function(f){return f.cardId===id})};
toggleFav=function(c){
  if(isFav(c.id))S.favs=S.favs.filter(function(f){return f.cardId!==c.id});
  else S.favs.unshift({id:uid(),cardId:c.id,name:taName(),text:c.text,at:c.at,favAt:Date.now()});
  save();updateNav();
};
setQuote=function(q){
  QUOTE=q;qBar.hidden=!q;
  if(!q){qBar.innerHTML='';return}
  qBar.innerHTML='<span><b>'+esc(q.name)+'</b>'+esc(q.text)+'</span><button type="button" aria-label="不引用了">×</button>';
  qBar.querySelector('button').addEventListener('click',function(){setQuote(null)});
  input.focus();
};
actBtn=function(t,fn){
  var b=document.createElement('button');b.type='button';b.textContent=t;
  b.addEventListener('click',function(e){e.stopPropagation();fn(b)});
  return b;
};
paintStar=function(el,on){
  var s=el.querySelector('.head .fv');
  if(on&&!s){s=document.createElement('span');s.className='fv';s.textContent='★';el.querySelector('.head').appendChild(s)}
  if(!on&&s)s.remove();
};
renderFav=function(){
  ensureFavs();
  var box=$('favList');if(!box)return;
  $('favCount').textContent=S.favs.length?S.favs.length+' 句':'';
  if(!S.favs.length){box.innerHTML='<div class="empty"><b>还没有收藏</b>在传讯页点一下'+esc(taName())+'的字卡，<br>选「收藏」就会放到这里。</div>';return}
  box.innerHTML='';
  S.favs.forEach(function(f){
    var a=document.createElement('article');a.className='fav';
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
};
openProfile=function(){
  var w=document.createElement('div');
  w.innerHTML='<div class="two"><div class="field"><label>我的名字</label><input id="inMeName" maxlength="12"></div><div class="field"><label>没照片时的符号</label><input id="inMeAv" maxlength="4"></div></div>'
    +'<div class="two"><div class="field"><label>他的名字</label><input id="inTaName" maxlength="12"></div><div class="field"><label>没照片时的符号</label><input id="inTaAv" maxlength="4"></div></div>'
    +'<div class="two" style="margin-bottom:12px"><button class="ghost" data-pick="me" style="flex:1">换我的照片</button><button class="ghost" data-pick="ta" style="flex:1">换他的照片</button></div>'
    +'<button class="primary" id="pfSave" style="width:100%">收 好</button>'
    +'<button class="ghost" id="pfNoImg" style="width:100%;margin-top:10px">照片都换回符号</button>';
  w.querySelector('#inMeName').value=S.me.name||'';
  w.querySelector('#inMeAv').value=S.me.avatar||'';
  w.querySelector('#inTaName').value=S.ta.name||'';
  w.querySelector('#inTaAv').value=S.ta.avatar||'';
  w.querySelector('#pfSave').addEventListener('click',function(){
    S.me.name=(w.querySelector('#inMeName').value||'我').trim().slice(0,12);
    S.me.avatar=(w.querySelector('#inMeAv').value||'🌙').trim().slice(0,4);
    S.ta.name=(w.querySelector('#inTaName').value||TA_NAME).trim().slice(0,12);
    S.ta.avatar=(w.querySelector('#inTaAv').value||'✦').trim().slice(0,4);
    save();paintNames();renderHome();renderChat();closeSheet();
  });
  w.querySelector('#pfNoImg').addEventListener('click',function(){
    if(confirm('把两张照片都去掉？')){S.me.img='';S.ta.img='';save();paintNames();renderMoments()}
  });
  openSheet('名字和头像',w);
};
openLook=function(){
  var w=document.createElement('div');
  w.innerHTML='<div class="field"><label>材质</label><div class="seg" id="styleSeg"><button data-s="glass">毛玻璃</button><button data-s="solid">纯色</button></div></div><div class="field"><label>配色</label><div class="swatches" id="swWrap"></div></div>';
  w.querySelectorAll('#styleSeg button').forEach(function(b){
    b.classList.toggle('on',b.dataset.s===S.style);
    b.addEventListener('click',function(){
      if(S.style!==b.dataset.s)toggleStyle();
      w.querySelectorAll('#styleSeg button').forEach(function(x){x.classList.toggle('on',x===b)});
    });
  });
  var sw=w.querySelector('#swWrap');
  [{id:'paper',c:'#efe4d4',dot:'#b07b62'},{id:'night',c:'#17161c',dot:'#c99c8b'},{id:'rose',c:'#f6e3e3',dot:'#b96f74'},{id:'sage',c:'#e4e9df',dot:'#6f8a6d'}].forEach(function(t){
    var b=document.createElement('button');
    b.className='sw'+(S.theme===t.id?' on':'');b.style.background=t.c;
    var i=document.createElement('i');i.style.background=t.dot;b.appendChild(i);
    b.addEventListener('click',function(){
      S.theme=t.id;applySkin();save();
      sw.querySelectorAll('.sw').forEach(function(x){x.classList.remove('on')});
      b.classList.add('on');
    });
    sw.appendChild(b);
  });
  openSheet('材质与配色',w);
};
addBack=function(){
  if(sheet.hidden||sheetBody.querySelector('.sh-back'))return;
  var b=document.createElement('button');b.type='button';b.className='sh-back';b.textContent='‹ 设置';
  b.addEventListener('click',function(){closeSheet();setTimeout(openSettings,60)});
  sheetBody.insertBefore(b,sheetBody.firstChild);
};
// v11：引用对方的话、收藏他的字卡、收藏页、设置归类；传讯页顶上的设置按钮去掉


// 他回字卡时只引用你说的话（之前会抽到他自己的）
simulateReply=function(token){
  if(token!==replyRun)return;
  var changed=false;
  S.cards.forEach(function(c){if(c.from==='me'&&!c.read){c.read=true;changed=true}});
  if(changed){save();renderChat()}
  if(Math.random()*100>=(+S.prefs.replyRate)){showTyping(false);return}
  if(Math.random()<REPLY.pokeRate){
    addReplyCard({id:uid(),from:'ta',type:'poke',text:taName()+' '+pickOne(POKES),at:Date.now()});
    return;
  }
  var pool=libPool();
  if(!pool.length)return;
  showTyping(true);
  var now=Date.now();
  var mine=S.cards.filter(function(c){return c.from==='me'&&!c.type&&c.text&&now-c.at<REPLY.quoteWindow}).slice(-REPLY.quoteLast);
  var n=replyCount(),delay=0;
  for(var i=0;i<n;i++){
    delay+=rnd(REPLY.waitMin,REPLY.waitMax);
    (function(i){
      setTimeout(function(){
        if(token!==replyRun)return;
        var c={id:uid(),from:'ta',text:pickOne(pool),at:Date.now()};
        if(i===0&&mine.length&&Math.random()<REPLY.quoteRate){
          var m=pickOne(mine);
          c.quote={name:S.me.name||'我',text:m.text};
        }
        addReplyCard(c);
        if(i===n-1)showTyping(false);
      },delay);
    })(i);
  }
};

// 收藏

var _ensureV11=ensurePrefs;
ensurePrefs=function(){_ensureV11();ensureFavs()};
ensureFavs();save();



// 引用：点他的字卡选「引用」，输入框上面出现引用条，递出去的那张带上
var QUOTE=null;
var qBar=document.createElement('div');qBar.id='qBar';qBar.hidden=true;
(function(){var f=document.querySelector('.chat-foot');f.insertBefore(qBar,f.firstChild)})();

var _sendV11=send;
send=function(){
  var q=QUOTE,before=S.cards.length;
  _sendV11();
  if(q&&S.cards.length>before){
    var c=S.cards[S.cards.length-1];
    if(c.from==='me'){c.quote=q;save();renderChat()}
    setQuote(null);
  }
};

// 字卡上的小按钮：他的字卡多「引用」「收藏」，撕掉也收进同一排


var _cardElV11=cardEl;
cardEl=function(c){
  var el=_cardElV11(c);
  if(!el.classList||!el.classList.contains('card'))return el;
  var acts=document.createElement('div');acts.className='acts';
  if(c.from==='ta'){
    paintStar(el,isFav(c.id));
    acts.appendChild(actBtn('引用',function(){setQuote({name:taName(),text:c.text});el.classList.remove('show-del')}));
    acts.appendChild(actBtn(isFav(c.id)?'取消收藏':'收藏',function(b){toggleFav(c);var on=isFav(c.id);b.textContent=on?'取消收藏':'收藏';paintStar(el,on)}));
  }
  var del=el.querySelector('.del');if(del)acts.appendChild(del);
  el.appendChild(acts);
  return el;
};

// 收藏页

var _goV11=go;
go=function(v){_goV11(v);if(v==='fav')renderFav()};
var _navV11=updateNav;
updateNav=function(){_navV11();var e=$('sbcFav');if(e)e.textContent=(S.favs||[]).length||''};
IC_DEF.fav='☆';IC_NAME.fav='收藏';
applyIcons();updateNav();

// 传讯页顶上的设置按钮去掉，气泡挪进设置里
(function(){var b=$('btnChatSet');if(b)b.remove()})();

// 设置：分组收好，点进去的子页顶上有「‹ 设置」回来


var SET_GROUPS=[
  ['我们',[['openProfile','名字和头像',function(){return S.me.name+' × '+taName()}],['openDays','纪念日',function(){return S.days.length?S.days.length+' 个':'还没有'}]]],
  ['外观',[['openLook','材质与配色',function(){return S.style==='glass'?'毛玻璃':'纯色'}],['openWallSet','主页壁纸',function(){return S.prefs.wall?'已设置':'没有'}],['openIconSet','板块图标',function(){return ''}],['openFontSet','全局字体',function(){var f=FONTS.filter(function(x){return x.id===S.prefs.font.id})[0];return f?f.n:''}],['openBubble','聊天气泡',function(){return S.bubbleCSS?'已自定义':'CSS'}]]],
  ['聊天',[['openReplySet','回复与通话',function(){return '概率 · 时长'}],['openGroups','字卡分组',function(){return libTags().length+' 组'}]]],
  ['数据',[['openData','数据备份与导入',function(){return '也认 milk'}]]]
];

openSettings=function(){
  var w=document.createElement('div');
  SET_GROUPS.forEach(function(g){
    var h=document.createElement('div');h.className='sec';h.textContent=g[0];w.appendChild(h);
    var box=document.createElement('div');box.className='menu-list set-grp';
    g[1].forEach(function(it){
      var b=document.createElement('button');b.type='button';b.className='mi';b.dataset.fn=it[0];
      var v='';try{v=it[2]()}catch(e){}
      b.innerHTML='<b>'+esc(it[1])+'</b><span>'+esc(v)+' ›</span>';
      box.appendChild(b);
    });
    w.appendChild(box);
  });
  w.addEventListener('click',function(e){
    var b=e.target.closest('[data-fn]');if(!b)return;
    var fn=window[b.dataset.fn];if(typeof fn!=='function')return;
    closeSheet();setTimeout(function(){fn();addBack()},80);
  });
  openSheet('设置',w);
};

}catch(e){console.error("[zika] js/chat-plus.js",e)}

/* ===== js/view-plus.js ===== */
try{
setMsgAv=function(on){S.prefs.msgAv=!!on;save();renderChat()};
// v12：传讯顶栏只留他的名字和状态；每句话旁边可以显示头像（设置 → 聊天里开关）

if(S.prefs.msgAv===undefined){S.prefs.msgAv=false;save()}

// 每张字卡外面包一层，带上头像
var _cardElV12=cardEl;
cardEl=function(c){
  var el=_cardElV12(c);
  if(!S.prefs.msgAv||!el.classList||!el.classList.contains('card'))return el;
  var me=c.from==='me';
  var row=document.createElement('div');row.className='crow '+(me?'me':'ta');
  var av=document.createElement('span');av.className='cav';setAv(av,me?S.me:S.ta);
  row.appendChild(av);row.appendChild(el);
  return row;
};


// 设置重新归类：聊天气泡挪到「聊天」，加头像开关
SET_GROUPS=[
  ['我们',[['openProfile','名字和头像',function(){return S.me.name+' × '+taName()}],['openDays','纪念日',function(){return S.days.length?S.days.length+' 个':'还没有'}]]],
  ['外观',[['openLook','材质与配色',function(){return S.style==='glass'?'毛玻璃':'纯色'}],['openWallSet','主页壁纸',function(){return S.prefs.wall?'已设置':'没有'}],['openIconSet','板块图标',function(){return ''}],['openFontSet','全局字体',function(){var f=FONTS.filter(function(x){return x.id===S.prefs.font.id})[0];return f?f.n:''}]]],
  ['聊天',[['sw:msgAv','每句话显示头像'],['openBubble','聊天气泡',function(){return S.bubbleCSS?'已自定义':'CSS'}],['openReplySet','回复与通话',function(){return '概率 · 时长'}],['openGroups','字卡分组',function(){return libTags().length+' 组'}]]],
  ['数据',[['openData','数据备份与导入',function(){return '也认 milk'}]]]
];
openSettings=function(){
  var w=document.createElement('div');
  SET_GROUPS.forEach(function(g){
    var h=document.createElement('div');h.className='sec';h.textContent=g[0];w.appendChild(h);
    var box=document.createElement('div');box.className='menu-list set-grp';
    g[1].forEach(function(it){
      var b=document.createElement('button');b.type='button';b.className='mi';
      if(it[0].indexOf('sw:')===0){
        var k=it[0].slice(3);b.dataset.sw=k;
        b.innerHTML='<b>'+esc(it[1])+'</b><span class="tg'+(S.prefs[k]?' on':'')+'"></span>';
      }else{
        b.dataset.fn=it[0];
        var v='';try{v=it[2]()}catch(e){}
        b.innerHTML='<b>'+esc(it[1])+'</b><span>'+esc(v)+' ›</span>';
      }
      box.appendChild(b);
    });
    w.appendChild(box);
  });
  w.addEventListener('click',function(e){
    var s=e.target.closest('[data-sw]');
    if(s){
      var k=s.dataset.sw,on=!S.prefs[k];
      if(k==='msgAv')setMsgAv(on);else{S.prefs[k]=on;save()}
      s.querySelector('.tg').classList.toggle('on',on);
      return;
    }
    var b=e.target.closest('[data-fn]');if(!b)return;
    var fn=window[b.dataset.fn];if(typeof fn!=='function')return;
    closeSheet();setTimeout(function(){fn();addBack()},80);
  });
  openSheet('设置',w);
};
renderChat();

}catch(e){console.error("[zika] js/view-plus.js",e)}

/* ===== js/wall.js ===== */
try{
wallPut=function(src){
  var m=S.prefs.wallImgs;
  for(var k in m)if(m[k]===src)return k;
  var id='w'+uid();m[id]=src;return id;
};
ensureWall=function(){
  var p=S.prefs;
  if(!p.wallImgs||typeof p.wallImgs!=='object')p.wallImgs={};
  if(!p.walls||typeof p.walls!=='object')p.walls={};
  if(!Array.isArray(p.wallSchemes))p.wallSchemes=[];
  if(typeof p.wallSync!=='boolean')p.wallSync=false;
  if(typeof p.wallAll!=='string')p.wallAll='';
  if(p.wall){p.walls.home=wallPut(p.wall);p.wall=''} // 旧版只有主页一张，或者刚从 milk 导进来的
};
wallGC=function(){
  var p=S.prefs,used={};
  function mark(id){if(id)used[id]=1}
  function markSet(all,ws){mark(all);WALL_VIEWS.forEach(function(v){mark((ws||{})[v])})}
  markSet(p.wallAll,p.walls);
  p.wallSchemes.forEach(function(s){markSet(s.all,s.walls)});
  Object.keys(p.wallImgs).forEach(function(k){if(!used[k])delete p.wallImgs[k]});
};
wallSrc=function(id){return id&&S.prefs.wallImgs[id]||''};
wallOf=function(v){var p=S.prefs;return wallSrc(p.wallSync?p.wallAll:p.walls[v])};
wallChange=function(fn){
  var p=S.prefs,bak=JSON.stringify({i:p.wallImgs,w:p.walls,a:p.wallAll,s:p.wallSchemes,y:p.wallSync,d:p.wallDim});
  fn(p);wallGC();
  if(!save()){
    var b=JSON.parse(bak);p.wallImgs=b.i;p.walls=b.w;p.wallAll=b.a;p.wallSchemes=b.s;p.wallSync=b.y;p.wallDim=b.d;save();
    alert('图太多存不下了。删掉几张壁纸或者几个方案再试。');return false;
  }
  applyWall();return true;
};
wallPick=function(cb){
  pickImage(function(src){shrinkSafe(src,1080,false,0.78).then(function(u){if(!u){alert('这张读不出来，换一张试试。');return}cb(u)})});
};
// v15：壁纸可以每个板块单独设，也可以全部同步一张；能存成方案随时换回来。回信默认图标改成文字样式
var WALL_VIEWS=['home','chat','lib','fav','moments','mail','tarot'];
var WALL_NAME={home:'主页',chat:'传讯',lib:'字卡库',fav:'收藏',moments:'朋友圈',mail:'回信',tarot:'塔罗'};
var wallView=(document.querySelector('.view.on')||{dataset:{}}).dataset.view||'home';


// 没有任何地方用到的图删掉，省地方



applyWall=function(v){
  ensureWall();if(v)wallView=v;
  var src=wallOf(wallView);
  wallEl.style.backgroundImage=src?'url("'+src+'")':'';
  wallEl.style.setProperty('--dim',(+S.prefs.wallDim||0)/100);
  document.body.classList.toggle('has-wall',!!src);
};
var _goV15w=go;
go=function(v){_goV15w(v);applyWall(v)};
// 改壁纸都走这里：存不下就整个退回去


openWallSet=function(){
  ensureWall();
  var w=document.createElement('div');
  w.innerHTML='<div class="seg" id="wsMode"><button data-m="sync">全部同步</button><button data-m="each">每个板块单独</button></div><div id="wsBox"></div>'
    +rr('遮一层底色','wallDim',0,80)
    +'<div class="sec">方案</div><div id="wsList"></div><button class="ghost" id="wsSave" style="width:100%;margin-top:10px">＋ 把现在这套存成方案</button>'
    +'<p class="hint">遮得多一点，字更清楚。方案只记用了哪几张图，同一张图存进几个方案也只占一份地方。</p>';
  var box=w.querySelector('#wsBox'),list=w.querySelector('#wsList');
  function bg(el,src){el.style.backgroundImage=src?'url("'+src+'")':''}
  function draw(){
    var p=S.prefs;
    w.querySelectorAll('#wsMode button').forEach(function(b){b.classList.toggle('on',(b.dataset.m==='sync')===p.wallSync)});
    if(p.wallSync){
      box.innerHTML='<div class="wallprev" id="wsPv"></div><div class="two" style="margin-bottom:12px"><button class="ghost" data-wp="__all" style="flex:1">选一张图</button><button class="ghost" data-wx="__all" style="flex:1">去掉</button></div>';
      var pv=box.querySelector('#wsPv'),s=wallSrc(p.wallAll);bg(pv,s);pv.textContent=s?'':'还没有壁纸，所有板块都会铺这一张';
    }else{
      box.innerHTML=WALL_VIEWS.map(function(v){return '<div class="wrow"><span class="wth" data-th="'+v+'"></span><span class="wnm">'+WALL_NAME[v]+'</span><button data-wp="'+v+'">换</button><button data-wx="'+v+'">去掉</button></div>'}).join('');
      box.querySelectorAll('[data-th]').forEach(function(el){bg(el,wallSrc(p.walls[el.dataset.th]))});
    }
    list.innerHTML=p.wallSchemes.length?'':'<p class="hint" style="margin:0">还没有存过方案。</p>';
    p.wallSchemes.forEach(function(s,i){
      var r=document.createElement('div');r.className='wsc';
      var fid=s.sync?s.all:WALL_VIEWS.map(function(v){return(s.walls||{})[v]}).filter(Boolean)[0];
      r.innerHTML='<span class="wth"></span><span class="wnm"></span><button data-a="use">用这套</button><button data-a="rm">删</button>';
      bg(r.querySelector('.wth'),wallSrc(fid));
      r.querySelector('.wnm').textContent=s.name+(s.sync?' · 同步':' · 分开');
      r.addEventListener('click',function(e){
        var b=e.target.closest('[data-a]');if(!b)return;
        if(b.dataset.a==='use')wallChange(function(p){p.wallSync=!!s.sync;p.wallAll=s.all||'';p.walls=JSON.parse(JSON.stringify(s.walls||{}));if(typeof s.dim==='number')p.wallDim=s.dim});
        if(b.dataset.a==='rm'){if(!confirm('删掉方案「'+s.name+'」？'))return;wallChange(function(p){p.wallSchemes.splice(i,1)})}
        draw();paint();
      });
      list.appendChild(r);
    });
  }
  var paint=bindRanges(w,function(){applyWall()});
  w.addEventListener('click',function(e){
    var m=e.target.closest('#wsMode [data-m]');
    if(m){wallChange(function(p){p.wallSync=m.dataset.m==='sync'});draw();return}
    var pk=e.target.closest('[data-wp]'),x=e.target.closest('[data-wx]');
    if(pk){var k=pk.dataset.wp;wallPick(function(u){wallChange(function(p){var id=wallPut(u);if(k==='__all')p.wallAll=id;else p.walls[k]=id});draw()});return}
    if(x){var k2=x.dataset.wx;wallChange(function(p){if(k2==='__all')p.wallAll='';else delete p.walls[k2]});draw()}
  });
  w.querySelector('#wsSave').addEventListener('click',function(){
    var p=S.prefs,def='方案 '+(p.wallSchemes.length+1),n=prompt('给这套起个名字',def);
    if(n===null)return;n=n.trim().slice(0,16)||def;
    wallChange(function(p){p.wallSchemes.push({id:uid(),name:n,sync:p.wallSync,all:p.wallAll,walls:JSON.parse(JSON.stringify(p.walls)),dim:+p.wallDim||0})});
    draw();
  });
  draw();openSheet('壁纸',w);
};
SET_GROUPS.forEach(function(g){g[1].forEach(function(it){
  if(it[0]!=='openWallSet')return;
  it[1]='壁纸';
  it[2]=function(){var p=S.prefs;if(p.wallSync)return p.wallAll?'全部同步':'没有';var n=WALL_VIEWS.filter(function(v){return p.walls[v]}).length;return n?n+' 个板块':'没有'};
})});
// 回信图标：✉ 在 iOS 上会变成彩色 emoji，加 FE0E 让它跟别的图标一样是单色字
IC_DEF.mail='\u2709\uFE0E';
if(S.prefs.icons&&S.prefs.icons.mail==='\u2709')delete S.prefs.icons.mail;
ensureWall();save();applyWall();applyIcons();

}catch(e){console.error("[zika] js/wall.js",e)}

/* ===== js/tarot2.js ===== */
try{
parse78=function(src){
  var m=/ALL_78_TAROT_CARDS\s*=\s*\[/.exec(src);if(!m)return null;
  var s=m.index+m[0].length-1,e=src.indexOf('];',s);if(e<0)return null;
  var body=src.slice(s,e+1).replace(/([{,]\s*)([A-Za-z_]\w*)\s*:/g,'$1"$2":').replace(/,(\s*[\]}])/g,'$1');
  var arr;try{arr=JSON.parse(body)}catch(err){return null}
  if(!Array.isArray(arr))return null;
  arr=arr.filter(function(c){return c&&c.name}).map(function(c){
    return{name:String(c.name),eng:String(c.eng||''),keyword:String(c.keyword||''),upright:String(c.upright||''),reversed:String(c.reversed||''),img:/^https:\/\//.test(c.img||'')?String(c.img):''};
  });
  return arr.length>=78?arr:null;
};
fallback22=function(){return TAROT.map(function(c){return{name:c.n,eng:c.e,keyword:'',upright:c.up,reversed:c.rev,img:'',sym:c.s}})};
load78=function(){
  if(TAROT78)return Promise.resolve(TAROT78);
  try{var c=JSON.parse(localStorage.getItem(T78_KEY)||'null');if(Array.isArray(c)&&c.length>=78){TAROT78=c;return Promise.resolve(c)}}catch(e){}
  var i=0;
  function next(){
    if(i>=MILK_GAMES.length)return Promise.reject(new Error('net'));
    return fetch(MILK_GAMES[i++]).then(function(r){if(!r.ok)throw new Error('http');return r.text()}).then(function(t){var a=parse78(t);if(!a)throw new Error('parse');return a}).catch(next);
  }
  return next().then(function(a){TAROT78=a;try{localStorage.setItem(T78_KEY,JSON.stringify(a))}catch(e){}return a});
};
buildTarot=function(){
  var v=document.querySelector('.view[data-view="tarot"]');if(!v||v.dataset.v15)return;v.dataset.v15='1';
  v.innerHTML='<div class="mo-bar" style="padding-top:24px"><h3>塔 罗</h3><span class="hh-date" id="tarotDate"></span></div>'
    +'<div class="t2-tabs" id="t2Tabs"><button data-t="draw" class="on">塔罗占卜</button><button data-t="hist">占卜记录</button></div>'
    +'<div id="t2Draw"><div id="t2Setup"><div class="t2-lbl">牌阵选择</div><div class="t2-spreads"><button data-s="single" class="on"><b>1</b><span>单张</span></button><button data-s="three"><b>3</b><span>三张</span></button></div><div class="t2-desc" id="t2Desc">单张牌 · 直指当下</div>'
    +'<div class="t2-lbl">你的提问（可选）</div><textarea id="t2Q" placeholder="将内心的迷惑轻轻诉说..."></textarea><button class="primary" id="t2Go" style="width:100%">开始塔罗占卜</button><p class="hint" id="t2Note" style="text-align:center"></p></div>'
    +'<div id="t2Res" hidden></div><button class="ghost" id="t2Reset" hidden style="width:100%;margin-top:14px">重新占卜</button></div>'
    +'<div id="t2Hist" hidden><div class="t2-hh"><span>每一次占卜，皆是与命运的对话</span><button class="ghost" id="t2Clear">清空记录</button></div><div id="t2HList"></div></div>';
  $('t2Tabs').addEventListener('click',function(e){
    var b=e.target.closest('[data-t]');if(!b)return;var h=b.dataset.t==='hist';
    $('t2Tabs').querySelectorAll('button').forEach(function(x){x.classList.toggle('on',x===b)});
    $('t2Draw').hidden=h;$('t2Hist').hidden=!h;if(h)t2Hist();
  });
  v.querySelector('.t2-spreads').addEventListener('click',function(e){
    var b=e.target.closest('[data-s]');if(!b)return;t2Spread(b.dataset.s);
  });
  $('t2Go').addEventListener('click',t2Draw);
  $('t2Reset').addEventListener('click',t2Reset);
  $('t2Clear').addEventListener('click',function(){
    if(!S.draws.length)return;if(!confirm('确定要清空所有占卜记录吗？'))return;
    S.draws=[];save();updateNav();t2Hist();
  });
};
t2Spread=function(s){
  TV.spread=s;
  document.querySelectorAll('.t2-spreads [data-s]').forEach(function(x){x.classList.toggle('on',x.dataset.s===s)});
  $('t2Desc').textContent=s==='three'?'三张牌 · 洞察全局':'单张牌 · 直指当下';
};
t2Reset=function(){
  $('t2Setup').hidden=false;$('t2Res').hidden=true;$('t2Reset').hidden=true;$('t2Q').value='';$('t2Note').textContent='';t2Spread('single');
};
t2CardHTML=function(x){
  var c=x.card,m=x.rev?c.reversed:c.upright;
  var front=c.img?'<img src="'+esc(c.img)+'" alt="'+esc(c.name)+'"'+(x.rev?' class="rv"':'')+'>'
    :'<div class="t2-noimg'+(x.rev?' rv':'')+'"><b>'+esc(c.sym||'✧')+'</b><span>'+esc(c.name)+'</span></div>';
  return '<div class="t2-col"><div class="t2-card"><div class="t2-in"><div class="t2-face t2-front">'+front+'</div>'
    +'<div class="t2-face t2-back"><div class="t2-pos">'+esc(x.pos)+'</div><div class="t2-nm">'+esc(c.name)+'</div><div class="t2-badge'+(x.rev?' rv':'')+'">'+(x.rev?'逆位':'正位')+'</div>'
    +(c.keyword?'<div class="t2-kw">「'+esc(c.keyword)+'」</div>':'')+'<div class="t2-mean">'+esc(m)+'</div></div></div></div>'
    +'<div class="t2-cap">'+esc(x.pos)+' · '+esc(c.name)+'</div></div>';
};
t2Draw=function(){
  if(TV.busy)return;TV.busy=true;
  var btn=$('t2Go');btn.disabled=true;btn.textContent='洗牌中…';
  load78().catch(function(){$('t2Note').textContent='没连上网，这次先用 22 张大阿卡纳。';return fallback22()}).then(function(deck){
    TV.busy=false;btn.disabled=false;btn.textContent='开始塔罗占卜';
    var d=deck.slice();
    for(var i=d.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1)),t=d[i];d[i]=d[j];d[j]=t}
    var q=$('t2Q').value.trim(),three=TV.spread==='three';
    var drawn=(three?['牌一','牌二','牌三']:['当下']).map(function(p,k){return{card:d[k],pos:p,rev:Math.random()>0.5}});
    var res=$('t2Res');
    res.innerHTML=(q?'<div class="t2-qs">「'+esc(q)+'」</div>':'')
      +'<div class="t2-tip">'+(three?'三张牌为你揭示 · 洞见能量流动':'塔罗为你揭示 · 一切皆有答案')+'</div>'
      +'<div class="t2-row'+(three?'':' single')+'">'+drawn.map(t2CardHTML).join('')+'</div><p class="hint" style="text-align:center">点牌翻过来看释义</p>';
    res.querySelectorAll('.t2-card').forEach(function(el){el.addEventListener('click',function(){el.classList.toggle('flipped')})});
    res.querySelectorAll('.t2-front img').forEach(function(im){im.onerror=function(){var p=im.parentNode;p.innerHTML='<div class="t2-noimg'+(im.classList.contains('rv')?' rv':'')+'"><b>✧</b><span>'+esc(im.alt)+'</span></div>'}});
    $('t2Setup').hidden=true;res.hidden=false;$('t2Reset').hidden=false;
    S.draws.unshift({id:uid(),at:Date.now(),type:three?'三张塔罗':'单张塔罗',question:q,name:drawn[0].card.name,rev:drawn[0].rev,
      cards:drawn.map(function(x){return{name:x.card.name,keyword:x.card.keyword||'',position:x.pos,isReversed:x.rev,meaning:x.rev?x.card.reversed:x.card.upright}})});
    if(S.draws.length>50)S.draws.length=50;
    save();updateNav();
  });
};
t2Hist=function(){
  var box=$('t2HList');if(!box)return;
  if(!S.draws.length){box.innerHTML='<div class="empty"><b>尚无占卜记录</b>完成一次占卜后，结果将自动收录于此</div>';return}
  box.innerHTML=S.draws.map(function(x){
    var cards=x.cards||[{name:x.name,isReversed:x.rev}];
    return '<div class="t2-h"><div class="t2-ht"><b>'+esc(x.type||'塔罗')+'</b><span>'+fmt(x.at)+'</span></div>'
      +(x.question?'<div class="t2-hq">「'+esc(x.question)+'」</div>':'')
      +'<div class="t2-tags">'+cards.map(function(c){return '<span class="'+(c.isReversed?'rv':'')+'">'+(c.position?esc(c.position)+' · ':'')+esc(c.name)+(c.isReversed?' · 逆':' · 正')+'</span>'}).join('')+'</div>'
      +cards.filter(function(c){return c.meaning}).map(function(c){return '<p class="t2-hm"><b>'+esc(c.name)+'</b>'+esc(c.meaning)+'</p>'}).join('')
      +'</div>';
  }).join('');
};
// v15：塔罗照 milk：78 张带牌面图的牌、单张/三张牌阵、可以先写下问题、点牌翻面看释义、占卜记录
// 牌的数据从 milk 固定版本（db66146）读一次，存在本机，以后不用再联网读
var MILK_GAMES=['https://cdn.jsdelivr.net/gh/aielin17/milk@db66146284641be775207b752c3de770968578f3/js/games.js','https://raw.githubusercontent.com/aielin17/milk/db66146284641be775207b752c3de770968578f3/js/games.js'];
var T78_KEY='mj_zika_tarot78',TAROT78=null,TV={spread:'single',busy:false};
// 只当数据读：把 milk 里的对象字面量转成 JSON 再解析，不执行它的代码









renderDraws=function(){
  buildTarot();
  var d=new Date(),e=$('tarotDate');if(e)e.textContent=(d.getMonth()+1)+'月'+d.getDate()+'日';
  t2Hist();
};
buildTarot();load78().catch(function(){});

}catch(e){console.error("[zika] js/tarot2.js",e)}

/* ===== js/lib2.js ===== */
try{
lbEnsure=function(){
  if(!S.libColors||typeof S.libColors!=='object')S.libColors={};
  if(!Array.isArray(S.libEmpty))S.libEmpty=[];
  if(!Array.isArray(S.libOff))S.libOff=[];
  if(!Array.isArray(S.libOrder))S.libOrder=[];
  S.lib.forEach(function(x){if(!x.id)x.id=uid()});
};
lbColor=function(t){
  if(S.libColors&&S.libColors[t])return S.libColors[t];
  if(t==='未分组')return '#868E96';
  var i=libTags().map(function(g){return g.tag}).indexOf(t);
  return LB_COLORS[(i<0?0:i)%8];
};
lbUnempty=function(t){S.libEmpty=S.libEmpty.filter(function(n){return n!==t})};
lbKeep=function(tags){tags.forEach(function(t){if(!S.lib.some(function(x){return x.tag===t})&&S.libEmpty.indexOf(t)<0)S.libEmpty.push(t)})};
lbDropTag=function(t){
  S.libOff=S.libOff.filter(function(x){return x!==t});lbUnempty(t);
  delete S.libColors[t];S.libOrder=S.libOrder.filter(function(x){return x!==t});
};
lbRename=function(o,n){
  var wasOff=S.libOff.indexOf(o)>=0,wasEmpty=S.libEmpty.indexOf(o)>=0;
  S.lib.forEach(function(x){if(x.tag===o)x.tag=n});
  if(S.libColors[o]&&!S.libColors[n])S.libColors[n]=S.libColors[o];
  S.libOrder=S.libOrder.map(function(x){return x===o?n:x});
  lbDropTag(o);
  if(wasOff&&S.libOff.indexOf(n)<0)S.libOff.push(n);
  if(wasEmpty)lbKeep([n]);
  if(LB.filter===o)LB.filter=n;
};
lbItems=function(){
  var q=LB.q.toLowerCase();
  return S.lib.filter(function(x){
    if(LB.filter!=='all'&&x.tag!==LB.filter)return false;
    if(q&&x.text.toLowerCase().indexOf(q)<0)return false;
    return true;
  });
};
lbSelected=function(){return S.lib.filter(function(x){return LB.sel[x.id]})};
lbGroupPick=function(el,cur,cb){
  function draw(){
    var tags=libTags().map(function(g){return g.tag});if(tags.indexOf(cur)<0)tags.push(cur);
    el.innerHTML='';
    tags.forEach(function(t){
      var c=lbColor(t),on=t===cur,b=document.createElement('button');
      b.type='button';b.className='lb-pill'+(on?' on':'');
      if(on){b.style.background=c;b.style.borderColor=c}
      b.innerHTML='<i style="background:'+(on?'#fff':c)+'"></i>';b.appendChild(document.createTextNode(t));
      b.addEventListener('click',function(){cur=t;cb(t);draw()});
      el.appendChild(b);
    });
    var n=document.createElement('button');n.type='button';n.className='lb-pill';n.textContent='＋ 新分组';
    n.addEventListener('click',function(){
      var r=prompt('新分组叫什么？');if(r===null||!r.trim())return;
      cur=cleanTag(r);cb(cur);draw();
    });
    el.appendChild(n);
  }
  draw();
};
lbCardEl=function(x,badge){
  var d=document.createElement('div');
  d.className='lb-card'+(x.off?' off':'')+(LB.sel[x.id]?' sel':'');
  var h='';
  if(LB.batch)h+='<span class="lb-chk">'+(LB.sel[x.id]?'✓':'')+'</span>';
  h+='<div class="t"><span class="tx"></span>';
  if(badge){var c=lbColor(x.tag);h+='<span class="bdg" style="color:'+c+';background:'+c+'18;border-color:'+c+'40"><i style="background:'+c+'"></i></span>'}
  h+='</div>';
  if(!LB.batch)h+='<div class="ops"><button type="button" data-op="ed" aria-label="编辑">✎</button><button type="button" data-op="off" aria-label="'+(x.off?'取消屏蔽':'屏蔽')+'">'+(x.off?'↺':'⊘')+'</button><button type="button" data-op="rm" aria-label="删除">×</button></div>';
  d.innerHTML=h;
  d.querySelector('.tx').textContent=x.text;
  if(badge)d.querySelector('.bdg').appendChild(document.createTextNode(x.tag));
  d.addEventListener('click',function(e){
    var b=e.target.closest('[data-op]');
    if(b){e.stopPropagation();lbOp(x,b.dataset.op);return}
    if(LB.batch){if(LB.sel[x.id])delete LB.sel[x.id];else LB.sel[x.id]=1;drawLib();return}
    useLine(x.text);
  });
  return d;
};
lbGroupEl=function(g,its){
  var c=lbColor(g.tag),isOff=S.libOff.indexOf(g.tag)>=0,fold=!!LB.fold[g.tag];
  var sec=document.createElement('div');sec.className='lb-grp'+(isOff?' off':'')+(fold?' fold':'');
  var hd=document.createElement('div');hd.className='lb-gh';
  var allSel=its.length&&its.every(function(x){return LB.sel[x.id]});
  hd.innerHTML='<i style="background:'+c+'"></i><b style="color:'+c+'"></b><span class="c">'+its.length+' 句</span>'
    +(LB.batch&&its.length?'<button type="button" data-ga="sel">'+(allSel?'取消本组':'全选本组')+'</button>':'')
    +'<button type="button" data-ga="off">'+(isOff?'已屏蔽':'屏蔽')+'</button><span class="arr">⌄</span>';
  hd.querySelector('b').textContent=g.tag;
  hd.addEventListener('click',function(e){
    var b=e.target.closest('[data-ga]');
    if(b&&b.dataset.ga==='off'){
      if(isOff)S.libOff=S.libOff.filter(function(t){return t!==g.tag});else S.libOff.push(g.tag);
      refreshLib();return;
    }
    if(b&&b.dataset.ga==='sel'){its.forEach(function(x){if(allSel)delete LB.sel[x.id];else LB.sel[x.id]=1});drawLib();return}
    LB.fold[g.tag]=!LB.fold[g.tag];sec.classList.toggle('fold',LB.fold[g.tag]);
  });
  var cs=document.createElement('div');cs.className='lb-cards';
  if(!its.length)cs.innerHTML='<p class="hint" style="margin:0 0 8px 4px">这组还没有字卡。</p>';
  its.forEach(function(x){cs.appendChild(lbCardEl(x,false))});
  sec.appendChild(hd);sec.appendChild(cs);
  return sec;
};
lbEmpty=function(t,s){return '<div class="empty"><b>'+t+'</b>'+s+'</div>'};
lbDrawBar=function(){
  var bar=$('lbBar');if(!bar)return;
  bar.hidden=!LB.batch;
  if(!LB.batch){bar.innerHTML='';return}
  var n=lbSelected().length;
  bar.innerHTML='<span>已选 '+n+' 句</span><button class="ghost" data-b="all">全选</button><button class="ghost" data-b="mv">移到分组</button><button class="ghost" data-b="off">屏蔽</button><button class="ghost" data-b="on">取消屏蔽</button><button class="ghost" data-b="rm">删除</button><button class="primary" data-b="done">完成</button>';
};
lbBarClick=function(e){
  var b=e.target.closest('[data-b]');if(!b)return;
  var a=b.dataset.b,sel=lbSelected();
  if(a==='done'){LB.batch=false;LB.sel={};drawLib();return}
  if(a==='all'){
    var vis=lbItems(),all=vis.length&&vis.every(function(x){return LB.sel[x.id]});
    LB.sel={};if(!all)vis.forEach(function(x){LB.sel[x.id]=1});
    drawLib();return;
  }
  if(!sel.length){alert('先点几句选上。');return}
  if(a==='off'||a==='on'){sel.forEach(function(x){x.off=a==='off'});refreshLib();return}
  if(a==='rm'){
    if(!confirm('删掉选中的 '+sel.length+' 句？'))return;
    var tags=uniqArr(sel.map(function(x){return x.tag}));
    S.lib=S.lib.filter(function(x){return !LB.sel[x.id]});LB.sel={};lbKeep(tags);refreshLib();return;
  }
  if(a==='mv')lbMove(sel);
};
lbMove=function(sel){
  var w=document.createElement('div'),tag=sel[0].tag;
  w.innerHTML='<p class="hint" style="margin:0 0 10px">把选中的 '+sel.length+' 句挪到：</p><div class="lb-gpick" id="lmG"></div><button class="primary" id="lmOk" style="width:100%;margin-top:16px">挪 过 去</button>';
  lbGroupPick(w.querySelector('#lmG'),tag,function(t){tag=t});
  w.querySelector('#lmOk').addEventListener('click',function(){
    var old=uniqArr(sel.map(function(x){return x.tag}));
    sel.forEach(function(x){x.tag=tag});lbUnempty(tag);lbKeep(old);
    LB.sel={};refreshLib();closeSheet();
  });
  openSheet('移到分组',w);
};
lbOp=function(x,op){
  if(op==='ed'){lbEdit(x);return}
  if(op==='off'){x.off=!x.off;refreshLib();return}
  if(op==='rm'){
    if(!confirm('删掉这句？'))return;
    S.lib=S.lib.filter(function(y){return y!==x});lbKeep([x.tag]);refreshLib();
  }
};
lbEdit=function(x){
  var w=document.createElement('div'),tag=x.tag;
  w.innerHTML='<div class="field"><label>字卡</label><textarea id="leT" style="min-height:90px;font-family:var(--serif);font-size:14px;line-height:1.8"></textarea></div><div class="field"><label>分组</label><div class="lb-gpick" id="leG"></div></div><button class="primary" id="leOk" style="width:100%;margin-top:4px">收 好</button>';
  w.querySelector('#leT').value=x.text;
  lbGroupPick(w.querySelector('#leG'),tag,function(t){tag=t});
  w.querySelector('#leOk').addEventListener('click',function(){
    var t=w.querySelector('#leT').value.trim();if(!t)return;
    var old=x.tag;x.text=t;x.tag=tag;lbUnempty(tag);lbKeep([old]);
    refreshLib();closeSheet();
  });
  openSheet('编辑字卡',w);
};
lbAdd=function(){
  var tags=libTags(),tag=LB.filter!=='all'?LB.filter:(tags[0]?tags[0].tag:'我的');
  var w=document.createElement('div');
  w.innerHTML='<div class="field"><label>收进哪个分组</label><div class="lb-gpick" id="laG"></div></div><div class="field"><label>一行一句，可以一次贴很多</label><textarea id="laT" placeholder="第一句&#10;第二句&#10;第三句" style="min-height:150px;font-family:var(--serif);font-size:14px;line-height:1.8"></textarea></div><button class="primary" id="laOk" style="width:100%">收 进 库</button>';
  var ta=w.querySelector('#laT'),ok=w.querySelector('#laOk');
  function lines(){return uniqArr(ta.value.split('\n').map(function(s){return s.trim()}).filter(Boolean))}
  ta.addEventListener('input',function(){var n=lines().length;ok.textContent=n?'收进库 · '+n+' 句':'收 进 库'});
  lbGroupPick(w.querySelector('#laG'),tag,function(t){tag=t});
  ok.addEventListener('click',function(){
    var ls=lines();if(!ls.length)return;
    var have={},add=0;
    S.lib.forEach(function(x){if(x.tag===tag)have[x.text]=1});
    ls.forEach(function(t){if(have[t])return;have[t]=1;S.lib.push({id:uid(),tag:tag,text:t});add++});
    lbUnempty(tag);refreshLib();closeSheet();
    if(add<ls.length)alert('收进 '+add+' 句，另外 '+(ls.length-add)+' 句这组里本来就有。');
  });
  openSheet('新增字卡',w);
};
lbDedup=function(){
  var seen={},keep=[],n=0;
  S.lib.forEach(function(x){if(seen[x.text]){n++;return}seen[x.text]=1;keep.push(x)});
  if(!n){alert('没有重复的字卡。');return}
  if(!confirm('找到 '+n+' 句重复的。同一句只留第一次出现的那条？'))return;
  var tags=libTags().map(function(g){return g.tag});
  S.lib=keep;lbKeep(tags);refreshLib();
  alert('删掉了 '+n+' 句重复的。');
};
// v15：字卡库照 milk 整理。分组筛选、分组折叠、单句屏蔽、批量选择/移动/屏蔽/删除、一次加很多句、去重、分组颜色和排序。样子沿用这边原来的
var LB={filter:'all',q:'',batch:false,sel:{},fold:{}};
var LB_COLORS=['#38D9A9','#5C7CFA','#F06595','#748FFC','#FFC542','#CC5DE8','#F783AC','#FF8E53','#868E96'];

lbEnsure();save();

// 分组：库里有的 + 新建了还空着的，按 libOrder 排
libTags=function(){
  var cnt={},order=[];
  S.lib.forEach(function(x){if(cnt[x.tag]===undefined){cnt[x.tag]=0;order.push(x.tag)}cnt[x.tag]++});
  (S.libEmpty||[]).forEach(function(t){if(cnt[t]===undefined){cnt[t]=0;order.push(t)}});
  var od=Array.isArray(S.libOrder)?S.libOrder:[];
  var res=order.map(function(t,i){var k=od.indexOf(t);return{tag:t,n:cnt[t],k:k<0?1e6+i:k}});
  res.sort(function(a,b){return a.k-b.k});
  return res;
};


// 句子挪走或删光了，分组本身留着




// 他回字卡的池子：再去掉单句屏蔽的
libPool=function(){
  var off=S.libOff||[];
  return S.lib.filter(function(x){return x.tag!=='信'&&!x.off&&off.indexOf(x.tag)<0}).map(function(x){return x.text});
};
// 导入 milk 字卡包时把分组颜色也带上
var _applyPackV15=applyPack;
applyPack=function(d,o,rep){
  var n=_applyPackV15(d,o,rep);lbEnsure();
  (d.customReplyGroups||[]).forEach(function(g){if(g&&g.color&&g.name)S.libColors[cleanTag(g.name)]=g.color});
  return n;
};
exportPack=function(){
  var base=Date.now();
  var groups=libTags().map(function(g,i){
    return{id:base+i,name:g.tag,color:lbColor(g.tag),disabled:S.libOff.indexOf(g.tag)>=0,
      items:S.lib.filter(function(x){return x.tag===g.tag}).map(function(x){return x.text})};
  });
  downloadJSON({exportDate:new Date().toISOString(),modules:['replies','groups'],customReplies:uniqArr(S.lib.map(function(x){return x.text})),customReplyGroups:groups},'reply-library-'+ymd()+'.json');
};




// 选分组的一排胶囊，最后一个是新建






drawLib=function(){
  var pills=$('lbPills'),list=$('lbList');if(!pills||!list)return;
  lbEnsure();
  var tags=libTags(),off=S.libOff;
  if(LB.filter!=='all'&&!tags.some(function(g){return g.tag===LB.filter}))LB.filter='all';
  pills.innerHTML='<button class="lb-pill'+(LB.filter==='all'?' on':'')+'" data-f="all">全部 <em>'+S.lib.length+'</em></button>'+tags.map(function(g){
    var c=lbColor(g.tag),on=LB.filter===g.tag;
    return '<button class="lb-pill'+(on?' on':'')+(off.indexOf(g.tag)>=0?' off':'')+'" data-f="'+esc(g.tag)+'"'+(on?' style="background:'+c+';border-color:'+c+'"':'')+'><i style="background:'+(on?'#fff':c)+'"></i>'+esc(g.tag)+' <em>'+g.n+'</em></button>';
  }).join('');
  var bb=document.querySelector('[data-la="batch"]');
  if(bb){bb.classList.toggle('on',LB.batch);bb.textContent=LB.batch?'退出批量':'批量'}
  var items=lbItems();
  list.innerHTML='';
  if(LB.filter==='all'&&!LB.q){
    if(!tags.length)list.innerHTML=lbEmpty('库是空的','点「＋ 新增字卡」加几句，<br>或者导入一个字卡包。');
    tags.forEach(function(g){list.appendChild(lbGroupEl(g,items.filter(function(x){return x.tag===g.tag})))});
  }else if(!items.length){
    list.innerHTML=LB.q?lbEmpty('没找到','换个词试试。'):lbEmpty('这组还空着','点「＋ 新增字卡」往里加。');
  }else{
    items.forEach(function(x){list.appendChild(lbCardEl(x,LB.filter==='all'))});
  }
  var lc=$('libCount');if(lc)lc.textContent=S.lib.length+' 句';
  lbDrawBar();
};





// 一次加很多句，一行一句



renderLibPage=function(){
  var box=$('libPage');if(!box)return;
  if(!box.querySelector('#lbList')){
    box.innerHTML='<div class="lb-tools"><input id="lbQ" placeholder="搜一句…"><button class="ghost" id="lbRand">随机一句</button></div>'
      +'<div class="lb-acts"><button class="ghost" data-la="add">＋ 新增字卡</button><button class="ghost" data-la="batch">批量</button><button class="ghost" data-la="grp">管理分组</button><button class="ghost" data-la="dedup">去重</button><button class="ghost" data-la="imp">导入</button><button class="ghost" data-la="exp">导出</button></div>'
      +'<div class="lb-pills" id="lbPills"></div><div id="lbList"></div><div class="lb-bbar" id="lbBar" hidden></div>'
      +'<p class="hint">点一句就带去传讯页，填进输入框。✎ 编辑，⊘ 屏蔽这一句，× 删掉。分组名那一行点「屏蔽」整组都不抽，点别处折起来。「信」这组只给回信用。</p>';
    $('lbQ').addEventListener('input',function(){LB.q=this.value.trim();drawLib()});
    $('lbRand').addEventListener('click',function(){
      var its=lbItems().filter(function(x){return !x.off&&S.libOff.indexOf(x.tag)<0});
      if(its.length)useLine(pickOne(its).text);
    });
    box.querySelector('.lb-acts').addEventListener('click',function(e){
      var b=e.target.closest('[data-la]');if(!b)return;var a=b.dataset.la;
      if(a==='add')lbAdd();
      if(a==='batch'){LB.batch=!LB.batch;LB.sel={};drawLib()}
      if(a==='grp')openGroups();
      if(a==='dedup')lbDedup();
      if(a==='imp')importAny();
      if(a==='exp')exportPack();
    });
    $('lbPills').addEventListener('click',function(e){var b=e.target.closest('[data-f]');if(!b)return;LB.filter=b.dataset.f;drawLib()});
    $('lbBar').addEventListener('click',lbBarClick);
    LIB.built=true;
  }
  drawLib();
};

// 分组管理：新建、换颜色、往前挪、屏蔽、改名、删
openGroups=function(){
  lbEnsure();
  var w=document.createElement('div');
  w.innerHTML='<div class="libbar"><button class="ghost" data-g="new">＋ 新建分组</button><button class="ghost" data-g="imp">导入字卡包</button><button class="ghost" data-g="exp">导出</button></div><div id="gmList"></div><p class="hint">屏蔽的分组还在库里，只是'+esc(taName())+'回字卡时不从里面抽。点前面的圆点换颜色，↑ 往前挪。删分组的话，里面的句子挪到「未分组」。</p>';
  var list=w.querySelector('#gmList');
  function done(){refreshLib();draw()}
  function draw(){
    list.innerHTML='';
    var tags=libTags();
    if(!tags.length){list.innerHTML='<p class="hint">还没有分组。</p>';return}
    tags.forEach(function(g,i){
      var off=S.libOff.indexOf(g.tag)>=0,c=lbColor(g.tag);
      var row=document.createElement('div');row.className='lb-gm'+(off?' off':'');
      row.innerHTML='<div class="r"><button type="button" class="dot" data-a="col" aria-label="换颜色"></button><span class="n"></span><span class="c">'+g.n+' 句</span>'
        +(i?'<button type="button" data-a="up" aria-label="往前挪">↑</button>':'')
        +'<button type="button" data-a="tg">'+(off?'启用':'屏蔽')+'</button><button type="button" data-a="rn">改名</button><button type="button" data-a="rm">删</button></div><div class="lb-colors" hidden></div>';
      row.querySelector('.dot').style.background=c;
      row.querySelector('.n').textContent=g.tag;
      var cols=row.querySelector('.lb-colors');
      LB_COLORS.forEach(function(col){
        var b=document.createElement('button');b.type='button';b.style.background=col;b.dataset.col=col;
        if(col.toLowerCase()===String(c).toLowerCase())b.className='on';
        cols.appendChild(b);
      });
      row.addEventListener('click',function(e){
        var cb=e.target.closest('[data-col]');
        if(cb){S.libColors[g.tag]=cb.dataset.col;done();return}
        var b=e.target.closest('[data-a]');if(!b)return;var a=b.dataset.a;
        if(a==='col'){cols.hidden=!cols.hidden;return}
        if(a==='up'){var ts=tags.map(function(x){return x.tag}),t=ts[i];ts[i]=ts[i-1];ts[i-1]=t;S.libOrder=ts;done();return}
        if(a==='tg'){if(off)S.libOff=S.libOff.filter(function(t){return t!==g.tag});else S.libOff.push(g.tag);done();return}
        if(a==='rn'){
          var r=prompt('改成什么？',g.tag);if(r===null||!r.trim())return;
          var nn=cleanTag(r);if(nn===g.tag)return;lbRename(g.tag,nn);done();return;
        }
        if(a==='rm'){
          if(g.tag==='未分组'){
            if(g.n&&!confirm('删掉「未分组」里的 '+g.n+' 句？'))return;
            S.lib=S.lib.filter(function(x){return x.tag!=='未分组'});
          }else{
            if(!confirm('删掉分组「'+g.tag+'」？'+(g.n?'里面的 '+g.n+' 句会挪到「未分组」。':'')))return;
            S.lib.forEach(function(x){if(x.tag===g.tag)x.tag='未分组'});
          }
          lbDropTag(g.tag);done();
        }
      });
      list.appendChild(row);
    });
  }
  w.querySelector('.libbar').addEventListener('click',function(e){
    var b=e.target.closest('[data-g]');if(!b)return;var a=b.dataset.g;
    if(a==='new'){
      var r=prompt('新分组叫什么？');if(r===null||!r.trim())return;
      var nm=cleanTag(r);if(!libTags().some(function(x){return x.tag===nm}))S.libEmpty.push(nm);
      done();
    }
    if(a==='imp')importAny();
    if(a==='exp')exportPack();
  });
  draw();openSheet('字卡分组',w);
};
if(LIB.built)renderLibPage();

}catch(e){console.error("[zika] js/lib2.js",e)}

/* ===== js/lib3.js ===== */
try{
lbCardMenu=function(x){
  var w=document.createElement('div');
  w.innerHTML='<p class="lb-mtext"></p><div class="menu-list set-grp">'
    +'<button type="button" class="mi" data-m="use"><b>带去传讯</b><span>›</span></button>'
    +'<button type="button" class="mi" data-m="ed"><b>编辑</b><span>改字 · 换分组 ›</span></button>'
    +'<button type="button" class="mi" data-m="off"><b>'+(x.off?'取消屏蔽':'屏蔽这句')+'</b><span>'+(x.off?'':'他不会抽到')+'</span></button>'
    +'<button type="button" class="mi" data-m="rm"><b class="lb-danger">删掉</b><span></span></button></div>';
  w.querySelector('.lb-mtext').textContent=x.text;
  w.addEventListener('click',function(e){
    var b=e.target.closest('[data-m]');if(!b)return;var m=b.dataset.m;
    if(m==='use'){closeSheet();useLine(x.text);return}
    if(m==='ed'){lbEdit(x);return}
    if(m==='off'){x.off=!x.off;refreshLib();closeSheet();return}
    if(m==='rm'){
      if(!confirm('删掉这句？'))return;
      S.lib=S.lib.filter(function(y){return y!==x});lbKeep([x.tag]);refreshLib();closeSheet();
    }
  });
  openSheet('这一句',w);
};
lbMoreMenu=function(){
  var rows=[['rand','随机一句','带去传讯'],['batch',LB.batch?'退出批量':'批量选择','移动 · 屏蔽 · 删除'],['grp','管理分组','屏蔽 · 颜色 · 顺序'],['dedup','去重',''],['imp','导入字卡包','milk 的也行'],['exp','导出字卡包','json']];
  var w=document.createElement('div');
  w.innerHTML='<div class="menu-list set-grp">'+rows.map(function(r){return '<button type="button" class="mi" data-m="'+r[0]+'"><b>'+r[1]+'</b><span>'+r[2]+' ›</span></button>'}).join('')+'</div>';
  w.addEventListener('click',function(e){
    var b=e.target.closest('[data-m]');if(!b)return;var m=b.dataset.m;
    if(m==='imp'){closeSheet();importAny();return}
    if(m==='exp'){closeSheet();exportPack();return}
    if(m==='rand'){
      var its=lbItems().filter(function(x){return !x.off&&S.libOff.indexOf(x.tag)<0});
      closeSheet();if(its.length)useLine(pickOne(its).text);return;
    }
    if(m==='batch'){LB.batch=!LB.batch;LB.sel={};closeSheet();drawLib();return}
    if(m==='grp'){openGroups();return}
    if(m==='dedup'){closeSheet();lbDedup()}
  });
  openSheet('字卡库',w);
};
// v16：字卡库收拾整齐。顶上只留搜索、＋、⋯；分组默认收起；每句只留一个 ⋯，编辑、屏蔽、删除都收在里面

LB.open=LB.open||{};

lbCardEl=function(x,badge){
  var d=document.createElement('div');
  d.className='lb-card'+(x.off?' off':'')+(LB.sel[x.id]?' sel':'');
  var h='';
  if(LB.batch)h+='<span class="lb-chk">'+(LB.sel[x.id]?'✓':'')+'</span>';
  h+='<div class="t"><span class="tx"></span>';
  if(badge){var c=esc(lbColor(x.tag));h+='<span class="bdg" style="color:'+c+';background:'+c+'18;border-color:'+c+'40"><i style="background:'+c+'"></i></span>'}
  h+='</div>';
  if(!LB.batch)h+='<button type="button" class="lb-more" aria-label="这一句的更多操作">⋯</button>';
  d.innerHTML=h;
  d.querySelector('.tx').textContent=x.text;
  if(badge)d.querySelector('.bdg').appendChild(document.createTextNode(x.tag));
  d.addEventListener('click',function(e){
    if(e.target.closest('.lb-more')){e.stopPropagation();lbCardMenu(x);return}
    if(LB.batch){if(LB.sel[x.id])delete LB.sel[x.id];else LB.sel[x.id]=1;drawLib();return}
    useLine(x.text);
  });
  return d;
};

// 一句的操作面板


// 分组：默认收起，点一下展开。屏蔽挪进「管理分组」，这里只标一下
lbGroupEl=function(g,its){
  var c=esc(lbColor(g.tag)),isOff=S.libOff.indexOf(g.tag)>=0,open=!!LB.open[g.tag];
  var sec=document.createElement('div');sec.className='lb-grp'+(isOff?' off':'')+(open?'':' fold');
  var hd=document.createElement('div');hd.className='lb-gh';
  var allSel=its.length&&its.every(function(x){return LB.sel[x.id]});
  hd.innerHTML='<i style="background:'+c+'"></i><b style="color:'+c+'"></b><span class="c">'+its.length+'</span>'
    +(isOff?'<span class="lb-offtag">已屏蔽</span>':'')+'<span class="sp"></span>'
    +(LB.batch&&its.length?'<button type="button" data-ga="sel">'+(allSel?'取消本组':'全选本组')+'</button>':'')
    +'<span class="arr">⌄</span>';
  hd.querySelector('b').textContent=g.tag;
  hd.addEventListener('click',function(e){
    var b=e.target.closest('[data-ga]');
    if(b){its.forEach(function(x){if(allSel)delete LB.sel[x.id];else LB.sel[x.id]=1});drawLib();return}
    LB.open[g.tag]=!LB.open[g.tag];sec.classList.toggle('fold',!LB.open[g.tag]);
  });
  var cs=document.createElement('div');cs.className='lb-cards';
  if(!its.length)cs.innerHTML='<p class="hint" style="margin:0 0 8px 4px">这组还没有字卡。</p>';
  its.forEach(function(x){cs.appendChild(lbCardEl(x,false))});
  sec.appendChild(hd);sec.appendChild(cs);
  return sec;
};

// 顶上 ⋯ 里的东西


renderLibPage=function(){
  var box=$('libPage');if(!box)return;
  if(!box.querySelector('#lbMore')){
    box.innerHTML='<div class="lb-tools"><div class="lb-search"><input id="lbQ" type="search" placeholder="搜一句…" autocomplete="off"></div>'
      +'<button type="button" class="lb-ib lb-add" id="lbAdd" aria-label="新增字卡">＋</button><button type="button" class="lb-ib" id="lbMore" aria-label="更多">⋯</button></div>'
      +'<div class="lb-pills" id="lbPills"></div><div id="lbList"></div><div class="lb-bbar" id="lbBar" hidden></div>'
      +'<p class="hint lb-foot">点一句带去传讯页 · 点分组名展开或收起<br>每句后面的 ⋯ 里能编辑、屏蔽、删除</p>';
    var q=$('lbQ');q.value=LB.q||'';
    q.addEventListener('input',function(){LB.q=this.value.trim();drawLib()});
    $('lbAdd').addEventListener('click',lbAdd);
    $('lbMore').addEventListener('click',lbMoreMenu);
    $('lbPills').addEventListener('click',function(e){var b=e.target.closest('[data-f]');if(!b)return;LB.filter=b.dataset.f;drawLib()});
    $('lbBar').addEventListener('click',lbBarClick);
    LIB.built=true;
  }
  drawLib();
};
if(LIB.built)renderLibPage();

}catch(e){console.error("[zika] js/lib3.js",e)}

/* ===== js/kb.js ===== */
try{

// v17：键盘弹起时，让页面高度等于键盘上方那块可见区域，顶栏不被顶出去
(function(){
  var vv=window.visualViewport,root=document.documentElement;
  function fit(){
    var h=vv?vv.height:window.innerHeight,top=vv?vv.offsetTop:0;
    root.style.setProperty('--app-h',Math.round(h)+'px');
    root.style.setProperty('--app-top',Math.round(top)+'px');
  }
  if(vv){vv.addEventListener('resize',fit);vv.addEventListener('scroll',fit)}
  window.addEventListener('resize',fit);
  document.addEventListener('focusin',function(e){
    var t=e.target;if(!t||!t.matches||!t.matches('input,textarea'))return;
    setTimeout(function(){
      fit();
      if(t.id==='input'){var s=document.getElementById('stream');if(s)s.scrollTop=s.scrollHeight}
    },320);
  });
  document.addEventListener('focusout',function(){setTimeout(fit,120)});
  fit();
})();

}catch(e){console.error("[zika] js/kb.js",e)}

/* ===== js/moments2.js ===== */
try{
moEnsure=function(){
  var p=S.prefs;
  for(var k in MO_DEF)if(typeof p[k]!=='number')p[k]=MO_DEF[k];
  if(typeof p.moCover!=='string')p.moCover='';
  if(typeof p.moSign!=='string')p.moSign='';
  if(typeof S.moUnread!=='number')S.moUnread=0;
  if(!Array.isArray(S.moments))S.moments=[];
  S.moments.forEach(function(m){
    if(!Array.isArray(m.likes))m.likes=[];
    if(!Array.isArray(m.comments))m.comments=[];
    if(!Array.isArray(m.imgs))m.imgs=[];
  });
};
moDelay=function(){
  var p=S.prefs,a=Math.max(0,+p.moMin||0),b=Math.max(a,+p.moMax||0);
  return Math.max(4000,rnd(a,b)*60000);
};
moPlan=function(m){
  var p=S.prefs,now=Date.now(),ai={like:0,cmts:[]};
  if(Math.random()*100<(+p.moLikeRate))ai.like=now+moDelay();
  if(Math.random()*100<(+p.moCmtRate)){
    var n=1+Math.floor(Math.random()*Math.max(1,+p.moCmtMax||1));
    for(var i=0;i<n;i++)ai.cmts.push(now+moDelay());
  }
  ai.cmts.sort(function(a,b){return a-b});
  if(ai.like||ai.cmts.length)m.ai=ai;
};
moLine=function(){var pool=libPool();return pool.length?pickOne(pool):'看到了。'};
moOn=function(){var v=document.querySelector('.view.on');return !!v&&v.dataset.view==='moments'};
moTick=function(){
  var now=Date.now(),got=0,changed=false;
  S.moments.forEach(function(m){
    var ai=m.ai;
    if(ai){
      if(ai.like&&now>=ai.like){ai.like=0;changed=true;if(m.likes.indexOf('ta')<0){m.likes.push('ta');got++}}
      while(ai.cmts&&ai.cmts.length&&now>=ai.cmts[0]){
        var t=ai.cmts.shift();m.comments.push({id:uid(),from:'ta',text:moLine(),at:t});got++;changed=true;
      }
      if(!ai.like&&!(ai.cmts&&ai.cmts.length)){delete m.ai;changed=true}
    }
    var n=m.comments.length;
    for(var i=0;i<n;i++){
      var c=m.comments[i];
      if(c.from==='me'&&c.replyAt&&now>=c.replyAt){
        var at=c.replyAt;c.replyAt=0;
        m.comments.push({id:uid(),from:'ta',to:'me',text:moLine(),at:at});got++;changed=true;
      }
    }
    if(changed)m.comments.sort(function(a,b){return a.at-b.at});
  });
  if(!changed)return;
  S.moUnread+=got;save();updateNav();
  if(moOn())renderMoments();
};
moFind=function(id){for(var i=0;i<S.moments.length;i++)if(S.moments[i].id===id)return S.moments[i];return null};
moWho=function(k){return k==='me'?(S.me.name||'我'):taName()};
moHM=function(t){var d=new Date(t);return pad(d.getHours())+':'+pad(d.getMinutes())};
moDay0=function(t){var d=new Date(t);d.setHours(0,0,0,0);return d.getTime()};
moLabel=function(t){
  var diff=Math.round((moDay0(Date.now())-moDay0(t))/864e5),d=new Date(t);
  if(diff===0)return '<b class="w">今天</b>';
  if(diff===1)return '<b class="w">昨天</b>';
  var y=d.getFullYear()!==new Date().getFullYear()?'<em>'+d.getFullYear()+'</em>':'';
  return '<b>'+pad(d.getDate())+'</b><span>'+(d.getMonth()+1)+'月</span>'+y;
};
moPostHTML=function(m){
  var mine=m.from==='me',who=mine?S.me:S.ta,h='<article class="m2-post" data-id="'+esc(m.id)+'">';
  if(!mine)h+='<div class="m2-by"><span class="m2-bav">'+avStr(who)+'</span><b>'+esc(who.name||'')+'</b></div>';
  var im=m.imgs||[];
  if(im.length){
    var cls=im.length===1?'n1':(im.length===2||im.length===4?'n2':'n3');
    h+='<div class="m2-imgs '+cls+'">'+im.map(function(s,i){return '<img src="'+esc(s)+'" data-z="'+i+'" alt="">'}).join('')+'</div>';
  }else if(m.img)h+='<div class="m2-sym">'+esc(m.img)+'</div>';
  if(m.text)h+='<p class="m2-text">'+esc(m.text)+'</p>';
  var liked=m.likes.indexOf('me')>=0;
  h+='<div class="m2-meta"><span>'+moHM(m.at)+(m.priv?' · 仅自己可见':'')+'</span><button type="button" data-a="like" class="'+(liked?'on':'')+'">'+(liked?'♥':'♡')+' 赞</button><button type="button" data-a="cmt">评论</button><button type="button" data-a="del">删</button></div>';
  var likes=m.likes.map(function(k){return esc(moWho(k))});
  var cm=m.comments.slice().sort(function(a,b){return a.at-b.at});
  if(likes.length||cm.length){
    h+='<div class="m2-ia">';
    if(likes.length)h+='<div class="m2-lk">♡ '+likes.join('，')+'</div>';
    cm.forEach(function(c){
      h+='<div class="m2-c" data-c="'+esc(c.id)+'"><b>'+esc(moWho(c.from))+'</b>'+(c.to?' 回复 <b>'+esc(moWho(c.to))+'</b>':'')+'：'+esc(c.text)+'</div>';
    });
    h+='</div>';
  }
  return h+'</article>';
};
moBuild=function(){
  var v=document.querySelector('.view[data-view="moments"]');
  if(!v||v.dataset.v18)return;v.dataset.v18='1';
  v.innerHTML='<div class="m2-cover" id="m2Cover"><div class="m2-who"><span class="m2-nm" id="m2Nm"></span><button type="button" class="m2-av" id="m2Av" aria-label="换我的头像"></button></div></div>'
    +'<p class="m2-sign" id="m2Sign"></p><div id="m2New" hidden></div><div id="moList"></div>'
    +'<span id="moCoverName" hidden></span><span id="moCount" hidden></span>';
  $('m2Cover').addEventListener('click',function(e){
    if(e.target.closest('#m2Av')){pickAvatar('me');return}
    moCoverSet();
  });
  $('m2Sign').addEventListener('click',moSignSet);
  $('moList').addEventListener('click',moListClick);
};
moListClick=function(e){
  var t=e.target;
  var pb=t.closest('[data-pub]');if(pb){newMoment2(pb.dataset.pub==='1');return}
  var art=t.closest('.m2-post');if(!art)return;
  var m=moFind(art.dataset.id);if(!m)return;
  if(t.closest('.m2-cbox'))return;
  var z=t.closest('img[data-z]');if(z){moZoom(z.src);return}
  var a=t.closest('[data-a]');
  if(a){
    var k=a.dataset.a;
    if(k==='like'){var i=m.likes.indexOf('me');if(i>=0)m.likes.splice(i,1);else m.likes.push('me');save();renderMoments();return}
    if(k==='cmt'){moBox(art,m,'');return}
    if(k==='del'){if(confirm('删掉这条动态？')){S.moments=S.moments.filter(function(x){return x!==m});save();renderMoments();updateNav()}return}
  }
  var ce=t.closest('.m2-c');
  if(ce){
    var c=m.comments.filter(function(x){return x.id===ce.dataset.c})[0];if(!c)return;
    if(c.from==='ta')moBox(art,m,'ta');
    else if(confirm('删掉这条评论？')){m.comments=m.comments.filter(function(x){return x!==c});save();renderMoments()}
  }
};
moBox=function(art,m,to){
  document.querySelectorAll('.m2-cbox').forEach(function(x){x.remove()});
  var b=document.createElement('div');b.className='m2-cbox';
  b.innerHTML='<input placeholder="'+(to?'回复 '+esc(taName())+'…':'评论…')+'" enterkeyhint="send"><button type="button">发</button>';
  var inp=b.querySelector('input');
  function go(){var v=inp.value.trim();if(v)moComment(m,v,to)}
  b.querySelector('button').addEventListener('click',function(e){e.stopPropagation();go()});
  inp.addEventListener('keydown',function(e){if(e.key==='Enter'){e.preventDefault();go()}});
  art.appendChild(b);inp.focus();
};
moComment=function(m,text,to){
  var c={id:uid(),from:'me',text:text,at:Date.now()};
  if(to)c.to=to;
  if(!m.priv&&Math.random()*100<(+S.prefs.moReplyRate))c.replyAt=Date.now()+moDelay();
  m.comments.push(c);save();renderMoments();
};
moZoom=function(src){moView.innerHTML='';var im=document.createElement('img');im.src=src;im.alt='';moView.appendChild(im);moView.hidden=false};
moPickMany=function(max,cb){
  var f=document.createElement('input');f.type='file';f.accept='image/*';f.multiple=true;f.hidden=true;
  document.body.appendChild(f);
  f.addEventListener('change',function(){
    var fs=Array.prototype.slice.call(f.files||[],0,max);f.remove();
    if(!fs.length)return;
    Promise.all(fs.map(function(x){return readFileURL(x).then(function(s){return shrinkSafe(s,1000,false,0.76)}).catch(function(){return ''})}))
      .then(function(arr){cb(arr.filter(Boolean))});
  });
  f.click();
};
newMoment2=function(priv){
  var w=document.createElement('div'),pics=[];
  w.innerHTML='<div class="field"><textarea id="m2T" placeholder="这一刻的想法…" style="min-height:110px;font-family:var(--serif);font-size:16px;line-height:1.8"></textarea></div>'
    +'<div class="m2-pics" id="m2P"></div>'
    +'<label class="m2-priv"><input type="checkbox" id="m2Pv"'+(priv?' checked':'')+'>私密发表<span>只有你看得到，'+esc(taName())+'也不会来</span></label>'
    +'<button class="primary" id="m2Go" style="width:100%">发 表</button>';
  var box=w.querySelector('#m2P');
  function draw(){
    box.innerHTML=pics.map(function(s,i){return '<div class="m2-pic"><img src="'+esc(s)+'" alt=""><button type="button" data-rm="'+i+'" aria-label="去掉这张">×</button></div>'}).join('')
      +(pics.length<9?'<button type="button" class="m2-pic add" data-add="1" aria-label="加图片">＋</button>':'');
  }
  box.addEventListener('click',function(e){
    var r=e.target.closest('[data-rm]');if(r){pics.splice(+r.dataset.rm,1);draw();return}
    if(e.target.closest('[data-add]'))moPickMany(9-pics.length,function(arr){pics=pics.concat(arr).slice(0,9);draw()});
  });
  w.querySelector('#m2Go').addEventListener('click',function(){
    var t=w.querySelector('#m2T').value.trim();
    if(!t&&!pics.length)return;
    var m={id:uid(),from:'me',text:t,imgs:pics.slice(),priv:w.querySelector('#m2Pv').checked,at:Date.now(),likes:[],comments:[]};
    if(!m.priv)moPlan(m);
    S.moments.push(m);
    if(!save()){S.moments.pop();save();alert('图太多存不下了。少放几张，或者删掉几条旧动态再试。');return}
    closeSheet();renderMoments();updateNav();
  });
  draw();openSheet(priv?'私密发表':'发表',w);
};
moSignSet=function(){
  var r=prompt('写一句签名',S.prefs.moSign||'');
  if(r===null)return;
  S.prefs.moSign=r.trim().slice(0,30);save();renderMoments();
};
moCoverSet=function(){
  var w=document.createElement('div');
  w.innerHTML='<div class="menu-list set-grp"><button type="button" class="mi" data-c="pick"><b>换封面</b><span>从相册选 ›</span></button>'
    +(S.prefs.moCover?'<button type="button" class="mi" data-c="rm"><b>去掉封面</b><span></span></button>':'')
    +'<button type="button" class="mi" data-c="sign"><b>改签名</b><span>'+esc(S.prefs.moSign||'还没写')+' ›</span></button>'
    +'<button type="button" class="mi" data-c="av"><b>换我的头像</b><span>›</span></button></div>';
  w.addEventListener('click',function(e){
    var b=e.target.closest('[data-c]');if(!b)return;var c=b.dataset.c;
    if(c==='pick')pickImage(function(src){shrinkSafe(src,1200,false,0.8).then(function(u){
      if(!u){alert('这张读不出来，换一张试试。');return}
      var old=S.prefs.moCover;S.prefs.moCover=u;
      if(!save()){S.prefs.moCover=old;save();alert('这张太大存不下，换一张试试。');return}
      closeSheet();renderMoments();
    })});
    if(c==='rm'){S.prefs.moCover='';save();closeSheet();renderMoments()}
    if(c==='sign'){closeSheet();setTimeout(moSignSet,80)}
    if(c==='av'){closeSheet();pickAvatar('me')}
  });
  openSheet('朋友圈封面',w);
};
openMoSet=function(){
  var w=document.createElement('div');
  w.innerHTML='<div class="sec">你发朋友圈以后</div>'+rr('点赞概率','moLikeRate',0,100)+rr('评论概率','moCmtRate',0,100)+rr('最多评论几条','moCmtMax',1,5)+rr('最快多久来','moMin',0,120)+rr('最慢多久来','moMax',0,720,5)
    +'<div class="sec">你评论以后</div>'+rr('回复你的概率','moReplyRate',0,100)
    +'<p class="hint">动态发出去那一刻就掷好了：赞不赞、评几条、各在什么时候来。时间记在动态上，页面关着也照算，下次打开就到。评论从字卡库里抽，屏蔽的分组和句子不会抽到。私密发表的他看不到，也不会来。</p>'
    +'<button class="ghost" id="moReset" style="width:100%;margin-top:14px">恢复默认</button>';
  var paint=bindRanges(w);
  w.querySelector('#moReset').addEventListener('click',function(){for(var k in MO_DEF)S.prefs[k]=MO_DEF[k];save();paint()});
  openSheet('朋友圈互动',w);
};
// v18：朋友圈改成空间那种样子。封面能换，自己头像在右下角，按日期排，能发图、能私密发表
// 你发出去以后，他按概率来点赞、用字卡评论；你评论了，他按概率回你。概率和时间都在 设置 → 聊天 → 朋友圈互动 里调，真的在用

var MO_DEF={moLikeRate:85,moCmtRate:60,moCmtMax:2,moMin:1,moMax:20,moReplyRate:70};

var _ensureV18=ensurePrefs;
ensurePrefs=function(){_ensureV18();moEnsure()};
moEnsure();save();

// 时间：在最快和最慢之间随机，至少隔几秒，不会刚发出去就到

// 发出去那一刻就掷好：赞不赞、评几条、各在什么时候来。记在动态上，页面关着也照算




setInterval(moTick,15000);
document.addEventListener('visibilitychange',function(){if(!document.hidden)moTick()});






var MO_CAM='<svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" fill-rule="evenodd"><path d="M9 4L7.2 6H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-3.2L15 4H9zm3 4.5a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9zm0 2a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5z"/></svg>';
var MO_LOCK='<svg viewBox="0 0 24 24" width="20" height="22" fill="currentColor" fill-rule="evenodd"><path d="M12 2a5 5 0 0 0-5 5v3H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2h-1V7a5 5 0 0 0-5-5zM9 10V7a3 3 0 0 1 6 0v3H9z"/></svg>';





renderMoments=function(){
  moBuild();moEnsure();
  var cv=$('m2Cover');if(!cv)return;
  var src=S.prefs.moCover;
  cv.style.backgroundImage=src?'url("'+src+'")':'';
  cv.classList.toggle('has-img',!!src);
  setAv($('m2Av'),S.me);
  $('m2Nm').textContent=S.me.name||'我';
  var sg=$('m2Sign');sg.textContent=S.prefs.moSign||'点这里写一句签名';sg.classList.toggle('ph',!S.prefs.moSign);
  var nw=$('m2New');
  if(moOn()&&S.moUnread>0){nw.hidden=false;nw.textContent=taName()+' 来过 · '+S.moUnread+' 条新互动';S.moUnread=0;save();updateNav()}
  else nw.hidden=true;
  var ms=S.moments.slice().sort(function(a,b){return b.at-a.at});
  var groups=[],cur=null,today=moDay0(Date.now());
  ms.forEach(function(m){
    var k=moDay0(m.at);
    if(!cur||cur.k!==k){cur={k:k,t:m.at,items:[]};groups.push(cur)}
    cur.items.push(m);
  });
  if(!groups.length||groups[0].k!==today)groups.unshift({k:today,t:Date.now(),items:[]});
  var pubs='<div class="m2-pubs"><button type="button" class="m2-pub" data-pub="0">'+MO_CAM+'<span>发表</span></button><button type="button" class="m2-pub" data-pub="1">'+MO_LOCK+'<span>私密发表</span></button></div>';
  $('moList').innerHTML=groups.map(function(g){
    return '<div class="m2-day"><div class="m2-dl">'+moLabel(g.t)+'</div><div class="m2-posts">'+(g.k===today?pubs:'')+g.items.map(moPostHTML).join('')+'</div></div>';
  }).join('');
  $('moCount').textContent=S.moments.length?S.moments.length+' 条':'';
};



// 你评论了：私密的不算，其余按「回复你的概率」掷一次


// 看大图
var moView=document.createElement('div');moView.id='m2View';moView.hidden=true;
document.body.appendChild(moView);
moView.addEventListener('click',function(){moView.hidden=true;moView.innerHTML=''});


// 一次选好几张图，压小再存


newMoment=function(){newMoment2(false)};




// 设置 → 聊天 → 朋友圈互动
PAIRS.moMin=['moMax',1];PAIRS.moMax=['moMin',-1];
var _fmtV18=fmtPref;
fmtPref=function(k,v){
  if(k==='moCmtMax')return v+' 条';
  if((k==='moMin'||k==='moMax')&&v===0)return '马上';
  return _fmtV18(k,v);
};

SET_GROUPS.forEach(function(g){
  if(g[0]==='聊天'&&!g[1].some(function(i){return i[0]==='openMoSet'}))
    g[1].push(['openMoSet','朋友圈互动',function(){return '赞 '+S.prefs.moLikeRate+'% · 评 '+S.prefs.moCmtRate+'%'}]);
});

var _navV18=updateNav;
updateNav=function(){_navV18();var e=$('sbcMo');if(e&&S.moUnread>0)e.textContent=S.moUnread+' 新'};

moBuild();moTick();renderMoments();updateNav();

}catch(e){console.error("[zika] js/moments2.js",e)}

/* ===== js/v19.js ===== */
try{
seedTag=function(tag,arr){
  if(S.lib.some(function(x){return x.tag===tag})||S.libEmpty.indexOf(tag)>=0)return;
  arr.forEach(function(t){S.lib.push({id:uid(),tag:tag,text:t})});
};
tagPool=function(t){
  if((S.libOff||[]).indexOf(t)>=0)return [];
  return S.lib.filter(function(x){return x.tag===t&&!x.off}).map(function(x){return x.text});
};
taPoke=function(){
  var pool=tagPool('拍一拍');if(!pool.length)pool=POKES;
  showTyping(false);
  addReplyCard({id:uid(),from:'ta',type:'poke',text:taName()+' '+pickOne(pool),at:Date.now()});
};
stPaint=function(){var el=$('taSt');if(!el)return;var s=S.prefs.taStatus||'';el.textContent=s;el.title=s;el.hidden=!s};
stRoll=function(){var p=S.prefs,a=Math.max(0.1,+p.statMin||1),b=Math.max(a,+p.statMax||a);p.statNext=rnd(a,b)};
stChange=function(){
  var p=S.prefs,pool=tagPool('状态'),cur=p.taStatus,c=pool.filter(function(x){return x!==cur});
  p.taStatus=pool.length?pickOne(c.length?c:pool):'';
  p.statAt=Date.now();stRoll();save();stPaint();
};
stCheck=function(){
  var p=S.prefs,pool=tagPool('状态');
  if(!pool.length){if(p.taStatus){p.taStatus='';save()}stPaint();return}
  if(!p.taStatus||pool.indexOf(p.taStatus)<0||!p.statAt||Date.now()-p.statAt>=(+p.statNext||1)*36e5)stChange();
  else stPaint();
};
addTag=function(tag,arr,rep){
  arr=(Array.isArray(arr)?arr:[]).map(itemText).filter(Boolean);
  if(!arr.length)return 0;
  if(rep)S.lib=S.lib.filter(function(x){return x.tag!==tag});
  var have={},n=0;
  S.lib.forEach(function(x){if(x.tag===tag)have[x.text]=1});
  arr.forEach(function(t){if(have[t])return;have[t]=1;S.lib.push({id:uid(),tag:tag,text:t});n++});
  lbUnempty(tag);return n;
};
kindName=function(){return C.kind==='voice'?'语音通话':'视频通话'};
callPick=function(){
  if(C.state!=='idle')return;
  var w=document.createElement('div');
  w.innerHTML='<div class="ck-pick"><button type="button" data-k="video"><i>'+IC_VIDEO+'</i>视频通话</button><button type="button" data-k="voice"><i>'+IC_VOICE+'</i>语音通话</button></div><p class="hint" style="text-align:center">只是界面，不会打开摄像头和麦克风。</p>';
  w.addEventListener('click',function(e){var b=e.target.closest('[data-k]');if(!b)return;C.kind=b.dataset.k;closeSheet();setTimeout(dial,120)});
  openSheet('给 '+taName()+' 打过去',w);
};
setCallWall=function(cb){
  pickImage(function(src){shrinkSafe(src,1080,false,0.8).then(function(u){
    if(!u){alert('这张读不出来，换一张试试。');return}
    var old=S.prefs.callWall;S.prefs.callWall=u;
    if(!save()){S.prefs.callWall=old;save();alert('这张太大存不下，换一张试试。');return}
    if(cb)cb();
  })});
};
openCallWall=function(){
  var w=document.createElement('div');
  w.innerHTML='<div class="wallprev" id="cwPv" style="height:240px"></div><div class="two"><button class="ghost" id="cwPick" style="flex:1">选一张图</button><button class="ghost" id="cwDel" style="flex:1">去掉</button></div><p class="hint">只在视频通话里用，铺满整个画面，就像他那边的镜头。没设的话用他的头像糊一层当背景。通话中右上角也能换。</p>';
  var pv=w.querySelector('#cwPv');
  function paint(){var s=S.prefs.callWall;pv.style.backgroundImage=s?'url("'+s+'")':'';pv.textContent=s?'':'还没有视频壁纸'}
  w.querySelector('#cwPick').addEventListener('click',function(){setCallWall(paint)});
  w.querySelector('#cwDel').addEventListener('click',function(){S.prefs.callWall='';save();paint()});
  paint();openSheet('视频通话壁纸',w);
};
fdb=function(){
  return new Promise(function(ok,no){
    if(!window.indexedDB){no(new Error('idb'));return}
    var r=indexedDB.open('zika_fonts',1);
    r.onupgradeneeded=function(){r.result.createObjectStore('f')};
    r.onsuccess=function(){ok(r.result)};r.onerror=function(){no(r.error)};
  });
};
fPut=function(buf){return fdb().then(function(db){return new Promise(function(ok,no){var t=db.transaction('f','readwrite');t.objectStore('f').put(buf,'custom');t.oncomplete=function(){ok()};t.onerror=function(){no(t.error)};t.onabort=function(){no(t.error||new Error('abort'))}})})};
fGet=function(){return fdb().then(function(db){return new Promise(function(ok,no){var q=db.transaction('f','readonly').objectStore('f').get('custom');q.onsuccess=function(){ok(q.result||null)};q.onerror=function(){no(q.error)}})})};
useFontBuf=function(buf){
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
};
loadFileFont=function(){
  if(FILE_FONT)return Promise.resolve(FILE_FONT);
  return fGet().then(function(b){if(!b)throw new Error('none');return useFontBuf(b)});
};
ensureFileFontItem=function(){
  if(!S.prefs.fontFile)return;
  var it=FONTS.filter(function(o){return o.id==='file'})[0];
  if(!it){it={id:'file'};FONTS.splice(FONTS.length-1,0,it)}
  it.n='导入的字体';it.d=S.prefs.fontFile;it.f='"ZikaFile","Songti SC",serif';
};
fontFromFile=function(x){
  return x.arrayBuffer().then(function(buf){
    var u=new Uint8Array(buf);
    if(!(u.length>3&&u[0]===0x50&&u[1]===0x4b))return{buf:buf,name:x.name||'字体'};
    return needZip().then(function(Z){return Z.loadAsync(buf)}).then(function(z){
      var ks=Object.keys(z.files).filter(function(k){return !z.files[k].dir&&!/__MACOSX|\/\._/.test(k)&&/\.(ttf|otf|woff2?|ttc)$/i.test(k)});
      if(!ks.length)throw new Error('nofont');
      return z.file(ks[0]).async('arraybuffer').then(function(b){return{buf:b,name:ks[0].split('/').pop()}});
    });
  });
};
importFont=function(btn,done){
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
};
// v19：回复、回信、拍一拍、通话的概率照 milk；他会拍一拍你；顶栏名字旁边是他的状态；通话分视频和语音，视频能换壁纸；字体能导入 ttf

// milk 的默认值：回复 3~7 秒、已读不回默认关（开了是 20%）、拍一拍 3%、引用 30%、回信 10~24 小时、状态 1~7 小时换一次
// 通话：每 15~60 分钟掷一次，25% 打来；你打过去 35% 不接；他打来 30% 又自己挂掉
var MILK={replyMin:3,replyMax:7,readNo:false,readNoRate:20,pokeRate:3,quoteRate:30,mailRate:100,mailMin:600,mailMax:1440,ringRate:25,rejectRate:35,cancelRate:30,statMin:1,statMax:7};
var SPECIAL=['信','拍一拍','状态'];

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

POKES=['拍了拍我的脑袋','戳了戳我的脸','捏了捏我的手','揉了揉我的头发','拽了拽我的袖子'];


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

(function(){
  var ob=$('btnCall');if(!ob)return;
  var nb=ob.cloneNode(false);
  nb.innerHTML='<svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor"><path d="'+PH+'"/></svg>';
  nb.setAttribute('aria-label','通话');
  ob.parentNode.replaceChild(nb,ob);
  nb.addEventListener('click',callPick);
})();

(function(){
  var top=callBox.querySelector('.cl-top');if(!top||$('clWall'))return;
  var b=document.createElement('button');b.id='clWall';b.type='button';b.setAttribute('aria-label','换视频壁纸');b.innerHTML=IC_PIC;
  b.addEventListener('click',function(){setCallWall(function(){paintWho()})});
  top.replaceChild(b,top.lastElementChild);
})();


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


var _ofV19=openFontSet;
openFontSet=function(){
  _ofV19();
  var box=document.createElement('div');
  box.innerHTML='<div class="sec">导入字体文件</div><button class="ghost" id="ffImp" style="width:100%">'+(S.prefs.fontFile?'换一个字体文件':'选一个字体文件')+'</button><p class="hint">支持 .ttf / .otf / .woff / .woff2，也可以是装着字体的 .zip。字体存在这台手机上，以后不用联网。中文字体一般好几 MB，导入要等几秒。备份文件里不带字体，换手机要重新导一次。</p>';
  box.querySelector('#ffImp').addEventListener('click',function(){importFont(this,function(){closeSheet();setTimeout(function(){openFontSet();addBack()},80)})});
  sheetBody.appendChild(box);
};

applyReplyPrefs();applyFont();stCheck();renderHome();updateNav();

}catch(e){console.error("[zika] js/v19.js",e)}

/* ===== js/lib4.js ===== */
try{
ic=function(k){return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+L4P[k]+'</svg>'};
isAtmo=function(t){return ATMO_TAGS.indexOf(t)>=0};
atmoName=function(t){for(var i=0;i<ATMO.length;i++)if(ATMO[i][0]===t)return ATMO[i][1];return t};
mainTags=function(){return libTags().filter(function(g){return !isAtmo(g.tag)})};
l4Off=function(x){return !!x.off||S.libOff.indexOf(x.tag)>=0};
l4Scope=function(){return S.lib.filter(function(x){return L4.tab==='main'?!isAtmo(x.tag):x.tag===L4.sub})};
l4Items=function(){
  var q=L4.q.toLowerCase();
  return l4Scope().filter(function(x){
    if(L4.tab==='main'&&L4.group!=='all'&&x.tag!==L4.group)return false;
    if(L4.show==='on'&&l4Off(x))return false;
    if(L4.show==='off'&&!l4Off(x))return false;
    if(q&&x.text.toLowerCase().indexOf(q)<0)return false;
    return true;
  });
};
l4Empty=function(t,s){return '<div class="empty"><b>'+t+'</b>'+s+'</div>'};
l4SelList=function(){return S.lib.filter(function(x){return L4.sel[x.id]})};
l4GroupSelect=function(cur){
  var tags=mainTags().map(function(g){return g.tag});
  if(cur&&tags.indexOf(cur)<0)tags.push(cur);
  if(!tags.length)tags.push('未分组');
  var s=document.createElement('select');s.className='l4-sel';
  function opt(v,t){var o=document.createElement('option');o.value=v;o.textContent=t;return o}
  tags.forEach(function(t){s.appendChild(opt(t,t))});
  s.appendChild(opt('__new','＋ 新建分组…'));
  s.value=cur&&tags.indexOf(cur)>=0?cur:tags[0];s.dataset.prev=s.value;
  s.addEventListener('change',function(){
    if(s.value!=='__new'){s.dataset.prev=s.value;return}
    var r=prompt('新分组叫什么？');
    if(r===null||!r.trim()){s.value=s.dataset.prev;return}
    var n=cleanTag(r);
    if(isAtmo(n)){alert('「'+n+'」是氛围感专用的名字，换一个吧。');s.value=s.dataset.prev;return}
    var has=Array.prototype.some.call(s.options,function(o){return o.value===n});
    if(!has)s.insertBefore(opt(n,n),s.lastElementChild);
    s.value=n;s.dataset.prev=n;
  });
  return s;
};
l4AddSheet=function(){
  var atmo=L4.tab==='atmo';
  var cur=atmo?L4.sub:(L4.group!=='all'?L4.group:((mainTags()[0]||{}).tag||'未分组'));
  var w=document.createElement('div');
  w.innerHTML='<p class="hint" style="margin:0 0 12px">每行一条，自动去重</p>'
    +'<label class="l4-swrow"><span>换行作为新条目</span><input type="checkbox" id="l4Split" checked><i class="l4-tg"></i></label>'
    +'<textarea id="l4Txt" class="l4-ta" placeholder="在此粘贴内容，每行一条…"></textarea><div class="l4-cnt" id="l4Cnt">0 条</div>'
    +(atmo?'<p class="hint" style="margin:0 0 14px">加到「'+esc(atmoName(cur))+'」</p>':'<div class="l4-grow">'+ic('folder')+'<span>添加到分组</span></div>')
    +'<div class="two"><button type="button" class="ghost" id="l4No" style="flex:1">取消</button><button type="button" class="primary" id="l4Ok" style="flex:1.6">添加</button></div>';
  var sel=null;
  if(!atmo){sel=l4GroupSelect(cur);w.querySelector('.l4-grow').appendChild(sel)}
  var ta=w.querySelector('#l4Txt'),sp=w.querySelector('#l4Split'),cnt=w.querySelector('#l4Cnt');
  function lines(){
    var v=ta.value;
    var arr=sp.checked?v.split('\n').map(function(s){return s.trim()}):[v.trim()];
    return uniqArr(arr.filter(Boolean));
  }
  function paint(){cnt.textContent=lines().length+' 条'}
  ta.addEventListener('input',paint);sp.addEventListener('change',paint);
  w.querySelector('#l4No').addEventListener('click',closeSheet);
  w.querySelector('#l4Ok').addEventListener('click',function(){
    var ls=lines();if(!ls.length)return;
    var tag=atmo?cur:sel.value;
    if(!tag||tag==='__new')tag='未分组';
    var have={},add=0;
    S.lib.forEach(function(x){if(x.tag===tag)have[x.text]=1});
    ls.forEach(function(t){if(have[t])return;have[t]=1;S.lib.push({id:uid(),tag:tag,text:t});add++});
    lbUnempty(tag);
    if(!atmo){L4.open[tag]=true}
    refreshLib();closeSheet();
    if(add<ls.length)alert('加进去 '+add+' 条，另外 '+(ls.length-add)+' 条这组里本来就有。');
  });
  openSheet(atmo?'批量添加'+atmoName(cur):'批量添加字卡',w);
  setTimeout(function(){ta.focus()},60);
};
l4EditSheet=function(x){
  var main=!isAtmo(x.tag);
  var w=document.createElement('div');
  w.innerHTML='<textarea id="l4Et" class="l4-ta" style="min-height:120px"></textarea>'
    +(main?'<div class="l4-grow" style="margin-top:12px">'+ic('folder')+'<span>分组</span></div>':'')
    +'<button type="button" class="primary" id="l4EOk" style="width:100%;margin-top:12px">收 好</button>';
  w.querySelector('#l4Et').value=x.text;
  var sel=null;if(main){sel=l4GroupSelect(x.tag);w.querySelector('.l4-grow').appendChild(sel)}
  w.querySelector('#l4EOk').addEventListener('click',function(){
    var t=w.querySelector('#l4Et').value.trim();if(!t)return;
    var old=x.tag;x.text=t;
    if(sel&&sel.value&&sel.value!=='__new')x.tag=sel.value;
    lbUnempty(x.tag);lbKeep([old]);refreshLib();closeSheet();
  });
  openSheet('编辑',w);
};
l4MoveSheet=function(list){
  var w=document.createElement('div');
  w.innerHTML='<p class="hint" style="margin:0 0 12px">把 '+list.length+' 条挪到：</p><div class="l4-grow">'+ic('folder')+'<span>分组</span></div><button type="button" class="primary" id="l4MOk" style="width:100%">挪 过 去</button>';
  var sel=l4GroupSelect(list[0].tag);w.querySelector('.l4-grow').appendChild(sel);
  w.querySelector('#l4MOk').addEventListener('click',function(){
    var tag=sel.value;if(!tag||tag==='__new')return;
    var old=uniqArr(list.map(function(x){return x.tag}));
    list.forEach(function(x){x.tag=tag});
    lbUnempty(tag);lbKeep(old);L4.sel={};L4.open[tag]=true;refreshLib();closeSheet();
  });
  openSheet('移到分组',w);
};
l4GroupMenu=function(tag){
  var g=libTags().filter(function(x){return x.tag===tag})[0];if(!g)return;
  var off=S.libOff.indexOf(tag)>=0,c=lbColor(tag);
  var w=document.createElement('div');
  w.innerHTML='<div class="menu-list set-grp">'
    +'<button type="button" class="mi" data-m="rn"><b>改名</b><span>'+esc(tag)+' ›</span></button>'
    +'<button type="button" class="mi" data-m="tg"><b>'+(off?'取消屏蔽':'屏蔽这组')+'</b><span>'+(off?'':esc(taName())+'不从这组抽')+'</span></button>'
    +'<button type="button" class="mi" data-m="col"><b>换颜色</b><span><i class="l4-dot" style="background:'+esc(c)+'"></i></span></button>'
    +'<div class="lb-colors" hidden></div>'
    +'<button type="button" class="mi" data-m="rm"><b class="lb-danger">删掉分组</b><span>'+(tag==='未分组'?'连句子一起删':'句子挪到未分组')+'</span></button></div>';
  var cols=w.querySelector('.lb-colors');
  LB_COLORS.forEach(function(col){
    var b=document.createElement('button');b.type='button';b.style.background=col;b.dataset.col=col;
    if(col.toLowerCase()===String(c).toLowerCase())b.className='on';
    cols.appendChild(b);
  });
  w.addEventListener('click',function(e){
    var cb=e.target.closest('[data-col]');
    if(cb){S.libColors[tag]=cb.dataset.col;refreshLib();closeSheet();return}
    var b=e.target.closest('[data-m]');if(!b)return;var m=b.dataset.m;
    if(m==='col'){cols.hidden=!cols.hidden;return}
    if(m==='tg'){if(off)S.libOff=S.libOff.filter(function(t){return t!==tag});else S.libOff.push(tag);refreshLib();closeSheet();return}
    if(m==='rn'){
      var r=prompt('改成什么？',tag);if(r===null||!r.trim())return;
      var nn=cleanTag(r);if(nn===tag)return;
      if(isAtmo(nn)){alert('「'+nn+'」是氛围感专用的名字，换一个吧。');return}
      lbRename(tag,nn);if(L4.group===tag)L4.group=nn;
      if(L4.open[tag]){L4.open[nn]=true;delete L4.open[tag]}
      refreshLib();closeSheet();return;
    }
    if(m==='rm'){
      if(tag==='未分组'){
        if(g.n&&!confirm('删掉「未分组」里的 '+g.n+' 句？'))return;
        S.lib=S.lib.filter(function(x){return x.tag!=='未分组'});
      }else{
        if(!confirm('删掉分组「'+tag+'」？'+(g.n?'里面的 '+g.n+' 句挪到「未分组」。':'')))return;
        S.lib.forEach(function(x){if(x.tag===tag)x.tag='未分组'});
      }
      lbDropTag(tag);if(L4.group===tag)L4.group='all';
      refreshLib();closeSheet();
    }
  });
  openSheet('分组 · '+tag,w);
};
l4GroupsSheet=function(){
  var w=document.createElement('div');
  function draw(){
    var tags=mainTags();
    w.innerHTML=(tags.length?'<div class="menu-list set-grp">'+tags.map(function(g){
      var off=S.libOff.indexOf(g.tag)>=0;
      return '<button type="button" class="mi" data-g="'+esc(g.tag)+'"><b><i class="l4-dot" style="background:'+esc(lbColor(g.tag))+'"></i>'+esc(g.tag)+'</b><span>'+(off?'已屏蔽 · ':'')+g.n+' 条 ›</span></button>';
    }).join('')+'</div>':'<p class="hint">还没有分组。</p>')
      +'<button type="button" class="ghost" data-new="1" style="width:100%;margin-top:12px">＋ 新建分组</button>'
      +'<p class="hint">点一组可以改名、换颜色、屏蔽或删掉。屏蔽的分组还在，只是'+esc(taName())+'回字卡时不从里面抽。</p>';
  }
  w.addEventListener('click',function(e){
    var g=e.target.closest('[data-g]');if(g){l4GroupMenu(g.dataset.g);return}
    if(e.target.closest('[data-new]')){
      var r=prompt('新分组叫什么？');if(r===null||!r.trim())return;
      var n=cleanTag(r);
      if(isAtmo(n)){alert('「'+n+'」是氛围感专用的名字，换一个吧。');return}
      if(!libTags().some(function(x){return x.tag===n}))S.libEmpty.push(n);
      refreshLib();draw();
    }
  });
  draw();openSheet('管理分组',w);
};
l4Dedup=function(){
  var scope=l4Scope(),seen={},drop={},n=0;
  scope.forEach(function(x){if(seen[x.text]){drop[x.id]=1;n++}else seen[x.text]=1});
  closeSheet();
  if(!n){alert('没有重复的。');return}
  if(!confirm('找到 '+n+' 句重复的，同一句只留第一条？'))return;
  var tags=uniqArr(scope.map(function(x){return x.tag}));
  S.lib=S.lib.filter(function(x){return !drop[x.id]});lbKeep(tags);refreshLib();
  alert('删掉了 '+n+' 句重复的。');
};
l4FilterSheet=function(){
  var rows=[['all','显示全部'],['on','只看在用的'],['off','只看屏蔽的']];
  var w=document.createElement('div');
  w.innerHTML='<div class="menu-list set-grp">'+rows.map(function(r){return '<button type="button" class="mi" data-s="'+r[0]+'"><b>'+r[1]+'</b><span>'+(L4.show===r[0]?'✓':'')+'</span></button>'}).join('')+'</div>'
    +'<div class="menu-list set-grp" style="margin-top:12px"><button type="button" class="mi" data-s="dedup"><b>去重</b><span>同一句只留一条 ›</span></button></div>';
  w.addEventListener('click',function(e){
    var b=e.target.closest('[data-s]');if(!b)return;
    if(b.dataset.s==='dedup'){l4Dedup();return}
    L4.show=b.dataset.s;closeSheet();drawLib();
  });
  openSheet('筛选',w);
};
l4CardEl=function(x,badge){
  var d=document.createElement('div'),off=l4Off(x);
  d.className='l4-card'+(off?' off':'')+(L4.sel[x.id]?' sel':'');
  var h=(L4.batch?'<span class="l4-chk">'+(L4.sel[x.id]?'✓':'')+'</span>':'')+'<div class="t"><span class="tx"></span>'+(badge?'<span class="l4-bdg"><i></i><em></em></span>':'')+'</div>';
  if(!L4.batch){
    h+='<div class="l4-ops"><button type="button" data-op="off" aria-label="'+(x.off?'取消屏蔽':'屏蔽')+'">'+ic(x.off?'eye':'eyeoff')+'</button>'
      +(isAtmo(x.tag)?'':'<button type="button" data-op="tag" aria-label="换分组">'+ic('tag')+'</button>')
      +'<button type="button" data-op="ed" aria-label="编辑">'+ic('pen')+'</button><button type="button" data-op="rm" aria-label="删除">'+ic('trash')+'</button></div>';
  }
  d.innerHTML=h;
  d.querySelector('.tx').textContent=x.text;
  if(badge){
    var c=lbColor(x.tag),bd=d.querySelector('.l4-bdg');
    bd.style.color=c;bd.style.borderColor=c+'40';bd.style.background=c+'18';
    bd.querySelector('i').style.background=c;bd.querySelector('em').textContent=x.tag;
  }
  d.addEventListener('click',function(e){
    var b=e.target.closest('[data-op]');
    if(b){
      e.stopPropagation();var op=b.dataset.op;
      if(op==='off'){x.off=!x.off;refreshLib();return}
      if(op==='tag'){l4MoveSheet([x]);return}
      if(op==='ed'){l4EditSheet(x);return}
      if(op==='rm'){if(!confirm('删掉这句？'))return;S.lib=S.lib.filter(function(y){return y!==x});lbKeep([x.tag]);refreshLib()}
      return;
    }
    if(L4.batch){if(L4.sel[x.id])delete L4.sel[x.id];else L4.sel[x.id]=1;drawLib();return}
    if(isAtmo(x.tag))l4EditSheet(x);else useLine(x.text);
  });
  return d;
};
l4GroupEl=function(g,its){
  var c=lbColor(g.tag),off=S.libOff.indexOf(g.tag)>=0,open=!!L4.open[g.tag];
  var sec=document.createElement('div');sec.className='l4-grp'+(off?' off':'')+(open?' open':'');
  var hd=document.createElement('div');hd.className='l4-gh';
  var allSel=its.length&&its.every(function(x){return L4.sel[x.id]});
  hd.innerHTML='<i></i><b></b><span class="c">'+its.length+' 条</span>'+(off?'<span class="l4-offtag">已屏蔽</span>':'')+'<span class="sp"></span>'
    +(L4.batch&&its.length?'<button type="button" class="l4-mini" data-ga="sel">'+(allSel?'取消本组':'全选本组')+'</button>':'')
    +'<button type="button" class="l4-ib sm" data-ga="ed" aria-label="编辑分组">'+ic('pen')+'</button><span class="arr">'+ic('down')+'</span>';
  hd.querySelector('i').style.background=c;
  var b=hd.querySelector('b');b.style.color=c;b.textContent=g.tag;
  hd.addEventListener('click',function(e){
    var a=e.target.closest('[data-ga]');
    if(a&&a.dataset.ga==='ed'){l4GroupMenu(g.tag);return}
    if(a&&a.dataset.ga==='sel'){its.forEach(function(x){if(allSel)delete L4.sel[x.id];else L4.sel[x.id]=1});drawLib();return}
    L4.open[g.tag]=!L4.open[g.tag];drawLib();
  });
  sec.appendChild(hd);
  if(open){
    var cs=document.createElement('div');cs.className='l4-cards';
    if(!its.length)cs.innerHTML='<p class="hint" style="margin:0 0 8px 4px">这组还没有字卡。</p>';
    its.forEach(function(x){cs.appendChild(l4CardEl(x,false))});
    sec.appendChild(cs);
  }
  return sec;
};
l4BarClick=function(a){
  if(a==='new'){l4AddSheet();return}
  if(a==='done'){L4.batch=false;L4.sel={};drawLib();return}
  if(a==='all'){
    var vis=l4Items(),all=vis.length&&vis.every(function(x){return L4.sel[x.id]});
    L4.sel={};if(!all)vis.forEach(function(x){L4.sel[x.id]=1});
    drawLib();return;
  }
  var sel=l4SelList();
  if(!sel.length){alert('先点几句选上。');return}
  if(a==='off'||a==='on'){sel.forEach(function(x){x.off=a==='off'});L4.sel={};refreshLib();return}
  if(a==='mv'){l4MoveSheet(sel);return}
  if(a==='rm'){
    if(!confirm('删掉选中的 '+sel.length+' 条？'))return;
    var tags=uniqArr(sel.map(function(x){return x.tag}));
    S.lib=S.lib.filter(function(x){return !L4.sel[x.id]});L4.sel={};lbKeep(tags);refreshLib();
  }
};
// v20：字卡库照 milk 的收纳。分「主字卡」和「氛围感」（拍一拍、对方状态、每日一句）
// 顶上一排：搜索、管理分组、筛选 | 批量选择、导入、导出；底下一个「新增」，一次能贴很多句
// 信箱分「收到的信」和「寄出的信」，自己写的信不带回复按钮

var ATMO=[['拍一拍','拍一拍'],['状态','对方状态'],['每日一句','每日一句']];
var ATMO_TAGS=ATMO.map(function(a){return a[0]});
if(SPECIAL.indexOf('每日一句')<0)SPECIAL.push('每日一句');
var L4={tab:'main',sub:'拍一拍',q:'',search:false,show:'all',group:'all',batch:false,sel:{},open:{}};
var L4P={
  search:'<circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/>',
  folder:'<path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>',
  filter:'<path d="M4 7h16M7 12h10M10 17h4"/>',
  grid:'<rect x="4" y="4" width="6.5" height="6.5" rx="1.5"/><rect x="13.5" y="4" width="6.5" height="6.5" rx="1.5"/><rect x="4" y="13.5" width="6.5" height="6.5" rx="1.5"/><rect x="13.5" y="13.5" width="6.5" height="6.5" rx="1.5"/>',
  imp:'<path d="M12 4v11M7 10l5 5 5-5M5 20h14"/>',
  exp:'<path d="M12 20V9M7 14l5-5 5 5M5 4h14"/>',
  eyeoff:'<path d="M3 3l18 18M10.6 6.2A9.6 9.6 0 0 1 12 6c5 0 8.5 4.5 9 6-.3.9-1.2 2.4-2.6 3.7M6.4 7.6C4.6 8.9 3.4 10.7 3 12c.5 1.5 4 6 9 6 1.6 0 3-.4 4.2-1.1M9.9 9.9a3 3 0 0 0 4.2 4.2"/>',
  eye:'<path d="M3 12c.5-1.5 4-6 9-6s8.5 4.5 9 6c-.5 1.5-4 6-9 6s-8.5-4.5-9-6z"/><circle cx="12" cy="12" r="3"/>',
  tag:'<path d="M3 12V4a1 1 0 0 1 1-1h8l9 9-9 9z"/><circle cx="7.5" cy="7.5" r="1.3"/>',
  pen:'<path d="M4 20h4L19 9l-4-4L4 16z"/><path d="M13.5 6.5l4 4"/>',
  trash:'<path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"/>',
  down:'<path d="M6 9l6 6 6-6"/>',
  plus:'<path d="M12 5v14M5 12h14"/>'
};










// 选分组的下拉框，最后一项是新建


// 批量添加：每行一条，自动去重





// 一个分组的操作：改名、屏蔽、换颜色、删








var L4_HINT={'拍一拍':'他拍你的时候从这里抽，显示成「'+'顾时夜'+' 拍了拍我…」。开头不用写名字。','状态':'传讯页名字旁边的小标签从这里抽。','每日一句':'主页「今日一句」每天从这里挑一句。这里空着的话就从主字卡里挑。'};

drawLib=function(){
  var box=$('libPage');if(!box||!box.querySelector('#l4List'))return;
  lbEnsure();
  var main=L4.tab==='main';
  box.querySelectorAll('#l4Seg [data-t]').forEach(function(b){b.classList.toggle('on',b.dataset.t===L4.tab)});
  var sub=$('l4Sub');sub.hidden=main;
  if(!main){
    sub.innerHTML=ATMO.map(function(a){
      var n=S.lib.filter(function(x){return x.tag===a[0]}).length;
      return '<button type="button" class="lb-pill'+(L4.sub===a[0]?' on':'')+'" data-sub="'+esc(a[0])+'">'+esc(a[1])+' <em>'+n+'</em></button>';
    }).join('');
  }
  box.querySelector('[data-a="grp"]').hidden=!main;
  box.querySelector('[data-a="search"]').classList.toggle('on',L4.search);
  box.querySelector('[data-a="filter"]').classList.toggle('on',L4.show!=='all');
  box.querySelector('[data-a="batch"]').classList.toggle('on',L4.batch);
  $('l4S').hidden=!L4.search;
  var pills=$('l4Pills');pills.hidden=!main;
  var tags=mainTags();
  if(L4.group!=='all'&&!tags.some(function(g){return g.tag===L4.group}))L4.group='all';
  if(main){
    var total=S.lib.filter(function(x){return !isAtmo(x.tag)}).length;
    pills.innerHTML='<button type="button" class="lb-pill'+(L4.group==='all'?' on':'')+'" data-g="all">全部 <em>'+total+'</em></button>'+tags.map(function(g){
      var c=esc(lbColor(g.tag)),on=L4.group===g.tag,off=S.libOff.indexOf(g.tag)>=0;
      return '<button type="button" class="lb-pill'+(on?' on':'')+(off?' off':'')+'" data-g="'+esc(g.tag)+'"'+(on?' style="background:'+c+';border-color:'+c+'"':'')+'><i style="background:'+(on?'#fff':c)+'"></i>'+esc(g.tag)+' <em>'+g.n+'</em></button>';
    }).join('');
  }
  var items=l4Items(),list=$('l4List');list.innerHTML='';
  if(main&&L4.group==='all'&&!L4.q&&L4.show==='all'){
    if(!tags.length)list.innerHTML=l4Empty('主字卡是空的','点下面「新增」加几句，<br>或者导入一个字卡包。');
    tags.forEach(function(g){list.appendChild(l4GroupEl(g,items.filter(function(x){return x.tag===g.tag})))});
  }else if(!items.length){
    list.innerHTML=L4.q?l4Empty('没找到','换个词试试。'):(L4.show!=='all'?l4Empty('这里没有','换个筛选看看。'):l4Empty('这里还空着','点下面「新增」加几句。'));
  }else{
    var cap=300;
    items.slice(0,cap).forEach(function(x){list.appendChild(l4CardEl(x,main&&L4.group==='all'))});
    if(items.length>cap){var p=document.createElement('p');p.className='hint l4-hint';p.textContent='还有 '+(items.length-cap)+' 句没列出来，搜一下更快找到。';list.appendChild(p)}
  }
  if(!main&&L4_HINT[L4.sub]){var h=document.createElement('p');h.className='hint l4-hint';h.textContent=L4_HINT[L4.sub].replace('顾时夜',taName());list.appendChild(h)}
  var ft=$('l4Foot');
  if(L4.batch){
    ft.innerHTML='<div class="l4-bar"><span>已选 '+l4SelList().length+' 条</span><button type="button" class="ghost" data-b="all">全选</button>'+(main?'<button type="button" class="ghost" data-b="mv">移到分组</button>':'')+'<button type="button" class="ghost" data-b="off">屏蔽</button><button type="button" class="ghost" data-b="on">取消屏蔽</button><button type="button" class="ghost" data-b="rm">删除</button><button type="button" class="primary" data-b="done">完成</button></div>';
  }else ft.innerHTML='<button type="button" class="primary l4-new" data-b="new">'+ic('plus')+'新 增</button>';
  var lc=$('libCount');if(lc)lc.textContent=l4Scope().length+' 句';
};

renderLibPage=function(){
  var box=$('libPage');if(!box)return;
  if(!box.querySelector('#l4List')){
    box.innerHTML='<div class="l4-seg" id="l4Seg"><button type="button" data-t="main">主字卡</button><button type="button" data-t="atmo">氛围感</button></div>'
      +'<div class="l4-sub" id="l4Sub" hidden></div>'
      +'<div class="l4-tools"><button type="button" class="l4-ib" data-a="search" aria-label="搜索">'+ic('search')+'</button><button type="button" class="l4-ib" data-a="grp" aria-label="管理分组">'+ic('folder')+'</button><button type="button" class="l4-ib" data-a="filter" aria-label="筛选">'+ic('filter')+'</button><span class="sp"></span>'
      +'<button type="button" class="l4-ib" data-a="batch" aria-label="批量选择">'+ic('grid')+'</button><button type="button" class="l4-ib" data-a="imp" aria-label="导入">'+ic('imp')+'</button><button type="button" class="l4-ib" data-a="exp" aria-label="导出">'+ic('exp')+'</button></div>'
      +'<div class="l4-search" id="l4S" hidden><input id="l4Q" type="search" placeholder="搜一句…" autocomplete="off"></div>'
      +'<div class="lb-pills" id="l4Pills"></div><div id="l4List"></div><div class="l4-foot" id="l4Foot"></div>';
    $('l4Seg').addEventListener('click',function(e){
      var b=e.target.closest('[data-t]');if(!b||b.dataset.t===L4.tab)return;
      L4.tab=b.dataset.t;L4.group='all';L4.sel={};L4.batch=false;drawLib();
    });
    $('l4Sub').addEventListener('click',function(e){var b=e.target.closest('[data-sub]');if(!b)return;L4.sub=b.dataset.sub;L4.sel={};drawLib()});
    box.querySelector('.l4-tools').addEventListener('click',function(e){
      var b=e.target.closest('[data-a]');if(!b)return;var a=b.dataset.a;
      if(a==='search'){
        L4.search=!L4.search;if(!L4.search){L4.q='';$('l4Q').value=''}
        drawLib();if(L4.search)$('l4Q').focus();return;
      }
      if(a==='grp')l4GroupsSheet();
      if(a==='filter')l4FilterSheet();
      if(a==='batch'){L4.batch=!L4.batch;L4.sel={};drawLib()}
      if(a==='imp')importAny();
      if(a==='exp')exportPack();
    });
    $('l4Q').addEventListener('input',function(){L4.q=this.value.trim();drawLib()});
    $('l4Pills').addEventListener('click',function(e){var b=e.target.closest('[data-g]');if(!b)return;L4.group=b.dataset.g;drawLib()});
    $('l4Foot').addEventListener('click',function(e){var b=e.target.closest('[data-b]');if(b)l4BarClick(b.dataset.b)});
    LIB.built=true;
  }
  drawLib();
};

// 每日一句：主页「今日一句」优先从这里挑
var _rhV20=renderHome;
renderHome=function(){
  _rhV20();
  var pool=tagPool('每日一句');if(!pool.length)return;
  var d=new Date(),seed=d.getFullYear()*10000+(d.getMonth()+1)*100+d.getDate();
  var q=$('qText');if(q)q.textContent=pool[seed%pool.length];
};
// 字卡包：每日一句对应 milk 的「顶部格言」
var _prV20=packRows;
packRows=function(d){return _prV20(d)+chkRow('mottos','每日一句（milk 的顶部格言）',(d.customMottos||[]).length,true)};
var _apV20=applyPack;
applyPack=function(d,o,rep){var n=_apV20(d,o,rep);if(o.mottos)n+=addTag('每日一句',d.customMottos,rep);return n};
var _mdV20=milkData;
milkData=function(d){var r=_mdV20(d),m=milkGetter(d)('customMottos');r.pack.customMottos=Array.isArray(m)?m:[];return r};
exportPack=function(){
  var base=Date.now();
  function texts(t){return uniqArr(S.lib.filter(function(x){return x.tag===t}).map(function(x){return x.text}))}
  var groups=mainTags().map(function(g,i){return{id:base+i,name:g.tag,color:lbColor(g.tag),disabled:S.libOff.indexOf(g.tag)>=0,items:texts(g.tag)}});
  var plain=uniqArr(S.lib.filter(function(x){return !isAtmo(x.tag)}).map(function(x){return x.text}));
  downloadJSON({exportDate:new Date().toISOString(),modules:['replies','groups','pokes','statuses','mottos'],customReplies:plain,customReplyGroups:groups,customPokes:texts('拍一拍'),customStatuses:texts('状态'),customMottos:texts('每日一句')},'reply-library-'+ymd()+'.json');
};

// 信箱：收到的信 / 寄出的信
var MAILTAB='in';
(function(){
  var v=document.querySelector('.view[data-view="mail"]');if(!v||$('mlTabs'))return;
  var bar=v.querySelector('.mo-bar');
  var t=document.createElement('div');t.className='l4-seg ml-tabs';t.id='mlTabs';
  t.innerHTML='<button type="button" data-m="in">收到的信<em id="mlIn"></em></button><button type="button" data-m="out">寄出的信<em id="mlOut"></em></button>';
  bar.parentNode.insertBefore(t,bar.nextSibling);
  t.addEventListener('click',function(e){var b=e.target.closest('[data-m]');if(!b)return;MAILTAB=b.dataset.m;renderMail()});
})();
renderMail=function(){
  var box=$('mailList');if(!box)return;
  var ins=S.mails.filter(function(m){return m.from==='ta'}),outs=S.mails.filter(function(m){return m.from!=='ta'});
  var unread=ins.filter(function(m){return !m.read}).length;
  document.querySelectorAll('#mlTabs [data-m]').forEach(function(b){b.classList.toggle('on',b.dataset.m===MAILTAB)});
  var a=$('mlIn'),b=$('mlOut');
  if(a)a.textContent=unread?unread+' 未读':(ins.length||'');
  if(b)b.textContent=outs.length||'';
  var isIn=MAILTAB==='in',list=(isIn?ins:outs).slice().sort(function(x,y){return y.at-x.at});
  if(!list.length){
    box.innerHTML=isIn?l4Empty('还没有收到信','给'+esc(taName())+'写一封，<br>他会慢慢回，回信落在这里。'):l4Empty('还没有寄出的信','点右上角「写一封信」。');
    return;
  }
  var now=Date.now();
  box.innerHTML=list.map(function(m){
    var st='';
    if(!isIn){
      if(m.replyAt>now)st='<div class="mail-st wait">'+esc(taName())+' 在写回信</div>';
      else if(m.replyAt===undefined)st='<div class="mail-st">刚寄出</div>';
      else st='<div class="mail-st">已寄出</div>';
    }
    return '<article class="mail'+(isIn&&!m.read?' unread':'')+'" data-act="openMail" data-id="'+esc(m.id)+'"><div class="mail-top"><span class="mail-title">'+esc(m.title)+'</span><span class="mail-date">'+fmtDay(m.at)+'</span></div><div class="mail-from">'+(isIn?esc(taName())+' 写给你':'寄给 '+esc(taName()))+'</div><p class="mail-prev">'+esc(m.body)+'</p>'+st+'</article>';
  }).join('');
};
// 自己写的信不带回复按钮
var _omV20=openMail;
openMail=function(id){
  _omV20(id);
  var r=$('rReply');if(r&&currentMail)r.hidden=currentMail.from!=='ta';
};
// 写信只有自己写，寄出后放进「寄出的信」，他按回信概率和时长回
newMail=function(pre){
  pre=pre||{};
  var w=document.createElement('div');
  w.innerHTML='<div class="field"><label>标题</label><input id="mTitle" maxlength="30" placeholder="给 '+esc(taName())+'" style="font-size:16px"></div>'
    +'<div class="field"><label>正文</label><textarea id="mBody" class="l4-ta" placeholder="慢慢写，不着急。" style="min-height:220px;line-height:1.9"></textarea></div>'
    +'<button type="button" class="primary" id="mSend" style="width:100%">封 好 寄 出</button>'
    +'<p class="hint">寄出以后放在「寄出的信」里。'+esc(taName())+'会按回信概率和时长回你，回信落在「收到的信」。</p>';
  w.querySelector('#mTitle').value=pre.title||'';
  w.querySelector('#mBody').value=pre.body||'';
  w.querySelector('#mSend').addEventListener('click',function(){
    var t=w.querySelector('#mTitle').value.trim()||'无题';
    var bd=w.querySelector('#mBody').value.trim();
    if(!bd){alert('正文还空着。');return}
    S.mails.push({id:uid(),from:'me',title:t,body:bd,at:Date.now(),read:true});
    save();closeSheet();MAILTAB='out';
    if(typeof mailTick==='function')mailTick();
    go('mail');renderMail();updateNav();
  });
  openSheet('写一封信',w);
};

S.mails.forEach(function(m){if(m.from!=='ta'&&!m.read)m.read=true});
lbEnsure();save();
if(LIB.built)renderLibPage();
renderHome();renderMail();updateNav();

}catch(e){console.error("[zika] js/lib4.js",e)}

/* ===== js/lib6.js ===== */
try{

// v22：字卡库底部「新增」栏挪到 body 下面，只在字卡库页显示；在字卡库里打字时先藏起来，不挡键盘

(function(){
  function mount(){var f=$('l4Foot');if(f&&f.parentNode!==document.body)document.body.appendChild(f)}
  function mark(v){document.body.classList.toggle('on-lib',v==='lib')}
  var _rl=renderLibPage;
  renderLibPage=function(){_rl();mount()};
  var _go=go;
  go=function(v){_go(v);mark(v);if(v==='lib')mount()};
  document.addEventListener('focusin',function(e){if(e.target&&e.target.closest&&e.target.closest('#libPage'))document.body.classList.add('lib-typing')});
  document.addEventListener('focusout',function(){setTimeout(function(){var a=document.activeElement;if(!a||!a.closest||!a.closest('#libPage'))document.body.classList.remove('lib-typing')},60)});
  mount();
  var cur=document.querySelector('.view.on');mark(cur?cur.dataset.view:'');
})();

}catch(e){console.error("[zika] js/lib6.js",e)}

/* ===== js/mist-pre.js ===== */
try{

// 雾蓝配色要在 v23 之前记一下：v23 加载时不认识的配色会被改回米白，这里先记住，mist.js 再改回来

var MIST_KEEP=S.theme==='mist';

}catch(e){console.error("[zika] js/mist-pre.js",e)}

/* ===== js/v23.js ===== */
try{
v23Ensure=function(){
  var p=S.prefs,k;
  for(k in V23_DEF)if(p[k]===undefined||p[k]===null)p[k]=V23_DEF[k];
  if(!p.pal||typeof p.pal!=='object')p.pal={on:false,accent:'',bgA:'',bgB:''};
  if(S.theme==='night'){S.theme='paper';p.dark=true}
  if(!LOOK_T[S.theme])S.theme='paper';
};
v23hex=function(h){h=String(h||'').replace('#','');if(h.length===3)h=h.replace(/./g,'$&$&');var n=parseInt(h,16);if(h.length!==6||isNaN(n))return [0,0,0];return [n>>16&255,n>>8&255,n&255]};
v23isHex=function(s){return /^#[0-9a-f]{6}$/i.test(s||'')};
v23mix=function(a,b,t){var x=v23hex(a),y=v23hex(b);return x.map(function(v,i){return Math.round(v+(y[i]-v)*t)})};
v23rgb=function(arr){return 'rgb('+arr.join(',')+')'};
v23rgba=function(arr,al){return 'rgba('+arr.join(',')+','+al+')'};
lookBase=function(){return LOOK_T[S.theme]||LOOK_T.paper};
palVal=function(k){var p=S.prefs.pal;return v23isHex(p[k])?p[k]:lookBase()[k]};
applyLook=function(){
  v23Ensure();
  var p=S.prefs,r=document.documentElement,st=r.style,dark=!!p.dark;
  r.dataset.theme=dark?'night':S.theme;r.dataset.style=S.style;
  LOOK_VARS.forEach(function(v){st.removeProperty(v)});
  if(p.pal.on){
    var ac=palVal('accent');st.setProperty('--accent',ac);
    if(!dark){
      var a=palVal('bgA'),b=palVal('bgB'),s3=v23rgb(v23mix(ac,'#ffffff',.84));
      st.setProperty('--bg-a',a);st.setProperty('--bg-b',b);
      st.setProperty('--blob1',v23rgba(v23hex(ac),.3));st.setProperty('--blob2','rgba(255,255,255,.78)');st.setProperty('--blob3',v23rgba(v23hex(b),.85));
      st.setProperty('--solid',v23rgb(v23mix(a,'#ffffff',.72)));st.setProperty('--solid-2',v23rgb(v23mix(a,'#ffffff',.3)));st.setProperty('--solid-3',s3);
      st.setProperty('--card-b',S.style==='glass'?v23rgba(v23mix(ac,'#ffffff',.82),.5):s3);
    }
  }
  if(!dark){if(v23isHex(p.ink))st.setProperty('--ink',p.ink);if(v23isHex(p.sub))st.setProperty('--sub',p.sub)}
  var meta=document.querySelector('meta[name="theme-color"]');
  if(meta)meta.setAttribute('content',dark?'#17161c':(p.pal.on?palVal('bgA'):lookBase().bgA));
  var d=$('sbDark');if(d)d.textContent=dark?'☀ 日间':'☾ 夜间';
};
applyChat=function(){
  var p=S.prefs,r=document.documentElement,st=r.style;
  r.dataset.bubble=p.bubKind==='plain'?'plain':'note';
  r.dataset.bubtime=p.bubTime?'1':'0';
  st.setProperty('--bub-me',v23isHex(p.bubMe)?p.bubMe:V23_DEF.bubMe);
  st.setProperty('--bub-me-ink',v23isHex(p.bubMeInk)?p.bubMeInk:V23_DEF.bubMeInk);
  st.setProperty('--bub-ta',v23isHex(p.bubTa)?p.bubTa:V23_DEF.bubTa);
  st.setProperty('--bub-ta-ink',v23isHex(p.bubTaInk)?p.bubTaInk:V23_DEF.bubTaInk);
  var rad=Math.max(0,+p.bubR||0);
  st.setProperty('--bub-r',rad+'px');st.setProperty('--bub-tail-r',(p.bubTail?Math.min(rad,5):rad)+'px');
  st.setProperty('--bub-pad',(+p.bubPad||10)+'px');st.setProperty('--bub-max',(+p.bubMax||78)+'%');
  st.setProperty('--bub-sh',p.bubShadow?'0 3px 10px rgba(0,0,0,.08)':'none');
  var s=Math.max(20,+p.avSize||34);
  st.setProperty('--cav-s',s+'px');st.setProperty('--cav-r',p.avShape==='square'?Math.round(s*.26)+'px':'50%');
  st.setProperty('--fz',String(Math.max(70,+p.fontScale||100)/100));
};
openAvSet=function(){
  var w=document.createElement('div');w.className='v23';
  w.innerHTML='<div class="chk"><label><input type="checkbox" id="avOn">每句话显示头像<span>关着的话传讯页看不到</span></label></div>'
    +'<div class="field"><label>形状</label><div class="seg" id="avSeg"><button type="button" data-v="round">圆形</button><button type="button" data-v="square">方角</button></div></div>'
    +rr('大小','avSize',24,56,2)
    +'<div class="v23-avp"><div class="crow ta"><span class="cav" id="avP1"></span><span class="v23-ph"></span></div><div class="crow me"><span class="cav" id="avP2"></span><span class="v23-ph"></span></div></div>';
  setAv(w.querySelector('#avP1'),S.ta);setAv(w.querySelector('#avP2'),S.me);
  var ph=w.querySelectorAll('.v23-ph');ph[0].textContent=taName();ph[1].textContent=S.me.name||'我';
  function paint(){
    w.querySelector('#avOn').checked=!!S.prefs.msgAv;
    w.querySelectorAll('#avSeg [data-v]').forEach(function(b){b.classList.toggle('on',b.dataset.v===S.prefs.avShape)});
  }
  w.querySelector('#avOn').addEventListener('change',function(){setMsgAv(this.checked)});
  w.querySelector('#avSeg').addEventListener('click',function(e){
    var b=e.target.closest('[data-v]');if(!b)return;
    S.prefs.avShape=b.dataset.v;save();applyChat();paint();
  });
  bindRanges(w,function(){applyChat()});
  paint();openSheet('聊天头像',w);
};
// v23：日夜模式、自定义配色和字体颜色、整体字号、普通气泡、聊天头像方角和大小、设置全屏

var LOOK_T={
  paper:{n:'米白',accent:'#b07b62',bgA:'#f3e8d8',bgB:'#e4d2bb',ink:'#3a322a',sub:'#94816d'},
  rose:{n:'玫瑰',accent:'#b96f74',bgA:'#f7e5e5',bgB:'#efd3d3',ink:'#42312f',sub:'#a5898a'},
  sage:{n:'青草',accent:'#6f8a6d',bgA:'#e6ebdf',bgB:'#d3ddcb',ink:'#303a31',sub:'#7a887a'}
};
var V23_DEF={dark:false,ink:'',sub:'',fontScale:100,bubKind:'note',bubMe:'#b9787d',bubMeInk:'#ffffff',bubTa:'#ffffff',bubTaInk:'#3a322a',bubR:18,bubTail:true,bubPad:10,bubMax:78,bubShadow:true,bubTime:true,avShape:'round',avSize:34};
var BUB_KEYS=['bubKind','bubMe','bubMeInk','bubTa','bubTaInk','bubR','bubTail','bubPad','bubMax','bubShadow','bubTime'];

var _ensureV23=ensurePrefs;
ensurePrefs=function(){_ensureV23();v23Ensure()};
v23Ensure();save();









// 去掉：主页右上角材质按钮、主页底下那句、侧栏收起。侧栏左下换成日夜切换
paintStyleBtns=function(){};
(function(){
  var hf=document.querySelector('.home-foot');if(hf)hf.remove();
  var sc=$('sbClose');if(sc)sc.remove();
  var bs=$('btnStyle');if(bs)bs.remove();
  var sb=$('sbStyle');
  if(sb&&!$('sbDark')){
    var nb=sb.cloneNode(false);nb.id='sbDark';nb.type='button';
    sb.parentNode.replaceChild(nb,sb);
    nb.addEventListener('click',function(){S.prefs.dark=!S.prefs.dark;save();applyLook()});
  }
})();

// 配色：日间用选的配色或自定义；夜间用夜间配色，只带上自定义的主色
var LOOK_VARS=['--accent','--bg-a','--bg-b','--blob1','--blob2','--blob3','--solid','--solid-2','--solid-3','--card-b','--ink','--sub'];

applySkin=applyLook;

// 气泡、头像、字号都是根上的变量，改了马上生效

var FZ=[['.card .body',15.5],['.card .head',10.5],['.quote p',14.5],['.entry b',15.5],['.entry span',10.5],['.hp-nm',13.5],['.hh-day',12],['.tab',15],['.sb-names',14.5],['.l4-card .t',14.5],['.lb-pill',12],['.l4-gh b',14],['.m2-text',15],['.m2-ia',12.5],['.mail-title',15],['.mail-prev',12.5],['.letter-body',15],['.fav p',15],['.mi',14],['.hint',11.5],['.chat-top .who:first-child .nm',16],['.t2-nm',16],['.qt',11.5],['.cl-subs p',14.5],['.poke',11],['#typing',11]];
(function(){
  var st=$('v23fz');if(!st){st=document.createElement('style');st.id='v23fz';document.head.appendChild(st)}
  st.textContent=FZ.map(function(x){return 'html body '+x[0]+'{font-size:calc('+x[1]+'px * var(--fz,1))}'}).join('\n')
    +'\nhtml body #input{font-size:max(16px,calc(15px * var(--fz,1)))!important}';
})();
var _fmtV23=fmtPref;
fmtPref=function(k,v){
  if(k==='bubR'||k==='bubPad'||k==='avSize')return v+' px';
  if(k==='bubMax'||k==='fontScale')return v+'%';
  return _fmtV23(k,v);
};

// 材质与配色
openLook=function(){
  var w=document.createElement('div');w.className='v23';
  function crow(label,k,v){return '<label class="v23-crow"><span>'+label+'</span><input type="color" data-pal="'+k+'" value="'+v+'"></label>'}
  function inkRow(label,k){
    var p=S.prefs,own=v23isHex(p[k]);
    return '<div class="v23-crow"><span>'+label+'</span><em>'+(own?'':'跟随配色')+'</em><input type="color" data-ink="'+k+'" value="'+(own?p[k]:lookBase()[k])+'"><button type="button" data-fol="'+k+'">跟随</button></div>';
  }
  function draw(){
    var p=S.prefs;
    w.innerHTML='<div class="field"><label>日间 / 夜间</label><div class="seg" data-g="dark"><button type="button" data-v="0">☀ 日间</button><button type="button" data-v="1">☾ 夜间</button></div></div>'
      +'<div class="field"><label>材质</label><div class="seg" data-g="style"><button type="button" data-v="glass">毛玻璃</button><button type="button" data-v="solid">纯色</button></div></div>'
      +'<div class="field"><label>配色</label><div class="swatches" id="lkSw"></div></div>'
      +(p.pal.on?'<div class="v23-card">'+crow('主色','accent',palVal('accent'))+crow('背景（上）','bgA',palVal('bgA'))+crow('背景（下）','bgB',palVal('bgB'))+'</div>':'')
      +'<div class="sec">字体颜色</div><div class="v23-card">'+inkRow('正文','ink')+inkRow('浅色字','sub')+'</div>'
      +'<p class="hint">最后那个彩色圆点是自定义配色。夜间模式用夜间的颜色，自定义的背景和字体颜色只在日间生效，主色日夜都用。</p>'
      +'<button type="button" class="ghost" data-rs="1" style="width:100%;margin-top:12px">恢复默认配色</button>';
    w.querySelectorAll('[data-g="dark"] [data-v]').forEach(function(b){b.classList.toggle('on',(b.dataset.v==='1')===!!p.dark)});
    w.querySelectorAll('[data-g="style"] [data-v]').forEach(function(b){b.classList.toggle('on',b.dataset.v===S.style)});
    var sw=w.querySelector('#lkSw');
    Object.keys(LOOK_T).forEach(function(id){
      var t=LOOK_T[id],b=document.createElement('button');b.type='button';
      b.className='sw'+(!p.pal.on&&S.theme===id?' on':'');b.dataset.th=id;b.style.background=t.bgA;b.setAttribute('aria-label',t.n);
      var i=document.createElement('i');i.style.background=t.accent;b.appendChild(i);sw.appendChild(b);
    });
    var c=document.createElement('button');c.type='button';c.className='sw custom'+(p.pal.on?' on':'');c.dataset.th='custom';c.setAttribute('aria-label','自定义配色');
    c.appendChild(document.createElement('i'));sw.appendChild(c);
  }
  w.addEventListener('click',function(e){
    var p=S.prefs,t=e.target;
    var sb=t.closest('.seg [data-v]');
    if(sb){var g=sb.parentNode.dataset.g;if(g==='dark')p.dark=sb.dataset.v==='1';if(g==='style')S.style=sb.dataset.v;save();applyLook();draw();return}
    var th=t.closest('[data-th]');
    if(th){
      if(th.dataset.th==='custom'){
        if(!p.pal.on){var b=lookBase();['accent','bgA','bgB'].forEach(function(k){if(!v23isHex(p.pal[k]))p.pal[k]=b[k]});p.pal.on=true}
      }else{S.theme=th.dataset.th;p.pal.on=false}
      save();applyLook();draw();return;
    }
    var f=t.closest('[data-fol]');if(f){p[f.dataset.fol]='';save();applyLook();draw();return}
    if(t.closest('[data-rs]')){p.pal={on:false,accent:'',bgA:'',bgB:''};p.ink='';p.sub='';save();applyLook();draw()}
  });
  w.addEventListener('input',function(e){
    var t=e.target,p=S.prefs;
    if(t.dataset.pal){p.pal[t.dataset.pal]=t.value;applyLook()}
    if(t.dataset.ink){p[t.dataset.ink]=t.value;applyLook();var em=t.parentNode.querySelector('em');if(em)em.textContent=''}
  });
  w.addEventListener('change',function(e){if(e.target.dataset.pal||e.target.dataset.ink)save()});
  draw();openSheet('材质与配色',w);
};

// 聊天气泡：便签（原来那种，默认）/ 普通气泡
openBubble=function(){
  var w=document.createElement('div');w.className='v23';
  function bc(label,k){return '<label class="v23-crow"><span>'+label+'</span><input type="color" data-bk="'+k+'"></label>'}
  function bt(k,label,sub){return '<label><input type="checkbox" data-bt="'+k+'">'+label+'<span>'+sub+'</span></label>'}
  w.innerHTML='<div class="seg" id="bkSeg"><button type="button" data-k="note">便签</button><button type="button" data-k="plain">普通气泡</button></div>'
    +'<div class="v23-prev" id="bkPrev"></div>'
    +'<p class="hint" id="bkNote">便签是原来那种：有一点歪，带名字和小印章。</p>'
    +'<div id="bkPlain"><div class="sec">颜色</div><div class="v23-card">'+bc('我的气泡','bubMe')+bc('我的字','bubMeInk')+bc('他的气泡','bubTa')+bc('他的字','bubTaInk')+'</div>'
    +'<div class="sec">形状</div>'+rr('圆角','bubR',0,28)+rr('内边距','bubPad',4,18)+rr('最宽','bubMax',55,95)
    +'<div class="chk">'+bt('bubTail','小尾巴','靠底那个角收尖')+bt('bubShadow','阴影','')+bt('bubTime','显示时间','')+'</div></div>'
    +'<details class="v23-css"><summary>自定义 CSS</summary><p class="hint" style="margin-top:6px">写 CSS 声明就行，会套到字卡上；也可以写整段规则，比如 .card.me{…}。两种样式都能叠。</p><textarea id="bubbleBox" class="l4-ta" style="min-height:120px;font-family:ui-monospace,Menlo,monospace" placeholder="background:#fff;border-radius:20px;"></textarea><div class="two" style="margin-top:10px"><button type="button" class="ghost" id="bkCssClr" style="flex:1">清空</button><button type="button" class="primary" id="bkCssOk" style="flex:1">应用 CSS</button></div></details>'
    +'<button type="button" class="ghost" id="bkReset" style="width:100%;margin-top:14px">恢复默认</button>';
  var prev=w.querySelector('#bkPrev');
  prev.innerHTML='<article class="card ta" style="--tilt:-.5deg"><div class="head"><span class="n"></span><span>19:30</span></div><p class="body">吃饭了没。</p><div class="seal"></div></article>'
    +'<article class="card me" style="--tilt:.6deg"><div class="head"><span class="n"></span><span>19:31</span><span class="rd">已读</span></div><p class="body">吃了，不是面包。</p><div class="seal"></div></article>';
  var ns=prev.querySelectorAll('.n'),ss=prev.querySelectorAll('.seal');
  ns[0].textContent=taName();ns[1].textContent=S.me.name||'我';
  ss[0].textContent=taName().slice(-1);ss[1].textContent=(S.me.name||'我').slice(-1);
  function paint(){
    var p=S.prefs,plain=p.bubKind==='plain';
    w.querySelectorAll('#bkSeg [data-k]').forEach(function(b){b.classList.toggle('on',b.dataset.k===(plain?'plain':'note'))});
    w.querySelector('#bkPlain').hidden=!plain;w.querySelector('#bkNote').hidden=plain;
    w.querySelectorAll('[data-bk]').forEach(function(i){i.value=v23isHex(p[i.dataset.bk])?p[i.dataset.bk]:V23_DEF[i.dataset.bk]});
    w.querySelectorAll('[data-bt]').forEach(function(i){i.checked=!!p[i.dataset.bt]});
  }
  var paintR=bindRanges(w,function(){applyChat()});
  w.querySelector('#bkSeg').addEventListener('click',function(e){
    var b=e.target.closest('[data-k]');if(!b)return;
    S.prefs.bubKind=b.dataset.k;save();applyChat();paint();
  });
  w.addEventListener('input',function(e){var k=e.target.dataset.bk;if(k){S.prefs[k]=e.target.value;applyChat()}});
  w.addEventListener('change',function(e){
    var t=e.target;
    if(t.dataset.bk)save();
    if(t.dataset.bt){S.prefs[t.dataset.bt]=t.checked;save();applyChat()}
  });
  var box=w.querySelector('#bubbleBox');box.value=S.bubbleCSS||'';
  w.querySelector('#bkCssOk').addEventListener('click',function(){S.bubbleCSS=box.value.trim();save();applyBubbleCSS()});
  w.querySelector('#bkCssClr').addEventListener('click',function(){S.bubbleCSS='';box.value='';save();applyBubbleCSS()});
  w.querySelector('#bkReset').addEventListener('click',function(){
    BUB_KEYS.forEach(function(k){S.prefs[k]=V23_DEF[k]});save();applyChat();paint();paintR();
  });
  paint();openSheet('聊天气泡',w);
};

// 聊天头像：开关、圆形 / 方角、大小


// 全局字体那页最下面加字号
var _ofV23=openFontSet;
openFontSet=function(){
  _ofV23();
  var box=document.createElement('div');
  box.innerHTML='<div class="sec">字体大小</div>'+rr('整体字号','fontScale',80,140,5)
    +'<p class="hint" style="font-size:calc(14px * var(--fz,1));color:var(--ink)">今天也想你。拖一下看这行字变多大。</p>'
    +'<button type="button" class="ghost" id="fzReset" style="width:100%">恢复 100%</button>';
  var paint=bindRanges(box,function(){applyChat()});
  box.querySelector('#fzReset').addEventListener('click',function(){S.prefs.fontScale=100;save();applyChat();paint()});
  sheetBody.appendChild(box);
};

// 设置和它下面的每一页都全屏
var _openSheetV23=openSheet;
openSheet=function(t,n){sheet.classList.remove('full');_openSheetV23(t,n)};
var _openSetV23=openSettings;
openSettings=function(){_openSetV23();sheet.classList.add('full')};
var _addBackV23=addBack;
addBack=function(){_addBackV23();if(!sheet.hidden)sheet.classList.add('full')};
// 设置里的「夜间模式」开关：原来的处理先改值，这里接着刷新颜色
sheetBody.addEventListener('click',function(e){if(e.target.closest('[data-sw="dark"]'))applyLook()});

SET_GROUPS.forEach(function(g){
  var it=g[1];
  if(g[0]==='外观'){
    if(!it.some(function(i){return i[0]==='sw:dark'}))it.unshift(['sw:dark','夜间模式']);
    it.forEach(function(i){
      if(i[0]==='openLook')i[2]=function(){return S.prefs.pal.on?'自定义':lookBase().n+' · '+(S.style==='glass'?'毛玻璃':'纯色')};
      if(i[0]==='openFontSet')i[2]=function(){var f=FONTS.filter(function(x){return x.id===S.prefs.font.id})[0];return(f?f.n:'')+' · '+S.prefs.fontScale+'%'};
    });
  }
  if(g[0]==='聊天'){
    if(!it.some(function(i){return i[0]==='openAvSet'})){
      var at=0;it.forEach(function(i,n){if(i[0]==='sw:msgAv')at=n+1});
      it.splice(at,0,['openAvSet','聊天头像',function(){return(S.prefs.avShape==='square'?'方角':'圆形')+' · '+S.prefs.avSize+'px'}]);
    }
    it.forEach(function(i){if(i[0]==='openBubble')i[2]=function(){return S.prefs.bubKind==='plain'?'普通气泡':'便签'}});
  }
});

var _rraV23=rerenderAll;
rerenderAll=function(){_rraV23();applyLook();applyChat()};
applyLook();applyChat();renderChat();updateNav();

}catch(e){console.error("[zika] js/v23.js",e)}

/* ===== js/v24.js ===== */
try{

// v24：设置里点一项，原来是先把弹层关掉、80ms 后再开下一页，中间那一下会露出底下的页面，而且新页先是半屏再变全屏
// 现在全屏弹层关的时候先等一小会儿，这期间要是又开了新页，就直接在原地换内容，不关不开

var SW24={timer:null};
(function(){
  var st=document.createElement('style');
  st.textContent='#sheetBody.v24in{animation:v24in .2s ease both}@keyframes v24in{from{opacity:0;transform:translateX(12px)}}';
  document.head.appendChild(st);
})();
closeSheet=function(){
  if(sheet.hidden)return;
  if(!sheet.classList.contains('full')){sheet.hidden=true;return}
  clearTimeout(SW24.timer);
  SW24.timer=setTimeout(function(){SW24.timer=null;sheet.hidden=true;sheet.classList.remove('full')},180);
};
var _osV24=openSheet;
openSheet=function(t,n){
  var swap=!!SW24.timer;
  if(swap){clearTimeout(SW24.timer);SW24.timer=null}
  _osV24(t,n);
  if(swap){
    sheet.classList.add('full');
    sheetBody.classList.remove('v24in');void sheetBody.offsetWidth;sheetBody.classList.add('v24in');
    var inr=sheet.querySelector('.inner');if(inr)inr.scrollTop=0;
  }
};

}catch(e){console.error("[zika] js/v24.js",e)}

/* ===== js/v25.js ===== */
try{
v25Ensure=function(){
  var p=S.prefs,k;
  for(k in V25_DEF)if(p[k]===undefined||p[k]===null)p[k]=V25_DEF[k];
  if(!p.v25){if(+p.statMax===7)p.statMax=8;p.v25=1}
};
pmTime=function(t){
  var d=new Date(t),n=new Date();
  return d.toDateString()===n.toDateString()?pad(d.getHours())+':'+pad(d.getMinutes()):fmt(t);
};
comboText=function(pool,force){
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
};
openComboSet=function(){
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
};
kaWav=function(){
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
};
kaPlaying=function(){return !!(KA.a&&!KA.a.paused)};
kaPaint=function(){
  var e=document.getElementById('kaSt');
  if(e)e.textContent=!S.prefs.keepAlive?'关着':(kaPlaying()?'运行中':'点一下页面就开始');
};
kaAudio=function(){
  if(KA.a)return KA.a;
  var a=new Audio(kaWav());
  a.loop=true;a.preload='auto';a.volume=0.01;
  a.setAttribute('playsinline','');a.setAttribute('webkit-playsinline','');
  a.addEventListener('play',kaPaint);a.addEventListener('pause',kaPaint);
  KA.a=a;return a;
};
kaUnlock=function(){
  if(KA.bound)return;KA.bound=true;
  function go(){
    document.removeEventListener('touchend',go,true);document.removeEventListener('click',go,true);
    KA.bound=false;if(S.prefs.keepAlive&&!kaPlaying())kaStart();
  }
  document.addEventListener('touchend',go,true);document.addEventListener('click',go,true);
};
kaStart=function(){
  var a=kaAudio(),pr;
  try{pr=a.play()}catch(e){kaUnlock();return}
  if(pr&&pr.catch)pr.catch(function(){kaUnlock();kaPaint()});
  if('mediaSession' in navigator&&window.MediaMetadata){
    try{navigator.mediaSession.metadata=new MediaMetadata({title:'字卡传讯',artist:taName()+' 在等你'})}catch(e){}
  }
};
kaStop=function(){if(KA.a)KA.a.pause();kaPaint()};
openKaSet=function(){
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
};
// v25：普通气泡的时间和已读放到气泡外面；状态不再点一下就换，照 milk 1~8 小时自己从「对方状态」里抽；
// 随机拼字卡（2~N 张拼一句，中间随机加标点）；后台保活（照 milk 循环放一段听不见的声音）
var V25_DEF={comboOn:false,comboRate:100,comboMin:2,comboMax:3,keepAlive:false};

var _ensureV25=ensurePrefs;
ensurePrefs=function(){_ensureV25();v25Ensure()};
v25Ensure();
// milk：nextStatusChange = 1 + random*7 小时，也就是 1~8 小时
MILK.statMax=8;P_DEF.statMax=8;
for(var _k25 in V25_DEF)P_DEF[_k25]=V25_DEF[_k25];
save();

// ── 普通气泡：时间、已读、收藏星放到气泡下面 ──

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


// ── 后台保活：照 milk 循环放一段听不见的声音。声音在手机上现做，不联网 ──
var KA={a:null,bound:false,url:''};







document.addEventListener('visibilitychange',function(){
  if(S.prefs.keepAlive&&document.visibilityState==='visible'&&!kaPlaying())kaStart();
});


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

}catch(e){console.error("[zika] js/v25.js",e)}

/* ===== js/v26.js ===== */
try{
ac=function(){
  if(!AC){var C=window.AudioContext||window.webkitAudioContext;if(!C)return null;AC=new C();AC.onstatechange=acState}
  if(AC.state==='suspended'){try{AC.resume()}catch(e){}}
  return AC;
};
acUnlock=function(){
  if(AC&&AC.state==='running')return;
  var c=ac();if(!c)return;
  try{var b=c.createBuffer(1,1,22050),s=c.createBufferSource();s.buffer=b;s.connect(c.destination);s.start(0)}catch(e){}
};
tone=function(c,f,t0,dur,type,vol,slide){
  var o=c.createOscillator(),g=c.createGain();
  o.type=type;o.frequency.setValueAtTime(f,t0);
  if(slide)o.frequency.exponentialRampToValueAtTime(f*1.6,t0+dur*.6);
  g.gain.setValueAtTime(0.0001,t0);
  g.gain.exponentialRampToValueAtTime(vol,t0+0.012);
  g.gain.exponentialRampToValueAtTime(0.0001,t0+dur);
  o.connect(g);g.connect(c.destination);o.start(t0);o.stop(t0+dur+0.05);
};
playSnd=function(kind,force){
  var p=S.prefs;if(!force&&!p.snd)return;
  var s=SND[kind||p.sndKind]||SND.bell,v=Math.max(0,Math.min(1,(+p.sndVol||0)/100))*0.35;
  if(v<=0)return;
  var c=ac();if(!c)return;
  function go(){var t=c.currentTime+0.02;s.notes.forEach(function(n){tone(c,n[0],t+n[1],n[2],s.type,v,s.slide)})}
  if(c.state==='running')go();
  else if(c.resume){var pr=c.resume();if(pr&&pr.then)pr.then(function(){if(c.state==='running')go()}).catch(function(){})}
};
openSndSet=function(){
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
};
clearMS=function(){
  if(!('mediaSession' in navigator))return;
  try{navigator.mediaSession.metadata=null}catch(e){}
  try{navigator.mediaSession.playbackState='none'}catch(e){}
};
kqStart=function(){
  var c=ac();if(!c){kaUnlock();return}
  if(c.state!=='running'){kaUnlock();kaPaint();return}
  if(KQ.src){kaPaint();return}
  var b=c.createBuffer(1,c.sampleRate,c.sampleRate),d=b.getChannelData(0);
  for(var i=0;i<d.length;i++)d[i]=(i%2?1:-1)*0.00002;
  var s=c.createBufferSource();s.buffer=b;s.loop=true;s.connect(c.destination);s.start(0);
  KQ.src=s;kaPaint();
};
kqStop=function(){
  if(KQ.src){try{KQ.src.stop()}catch(e){}try{KQ.src.disconnect()}catch(e){}KQ.src=null}
};
acState=function(){
  if(AC&&AC.state==='running'&&S.prefs.keepAlive&&S.prefs.kaMode==='quiet'&&!KQ.src)kqStart();
  kaPaint();
};
// v26：收到消息的提示音（手机现做，不联网）；后台保活多一种「不显示在灵动岛」的方式

var V26_DEF={snd:true,sndKind:'bell',sndVol:60,sndPoke:true,kaMode:'quiet'};
(function(){var p=S.prefs,k;for(k in V26_DEF){if(p[k]===undefined||p[k]===null)p[k]=V26_DEF[k];P_DEF[k]=V26_DEF[k]}save()})();
(function(){var st=document.createElement('style');st.textContent='.v26-snds{display:flex;flex-wrap:wrap;gap:8px}.v26-snds .lb-pill{padding:8px 14px;font-size:13px}';document.head.appendChild(st)})();

// 一个共用的 AudioContext。iOS 要先点一下屏幕才能出声，所以每次点屏幕都顺手唤醒一下
var AC=null;


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


// ── 后台保活：「不显示」用 Web Audio 放一段听不见的声音，不走网页播放器，灵动岛和控制中心一般不会出现 ──
var KQ={src:null};




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

}catch(e){console.error("[zika] js/v26.js",e)}

/* ===== js/v27.js ===== */
try{
dyNext=function(d){
  var p=String(d.date).split('-'),now=new Date();now.setHours(0,0,0,0);
  var t=new Date(now.getFullYear(),Number(p[1])-1,Number(p[2]));
  if(isNaN(t.getTime()))return null;
  if(t<now)t.setFullYear(t.getFullYear()+1);
  return Math.round((t-now)/864e5);
};
dyInfo=function(d){
  var n=dayDiff(d.date);if(n===null)return{num:'—',unit:'',label:''};
  if(d.kind==='yearly'){
    var k=dyNext(d);if(k===null)return{num:'—',unit:'',label:''};
    return k===0?{num:'今天',unit:'',label:''}:{num:k,unit:'天',label:'还有'};
  }
  if(n>=0)return{num:n+1,unit:'天',label:'第'};
  return{num:-n,unit:'天',label:'还有'};
};
dyText=function(d){
  var i=dyInfo(d);
  if(i.num==='今天')return d.title+' · 就是今天';
  if(i.num==='—')return d.title;
  return d.title+' · '+(i.label==='第'?'第 '+i.num+' 天':'还有 '+i.num+' 天');
};
dyHomeId=function(){
  var pin=S.prefs.dayPin;
  if(pin&&S.days.some(function(d){return d.id===pin}))return pin;
  var nd=_nearV27();return nd?nd.item.id:'';
};
dyFull=function(){if(!sheet.hidden)sheet.classList.add('full')};
dyBack=function(){openDays();if(typeof addBack==='function')addBack();dyFull()};
dyFmt=function(s){var p=String(s).split('-');return p.length===3?p[0]+'.'+p[1]+'.'+p[2]:s};
dyForm=function(d){
  var isNew=!d,kind=d&&d.kind==='yearly'?'yearly':'up';
  var w=document.createElement('div');w.className='v27';
  w.innerHTML='<button type="button" class="sh-back" id="dyBk">‹ 纪念日</button>'
    +'<div class="field"><label>名字</label><input id="dyT" maxlength="16" placeholder="在一起"></div>'
    +'<div class="field"><label>那天</label><input id="dyD" type="date"></div>'
    +'<div class="field"><label>怎么数</label><div class="seg" id="dyK"><button type="button" data-k="up">从那天数起</button><button type="button" data-k="yearly">每年倒数</button></div></div>'
    +'<p class="hint" id="dyH" style="margin:-6px 0 14px"></p>'
    +'<label class="l4-swrow"><span>显示在主页</span><input type="checkbox" id="dyPin"><i class="l4-tg"></i></label>'
    +'<button type="button" class="primary" id="dyOk" style="width:100%;height:48px">'+(isNew?'记 下':'收 好')+'</button>'
    +(isNew?'':'<button type="button" class="ghost v27-del" id="dyDel">删掉这个日子</button>');
  var t=w.querySelector('#dyT'),dt=w.querySelector('#dyD'),pin=w.querySelector('#dyPin');
  if(d){t.value=d.title;dt.value=d.date}
  pin.checked=isNew?!S.days.length:dyHomeId()===d.id;
  function paintK(){
    w.querySelectorAll('#dyK [data-k]').forEach(function(b){b.classList.toggle('on',b.dataset.k===kind)});
    w.querySelector('#dyH').textContent=kind==='yearly'?'生日这种每年都有的，数到下一次还有几天。':'过去的日子数第几天，还没到的数还有几天。';
  }
  w.querySelector('#dyK').addEventListener('click',function(e){var b=e.target.closest('[data-k]');if(!b)return;kind=b.dataset.k;paintK()});
  w.querySelector('#dyBk').addEventListener('click',dyBack);
  w.querySelector('#dyOk').addEventListener('click',function(){
    var tt=t.value.trim(),dd=dt.value;
    if(!tt||!dd){alert('名字和日期都填一下。');return}
    var item=d;
    if(isNew){item={id:uid(),title:tt.slice(0,16),date:dd,kind:kind};S.days.push(item)}
    else{item.title=tt.slice(0,16);item.date=dd;item.kind=kind}
    if(pin.checked)S.prefs.dayPin=item.id;
    else if(S.prefs.dayPin===item.id)S.prefs.dayPin='';
    save();renderHome();updateNav();dyBack();
  });
  var del=w.querySelector('#dyDel');
  if(del)del.addEventListener('click',function(){
    if(!confirm('删掉「'+d.title+'」？'))return;
    S.days=S.days.filter(function(x){return x.id!==d.id});
    if(S.prefs.dayPin===d.id)S.prefs.dayPin='';
    save();renderHome();updateNav();dyBack();
  });
  paintK();
  openSheet(isNew?'记一个日子':'改一下',w);dyFull();
};
// v27：纪念日换个样子。一个日子一张卡，点进去单独一页改；能选每年倒数（生日那种）；能选主页数哪一个

var _nearV27=nearDay;




nearDay=function(){
  var id=dyHomeId();if(!id)return null;
  var it=S.days.filter(function(d){return d.id===id})[0];
  return it?{item:it,n:dayDiff(it.date)}:null;
};
dayText=function(nd){return dyText(nd.item)};





openDays=function(){
  var w=document.createElement('div');w.className='v27';
  var home=dyHomeId();
  if(!S.days.length){
    w.innerHTML='<div class="empty"><b>还没有日子</b>记下在一起的那天，<br>主页会一直替你数着。</div>';
  }else{
    w.innerHTML='<div class="v27-list">'+S.days.map(function(d){
      var i=dyInfo(d);
      return '<button type="button" class="v27-d" data-id="'+esc(d.id)+'"><div class="l"><b>'+esc(d.title)+(d.id===home?'<span class="v27-tag">主页</span>':'')+'</b><span>'+esc(dyFmt(d.date))+' · '+(d.kind==='yearly'?'每年倒数':'从那天数起')+'</span></div>'
        +'<div class="r">'+(i.label?'<em>'+i.label+'</em>':'')+'<strong>'+esc(String(i.num))+'</strong>'+(i.unit?'<i>'+i.unit+'</i>':'')+'</div></button>';
    }).join('')+'</div>';
  }
  var add=document.createElement('button');add.type='button';add.className='primary v27-add';add.textContent='＋ 记一个日子';
  add.addEventListener('click',function(){dyForm(null)});
  w.appendChild(add);
  var h=document.createElement('p');h.className='hint';h.textContent='点一个日子可以改名字、改日期、删掉，也能选主页上数哪一个。';w.appendChild(h);
  w.addEventListener('click',function(e){
    var b=e.target.closest('[data-id]');if(!b)return;
    var d=S.days.filter(function(x){return x.id===b.dataset.id})[0];if(d)dyForm(d);
  });
  openSheet('纪念日',w);
};



SET_GROUPS.forEach(function(g){g[1].forEach(function(i){
  if(i[0]==='openDays')i[2]=function(){var nd=nearDay();return nd?dyText(nd.item):'还没有'};
})});
renderHome();updateNav();

}catch(e){console.error("[zika] js/v27.js",e)}

/* ===== js/v28.js ===== */
try{
v28Date=function(){
  var dt=document.getElementById('dyD');if(!dt||dt.dataset.v28)return;
  dt.dataset.v28='1';
  var box=document.createElement('label');box.className='v28-date';
  var show=document.createElement('span');show.className='v28-dshow';
  dt.parentNode.insertBefore(box,dt);
  box.appendChild(show);box.appendChild(dt);
  function paint(){
    var v=dt.value,p=v?v.split('-'):null;
    if(p&&p.length===3){show.textContent=p[0]+' 年 '+Number(p[1])+' 月 '+Number(p[2])+' 日';show.classList.remove('ph')}
    else{show.textContent='点这里选日子';show.classList.add('ph')}
  }
  dt.addEventListener('change',paint);dt.addEventListener('input',paint);dt.addEventListener('blur',paint);
  paint();
};
// v28：纪念日的日期框改成两行（名字一行、日期一行），日期框自己画，不会被系统日期框撑出屏幕
// 设置重新归类；「回信」改叫「信箱」


var _dyFormV28=dyForm;
dyForm=function(d){_dyFormV28(d);v28Date()};

// 设置重新归类：聊天那组太长，拆开；「每句话显示头像」收进「聊天头像」里；字卡分组用字卡库那套
(function(){
  var all={},order=[];
  SET_GROUPS.forEach(function(g){g[1].forEach(function(i){if(!all[i[0]]){all[i[0]]=i;order.push(i[0])}})});
  all.l4GroupsSheet=['l4GroupsSheet','字卡分组',function(){return mainTags().length+' 组'}];
  if(all.openAvSet)all.openAvSet[2]=function(){if(!S.prefs.msgAv)return '不显示';return(S.prefs.avShape==='square'?'方角':'圆形')+' · '+S.prefs.avSize+'px'};
  var NG=[
    ['我们',['openProfile','openDays']],
    ['外观',['sw:dark','openLook','openWallSet','openIconSet','openFontSet']],
    ['聊天样式',['openBubble','openAvSet']],
    ['他怎么回你',['openReplySet','openComboSet','openMoSet','openSndSet']],
    ['字卡与通话',['l4GroupsSheet','openCallWall']],
    ['后台与数据',['openKaSet','openData']]
  ];
  var used={'sw:msgAv':1,openGroups:1};
  NG.forEach(function(g){g[1].forEach(function(k){used[k]=1})});
  var rest=order.filter(function(k){return !used[k]});
  var out=NG.map(function(g){return [g[0],g[1].map(function(k){return all[k]}).filter(Boolean)]});
  if(rest.length){var last=out[out.length-1];last[1]=last[1].concat(rest.map(function(k){return all[k]}))}
  SET_GROUPS.length=0;
  out.forEach(function(g){if(g[1].length)SET_GROUPS.push(g)});
})();

// 「回信」改叫「信箱」，跟页面标题一致
(function(){
  if(typeof IC_NAME==='object')IC_NAME.mail='信箱';
  if(typeof WALL_NAME==='object')WALL_NAME.mail='信箱';
  var t=document.querySelector('#tabbar .tab[data-view="mail"] span');if(t)t.textContent='信箱';
  var e=document.querySelector('.entry[data-go="mail"]');
  if(e){var b=e.querySelector('b'),s=e.querySelector('span');if(b)b.textContent='信箱';if(s)s.textContent='寄出去，等他回'}
})();

}catch(e){console.error("[zika] js/v28.js",e)}

/* ===== js/call2.js ===== */
try{
cwIc=function(k){return '<svg viewBox="0 0 24 24" aria-hidden="true">'+CW_IC[k]+'</svg>'};
kindName=function(){return '语音通话'};
cwFit=function(){
  var W=window.innerWidth,H=window.innerHeight;
  var w=+CWP.w||CW_SZ.std[0],h=+CWP.h||CW_SZ.std[1];
  w=Math.max(150,Math.min(w,W-16));h=Math.max(190,Math.min(h,H-24));
  var x=CWP.x,y=CWP.y;
  if(typeof x!=='number'||typeof y!=='number'){x=(W-w)/2;y=Math.max(60,(H-h)/2-30)}
  x=Math.max(8,Math.min(x,W-w-8));y=Math.max(8,Math.min(y,H-h-8));
  CWP.x=x;CWP.y=y;CWP.w=w;CWP.h=h;
  cw.style.left=x+'px';cw.style.top=y+'px';cw.style.width=w+'px';cw.style.height=h+'px';
  cw.dataset.size=(w<200||h<260)?'mini':(w<260||h<360)?'sm':w<320?'std':'lg';
};
cwPillFit=function(){
  var W=window.innerWidth,H=window.innerHeight,pw=cwPill.offsetWidth||110,ph=cwPill.offsetHeight||44;
  var x=CWP.px,y=CWP.py;
  if(typeof x!=='number'||typeof y!=='number'){x=W-pw-14;y=90}
  x=Math.max(6,Math.min(x,W-pw-6));y=Math.max(6,Math.min(y,H-ph-6));
  CWP.px=x;CWP.py=y;cwPill.style.left=x+'px';cwPill.style.top=y+'px';
};
cwDrag=function(el,o){
  el.addEventListener('pointerdown',function(e){
    if(o.skip&&o.skip(e.target))return;
    e.stopPropagation();
    var sx=e.clientX,sy=e.clientY,st=o.start(),moved=false,id=e.pointerId;
    try{el.setPointerCapture(id)}catch(_){}
    function mv(ev){
      if(ev.pointerId!==id)return;
      var dx=ev.clientX-sx,dy=ev.clientY-sy;
      if(!moved&&Math.abs(dx)+Math.abs(dy)<6)return;
      moved=true;ev.preventDefault();o.move(st.x+dx,st.y+dy);
    }
    function up(ev){
      if(ev.pointerId!==id)return;
      el.removeEventListener('pointermove',mv);el.removeEventListener('pointerup',up);el.removeEventListener('pointercancel',up);
      o.end(moved);
    }
    el.addEventListener('pointermove',mv);el.addEventListener('pointerup',up);el.addEventListener('pointercancel',up);
  });
};
cwMenuPaint=function(){var cur=cw.dataset.size;$('cwMenu').querySelectorAll('[data-sz]').forEach(function(b){b.classList.toggle('on',b.dataset.sz===cur)})};
cwMinimize=function(){$('cwMenu').hidden=true;cw.hidden=true;cwPill.hidden=false;cwPillFit()};
cwRestore=function(){cwPill.hidden=true;cw.hidden=false;cwFit()};
cwPic=function(){
  pickImage(function(src){shrinkSafe(src,1080,false,0.8).then(function(u){
    if(!u){alert('这张读不出来，换一张试试。');return}
    var old=S.prefs.voiceWall;S.prefs.voiceWall=u;
    if(!save()){S.prefs.voiceWall=old;save();alert('这张太大存不下，换一张试试。');return}
    paintWho();
  })});
};
paintWho=function(){
  C.kind='voice';
  setAv($('clAv'),S.ta);setAv($('cwAv'),S.ta);setAv($('cwPav'),S.ta);
  $('clName').textContent=taName();$('cwName').textContent=taName();
  var wall=S.prefs.voiceWall;
  callBox.dataset.kind='voice';
  callBox.classList.remove('has-wall');
  var ri=S.ta.img||'';
  $('clBg').style.backgroundImage=ri?'url("'+ri+'")':'';
  $('cwBg').style.backgroundImage=wall?'url("'+wall+'")':'';
  cw.dataset.kind='voice';
  cw.classList.toggle('has-img',!!wall);
  cw.classList.toggle('own',!!wall);
};
setMode=function(m){
  callBox.dataset.mode=m;
  $('clCancel').hidden=m!=='dial';$('clDecline').hidden=m!=='incoming';$('clAccept').hidden=m!=='incoming';
};
openRing=function(m,text){paintWho();setMode(m);$('clState').textContent=text;cw.hidden=true;cwPill.hidden=true;callBox.hidden=false};
callLog=function(text){S.cards.push({id:uid(),from:'sys',type:'call',text:'',call:text,at:Date.now()});save();renderChat();updateNav()};
closeCall=function(){
  clearTimeout(C.timer);clearInterval(C.tick);
  C.state='idle';callBox.hidden=true;cw.hidden=true;cwPill.hidden=true;
  cw.classList.remove('clean');$('cwMenu').hidden=true;$('clHint').textContent='';
};
paintTime=function(){var t=mmss(Date.now()-C.start);$('cwTime').textContent=t;$('cwPt').textContent=t};
dial=function(){
  if(C.state!=='idle')return;
  C.kind='voice';
  C.state='dial';openRing('dial',kindName()+' · 正在呼叫…');
  var no=S.call.reject!==false&&Math.random()<CALL.rejectRate;
  C.timer=setTimeout(function(){
    if(C.state!=='dial')return;
    if(!no){startLive();return}
    var lbl=taName()+pickOne(REJECT_LABELS);
    C.state='ending';$('clState').textContent=lbl;callLog(lbl);
    C.timer=setTimeout(closeCall,1600);
  },no?rnd(CALL.rejectMin,CALL.rejectMax):rnd(CALL.connectMin,CALL.connectMax));
};
incoming=function(){
  if(C.state!=='idle')return;
  C.kind='voice';
  C.state='incoming';openRing('incoming','邀请你'+kindName());
  var cancel=Math.random()*100<(+S.prefs.cancelRate||0);
  C.timer=setTimeout(function(){
    if(C.state!=='incoming')return;
    callLog(cancel?taName()+' 取消了'+kindName():'未接 '+taName()+' 的'+kindName());
    closeCall();
  },cancel?rnd(4000,10000):CALL.ringTimeout);
};
startLive=function(){
  clearTimeout(C.timer);
  C.state='live';C.start=Date.now();
  callBox.hidden=true;cwPill.hidden=true;
  cw.classList.remove('clean');$('cwMenu').hidden=true;$('clHint').textContent='';
  paintWho();cw.hidden=false;cwFit();
  clearInterval(C.tick);C.tick=setInterval(paintTime,1000);paintTime();
};
hang=function(){
  if(C.state==='live')callLog(kindName()+' · '+mmss(Date.now()-C.start));
  else if(C.state==='dial')callLog('已取消'+kindName());
  else if(C.state==='incoming')callLog('已拒绝 '+taName()+' 的'+kindName());
  closeCall();
};
sub=function(){};
say=function(){};
planRing=function(){
  clearTimeout(C.ring);
  if(!S.call.random)return;
  C.ring=setTimeout(function(){
    if(C.state==='idle'&&!document.hidden&&Math.random()<CALL.ringRate)incoming();
    planRing();
  },rnd(CALL.ringMin,CALL.ringMax));
};
// v30 通话：只有语音通话。打过去、打过来还是整屏响铃；接通以后是浮在聊天页上的小窗
// 小窗能拖、能改大小（迷你 / 小 / 标准 / 大，右下角也能拉）、能缩成胶囊；位置和大小会记住
// 深色底、头像外一圈光、声音小条。视频通话和「说一句」都去掉了
// 接在旧 call.js 和 v19.js 后面，把通话相关的函数整个换掉，旧的通话界面删掉

(function(){['call','callMini'].forEach(function(id){var e=document.getElementById(id);if(e)e.remove()})})();
(function(){
  var p=S.prefs;
  if(!p.callWin||typeof p.callWin!=='object')p.callWin={};
  if(typeof p.voiceWall!=='string')p.voiceWall='';
  save();
})();
var CWP=S.prefs.callWin;
var CW_SZ={mini:[160,210],sm:[230,320],std:[290,420],lg:[340,540]};
var CW_IC={
  big:'<path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>',
  min:'<path d="M5 12h14"/>',
  eye:'<path d="M3 3l18 18M10.6 6.2A9.6 9.6 0 0 1 12 6c5 0 8.5 4.5 9 6-.3.9-1.2 2.4-2.6 3.7M6.4 7.6C4.6 8.9 3.4 10.7 3 12c.5 1.5 4 6 9 6 1.6 0 3-.4 4.2-1.1M9.9 9.9a3 3 0 0 0 4.2 4.2"/>',
  pic:'<rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="10" r="2"/><path d="M21 16l-5-5-9 9"/>'
};

var CW_HANG='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="'+PH+'"/></svg>';

C.kind='voice';


// ── 整屏响铃：打过去、打过来 ──
callBox=document.createElement('div');callBox.id='call';callBox.hidden=true;
callBox.innerHTML='<div class="cl-bg" id="clBg"></div><i class="cl-orb o1"></i><i class="cl-orb o2"></i><i class="cl-orb o3"></i>'
  +'<div class="cl-ring"><span class="cl-av" id="clAv"></span><b class="cl-name" id="clName"></b><span class="cl-state" id="clState"></span>'
  +'<div class="cl-acts"><button type="button" class="cl-btn cl-no" id="clCancel"><i>'+ICON_NO+'</i>取消</button><button type="button" class="cl-btn cl-no" id="clDecline"><i>'+ICON_NO+'</i>拒绝</button><button type="button" class="cl-btn cl-yes" id="clAccept"><i>'+ICON_YES+'</i>接听</button></div></div>';
document.body.appendChild(callBox);

// ── 接通后的小窗 ──
var cw=document.createElement('div');cw.id='cw';cw.hidden=true;
cw.innerHTML='<div class="cw-bg" id="cwBg"></div>'
  +'<div class="cw-top"><span class="cw-time"><i></i><b id="cwTime">00:00</b></span><span class="sp"></span>'
  +'<button type="button" class="cw-ib" id="cwSz" aria-label="窗口大小">'+cwIc('big')+'</button>'
  +'<button type="button" class="cw-ib" id="cwMin" aria-label="缩小">'+cwIc('min')+'</button></div>'
  +'<div class="cw-menu" id="cwMenu" hidden>'+[['mini','迷你'],['sm','小'],['std','标准'],['lg','大']].map(function(s){return '<button type="button" data-sz="'+s[0]+'"><i class="sz-'+s[0]+'"></i>'+s[1]+'</button>'}).join('')+'</div>'
  +'<div class="cw-mid"><div class="cw-ring"><span class="cw-av" id="cwAv"></span></div><b class="cw-name" id="cwName"></b><span class="cw-wave"><i></i><i></i><i></i><i></i><i></i></span><span class="cw-hint" id="clHint"></span></div>'
  +'<div class="cw-bot"><button type="button" class="cw-ib" id="cwEye" aria-label="只看画面">'+cwIc('eye')+'</button>'
  +'<button type="button" class="cw-hang" id="cwHang" aria-label="挂断">'+CW_HANG+'</button>'
  +'<button type="button" class="cw-ib" id="cwPic" aria-label="换背景">'+cwIc('pic')+'</button></div>'
  +'<i class="cw-rs" id="cwRs"></i>';
document.body.appendChild(cw);
var cwPill=document.createElement('div');cwPill.id='cwPill';cwPill.hidden=true;
cwPill.setAttribute('role','button');cwPill.setAttribute('aria-label','回到通话');
cwPill.innerHTML='<span class="cw-pav" id="cwPav"></span><b id="cwPt">00:00</b>';
document.body.appendChild(cwPill);

// ── 位置和大小：都记在 S.prefs.callWin 里，超出屏幕就推回来 ──


// 按住拖。手指挪不到 6px 算点了一下

cwDrag(cw,{
  skip:function(t){return !!t.closest('button,.cw-rs,.cw-menu')},
  start:function(){return{x:CWP.x,y:CWP.y}},
  move:function(x,y){CWP.x=x;CWP.y=y;cwFit()},
  end:function(moved){
    if(moved){save();return}
    if(!$('cwMenu').hidden){$('cwMenu').hidden=true;return}
    cw.classList.remove('clean');
  }
});
cwDrag($('cwRs'),{start:function(){return{x:CWP.w,y:CWP.h}},move:function(w,h){CWP.w=w;CWP.h=h;cwFit()},end:function(m){if(m)save()}});
cwDrag(cwPill,{start:function(){return{x:CWP.px,y:CWP.py}},move:function(x,y){CWP.px=x;CWP.py=y;cwPillFit()},end:function(m){if(m){save();return}cwRestore()}});
window.addEventListener('resize',function(){
  if(!cw.hidden)cwFit();
  if(!cwPill.hidden)cwPillFit();
});




$('cwSz').addEventListener('click',function(){var m=$('cwMenu');m.hidden=!m.hidden;cwMenuPaint()});
$('cwMenu').addEventListener('click',function(e){
  var b=e.target.closest('[data-sz]');if(!b)return;
  var s=CW_SZ[b.dataset.sz],cx=CWP.x+CWP.w/2;
  CWP.w=s[0];CWP.h=s[1];CWP.x=cx-s[0]/2;
  cwFit();save();$('cwMenu').hidden=true;
});
$('cwMin').addEventListener('click',cwMinimize);
$('cwEye').addEventListener('click',function(){$('cwMenu').hidden=true;cw.classList.add('clean')});
$('cwHang').addEventListener('click',function(){hang()});
$('cwPic').addEventListener('click',cwPic);
$('clCancel').addEventListener('click',function(){hang()});
$('clDecline').addEventListener('click',function(){hang()});
$('clAccept').addEventListener('click',function(){startLive()});

// 换小窗背景


// ── 下面这些把旧 call.js / v19.js 里的同名函数整个换掉 ──







// 他打来：照 milk 有一定概率响几秒自己挂掉



// 「说一句」去掉了：他回字卡时不再往通话里塞字幕




// 顶栏的电话按钮：点了直接打语音
(function(){
  var ob=$('btnCall');if(!ob)return;
  var nb=ob.cloneNode(true);nb.setAttribute('aria-label','语音通话');
  ob.parentNode.replaceChild(nb,ob);
  nb.addEventListener('click',function(){if(C.state!=='idle')return;dial()});
})();
// 设置里去掉「视频通话壁纸」
if(typeof SET_GROUPS!=='undefined'){
  SET_GROUPS.forEach(function(g){
    g[1]=g[1].filter(function(i){return i[0]!=='openCallWall'});
    if(g[0]==='字卡与通话')g[0]='字卡';
  });
}
if(typeof openReplySet==='function'){
  var _orsC2=openReplySet;
  openReplySet=function(){
    _orsC2();
    document.querySelectorAll('#sheetBody .hint').forEach(function(p){p.textContent=p.textContent.replace('，视频还是语音随机','')});
  };
}

C.state='idle';planRing();

}catch(e){console.error("[zika] js/call2.js",e)}

/* ===== js/typing.js ===== */
try{

// v31：把「正在输入」挪进输入栏里，靠 CSS 浮到输入框左上方

(function(){
  var t=document.getElementById('typing'),f=document.querySelector('.chat-foot');
  if(!t||!f)return;
  f.insertBefore(t,f.firstChild);
  // 输入栏本来没定位就给它一个，好让小块贴着它
  if(getComputedStyle(f).position==='static')f.style.position='relative';
  f.style.overflow='visible';
})();

}catch(e){console.error("[zika] js/typing.js",e)}

/* ===== js/chats.js ===== */
try{
chTitle=function(cards){
  var i,c;
  for(i=0;i<cards.length;i++){c=cards[i];if(c.from==='me'&&!c.type&&c.text)return String(c.text).slice(0,18)}
  for(i=0;i<cards.length;i++){c=cards[i];if(!c.type&&c.text)return String(c.text).slice(0,18)}
  return '没说话的一段';
};
chSpan=function(it){
  var cs=it.cards||[];
  if(!cs.length)return fmt(it.at);
  var a=cs[0].at,b=cs[cs.length-1].at;
  return cs.length>1?fmt(a)+' ~ '+fmt(b):fmt(a);
};
chStop=function(){
  if(typeof replyTimer!=='undefined')clearTimeout(replyTimer);
  if(typeof replyRun!=='undefined')replyRun++;
  if(typeof showTyping==='function')showTyping(false);
  if(typeof setQuote==='function')setQuote(null);
};
chArchive=function(){
  if(!S.cards.length)return;
  S.chats.unshift({id:S.chatCur.id||uid(),at:S.chatCur.at||S.cards[0].at,end:Date.now(),title:chTitle(S.cards),cards:S.cards});
};
chDone=function(){
  if(!save())alert('存的时候出了点问题，刷新一下看看。');
  renderChat();updateNav();
};
chNew=function(){
  chStop();chArchive();
  S.cards=[];S.chatCur={id:uid(),at:Date.now()};
  chDone();
};
chOpen=function(id){
  var it=S.chats.filter(function(x){return x.id===id})[0];if(!it)return;
  chStop();
  S.chats=S.chats.filter(function(x){return x.id!==id});
  chArchive();
  S.cards=Array.isArray(it.cards)?it.cards:[];
  S.chatCur={id:it.id,at:it.at};
  chDone();
};
openChats=function(){
  var w=document.createElement('div');w.className='ch';
  function draw(){
    var h='<button type="button" class="primary ch-new" data-c="new">＋ 新开一个对话<\/button>'
      +'<p class="hint">现在这段会收进下面，随时能点回来接着说。字卡库和收藏都不动。<\/p>'
      +'<div class="sec">现在<\/div><div class="ch-it cur"><div class="l"><b>'+esc(S.cards.length?chTitle(S.cards):'新的对话')+'<\/b><span>'+esc(fmt(S.chatCur.at))+' 开始 · '+S.cards.length+' 张<\/span><\/div><\/div>';
    if(S.chats.length){
      h+='<div class="sec">以前的<\/div>'+S.chats.map(function(it){
        return '<div class="ch-it" data-id="'+esc(it.id)+'"><button type="button" class="l" data-c="open"><b>'+esc(it.title||chTitle(it.cards||[]))+'<\/b><span>'+esc(chSpan(it))+' · '+(it.cards||[]).length+' 张<\/span><\/button><button type="button" class="ch-del" data-c="del" aria-label="删掉这段">删<\/button><\/div>';
      }).join('');
    }else h+='<p class="hint ch-none">还没有以前的对话。<\/p>';
    w.innerHTML=h;
  }
  w.addEventListener('click',function(e){
    var b=e.target.closest('[data-c]');if(!b)return;
    var a=b.dataset.c,row=b.closest('[data-id]'),id=row&&row.dataset.id;
    if(a==='new'){if(S.cards.length)chNew();closeSheet();return}
    if(a==='open'&&id){chOpen(id);closeSheet();return}
    if(a==='del'&&id){
      var it=S.chats.filter(function(x){return x.id===id})[0];if(!it)return;
      if(!confirm('删掉「'+(it.title||'这段')+'」？删了找不回来。'))return;
      S.chats=S.chats.filter(function(x){return x.id!==id});save();draw();
    }
  });
  draw();openSheet('对话',w);
};
// 新开对话：传讯页顶栏电话左边多一个按钮。
// 新开的时候，现在这段收进「以前的」，随时能点回来接着说。字卡库、收藏、设置都不动

(function(){
  if(!Array.isArray(S.chats))S.chats=[];
  if(!S.chatCur||typeof S.chatCur!=='object')S.chatCur={id:uid(),at:S.cards.length?S.cards[0].at:Date.now()};
  save();
})();
var CH_IC='<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 4h14a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-9l-5 4v-4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z"/><path d="M12 7.5v6M9 10.5h6"/></svg>';

// 标题：这段里你说的第一句；没有就拿第一张字


// 换对话前把他正在回的、正在输入的、引用条都停掉






(function(){
  var top=document.querySelector('.chat-top');if(!top||$('btnChats'))return;
  var b=document.createElement('button');b.type='button';b.className='ico';b.id='btnChats';
  b.setAttribute('aria-label','新开对话');b.innerHTML=CH_IC;
  b.addEventListener('click',openChats);
  var call=$('btnCall');
  if(call&&call.parentNode===top)top.insertBefore(b,call);else top.appendChild(b);
})();

}catch(e){console.error("[zika] js/chats.js",e)}

/* ===== js/daily.js ===== */
try{
dailyPick=function(){
  var pool=tagPool('每日一句');
  if(!pool.length)return '';
  var d=new Date(),h=(d.getFullYear()*10000+(d.getMonth()+1)*100+d.getDate())>>>0;
  // 打散一下，不然相邻两天会挑到挨着的两句
  h=Math.imul(h^(h>>>16),0x45d9f3b)>>>0;h=Math.imul(h^(h>>>16),0x45d9f3b)>>>0;h=(h^(h>>>16))>>>0;
  return pool[h%pool.length];
};
// 今日一句只从字卡库「氛围感 → 每日一句」里挑，按日子随机，一天之内不变；空着就提示去加，不再从主字卡里挑
// 回复时间：最快、最慢都能拉到 10 分钟（照 milk），一分钟以上显示成「几分几秒」


var _rhDaily=renderHome;
renderHome=function(){
  _rhDaily();
  var q=$('qText');if(!q)return;
  var t=dailyPick();
  q.textContent=t||'字卡库「氛围感 → 每日一句」还空着，去加几句吧。';
};
if(typeof L4_HINT==='object')L4_HINT['每日一句']='主页「今日一句」每天从这里随机挑一句，一天之内不变。这里空着的话主页会提示你来加。';

// 回复时间最长 10 分钟
var REPLY_MAX_SEC=600;
var _fmtDaily=fmtPref;
fmtPref=function(k,v){
  if(k==='replyMin'||k==='replyMax'){
    v=Math.round(+v||0);
    if(v<60)return v+' 秒';
    var m=Math.floor(v/60),s=v%60;
    return s?m+' 分 '+s+' 秒':m+' 分钟';
  }
  return _fmtDaily(k,v);
};
var _orsDaily=openReplySet;
openReplySet=function(){
  _orsDaily();
  ['replyMin','replyMax'].forEach(function(k){
    var r=sheetBody.querySelector('input[type=range][data-k="'+k+'"]');if(!r)return;
    r.max=String(REPLY_MAX_SEC);r.value=S.prefs[k];
    var b=sheetBody.querySelector('[data-v="'+k+'"]');if(b)b.textContent=fmtPref(k,+S.prefs[k]);
  });
};

renderHome();

}catch(e){console.error("[zika] js/daily.js",e)}

/* ===== js/mist.js ===== */
try{

// 雾蓝：加进「材质与配色」的色板里

LOOK_T.mist={n:'雾蓝',accent:'#3d6a8a',bgA:'#eef2f4',bgB:'#d9e2e8',ink:'#22303c',sub:'#7d8c98'};
if(typeof MIST_KEEP!=='undefined'&&MIST_KEEP&&S.theme!=='mist'){S.theme='mist';save()}
applyLook();

}catch(e){console.error("[zika] js/mist.js",e)}

/* ===== js/look2.js ===== */
try{

// 三个老配色重新调过颜色，色板圆点和手机顶上那条颜色跟着变

LOOK_T.paper={n:'米白',accent:'#9a6b4f',bgA:'#f4efe6',bgB:'#e6dccd',ink:'#2f2720',sub:'#8c7d6c'};
LOOK_T.rose={n:'玫瑰',accent:'#a4565e',bgA:'#f6ecea',bgB:'#e9d6d3',ink:'#3b2427',sub:'#9a8183'};
LOOK_T.sage={n:'青草',accent:'#557258',bgA:'#eef1ea',bgB:'#dbe3d6',ink:'#25302a',sub:'#7c8a7e'};
applyLook();

}catch(e){console.error("[zika] js/look2.js",e)}

/* ===== js/icons2.js ===== */
try{
ziSvg=function(k){return '<svg class="zi zi-'+k+'" viewBox="0 0 24 24" aria-hidden="true">'+ZI[k]+'</svg>'};
// 图标换成细线小图，文艺一点：主页拱窗、传讯羽毛笔（插在墨水瓶里）、字卡库翻开的书、收藏小花枝、朋友圈拍立得、信箱封蜡信、塔罗月亮
// 自己在「板块图标」里换过的照旧用自己的；点「默认」回到这套线条图

var ZI={
  home:'<path d="M6 21V10a6 6 0 0 1 12 0v11"/><path d="M4 21h16"/><path d="M12 4v17M6 13h12"/>',
  chat:'<path d="M5 3l12 14"/><path d="M5 3c4.5-.5 9 2 10.5 6.5l-2.2.3 1 1.8-2.6-.2.6 1.4"/><path d="M5 3c-.6 3 .8 5.8 3.6 7.6"/><path d="M15 17.5v-1.5h4v1.5"/><path d="M13.5 17.5h7l-.8 3.5h-5.4z"/>',
  lib:'<path d="M12 6.5C10 5 7 4.5 3.5 5v13c3.5-.5 6.5 0 8.5 1.5 2-1.5 5-2 8.5-1.5V5C17 4.5 14 5 12 6.5z"/><path d="M12 6.5v13"/>',
  fav:'<path d="M12 21V9.5"/><path d="M12 15c-3.2 0-5.2-2-5.2-5.2 3.2 0 5.2 2 5.2 5.2z"/><path d="M12 12.5c0-3 2-5 5-5 0 3-2 5-5 5z"/><circle cx="12" cy="6" r="1.8"/>',
  moments:'<rect x="4" y="3.5" width="16" height="17" rx="1.5"/><path d="M4 15.5h16"/><circle cx="12" cy="9.5" r="2.6"/>',
  mail:'<rect x="3" y="5.5" width="18" height="13" rx="1.5"/><path d="M3.5 6.5l8.5 6.5 8.5-6.5"/><circle cx="12" cy="14.6" r="2.1" fill="currentColor" stroke="none"/>',
  tarot:'<path d="M19.5 14.5A8 8 0 1 1 9.5 4.5a6.5 6.5 0 0 0 10 10z"/><path d="M17.5 3.5v3M16 5h3"/>',
  set:'<path d="M4.5 7.5h9M18 7.5h1.5M4.5 16.5h1.5M10 16.5h9.5"/><circle cx="15.8" cy="7.5" r="2"/><circle cx="8" cy="16.5" r="2"/>',
  call:'<path d="M5.5 4h3l2 5-2.5 1.5a11 11 0 0 0 5.5 5.5L15 13.5l5 2v3a1.5 1.5 0 0 1-1.5 1.5A15.5 15.5 0 0 1 4 5.5 1.5 1.5 0 0 1 5.5 4z"/>',
  chats:'<path d="M5 5h14a1.5 1.5 0 0 1 1.5 1.5v9A1.5 1.5 0 0 1 19 17h-8l-4.5 3.5V17H5a1.5 1.5 0 0 1-1.5-1.5v-9A1.5 1.5 0 0 1 5 5z"/><path d="M12 8.5v5M9.5 11h5"/>',
  pen:'<path d="M5 19l1-4 9-9 3 3-9 9z"/>'
};

var _icHTMLz=icHTML;
icHTML=function(k){
  var v=S.prefs.icons&&S.prefs.icons[k];
  if(v||!ZI[k])return _icHTMLz(k);
  return ziSvg(k);
};
var _oisZ=openIconSet;
openIconSet=function(){
  _oisZ();
  sheetBody.querySelectorAll('.icrow input').forEach(function(i){i.placeholder='默认线条'});
  var h=sheetBody.querySelector('.hint');
  if(h)h.textContent='侧栏和主页入口用同一套。默认是线条小图，也可以填一个符号、emoji，或者换成图片。点「默认」回到线条图。';
};
(function(){
  var s=$('btnSet');if(s)s.innerHTML=ziSvg('set');
  var c=$('btnCall');if(c)c.innerHTML=ziSvg('call');
  var ch=$('btnChats');if(ch)ch.innerHTML=ziSvg('chats');
  document.querySelectorAll('.hp-cam').forEach(function(e){e.innerHTML=ziSvg('pen')});
})();
applyIcons();
}catch(e){console.error("[zika] js/icons2.js",e)}

/* ===== js/icons3.js ===== */
try{
ziFoot=function(el,k,t){el.innerHTML=ziSvg(k)+'<span>'+t+'</span>'};
ziPaintFoot=function(){
  var d=$('sbDark');if(d){var dk=!!S.prefs.dark;ziFoot(d,dk?'sun':'moon',dk?'日间':'夜间')}
  var s=$('sbSet');if(s)ziFoot(s,'set','设置');
  document.querySelectorAll('.sb-foot .sb-mini').forEach(function(b){if(!b.id&&b.textContent.indexOf('字体')>=0)ziFoot(b,'font','字体')});
  var h=$('btnSet');if(h&&!h.querySelector('svg'))h.innerHTML=ziSvg('set');
};
// 侧栏底下那排：设置、夜间/日间、字体，也换成细线小图，跟 icons2 一套

ZI.sun='<circle cx="12" cy="12" r="3.6"/><path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6L7 7M17 17l1.4 1.4M5.6 18.4L7 17M17 7l1.4-1.4"/>';
ZI.moon='<path d="M19 14.5A7.5 7.5 0 1 1 9.5 5a6 6 0 0 0 9.5 9.5z"/>';
ZI.font='<path d="M5.5 19L11.5 5l6 14"/><path d="M7.8 13.6h7.4"/><path d="M3.5 19h4M15.5 19h4"/>';
(function(){
  var st=document.createElement('style');
  st.textContent='.sb-mini{display:inline-flex;align-items:center;justify-content:center;gap:6px}.sb-mini svg.zi{flex:0 0 auto;width:15px;height:15px}';
  document.head.appendChild(st);
})();


// 切日夜的时候原来会把按钮写回文字，这里跟着再画一遍
var _alZ3=applyLook;
applyLook=function(){_alZ3();ziPaintFoot()};
ziPaintFoot();
}catch(e){console.error("[zika] js/icons3.js",e)}

/* ===== js/icons4.js ===== */
try{

// 图标整套重换：不再自己画，改用 Lucide 开源图标（ISC 协议，个人和商用都能用，https://lucide.dev）
// 线条照旧压细到 1.4，跟着配色走。主页台灯、传讯羽毛、字卡库翻开的书、收藏小花、朋友圈相机、信箱拆开的信、塔罗星月

var ZI4={
  home:'<path d="M10.293 2.293a1 1 0 0 1 1.414 0l2.5 2.5 5.994 1.227a1 1 0 0 1 .506 1.687l-7 7a1 1 0 0 1-1.687-.506l-1.227-5.994-2.5-2.5a1 1 0 0 1 0-1.414z"/><path d="m14.207 4.793-3.414 3.414"/><path d="M3 20a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z"/><path d="m9.086 6.5-4.793 4.793a1 1 0 0 0-.18 1.17L7 18"/>',
  chat:'<path d="M14.086 18.412A2 2 0 0 1 12.67 19H5v-7.672a2 2 0 0 1 .586-1.414L11.75 3.75a6 6 0 1 1 8.49 8.49z"/><path d="M16 8 2 22"/><path d="M17.488 15H9"/>',
  lib:'<path d="M12 5v16"/><path d="M16 13h2"/><path d="M16 9h2"/><path d="M20.001 19A2 2 0 0 0 22 17V5a2 2 0 0 0-1.999-2L16 3.002A5 5 0 0 0 12 5a5 5 0 0 0-4-2H4a2 2 0 0 0-2 2v12a2 2 0 0 0 1.999 2H8a5 5 0 0 1 4 2 5 5 0 0 1 4-2z"/><path d="M6 13h2"/><path d="M6 9h2"/>',
  fav:'<path d="M12 5a3 3 0 1 1 3 3m-3-3a3 3 0 1 0-3 3m3-3v1M9 8a3 3 0 1 0 3 3M9 8h1m5 0a3 3 0 1 1-3 3m3-3h-1m-2 3v-1"/><circle cx="12" cy="8" r="2"/><path d="M12 10v12"/><path d="M12 22c4.2 0 7-1.667 7-5-4.2 0-7 1.667-7 5Z"/><path d="M12 22c-4.2 0-7-1.667-7-5 4.2 0 7 1.667 7 5Z"/>',
  moments:'<path d="M13.997 4a2 2 0 0 1 1.76 1.05l.486.9A2 2 0 0 0 18.003 7H20a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1.997a2 2 0 0 0 1.759-1.048l.489-.904A2 2 0 0 1 10.004 4z"/><circle cx="12" cy="13" r="3"/>',
  mail:'<path d="M21.2 8.4c.5.38.8.97.8 1.6v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V10a2 2 0 0 1 .8-1.6l8-6a2 2 0 0 1 2.4 0l8 6Z"/><path d="m22 10-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 10"/>',
  tarot:'<path d="M18 5h4"/><path d="M20 3v4"/><path d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401"/>',
  set:'<path d="M14 17H5"/><path d="M19 7h-9"/><circle cx="17" cy="17" r="3"/><circle cx="7" cy="7" r="3"/>',
  call:'<path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384"/>',
  chats:'<path d="M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z"/><path d="M12 8v6"/><path d="M9 11h6"/>',
  pen:'<path d="M13 21h8"/><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/>',
  sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/>',
  moon:'<path d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401"/>',
  font:'<path d="M12 4v16"/><path d="M4 7V5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2"/><path d="M9 20h6"/>'
};
for(var _k4 in ZI4)ZI[_k4]=ZI4[_k4];
(function(){
  var s=$('btnSet');if(s)s.innerHTML=ziSvg('set');
  var c=$('btnCall');if(c)c.innerHTML=ziSvg('call');
  var ch=$('btnChats');if(ch)ch.innerHTML=ziSvg('chats');
  document.querySelectorAll('.hp-cam').forEach(function(e){e.innerHTML=ziSvg('pen')});
})();
applyIcons();
if(typeof ziPaintFoot==='function')ziPaintFoot();

}catch(e){console.error("[zika] js/icons4.js",e)}

/* ===== js/title.js ===== */
try{
ztStar=function(c){return '<svg class="zs '+c+'" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 0C12.6 7 17 11.4 24 12C17 12.6 12.6 17 12 24C11.4 17 7 12.6 0 12C7 11.4 11.4 7 12 0Z"/></svg>'};
ztPaint=function(){
  var a=S.me.name||'我',b=taName(),m=$('ztMe'),t=$('ztTa'),z=$('zt');
  if(!m||!t||!z)return;
  m.textContent=a;t.textContent=b;
  z.classList.toggle('long',(a+b).length>7);
};
// 主页名字：「我的名字 × 他的名字」做成一行标题字，名字跟着设置里的名字走


(function(){
  var pair=document.querySelector('.hh-pair');if(!pair||$('zt'))return;
  var z=document.createElement('div');z.id='zt';z.className='zt';
  z.innerHTML='<div class="zt-en"><i></i><span>ALWAYS · TOGETHER</span><i></i></div>'
    +'<div class="zt-nm"><span id="ztMe"></span><em>×</em><span id="ztTa"></span>'+ztStar('zs1')+ztStar('zs2')+ztStar('zs3')+'</div>'
    +'<div class="zt-ft"><i></i>'+ztStar('zs4')+'<i></i></div>';
  pair.parentNode.insertBefore(z,pair.nextSibling);
})();

var _pnZt=paintNames;
paintNames=function(){_pnZt();ztPaint()};
ztPaint();
}catch(e){console.error("[zika] js/title.js",e)}

/* ===== js/serif.js ===== */
try{

// 全局字体列表里，默认那项写清楚是思源宋体细体

(function(){var f=FONTS.filter(function(x){return x.id==='serif'})[0];if(f){f.n='宋体';f.d='思源宋体 · 细'}})();

}catch(e){console.error("[zika] js/serif.js",e)}

/* ===== js/icons5.js ===== */
try{
icMode=function(){return S.prefs.icStyle==='roman'?'roman':'seal'};
icMark=function(k,n){
  if(icMode()==='roman'){
    var r=typeof n==='number'?IC_ROMAN[n]:IC_ROMAN[IC_ORDER.indexOf(k)];
    return '<span class="zrm">'+(r||'·')+'</span>';
  }
  return '<span class="zsl">'+esc(IC_SEAL[k]||'·')+'</span>';
};
// 板块图标两套能切：A 小印章（一个字盖在小方章里），B 罗马数字（像书的目录）。设置 → 板块图标 里切
// 自己在「板块图标」里单独换过的那一项照旧用自己的

var IC_ORDER=['home','chat','lib','fav','moments','mail','tarot'];
var IC_SEAL={home:'家',chat:'讯',lib:'字',fav:'藏',moments:'圈',mail:'信',tarot:'星'};
var IC_ROMAN=['I','II','III','IV','V','VI','VII'];
if(S.prefs.icStyle!=='seal'&&S.prefs.icStyle!=='roman'){S.prefs.icStyle='seal';save()}


var _icHTML5=icHTML;
icHTML=function(k){
  var v=S.prefs.icons&&S.prefs.icons[k];
  if(v||IC_ORDER.indexOf(k)<0)return _icHTML5(k);
  return icMark(k);
};
var _apIc5=applyIcons;
applyIcons=function(){
  document.documentElement.dataset.ic=icMode();
  _apIc5();
  // 主页四个入口按自己的顺序数 I ~ IV，不跟侧栏的号
  if(icMode()!=='roman')return;
  document.querySelectorAll('.entry[data-go]').forEach(function(e,i){
    var k=e.dataset.go,v=S.prefs.icons&&S.prefs.icons[k];if(v)return;
    var s=e.querySelector('.ei');if(s)s.innerHTML=icMark(k,i);
  });
};
var _oisIc5=openIconSet;
openIconSet=function(){
  _oisIc5();
  var f=document.createElement('div');f.className='field';
  f.innerHTML='<label>样式</label><div class="seg" id="icSeg"><button type="button" data-v="seal">A · 小印章</button><button type="button" data-v="roman">B · 罗马数字</button></div>';
  f.querySelectorAll('[data-v]').forEach(function(b){b.classList.toggle('on',b.dataset.v===icMode())});
  f.querySelector('#icSeg').addEventListener('click',function(e){
    var b=e.target.closest('[data-v]');if(!b||b.dataset.v===icMode())return;
    S.prefs.icStyle=b.dataset.v;save();applyIcons();
    openIconSet();addBack();
  });
  sheetBody.insertBefore(f,sheetBody.firstChild);
  sheetBody.querySelectorAll('.icrow input').forEach(function(i){i.placeholder='默认'});
  var h=sheetBody.querySelector('.hint');
  if(h)h.textContent='侧栏和主页入口用同一套。A 是一个字盖在小方章里，B 是罗马数字，像书的目录。下面也能单独给某一项填符号或换图片，点「默认」回到 A / B。';
};
SET_GROUPS.forEach(function(g){g[1].forEach(function(i){
  if(i[0]==='openIconSet')i[2]=function(){return icMode()==='roman'?'罗马数字':'小印章'};
})});
applyIcons();
}catch(e){console.error("[zika] js/icons5.js",e)}

/* ===== js/icons6.js ===== */
try{
zfBtn=function(el,ch,t){el.innerHTML='<span class="zsl">'+ch+'</span><span>'+t+'</span>'};
// 侧栏底下：夜间/日间、设置 改成跟板块图标配套的小方章；字体按钮去掉
// 设置 → 外观 → 全局字体 还在，改字体、改字号、导入字体都从那里进

(function(){
  document.querySelectorAll('.sb-foot .sb-mini').forEach(function(b){
    if(!b.id&&b.textContent.indexOf('字体')>=0)b.remove();
  });
})();

ziPaintFoot=function(){
  var d=$('sbDark');
  if(d){var dk=!!S.prefs.dark;zfBtn(d,dk?'日':'夜',dk?'日间':'夜间')}
  var s=$('sbSet');if(s)zfBtn(s,'设','设置');
  var h=$('btnSet');if(h&&!h.querySelector('.zsl'))h.innerHTML='<span class="zsl">设</span>';
};
ziPaintFoot();

}catch(e){console.error("[zika] js/icons6.js",e)}

/* ===== js/v46.js ===== */
try{
spStar=function(){return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 0C12.6 7 17 11.4 24 12C17 12.6 12.6 17 12 24C11.4 17 7 12.6 0 12C7 11.4 11.4 7 12 0Z"/></svg>'};
// 传讯页：名字下面把「在线」和状态排成一行；通话按钮从顶栏挪到底栏；开屏重做

(function(){
  var who=document.querySelector('.chat-top .who');if(!who)return;
  var st=who.querySelector('.st'),ts=$('taSt');
  if(!st||!ts||who.querySelector('.strow'))return;
  var row=document.createElement('span');row.className='strow';
  st.parentNode.insertBefore(row,st);row.appendChild(st);row.appendChild(ts);
})();
(function(){
  var foot=document.querySelector('.chat-foot');if(!foot||$('fbar'))return;
  var sr=foot.querySelector('.send-row');if(!sr)return;
  var bar=document.createElement('div');bar.className='fbar';bar.id='fbar';
  foot.insertBefore(bar,sr);
  var call=$('btnCall');if(call)bar.appendChild(call);
})();
// 开屏改到 sw.js 那一版，v46 这段已删

}catch(e){console.error("[zika] js/v46.js",e)}

/* ===== js/sticker.js ===== */
try{
skIsImg=function(s){return /^(data:image|https?:\/\/)/.test(String(s||''))};
skPool=function(){return tagPool(SK_TAG).filter(skIsImg)};
skAll=function(){return S.lib.filter(function(x){return x.tag===SK_TAG&&skIsImg(x.text)})};
taSticker=function(){
  var p=skPool();if(!p.length)return false;
  addReplyCard({id:uid(),from:'ta',type:'sticker',img:pickOne(p),text:'',at:Date.now()});
  return true;
};
skSend=function(url){
  if(!skIsImg(url))return;
  S.cards.push({id:uid(),from:'me',type:'sticker',img:url,text:'',at:Date.now()});
  if(!save()){S.cards.pop();alert('存不下了。表情包比字卡占地方大很多，删几张再试。');return}
  renderChat();updateNav();
  skClose();
  if(typeof scheduleReply==='function')scheduleReply();
};
skAdd=function(){
  pickImage(function(src){shrinkSafe(src,260,false,0.8).then(function(u){
    if(!u){alert('这张读不出来，换一张试试。');return}
    S.lib.push({id:uid(),tag:SK_TAG,text:u});
    if(typeof lbUnempty==='function')lbUnempty(SK_TAG);
    if(!save()){S.lib.pop();save();alert('存不下了。表情包占地方比字卡大很多，先删几张。');return}
    refreshLib();skPaint();
  })});
};
skPaint=function(){
  var g=$('skpGrid');if(!g)return;
  var list=skAll();
  if(!list.length){g.innerHTML='<p class="skp-none">还没有表情包。<br>点「＋ 相册」从手机里选，或者点「管理」去字卡库贴图片链接。</p>';return}
  g.innerHTML=list.map(function(x){
    return '<button type="button" data-sk="pick" data-u="'+esc(x.text)+'"><img src="'+esc(x.text)+'" alt="表情" loading="lazy"></button>';
  }).join('');
};
skToggle=function(){var p=$('skp');if(!p)return;if(p.classList.contains('on')){skClose();return}skPaint();p.classList.add('on')};
skClose=function(){var p=$('skp');if(p)p.classList.remove('on')};
// 表情包：字卡库「氛围感 → 表情包」里存图；底栏点一下挑一张递过去；他也会按概率发表情包，概率在设置里调
// 拍一拍和表情包不代替回字：掲中了先发过来，后面照旧接着回字卡

var SK_TAG='表情包';
(function(){
  if(ATMO_TAGS.indexOf(SK_TAG)<0){ATMO.push([SK_TAG,SK_TAG]);ATMO_TAGS.push(SK_TAG)}
  if(SPECIAL.indexOf(SK_TAG)<0)SPECIAL.push(SK_TAG);
  if(S.prefs.stickerRate===undefined||S.prefs.stickerRate===null)S.prefs.stickerRate=12;
  P_DEF.stickerRate=12;
  save();
})();
if(typeof L4_HINT==='object')L4_HINT[SK_TAG]='下面「新增」里一行贴一个图片链接，或者在传讯页点表情按钮从相册选。你和他都从这里发。';




// 聊天里画成图：没有气泡底，头像、时间、已读、撕掉还在
var _ceSk=cardEl;
cardEl=function(c){
  var el=_ceSk(c);
  if(!c||c.type!=='sticker'||!c.img||!el||!el.querySelector)return el;
  var card=el.classList&&el.classList.contains('card')?el:el.querySelector('.card');
  if(!card)return el;
  card.classList.add('sk');
  var b=card.querySelector('.body');
  if(b){
    b.textContent='';
    var im=document.createElement('img');im.className='sk-img';im.src=c.img;im.alt='表情';im.loading='lazy';
    b.appendChild(im);
  }
  return el;
};

// 字卡库里也显示缩略图，而不是一长串链接
var _l4cSk=l4CardEl;
l4CardEl=function(x,badge){
  var d=_l4cSk(x,badge);
  if(!x||x.tag!==SK_TAG||!skIsImg(x.text))return d;
  var t=d.querySelector('.tx');
  if(t){t.textContent='';var im=document.createElement('img');im.className='sk-th';im.src=x.text;im.alt='表情';im.loading='lazy';t.appendChild(im)}
  return d;
};

// 他发一张表情包

// 照 v25 那套流程，只是拍一拍和表情包不再代替回字，发完接着回字卡
simulateReply=function(token){
  if(token!==replyRun)return;
  var p=S.prefs,changed=false;
  S.cards.forEach(function(c){if(c.from==='me'&&!c.read){c.read=true;changed=true}});
  if(changed){save();renderChat()}
  if(p.readNo&&Math.random()*100<(+p.readNoRate)){showTyping(false);return}
  var pool=libPool(),delay=0;
  function pre(fn){
    delay+=rnd(REPLY.waitMin,REPLY.waitMax);
    (function(d){setTimeout(function(){
      if(token!==replyRun)return;
      showTyping(false);fn();
      if(pool.length)showTyping(true);
    },d)})(delay);
  }
  if(Math.random()*100<(+p.pokeRate))pre(taPoke);
  if(Math.random()*100<(+p.stickerRate)&&skPool().length)pre(taSticker);
  if(!pool.length){if(!delay)showTyping(false);return}
  showTyping(true);
  var mine=S.cards.filter(function(c){return c.from==='me'&&!c.type&&c.text}).slice(-10);
  var n=replyCount();
  for(var i=0;i<n;i++){
    delay+=rnd(REPLY.waitMin,REPLY.waitMax);
    (function(i,d){
      setTimeout(function(){
        if(token!==replyRun)return;
        var c={id:uid(),from:'ta',text:comboText(pool),at:Date.now()};
        if(i===0&&mine.length&&Math.random()*100<(+p.quoteRate)){
          var m=pickOne(mine);c.quote={name:S.me.name||'我',text:m.text};
        }
        addReplyCard(c);
        if(i===n-1)showTyping(false);
      },d);
    })(i,delay);
  }
};

// 我递一张

// 从相册加一张，压到 260px 再存


// 底栏的面板
(function(){
  var foot=document.querySelector('.chat-foot'),bar=$('fbar');if(!foot||!bar||$('skp'))return;
  var p=document.createElement('div');p.className='skp';p.id='skp';
  p.innerHTML='<div class="skp-hd"><span>表情包</span><span class="sp"></span><button type="button" data-sk="add">＋ 相册</button><button type="button" data-sk="lib">管理</button></div><div class="skp-grid" id="skpGrid"></div>';
  foot.insertBefore(p,bar);
  p.addEventListener('click',function(e){
    var b=e.target.closest('[data-sk]');if(!b)return;
    var a=b.dataset.sk;
    if(a==='add'){skAdd();return}
    if(a==='lib'){skClose();L4.tab='atmo';L4.sub=SK_TAG;go('lib');return}
    if(a==='pick'){skSend(b.dataset.u)}
  });
  var b=document.createElement('button');b.type='button';b.className='ico';b.id='btnSk';
  b.setAttribute('aria-label','表情包');b.innerHTML='<span class="zsl">表</span>';
  b.addEventListener('click',skToggle);
  bar.insertBefore(b,bar.firstChild);
})();



input.addEventListener('focus',skClose);

// 设置 → 回复 · 回信 · 通话 里加一条概率
var _orsSk=openReplySet;
openReplySet=function(){
  _orsSk();
  var anchor=sheetBody.querySelector('input[type=range][data-k="pokeRate"]');
  if(!anchor)return;
  var host=anchor.closest('.field');if(!host)return;
  var box=document.createElement('div');box.className='field';
  box.innerHTML='<label>发表情包概率</label><div class="rg"><input type="range" min="0" max="100" step="1"><b></b></div>';
  var r=box.querySelector('input'),v=box.querySelector('b');
  function paint(){r.value=+S.prefs.stickerRate||0;v.textContent=(+S.prefs.stickerRate||0)+'%'}
  r.addEventListener('input',function(){S.prefs.stickerRate=+r.value;paint()});
  r.addEventListener('change',function(){save()});
  paint();
  host.parentNode.insertBefore(box,host.nextSibling);
  var h=document.createElement('p');h.className='hint';
  h.textContent='拍一拍和表情包不代替回字：掲中了先发过来，后面照旧接着回字卡。表情包从字卡库「氛围感 → 表情包」里挑，那里空着就跳过。';
  box.parentNode.insertBefore(h,box.nextSibling);
};
renderChat();

}catch(e){console.error("[zika] js/sticker.js",e)}

/* ===== js/sw.js ===== */
try{

// 开屏：把整个 #splash 换成新的一个，这样之前几版的计时器拿着的是旧节点，不会半路把它收起来
// 名字跟着设置里的名字走；点一下跳过
// 外层类名叫 spw：原来叫 sw，和设置里的色点按钮 .sw 撞了，把色点拽到标题上面去了

(function(){
  var old=document.getElementById('splash');if(!old)return;
  var star='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 0C12.6 7 17 11.4 24 12C17 12.6 12.6 17 12 24C11.4 17 7 12.6 0 12C7 11.4 11.4 7 12 0Z"/></svg>';
  var a=S.me.name||'我',b=taName(),lg=(a+b).length>7;
  var sp=document.createElement('div');sp.id='splash';
  sp.innerHTML='<div class="spw'+(lg?' long':'')+'">'
    +'<i class="sw-c c1"></i><i class="sw-c c2"></i><i class="sw-c c3"></i><i class="sw-c c4"></i>'
    +'<i class="sw-d d1"></i><i class="sw-d d2"></i><i class="sw-d d3"></i>'
    +'<div class="sw-en"><i></i><span>ALWAYS · TOGETHER</span><i></i></div>'
    +'<div class="sw-wrap"><div class="sw-nm">'+esc(a)+'<em>×</em>'+esc(b)+'</div><i class="sw-tip"></i></div>'
    +'<div class="sw-ft"><i></i>'+star+'<i></i></div>'
    +'<div class="sw-tt">字 卡 传 讯</div>'
    +'</div>';
  old.parentNode.replaceChild(sp,old);
  var done=false;
  function end(){
    if(done)return;done=true;
    sp.classList.add('out');
    setTimeout(function(){sp.style.display='none'},700);
  }
  sp.addEventListener('click',end);
  setTimeout(end,2500);
})();

}catch(e){console.error("[zika] js/sw.js",e)}

/* ===== js/v50.js ===== */
try{

// 他也会收藏你的字卡，概率可调；设置里去掉字卡分组（字卡库那边本来就能管）

(function(){
  if(S.prefs.favRate===undefined||S.prefs.favRate===null)S.prefs.favRate=10;
  P_DEF.favRate=10;
  save();
})();

// 设置：字卡分组那一项拿掉，空了的分组也收起来
(function(){
  SET_GROUPS.forEach(function(g){
    g[1]=g[1].filter(function(i){return i[0]!=='l4GroupsSheet'&&i[0]!=='openGroups'});
  });
  for(var i=SET_GROUPS.length-1;i>=0;i--)if(!SET_GROUPS[i][1].length)SET_GROUPS.splice(i,1);
})();

// 他收藏：每次他要回你之前掲一次，掲中了就从你最近几张里收藏一张
var _srFav=simulateReply;
simulateReply=function(token){
  if(token===replyRun&&Math.random()*100<(+S.prefs.favRate||0)){
    var mine=S.cards.filter(function(c){return c.from==='me'&&!c.type&&c.text&&!c.taFav}).slice(-6);
    if(mine.length){pickOne(mine).taFav=true;save()}
  }
  _srFav(token);
};
// 收藏过的那张，右上角多一颗星
var _ceFav=cardEl;
cardEl=function(c){
  var el=_ceFav(c);
  if(!c||c.from!=='me'||!c.taFav||!el||!el.querySelector)return el;
  var h=el.querySelector('.head');
  if(h&&!h.querySelector('.tafv')){
    var s=document.createElement('span');s.className='tafv';s.textContent='★';
    s.title=taName()+' 收藏了这张';
    h.appendChild(s);
  }
  return el;
};

// 设置 → 回复 · 回信 · 通话：引用那条后面再加一条
var _orsFav=openReplySet;
openReplySet=function(){
  _orsFav();
  var a=sheetBody.querySelector('input[type=range][data-k="quoteRate"]');
  if(!a)return;
  var host=a.closest('.field');if(!host)return;
  var box=document.createElement('div');box.className='field';
  box.innerHTML='<label>收藏你的字卡</label><div class="rg"><input type="range" min="0" max="100" step="1"><b></b></div>';
  var r=box.querySelector('input'),v=box.querySelector('b');
  function paint(){r.value=+S.prefs.favRate||0;v.textContent=(+S.prefs.favRate||0)+'%'}
  r.addEventListener('input',function(){S.prefs.favRate=+r.value;paint()});
  r.addEventListener('change',function(){save()});
  paint();
  host.parentNode.insertBefore(box,host.nextSibling);
  var h=document.createElement('p');h.className='hint';
  h.textContent='他回你之前掲一次。掲中了就从你最近几张里收藏一张，那张字卡右上角会多一颗星。';
  box.parentNode.insertBefore(h,box.nextSibling);
};
renderChat();

}catch(e){console.error("[zika] js/v50.js",e)}

/* ===== js/v51.js ===== */
try{

// 字卡库的表情包分组：「新增」里能从相册选图；底栏的表情包和通话收进「⋯」


// ── 字卡库 → 氛围感 → 表情包 → 新增：先给一个从相册选的按钮，下面还能贴链接 ──
var _l4AddV51=l4AddSheet;
l4AddSheet=function(){
  if(typeof L4==='undefined'||L4.tab!=='atmo'||L4.sub!==SK_TAG){_l4AddV51();return}
  var w=document.createElement('div');
  w.innerHTML='<button type="button" class="primary" id="skUp" style="width:100%;height:50px;letter-spacing:.16em">＋ 从相册选图</button>'
    +'<p class="hint">选中的图会压到 260px 再存，省地方。可以一张一张加。</p>'
    +'<div class="sec">或者贴图片链接</div>'
    +'<textarea id="skTa" class="l4-ta" placeholder="一行一个链接，https:// 开头…" style="min-height:120px"></textarea>'
    +'<div class="l4-cnt" id="skCnt">0 个链接</div>'
    +'<button type="button" class="primary" id="skOk" style="width:100%">添 加</button>';
  var ta=w.querySelector('#skTa'),cnt=w.querySelector('#skCnt');
  function lines(){return uniqArr(ta.value.split('\n').map(function(s){return s.trim()}).filter(skIsImg))}
  function paint(){cnt.textContent=lines().length+' 个链接'}
  ta.addEventListener('input',paint);
  w.querySelector('#skUp').addEventListener('click',function(){skAdd()});
  w.querySelector('#skOk').addEventListener('click',function(){
    var ls=lines();if(!ls.length){alert('没找到可用的图片链接。要 https:// 开头。');return}
    var have={},add=0;
    S.lib.forEach(function(x){if(x.tag===SK_TAG)have[x.text]=1});
    ls.forEach(function(t){if(have[t])return;have[t]=1;S.lib.push({id:uid(),tag:SK_TAG,text:t});add++});
    if(typeof lbUnempty==='function')lbUnempty(SK_TAG);
    if(!save()){alert('存不下了，先删几张。');return}
    refreshLib();if(typeof skPaint==='function')skPaint();closeSheet();
    if(add<ls.length)alert('加进去 '+add+' 张，其余本来就有。');
  });
  openSheet('添加表情包',w);
};

// ── 底栏：表情包和通话收进一个「⋯」 ──
(function(){
  var bar=$('fbar');if(!bar||$('btnMore'))return;
  var sk=$('btnSk'),call=$('btnCall');
  var wrap=document.createElement('div');wrap.className='fb-wrap';wrap.id='fbWrap';
  if(sk)wrap.appendChild(sk);
  if(call)wrap.appendChild(call);
  var m=document.createElement('button');m.type='button';m.className='ico';m.id='btnMore';
  m.setAttribute('aria-label','更多');m.innerHTML='<span class="zsl">⋯</span>';
  m.addEventListener('click',function(){
    var on=bar.classList.toggle('on');
    if(!on&&typeof skClose==='function')skClose();
  });
  bar.insertBefore(m,bar.firstChild);
  bar.insertBefore(wrap,m.nextSibling);
  input.addEventListener('focus',function(){bar.classList.remove('on')});
})();

}catch(e){console.error("[zika] js/v51.js",e)}

/* ===== js/v52.js ===== */
try{

// 把「⋯」那一排挪到输入框左边，和输入框、递出去排在同一行

(function(){
  var bar=$('fbar'),sr=document.querySelector('.chat-foot .send-row');
  if(!bar||!sr||bar.parentNode===sr)return;
  sr.insertBefore(bar,sr.firstChild);
})();

}catch(e){console.error("[zika] js/v52.js",e)}

/* ===== js/v54.js ===== */
try{
swIm=function(el,k,v){if(el)el.style.setProperty(k,v,'important')};
swFix=function(){
  if(typeof sheetBody==='undefined'||!sheetBody)return;
  var sw=sheetBody.querySelector('.swatches');if(!sw)return;
  swIm(sw,'display','flex');swIm(sw,'flex-wrap','nowrap');swIm(sw,'align-items','center');
  swIm(sw,'gap','14px');swIm(sw,'transform','none');swIm(sw,'padding','0');
  sw.querySelectorAll('.sw').forEach(function(b){
    swIm(b,'transform','none');swIm(b,'padding','0');
    swIm(b,'flex','0 0 34px');swIm(b,'width','34px');swIm(b,'height','34px');
    swIm(b,'border-radius','50%');swIm(b,'position','relative');
    swIm(b,'box-sizing','border-box');swIm(b,'aspect-ratio','1 / 1');
    var i=b.querySelector('i');
    if(i){swIm(i,'position','absolute');swIm(i,'inset','5px');swIm(i,'border-radius','50%')}
  });
};
// 色点回归正圆：开屏已经改名 .spw，这里只做一道兼容，清掉旧缓存里可能残留的偏移



(function(){
  if(!window.MutationObserver||typeof sheetBody==='undefined'||!sheetBody)return;
  new MutationObserver(function(){swFix()}).observe(sheetBody,{childList:true,subtree:true});
})();
swFix();

}catch(e){console.error("[zika] js/v54.js",e)}

/* ===== js/v55.js ===== */
try{

// v55 底栏照小红书私信那样排：⊕ 更多 ｜ 发送消息… ｜ 表情包 ｜ 发图片 ｜ 圆形发送

(function(){
  var foot=document.querySelector('.chat-foot'),sr=foot&&foot.querySelector('.send-row');
  var send=$('btnSend'),inp=$('input');
  if(!sr||!send||!inp||$('btnPlus'))return;
  var bar=$('fbar');
  var SVG={
    plus:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><circle cx="12" cy="12" r="9.3"/><path d="M12 8v8M8 12h8"/></svg>',
    emo:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="12" cy="12" r="9.2"/><path d="M8.2 14.2c1 1.5 2.3 2.2 3.8 2.2s2.8-.7 3.8-2.2"/><ellipse cx="9.1" cy="9.8" rx=".9" ry="1.2" fill="currentColor" stroke="none"/><ellipse cx="14.9" cy="9.8" rx=".9" ry="1.2" fill="currentColor" stroke="none"/></svg>',
    pic:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round" stroke-linecap="round"><path d="M4 4.8h16v12H9.6L6 20v-3.2H4z"/><circle cx="9" cy="9" r="1.4"/><path d="M4.6 15.6l4.6-3.8 3 2.4 3.4-3.4 4 4"/></svg>',
    send:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M3.4 20.4l17.4-7.5c.8-.4.8-1.5 0-1.8L3.4 3.6c-.7-.3-1.4.4-1.2 1.1L4.3 11l9 1-9 1-2.1 6.3c-.2.7.5 1.4 1.2 1.1z"/></svg>'
  };
  function mk(id,label,svg){var b=document.createElement('button');b.type='button';b.className='bi';b.id=id;b.setAttribute('aria-label',label);b.innerHTML=svg;return b}
  var plus=mk('btnPlus','更多',SVG.plus),emo=mk('btnEmo','表情包',SVG.emo),pic=mk('btnPic','发图片',SVG.pic);

  // ⊕ 里的格子：原来「⋯」里除表情包以外的按钮（通话等），点格子就等于点原按钮
  var pp=document.createElement('div');pp.className='plusp';pp.id='plusp';
  if(bar)bar.querySelectorAll('button').forEach(function(b){
    if(b.id==='btnMore'||b.id==='btnSk')return;
    var t=document.createElement('button');t.type='button';
    var i=document.createElement('i');i.innerHTML=b.innerHTML;
    var s=document.createElement('span');s.textContent=b.getAttribute('aria-label')||b.title||b.textContent.trim();
    t.appendChild(i);t.appendChild(s);
    t.addEventListener('click',function(){closePlus();b.click()});
    pp.appendChild(t);
  });
  foot.insertBefore(pp,sr);

  function closePlus(){pp.classList.remove('on');plus.classList.remove('on')}
  plus.addEventListener('click',function(){
    var on=!pp.classList.contains('on');
    if(typeof skClose==='function')skClose();
    pp.classList.toggle('on',on);plus.classList.toggle('on',on);
  });

  // 表情：开关原来的表情包面板
  if(typeof skClose==='function'){var _skc=skClose;skClose=function(){_skc();emo.classList.remove('on')}}
  emo.addEventListener('click',function(){
    closePlus();
    if(typeof skToggle==='function')skToggle();
    var p=$('skp');emo.classList.toggle('on',!!(p&&p.classList.contains('on')));
  });
  inp.addEventListener('focus',function(){closePlus();emo.classList.remove('on')});

  // 图片：从相册选一张，压到 640px 递过去
  pic.addEventListener('click',function(){
    closePlus();if(typeof skClose==='function')skClose();
    if(typeof pickImage!=='function'||typeof shrinkSafe!=='function')return;
    pickImage(function(src){shrinkSafe(src,640,false,0.8).then(function(u){
      if(!u){alert('这张读不出来，换一张试试。');return}
      S.cards.push({id:uid(),from:'me',type:'sticker',photo:true,img:u,text:'',at:Date.now()});
      if(!save()){S.cards.pop();alert('存不下了。图片很占地方，删掉几张旧的再试。');return}
      renderChat();updateNav();
      if(typeof scheduleReply==='function')scheduleReply();
    })});
  });

  // 排队：⊕ 输入框 表情 图片 发送
  sr.insertBefore(plus,inp);
  sr.appendChild(emo);sr.appendChild(pic);sr.appendChild(send);
  inp.placeholder='发送消息…';
  send.innerHTML=SVG.send;send.setAttribute('aria-label','递出去');
})();

// 照片在聊天里比表情包画大一点
var _ceV55=cardEl;
cardEl=function(c){
  var el=_ceV55(c);
  if(c&&c.photo&&el&&el.querySelector){
    var card=el.classList&&el.classList.contains('card')?el:el.querySelector('.card');
    if(card)card.classList.add('ph');
  }
  return el;
};
renderChat();

}catch(e){console.error("[zika] js/v55.js",e)}

/* ===== js/v56.js ===== */
try{
l4Top=function(){return (L4.tab==='main'||L4.sub===KAO_TAG||L4.sub===SK_TAG)?'reply':'atmo'};
l4Cnt=function(t){return S.lib.filter(function(x){return x.tag===t}).length};
skTileSheet=function(x){
  var w=document.createElement('div');
  w.innerHTML='<div class="skv"><img alt="表情"></div>'
    +'<button type="button" class="primary" data-k="send" style="width:100%">发 给 他</button>'
    +'<div class="two" style="margin-top:10px"><button type="button" class="ghost" data-k="off" style="flex:1">'+(x.off?'取消屏蔽':'屏蔽')+'</button><button type="button" class="ghost" data-k="rm" style="flex:1">删掉</button></div>'
    +'<p class="hint">屏蔽的表情包还在，只是'+esc(taName())+'不会发它。</p>';
  w.querySelector('img').src=x.text;
  w.addEventListener('click',function(e){
    var b=e.target.closest('[data-k]');if(!b)return;var k=b.dataset.k;
    if(k==='send'){closeSheet();go('chat');if(typeof skSend==='function')skSend(x.text);return}
    if(k==='off'){x.off=!x.off;refreshLib();if(typeof skPaint==='function')skPaint();closeSheet();return}
    if(k==='rm'){
      if(!confirm('删掉这张表情包？'))return;
      S.lib=S.lib.filter(function(y){return y!==x});lbKeep([x.tag]);refreshLib();
      if(typeof skPaint==='function')skPaint();closeSheet();
    }
  });
  openSheet('表情包',w);
};
kaoPool=function(){return typeof tagPool==='function'?tagPool(KAO_TAG):[]};
// v56：字卡库分「回复库」（主字卡 / 颜文字 / 表情包）和「氛围感」（拍一拍 / 对方状态 / 每日一句）
// 表情包在字卡库和聊天面板里都排成四列方格；⊕ 里的通话格子改小、换图标；他回字卡时按概率在句尾带一个颜文字

var KAO_TAG='颜文字';
(function(){
  if(ATMO_TAGS.indexOf(KAO_TAG)<0){ATMO.push([KAO_TAG,KAO_TAG]);ATMO_TAGS.push(KAO_TAG)}
  if(SPECIAL.indexOf(KAO_TAG)<0)SPECIAL.push(KAO_TAG);
  if(S.prefs.kaoRate===undefined||S.prefs.kaoRate===null)S.prefs.kaoRate=20;
  if(typeof P_DEF==='object')P_DEF.kaoRate=20;
  save();
})();
L4_HINT[KAO_TAG]='一行一个颜文字。顾时夜回字卡时会按概率在句尾带一个，概率在「设置 → 回复与通话」里调。';

// ── 两层分类：回复库 / 氛围感。内部还是 main + atmo 那套，只换了怎么分组显示 ──
var RSUB=[['main','主字卡',null],['kao','颜文字',KAO_TAG],['sk','表情包',SK_TAG]];


var _dlV56=drawLib;
drawLib=function(){
  _dlV56.apply(this,arguments);
  var box=$('libPage');if(!box||!box.querySelector('#l4List'))return;
  var top=l4Top();
  var seg=$('l4Seg');
  if(seg)seg.querySelectorAll('[data-t]').forEach(function(b){
    if(b.dataset.t==='main')b.textContent='回复库';
    else if(b.dataset.t==='atmo')b.textContent='氛围感';
    b.classList.toggle('on',(b.dataset.t==='main')===(top==='reply'));
  });
  var sub=$('l4Sub');
  if(sub){
    sub.hidden=false;
    if(top==='reply'){
      var mainN=S.lib.filter(function(x){return !isAtmo(x.tag)}).length;
      sub.innerHTML=RSUB.map(function(r){
        var on=r[2]?(L4.tab==='atmo'&&L4.sub===r[2]):L4.tab==='main';
        return '<button type="button" class="lb-pill'+(on?' on':'')+'" data-r="'+r[0]+'">'+r[1]+' <em>'+(r[2]?l4Cnt(r[2]):mainN)+'</em></button>';
      }).join('');
    }else{
      sub.innerHTML=ATMO.filter(function(a){return a[0]!==KAO_TAG&&a[0]!==SK_TAG}).map(function(a){
        return '<button type="button" class="lb-pill'+(L4.sub===a[0]?' on':'')+'" data-sub="'+esc(a[0])+'">'+esc(a[1])+' <em>'+l4Cnt(a[0])+'</em></button>';
      }).join('');
    }
  }
  var sk=L4.tab==='atmo'&&L4.sub===SK_TAG;
  var list=$('l4List');if(list)list.classList.toggle('skg',sk);
  if(sk){var lc=$('libCount');if(lc)lc.textContent=l4Scope().length+' 张'}
};
// 顶上两个大分类和「回复库」下面三个小分类：在 #libPage 上抢先接住点击
(function(){
  var box=$('libPage');if(!box)return;
  box.addEventListener('click',function(e){
    if(!e.target.closest)return;
    var t=e.target.closest('#l4Seg [data-t]');
    if(t){
      e.stopPropagation();
      var want=t.dataset.t==='main'?'reply':'atmo';
      if(want===l4Top())return;
      if(want==='reply')L4.tab='main';
      else{L4.tab='atmo';if(L4.sub===KAO_TAG||L4.sub===SK_TAG||ATMO_TAGS.indexOf(L4.sub)<0)L4.sub='拍一拍'}
      L4.group='all';L4.sel={};L4.batch=false;drawLib();return;
    }
    var r=e.target.closest('#l4Sub [data-r]');
    if(r){
      e.stopPropagation();
      var k=r.dataset.r;
      if(k==='main')L4.tab='main';else{L4.tab='atmo';L4.sub=k==='kao'?KAO_TAG:SK_TAG}
      L4.group='all';L4.sel={};L4.batch=false;drawLib();
    }
  },true);
})();

// ── 字卡库里的表情包：一格一张图，点开有大图、发给他、屏蔽、删掉 ──

var _l4cV56=l4CardEl;
l4CardEl=function(x,badge){
  if(!x||x.tag!==SK_TAG||!skIsImg(x.text))return _l4cV56.apply(this,arguments);
  var d=document.createElement('div');
  d.className='sk-tile'+(l4Off(x)?' off':'')+(L4.sel[x.id]?' sel':'');
  d.innerHTML=(L4.batch?'<span class="l4-chk">'+(L4.sel[x.id]?'✓':'')+'</span>':'')+'<img alt="表情" loading="lazy">';
  d.querySelector('img').src=x.text;
  d.addEventListener('click',function(){
    if(L4.batch){if(L4.sel[x.id])delete L4.sel[x.id];else L4.sel[x.id]=1;drawLib();return}
    skTileSheet(x);
  });
  return d;
};

// ── 颜文字：他回字卡时按概率在句尾带一个 ──

var _arcV56=addReplyCard;
addReplyCard=function(c){
  if(c&&c.from==='ta'&&!c.type&&typeof c.text==='string'&&c.text&&Math.random()*100<(+S.prefs.kaoRate||0)){
    var p=kaoPool();if(p.length)c.text=c.text.replace(/\s+$/,'')+' '+pickOne(p);
  }
  return _arcV56.apply(this,arguments);
};
var _orsV56=openReplySet;
openReplySet=function(){
  _orsV56.apply(this,arguments);
  if(typeof sheetBody==='undefined'||!sheetBody||$('kaoR'))return;
  var after=null;
  sheetBody.querySelectorAll('.field>label').forEach(function(l){if(l.textContent==='发表情包概率')after=l.parentNode});
  if(after&&after.nextElementSibling&&after.nextElementSibling.classList.contains('hint'))after=after.nextElementSibling;
  if(!after){var a=sheetBody.querySelector('input[type=range][data-k="pokeRate"]');after=a&&a.closest('.field')}
  if(!after)return;
  var box=document.createElement('div');box.className='field';
  box.innerHTML='<label>句尾带颜文字概率</label><div class="rg"><input type="range" id="kaoR" min="0" max="100" step="1"><b></b></div>';
  var r=box.querySelector('input'),v=box.querySelector('b');
  function paint(){r.value=+S.prefs.kaoRate||0;v.textContent=(+S.prefs.kaoRate||0)+'%'}
  r.addEventListener('input',function(){S.prefs.kaoRate=+r.value;paint()});
  r.addEventListener('change',function(){save()});
  paint();
  after.parentNode.insertBefore(box,after.nextSibling);
};

// ── ⊕ 里的通话格子：换成实心听筒 ──
(function(){
  var PH='<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"/></svg>';
  document.querySelectorAll('#plusp button').forEach(function(t){
    var s=t.querySelector('span'),i=t.querySelector('i');
    if(s&&i&&/通话|电话/.test(s.textContent))i.innerHTML=PH;
  });
})();

if(LIB.built)drawLib();
if(typeof skPaint==='function')skPaint();
}catch(e){console.error("[zika] js/v56.js",e)}

/* ===== js/v57.js ===== */
try{
rp57Busy=function(){return RP57.busy&&RP57.tok===replyRun};
rp57Read=function(){
  var changed=false;
  S.cards.forEach(function(c){if(c.from==='me'&&!c.read){c.read=true;changed=true}});
  if(changed){save();renderChat()}
};
// v57：回复节奏改成「递出去 → 一两秒后已读 → 马上弹正在输入 → 再按设置的最快~最慢回第一张」
// 原来设置里的时长被拿去等「已读」，已读以后拍一拍、表情包、每张字卡又各等一遍，所以慢很多

var RP57={tok:-1,busy:false};



// 你递出去：一两秒就已读。他已经在打字了的话，你再递一张只会被已读，他接着打，不从头等
scheduleReply=function(){
  if(rp57Busy()){setTimeout(function(){if(rp57Busy())rp57Read()},rnd(800,2000));return}
  clearTimeout(replyTimer);
  var token=++replyRun;
  showTyping(false);
  replyTimer=setTimeout(function(){simulateReply(token)},rnd(1000,3000));
};

simulateReply=function(token){
  if(token!==replyRun)return;
  var p=S.prefs;
  rp57Read();
  // 他收藏你一张（原来 v50 的）
  if(Math.random()*100<(+p.favRate||0)){
    var fm=S.cards.filter(function(c){return c.from==='me'&&!c.type&&c.text&&!c.taFav}).slice(-6);
    if(fm.length){pickOne(fm).taFav=true;save();renderChat()}
  }
  if(p.readNo&&Math.random()*100<(+p.readNoRate)){showTyping(false);return}

  var pool=libPool();
  var doPoke=Math.random()*100<(+p.pokeRate||0);
  var doSk=Math.random()*100<(+p.stickerRate||0)&&typeof skPool==='function'&&skPool().length>0;
  function live(){return token===replyRun}
  function done(){if(RP57.tok===token)RP57.busy=false}
  function later(d,fn){setTimeout(function(){if(!live()){done();return}fn()},d)}

  var t=0;
  if(doPoke){t+=rnd(1500,4000);later(t,function(){taPoke()})}
  if(!pool.length&&!doSk){showTyping(false);return}

  RP57.tok=token;RP57.busy=true;
  // 已读后很快就开始打字
  t+=rnd(800,2200);
  later(t,function(){showTyping(true)});

  // 要发的：1~3 张字卡，表情包随机插在中间
  var items=[],n=pool.length?replyCount():0;
  for(var i=0;i<n;i++)items.push('tx');
  if(doSk)items.splice(Math.floor(Math.random()*(items.length+1)),0,'sk');

  var a=Math.max(0,REPLY.waitMin),b=Math.max(a,REPLY.waitMax);
  var ga=Math.min(2000,a),gb=Math.max(ga,Math.min(6000,b));
  var firstTx=true;
  items.forEach(function(kind,idx){
    // 第一张按设置的最快~最慢等；后面几张隔几秒就来
    t+=idx===0?rnd(a,b):rnd(ga,gb);
    later(t,function(){
      if(kind==='sk'){if(typeof taSticker==='function')taSticker()}
      else{
        var c={id:uid(),from:'ta',text:typeof comboText==='function'?comboText(pool):pickOne(pool),at:Date.now()};
        if(firstTx){
          var mine=S.cards.filter(function(x){return x.from==='me'&&!x.type&&x.text}).slice(-10);
          if(mine.length&&Math.random()*100<(+p.quoteRate||0)){var m=pickOne(mine);c.quote={name:S.me.name||'我',text:m.text}}
          firstTx=false;
        }
        addReplyCard(c);
      }
      if(idx===items.length-1){showTyping(false);done()}
      else showTyping(true);
    });
  });
};

// 设置里把两条时长的名字说清楚
var _orsV57=openReplySet;
openReplySet=function(){
  _orsV57.apply(this,arguments);
  if(typeof sheetBody==='undefined'||!sheetBody)return;
  var lab={replyMin:'正在输入后，最快多久回',replyMax:'正在输入后，最慢多久回'},last=null;
  Object.keys(lab).forEach(function(k){
    var r=sheetBody.querySelector('input[type=range][data-k="'+k+'"]');if(!r)return;
    var f=r.closest('.field');if(!f)return;
    var l=f.querySelector('label');if(l)l.textContent=lab[k];
    last=f;
  });
  if(last&&!$('rp57h')){
    var h=document.createElement('p');h.className='hint';h.id='rp57h';
    h.textContent='递出去一两秒就已读，紧接着显示正在输入。从这时候开始，在这两个数之间随机等，到了回第一张。一次回好几张的话，后面几张隔几秒就来。他打字的时候你再递，他只会已读，不会从头再等。';
    last.parentNode.insertBefore(h,last.nextSibling);
  }
};

}catch(e){console.error("[zika] js/v57.js",e)}

/* ===== js/v58.js ===== */
try{
rt=function(k){var o=RT58[k];if(o&&!S.prefs[o])return 0;return +S.prefs[k]||0};
proPlan=function(){
  var p=S.prefs;
  if(!p.proOn){if(p.proNext){delete p.proNext;save()}return}
  var a=Math.max(1,+p.proMin||30),b=Math.max(a,+p.proMax||a);
  p.proNext=Date.now()+rnd(a,b)*60000;save();
};
proFire=function(){
  var pool=libPool();
  var doSk=Math.random()*100<rt('stickerRate')&&typeof skPool==='function'&&skPool().length>0;
  if(!pool.length&&!doSk){proPlan();return}
  clearTimeout(replyTimer);
  var token=++replyRun,start=Date.now(),ended=false;
  PRO.run=true;RP57.tok=token;RP57.busy=true;
  showTyping(true);
  var items=[],n=pool.length?(Math.random()<0.6?1:2):0;
  for(var i=0;i<n;i++)items.push('tx');
  if(doSk)items.splice(Math.floor(Math.random()*(items.length+1)),0,'sk');
  function end(){
    if(ended)return;ended=true;
    PRO.run=false;if(RP57.tok===token)RP57.busy=false;
    if(token===replyRun)showTyping(false);
    proPlan();
    // 他打字的时候你递过去的，等他发完再正常回你
    if(token===replyRun&&S.cards.some(function(c){return c.from==='me'&&c.at>=start}))scheduleReply();
  }
  var t=0;
  items.forEach(function(kind,idx){
    t+=idx===0?rnd(3000,9000):rnd(2000,6000);
    setTimeout(function(){
      if(token!==replyRun){end();return}
      if(kind==='sk'){if(typeof taSticker==='function')taSticker()}
      else addReplyCard({id:uid(),from:'ta',text:typeof comboText==='function'?comboText(pool):pickOne(pool),at:Date.now()});
      if(idx===items.length-1)end();
      else showTyping(true);
    },t);
  });
};
proTick=function(){
  var p=S.prefs;
  if(!p.proOn||PRO.run)return;
  if(!p.proNext){proPlan();return}
  if(Date.now()<p.proNext)return;
  if(rp57Busy())return;
  if(S.cards.some(function(c){return c.from==='me'&&!c.read}))return; // 他还没回你上一句
  if(typeof C!=='undefined'&&C&&C.state&&C.state!=='idle')return;   // 正在通话
  proFire();
};
swRow58=function(label){
  var l=document.createElement('label');l.className='l4-swrow v58-sw';
  l.innerHTML='<span></span><input type="checkbox"><i class="l4-tg"></i>';
  l.querySelector('span').textContent=label;
  return l;
};
// v58：已读不回、拍一拍、表情包、颜文字、引用各有一个开关，关着就不显示概率拉条
// 新增「他主动找你」：开关 + 最快~最慢间隔，从最后一条消息开始算

var V58_DEF={pokeOn:true,quoteOn:true,stickerOn:true,kaoOn:true,proOn:false,proMin:30,proMax:180};
(function(){
  var p=S.prefs,k;
  // 第一次升级：原来概率是 0 的就当成关着
  if(!p.v58){
    p.pokeOn=+p.pokeRate>0;p.quoteOn=+p.quoteRate>0;p.stickerOn=+p.stickerRate>0;p.kaoOn=+p.kaoRate>0;
    p.v58=1;
  }
  for(k in V58_DEF){if(p[k]===undefined||p[k]===null)p[k]=V58_DEF[k];if(typeof P_DEF==='object')P_DEF[k]=V58_DEF[k]}
  save();
})();
(function(){
  var st=document.createElement('style');
  st.textContent='html body #sheetBody .v58-off{display:none!important}html body #sheetBody .v58-sw{margin:14px 0 10px}';
  document.head.appendChild(st);
})();
PAIRS.proMin=['proMax',1];PAIRS.proMax=['proMin',-1];

// 开关关着，对应的概率就当 0
var RT58={pokeRate:'pokeOn',quoteRate:'quoteOn',stickerRate:'stickerOn',kaoRate:'kaoOn',readNoRate:'readNo'};


// 颜文字：关着就拿不到
var _kpV58=kaoPool;
kaoPool=function(){return S.prefs.kaoOn?_kpV58():[]};

// 回复流程照 v57，只是每样都先看开关
simulateReply=function(token){
  if(token!==replyRun)return;
  var p=S.prefs;
  rp57Read();
  if(Math.random()*100<(+p.favRate||0)){
    var fm=S.cards.filter(function(c){return c.from==='me'&&!c.type&&c.text&&!c.taFav}).slice(-6);
    if(fm.length){pickOne(fm).taFav=true;save();renderChat()}
  }
  if(Math.random()*100<rt('readNoRate')){showTyping(false);return}

  var pool=libPool();
  var doPoke=Math.random()*100<rt('pokeRate');
  var doSk=Math.random()*100<rt('stickerRate')&&typeof skPool==='function'&&skPool().length>0;
  function live(){return token===replyRun}
  function done(){if(RP57.tok===token)RP57.busy=false}
  function later(d,fn){setTimeout(function(){if(!live()){done();return}fn()},d)}

  var t=0;
  if(doPoke){t+=rnd(1500,4000);later(t,function(){taPoke()})}
  if(!pool.length&&!doSk){showTyping(false);return}

  RP57.tok=token;RP57.busy=true;
  t+=rnd(800,2200);
  later(t,function(){showTyping(true)});

  var items=[],n=pool.length?replyCount():0;
  for(var i=0;i<n;i++)items.push('tx');
  if(doSk)items.splice(Math.floor(Math.random()*(items.length+1)),0,'sk');

  var a=Math.max(0,REPLY.waitMin),b=Math.max(a,REPLY.waitMax);
  var ga=Math.min(2000,a),gb=Math.max(ga,Math.min(6000,b));
  var firstTx=true;
  items.forEach(function(kind,idx){
    t+=idx===0?rnd(a,b):rnd(ga,gb);
    later(t,function(){
      if(kind==='sk'){if(typeof taSticker==='function')taSticker()}
      else{
        var c={id:uid(),from:'ta',text:typeof comboText==='function'?comboText(pool):pickOne(pool),at:Date.now()};
        if(firstTx){
          var mine=S.cards.filter(function(x){return x.from==='me'&&!x.type&&x.text}).slice(-10);
          if(mine.length&&Math.random()*100<rt('quoteRate')){var m=pickOne(mine);c.quote={name:S.me.name||'我',text:m.text}}
          firstTx=false;
        }
        addReplyCard(c);
      }
      if(idx===items.length-1){showTyping(false);done()}
      else showTyping(true);
    });
  });
};

// ── 他主动找你 ──
var PRO={run:false};



// 你递出去、他发过来，都从这一刻重新算
var _schV58=scheduleReply;
scheduleReply=function(){_schV58.apply(this,arguments);proPlan()};
var _arcV58=addReplyCard;
addReplyCard=function(c){var r=_arcV58.apply(this,arguments);if(c&&c.from==='ta')proPlan();return r};
setInterval(proTick,15000);
document.addEventListener('visibilitychange',function(){if(!document.hidden)setTimeout(proTick,3000)});
setTimeout(proTick,4000);

// ── 设置：开关在上，打开了才显示概率 ──

var _orsV58=openReplySet;
openReplySet=function(){
  _orsV58.apply(this,arguments);
  if(typeof sheetBody==='undefined'||!sheetBody||$('v58pro'))return;
  var sb=sheetBody;
  function fd(k){var r=sb.querySelector('input[type=range][data-k="'+k+'"]');return r&&r.closest('.field')}
  function byLab(t){var f=null;sb.querySelectorAll('.field>label').forEach(function(l){if(!f&&l.textContent===t)f=l.parentNode});return f}

  // 原来那个已读不回的勾选去掉，换成统一的开关
  var rn=$('rnTg');
  if(rn){var lb=rn.closest('label'),ck=lb&&lb.parentNode;if(ck&&ck.classList.contains('chk')&&ck.querySelectorAll('label').length===1)ck.remove();else if(lb)lb.remove()}
  var rnf=fd('readNoRate');if(rnf)rnf.classList.remove('dis');
  var qf=fd('quoteRate');if(qf){var ql=qf.querySelector('label');if(ql)ql.textContent='引用概率'}
  var skf=byLab('发表情包概率');
  var skh=skf&&skf.nextElementSibling&&skf.nextElementSibling.classList.contains('hint')?skf.nextElementSibling:null;
  if(skh)skh.textContent='掷中了先发一张表情包，后面照旧接着回字卡。从字卡库「回复库 → 表情包」里挑，那里空着就跳过。';
  var kf=$('kaoR');kf=kf&&kf.closest('.field');
  sb.querySelectorAll('.hint').forEach(function(h){
    if(h.textContent.indexOf('掷中拍一拍就不回字')>=0)h.textContent='他一次回 1 到 3 张（75% 一张）。拍一拍和表情包掷中了是先发过来，后面照旧回字卡。';
  });

  var rows=[
    ['readNo','已读不回',[rnf]],
    ['pokeOn','拍一拍你',[fd('pokeRate')]],
    ['stickerOn','发表情包',[skf,skh]],
    ['kaoOn','句尾带颜文字',[kf]],
    ['quoteOn','引用你的话',[qf]]
  ];
  var paints=[];
  rows.forEach(function(r){
    var els=r[2].filter(Boolean);if(!els.length)return;
    var row=swRow58(r[1]),inp=row.querySelector('input');
    els[0].parentNode.insertBefore(row,els[0]);
    function paint(){inp.checked=!!S.prefs[r[0]];els.forEach(function(e){e.classList.toggle('v58-off',!S.prefs[r[0]])})}
    inp.addEventListener('change',function(){S.prefs[r[0]]=inp.checked;save();paint()});
    paint();paints.push(paint);
  });

  // 主动找你：放在「回信」前面
  var mailSec=null;
  sb.querySelectorAll('.sec').forEach(function(s){if(!mailSec&&s.textContent==='回信')mailSec=s});
  var box=document.createElement('div');box.id='v58pro';
  box.innerHTML='<div class="sec">主动找你</div>';
  var prow=swRow58('他会主动发消息'),pin=prow.querySelector('input');
  box.appendChild(prow);
  var inner=document.createElement('div');
  inner.innerHTML=rr('最快多久找你一次','proMin',5,1440,5)+rr('最慢多久找你一次','proMax',5,1440,5)
    +'<p class="hint">从最后一条消息开始算，你的、他的都算。在这两个数之间随机等，到了他先显示正在输入，再发一两张过来，开着表情包的话也可能带一张。页面关着他发不了，下次打开时到点了会补一次。</p>';
  box.appendChild(inner);
  bindRanges(inner,null,function(){proPlan()});
  function paintPro(){pin.checked=!!S.prefs.proOn;inner.classList.toggle('v58-off',!S.prefs.proOn)}
  pin.addEventListener('change',function(){S.prefs.proOn=pin.checked;save();proPlan();paintPro()});
  paintPro();paints.push(paintPro);
  if(mailSec)mailSec.parentNode.insertBefore(box,mailSec);else sb.appendChild(box);

  var rs=$('rsReset');
  if(rs)rs.addEventListener('click',function(){setTimeout(function(){paints.forEach(function(f){f()})},0)});
};

}catch(e){console.error("[zika] js/v58.js",e)}

/* ===== js/v59.js ===== */
try{
curView59=function(){var v=document.querySelector('.view.on');return v?v.dataset.view:''};
banEl=function(){
  if(BAN.el)return BAN.el;
  var b=document.createElement('div');b.id='ban';b.setAttribute('role','status');
  b.innerHTML='<span class="ban-av"></span><div class="ban-m"><div class="ban-t"><b></b><em>现在</em></div><p></p></div>';
  b.addEventListener('click',function(){
    var to=b.dataset.to||'chat';banHide();
    if(typeof sheet!=='undefined'&&sheet&&!sheet.hidden)closeSheet();
    if(to==='mail'&&typeof MAILTAB!=='undefined')MAILTAB='in';
    go(to);
  });
  // 往上划收起
  var y0=null;
  b.addEventListener('touchstart',function(e){y0=e.touches[0].clientY},{passive:true});
  b.addEventListener('touchmove',function(e){if(y0!==null&&e.touches[0].clientY-y0<-20){y0=null;banHide()}},{passive:true});
  document.body.appendChild(b);BAN.el=b;return b;
};
banShow=function(title,text,to){
  var b=banEl();
  setAv(b.querySelector('.ban-av'),S.ta);
  b.querySelector('b').textContent=title;
  b.querySelector('p').textContent=text;
  b.dataset.to=to||'chat';
  b.classList.remove('on');void b.offsetWidth;b.classList.add('on');
  clearTimeout(BAN.timer);BAN.timer=setTimeout(banHide,4500);
};
banHide=function(){clearTimeout(BAN.timer);if(BAN.el)BAN.el.classList.remove('on')};
banText=function(c){
  if(c.type==='poke')return c.text||'拍了拍你';
  if(c.type==='sticker')return c.photo?'[图片]':'[表情包]';
  return String(c.text||'').replace(/\s+/g,' ').slice(0,80);
};
bpPlain=function(){return document.documentElement.dataset.bubble==='plain'};
bpEl=function(){
  if(BP.el)return BP.el;
  var p=document.createElement('div');p.id='bpop';
  p.addEventListener('click',function(e){
    e.stopPropagation();
    var b=e.target.closest('[data-i]');if(!b||!BP.btns)return;
    var o=BP.btns[+b.dataset.i];bpHide();if(o)o.click();
  });
  document.body.appendChild(p);BP.el=p;return p;
};
bpKind=function(b){
  var t=b.textContent.trim();
  if(b.classList.contains('del')||/撕|删/.test(t))return 'del';
  if(/引用/.test(t))return 'quote';
  if(/收藏/.test(t))return /取消/.test(t)?'faved':'fav';
  return '';
};
bpShow=function(card){
  var acts=card.querySelector('.acts'),btns=acts?[].slice.call(acts.querySelectorAll('button')):[];
  if(!btns.length){bpHide();return}
  var p=bpEl();BP.card=card;BP.btns=btns;
  var LB={quote:'引用',fav:'收藏',faved:'取消收藏',del:'删除'};
  var IC={quote:BP_IC.quote,fav:BP_IC.star,faved:BP_IC.starOn,del:BP_IC.del};
  p.innerHTML='<div class="bp-in">'+btns.map(function(b,i){
    var k=bpKind(b);
    return '<button type="button" data-i="'+i+'">'+(IC[k]||'')+'<span>'+esc(LB[k]||b.textContent.trim())+'</span></button>';
  }).join('')+'</div><i class="bp-ar"></i>';
  p.classList.add('on');bpPlace();
};
bpPlace=function(){
  var p=BP.el,c=BP.card;if(!p||!c||!p.classList.contains('on'))return;
  if(!document.body.contains(c)){bpHide();return}
  var r=c.getBoundingClientRect(),w=p.offsetWidth,h=p.offsetHeight,vw=window.innerWidth;
  var tp=document.querySelector('.chat-top'),lim=(tp?tp.getBoundingClientRect().bottom:0)+6;
  var below=r.top-h-10<lim;
  var top=below?r.bottom+10:r.top-h-10;
  var cx=r.left+r.width/2,left=Math.max(10,Math.min(vw-w-10,cx-w/2));
  p.style.top=top+'px';p.style.left=left+'px';
  p.classList.toggle('below',below);
  var ar=p.querySelector('.bp-ar');if(ar)ar.style.left=Math.max(14,Math.min(w-14,cx-left))+'px';
};
bpHide=function(){
  if(BP.el)BP.el.classList.remove('on');
  if(BP.card)BP.card.classList.remove('show-del');
  BP.card=null;BP.btns=null;
};
appDefIcon=function(){
  var c=document.createElement('canvas');c.width=c.height=180;var x=c.getContext('2d');
  var a=(getComputedStyle(document.documentElement).getPropertyValue('--accent')||'').trim()||'#b96f74';
  var g=x.createLinearGradient(0,0,180,180);g.addColorStop(0,'#fbeff0');g.addColorStop(1,a);
  x.fillStyle=g;x.fillRect(0,0,180,180);
  x.fillStyle='#ffffff';x.font='300 96px "Songti SC","Noto Serif SC",serif';
  x.textAlign='center';x.textBaseline='middle';x.fillText('∞',90,96);
  return c.toDataURL('image/png');
};
appLink=function(rel){var l=document.querySelector('link[rel="'+rel+'"]');if(!l){l=document.createElement('link');l.rel=rel;document.head.appendChild(l)}return l};
appMeta=function(n,v){var m=document.querySelector('meta[name="'+n+'"]');if(!m){m=document.createElement('meta');m.name=n;document.head.appendChild(m)}m.setAttribute('content',v)};
appName59=function(){return (S.prefs.appName||'').trim()||V59_DEF.appName};
applyApp=function(){
  var nm=appName59();
  document.title=nm;
  appMeta('apple-mobile-web-app-title',nm);appMeta('application-name',nm);
  var ic=S.prefs.appIcon||appDefIcon();
  appLink('apple-touch-icon').href=ic;appLink('icon').href=ic;
  var st=document.querySelector('#splash .sp-title');if(st)st.textContent=nm;
};
openAppSet=function(){
  var w=document.createElement('div');w.className='v23';
  w.innerHTML='<div class="app-pv"><span class="app-ic"><img alt=""></span><span class="app-nm"></span></div>'
    +'<div class="field"><label>网页名字</label><input id="apNm" maxlength="12"></div>'
    +'<div class="two"><button type="button" class="ghost" id="apPick" style="flex:1">换图标</button><button type="button" class="ghost" id="apDef" style="flex:1">用默认图标</button></div>'
    +'<p class="hint">名字会显示在浏览器标签和开屏上。图标和名字是给「添加到主屏幕」用的：已经加过的，要先把主屏幕上那个删掉，再从 Safari 重新添加一次才会换。</p>';
  var nm=w.querySelector('#apNm');nm.value=S.prefs.appName||'';nm.placeholder=V59_DEF.appName;
  function paint(){w.querySelector('.app-ic img').src=S.prefs.appIcon||appDefIcon();w.querySelector('.app-nm').textContent=appName59()}
  nm.addEventListener('input',function(){S.prefs.appName=nm.value.trim().slice(0,12);applyApp();paint()});
  nm.addEventListener('change',function(){save()});
  w.querySelector('#apPick').addEventListener('click',function(){
    pickImage(function(src){shrinkSafe(src,180,true,0.9).then(function(u){
      if(!u){alert('这张读不出来，换一张试试。');return}
      var old=S.prefs.appIcon;S.prefs.appIcon=u;
      if(!save()){S.prefs.appIcon=old;alert('这张存不下，换一张小点的。');return}
      applyApp();paint();
    })});
  });
  w.querySelector('#apDef').addEventListener('click',function(){S.prefs.appIcon='';save();applyApp();paint()});
  paint();openSheet('网页图标和名字',w);
};
openBanSet=function(){
  var w=document.createElement('div');w.className='v23';
  var r1=swRow58('通知横幅'),i1=r1.querySelector('input');
  var sub=document.createElement('div');
  var r2=swRow58('回信寄到也弹'),i2=r2.querySelector('input');
  sub.appendChild(r2);
  var t=document.createElement('button');t.type='button';t.className='ghost';t.style.cssText='width:100%;margin-top:8px';t.textContent='弹一个看看';
  sub.appendChild(t);
  var h=document.createElement('p');h.className='hint';
  h.textContent='不在传讯页的时候，'+taName()+'发来消息，屏幕顶上会滑下来一条。点一下跳过去，往上划收起。在传讯页里就不弹。这是页面里的横幅，切到别的 App 或者锁屏的时候看不到。';
  w.appendChild(r1);w.appendChild(sub);w.appendChild(h);
  function paint(){i1.checked=!!S.prefs.banOn;i2.checked=!!S.prefs.banMail;sub.hidden=!S.prefs.banOn}
  i1.addEventListener('change',function(){S.prefs.banOn=i1.checked;save();paint()});
  i2.addEventListener('change',function(){S.prefs.banMail=i2.checked;save()});
  t.addEventListener('click',function(){banShow(taName(),'在干嘛呢。','chat')});
  paint();openSheet('通知横幅',w);
};
// v59：通知横幅；网页图标和名字；普通气泡点一下，气泡上面浮出引用 / 收藏 / 删除

var V59_DEF={banOn:true,banMail:true,appName:'字卡传讯',appIcon:''};
(function(){
  var p=S.prefs,k;
  for(k in V59_DEF){if(p[k]===undefined||p[k]===null)p[k]=V59_DEF[k];if(typeof P_DEF==='object')P_DEF[k]=V59_DEF[k]}
  save();
})();


// ── 通知横幅：不在传讯页时，他发来消息从顶上滑下来一条 ──
var BAN={el:null,timer:null};




var _arcV59=addReplyCard;
addReplyCard=function(c){
  var r=_arcV59.apply(this,arguments);
  if(c&&c.from==='ta'&&S.prefs.banOn&&!document.hidden&&curView59()!=='chat')banShow(taName(),banText(c),'chat');
  return r;
};
var _cmV59=composeMail;
composeMail=function(){
  var m=_cmV59.apply(this,arguments);
  if(m&&S.prefs.banOn&&S.prefs.banMail&&!document.hidden&&curView59()!=='mail')
    setTimeout(function(){banShow(taName()+' 寄来一封信',m.title||'','mail')},300);
  return m;
};

// ── 普通气泡：点一下，气泡上面浮出一排图标 ──
var BP={el:null,card:null,btns:null};
var BP_IC={
  quote:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M10 7L5 11.5l5 4.5"/><path d="M5.5 11.5H14a5 5 0 0 1 5 5V18"/></svg>',
  star:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"><path d="M12 3.8l2.5 5.1 5.6.8-4 3.9 1 5.6-5.1-2.7-5 2.7.9-5.6-4-3.9 5.6-.8z"/></svg>',
  starOn:'<svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"><path d="M12 3.8l2.5 5.1 5.6.8-4 3.9 1 5.6-5.1-2.7-5 2.7.9-5.6-4-3.9 5.6-.8z"/></svg>',
  del:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"/></svg>'
};






// 字卡自己的点击先把 show-del 切好，这里接着看要不要浮出来
stream.addEventListener('click',function(e){
  if(!bpPlain())return;
  var card=e.target.closest&&e.target.closest('.card');
  if(!card){bpHide();return}
  if(card.classList.contains('show-del'))bpShow(card);else bpHide();
});
document.addEventListener('click',function(e){
  if(!BP.el||!BP.el.classList.contains('on'))return;
  if(e.target.closest&&(e.target.closest('#bpop')||e.target.closest('#stream .card')))return;
  bpHide();
});
stream.addEventListener('scroll',function(){if(BP.card)bpHide()},{passive:true});
window.addEventListener('resize',bpPlace);
var _rcV59=renderChat;
renderChat=function(){bpHide();return _rcV59.apply(this,arguments)};
var _goV59=go;
go=function(){bpHide();return _goV59.apply(this,arguments)};

// ── 网页图标和名字 ──





var _pnV59=paintNames;
paintNames=function(){_pnV59.apply(this,arguments);applyApp()};





// ── 设置入口 ──
(function(){
  function add(gname,item){
    var g=SET_GROUPS.filter(function(x){return x[0]===gname})[0]||SET_GROUPS[SET_GROUPS.length-1];
    if(g&&!g[1].some(function(i){return i[0]===item[0]}))g[1].push(item);
  }
  add('外观',['openAppSet','网页图标和名字',function(){return appName59()}]);
  add('他怎么回你',['openBanSet','通知横幅',function(){return S.prefs.banOn?'开':'关'}]);
})();

applyApp();

}catch(e){console.error("[zika] js/v59.js",e)}

/* ===== js/v60.js ===== */
try{
icon60Url=function(){return 'data:image/svg+xml;charset=utf-8,'+encodeURIComponent(ICON60_SVG)};
ntOK=function(){return 'Notification' in window};
ntGranted=function(){return ntOK()&&Notification.permission==='granted'};
ntGo=function(to){
  if(typeof sheet!=='undefined'&&sheet&&!sheet.hidden)closeSheet();
  if(to==='mail'&&typeof MAILTAB!=='undefined')MAILTAB='in';
  go(to==='mail'?'mail':'chat');
};
ntShow=function(title,body,to){
  if(!S.prefs.sysOn||!ntGranted())return;
  var opt={body:body||'',tag:'zika-'+Date.now(),data:{to:to||'chat'}};
  if(S.ta.img)opt.icon=S.ta.img;
  function plain(){try{new Notification(title,opt)}catch(e){}}
  if(NT.reg&&NT.reg.showNotification){
    var p=NT.reg.showNotification(title,opt);
    if(p&&p.catch)p.catch(plain);
  }else plain();
};
// v60：系统通知（从主屏幕打开时可用，切到后台也弹）；页面里的横幅留着；新图标

var V60_DEF={sysOn:false,sysMail:true};
(function(){
  var p=S.prefs,k;
  for(k in V60_DEF){if(p[k]===undefined||p[k]===null)p[k]=V60_DEF[k];if(typeof P_DEF==='object')P_DEF[k]=V60_DEF[k]}
  save();
})();

// ── 新图标：粉到淡紫的底，两张叠着的字卡，右下角一颗小心 ──
var ICON60_SVG='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 180"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fde8ee"/><stop offset=".5" stop-color="#f1c6d8"/><stop offset="1" stop-color="#c3b2ee"/></linearGradient><radialGradient id="h" cx=".28" cy=".2" r=".7"><stop offset="0" stop-color="#fff" stop-opacity=".7"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient></defs><rect width="180" height="180" fill="url(#g)"/><rect width="180" height="180" fill="url(#h)"/><rect x="44" y="46" width="82" height="98" rx="16" fill="#fff" fill-opacity=".5" transform="rotate(-9 85 95)"/><g transform="rotate(6 95 88)"><rect x="54" y="42" width="82" height="100" rx="16" fill="#9b6a8a" fill-opacity=".14"/><rect x="54" y="38" width="82" height="100" rx="16" fill="#fff"/><rect x="68" y="60" width="40" height="6" rx="3" fill="#e9b3c8"/><rect x="68" y="76" width="54" height="6" rx="3" fill="#f1d3e0"/><rect x="68" y="92" width="32" height="6" rx="3" fill="#f1d3e0"/><path d="M114 128c-7-4.6-11-8.6-11-12.6a5.4 5.4 0 0 1 11-1.6a5.4 5.4 0 0 1 11 1.6c0 4-4 8-11 12.6z" fill="#d97fa2"/></g></svg>';
var ICON60={png:''};

// iPhone 主屏幕图标要 PNG：先用 SVG 顶着，画成 PNG 以后再换上
appDefIcon=function(){return ICON60.png||icon60Url()};
(function(){
  var im=new Image();
  im.onload=function(){
    try{
      var c=document.createElement('canvas');c.width=c.height=180;
      c.getContext('2d').drawImage(im,0,0,180,180);
      ICON60.png=c.toDataURL('image/png');
      if(typeof applyApp==='function')applyApp();
    }catch(e){}
  };
  im.src=icon60Url();
})();

// ── 系统通知 ──
var NT={reg:null};



if('serviceWorker' in navigator){
  navigator.serviceWorker.register('notify-sw.js').then(function(r){NT.reg=r}).catch(function(){});
  navigator.serviceWorker.addEventListener('message',function(e){var d=e.data||{};if(d.zika==='go')ntGo(d.to)});
}
(function(){var m=/[?&]go=(chat|mail)/.exec(location.search);if(m)setTimeout(function(){ntGo(m[1])},900)})();

// 页面在后台（切走了、锁屏前那一会儿）就走系统通知；页面开着还是用里面的横幅
var _arcV60=addReplyCard;
addReplyCard=function(c){
  var r=_arcV60.apply(this,arguments);
  if(c&&c.from==='ta'&&document.hidden)ntShow(taName(),banText(c),'chat');
  return r;
};
var _cmV60=composeMail;
composeMail=function(){
  var m=_cmV60.apply(this,arguments);
  if(m&&S.prefs.sysMail&&document.hidden)ntShow(taName()+' 寄来一封信',m.title||'','mail');
  return m;
};

// ── 设置 → 通知：上面系统通知，下面页面里的横幅 ──
openBanSet=function(){
  var w=document.createElement('div');w.className='v23';
  function sec(t){var d=document.createElement('div');d.className='sec';d.textContent=t;return d}
  function hint(t){var p=document.createElement('p');p.className='hint';if(t)p.textContent=t;return p}
  function btn(t){var b=document.createElement('button');b.type='button';b.className='ghost';b.style.cssText='width:100%;margin-top:8px';b.textContent=t;return b}

  w.appendChild(sec('系统通知'));
  var r0=swRow58('系统通知'),i0=r0.querySelector('input');w.appendChild(r0);
  var sys=document.createElement('div');
  var r3=swRow58('回信寄到也通知'),i3=r3.querySelector('input');sys.appendChild(r3);
  var tb=btn('发一条试试');sys.appendChild(tb);
  w.appendChild(sys);
  var st=hint('');w.appendChild(st);
  w.appendChild(hint('切到别的 App 的时候，'+taName()+'发来消息，会像微信那样弹系统通知，点一下回来。网页只有还在运行的时候才能发，切走太久或者锁屏久了会被 iPhone 停掉，就收不到了。开着「后台保活」能撑久一点。'));

  w.appendChild(sec('页面里的横幅'));
  var r1=swRow58('通知横幅'),i1=r1.querySelector('input');w.appendChild(r1);
  var sub=document.createElement('div');
  var r2=swRow58('回信寄到也弹'),i2=r2.querySelector('input');sub.appendChild(r2);
  var t2=btn('弹一个看看');sub.appendChild(t2);
  w.appendChild(sub);
  w.appendChild(hint('页面开着、但不在传讯页的时候，从屏幕顶上滑下来一条。点一下跳过去，往上划收起。'));

  function paint(){
    var p=S.prefs;
    if(p.sysOn&&!ntGranted())p.sysOn=false;
    i0.checked=!!p.sysOn;i3.checked=!!p.sysMail;sys.hidden=!p.sysOn;
    if(!ntOK())st.textContent='现在开不了：要先在 Safari 里点「分享 → 添加到主屏幕」，再从主屏幕上的图标打开，这里才能打开。';
    else if(Notification.permission==='denied')st.textContent='通知被拒了。去 iPhone「设置 → 通知」里找到它，打开允许通知。';
    else if(p.sysOn)st.textContent='已经开好了。';
    else st.textContent='';
    i1.checked=!!p.banOn;i2.checked=!!p.banMail;sub.hidden=!p.banOn;
  }
  i0.addEventListener('change',function(){
    if(!i0.checked){S.prefs.sysOn=false;save();paint();return}
    if(!ntOK()){paint();return}
    function done(perm){
      S.prefs.sysOn=perm==='granted';save();paint();
      if(perm==='denied')alert('通知被拒了。去 iPhone「设置 → 通知」里找到它，打开允许通知。');
    }
    try{var pr=Notification.requestPermission();if(pr&&pr.then)pr.then(done);else done(Notification.permission)}
    catch(e){Notification.requestPermission(done)}
  });
  i3.addEventListener('change',function(){S.prefs.sysMail=i3.checked;save()});
  tb.addEventListener('click',function(){
    tb.textContent='5 秒后来一条，现在切回主屏幕看看';
    setTimeout(function(){ntShow(taName(),'在干嘛呢。','chat');tb.textContent='发一条试试'},5000);
  });
  i1.addEventListener('change',function(){S.prefs.banOn=i1.checked;save();paint()});
  i2.addEventListener('change',function(){S.prefs.banMail=i2.checked;save()});
  t2.addEventListener('click',function(){banShow(taName(),'在干嘛呢。','chat')});
  paint();openSheet('通知',w);
};
SET_GROUPS.forEach(function(g){g[1].forEach(function(i){
  if(i[0]==='openBanSet'){
    i[1]='通知';
    i[2]=function(){var a=[];if(S.prefs.sysOn&&ntGranted())a.push('系统');if(S.prefs.banOn)a.push('横幅');return a.join(' · ')||'关'};
  }
})});

if(typeof applyApp==='function')applyApp();

}catch(e){console.error("[zika] js/v60.js",e)}

/* ===== js/v61.js ===== */
try{
sk61Tip=function(t,auto){
  var e=SK61.tip;
  if(!e){e=document.createElement('div');e.id='sk61tip';document.body.appendChild(e);SK61.tip=e}
  clearTimeout(SK61.tt);
  if(!t){e.classList.remove('on');return}
  e.textContent=t;e.classList.add('on');
  if(auto)SK61.tt=setTimeout(function(){e.classList.remove('on')},auto);
};
sk61Read=function(f){return new Promise(function(ok,no){var r=new FileReader();r.onload=function(){ok(r.result)};r.onerror=no;r.readAsDataURL(f)})};
sk61Shrink=function(f){
  return sk61Read(f).then(function(src){
    var type=String(f.type||'');
    if(/gif/i.test(type)&&f.size<=300*1024)return src;
    var alpha=/png|webp|gif/i.test(type);
    return new Promise(function(ok){
      var im=new Image();
      im.onload=function(){
        var max=260,r=Math.min(1,max/Math.max(im.width,im.height));
        var w=Math.max(1,Math.round(im.width*r)),h=Math.max(1,Math.round(im.height*r));
        var c=document.createElement('canvas');c.width=w;c.height=h;
        var x=c.getContext('2d');
        if(!alpha){x.fillStyle='#fff';x.fillRect(0,0,w,h)}
        x.drawImage(im,0,0,w,h);
        try{ok(alpha?c.toDataURL('image/png'):c.toDataURL('image/jpeg',0.82))}catch(e){ok('')}
      };
      im.onerror=function(){ok('')};
      im.src=src;
    });
  }).catch(function(){return ''});
};
sk61Pick=function(cb){
  var f=document.createElement('input');f.type='file';f.accept='image/*';f.multiple=true;
  f.style.cssText='position:fixed;left:-9999px;top:0;opacity:0';
  document.body.appendChild(f);
  f.addEventListener('change',function(){var xs=[].slice.call(f.files||[]);f.remove();if(xs.length)cb(xs)});
  f.click();
};
// v61：表情包能从相册一次选好多张，一张张排队压好存进去，底下有进度
// PNG / WebP 留透明底（原来压成 JPG 透明的地方会变黑）；300KB 以内的 GIF 原样存着，会动

var SK61={busy:false,tip:null,tt:null};
(function(){
  var st=document.createElement('style');
  st.textContent='#sk61tip{position:fixed;z-index:310;left:50%;bottom:calc(env(safe-area-inset-bottom) + 96px);transform:translate(-50%,10px);padding:9px 16px;border-radius:999px;background:rgba(40,36,38,.86);color:#fff;font-family:var(--sans);font-size:13px;letter-spacing:.04em;opacity:0;pointer-events:none;transition:opacity .2s,transform .2s;white-space:nowrap}#sk61tip.on{opacity:1;transform:translate(-50%,0)}';
  document.head.appendChild(st);
})();





// 字卡库「新增」和聊天里表情面板的「＋ 相册」都走这里
skAdd=function(){
  if(SK61.busy){sk61Tip('上一批还在加，等一下',1600);return}
  sk61Pick(function(files){
    SK61.busy=true;
    var have={},add=0,dup=0,bad=0,full=false,i=0,n=files.length;
    S.lib.forEach(function(x){if(x.tag===SK_TAG)have[x.text]=1});
    function next(){
      if(full||i>=n){finish();return}
      sk61Tip('正在加表情包 '+(i+1)+' / '+n);
      sk61Shrink(files[i++]).then(function(u){
        if(!u){bad++;next();return}
        if(have[u]){dup++;next();return}
        S.lib.push({id:uid(),tag:SK_TAG,text:u});
        if(!save()){S.lib.pop();full=true;next();return}
        have[u]=1;add++;next();
      });
    }
    function finish(){
      SK61.busy=false;
      if(add&&typeof lbUnempty==='function')lbUnempty(SK_TAG);
      save();
      if(typeof refreshLib==='function')refreshLib();
      if(typeof skPaint==='function')skPaint();
      if(full){
        sk61Tip('');
        alert('存不下了。加进去 '+add+' 张，后面 '+(n-add-dup-bad)+' 张没放进去。表情包很占地方，删几张旧的再试。');
        return;
      }
      var m='加好了 '+add+' 张';
      if(dup)m+='，'+dup+' 张本来就有';
      if(bad)m+='，'+bad+' 张读不出来';
      sk61Tip(m,2200);
    }
    next();
  });
};

// 字卡库 → 表情包 → 新增：按钮和说明改一下，选完先把弹层收起来，好看见格子一张张冒出来
var _l4AddV61=l4AddSheet;
l4AddSheet=function(){
  _l4AddV61.apply(this,arguments);
  var b=$('skUp');if(!b)return;
  b.textContent='＋ 从相册选图（能多选）';
  var h=b.nextElementSibling;
  if(h&&h.classList.contains('hint'))h.textContent='在相册里一次勾好几张都行。PNG 会留着透明底，300KB 以内的 GIF 原样存，会动。其余的压到 260px 再存，省地方。';
  b.addEventListener('click',function(){closeSheet()});
};

}catch(e){console.error("[zika] js/v61.js",e)}

/* ===== js/v62.js ===== */
try{
muBase=function(){var b=String(S.prefs.mu.base||'').trim().replace(/\/+$/,'');if(b&&!/^https?:\/\//.test(b))b='https://'+b;return b};
muOk=function(){return !!(muBase()&&S.prefs.mu.tok)};
muApi=function(p){
  return fetch(muBase()+p,{headers:{'x-token':S.prefs.mu.tok}}).then(function(r){
    if(r.status===401)throw new Error('token');
    if(!r.ok)throw new Error('http');
    return r.json();
  });
};
muHttps=function(u){u=String(u||'');if(/^\/\//.test(u))u='https:'+u;return u.replace(/^http:\/\//,'https://')};
muErrText=function(e){return e&&e.message==='token'?'密码不对，去设置 → QQ 音乐里看一下。':'连不上音乐服务器。可能地址换了，去设置 → QQ 音乐里重新填一下。'};
muToast=function(t){
  var el=$('muToast');if(!el){el=document.createElement('div');el.id='muToast';document.body.appendChild(el)}
  el.textContent=t;el.classList.add('on');clearTimeout(muToastT);muToastT=setTimeout(function(){el.classList.remove('on')},2400);
};
muAudio=function(){
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
};
muPlay=function(list,i){if(!list||!list[i])return;MU.list=list.slice();MU.idx=i;muLoad()};
muLoad=function(){
  var s=MU.list[MU.idx];if(!s)return;
  MU.cur=s;var a=muAudio();
  a.src=muBase()+'/stream?mid='+encodeURIComponent(s.mid)+'&t='+encodeURIComponent(S.prefs.mu.tok);
  var pr=a.play();if(pr&&pr.catch)pr.catch(function(){});
  muMeta();muPaintNow();
};
muNext=function(d){if(!MU.list.length)return;MU.idx=(MU.idx+(d||1)+MU.list.length)%MU.list.length;muLoad()};
muMeta=function(){
  if(!('mediaSession' in navigator)||!MU.cur)return;
  var s=MU.cur,ms=navigator.mediaSession;
  try{if(window.MediaMetadata)ms.metadata=new MediaMetadata({title:s.name,artist:s.singer,album:s.album||'',artwork:s.cover?[{src:muHttps(s.cover),sizes:'300x300',type:'image/jpeg'}]:[]})}catch(e){}
  try{
    ms.setActionHandler('play',function(){muAudio().play()});
    ms.setActionHandler('pause',function(){muAudio().pause()});
    ms.setActionHandler('nexttrack',function(){muNext(1)});
    ms.setActionHandler('previoustrack',function(){muNext(-1)});
  }catch(e){}
};
muBarHTML=function(chat){
  return '<img alt=""><span class="mu-st" data-mu="open"><b></b><em></em></span>'
    +(chat?'':'<button type="button" data-mu="prev" aria-label="上一首">'+MI.prev+'</button>')
    +'<button type="button" data-mu="toggle" aria-label="播放">'+MI.play+'</button>'
    +'<button type="button" data-mu="next" aria-label="下一首">'+MI.next+'</button><i class="pg"></i>';
};
muBarClick=function(e){
  var t=e.target.closest('[data-mu]'),self=this;
  if(!t||t.dataset.mu==='open'){if(self.id==='muNow')go('music');return}
  var a=t.dataset.mu,au=muAudio();
  if(a==='toggle'){if(!MU.cur)return;if(au.paused){var p=au.play();if(p&&p.catch)p.catch(function(){})}else au.pause()}
  if(a==='next')muNext(1);
  if(a==='prev')muNext(-1);
};
muPaintNow=function(){
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
};
muProg=function(){
  var a=MU.a,w=a&&a.duration?Math.min(100,a.currentTime/a.duration*100):0;
  document.querySelectorAll('.mu-bar .pg').forEach(function(p){p.style.width=w+'%'});
};
muSongs=function(el,songs,none){
  MU.shown=songs||[];
  if(!MU.shown.length){el.innerHTML=none?'<p class="hint mu-wait">'+none+'</p>':'';return}
  el.innerHTML=MU.shown.map(function(s,i){
    return '<button type="button" class="mu-s'+(MU.cur&&MU.cur.mid===s.mid?' on':'')+'" data-i="'+i+'"><img src="'+esc(muHttps(s.cover))+'" alt="" loading="lazy"><span class="mu-st"><b>'+esc(s.name||'')+'</b><em>'+esc(s.singer||'')+(s.album?' · '+esc(s.album):'')+'</em></span></button>';
  }).join('');
};
muSearch=function(q){
  MU.q=q;if(!q)return;
  MU.sBusy=true;MU.sErr='';muDraw();
  muApi('/search?q='+encodeURIComponent(q)).then(function(j){MU.res=j.songs||[]}).catch(function(e){MU.res=[];MU.sErr=muErrText(e)}).then(function(){MU.sBusy=false;muDraw()});
};
muLoadLists=function(){
  if(MU.lBusy)return;MU.lBusy=true;
  muApi('/me').then(function(j){
    MU.nick=j.nick||'';
    MU.lists=(j.lists||[]).filter(function(l){return l.id&&l.id!=='undefined'&&l.id!=='0'&&+l.count>0});
  }).catch(function(e){MU.lists=[];MU.listErr=muErrText(e)}).then(function(){MU.lBusy=false;muDraw()});
};
muOpenPl=function(id){
  var l=(MU.lists||[]).filter(function(x){return x.id===id})[0]||{};
  MU.pl={id:id,name:l.name||'歌单',songs:[],loading:true,err:''};muDraw();
  muApi('/playlist?id='+encodeURIComponent(id)).then(function(j){
    if(!MU.pl||MU.pl.id!==id)return;MU.pl.songs=j.songs||[];
  }).catch(function(e){if(MU.pl&&MU.pl.id===id)MU.pl.err=muErrText(e)}).then(function(){if(MU.pl&&MU.pl.id===id){MU.pl.loading=false;muDraw()}});
};
muDraw=function(){
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
};
muBodyClick=function(e){
  var t=e.target.closest('[data-mu],[data-i],[data-pl]');if(!t)return;
  if(t.dataset.i!==undefined){muPlay(MU.shown,+t.dataset.i);return}
  if(t.dataset.pl){muOpenPl(t.dataset.pl);return}
  var a=t.dataset.mu;
  if(a==='set')openMuSet();
  if(a==='back'){MU.pl=null;muDraw()}
  if(a==='all'&&MU.pl&&MU.pl.songs.length)muPlay(MU.pl.songs,0);
  if(a==='retry'){MU.lists=null;MU.listErr='';muDraw()}
};
openMuSet=function(){
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
};
// v62：QQ 音乐。接口在自己的 VPS 上（cookie 只在那台机器），这里只存服务器地址和密码
// 侧栏多一个「音乐」：搜歌、我的歌单；传讯页顶上一条「在听」小播放条；⊕ 里多一个「听歌」

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





var muToastT=null;


// ── 播放 ──






// ── 播放条：音乐页底下一条，传讯页顶上一条小的 ──





// ── 音乐页 ──







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

(function(){
  if(SET_GROUPS.some(function(g){return g[1].some(function(i){return i[0]==='openMuSet'})}))return;
  SET_GROUPS.splice(Math.max(0,SET_GROUPS.length-1),0,['音乐',[['openMuSet','QQ 音乐',function(){return muOk()?'已填':'没填'}]]]);
})();

}catch(e){console.error("[zika] js/v62.js",e)}

/* ===== js/v63.js ===== */
try{

// v63：侧栏「音乐」的图标跟其他板块配成一套。小印章是「乐」，罗马数字是 VIII

(function(){
  if(typeof IC_ORDER!=='undefined'&&IC_ORDER.indexOf('music')<0)IC_ORDER.push('music');
  if(typeof IC_SEAL==='object')IC_SEAL.music='乐';
  if(typeof IC_ROMAN!=='undefined')while(IC_ROMAN.length<IC_ORDER.length)IC_ROMAN.push(['VIII','IX','X'][IC_ROMAN.length-7]||'·');
  if(typeof IC_NAME==='object')IC_NAME.music='音乐';
  if(typeof applyIcons==='function')applyIcons();
})();

}catch(e){console.error("[zika] js/v63.js",e)}

/* ===== v65 气泡：实时预览 + 方案保存 ===== */
var bubSnap,bubApply;
try{
if(!Array.isArray(S.prefs.bubSaves)){S.prefs.bubSaves=[];save()}
bubSnap=function(){
  var o={css:S.bubbleCSS||''};
  if(typeof BUB_KEYS!=='undefined')BUB_KEYS.forEach(function(k){o[k]=S.prefs[k]});
  return o;
};
bubApply=function(p){
  if(typeof BUB_KEYS!=='undefined')BUB_KEYS.forEach(function(k){if(p[k]!==undefined)S.prefs[k]=p[k]});
  S.bubbleCSS=p.css||'';
  save();applyChat();applyBubbleCSS();renderChat();
};
var _obV65=openBubble;
openBubble=function(){
  _obV65.apply(this,arguments);
  var seg=$('bkSeg');if(!seg)return;
  // 自定义 CSS 默认展开，边写边看上面贴着的预览
  var dt=sheetBody.querySelector('.v23-css');if(dt)dt.open=true;
  // 实时预览：打字停下来就生效，不用点「应用 CSS」
  var box=$('bubbleBox');
  if(box&&!box.dataset.live){
    box.dataset.live='1';
    var t=null;
    box.addEventListener('input',function(){
      clearTimeout(t);
      t=setTimeout(function(){S.bubbleCSS=box.value.trim();save();applyBubbleCSS()},220);
    });
  }
  // 方案
  var host=seg.parentNode,wrap=document.createElement('div');wrap.id='bsBox';
  host.insertBefore(wrap,seg);
  function reopen(){closeSheet();setTimeout(function(){openBubble();if(typeof addBack==='function')addBack()},80)}
  function draw(){
    var ls=S.prefs.bubSaves||[];
    wrap.innerHTML='<div class="sec">方案</div>'
      +(ls.length
        ?'<div class="bs-list">'+ls.map(function(p){return '<button type="button" class="lb-pill" data-bs="'+esc(p.id)+'">'+esc(p.name)+'<i data-del="'+esc(p.id)+'">×</i></button>'}).join('')+'</div>'
        :'<p class="bs-none">还没存过方案。调好一套存起来，以后点一下就换回来。</p>')
      +'<button type="button" class="ghost" data-bs-new="1" style="width:100%;margin-bottom:4px">＋ 把现在这套存成方案</button>';
  }
  wrap.addEventListener('click',function(e){
    var d=e.target.closest('[data-del]');
    if(d){
      e.stopPropagation();
      var p=(S.prefs.bubSaves||[]).filter(function(x){return x.id===d.dataset.del})[0];
      if(!p||!confirm('删掉方案「'+p.name+'」？'))return;
      S.prefs.bubSaves=S.prefs.bubSaves.filter(function(x){return x.id!==d.dataset.del});save();draw();return;
    }
    var b=e.target.closest('[data-bs]');
    if(b){
      var q=(S.prefs.bubSaves||[]).filter(function(x){return x.id===b.dataset.bs})[0];
      if(q){bubApply(q);reopen()}
      return;
    }
    if(e.target.closest('[data-bs-new]')){
      var n=prompt('这套叫什么？','方案 '+((S.prefs.bubSaves||[]).length+1));
      if(n===null||!n.trim())return;
      var o=bubSnap();o.id=uid();o.name=n.trim().slice(0,12);
      S.prefs.bubSaves.unshift(o);
      if(!save()){S.prefs.bubSaves.shift();alert('存不下了。表情包或者壁纸占了太多地方，删几张再试。');return}
      draw();
    }
  });
  draw();
};
SET_GROUPS.forEach(function(g){g[1].forEach(function(i){
  if(i[0]==='openBubble')i[2]=function(){
    var n=(S.prefs.bubSaves||[]).length;
    return (S.prefs.bubKind==='plain'?'普通气泡':'便签')+(n?' · '+n+' 套方案':'');
  };
})});
}catch(e){console.error('[zika] v65',e)}

/* ===== js/v66.js ===== */
try{

// v66：信箱里每封都是封好的信，点一下封口掀开、信纸抽出来；写信也直接写在信纸上

var envDate=function(t){var d=new Date(t);return (d.getMonth()+1)+' 月 '+d.getDate()+' 日'};
var letterSlip=function(){
  var L=reader&&reader.querySelector('.letter');if(!L)return;
  L.classList.remove('slip');void L.offsetWidth;L.classList.add('slip');
};

renderMail=function(){
  var box=$('mailList');if(!box)return;
  var ins=S.mails.filter(function(m){return m.from==='ta'}),outs=S.mails.filter(function(m){return m.from!=='ta'});
  var unread=ins.filter(function(m){return !m.read}).length;
  document.querySelectorAll('#mlTabs [data-m]').forEach(function(b){b.classList.toggle('on',b.dataset.m===MAILTAB)});
  var a=$('mlIn'),b=$('mlOut');
  if(a)a.textContent=unread?unread+' 未读':(ins.length||'');
  if(b)b.textContent=outs.length||'';
  var isIn=MAILTAB==='in',list=(isIn?ins:outs).slice().sort(function(x,y){return y.at-x.at}),now=Date.now();
  if(!list.length){
    box.innerHTML=isIn?l4Empty('还没有收到信','给'+esc(taName())+'写一封，<br>他会慢慢回，回信落在这里。'):l4Empty('还没有寄出的信','点右上角「写一封信」。');
    return;
  }
  box.innerHTML=list.map(function(m){
    var sealed=isIn&&!m.read,st='',wait=false;
    if(!isIn){
      if(m.replyAt>now){st=esc(taName())+' 在写回信';wait=true}
      else if(m.replyAt===undefined)st='刚寄出';
      else st='已寄出';
    }
    return '<button type="button" class="env'+(sealed?' sealed':'')+'" data-act="openMail" data-id="'+esc(m.id)+'">'
      +'<span class="env-slip"></span>'
      +'<span class="env-face">'
      +'<span class="env-hill"></span>'
      +'<span class="env-t">'+esc(m.title||'无题')+'</span>'
      +'<span class="env-f">'+(isIn?esc(taName())+' 写给你':'寄给 '+esc(taName()))+'</span>'
      +'<span class="env-foot"><span class="env-d">'+envDate(m.at)+'</span>'+(st?'<span class="env-st'+(wait?' wait':'')+'">'+st+'</span>':'')+'</span>'
      +'</span>'
      +'<span class="env-flap"></span>'
      +(sealed?'<span class="env-wax">封</span>':'')
      +'</button>';
  }).join('');
};

// 点一下：封口掀开，等信纸抽出来再摊开整封
var _omV66=openMail;
openMail=function(id){
  var el=document.querySelector('.env[data-id="'+String(id).replace(/["\\]/g,'')+'"]');
  if(!el||!el.classList.contains('sealed')){_omV66(id);letterSlip();return}
  if(el.classList.contains('opening'))return;
  el.classList.add('opening');
  setTimeout(function(){_omV66(id);letterSlip()},430);
};

// 写信：直接写在信纸上
newMail=function(pre){
  pre=pre||{};
  var w=document.createElement('div');w.className='wl';
  w.innerHTML='<div class="wl-paper"><span class="wl-hill"></span>'
    +'<input id="mTitle" class="wl-t" maxlength="30" placeholder="写个标题，空着也行">'
    +'<textarea id="mBody" class="wl-b" placeholder="慢慢写，不着急。"></textarea>'
    +'<div class="wl-sign">—— '+esc(S.me.name||'我')+'</div></div>'
    +'<button type="button" class="primary" id="mSend" style="width:100%">封 好 寄 出</button>'
    +'<p class="hint">寄出以后放在「寄出的信」里。'+esc(taName())+'会按回信概率和时长回你，回信落在「收到的信」。</p>';
  w.querySelector('#mTitle').value=pre.title||'';
  w.querySelector('#mBody').value=pre.body||'';
  w.querySelector('#mSend').addEventListener('click',function(){
    var t=w.querySelector('#mTitle').value.trim()||'无题';
    var bd=w.querySelector('#mBody').value.trim();
    if(!bd){alert('正文还空着。');return}
    S.mails.push({id:uid(),from:'me',title:t,body:bd,at:Date.now(),read:true});
    save();closeSheet();MAILTAB='out';
    if(typeof mailTick==='function')mailTick();
    go('mail');renderMail();updateNav();
  });
  openSheet('写一封信',w);
};

renderMail();

}catch(e){console.error("[zika] js/v66.js",e)}

/* ===== js/v67.js ===== */
try{

// v67：音乐页重做成「一起听歌」——居中大标题、下划线分页、大封面播放器，进度和音量都能拖
// 顺手修了封面：接口没给图或者图挂了，放一个音符方块，不再留破图

MI.shuffle='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M16.5 3.8L19.6 7l-3.1 3.2"/><path d="M19.6 7h-3.9a4 4 0 0 0-3.3 1.75l-3.6 5.5A4 4 0 0 1 5.5 16H4"/><path d="M16.5 13.8L19.6 17l-3.1 3.2"/><path d="M4 7h1.5a4 4 0 0 1 3.3 1.75l.45.7"/><path d="M14.1 14.3l.3.45A4 4 0 0 0 17.7 17h1.9"/></svg>';
MI.list='<svg viewBox="0 0 24 24" fill="currentColor"><rect x="4" y="4" width="7" height="7" rx="1.7"/><rect x="13" y="4" width="7" height="7" rx="1.7"/><rect x="4" y="13" width="7" height="7" rx="1.7"/><rect x="13" y="13" width="7" height="7" rx="1.7"/></svg>';
MI.vol='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9.5h3L11 6v12l-4-3.5H4z"/><path d="M15.4 9.3a3.8 3.8 0 0 1 0 5.4"/><path d="M18 6.9a7.4 7.4 0 0 1 0 10.2"/></svg>';
MI.gear='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3.2"/><path d="M12 3.4v2.2M12 18.4v2.2M4.6 7.8l1.9 1.1M17.5 15.1l1.9 1.1M4.6 16.2l1.9-1.1M17.5 8.9l1.9-1.1"/></svg>';

// ── 封面 ──
muBadImg=function(im){
  if(!im||!im.parentNode)return;
  var sp=document.createElement('span');
  sp.className=im.className+' none';sp.innerHTML='<i>\u266a</i>';
  im.parentNode.replaceChild(sp,im);
};
muCov=function(u,extra){
  var c=muHttps(u),cls='mu-cov'+(extra?' '+extra:'');
  if(!c)return '<span class="'+cls+' none"><i>\u266a</i></span>';
  return '<img class="'+cls+'" src="'+esc(c)+'" alt="" loading="lazy" onerror="muBadImg(this)">';
};

// ── 音量、随机、时间 ──
muVolGet=function(){var v=+S.prefs.mu.vol;return isNaN(v)?1:Math.max(0,Math.min(1,v))};
var _auV67=muAudio;
muAudio=function(){
  var a=_auV67.apply(this,arguments);
  if(!a.v67){a.v67=1;a.volume=muVolGet();a.addEventListener('loadedmetadata',muProg)}
  return a;
};
var _nxV67=muNext;
muNext=function(d){
  if(MU.shuf&&MU.list.length>1&&(d||1)>0){
    var i=MU.idx;
    for(var k=0;k<24&&i===MU.idx;k++)i=Math.floor(Math.random()*MU.list.length);
    MU.idx=i;muLoad();return;
  }
  return _nxV67.apply(this,arguments);
};
muTime=function(t){
  if(!t||!isFinite(t))return '0:00';
  t=Math.max(0,Math.floor(t));
  var m=Math.floor(t/60),s=t%60;
  return m+':'+(s<10?'0':'')+s;
};

// ── 正在放 ──
muNowHTML=function(){
  var s=MU.cur;
  if(!s)return '<div class="mu-none"><span class="mu-cov big none"><i>\u266a</i></span>'
    +'<p>还没有在放的歌。<br>去「歌单」或者「搜歌」里挑一首。</p></div>';
  var on=!!(MU.a&&!MU.a.paused),n=MU.list.length;
  return '<div class="mu-np'+(on?' on':'')+'" data-mid="'+esc(s.mid)+'">'
    +'<div class="mu-art">'+muCov(s.cover,'big')+'</div>'
    +'<p class="mu-tag">'+(on?'NOW PLAYING \u00b7 在放':'PAUSED \u00b7 停下了')+'</p>'
    +'<h2 class="mu-nm">'+esc(s.name||'')+'</h2>'
    +'<p class="mu-sg">'+esc(s.singer||'')+(s.album?' \u00b7 '+esc(s.album):'')+'</p>'
    +'<div class="mu-seek"><input type="range" id="muSeek" min="0" max="1000" step="1" value="0" aria-label="进度">'
    +'<div class="mu-tt"><span id="muT1">0:00</span><span id="muT2">0:00</span></div></div>'
    +'<div class="mu-ctl">'
    +'<button type="button" class="mu-sm'+(MU.shuf?' on':'')+'" data-mu="shuf" aria-label="随机">'+MI.shuffle+'<em>随机</em></button>'
    +'<button type="button" class="mu-md" data-mu="prev" aria-label="上一首">'+MI.prev+'</button>'
    +'<button type="button" class="mu-big" data-mu="toggle" aria-label="'+(on?'暂停':'播放')+'">'+(on?MI.pause:MI.play)+'</button>'
    +'<button type="button" class="mu-md" data-mu="next" aria-label="下一首">'+MI.next+'</button>'
    +'<button type="button" class="mu-sm'+(MU.qOpen?' on':'')+'" data-mu="queue" aria-label="队列">'+MI.list+'<em>'+(n?(MU.idx+1)+' / '+n:'')+'</em></button>'
    +'</div>'
    +'<div class="mu-vol">'+MI.vol+'<input type="range" id="muVol" min="0" max="100" step="1" value="'+Math.round(muVolGet()*100)+'" aria-label="音量"><span>VOL.</span></div>'
    +(MU.qOpen?'<div class="mu-queue"><p class="mu-qh">这一轮的 '+n+' 首</p>'+MU.list.map(function(x,i){
        return '<button type="button" class="mu-s'+(i===MU.idx?' on':'')+'" data-q="'+i+'">'+muCov(x.cover)
          +'<span class="mu-st"><b>'+esc(x.name||'')+'</b><em>'+esc(x.singer||'')+'</em></span></button>';
      }).join('')+'</div>':'')
    +'</div>';
};
muBindNow=function(){
  var sk=$('muSeek'),vl=$('muVol');
  if(sk){
    sk.addEventListener('input',function(){
      MU.seek=true;var a=MU.a;
      if(a&&a.duration)$('muT1').textContent=muTime(sk.value/1000*a.duration);
    });
    sk.addEventListener('change',function(){
      var a=MU.a;
      if(a&&a.duration&&isFinite(a.duration))try{a.currentTime=sk.value/1000*a.duration}catch(e){}
      MU.seek=false;muProg();
    });
  }
  if(vl)vl.addEventListener('input',function(){
    S.prefs.mu.vol=vl.value/100;muAudio().volume=muVolGet();save();
  });
  muProg();
};
muProg=function(){
  var a=MU.a,d=a&&a.duration&&isFinite(a.duration)?a.duration:0;
  var w=d?Math.min(100,a.currentTime/d*100):0;
  document.querySelectorAll('.mu-bar .pg').forEach(function(p){p.style.width=w+'%'});
  if(MU.seek)return;
  var sk=$('muSeek');if(sk)sk.value=Math.round(w*10);
  var t1=$('muT1'),t2=$('muT2');
  if(t1)t1.textContent=muTime(a?a.currentTime:0);
  if(t2)t2.textContent=muTime(d);
  if(sk)sk.style.setProperty('--f',w+'%');
};
muPaintNow=function(){
  var s=MU.cur,on=!!(MU.a&&!MU.a.paused);
  ['muNow','muPlay'].forEach(function(id){
    var el=$(id);if(!el)return;el.hidden=!s;if(!s)return;
    var im=el.querySelector('img'),c=muHttps(s.cover);
    if(im){im.hidden=!c;if(c&&im.getAttribute('src')!==c)im.src=c}
    el.querySelector('b').textContent=s.name;
    el.querySelector('em').textContent=(id==='muNow'?(on?'在听 \u00b7 ':'暂停了 \u00b7 '):'')+s.singer;
    var tg=el.querySelector('[data-mu="toggle"]');
    if(tg){tg.innerHTML=on?MI.pause:MI.play;tg.setAttribute('aria-label',on?'暂停':'播放')}
  });
  var sb=$('sbcMu');if(sb)sb.textContent=on?'\u266a':'';
  var b=$('muBody');if(!b)return;
  b.querySelectorAll('.mu-s[data-i]').forEach(function(x){
    var it=MU.shown[+x.dataset.i];x.classList.toggle('on',!!(it&&s&&it.mid===s.mid));
  });
  if(MU.tab!=='now')return;
  var np=b.querySelector('.mu-np');
  if(!s||!np||np.dataset.mid!==String(s.mid)){muDraw();return}
  np.classList.toggle('on',on);
  var tag=np.querySelector('.mu-tag');if(tag)tag.textContent=on?'NOW PLAYING \u00b7 在放':'PAUSED \u00b7 停下了';
  var big=np.querySelector('.mu-big');
  if(big){big.innerHTML=on?MI.pause:MI.play;big.setAttribute('aria-label',on?'暂停':'播放')}
};

// ── 三个分页 ──
muDraw=function(){
  var b=$('muBody');if(!b)return;
  var seg=$('muSeg');
  if(seg)seg.querySelectorAll('[data-t]').forEach(function(x){x.classList.toggle('on',x.dataset.t===MU.tab)});
  var pb=$('muPlay');if(pb)pb.classList.toggle('mu-off',MU.tab==='now');
  if(!muOk()){
    MU.shown=[];
    b.innerHTML='<div class="empty"><b>还没连上 QQ 音乐</b>填一下服务器地址和密码就能听。</div>'
      +'<button type="button" class="primary" data-mu="set" style="width:100%">去 填</button>';
    return;
  }
  if(MU.tab==='now'){MU.shown=[];b.innerHTML=muNowHTML();muBindNow();return}
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
    b.innerHTML='<button type="button" class="sh-back" data-mu="back">\u2039 歌单</button>'
      +'<div class="mu-plh">'+muCov(MU.pl.cover,'md')+'<span class="mu-st"><b>'+esc(MU.pl.name)+'</b><em>'+(MU.pl.loading?'':MU.pl.songs.length+' 首')+'</em></span>'
      +(MU.pl.songs.length?'<button type="button" class="ghost" data-mu="all">全部播放</button>':'')+'</div><div id="muRes"></div>';
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
  b.innerHTML=(MU.nick?'<p class="mu-nick">'+esc(MU.nick)+' 的歌单</p>':'')+MU.lists.map(function(l){
    return '<button type="button" class="mu-s" data-pl="'+esc(l.id)+'">'+muCov(l.cover)
      +'<span class="mu-st"><b>'+esc(l.name||'歌单')+'</b><em>'+(+l.count||0)+' 首</em></span></button>';
  }).join('');
};
muSongs=function(el,songs,none){
  MU.shown=songs||[];
  if(!MU.shown.length){el.innerHTML=none?'<p class="hint mu-wait">'+none+'</p>':'';return}
  el.innerHTML=MU.shown.map(function(s,i){
    return '<button type="button" class="mu-s'+(MU.cur&&MU.cur.mid===s.mid?' on':'')+'" data-i="'+i+'">'+muCov(s.cover)
      +'<span class="mu-st"><b>'+esc(s.name||'')+'</b><em>'+esc(s.singer||'')+(s.album?' \u00b7 '+esc(s.album):'')+'</em></span></button>';
  }).join('');
};
muOpenPl=function(id){
  var l=(MU.lists||[]).filter(function(x){return x.id===id})[0]||{};
  MU.pl={id:id,name:l.name||'歌单',cover:l.cover||'',songs:[],loading:true,err:''};muDraw();
  muApi('/playlist?id='+encodeURIComponent(id)).then(function(j){
    if(!MU.pl||MU.pl.id!==id)return;MU.pl.songs=j.songs||[];
  }).catch(function(e){if(MU.pl&&MU.pl.id===id)MU.pl.err=muErrText(e)})
  .then(function(){if(MU.pl&&MU.pl.id===id){MU.pl.loading=false;muDraw()}});
};
muBodyClick=function(e){
  var t=e.target.closest('[data-mu],[data-i],[data-pl],[data-q]');if(!t)return;
  if(t.dataset.q!==undefined){MU.idx=+t.dataset.q;muLoad();return}
  if(t.dataset.i!==undefined){muPlay(MU.shown,+t.dataset.i);return}
  if(t.dataset.pl){muOpenPl(t.dataset.pl);return}
  var a=t.dataset.mu,au=muAudio();
  if(a==='set')openMuSet();
  if(a==='back'){MU.pl=null;muDraw()}
  if(a==='all'&&MU.pl&&MU.pl.songs.length)muPlay(MU.pl.songs,0);
  if(a==='retry'){MU.lists=null;MU.listErr='';muDraw()}
  if(a==='shuf'){MU.shuf=!MU.shuf;muDraw()}
  if(a==='queue'){MU.qOpen=!MU.qOpen;muDraw()}
  if(a==='prev')muNext(-1);
  if(a==='next')muNext(1);
  if(a==='toggle'&&MU.cur){
    if(au.paused){var p=au.play();if(p&&p.catch)p.catch(function(){})}else au.pause();
  }
};
// 点底下那条小的，进「正在放」
muBarClick=function(e){
  var t=e.target.closest('[data-mu]'),self=this;
  if(!t||t.dataset.mu==='open'){
    if(self.id==='muNow')go('music');
    MU.tab='now';muDraw();return;
  }
  var a=t.dataset.mu,au=muAudio();
  if(a==='toggle'){if(!MU.cur)return;if(au.paused){var p=au.play();if(p&&p.catch)p.catch(function(){})}else au.pause()}
  if(a==='next')muNext(1);
  if(a==='prev')muNext(-1);
};

// ── 页面头：居中大标题、下划线分页、右上角进设置 ──
(function(){
  var v=document.querySelector('.view[data-view="music"]');if(!v)return;
  var bar=v.querySelector('.mo-bar');
  if(bar&&!v.querySelector('.mu-head')){
    var h=document.createElement('div');h.className='mu-head';
    h.innerHTML='<button type="button" class="mu-gear" data-mu="set" aria-label="QQ 音乐设置">'+MI.gear+'</button>'
      +'<p class="mu-kick">LISTENING TOGETHER</p><h3>一起听歌</h3>';
    bar.parentNode.replaceChild(h,bar);
    h.addEventListener('click',function(e){if(e.target.closest('[data-mu="set"]'))openMuSet()});
  }
  var seg=$('muSeg');
  if(seg){
    seg.className='mu-seg';
    seg.innerHTML='<button type="button" data-t="now">正在放</button>'
      +'<button type="button" data-t="lists">歌单</button>'
      +'<button type="button" data-t="search">搜歌</button>';
  }
})();

if(!S.prefs.mu||typeof S.prefs.mu!=='object')S.prefs.mu={base:'',tok:''};
if(S.prefs.mu.vol===undefined){S.prefs.mu.vol=1;save()}
MU.shuf=false;MU.qOpen=false;MU.seek=false;MU.tab='now';
muDraw();muPaintNow();

}catch(e){console.error("[zika] js/v67.js",e)}

/* ===== js/v67b.js ===== */
try{

// 两条小播放条里的封面也别留破图：加载不出来就藏起来
(function(){
  ['muNow','muPlay'].forEach(function(id){
    var el=$(id);if(!el)return;
    var im=el.querySelector('img');if(!im)return;
    im.addEventListener('error',function(){im.hidden=true});
  });
})();

}catch(e){console.error("[zika] js/v67b.js",e)}

/* ===== js/v68.js ===== */
try{

// v68：音乐改成三页——正在放 / 歌词 / 主页
// 主页：上面你的头像，下面歌单、最近在听、收藏
// 正在放：播放方式可选 顺序 / 循环 / 随机，还能收藏
// 歌词：跟着进度走，没歌词可以自己贴 LRC

MI.heart='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20s-7.2-4.5-7.2-9.4A4.1 4.1 0 0 1 12 7.9a4.1 4.1 0 0 1 7.2 2.7C19.2 15.5 12 20 12 20z"/></svg>';
MI.heartOn='<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 20.3S4.3 15.6 4.3 10.4A4.5 4.5 0 0 1 12 7.5a4.5 4.5 0 0 1 7.7 2.9c0 5.2-7.7 9.9-7.7 9.9z"/></svg>';
MI.order='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7h11"/><path d="M4 12h8"/><path d="M4 17h11"/><path d="M16.8 14.4L19.6 17l-2.8 2.6"/><path d="M19.6 17h-4"/></svg>';
MI.loop='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4.6 11.2A4.6 4.6 0 0 1 9.2 7h8.3"/><path d="M15.2 4.6L17.9 7l-2.7 2.5"/><path d="M19.4 12.8A4.6 4.6 0 0 1 14.8 17H6.5"/><path d="M8.8 14.5L6.1 17l2.7 2.5"/></svg>';
MI.plus='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M12 5.6v12.8M5.6 12h12.8"/></svg>';

var MU_MODE=[['order','\u987a序','order'],['loop','\u5faa环','loop'],['shuffle','\u968f机','shuffle']];

// ── 存的东西 ──
muPref=function(){
  var p=S.prefs;
  if(!p.mu||typeof p.mu!=='object')p.mu={base:'',tok:''};
  var m=p.mu;
  if(m.vol===undefined)m.vol=1;
  if(!m.mode)m.mode='loop';
  if(!(+m.secs>=0))m.secs=0;
  if(!Array.isArray(m.fav))m.fav=[];
  if(!Array.isArray(m.recent))m.recent=[];
  if(!m.lrc||typeof m.lrc!=='object')m.lrc={};
  if(m.trans===undefined)m.trans=true;
  return m;
};
muSlim=function(s){return {mid:s.mid,name:s.name,singer:s.singer,album:s.album||'',cover:s.cover||''}};
muIsFav=function(mid){return muPref().fav.some(function(x){return x.mid===mid})};
muFav=function(){
  var s=MU.cur;if(!s)return;
  var m=muPref(),i=-1;
  m.fav.forEach(function(x,k){if(x.mid===s.mid)i=k});
  if(i>=0){m.fav.splice(i,1);muToast('从收藏里拿出来了')}
  else{m.fav.unshift(muSlim(s));muToast('收起来了')}
  save();muDraw();
};
muRecent=function(s){
  var m=muPref();
  m.recent=[muSlim(s)].concat(m.recent.filter(function(x){return x.mid!==s.mid})).slice(0,40);
  save();
};
muTick=function(){
  var a=MU.a;if(!a||a.paused)return;
  var now=Date.now(),m=muPref();
  if(MU.lastT&&now-MU.lastT<4000)m.secs=(+m.secs||0)+(now-MU.lastT)/1000;
  MU.lastT=now;
  if(!MU.saveT)MU.saveT=setTimeout(function(){MU.saveT=0;save()},20000);
};

// ── 播放方式 ──
muMode=function(){return muPref().mode};
muSyncLoop=function(){if(MU.a)MU.a.loop=false};
muNext=function(d){
  if(!MU.list.length)return;
  var a=MU.a,natural=!!(a&&a.ended),dir=d||1,mode=muMode();
  if(natural&&mode==='order'&&MU.idx>=MU.list.length-1){muPaintNow();return}
  if(mode==='shuffle'&&MU.list.length>1&&dir>0){
    var i=MU.idx;
    for(var k=0;k<24&&i===MU.idx;k++)i=Math.floor(Math.random()*MU.list.length);
    MU.idx=i;muLoad();return;
  }
  MU.idx=(MU.idx+dir+MU.list.length)%MU.list.length;muLoad();
};
var _loadV68=muLoad;
muLoad=function(){
  _loadV68.apply(this,arguments);
  MU.lastT=Date.now();
  if(MU.cur){muRecent(MU.cur);muLoadLrc(MU.cur.mid)}
};

// ── 歌词 ──
muLrcParse=function(t){
  var out=[],re=/\[(\d+):(\d+)(?:[.:](\d+))?\]/g;
  String(t||'').split(/\r?\n/).forEach(function(ln){
    var ts=[],m;re.lastIndex=0;
    while((m=re.exec(ln)))ts.push(+m[1]*60+ +m[2]+(m[3]?+('0.'+m[3].slice(0,3)):0));
    var x=ln.replace(/\[[^\]]*\]/g,'').trim();
    if(!ts.length||!x)return;
    ts.forEach(function(s){out.push({t:s,x:x})});
  });
  out.sort(function(a,b){return a.t-b.t});
  return out;
};
muLoadLrc=function(mid){
  if(!mid)return;
  if(MU.lrc&&MU.lrc.mid===mid)return;
  var own=muPref().lrc[mid];
  if(own){MU.lrc={mid:mid,lines:muLrcParse(own),tr:[],own:true};if(MU.tab==='lyric')muDraw();return}
  MU.lrc={mid:mid,lines:[],tr:[],loading:true,err:''};
  if(MU.tab==='lyric')muDraw();
  muApi('/lyric?mid='+encodeURIComponent(mid)).then(function(j){
    if(!MU.lrc||MU.lrc.mid!==mid)return;
    MU.lrc.lines=muLrcParse(j.lrc);MU.lrc.tr=muLrcParse(j.trans);
  }).catch(function(){if(MU.lrc&&MU.lrc.mid===mid)MU.lrc.err='歌词没拿到。'})
  .then(function(){if(MU.lrc&&MU.lrc.mid===mid){MU.lrc.loading=false;if(MU.tab==='lyric')muDraw()}});
};
muTrOf=function(t){
  var tr=(MU.lrc&&MU.lrc.tr)||[],best='';
  for(var i=0;i<tr.length;i++){if(Math.abs(tr[i].t-t)<0.6){best=tr[i].x;break}}
  return best;
};
muLrcHTML=function(){
  var L=MU.lrc;
  if(!MU.cur)return '<p class="mu-wait hint">先挑一首歌，歌词会自己跟上。</p>';
  if(!L||L.loading)return '<p class="mu-wait hint">在找歌词…</p>';
  var tr=muPref().trans&&L.tr&&L.tr.length;
  if(!L.lines.length)
    return '<p class="mu-wait hint">'+esc(L.err||'这首没有歌词。')+'</p>'
      +'<button type="button" class="mu-imp" data-mu="lrcset">导入 LRC / 纯文本歌词</button>';
  return '<p class="mu-kick mu-lk">THE WORDS BETWEEN US</p>'
    +(L.tr&&L.tr.length?'<button type="button" class="mu-tr'+(muPref().trans?' on':'')+'" data-mu="trans">译</button>':'')
    +'<div class="mu-lrc" id="muLrc">'+L.lines.map(function(l,i){
      var t=tr?muTrOf(l.t):'';
      return '<p data-l="'+i+'"><span>'+esc(l.x)+'</span>'+(t?'<i>'+esc(t)+'</i>':'')+'</p>';
    }).join('')+'</div>'
    +'<button type="button" class="mu-imp" data-mu="lrcset">'+(L.own?'换掉我贴的歌词':'歌词不对？自己贴一份')+'</button>';
};
muLrcPaint=function(){
  var box=$('muLrc'),L=MU.lrc,a=MU.a;
  if(!box||!L||!L.lines.length||!a)return;
  var t=a.currentTime||0,k=-1;
  for(var i=0;i<L.lines.length;i++){if(L.lines[i].t<=t+.25)k=i;else break}
  if(k===MU.lrcAt)return;
  MU.lrcAt=k;
  box.querySelectorAll('p').forEach(function(p,i){
    p.classList.toggle('on',i===k);
    p.classList.toggle('near',Math.abs(i-k)===1);
  });
  var el=k>=0?box.querySelector('p[data-l="'+k+'"]'):null;
  if(el)box.scrollTo({top:Math.max(0,el.offsetTop-box.clientHeight/2+el.offsetHeight/2),behavior:'smooth'});
};
muLrcSet=function(){
  var s=MU.cur;if(!s)return;
  var m=muPref(),w=document.createElement('div');
  w.innerHTML='<div class="field"><label>'+esc(s.name)+' 的歌词</label>'
    +'<textarea id="lrcIn" class="l4-ta" placeholder="[00:12.00] 第一句&#10;[00:18.40] 第二句&#10;&#10;没有时间标的纯文本也行，只是不会跟着走。" style="min-height:230px;font-size:13px;line-height:1.9"></textarea></div>'
    +'<button type="button" class="primary" id="lrcSave" style="width:100%">存 下</button>'
    +(m.lrc[s.mid]?'<button type="button" class="ghost" id="lrcDel" style="width:100%;margin-top:8px">清掉，用网上的</button>':'')
    +'<p class="hint">每行前面带 [分:秒] 就能跟着进度走。只对这一首生效。</p>';
  var ta=w.querySelector('#lrcIn');ta.value=m.lrc[s.mid]||'';
  w.querySelector('#lrcSave').addEventListener('click',function(){
    var v=ta.value.trim();
    if(v)m.lrc[s.mid]=v;else delete m.lrc[s.mid];
    save();MU.lrc=null;MU.lrcAt=-1;muLoadLrc(s.mid);closeSheet();MU.tab='lyric';muDraw();
  });
  var del=w.querySelector('#lrcDel');
  if(del)del.addEventListener('click',function(){
    delete m.lrc[s.mid];save();MU.lrc=null;MU.lrcAt=-1;muLoadLrc(s.mid);closeSheet();MU.tab='lyric';muDraw();
  });
  openSheet('贴一份歌词',w);
};

// ── 进度、控制、音量（正在放和歌词两页共用）──
muCtlHTML=function(){
  var s=MU.cur;if(!s)return '';
  var on=!!(MU.a&&!MU.a.paused),n=MU.list.length,md=muMode(),fav=muIsFav(s.mid);
  var mi=md==='shuffle'?MI.shuffle:md==='order'?MI.order:MI.loop;
  var mn=md==='shuffle'?'随机':md==='order'?'顺序':'循环';
  return '<div class="mu-line">'
    +'<div class="mu-lt"><p class="mu-tag">'+(on?'NOW PLAYING \u00b7 在放':'PAUSED \u00b7 停下了')+'</p>'
    +'<h2 class="mu-nm">'+esc(s.name||'')+'</h2>'
    +'<p class="mu-sg">'+esc(s.singer||'')+'</p></div>'
    +'<button type="button" class="mu-hb'+(fav?' on':'')+'" data-mu="fav" aria-label="'+(fav?'取消收藏':'收藏')+'">'+(fav?MI.heartOn:MI.heart)+'</button></div>'
    +'<div class="mu-seek"><input type="range" id="muSeek" min="0" max="1000" step="1" value="0" aria-label="进度">'
    +'<div class="mu-tt"><span id="muT1">0:00</span><span id="muT2">0:00</span></div></div>'
    +'<div class="mu-ctl">'
    +'<button type="button" class="mu-sm on" data-mu="mode" aria-label="播放方式：'+mn+'">'+mi+'<em>'+mn+'</em></button>'
    +'<button type="button" class="mu-md" data-mu="prev" aria-label="上一首">'+MI.prev+'</button>'
    +'<button type="button" class="mu-big" data-mu="toggle" aria-label="'+(on?'暂停':'播放')+'">'+(on?MI.pause:MI.play)+'</button>'
    +'<button type="button" class="mu-md" data-mu="next" aria-label="下一首">'+MI.next+'</button>'
    +'<button type="button" class="mu-sm'+(MU.qOpen?' on':'')+'" data-mu="queue" aria-label="这一轮">'+MI.list+'<em>'+(n?(MU.idx+1)+' / '+n:'')+'</em></button>'
    +'</div>'
    +'<div class="mu-vol">'+MI.vol+'<input type="range" id="muVol" min="0" max="100" step="1" value="'+Math.round(muVolGet()*100)+'" aria-label="音量"><span>VOL.</span></div>'
    +(MU.qOpen?'<div class="mu-queue"><p class="mu-qh">这一轮的 '+n+' 首</p>'+MU.list.map(function(x,i){
        return '<button type="button" class="mu-s'+(i===MU.idx?' on':'')+'" data-q="'+i+'">'+muCov(x.cover)
          +'<span class="mu-st"><b>'+esc(x.name||'')+'</b><em>'+esc(x.singer||'')+'</em></span></button>';
      }).join('')+'</div>':'');
};
muNowHTML=function(){
  var s=MU.cur;
  if(!s)return '<div class="mu-none"><span class="mu-cov big none"><i>\u266a</i></span>'
    +'<p>还没有在放的歌。<br>去「主页」里挑一首。</p></div>';
  return '<div class="mu-np'+(MU.a&&!MU.a.paused?' on':'')+'" data-mid="'+esc(s.mid)+'">'
    +'<div class="mu-art">'+muCov(s.cover,'big')+'</div>'+muCtlHTML()+'</div>';
};
muLyricPage=function(){
  return '<div class="mu-np lyr'+(MU.a&&!MU.a.paused?' on':'')+'" data-mid="'+esc(MU.cur?MU.cur.mid:'')+'">'
    +muLrcHTML()+(MU.cur?muCtlHTML():'')+'</div>';
};

// ── 主页 ──
muAvHTML=function(){
  var me=S.me||{};
  return me.img?'<img class="mu-av" src="'+esc(me.img)+'" alt="">'
    :'<span class="mu-av txt">'+esc(me.avatar||'\u266a')+'</span>';
};
muHomeHTML=function(){
  var m=muPref(),s=MU.cur;
  var mins=Math.floor((+m.secs||0)/60);
  var nLists=(MU.lists||[]).length;
  var sub=s?esc(s.name)+' \u00b7 '+esc(s.singer||''):'今天想听点什么。';
  var h='<div class="mu-home">'
    +'<div class="mu-me">'+muAvHTML()+'<p class="mu-mn">'+esc(S.me.name||'')+'</p>'
    +'<p class="mu-sub">'+sub+'</p>'
    +'<div class="mu-stat"><span><b>'+mins+'</b>分钟 一起听</span><span><b>'+m.fav.length+'</b>收藏</span><span><b>'+nLists+'</b>歌单</span></div></div>'
    +'<h4 class="mu-h4">音 乐</h4>'
    +'<div class="mu-sub2" id="muSub2">'
    +['lists,歌单,'+nLists,'recent,最近,'+m.recent.length,'fav,收藏,'+m.fav.length].map(function(x){
        var a=x.split(',');
        return '<button type="button" data-h="'+a[0]+'"'+(MU.hTab===a[0]?' class="on"':'')+'>'+a[1]+'<sup>'+a[2]+'</sup></button>';
      }).join('')+'</div>'
    +'<div id="muHl"></div>'
    +'<button type="button" class="mu-imp" data-mu="set">QQ 音乐 \u00b7 服务器和密码</button></div>';
  return h;
};
muHomeList=function(){
  var el=$('muHl');if(!el)return;
  var m=muPref();
  if(MU.hTab==='recent'){muSongs(el,m.recent,'还没听过什么。');return}
  if(MU.hTab==='fav'){muSongs(el,m.fav,'还没有收藏的歌。在「正在放」里点那颗心。');return}
  MU.shown=[];
  if(MU.lists===null){el.innerHTML='<p class="hint mu-wait">在拿你的歌单…</p>';muLoadLists();return}
  if(MU.listErr){el.innerHTML='<p class="hint mu-wait">'+esc(MU.listErr)+'</p><button type="button" class="ghost" data-mu="retry" style="width:100%">再试一次</button>';return}
  if(!MU.lists.length){el.innerHTML='<p class="hint mu-wait">没找到你建的歌单。</p>';return}
  el.innerHTML=MU.lists.map(function(l){
    return '<button type="button" class="mu-s" data-pl="'+esc(l.id)+'">'+muCov(l.cover)
      +'<span class="mu-st"><b>'+esc(l.name||'歌单')+'</b><em>歌单 \u00b7 '+(+l.count||0)+' 首</em></span></button>';
  }).join('');
};

// ── 搜歌：右上角那个 + ──
muSearchSheet=function(){
  var w=document.createElement('div');w.className='mu-sw';
  w.innerHTML='<form class="mu-q" id="muQ"><input type="search" placeholder="搜歌名、歌手…" enterkeyhint="search" autocomplete="off"><button type="submit" class="primary">搜</button></form><div id="muRes"></div>';
  var inp=w.querySelector('input');inp.value=MU.q||'';
  w.querySelector('form').addEventListener('submit',function(e){
    e.preventDefault();inp.blur();
    var q=inp.value.trim();if(!q)return;
    MU.q=q;var r=w.querySelector('#muRes');
    r.innerHTML='<p class="hint mu-wait">找找…</p>';
    muApi('/search?q='+encodeURIComponent(q)).then(function(j){
      MU.res=j.songs||[];muSongs(r,MU.res,'没找到，换个词试试。');
    }).catch(function(e2){r.innerHTML='<p class="hint mu-wait">'+esc(muErrText(e2))+'</p>'});
  });
  w.addEventListener('click',function(e){
    var t=e.target.closest('[data-i]');if(!t)return;
    muPlay(MU.shown,+t.dataset.i);closeSheet();MU.tab='now';muDraw();
  });
  openSheet('搜一首歌',w);
  if(MU.res&&MU.q)muSongs(w.querySelector('#muRes'),MU.res,'');
};

// ── 画页面 ──
muDraw=function(){
  var b=$('muBody');if(!b)return;
  var seg=$('muSeg');
  if(seg)seg.querySelectorAll('[data-t]').forEach(function(x){x.classList.toggle('on',x.dataset.t===MU.tab)});
  var pb=$('muPlay');if(pb)pb.classList.toggle('mu-off',MU.tab!=='home');
  if(!muOk()){
    MU.shown=[];
    b.innerHTML='<div class="empty"><b>还没连上 QQ 音乐</b>填一下服务器地址和密码就能听。</div>'
      +'<button type="button" class="primary" data-mu="set" style="width:100%">去 填</button>';
    return;
  }
  if(MU.tab==='now'){MU.shown=[];b.innerHTML=muNowHTML();muBindNow();return}
  if(MU.tab==='lyric'){MU.shown=[];MU.lrcAt=-1;b.innerHTML=muLyricPage();muBindNow();muLrcPaint();return}
  if(MU.pl){
    b.innerHTML='<button type="button" class="sh-back" data-mu="back">\u2039 主页</button>'
      +'<div class="mu-plh">'+muCov(MU.pl.cover,'md')+'<span class="mu-st"><b>'+esc(MU.pl.name)+'</b><em>'+(MU.pl.loading?'':MU.pl.songs.length+' 首')+'</em></span>'
      +(MU.pl.songs.length?'<button type="button" class="ghost" data-mu="all">全部播放</button>':'')+'</div><div id="muRes"></div>';
    var pr=$('muRes');
    if(MU.pl.loading){pr.innerHTML='<p class="hint mu-wait">在翻这个歌单…</p>';return}
    if(MU.pl.err){pr.innerHTML='<p class="hint mu-wait">'+esc(MU.pl.err)+'</p>';return}
    muSongs(pr,MU.pl.songs,'这个歌单是空的。');
    return;
  }
  b.innerHTML=muHomeHTML();
  muHomeList();
  var s2=$('muSub2');
  if(s2)s2.addEventListener('click',function(e){
    var t=e.target.closest('[data-h]');if(!t)return;
    MU.hTab=t.dataset.h;muDraw();
  });
};
muPaintNow=function(){
  var s=MU.cur,on=!!(MU.a&&!MU.a.paused);
  ['muNow','muPlay'].forEach(function(id){
    var el=$(id);if(!el)return;el.hidden=!s;if(!s)return;
    var im=el.querySelector('img'),c=muHttps(s.cover);
    if(im){im.hidden=!c;if(c&&im.getAttribute('src')!==c)im.src=c}
    el.querySelector('b').textContent=s.name;
    el.querySelector('em').textContent=(id==='muNow'?(on?'在听 \u00b7 ':'暂停了 \u00b7 '):'')+s.singer;
    var tg=el.querySelector('[data-mu="toggle"]');
    if(tg){tg.innerHTML=on?MI.pause:MI.play;tg.setAttribute('aria-label',on?'暂停':'播放')}
  });
  var sb=$('sbcMu');if(sb)sb.textContent=on?'\u266a':'';
  var b=$('muBody');if(!b)return;
  b.querySelectorAll('.mu-s[data-i]').forEach(function(x){
    var it=MU.shown[+x.dataset.i];x.classList.toggle('on',!!(it&&s&&it.mid===s.mid));
  });
  if(MU.tab!=='now'&&MU.tab!=='lyric')return;
  var np=b.querySelector('.mu-np');
  if(!np||np.dataset.mid!==String(s?s.mid:'')){muDraw();return}
  np.classList.toggle('on',on);
  var tag=np.querySelector('.mu-tag');if(tag)tag.textContent=on?'NOW PLAYING \u00b7 在放':'PAUSED \u00b7 停下了';
  var big=np.querySelector('.mu-big');
  if(big){big.innerHTML=on?MI.pause:MI.play;big.setAttribute('aria-label',on?'暂停':'播放')}
};
var _progV68=muProg;
muProg=function(){_progV68.apply(this,arguments);muTick();muLrcPaint()};

muBodyClick=function(e){
  var t=e.target.closest('[data-mu],[data-i],[data-pl],[data-q]');if(!t)return;
  if(t.dataset.q!==undefined){MU.idx=+t.dataset.q;muLoad();return}
  if(t.dataset.i!==undefined){muPlay(MU.shown,+t.dataset.i);return}
  if(t.dataset.pl){muOpenPl(t.dataset.pl);return}
  var a=t.dataset.mu,au=muAudio();
  if(a==='set')openMuSet();
  if(a==='back'){MU.pl=null;muDraw()}
  if(a==='all'&&MU.pl&&MU.pl.songs.length)muPlay(MU.pl.songs,0);
  if(a==='retry'){MU.lists=null;MU.listErr='';muDraw()}
  if(a==='queue'){MU.qOpen=!MU.qOpen;muDraw()}
  if(a==='fav')muFav();
  if(a==='lrcset')muLrcSet();
  if(a==='trans'){var m=muPref();m.trans=!m.trans;save();MU.lrcAt=-1;muDraw()}
  if(a==='mode'){
    var md=muMode(),i=0;
    MU_MODE.forEach(function(x,k){if(x[0]===md)i=k});
    var nx=MU_MODE[(i+1)%MU_MODE.length];
    muPref().mode=nx[0];save();muSyncLoop();muDraw();muToast('播放方式：'+nx[1]);
  }
  if(a==='prev')muNext(-1);
  if(a==='next')muNext(1);
  if(a==='toggle'&&MU.cur){
    if(au.paused){MU.lastT=Date.now();var p=au.play();if(p&&p.catch)p.catch(function(){})}else au.pause();
  }
};

// ── 页面头：左边齿轮、右边搜歌、三个分页 ──
(function(){
  var v=document.querySelector('.view[data-view="music"]');if(!v)return;
  var h=v.querySelector('.mu-head');
  if(h){
    h.innerHTML='<button type="button" class="mu-rd l" data-mu="set" aria-label="QQ 音乐设置">'+MI.gear+'</button>'
      +'<button type="button" class="mu-rd r" data-mu="find" aria-label="搜歌">'+MI.plus+'</button>'
      +'<p class="mu-kick">LISTENING TOGETHER</p><h3>一起听歌</h3>';
    h.addEventListener('click',function(e){
      var t=e.target.closest('[data-mu]');if(!t)return;
      if(t.dataset.mu==='set')openMuSet();
      if(t.dataset.mu==='find')muSearchSheet();
    });
  }
  var seg=$('muSeg');
  if(seg)seg.innerHTML='<button type="button" data-t="now">正在放</button>'
    +'<button type="button" data-t="lyric">歌词</button>'
    +'<button type="button" data-t="home">主页</button>';
})();

muPref();save();
MU.hTab='lists';MU.tab='home';MU.lrc=null;MU.lrcAt=-1;MU.qOpen=false;MU.lastT=0;MU.saveT=0;
muSyncLoop();muDraw();muPaintNow();

}catch(e){console.error("[zika] js/v68.js",e)}

/* ===== js/v69.js ===== */
try{

// v69：三个毛病
// 1. 正在放和歌词页的按钮点不动——v62 绑事件时记住的是老的 muBodyClick，后面换了函数它不知道；这里重新绑成每次读最新的
// 2. 底下那条播放条改成固定在屏底，矮一点
// 3. 歌词可以滑，点哪句从哪句开始；滑的时候右边跳出一个带时间的小按钮

// ── 1. 重新绑点击 ──
(function(){
  var b=$('muBody');
  if(b&&!b.dataset.v69){
    var n=b.cloneNode(false);n.dataset.v69='1';
    b.parentNode.replaceChild(n,b);
    n.addEventListener('click',function(e){muBodyClick.call(this,e)});
  }
  ['muPlay','muNow'].forEach(function(id){
    var el=$(id);if(!el||el.dataset.v69)return;
    var c=el.cloneNode(true);c.dataset.v69='1';
    el.parentNode.replaceChild(c,el);
    c.addEventListener('click',function(e){muBarClick.call(this,e)});
  });
  var seg=$('muSeg');
  if(seg&&!seg.dataset.v69){
    seg.dataset.v69='1';
    seg.addEventListener('click',function(e){
      var t=e.target.closest('[data-t]');if(!t)return;
      MU.tab=t.dataset.t;muDraw();
    });
  }
})();

// ── 3. 歌词：滑动、点句跳转 ──
muLrcHTML=function(){
  var L=MU.lrc;
  if(!MU.cur)return '<p class="mu-wait hint">先挑一首歌，歌词会自己跟上。</p>';
  if(!L||L.loading)return '<p class="mu-wait hint">在找歌词…</p>';
  if(!L.lines.length)
    return '<p class="mu-wait hint">'+esc(L.err||'这首没有歌词。')+'</p>'
      +'<button type="button" class="mu-imp" data-mu="lrcset">导入 LRC / 纯文本歌词</button>';
  var tr=muPref().trans&&L.tr&&L.tr.length;
  return '<p class="mu-kick mu-lk">THE WORDS BETWEEN US</p>'
    +(L.tr&&L.tr.length?'<button type="button" class="mu-tr'+(muPref().trans?' on':'')+'" data-mu="trans">译</button>':'')
    +'<div class="mu-lw"><div class="mu-lrc" id="muLrc">'
    +L.lines.map(function(l,i){
      var t=tr?muTrOf(l.t):'';
      return '<p data-l="'+i+'"><span>'+esc(l.x)+'</span>'+(t?'<i>'+esc(t)+'</i>':'')+'</p>';
    }).join('')
    +'</div><div class="mu-jump" id="muJump" hidden><i></i>'
    +'<button type="button" data-mu="jump" aria-label="从这句开始">'+MI.play+'<em id="muJt">0:00</em></button></div></div>'
    +'<button type="button" class="mu-imp" data-mu="lrcset">'+(L.own?'换掉我贴的歌词':'歌词不对？自己贴一份')+'</button>';
};
muCenterLine=function(){
  var box=$('muLrc');if(!box)return -1;
  var mid=box.scrollTop+box.clientHeight/2,best=-1,bd=1e9;
  box.querySelectorAll('p[data-l]').forEach(function(p){
    var c=p.offsetTop+p.offsetHeight/2,d=Math.abs(c-mid);
    if(d<bd){bd=d;best=+p.dataset.l}
  });
  return best;
};
muJumpShow=function(){
  var j=$('muJump'),box=$('muLrc'),L=MU.lrc;
  if(!j||!box||!L||!L.lines.length)return;
  var i=muCenterLine();if(i<0)return;
  MU.jumpTo=i;
  var t=$('muJt');if(t)t.textContent=muTime(L.lines[i].t);
  j.hidden=false;
  box.querySelectorAll('p[data-l]').forEach(function(p){p.classList.toggle('pick',+p.dataset.l===i)});
};
muJumpHide=function(){
  var j=$('muJump');if(j)j.hidden=true;
  var box=$('muLrc');if(box)box.querySelectorAll('p.pick').forEach(function(p){p.classList.remove('pick')});
};
muSeekLine=function(i){
  var L=MU.lrc,a=muAudio();
  if(!L||!L.lines[i])return;
  try{a.currentTime=Math.max(0,L.lines[i].t)}catch(e){}
  if(a.paused){MU.lastT=Date.now();var p=a.play();if(p&&p.catch)p.catch(function(){})}
  MU.lrcHold=0;clearTimeout(MU.lrcHT);muJumpHide();MU.lrcAt=-1;muLrcPaint();
};
muLrcBind=function(){
  var box=$('muLrc');if(!box||box.dataset.b)return;
  box.dataset.b='1';
  box.addEventListener('scroll',function(){
    if(Date.now()-(MU.asAt||0)<700)return;
    MU.lrcHold=1;muJumpShow();
    clearTimeout(MU.lrcHT);
    MU.lrcHT=setTimeout(function(){MU.lrcHold=0;muJumpHide();MU.lrcAt=-1;muLrcPaint()},3400);
  },{passive:true});
  box.addEventListener('click',function(e){
    var p=e.target.closest('p[data-l]');if(!p)return;
    muSeekLine(+p.dataset.l);
  });
};
muLrcPaint=function(){
  var box=$('muLrc'),L=MU.lrc,a=MU.a;
  if(!box||!L||!L.lines.length||!a)return;
  var t=a.currentTime||0,k=-1;
  for(var i=0;i<L.lines.length;i++){if(L.lines[i].t<=t+.25)k=i;else break}
  if(k===MU.lrcAt)return;
  MU.lrcAt=k;
  box.querySelectorAll('p[data-l]').forEach(function(p,i2){
    p.classList.toggle('on',i2===k);
    p.classList.toggle('near',Math.abs(i2-k)===1);
  });
  if(MU.lrcHold)return;
  var el=k>=0?box.querySelector('p[data-l="'+k+'"]'):null;
  if(!el)return;
  MU.asAt=Date.now();
  box.scrollTo({top:Math.max(0,el.offsetTop-box.clientHeight/2+el.offsetHeight/2),behavior:'smooth'});
};

var _bcV69=muBodyClick;
muBodyClick=function(e){
  var t=e.target.closest('[data-mu]');
  if(t&&t.dataset.mu==='jump'){muSeekLine(MU.jumpTo);return}
  return _bcV69.call(this,e);
};

var _drawV69=muDraw;
muDraw=function(){
  var r=_drawV69.apply(this,arguments);
  if(MU.tab==='lyric'){muLrcBind();muJumpHide()}
  return r;
};

MU.lrcHold=0;MU.lrcHT=0;MU.asAt=0;MU.jumpTo=-1;
muDraw();muPaintNow();

}catch(e){console.error("[zika] js/v69.js",e)}

/* ===== js/v70.js ===== */
try{

// v70：页面头和分页固定住，只让下面滑；拿掉左上角那个圆按钮和音量条；歌词页重做

// ── 页面头：只留右上角搜歌 ──
(function(){
  var v=document.querySelector('.view[data-view="music"]');if(!v)return;
  v.classList.add('mu-fix');
  var h=v.querySelector('.mu-head');
  if(h){
    h.innerHTML='<button type="button" class="mu-rd r" data-mu="find" aria-label="搜歌">'+MI.plus+'</button>'
      +'<p class="mu-kick">LISTENING TOGETHER</p><h3>一起听歌</h3>';
    h.addEventListener('click',function(e){
      if(e.target.closest('[data-mu="find"]'))muSearchSheet();
    });
  }
})();

// ── 控制区：没有音量条，歌词页用矮的那一版 ──
muCtlHTML=function(slim){
  var s=MU.cur;if(!s)return '';
  var on=!!(MU.a&&!MU.a.paused),n=MU.list.length,md=muMode(),fav=muIsFav(s.mid);
  var mi=md==='shuffle'?MI.shuffle:md==='order'?MI.order:MI.loop;
  var mn=md==='shuffle'?'随机':md==='order'?'顺序':'循环';
  return '<div class="mu-line">'
    +'<div class="mu-lt">'
    +(slim?'':'<p class="mu-tag">'+(on?'NOW PLAYING \u00b7 在放':'PAUSED \u00b7 停下了')+'</p>')
    +'<h2 class="mu-nm">'+esc(s.name||'')+'</h2>'
    +'<p class="mu-sg">'+esc(s.singer||'')+'</p></div>'
    +'<button type="button" class="mu-hb'+(fav?' on':'')+'" data-mu="fav" aria-label="'+(fav?'取消收藏':'收藏')+'">'+(fav?MI.heartOn:MI.heart)+'</button></div>'
    +'<div class="mu-seek"><input type="range" id="muSeek" min="0" max="1000" step="1" value="0" aria-label="进度">'
    +'<div class="mu-tt"><span id="muT1">0:00</span><span id="muT2">0:00</span></div></div>'
    +'<div class="mu-ctl">'
    +'<button type="button" class="mu-sm on" data-mu="mode" aria-label="播放方式：'+mn+'">'+mi+'<em>'+mn+'</em></button>'
    +'<button type="button" class="mu-md" data-mu="prev" aria-label="上一首">'+MI.prev+'</button>'
    +'<button type="button" class="mu-big" data-mu="toggle" aria-label="'+(on?'暂停':'播放')+'">'+(on?MI.pause:MI.play)+'</button>'
    +'<button type="button" class="mu-md" data-mu="next" aria-label="下一首">'+MI.next+'</button>'
    +'<button type="button" class="mu-sm'+(MU.qOpen?' on':'')+'" data-mu="queue" aria-label="这一轮">'+MI.list+'<em>'+(n?(MU.idx+1)+' / '+n:'')+'</em></button>'
    +'</div>'
    +(MU.qOpen?'<div class="mu-queue"><p class="mu-qh">这一轮的 '+n+' 首</p>'+MU.list.map(function(x,i){
        return '<button type="button" class="mu-s'+(i===MU.idx?' on':'')+'" data-q="'+i+'">'+muCov(x.cover)
          +'<span class="mu-st"><b>'+esc(x.name||'')+'</b><em>'+esc(x.singer||'')+'</em></span></button>';
      }).join('')+'</div>':'');
};

// ── 歌词页：歌词自己滑，控制贴在下面 ──
muLrcHTML=function(){
  var L=MU.lrc;
  if(!MU.cur)return '<div class="mu-lrcx"><p class="mu-wait hint">先挑一首歌，歌词会自己跟上。</p></div>';
  if(!L||L.loading)return '<div class="mu-lrcx"><p class="mu-wait hint">在找歌词…</p></div>';
  if(!L.lines.length)
    return '<div class="mu-lrcx"><p class="mu-wait hint">'+esc(L.err||'这首没有歌词。')+'</p>'
      +'<button type="button" class="mu-imp" data-mu="lrcset">导入 LRC / 纯文本歌词</button></div>';
  var tr=muPref().trans&&L.tr&&L.tr.length;
  return (L.tr&&L.tr.length?'<button type="button" class="mu-tr'+(muPref().trans?' on':'')+'" data-mu="trans">译文</button>':'')
    +'<div class="mu-lw"><div class="mu-lrc" id="muLrc">'
    +'<div class="mu-lpad"></div>'
    +L.lines.map(function(l,i){
      var t=tr?muTrOf(l.t):'';
      return '<p data-l="'+i+'"><span>'+esc(l.x)+'</span>'+(t?'<i>'+esc(t)+'</i>':'')+'</p>';
    }).join('')
    +'<button type="button" class="mu-imp" data-mu="lrcset">'+(L.own?'换掉我贴的歌词':'歌词不对？自己贴一份')+'</button>'
    +'<div class="mu-lpad"></div></div>'
    +'<div class="mu-jump" id="muJump" hidden><i></i>'
    +'<button type="button" data-mu="jump" aria-label="从这句开始">'+MI.play+'<em id="muJt">0:00</em></button></div></div>';
};
muLyricPage=function(){
  return '<div class="mu-np lyr'+(MU.a&&!MU.a.paused?' on':'')+'" data-mid="'+esc(MU.cur?MU.cur.mid:'')+'">'
    +muLrcHTML()
    +(MU.cur?'<div class="mu-lbot">'+muCtlHTML(true)+'</div>':'')+'</div>';
};

var _drawV70=muDraw;
muDraw=function(){
  var r=_drawV70.apply(this,arguments);
  var b=$('muBody');if(b)b.dataset.tab=MU.tab;
  return r;
};

muDraw();muPaintNow();

}catch(e){console.error("[zika] js/v70.js",e)}

/* ===== js/v70b.js ===== */
try{

// 音乐页不要那个浮在左上角的日夜切换；其他页还是留着
(function(){
  var btn=document.querySelector('#dkFab,#btnDark,.dk-fab');
  function mark(v){document.body.classList.toggle('on-music',v==='music')}
  var _go=go;
  go=function(v){var r=_go.apply(this,arguments);mark(v);return r};
  var cur=document.querySelector('.view.on');
  mark(cur?cur.dataset.view:'');
})();

}catch(e){console.error("[zika] js/v70b.js",e)}

/* ===== js/v73.js ===== */
try{

// 滑到的那句不再标记，只右边浮一个带时间的按钮
muJumpShow=function(){
  var j=$('muJump'),box=$('muLrc'),L=MU.lrc;
  if(!j||!box||!L||!L.lines.length)return;
  var i=muCenterLine();if(i<0)return;
  MU.jumpTo=i;
  var t=$('muJt');if(t)t.textContent=muTime(L.lines[i].t);
  j.hidden=false;
};
muJumpHide=function(){
  var j=$('muJump');if(j)j.hidden=true;
};

}catch(e){console.error("[zika] js/v73.js",e)}

/* ===== js/v75.js ===== */
try{

// v75：传讯页顶上那条小播放条能关；名字下面不要「在线 / 正在输入」，只留自己的状态

// ── 名字下面：把「在线」那一格抽掉 ──
(function(){
  var st=document.querySelector('.chat-top .who .st');
  if(st)st.remove();
})();

// ── 小播放条：右边加一个 ×，点了就停下来并收起这条 ──
(function(){
  var el=$('muNow');if(!el||el.querySelector('[data-mu="close"]'))return;
  var x=document.createElement('button');
  x.type='button';x.className='mu-x';x.dataset.mu='close';
  x.setAttribute('aria-label','不听了');x.textContent='\u00d7';
  el.appendChild(x);
})();

var _barV75=muBarClick;
muBarClick=function(e){
  var t=e.target.closest('[data-mu]');
  if(t&&t.dataset.mu==='close'){
    e.stopPropagation();
    var a=MU.a;if(a&&!a.paused)a.pause();
    MU.barOff=1;
    var el=$('muNow');if(el)el.hidden=true;
    return;
  }
  return _barV75.call(this,e);
};

var _loadV75=muLoad;
muLoad=function(){MU.barOff=0;return _loadV75.apply(this,arguments)};

var _paintV75=muPaintNow;
muPaintNow=function(){
  var r=_paintV75.apply(this,arguments);
  var el=$('muNow');if(el&&MU.barOff)el.hidden=true;
  return r;
};

MU.barOff=0;
muPaintNow();

}catch(e){console.error("[zika] js/v75.js",e)}

/* ===== js/v76.js ===== */
try{

// v76：放音乐别让手机一直烧
// timeupdate 每秒会响四次，以前每次都重查节点、每 20 秒把整份数据写一遍、歌词还整体重洗
// 这里全改成：节点只查一次、半秒最多刷一次、歌词只改变动的那几行、落盘改成停下来或者两分钟一次

var MP={pg:null,sk:null,t1:null,t2:null,at:0,w:-1,s1:-1,s2:-1};
var LC={box:null,ps:null};

muProgCache=function(){
  MP.pg=[].slice.call(document.querySelectorAll('.mu-bar .pg'));
  MP.sk=$('muSeek');MP.t1=$('muT1');MP.t2=$('muT2');
  MP.w=-1;MP.s1=-1;MP.s2=-1;
};

muProg=function(force){
  var a=MU.a;if(!a)return;
  var now=Date.now();
  if(force!==true&&now-MP.at<480)return;
  MP.at=now;
  if(!MP.pg||(MP.sk&&!MP.sk.isConnected))muProgCache();
  var d=a.duration&&isFinite(a.duration)?a.duration:0;
  var w=d?Math.min(100,a.currentTime/d*100):0;
  if(Math.abs(w-MP.w)>=.25){
    MP.w=w;
    for(var i=0;i<MP.pg.length;i++)MP.pg[i].style.width=w+'%';
    if(MP.sk&&MP.sk.isConnected&&!MU.seek){MP.sk.value=Math.round(w*10);MP.sk.style.setProperty('--f',w+'%')}
  }
  if(!MU.seek){
    var c=Math.floor(a.currentTime||0),t=Math.floor(d);
    if(MP.t1&&MP.t1.isConnected&&c!==MP.s1){MP.s1=c;MP.t1.textContent=muTime(c)}
    if(MP.t2&&MP.t2.isConnected&&t!==MP.s2){MP.s2=t;MP.t2.textContent=muTime(t)}
  }
  muTick();muLrcPaint();
};

// 歌词：只改上一句和这一句周围那几行
muLrcPaint=function(){
  var L=MU.lrc,a=MU.a;
  if(!L||!L.lines||!L.lines.length||!a)return;
  var box=$('muLrc');if(!box)return;
  if(LC.box!==box||!LC.ps){LC.box=box;LC.ps=[].slice.call(box.querySelectorAll('p[data-l]'))}
  var ps=LC.ps,ls=L.lines,t=a.currentTime||0,k=-1;
  for(var i=0;i<ls.length;i++){if(ls[i].t<=t+.25)k=i;else break}
  if(k===MU.lrcAt)return;
  var old=MU.lrcAt;MU.lrcAt=k;
  var touch=[old-1,old,old+1,k-1,k,k+1],done={};
  for(var j=0;j<touch.length;j++){
    var n=touch[j];
    if(n<0||n>=ps.length||done[n])continue;
    done[n]=1;
    var p=ps[n];if(!p)continue;
    p.classList.toggle('on',n===k);
    p.classList.toggle('near',Math.abs(n-k)===1);
  }
  if(MU.lrcHold)return;
  var el=k>=0?ps[k]:null;if(!el)return;
  MU.asAt=Date.now();
  box.scrollTo({top:Math.max(0,el.offsetTop-box.clientHeight/2+el.offsetHeight/2),behavior:'smooth'});
};

// 听了多少分钟：先在心里记，不每次都写进本地
muTick=function(){
  var a=MU.a;if(!a||a.paused)return;
  var now=Date.now();
  if(MU.lastT&&now-MU.lastT<6000)MU.secAcc=(MU.secAcc||0)+(now-MU.lastT)/1000;
  MU.lastT=now;
  if(now-(MU.savedAt||0)>120000){MU.savedAt=now;muFlush()}
};
muFlush=function(){
  var m=muPref();
  if(MU.secAcc){m.secs=(+m.secs||0)+MU.secAcc;MU.secAcc=0}
  MU.savedAt=Date.now();save();
};

// 停下来、切歌、切到后台都落一次盘
(function(){
  if(MU.saveT){clearTimeout(MU.saveT);MU.saveT=0}
  MU.secAcc=0;MU.savedAt=Date.now();
  var a=MU.a;
  if(a&&!a.v76){
    a.v76=1;
    a.addEventListener('pause',muFlush);
    a.addEventListener('ended',muFlush);
  }
  if(!window.__muFlushBound){
    window.__muFlushBound=1;
    document.addEventListener('visibilitychange',function(){if(document.hidden)muFlush()});
    window.addEventListener('pagehide',muFlush);
  }
})();
var _auV76=muAudio;
muAudio=function(){
  var a=_auV76.apply(this,arguments);
  if(!a.v76){a.v76=1;a.addEventListener('pause',muFlush);a.addEventListener('ended',muFlush)}
  return a;
};

// 重画页面后重新认一次节点，并立即刷一次
var _bindV76=muBindNow;
muBindNow=function(){
  var r=_bindV76.apply(this,arguments);
  LC.box=null;LC.ps=null;
  muProgCache();muProg(true);
  return r;
};
var _loadV76=muLoad;
muLoad=function(){
  LC.box=null;LC.ps=null;MP.w=-1;MP.s1=-1;MP.s2=-1;
  return _loadV76.apply(this,arguments);
};

muProgCache();

}catch(e){console.error("[zika] js/v76.js",e)}

/* ===== js/v78.js ===== */
try{

// v78：点循环、点列表、点收藏不再重画整页
// 以前这三个都走 muDraw，整块 innerHTML 重建：封面要重新去取图所以闪一下，
// 歌词节点全没了、当前句归零，所以先跳回开头再滑回来。
// 现在只改该改的那一两个地方。

// ── 就地换播放方式按钮 ──
muModeBtn=function(){
  var md=muMode();
  var mi=md==='shuffle'?MI.shuffle:md==='order'?MI.order:MI.loop;
  var mn=md==='shuffle'?'\u968f\u673a':md==='order'?'\u987a\u5e8f':'\u5faa\u73af';
  var bs=document.querySelectorAll('#muBody [data-mu="mode"]');
  for(var i=0;i<bs.length;i++){
    bs[i].innerHTML=mi+'<em>'+mn+'</em>';
    bs[i].setAttribute('aria-label','\u64ad\u653e\u65b9\u5f0f\uff1a'+mn);
  }
};

// ── 就地开关「这一轮」 ──
muQueueHTML=function(){
  var n=MU.list.length;
  return '<p class="mu-qh">\u8fd9\u4e00\u8f6e\u7684 '+n+' \u9996</p>'+MU.list.map(function(x,i){
    return '<button type="button" class="mu-s'+(i===MU.idx?' on':'')+'" data-q="'+i+'">'+muCov(x.cover)
      +'<span class="mu-st"><b>'+esc(x.name||'')+'</b><em>'+esc(x.singer||'')+'</em></span></button>';
  }).join('');
};
muQueueToggle=function(){
  MU.qOpen=!MU.qOpen;
  var bs=document.querySelectorAll('#muBody [data-mu="queue"]');
  for(var i=0;i<bs.length;i++)bs[i].classList.toggle('on',MU.qOpen);
  var ctl=document.querySelector('#muBody .mu-ctl');
  var host=ctl&&ctl.parentNode;if(!host)return;
  var ex=host.querySelector('.mu-queue');
  if(!MU.qOpen){if(ex)ex.remove();return}
  if(ex)return;
  var d=document.createElement('div');d.className='mu-queue';d.innerHTML=muQueueHTML();
  host.appendChild(d);
};

// ── 就地换那颗心 ──
muFav=function(){
  var s=MU.cur;if(!s)return;
  var m=muPref(),i=-1,on;
  m.fav.forEach(function(x,k){if(x.mid===s.mid)i=k});
  if(i>=0){m.fav.splice(i,1);on=false;muToast('\u4ece\u6536\u85cf\u91cc\u62ff\u51fa\u6765\u4e86')}
  else{m.fav.unshift(muSlim(s));on=true;muToast('\u6536\u8d77\u6765\u4e86')}
  save();
  var bs=document.querySelectorAll('#muBody [data-mu="fav"]');
  for(var j=0;j<bs.length;j++){
    bs[j].classList.toggle('on',on);
    bs[j].innerHTML=on?MI.heartOn:MI.heart;
    bs[j].setAttribute('aria-label',on?'\u53d6\u6d88\u6536\u85cf':'\u6536\u85cf');
  }
};

// ── 歌词刚重建那一下直接就位，不要滑过去 ──
var LC78={box:null,ps:null};
muLrcPaint=function(){
  var L=MU.lrc,a=MU.a;
  if(!L||!L.lines||!L.lines.length||!a)return;
  var box=$('muLrc');if(!box)return;
  var fresh=false;
  if(LC78.box!==box||!LC78.ps||!LC78.ps.length||!LC78.ps[0].isConnected){
    LC78.box=box;LC78.ps=[].slice.call(box.querySelectorAll('p[data-l]'));fresh=true;
  }
  var ps=LC78.ps,ls=L.lines,t=a.currentTime||0,k=-1;
  for(var i=0;i<ls.length;i++){if(ls[i].t<=t+.25)k=i;else break}
  if(k===MU.lrcAt&&!fresh)return;
  var old=MU.lrcAt;MU.lrcAt=k;
  var touch=[old-1,old,old+1,k-1,k,k+1],done={};
  for(var j=0;j<touch.length;j++){
    var n=touch[j];
    if(n<0||n>=ps.length||done[n])continue;
    done[n]=1;
    var p=ps[n];if(!p)continue;
    p.classList.toggle('on',n===k);
    p.classList.toggle('near',Math.abs(n-k)===1);
  }
  if(MU.lrcHold)return;
  var el=k>=0?ps[k]:null;if(!el)return;
  MU.asAt=Date.now();
  box.scrollTo({top:Math.max(0,el.offsetTop-box.clientHeight/2+el.offsetHeight/2),behavior:fresh?'auto':'smooth'});
};
var _loadV78=muLoad;
muLoad=function(){LC78.box=null;LC78.ps=null;return _loadV78.apply(this,arguments)};

// ── 把这三个动作从重画里拦下来 ──
var _bcV78=muBodyClick;
muBodyClick=function(e){
  var t=e.target.closest('[data-mu]');
  if(t){
    var a=t.dataset.mu;
    if(a==='mode'){
      var md=muMode(),i=0;
      MU_MODE.forEach(function(x,k){if(x[0]===md)i=k});
      var nx=MU_MODE[(i+1)%MU_MODE.length];
      muPref().mode=nx[0];save();muSyncLoop();muModeBtn();
      muToast('\u64ad\u653e\u65b9\u5f0f\uff1a'+nx[1]);
      return;
    }
    if(a==='queue'){muQueueToggle();return}
    if(a==='fav'){muFav();return}
  }
  return _bcV78.call(this,e);
};

}catch(e){console.error("[zika] js/v78.js",e)}
