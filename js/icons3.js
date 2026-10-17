// 侧栏底下那排：设置、夜间/日间、字体，也换成细线小图，跟 icons2 一套
'use strict';
ZI.sun='<circle cx="12" cy="12" r="3.6"/><path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6L7 7M17 17l1.4 1.4M5.6 18.4L7 17M17 7l1.4-1.4"/>';
ZI.moon='<path d="M19 14.5A7.5 7.5 0 1 1 9.5 5a6 6 0 0 0 9.5 9.5z"/>';
ZI.font='<path d="M5.5 19L11.5 5l6 14"/><path d="M7.8 13.6h7.4"/><path d="M3.5 19h4M15.5 19h4"/>';
(function(){
  var st=document.createElement('style');
  st.textContent='.sb-mini{display:inline-flex;align-items:center;justify-content:center;gap:6px}.sb-mini svg.zi{flex:0 0 auto;width:15px;height:15px}';
  document.head.appendChild(st);
})();
function ziFoot(el,k,t){el.innerHTML=ziSvg(k)+'<span>'+t+'</span>'}
function ziPaintFoot(){
  var d=$('sbDark');if(d){var dk=!!S.prefs.dark;ziFoot(d,dk?'sun':'moon',dk?'日间':'夜间')}
  var s=$('sbSet');if(s)ziFoot(s,'set','设置');
  document.querySelectorAll('.sb-foot .sb-mini').forEach(function(b){if(!b.id&&b.textContent.indexOf('字体')>=0)ziFoot(b,'font','字体')});
  var h=$('btnSet');if(h&&!h.querySelector('svg'))h.innerHTML=ziSvg('set');
}
// 切日夜的时候原来会把按钮写回文字，这里跟着再画一遍
var _alZ3=applyLook;
applyLook=function(){_alZ3();ziPaintFoot()};
ziPaintFoot();