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
function rnd(a,b){return a+Math.random()*(b-a)}
function pickOne(a){return a[Math.floor(Math.random()*a.length)]}
// milk 原版：75% 回 1 张，剩下的里 95% 回 2 张，其余 3 张
function replyCount(){return Math.random()<0.75?1:(Math.random()<0.95?2:3)}

// 正在输入提示，放在字卡流和输入框之间
var typingEl=document.createElement('div');
typingEl.id='typing';typingEl.hidden=true;
(function(){var foot=document.querySelector('.chat-foot');foot.parentNode.insertBefore(typingEl,foot)})();
function showTyping(on){
  typingEl.hidden=!on;
  if(on)typingEl.innerHTML='<span class="ty-av">'+avStr(S.ta)+'</span><span>'+esc(taName())+' 正在输入</span><i></i><i></i><i></i>';
  var st=document.querySelector('.chat-top .who .st');
  if(st)st.textContent=on?'正在输入…':'在线';
}
function addReplyCard(c){S.cards.push(c);save();renderChat();updateNav()}

// 你又递了一张，就打断他正在回的，重新等
function scheduleReply(){
  clearTimeout(replyTimer);
  var token=++replyRun;
  showTyping(false);
  replyTimer=setTimeout(function(){simulateReply(token)},rnd(REPLY.waitMin,REPLY.waitMax));
}
function simulateReply(token){
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
}

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
