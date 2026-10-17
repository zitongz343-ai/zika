// 图标换成细线小图，文艺一点：主页拱窗、传讯羽毛笔（插在墨水瓶里）、字卡库翻开的书、收藏小花枝、朋友圈拍立得、信箱封蜡信、塔罗月亮
// 自己在「板块图标」里换过的照旧用自己的；点「默认」回到这套线条图
'use strict';
var ZI={
  home:'<path d="M6 21V10a6 6 0 0 1 12 0v11"/><path d="M4 21h16"/><path d="M12 4v17M6 13h12"/>',
  chat:'<path d="M5 3l12 14"/><path d="M5 3c4.5-.5 9 2 10.5 6.5l-2.2.3 1 1.8-2.6-.2.6 1.4"/><path d="M5 3c-.6 3 .8 5.8 3.6 7.6"/><path d="M15 17.5v-1.5h4v1.5"/><path d="M13.5 17.5h7l-.8 3.5h-5.4z"/>',
  lib:'<path d="M12 6.5C10 5 7 4.5 3.5 5v13c3.5-.5 6.5 0 8.5 1.5 2-1.5 5-2 8.5-1.5V5C17 4.5 14 5 12 6.5z"/><path d="M12 6.5v13"/>',
  fav:'<path d="M12 21V9.5"/><path d="M12 15c-3.2 0-5.2-2-5.2-5.2 3.2 0 5.2 2 5.2 5.2z"/><path d="M12 12.5c0-3 2-5 5-5 0 3-2 5-5 5z"/><circle cx="12" cy="6" r="1.8"/>',
  moments:'<rect x="4" y="3.5" width="16" height="17" rx="1.5"/><path d="M4 15.5h16"/><circle cx="12" cy="9.5" r="2.6"/>',
  mail:'<rect x="3" y="5.5" width="18" height="13" rx="1.5"/><path d="M3.5 6.5l8.5 6.5 8.5-6.5"/><circle cx="12" cy="14.6" r="2.1" fill="currentColor" stroke="none"/>',
  tarot:'<path d="M19.5 14.5A8 8 0 1 1 9.5 4.5a6.5 6.5 0 0 0 10 10z"/><path d="M17.5 3.5v3M16 5h3"/>',
  set:'<path d="M4.5 7.5h9M18 7.5h1.5M4.5 16.5h1.5M10 16.5h9.5"/><circle cx="15.8" cy="7.5" r="2"/><circle cx="8" cy="16.5" r="2"/>',
  call:'<path d="M5.5 4h3l2 5-2.5 1.5a11 11 0 0 0 5.5 5.5L15 13.5l5 2v3a1.5 1.5 0 0 1-1.5 1.5A15.5 15.5 0 0 1 4 5.5 1.5 1.5 0 0 1 5.5 4z"/>',
  chats:'<path d="M5 5h14a1.5 1.5 0 0 1 1.5 1.5v9A1.5 1.5 0 0 1 19 17h-8l-4.5 3.5V17H5a1.5 1.5 0 0 1-1.5-1.5v-9A1.5 1.5 0 0 1 5 5z"/><path d="M12 8.5v5M9.5 11h5"/>',
  pen:'<path d="M5 19l1-4 9-9 3 3-9 9z"/>'
};
function ziSvg(k){return '<svg class="zi zi-'+k+'" viewBox="0 0 24 24" aria-hidden="true">'+ZI[k]+'</svg>'}
var _icHTMLz=icHTML;
icHTML=function(k){
  var v=S.prefs.icons&&S.prefs.icons[k];
  if(v||!ZI[k])return _icHTMLz(k);
  return ziSvg(k);
};
var _oisZ=openIconSet;
openIconSet=function(){
  _oisZ();
  sheetBody.querySelectorAll('.icrow input').forEach(function(i){i.placeholder='默认线条'});
  var h=sheetBody.querySelector('.hint');
  if(h)h.textContent='侧栏和主页入口用同一套。默认是线条小图，也可以填一个符号、emoji，或者换成图片。点「默认」回到线条图。';
};
(function(){
  var s=$('btnSet');if(s)s.innerHTML=ziSvg('set');
  var c=$('btnCall');if(c)c.innerHTML=ziSvg('call');
  var ch=$('btnChats');if(ch)ch.innerHTML=ziSvg('chats');
  document.querySelectorAll('.hp-cam').forEach(function(e){e.innerHTML=ziSvg('pen')});
})();
applyIcons();