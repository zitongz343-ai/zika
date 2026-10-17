// v9：偏好数据和生效逻辑。回复概率、回复时长、回信时长、通话概率、主页壁纸、板块图标、全局字体
var P_DEF={replyRate:100,replyMin:3,replyMax:7,pokeRate:3,quoteRate:30,mailRate:100,mailMin:30,mailMax:240,ringRate:35,rejectRate:20,wall:'',wallDim:20,icons:{},font:{id:'serif',name:'',url:''}};
function ensurePrefs(){
  if(!S.prefs||typeof S.prefs!=='object')S.prefs={};
  for(var k in P_DEF)if(S.prefs[k]===undefined||S.prefs[k]===null)S.prefs[k]=JSON.parse(JSON.stringify(P_DEF[k]));
  if(typeof S.prefs.icons!=='object')S.prefs.icons={};
  if(typeof S.prefs.font!=='object')S.prefs.font=JSON.parse(JSON.stringify(P_DEF.font));
  if(!Array.isArray(S.libOff))S.libOff=[];
  if(!S.call||typeof S.call!=='object')S.call={reject:true,random:true};
  if(!S.prefs.mailInit){S.mails.forEach(function(m){if(m.replyAt===undefined)m.replyAt=0});S.prefs.mailInit=true}
}
ensurePrefs();save();

// 回复：时长、拍一拍、引用、通话概率都写回 reply.js / call.js 的参数
function applyReplyPrefs(){
  var p=S.prefs;
  var a=Math.max(0,+p.replyMin||0),b=Math.max(a,+p.replyMax||0);
  REPLY.waitMin=a*1000;REPLY.waitMax=b*1000;
  REPLY.pokeRate=(+p.pokeRate||0)/100;REPLY.quoteRate=(+p.quoteRate||0)/100;
  CALL.ringRate=(+p.ringRate||0)/100;CALL.rejectRate=(+p.rejectRate||0)/100;
  S.call.reject=CALL.rejectRate>0;S.call.random=CALL.ringRate>0;
  planRing();
}
// 他回字卡时用的池子：去掉“信”和被关掉的分组
function libPool(){
  var off=S.libOff||[];
  return S.lib.filter(function(x){return x.tag!=='信'&&off.indexOf(x.tag)<0}).map(function(x){return x.text});
}
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
function composeMail(src){
  var letters=S.lib.filter(function(x){return x.tag==='信'}).map(function(x){return x.text});
  var pool=libPool(),lines=[],n=3+Math.floor(Math.random()*4);
  for(var i=0;i<n&&pool.length;i++){var t=pickOne(pool);if(lines.indexOf(t)<0)lines.push(t)}
  if(letters.length)lines.push(pickOne(letters));
  if(!lines.length)lines.push('收到了。');
  return{id:uid(),from:'ta',title:'回：'+src.title,body:lines.join('\n\n'),at:Date.now(),read:false,replyAt:0};
}
function mailTick(){
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
}
setInterval(mailTick,20000);
document.addEventListener('visibilitychange',function(){if(!document.hidden)mailTick()});

// 主页壁纸：只在主页显示
var wallEl=document.createElement('div');wallEl.id='wall';
document.body.insertBefore(wallEl,document.body.firstChild);
function applyWall(){
  var p=S.prefs;
  wallEl.style.backgroundImage=p.wall?'url("'+p.wall+'")':'';
  wallEl.style.setProperty('--dim',(+p.wallDim||0)/100);
  document.body.classList.toggle('has-wall',!!p.wall);
}
var _goV9=go;
go=function(v){_goV9(v);document.body.classList.toggle('on-home',v==='home')};

// 板块图标：侧栏和主页入口共用一套，可以是符号也可以是图片
var IC_DEF={home:'⌂',chat:'▤',lib:'❏',moments:'◍',mail:'✉',tarot:'✦'};
var IC_NAME={home:'主页',chat:'传讯',lib:'字卡库',moments:'朋友圈',mail:'回信',tarot:'塔罗'};
function icHTML(k){
  var v=S.prefs.icons[k]||IC_DEF[k]||'';
  return /^(data:|https?:)/.test(v)?'<img src="'+esc(v)+'" alt="">':esc(v);
}
function applyIcons(){
  document.querySelectorAll('#tabbar .tab').forEach(function(t){var i=t.querySelector('i');if(i)i.innerHTML=icHTML(t.dataset.view)});
  document.querySelectorAll('.entry[data-go]').forEach(function(e){
    var s=e.querySelector('.ei');
    if(!s){s=document.createElement('i');s.className='ei';e.appendChild(s)}
    s.innerHTML=icHTML(e.dataset.go);
  });
}

// 全局字体
var FONTS=[
{id:'serif',n:'宋体',d:'默认',f:''},
{id:'sans',n:'苹方',d:'系统黑体',f:'-apple-system,BlinkMacSystemFont,"PingFang SC","Helvetica Neue",sans-serif'},
{id:'kai',n:'楷体',d:'系统自带',f:'"Kaiti SC","STKaiti","KaiTi",serif'},
{id:'round',n:'圆体',d:'系统自带',f:'"Yuanti SC","YouYuan",-apple-system,sans-serif'},
{id:'wenkai',n:'霞鹜文楷',d:'要联网加载',f:'"LXGW WenKai Screen","Kaiti SC",serif',css:'https://cdn.jsdelivr.net/npm/lxgw-wenkai-screen-webfont/style.css'},
{id:'custom',n:'自定义',d:'填字体名或链接',f:''}];
function loadFontCss(url){
  var l=document.getElementById('fontCss');
  if(!l){l=document.createElement('link');l.id='fontCss';l.rel='stylesheet';document.head.appendChild(l)}
  if(l.getAttribute('href')!==url)l.setAttribute('href',url);
}
function applyFont(){
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
}

function applyAllPrefs(){ensurePrefs();applyReplyPrefs();applyWall();applyIcons();applyFont();mailTick()}
applyAllPrefs();
document.body.classList.toggle('on-home',!!document.querySelector('.view.on[data-view="home"]'));
