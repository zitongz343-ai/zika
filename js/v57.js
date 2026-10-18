// v57：回复节奏改成「递出去 → 一两秒后已读 → 马上弹正在输入 → 再按设置的最快~最慢回第一张」
// 原来设置里的时长被拿去等「已读」，已读以后拍一拍、表情包、每张字卡又各等一遍，所以慢很多
'use strict';
var RP57={tok:-1,busy:false};
function rp57Busy(){return RP57.busy&&RP57.tok===replyRun}
function rp57Read(){
  var changed=false;
  S.cards.forEach(function(c){if(c.from==='me'&&!c.read){c.read=true;changed=true}});
  if(changed){save();renderChat()}
}

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
