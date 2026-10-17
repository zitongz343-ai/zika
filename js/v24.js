// v24：设置里点一项，原来是先把弹层关掉、80ms 后再开下一页，中间那一下会露出底下的页面，而且新页先是半屏再变全屏
// 现在全屏弹层关的时候先等一小会儿，这期间要是又开了新页，就直接在原地换内容，不关不开
'use strict';
var SW24={timer:null};
(function(){
  var st=document.createElement('style');
  st.textContent='#sheetBody.v24in{animation:v24in .2s ease both}@keyframes v24in{from{opacity:0;transform:translateX(12px)}}';
  document.head.appendChild(st);
})();
closeSheet=function(){
  if(sheet.hidden)return;
  if(!sheet.classList.contains('full')){sheet.hidden=true;return}
  clearTimeout(SW24.timer);
  SW24.timer=setTimeout(function(){SW24.timer=null;sheet.hidden=true;sheet.classList.remove('full')},180);
};
var _osV24=openSheet;
openSheet=function(t,n){
  var swap=!!SW24.timer;
  if(swap){clearTimeout(SW24.timer);SW24.timer=null}
  _osV24(t,n);
  if(swap){
    sheet.classList.add('full');
    sheetBody.classList.remove('v24in');void sheetBody.offsetWidth;sheetBody.classList.add('v24in');
    var inr=sheet.querySelector('.inner');if(inr)inr.scrollTop=0;
  }
};
