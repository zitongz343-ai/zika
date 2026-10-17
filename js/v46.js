// 传讯页：名字下面把「在线」和状态排成一行；通话按钮从顶栏挪到底栏；开屏重做
'use strict';
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
// 开屏：名字当主角，细线和小星星跟主页那行对得上，整体短一点
function spStar(){return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 0C12.6 7 17 11.4 24 12C17 12.6 12.6 17 12 24C11.4 17 7 12.6 0 12C7 11.4 11.4 7 12 0Z"/></svg>'}
(function(){
  var box=document.querySelector('#splash .sp'),sp=$('splash');if(!box||!sp)return;
  box.innerHTML='<div class="sp-en"><i></i><span>ALWAYS · TOGETHER</span><i></i></div>'
    +'<div class="sp-nm" id="spSub"></div>'
    +'<div class="sp-ft"><i></i>'+spStar()+'<i></i></div>'
    +'<div class="sp-title">字 卡 传 讯</div>';
  $('spSub').textContent=(S.me.name||'我')+' × '+taName();
  setTimeout(function(){
    sp.classList.add('out');
    setTimeout(function(){sp.style.display='none'},700);
  },1800);
})();
