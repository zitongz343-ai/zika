// 板块图标两套能切：A 小印章（一个字盖在小方章里），B 罗马数字（像书的目录）。设置 → 板块图标 里切
// 自己在「板块图标」里单独换过的那一项照旧用自己的
'use strict';
var IC_ORDER=['home','chat','lib','fav','moments','mail','tarot'];
var IC_SEAL={home:'家',chat:'讯',lib:'字',fav:'藏',moments:'圈',mail:'信',tarot:'星'};
var IC_ROMAN=['I','II','III','IV','V','VI','VII'];
if(S.prefs.icStyle!=='seal'&&S.prefs.icStyle!=='roman'){S.prefs.icStyle='seal';save()}
function icMode(){return S.prefs.icStyle==='roman'?'roman':'seal'}
function icMark(k,n){
  if(icMode()==='roman'){
    var r=typeof n==='number'?IC_ROMAN[n]:IC_ROMAN[IC_ORDER.indexOf(k)];
    return '<span class="zrm">'+(r||'·')+'</span>';
  }
  return '<span class="zsl">'+esc(IC_SEAL[k]||'·')+'</span>';
}
var _icHTML5=icHTML;
icHTML=function(k){
  var v=S.prefs.icons&&S.prefs.icons[k];
  if(v||IC_ORDER.indexOf(k)<0)return _icHTML5(k);
  return icMark(k);
};
var _apIc5=applyIcons;
applyIcons=function(){
  document.documentElement.dataset.ic=icMode();
  _apIc5();
  // 主页四个入口按自己的顺序数 I ~ IV，不跟侧栏的号
  if(icMode()!=='roman')return;
  document.querySelectorAll('.entry[data-go]').forEach(function(e,i){
    var k=e.dataset.go,v=S.prefs.icons&&S.prefs.icons[k];if(v)return;
    var s=e.querySelector('.ei');if(s)s.innerHTML=icMark(k,i);
  });
};
var _oisIc5=openIconSet;
openIconSet=function(){
  _oisIc5();
  var f=document.createElement('div');f.className='field';
  f.innerHTML='<label>样式</label><div class="seg" id="icSeg"><button type="button" data-v="seal">A · 小印章</button><button type="button" data-v="roman">B · 罗马数字</button></div>';
  f.querySelectorAll('[data-v]').forEach(function(b){b.classList.toggle('on',b.dataset.v===icMode())});
  f.querySelector('#icSeg').addEventListener('click',function(e){
    var b=e.target.closest('[data-v]');if(!b||b.dataset.v===icMode())return;
    S.prefs.icStyle=b.dataset.v;save();applyIcons();
    openIconSet();addBack();
  });
  sheetBody.insertBefore(f,sheetBody.firstChild);
  sheetBody.querySelectorAll('.icrow input').forEach(function(i){i.placeholder='默认'});
  var h=sheetBody.querySelector('.hint');
  if(h)h.textContent='侧栏和主页入口用同一套。A 是一个字盖在小方章里，B 是罗马数字，像书的目录。下面也能单独给某一项填符号或换图片，点「默认」回到 A / B。';
};
SET_GROUPS.forEach(function(g){g[1].forEach(function(i){
  if(i[0]==='openIconSet')i[2]=function(){return icMode()==='roman'?'罗马数字':'小印章'};
})});
applyIcons();