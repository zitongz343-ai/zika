// v22：字卡库底部「新增」栏挪到 body 下面，只在字卡库页显示；在字卡库里打字时先藏起来，不挡键盘
'use strict';
(function(){
  function mount(){var f=$('l4Foot');if(f&&f.parentNode!==document.body)document.body.appendChild(f)}
  function mark(v){document.body.classList.toggle('on-lib',v==='lib')}
  var _rl=renderLibPage;
  renderLibPage=function(){_rl();mount()};
  var _go=go;
  go=function(v){_go(v);mark(v);if(v==='lib')mount()};
  document.addEventListener('focusin',function(e){if(e.target&&e.target.closest&&e.target.closest('#libPage'))document.body.classList.add('lib-typing')});
  document.addEventListener('focusout',function(){setTimeout(function(){var a=document.activeElement;if(!a||!a.closest||!a.closest('#libPage'))document.body.classList.remove('lib-typing')},60)});
  mount();
  var cur=document.querySelector('.view.on');mark(cur?cur.dataset.view:'');
})();
