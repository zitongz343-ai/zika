// 主页名字：「我的名字 × 他的名字」做成一行标题字，名字跟着设置里的名字走
'use strict';
function ztStar(c){return '<svg class="zs '+c+'" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 0C12.6 7 17 11.4 24 12C17 12.6 12.6 17 12 24C11.4 17 7 12.6 0 12C7 11.4 11.4 7 12 0Z"/></svg>'}
(function(){
  var pair=document.querySelector('.hh-pair');if(!pair||$('zt'))return;
  var z=document.createElement('div');z.id='zt';z.className='zt';
  z.innerHTML='<div class="zt-en"><i></i><span>ALWAYS · TOGETHER</span><i></i></div>'
    +'<div class="zt-nm"><span id="ztMe"></span><em>×</em><span id="ztTa"></span>'+ztStar('zs1')+ztStar('zs2')+ztStar('zs3')+'</div>'
    +'<div class="zt-ft"><i></i>'+ztStar('zs4')+'<i></i></div>';
  pair.parentNode.insertBefore(z,pair.nextSibling);
})();
function ztPaint(){
  var a=S.me.name||'我',b=taName(),m=$('ztMe'),t=$('ztTa'),z=$('zt');
  if(!m||!t||!z)return;
  m.textContent=a;t.textContent=b;
  z.classList.toggle('long',(a+b).length>7);
}
var _pnZt=paintNames;
paintNames=function(){_pnZt();ztPaint()};
ztPaint();