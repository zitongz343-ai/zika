// 他也会收藏你的字卡，概率可调；设置里去掉字卡分组（字卡库那边本来就能管）
'use strict';
(function(){
  if(S.prefs.favRate===undefined||S.prefs.favRate===null)S.prefs.favRate=10;
  P_DEF.favRate=10;
  save();
})();

// 设置：字卡分组那一项拿掉，空了的分组也收起来
(function(){
  SET_GROUPS.forEach(function(g){
    g[1]=g[1].filter(function(i){return i[0]!=='l4GroupsSheet'&&i[0]!=='openGroups'});
  });
  for(var i=SET_GROUPS.length-1;i>=0;i--)if(!SET_GROUPS[i][1].length)SET_GROUPS.splice(i,1);
})();

// 他收藏：每次他要回你之前掲一次，掲中了就从你最近几张里收藏一张
var _srFav=simulateReply;
simulateReply=function(token){
  if(token===replyRun&&Math.random()*100<(+S.prefs.favRate||0)){
    var mine=S.cards.filter(function(c){return c.from==='me'&&!c.type&&c.text&&!c.taFav}).slice(-6);
    if(mine.length){pickOne(mine).taFav=true;save()}
  }
  _srFav(token);
};
// 收藏过的那张，右上角多一颗星
var _ceFav=cardEl;
cardEl=function(c){
  var el=_ceFav(c);
  if(!c||c.from!=='me'||!c.taFav||!el||!el.querySelector)return el;
  var h=el.querySelector('.head');
  if(h&&!h.querySelector('.tafv')){
    var s=document.createElement('span');s.className='tafv';s.textContent='★';
    s.title=taName()+' 收藏了这张';
    h.appendChild(s);
  }
  return el;
};

// 设置 → 回复 · 回信 · 通话：引用那条后面再加一条
var _orsFav=openReplySet;
openReplySet=function(){
  _orsFav();
  var a=sheetBody.querySelector('input[type=range][data-k="quoteRate"]');
  if(!a)return;
  var host=a.closest('.field');if(!host)return;
  var box=document.createElement('div');box.className='field';
  box.innerHTML='<label>收藏你的字卡</label><div class="rg"><input type="range" min="0" max="100" step="1"><b></b></div>';
  var r=box.querySelector('input'),v=box.querySelector('b');
  function paint(){r.value=+S.prefs.favRate||0;v.textContent=(+S.prefs.favRate||0)+'%'}
  r.addEventListener('input',function(){S.prefs.favRate=+r.value;paint()});
  r.addEventListener('change',function(){save()});
  paint();
  host.parentNode.insertBefore(box,host.nextSibling);
  var h=document.createElement('p');h.className='hint';
  h.textContent='他回你之前掲一次。掲中了就从你最近几张里收藏一张，那张字卡右上角会多一颗星。';
  box.parentNode.insertBefore(h,box.nextSibling);
};
renderChat();
