// v63：侧栏「音乐」的图标跟其他板块配成一套。小印章是「乐」，罗马数字是 VIII
'use strict';
(function(){
  if(typeof IC_ORDER!=='undefined'&&IC_ORDER.indexOf('music')<0)IC_ORDER.push('music');
  if(typeof IC_SEAL==='object')IC_SEAL.music='乐';
  if(typeof IC_ROMAN!=='undefined')while(IC_ROMAN.length<IC_ORDER.length)IC_ROMAN.push(['VIII','IX','X'][IC_ROMAN.length-7]||'·');
  if(typeof IC_NAME==='object')IC_NAME.music='音乐';
  if(typeof applyIcons==='function')applyIcons();
})();
