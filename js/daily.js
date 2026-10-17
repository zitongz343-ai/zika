// 今日一句只从字卡库「氛围感 → 每日一句」里挑，按日子随机，一天之内不变；空着就提示去加，不再从主字卡里挑
// 回复时间：最快、最慢都能拉到 10 分钟（照 milk），一分钟以上显示成「几分几秒」
'use strict';
function dailyPick(){
  var pool=tagPool('每日一句');
  if(!pool.length)return '';
  var d=new Date(),h=(d.getFullYear()*10000+(d.getMonth()+1)*100+d.getDate())>>>0;
  // 打散一下，不然相邻两天会挑到挨着的两句
  h=Math.imul(h^(h>>>16),0x45d9f3b)>>>0;h=Math.imul(h^(h>>>16),0x45d9f3b)>>>0;h=(h^(h>>>16))>>>0;
  return pool[h%pool.length];
}
var _rhDaily=renderHome;
renderHome=function(){
  _rhDaily();
  var q=$('qText');if(!q)return;
  var t=dailyPick();
  q.textContent=t||'字卡库「氛围感 → 每日一句」还空着，去加几句吧。';
};
if(typeof L4_HINT==='object')L4_HINT['每日一句']='主页「今日一句」每天从这里随机挑一句，一天之内不变。这里空着的话主页会提示你来加。';

// 回复时间最长 10 分钟
var REPLY_MAX_SEC=600;
var _fmtDaily=fmtPref;
fmtPref=function(k,v){
  if(k==='replyMin'||k==='replyMax'){
    v=Math.round(+v||0);
    if(v<60)return v+' 秒';
    var m=Math.floor(v/60),s=v%60;
    return s?m+' 分 '+s+' 秒':m+' 分钟';
  }
  return _fmtDaily(k,v);
};
var _orsDaily=openReplySet;
openReplySet=function(){
  _orsDaily();
  ['replyMin','replyMax'].forEach(function(k){
    var r=sheetBody.querySelector('input[type=range][data-k="'+k+'"]');if(!r)return;
    r.max=String(REPLY_MAX_SEC);r.value=S.prefs[k];
    var b=sheetBody.querySelector('[data-v="'+k+'"]');if(b)b.textContent=fmtPref(k,+S.prefs[k]);
  });
};

renderHome();
