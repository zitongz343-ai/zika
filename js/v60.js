// v60：系统通知（从主屏幕打开时可用，切到后台也弹）；页面里的横幅留着；新图标
'use strict';
var V60_DEF={sysOn:false,sysMail:true};
(function(){
  var p=S.prefs,k;
  for(k in V60_DEF){if(p[k]===undefined||p[k]===null)p[k]=V60_DEF[k];if(typeof P_DEF==='object')P_DEF[k]=V60_DEF[k]}
  save();
})();

// ── 新图标：粉到淡紫的底，两张叠着的字卡，右下角一颗小心 ──
var ICON60_SVG='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 180"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fde8ee"/><stop offset=".5" stop-color="#f1c6d8"/><stop offset="1" stop-color="#c3b2ee"/></linearGradient><radialGradient id="h" cx=".28" cy=".2" r=".7"><stop offset="0" stop-color="#fff" stop-opacity=".7"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient></defs><rect width="180" height="180" fill="url(#g)"/><rect width="180" height="180" fill="url(#h)"/><rect x="44" y="46" width="82" height="98" rx="16" fill="#fff" fill-opacity=".5" transform="rotate(-9 85 95)"/><g transform="rotate(6 95 88)"><rect x="54" y="42" width="82" height="100" rx="16" fill="#9b6a8a" fill-opacity=".14"/><rect x="54" y="38" width="82" height="100" rx="16" fill="#fff"/><rect x="68" y="60" width="40" height="6" rx="3" fill="#e9b3c8"/><rect x="68" y="76" width="54" height="6" rx="3" fill="#f1d3e0"/><rect x="68" y="92" width="32" height="6" rx="3" fill="#f1d3e0"/><path d="M114 128c-7-4.6-11-8.6-11-12.6a5.4 5.4 0 0 1 11-1.6a5.4 5.4 0 0 1 11 1.6c0 4-4 8-11 12.6z" fill="#d97fa2"/></g></svg>';
var ICON60={png:''};
function icon60Url(){return 'data:image/svg+xml;charset=utf-8,'+encodeURIComponent(ICON60_SVG)}
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
function ntOK(){return 'Notification' in window}
function ntGranted(){return ntOK()&&Notification.permission==='granted'}
function ntGo(to){
  if(typeof sheet!=='undefined'&&sheet&&!sheet.hidden)closeSheet();
  if(to==='mail'&&typeof MAILTAB!=='undefined')MAILTAB='in';
  go(to==='mail'?'mail':'chat');
}
if('serviceWorker' in navigator){
  navigator.serviceWorker.register('notify-sw.js').then(function(r){NT.reg=r}).catch(function(){});
  navigator.serviceWorker.addEventListener('message',function(e){var d=e.data||{};if(d.zika==='go')ntGo(d.to)});
}
(function(){var m=/[?&]go=(chat|mail)/.exec(location.search);if(m)setTimeout(function(){ntGo(m[1])},900)})();
function ntShow(title,body,to){
  if(!S.prefs.sysOn||!ntGranted())return;
  var opt={body:body||'',tag:'zika-'+Date.now(),data:{to:to||'chat'}};
  if(S.ta.img)opt.icon=S.ta.img;
  function plain(){try{new Notification(title,opt)}catch(e){}}
  if(NT.reg&&NT.reg.showNotification){
    var p=NT.reg.showNotification(title,opt);
    if(p&&p.catch)p.catch(plain);
  }else plain();
}
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
