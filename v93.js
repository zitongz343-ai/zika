try{

// v93：
// 一、他主动发来的字卡，回到页面时不显示：回到前台、页面恢复、别的窗口写过存档时，都从存档里把字卡对一遍再重画
// 二、字号预览：v91 给提示字加了 !important 把预览的字号压死了，这里换成单独的预览卡，拖拉条时实时变

// 一、回来时对一遍存档
(function(){
  function sync(){
    var raw=null;
    try{raw=JSON.parse(localStorage.getItem(KEY)||'null')}catch(e){raw=null}
    var changed=false;
    if(raw&&Array.isArray(raw.cards)){
      var a=raw.cards,b=S.cards;
      var la=a.length?a[a.length-1].id:'',lb=b.length?b[b.length-1].id:'';
      // 存档比内存多（别的窗口或后台那一份写进去的），以存档为准
      if(a.length>b.length||(a.length===b.length&&la!==lb&&a.some(function(x){return x.id===lb}))){
        S.cards=a;changed=true;
      }
      if(raw.prefs&&raw.prefs.proNext&&raw.prefs.proNext!==S.prefs.proNext)S.prefs.proNext=raw.prefs.proNext;
    }
    // 不管有没有变都重画一次：iPhone 上页面在后台时改的东西，回来常常不刷到屏幕上
    if(typeof renderChat==='function')renderChat();
    if(typeof updateNav==='function')updateNav();
    var st=document.getElementById('stream');
    if(st)setTimeout(function(){st.scrollTop=st.scrollHeight},60);
    return changed;
  }
  var t=null;
  function later(){clearTimeout(t);t=setTimeout(sync,150)}
  document.addEventListener('visibilitychange',function(){if(!document.hidden)later()});
  window.addEventListener('pageshow',later);
  window.addEventListener('focus',later);
  window.addEventListener('storage',function(e){if(!e.key||e.key===KEY)later()});
  // 页面在后台时他发来的，记一下，回来一定重画
  var _arcV93=addReplyCard;
  addReplyCard=function(c){
    var r=_arcV93.apply(this,arguments);
    if(document.hidden)window.__v93dirty=true;
    return r;
  };
  window.v93Sync=sync;
})();

// 二、字号预览
(function(){
  var _ofV93=openFontSet;
  openFontSet=function(){
    var r=_ofV93.apply(this,arguments);
    var old=null;
    sheetBody.querySelectorAll('p').forEach(function(p){if(!old&&p.textContent.indexOf('\u62d6\u4e00\u4e0b\u770b\u8fd9\u884c\u5b57')>=0)old=p});
    var rg=sheetBody.querySelector('input[type=range][data-k="fontScale"]');
    if(!old||!rg)return r;
    var pv=document.createElement('div');pv.className='v93-fzprev';
    pv.innerHTML='<span class="v93-fz-l"><\/span><p class="v93-fz-a">\u4eca\u5929\u4e5f\u60f3\u4f60\u3002<\/p><p class="v93-fz-b">\u4f60\u5403\u996d\u4e86\u5417\uff0c\u4e0d\u8bb8\u53c8\u662f\u9762\u5305\u3002<\/p><p class="v93-fz-c"><\/p>';
    old.parentNode.replaceChild(pv,old);
    var lab=pv.querySelector('.v93-fz-l'),cap=pv.querySelector('.v93-fz-c');
    function paint(v){
      v=+v||100;
      document.documentElement.style.setProperty('--fz',String(Math.max(70,v)/100));
      lab.textContent='\u9884\u89c8 \u00b7 '+v+'%';
      cap.textContent='\u804a\u5929\u5b57\u5361\u3001\u4e3b\u9875\u3001\u4fa7\u680f\u90fd\u6309\u8fd9\u4e2a\u6bd4\u4f8b\u53d8';
    }
    rg.addEventListener('input',function(){paint(rg.value)});
    var rs=sheetBody.querySelector('#fzReset');
    if(rs)rs.addEventListener('click',function(){setTimeout(function(){paint(S.prefs.fontScale)},0)});
    paint(S.prefs.fontScale);
    return r;
  };
})();

}catch(e){console.error("[zika] v93.js",e)}
