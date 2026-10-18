// v55 底栏照小红书私信那样排：⊕ 更多 ｜ 发送消息… ｜ 表情包 ｜ 发图片 ｜ 圆形发送
'use strict';
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
