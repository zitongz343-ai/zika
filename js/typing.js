// v31：把「正在输入」挪进输入栏里，靠 CSS 浮到输入框左上方
'use strict';
(function(){
  var t=document.getElementById('typing'),f=document.querySelector('.chat-foot');
  if(!t||!f)return;
  f.insertBefore(t,f.firstChild);
  // 输入栏本来没定位就给它一个，好让小块贴着它
  if(getComputedStyle(f).position==='static')f.style.position='relative';
  f.style.overflow='visible';
})();
