// 色板和「配色」重叠：前面改了三版 CSS 都没压住，这次不走样式表，直接给元素挂内联 important
// 面板每次重画都再压一次，不用担心切配色以后又死回去
'use strict';
function swIm(el,k,v){if(el)el.style.setProperty(k,v,'important')}
function swFix(){
  if(typeof sheetBody==='undefined'||!sheetBody)return;
  var sw=sheetBody.querySelector('.swatches');if(!sw)return;
  // 「配色」那行字单独占一行
  var f=sw.parentNode;
  if(f&&f.classList&&f.classList.contains('field')){
    swIm(f,'display','block');
    var lb=f.querySelector('label');
    if(lb){
      swIm(lb,'display','block');swIm(lb,'position','static');swIm(lb,'float','none');
      swIm(lb,'width','100%');swIm(lb,'margin','0 0 10px');swIm(lb,'padding','0');
      swIm(lb,'line-height','1.6');
    }
  }
  // 圆点另起一行，横着排
  swIm(sw,'display','flex');swIm(sw,'flex-wrap','nowrap');swIm(sw,'align-items','center');
  swIm(sw,'justify-content','flex-start');swIm(sw,'gap','14px');
  swIm(sw,'margin','0 0 18px');swIm(sw,'padding','0');swIm(sw,'clear','both');
  // 正圆，长宽锁死，不跟着容器伸缩
  sw.querySelectorAll('.sw').forEach(function(b){
    swIm(b,'flex','0 0 34px');
    swIm(b,'width','34px');swIm(b,'height','34px');
    swIm(b,'min-width','34px');swIm(b,'max-width','34px');
    swIm(b,'min-height','34px');swIm(b,'max-height','34px');
    swIm(b,'border-radius','50%');swIm(b,'padding','0');
    swIm(b,'position','relative');swIm(b,'box-sizing','border-box');
    swIm(b,'align-self','center');swIm(b,'aspect-ratio','1 / 1');
    var i=b.querySelector('i');
    if(i){
      swIm(i,'position','absolute');
      swIm(i,'inset',b.classList.contains('custom')?'10px':'5px');
      swIm(i,'border-radius','50%');
    }
  });
}
// 面板是点一下就重画的，盯着 DOM 变动再压一次（只盯结构，不盯样式，不会自己转圈）
(function(){
  if(!window.MutationObserver||typeof sheetBody==='undefined'||!sheetBody)return;
  new MutationObserver(function(){swFix()}).observe(sheetBody,{childList:true,subtree:true});
})();
if(typeof openLook==='function'){
  var _olSw=openLook;
  openLook=function(){_olSw();swFix()};
}
swFix();
