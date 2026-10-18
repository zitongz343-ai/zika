// v58：已读不回、拍一拍、表情包、颜文字、引用各有一个开关，关着就不显示概率拉条
// 新增「他主动找你」：开关 + 最快~最慢间隔，从最后一条消息开始算
'use strict';
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
function rt(k){var o=RT58[k];if(o&&!S.prefs[o])return 0;return +S.prefs[k]||0}

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
function proPlan(){
  var p=S.prefs;
  if(!p.proOn){if(p.proNext){delete p.proNext;save()}return}
  var a=Math.max(1,+p.proMin||30),b=Math.max(a,+p.proMax||a);
  p.proNext=Date.now()+rnd(a,b)*60000;save();
}
function proFire(){
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
}
function proTick(){
  var p=S.prefs;
  if(!p.proOn||PRO.run)return;
  if(!p.proNext){proPlan();return}
  if(Date.now()<p.proNext)return;
  if(rp57Busy())return;
  if(S.cards.some(function(c){return c.from==='me'&&!c.read}))return; // 他还没回你上一句
  if(typeof C!=='undefined'&&C&&C.state&&C.state!=='idle')return;   // 正在通话
  proFire();
}
// 你递出去、他发过来，都从这一刻重新算
var _schV58=scheduleReply;
scheduleReply=function(){_schV58.apply(this,arguments);proPlan()};
var _arcV58=addReplyCard;
addReplyCard=function(c){var r=_arcV58.apply(this,arguments);if(c&&c.from==='ta')proPlan();return r};
setInterval(proTick,15000);
document.addEventListener('visibilitychange',function(){if(!document.hidden)setTimeout(proTick,3000)});
setTimeout(proTick,4000);

// ── 设置：开关在上，打开了才显示概率 ──
function swRow58(label){
  var l=document.createElement('label');l.className='l4-swrow v58-sw';
  l.innerHTML='<span></span><input type="checkbox"><i class="l4-tg"></i>';
  l.querySelector('span').textContent=label;
  return l;
}
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
