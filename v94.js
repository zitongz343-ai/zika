try{

// v94：主页换成锁屏。大时间、他现在在干嘛、他找过你的消息像通知那样叠着，四个入口收进底下一排
// 原来主页那些东西（头像、标题、今日一句卡、四个大块）只是藏起来，数据和别处的功能都不动

(function(){
  var home=document.querySelector('section[data-view="home"]');if(!home||$('lk'))return;
  var DOCK=[['chat','传讯','▤'],['moments','朋友圈','◍'],['mail','信箱','✉'],['tarot','塔罗','✦']];
  var lk=document.createElement('div');lk.id='lk';
  lk.innerHTML='<div class="lk-top"><button type="button" class="lk-set" aria-label="设置">⚙</button></div>'
    +'<div class="lk-date" id="lkDate"></div>'
    +'<div class="lk-time" id="lkTime"></div>'
    +'<div class="lk-st" id="lkSt"><i></i><span></span></div>'
    +'<div class="lk-day" id="lkDay"></div>'
    +'<div class="lk-lab"><span id="lkLabL"></span><span id="lkLabR"></span></div>'
    +'<div class="lk-ntfs" id="lkN"></div>'
    +'<p class="lk-q" id="lkQ"></p>'
    +'<nav class="lk-dock">'+DOCK.map(function(d){
      return '<button type="button" class="lk-dk" data-lk="'+d[0]+'"><span class="lk-ic" data-ic="'+d[0]+'">'+d[2]+'</span><b>'+d[1]+'</b><sup id="lkB_'+d[0]+'"></sup></button>';
    }).join('')+'</nav>';
  home.appendChild(lk);
  document.documentElement.classList.add('lk-on');

  function pad(n){return (n<10?'0':'')+n}
  function ago(t){
    var s=(Date.now()-t)/1000;
    if(s<60)return '刚刚';
    if(s<3600)return Math.floor(s/60)+' 分钟前';
    if(s<86400)return Math.floor(s/3600)+' 小时前';
    var d=new Date(t);return (d.getMonth()+1)+'月'+d.getDate()+'日';
  }
  // 你上一次递出去之后，他发来的那些
  function since(){
    var a=S.cards||[],out=[];
    for(var i=a.length-1;i>=0;i--){var c=a[i];if(c.from==='me')break;if(c.from==='ta')out.push(c)}
    return out;
  }
  function lastTa(){var a=S.cards||[];for(var i=a.length-1;i>=0;i--)if(a[i].from==='ta')return a[i];return null}
  function txt(c){return typeof banText==='function'?banText(c):String(c.text||'')}
  function clock(){
    var d=new Date(),t=$('lkTime'),dt=$('lkDate');
    if(t)t.textContent=pad(d.getHours())+':'+pad(d.getMinutes());
    if(dt)dt.textContent=(d.getMonth()+1)+'月'+d.getDate()+'日 星期'+'日一二三四五六'[d.getDay()];
  }
  // 底栏图标跟着原来入口的自定义图标走
  function icons(){
    lk.querySelectorAll('[data-ic]').forEach(function(s){
      var ei=document.querySelector('.entry[data-go="'+s.dataset.ic+'"] .ei');
      if(ei&&ei.innerHTML.trim())s.innerHTML=ei.innerHTML;
    });
  }
  function badge(k,n){var b=$('lkB_'+k);if(!b)return;b.textContent=n>0?(n>99?'99+':n):'';b.hidden=!(n>0)}
  lkRender=function(){
    if(!S||!S.prefs)return;
    clock();
    var nm=taName();
    var st=$('lkSt'),s=S.prefs.taStatus||'';
    st.hidden=!s;st.querySelector('span').textContent=nm+' · '+s;
    var nd=typeof nearDay==='function'?nearDay():null;
    $('lkDay').textContent=nd?dayText(nd):'';
    var q=typeof dailyPick==='function'?dailyPick():'';
    $('lkQ').textContent=q?'「'+q+'」':'';$('lkQ').hidden=!q;

    var list=since(),box=$('lkN');
    if(list.length){
      $('lkLabL').textContent=nm+' 找过你';
      $('lkLabR').textContent=list.length+' 条';
    }else{
      var l=lastTa();
      if(l)list=[l];
      $('lkLabL').textContent=l?'上一次他说':'';
      $('lkLabR').textContent='';
    }
    var show=list.slice(0,2),more=list.length-show.length;
    box.innerHTML=show.map(function(c){
      return '<button type="button" class="lk-ntf" data-lk="chat"><span class="lk-av">'+avStr(S.ta)+'</span>'
        +'<span class="lk-nb"><span class="lk-nh"><b>'+esc(nm)+'</b><em>'+ago(c.at)+'</em></span>'
        +'<span class="lk-nt">'+esc(txt(c))+'</span></span></button>';
    }).join('')+(more>0?'<button type="button" class="lk-stk" data-lk="chat" aria-label="还有 '+more+' 条"></button>':'');
    if(!show.length)box.innerHTML='<p class="lk-none">'+esc(nm)+' 还没说话。去传讯里递一张。</p>';

    badge('chat',since().length);
    badge('moments',+S.moUnread||0);
    badge('mail',(S.mails||[]).filter(function(m){return m.from==='ta'&&!m.read}).length);
    badge('tarot',0);
    icons();
  };

  lk.addEventListener('click',function(e){
    if(e.target.closest('.lk-set')){var b=$('btnSet');if(b)b.click();return}
    var g=e.target.closest('[data-lk]');if(g)go(g.dataset.lk);
  });

  var _rhV94=renderHome;
  renderHome=function(){var r=_rhV94.apply(this,arguments);lkRender();return r};
  var _unV94=updateNav;
  updateNav=function(){var r=_unV94.apply(this,arguments);lkRender();return r};
  var _arcV94=addReplyCard;
  addReplyCard=function(){var r=_arcV94.apply(this,arguments);lkRender();return r};
  if(typeof stPaint==='function'){var _spV94=stPaint;stPaint=function(){var r=_spV94.apply(this,arguments);lkRender();return r}}
  setInterval(lkRender,20000);
  document.addEventListener('visibilitychange',function(){if(!document.hidden)lkRender()});
  lkRender();
})();

}catch(e){console.error("[zika] v94.js",e)}
