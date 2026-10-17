// 开屏：把整个 #splash 换成新的一个，这样之前几版的计时器拿着的是旧节点，不会半路把它收起来
// 名字跟着设置里的名字走；点一下跳过
// 外层类名叫 spw：原来叫 sw，和设置里的色点按钮 .sw 撞了，把色点拽到标题上面去了
'use strict';
(function(){
  var old=document.getElementById('splash');if(!old)return;
  var star='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 0C12.6 7 17 11.4 24 12C17 12.6 12.6 17 12 24C11.4 17 7 12.6 0 12C7 11.4 11.4 7 12 0Z"/></svg>';
  var a=S.me.name||'我',b=taName(),lg=(a+b).length>7;
  var sp=document.createElement('div');sp.id='splash';
  sp.innerHTML='<div class="spw'+(lg?' long':'')+'">'
    +'<i class="sw-c c1"></i><i class="sw-c c2"></i><i class="sw-c c3"></i><i class="sw-c c4"></i>'
    +'<i class="sw-d d1"></i><i class="sw-d d2"></i><i class="sw-d d3"></i>'
    +'<div class="sw-en"><i></i><span>ALWAYS · TOGETHER</span><i></i></div>'
    +'<div class="sw-wrap"><div class="sw-nm">'+esc(a)+'<em>×</em>'+esc(b)+'</div><i class="sw-tip"></i></div>'
    +'<div class="sw-ft"><i></i>'+star+'<i></i></div>'
    +'<div class="sw-tt">字 卡 传 讯</div>'
    +'</div>';
  old.parentNode.replaceChild(sp,old);
  var done=false;
  function end(){
    if(done)return;done=true;
    sp.classList.add('out');
    setTimeout(function(){sp.style.display='none'},700);
  }
  sp.addEventListener('click',end);
  setTimeout(end,2500);
})();
