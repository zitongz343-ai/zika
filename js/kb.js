// v17：键盘弹起时，让页面高度等于键盘上方那块可见区域，顶栏不被顶出去
(function(){
  var vv=window.visualViewport,root=document.documentElement;
  function fit(){
    var h=vv?vv.height:window.innerHeight,top=vv?vv.offsetTop:0;
    root.style.setProperty('--app-h',Math.round(h)+'px');
    root.style.setProperty('--app-top',Math.round(top)+'px');
  }
  if(vv){vv.addEventListener('resize',fit);vv.addEventListener('scroll',fit)}
  window.addEventListener('resize',fit);
  document.addEventListener('focusin',function(e){
    var t=e.target;if(!t||!t.matches||!t.matches('input,textarea'))return;
    setTimeout(function(){
      fit();
      if(t.id==='input'){var s=document.getElementById('stream');if(s)s.scrollTop=s.scrollHeight}
    },320);
  });
  document.addEventListener('focusout',function(){setTimeout(fit,120)});
  fit();
})();
