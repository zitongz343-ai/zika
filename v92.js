try{

// v92：设置页三处修正
// 一、材质与配色里点配色 / 日夜，整页重画会把「透明度」那块冲掉，这里画完立刻补回去，滚动位置也保住
// 二、顶栏固定：页面里那颗「‹ 设置」返回键搬一份到顶栏，跟板块名、关闭放一排；原来那颗藏起来，点顶栏的就等于点它
// 三、从设置首页点进某一项再返回，回到刚才滑到的位置，不再跳回最顶上

var v92Inner=function(){return sheet.querySelector('.inner')};

// 一、透明度拉条别被冲掉
(function(){
  var y0=0;
  function isLook(){return !!sheetBody.querySelector('.seg[data-g="style"]')}
  sheetBody.addEventListener('click',function(){
    if(isLook()){var i=v92Inner();y0=i?i.scrollTop:0}
  },true);
  sheetBody.addEventListener('click',function(){
    if(!isLook()||S.style!=='glass'||sheetBody.querySelector('#glBox'))return;
    if(typeof glMount==='function')glMount();
    var i=v92Inner();if(i)i.scrollTop=y0;
  });
})();

// 二、顶栏放返回键
(function(){
  var sh=sheet.querySelector('.sh');if(!sh)return;
  var px=document.createElement('button');
  px.type='button';px.className='v92-back';px.hidden=true;
  sh.insertBefore(px,sh.firstChild);
  var real=null;
  function sync(){
    var b=sheetBody.querySelector('.sh-back');
    real=b;
    if(b){
      b.classList.add('v92-hide');
      if(px.textContent!==b.textContent)px.textContent=b.textContent;
      px.setAttribute('aria-label',b.textContent.replace(/^[\s\u2039‹]+/,'')||'\u8fd4\u56de');
      px.hidden=false;sheet.classList.add('v92-bk');
    }else{
      px.hidden=true;sheet.classList.remove('v92-bk');
    }
  }
  px.addEventListener('click',function(){if(real)real.click()});
  if(window.MutationObserver)new MutationObserver(sync).observe(sheetBody,{childList:true,subtree:true});
  sync();
})();

// 三、返回设置首页时回到原来的位置
(function(){
  var saved=0;
  sheetBody.addEventListener('click',function(e){
    if(sheetTitle.textContent!=='\u8bbe\u7f6e')return;
    if(!e.target.closest('[data-fn]'))return;
    var i=v92Inner();saved=i?i.scrollTop:0;
  },true);
  var _osV92=openSettings;
  openSettings=function(){
    var back=typeof SW24!=='undefined'&&SW24&&!!SW24.timer;
    var r=_osV92.apply(this,arguments);
    var y=back?saved:0;
    if(!back)saved=0;
    var i=v92Inner();
    if(i){
      i.scrollTop=y;
      requestAnimationFrame(function(){i.scrollTop=y});
    }
    return r;
  };
})();

}catch(e){console.error("[zika] v92.js",e)}
