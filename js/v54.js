// 色点回归正圆：开屏已经改名 .spw，这里只做一道兼容，清掉旧缓存里可能残留的偏移
'use strict';
function swIm(el,k,v){if(el)el.style.setProperty(k,v,'important')}
function swFix(){
  if(typeof sheetBody==='undefined'||!sheetBody)return;
  var sw=sheetBody.querySelector('.swatches');if(!sw)return;
  swIm(sw,'display','flex');swIm(sw,'flex-wrap','nowrap');swIm(sw,'align-items','center');
  swIm(sw,'gap','14px');swIm(sw,'transform','none');swIm(sw,'padding','0');
  sw.querySelectorAll('.sw').forEach(function(b){
    swIm(b,'transform','none');swIm(b,'padding','0');
    swIm(b,'flex','0 0 34px');swIm(b,'width','34px');swIm(b,'height','34px');
    swIm(b,'border-radius','50%');swIm(b,'position','relative');
    swIm(b,'box-sizing','border-box');swIm(b,'aspect-ratio','1 / 1');
    var i=b.querySelector('i');
    if(i){swIm(i,'position','absolute');swIm(i,'inset','5px');swIm(i,'border-radius','50%')}
  });
}
(function(){
  if(!window.MutationObserver||typeof sheetBody==='undefined'||!sheetBody)return;
  new MutationObserver(function(){swFix()}).observe(sheetBody,{childList:true,subtree:true});
})();
swFix();
