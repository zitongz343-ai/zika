// 侧栏底下：夜间/日间、设置 改成跟板块图标配套的小方章；字体按钮去掉
// 设置 → 外观 → 全局字体 还在，改字体、改字号、导入字体都从那里进
'use strict';
(function(){
  document.querySelectorAll('.sb-foot .sb-mini').forEach(function(b){
    if(!b.id&&b.textContent.indexOf('字体')>=0)b.remove();
  });
})();
function zfBtn(el,ch,t){el.innerHTML='<span class="zsl">'+ch+'</span><span>'+t+'</span>'}
ziPaintFoot=function(){
  var d=$('sbDark');
  if(d){var dk=!!S.prefs.dark;zfBtn(d,dk?'日':'夜',dk?'日间':'夜间')}
  var s=$('sbSet');if(s)zfBtn(s,'设','设置');
  var h=$('btnSet');if(h&&!h.querySelector('.zsl'))h.innerHTML='<span class="zsl">设</span>';
};
ziPaintFoot();
