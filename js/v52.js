// 把「⋯」那一排挪到输入框左边，和输入框、递出去排在同一行
'use strict';
(function(){
  var bar=$('fbar'),sr=document.querySelector('.chat-foot .send-row');
  if(!bar||!sr||bar.parentNode===sr)return;
  sr.insertBefore(bar,sr.firstChild);
})();
