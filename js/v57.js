// v57：回复节奏照聊天软件来
// 递出去 1~3 秒就已读 → 已读后马上「正在输入」→ 然后才按设置里的「最快~最慢」等第一张
// 后面几张（还有拍一拍、表情包）只隔几秒，像他接着在打字，不再每张都重新等一整轮
'use strict';
var R57={readMin:1000,readMax:3000,typeGap:600,nextMin:2500,nextMax:7000};

// 递出去以后：先很快已读
scheduleReply=function(){
  clearTimeout(replyTimer);
  var token=++replyRun;
  showTyping(false);
  replyTimer=setTimeout(function(){simulateReply(token)},rnd(R57.readMin,R57.readMax));
};

// 已读 → 正在输入 → 等「最快~最慢」→ 第一张 → 隔几秒 → 下一张
// 收藏你的字卡（v50）、拍一拍、表情包（sticker.js）、拼字卡（v25）、颜文字（v56）都照旧
simulateReply=function(token){
  if(token!==replyRun)return;
  var p=S.prefs;
  if(Math.random()*100<(+p.favRate||0)){
    var fv=S.cards.filter(function(c){return c.from==='me'&&!c.type&&c.text&&!c.taFav}).slice(-6);
    if(fv.length){pickOne(fv).taFav=true;save()}
  }
  var changed=false;
  S.cards.forEach(function(c){if(c.from==='me'&&!c.read){c.read=true;changed=true}});
  if(changed){save();renderChat()}
  if(p.readNo&&Math.random()*100<(+p.readNoRate)){showTyping(false);return}

  var acts=[];
  if(Math.random()*100<(+p.pokeRate||0))acts.push(function(){taPoke()});
  if(typeof taSticker==='function'&&typeof skPool==='function'&&skPool().length&&Math.random()*100<(+p.stickerRate||0))acts.push(function(){taSticker()});
  var pool=libPool();
  if(pool.length){
    var mine=S.cards.filter(function(c){return c.from==='me'&&!c.type&&c.text}).slice(-10);
    var n=replyCount();
    for(var i=0;i<n;i++)(function(i){
      acts.push(function(){
        var c={id:uid(),from:'ta',text:typeof comboText==='function'?comboText(pool):pickOne(pool),at:Date.now()};
        if(i===0&&mine.length&&Math.random()*100<(+p.quoteRate||0)){
          var m=pickOne(mine);c.quote={name:S.me.name||'我',text:m.text};
        }
        addReplyCard(c);
      });
    })(i);
  }
  if(!acts.length){showTyping(false);return}

  setTimeout(function(){
    if(token!==replyRun)return;
    showTyping(true);
    var delay=rnd(REPLY.waitMin,REPLY.waitMax);
    acts.forEach(function(fn,k){
      if(k>0)delay+=rnd(R57.nextMin,R57.nextMax);
      var last=k===acts.length-1;
      setTimeout(function(){
        if(token!==replyRun)return;
        fn();
        showTyping(!last);
      },delay);
    });
  },R57.typeGap);
};

// 设置里的说法跟着改
var _orsV57=openReplySet;
openReplySet=function(){
  _orsV57.apply(this,arguments);
  if(typeof sheetBody==='undefined'||!sheetBody)return;
  var L={replyMin:'已读后最快多久回',replyMax:'已读后最慢多久回'},last=null;
  Object.keys(L).forEach(function(k){
    var r=sheetBody.querySelector('input[type=range][data-k="'+k+'"]');if(!r)return;
    var f=r.closest('.field'),l=f&&f.querySelector('label');
    if(l)l.textContent=L[k];
    last=f||last;
  });
  if(last&&!sheetBody.querySelector('.r57h')){
    var h=document.createElement('p');h.className='hint r57h';
    h.textContent='递出去 1 到 3 秒就会已读，已读后马上显示正在输入，再在这两个时间之间回第一张。后面几张只隔几秒。';
    last.parentNode.insertBefore(h,last.nextSibling);
  }
};