// 新开对话：传讯页顶栏电话左边多一个按钮。
// 新开的时候，现在这段收进「以前的」，随时能点回来接着说。字卡库、收藏、设置都不动
'use strict';
(function(){
  if(!Array.isArray(S.chats))S.chats=[];
  if(!S.chatCur||typeof S.chatCur!=='object')S.chatCur={id:uid(),at:S.cards.length?S.cards[0].at:Date.now()};
  save();
})();
var CH_IC='<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 4h14a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-9l-5 4v-4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z"/><path d="M12 7.5v6M9 10.5h6"/></svg>';

// 标题：这段里你说的第一句；没有就拿第一张字
function chTitle(cards){
  var i,c;
  for(i=0;i<cards.length;i++){c=cards[i];if(c.from==='me'&&!c.type&&c.text)return String(c.text).slice(0,18)}
  for(i=0;i<cards.length;i++){c=cards[i];if(!c.type&&c.text)return String(c.text).slice(0,18)}
  return '没说话的一段';
}
function chSpan(it){
  var cs=it.cards||[];
  if(!cs.length)return fmt(it.at);
  var a=cs[0].at,b=cs[cs.length-1].at;
  return cs.length>1?fmt(a)+' ~ '+fmt(b):fmt(a);
}
// 换对话前把他正在回的、正在输入的、引用条都停掉
function chStop(){
  if(typeof replyTimer!=='undefined')clearTimeout(replyTimer);
  if(typeof replyRun!=='undefined')replyRun++;
  if(typeof showTyping==='function')showTyping(false);
  if(typeof setQuote==='function')setQuote(null);
}
function chArchive(){
  if(!S.cards.length)return;
  S.chats.unshift({id:S.chatCur.id||uid(),at:S.chatCur.at||S.cards[0].at,end:Date.now(),title:chTitle(S.cards),cards:S.cards});
}
function chDone(){
  if(!save())alert('存的时候出了点问题，刷新一下看看。');
  renderChat();updateNav();
}
function chNew(){
  chStop();chArchive();
  S.cards=[];S.chatCur={id:uid(),at:Date.now()};
  chDone();
}
function chOpen(id){
  var it=S.chats.filter(function(x){return x.id===id})[0];if(!it)return;
  chStop();
  S.chats=S.chats.filter(function(x){return x.id!==id});
  chArchive();
  S.cards=Array.isArray(it.cards)?it.cards:[];
  S.chatCur={id:it.id,at:it.at};
  chDone();
}
function openChats(){
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
}
(function(){
  var top=document.querySelector('.chat-top');if(!top||$('btnChats'))return;
  var b=document.createElement('button');b.type='button';b.className='ico';b.id='btnChats';
  b.setAttribute('aria-label','新开对话');b.innerHTML=CH_IC;
  b.addEventListener('click',openChats);
  var call=$('btnCall');
  if(call&&call.parentNode===top)top.insertBefore(b,call);else top.appendChild(b);
})();
