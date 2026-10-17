// v28：纪念日的日期框改成两行（名字一行、日期一行），日期框自己画，不会被系统日期框撑出屏幕
// 设置重新归类；「回信」改叫「信箱」
'use strict';
function v28Date(){
  var dt=document.getElementById('dyD');if(!dt||dt.dataset.v28)return;
  dt.dataset.v28='1';
  var box=document.createElement('label');box.className='v28-date';
  var show=document.createElement('span');show.className='v28-dshow';
  dt.parentNode.insertBefore(box,dt);
  box.appendChild(show);box.appendChild(dt);
  function paint(){
    var v=dt.value,p=v?v.split('-'):null;
    if(p&&p.length===3){show.textContent=p[0]+' 年 '+Number(p[1])+' 月 '+Number(p[2])+' 日';show.classList.remove('ph')}
    else{show.textContent='点这里选日子';show.classList.add('ph')}
  }
  dt.addEventListener('change',paint);dt.addEventListener('input',paint);dt.addEventListener('blur',paint);
  paint();
}
var _dyFormV28=dyForm;
dyForm=function(d){_dyFormV28(d);v28Date()};

// 设置重新归类：聊天那组太长，拆开；「每句话显示头像」收进「聊天头像」里；字卡分组用字卡库那套
(function(){
  var all={},order=[];
  SET_GROUPS.forEach(function(g){g[1].forEach(function(i){if(!all[i[0]]){all[i[0]]=i;order.push(i[0])}})});
  all.l4GroupsSheet=['l4GroupsSheet','字卡分组',function(){return mainTags().length+' 组'}];
  if(all.openAvSet)all.openAvSet[2]=function(){if(!S.prefs.msgAv)return '不显示';return(S.prefs.avShape==='square'?'方角':'圆形')+' · '+S.prefs.avSize+'px'};
  var NG=[
    ['我们',['openProfile','openDays']],
    ['外观',['sw:dark','openLook','openWallSet','openIconSet','openFontSet']],
    ['聊天样式',['openBubble','openAvSet']],
    ['他怎么回你',['openReplySet','openComboSet','openMoSet','openSndSet']],
    ['字卡与通话',['l4GroupsSheet','openCallWall']],
    ['后台与数据',['openKaSet','openData']]
  ];
  var used={'sw:msgAv':1,openGroups:1};
  NG.forEach(function(g){g[1].forEach(function(k){used[k]=1})});
  var rest=order.filter(function(k){return !used[k]});
  var out=NG.map(function(g){return [g[0],g[1].map(function(k){return all[k]}).filter(Boolean)]});
  if(rest.length){var last=out[out.length-1];last[1]=last[1].concat(rest.map(function(k){return all[k]}))}
  SET_GROUPS.length=0;
  out.forEach(function(g){if(g[1].length)SET_GROUPS.push(g)});
})();

// 「回信」改叫「信箱」，跟页面标题一致
(function(){
  if(typeof IC_NAME==='object')IC_NAME.mail='信箱';
  if(typeof WALL_NAME==='object')WALL_NAME.mail='信箱';
  var t=document.querySelector('#tabbar .tab[data-view="mail"] span');if(t)t.textContent='信箱';
  var e=document.querySelector('.entry[data-go="mail"]');
  if(e){var b=e.querySelector('b'),s=e.querySelector('span');if(b)b.textContent='信箱';if(s)s.textContent='寄出去，等他回'}
})();
