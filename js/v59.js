// v59：通知横幅；网页图标和名字；普通气泡点一下，气泡上面浮出引用 / 收藏 / 删除
'use strict';
var V59_DEF={banOn:true,banMail:true,appName:'字卡传讯',appIcon:''};
(function(){
  var p=S.prefs,k;
  for(k in V59_DEF){if(p[k]===undefined||p[k]===null)p[k]=V59_DEF[k];if(typeof P_DEF==='object')P_DEF[k]=V59_DEF[k]}
  save();
})();
function curView59(){var v=document.querySelector('.view.on');return v?v.dataset.view:''}

// ── 通知横幅：不在传讯页时，他发来消息从顶上滑下来一条 ──
var BAN={el:null,timer:null};
function banEl(){
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
}
function banShow(title,text,to){
  var b=banEl();
  setAv(b.querySelector('.ban-av'),S.ta);
  b.querySelector('b').textContent=title;
  b.querySelector('p').textContent=text;
  b.dataset.to=to||'chat';
  b.classList.remove('on');void b.offsetWidth;b.classList.add('on');
  clearTimeout(BAN.timer);BAN.timer=setTimeout(banHide,4500);
}
function banHide(){clearTimeout(BAN.timer);if(BAN.el)BAN.el.classList.remove('on')}
function banText(c){
  if(c.type==='poke')return c.text||'拍了拍你';
  if(c.type==='sticker')return c.photo?'[图片]':'[表情包]';
  return String(c.text||'').replace(/\s+/g,' ').slice(0,80);
}
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
function bpPlain(){return document.documentElement.dataset.bubble==='plain'}
function bpEl(){
  if(BP.el)return BP.el;
  var p=document.createElement('div');p.id='bpop';
  p.addEventListener('click',function(e){
    e.stopPropagation();
    var b=e.target.closest('[data-i]');if(!b||!BP.btns)return;
    var o=BP.btns[+b.dataset.i];bpHide();if(o)o.click();
  });
  document.body.appendChild(p);BP.el=p;return p;
}
function bpKind(b){
  var t=b.textContent.trim();
  if(b.classList.contains('del')||/撕|删/.test(t))return 'del';
  if(/引用/.test(t))return 'quote';
  if(/收藏/.test(t))return /取消/.test(t)?'faved':'fav';
  return '';
}
function bpShow(card){
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
}
function bpPlace(){
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
}
function bpHide(){
  if(BP.el)BP.el.classList.remove('on');
  if(BP.card)BP.card.classList.remove('show-del');
  BP.card=null;BP.btns=null;
}
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
function appDefIcon(){
  var c=document.createElement('canvas');c.width=c.height=180;var x=c.getContext('2d');
  var a=(getComputedStyle(document.documentElement).getPropertyValue('--accent')||'').trim()||'#b96f74';
  var g=x.createLinearGradient(0,0,180,180);g.addColorStop(0,'#fbeff0');g.addColorStop(1,a);
  x.fillStyle=g;x.fillRect(0,0,180,180);
  x.fillStyle='#ffffff';x.font='300 96px "Songti SC","Noto Serif SC",serif';
  x.textAlign='center';x.textBaseline='middle';x.fillText('∞',90,96);
  return c.toDataURL('image/png');
}
function appLink(rel){var l=document.querySelector('link[rel="'+rel+'"]');if(!l){l=document.createElement('link');l.rel=rel;document.head.appendChild(l)}return l}
function appMeta(n,v){var m=document.querySelector('meta[name="'+n+'"]');if(!m){m=document.createElement('meta');m.name=n;document.head.appendChild(m)}m.setAttribute('content',v)}
function appName59(){return (S.prefs.appName||'').trim()||V59_DEF.appName}
function applyApp(){
  var nm=appName59();
  document.title=nm;
  appMeta('apple-mobile-web-app-title',nm);appMeta('application-name',nm);
  var ic=S.prefs.appIcon||appDefIcon();
  appLink('apple-touch-icon').href=ic;appLink('icon').href=ic;
  var st=document.querySelector('#splash .sp-title');if(st)st.textContent=nm;
}
var _pnV59=paintNames;
paintNames=function(){_pnV59.apply(this,arguments);applyApp()};

function openAppSet(){
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
}

function openBanSet(){
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
}

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
