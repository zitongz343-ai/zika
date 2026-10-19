try{
// v111：收藏图标换梅花；收藏页素笺；另起一页换清晰的矢量图标
(function(){
  var MEI_P=[[12,6.5],[17.23,10.3],[15.23,16.45],[8.77,16.45],[6.77,10.3]];
  function mei(fill){
    return '<svg viewBox="0 0 24 24" fill="'+(fill?'currentColor':'none')+'" stroke="currentColor" stroke-width="1.4">'
      +MEI_P.map(function(p){return '<circle cx="'+p[0]+'" cy="'+p[1]+'" r="3"/>'}).join('')
      +'<circle cx="12" cy="12" r="1.3" fill="'+(fill?'#fffdf8':'currentColor')+'" stroke="none"/></svg>';
  }
  if(typeof BP_IC==='object'&&BP_IC){BP_IC.star=mei(false);BP_IC.starOn=mei(true)}

  // 另起一页：一页折角信笺，角上一朵梅，矢量画，不会糊
  var PAGE='<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M12 6h17l9 9v27H12z" fill="#fffdf8" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>'
    +'<path d="M29 6v9h9" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>'
    +'<path d="M17 21h13M17 27h13M17 33h7" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" opacity=".5"/>'
    +'<g fill="currentColor"><circle cx="34" cy="32" r="2.6"/><circle cx="37.8" cy="34.8" r="2.6"/><circle cx="36.4" cy="39.2" r="2.6"/><circle cx="31.6" cy="39.2" r="2.6"/><circle cx="30.2" cy="34.8" r="2.6"/></g>'
    +'<circle cx="34" cy="36" r="1.2" fill="#fffdf8"/></svg>';
  function page(){var i=document.querySelector('#gfNew i');if(i&&!i.querySelector('svg'))i.innerHTML=PAGE}
  

  // 收藏页：时间写古风，按钮改短
  if(typeof renderFav==='function'){
    var _rf=renderFav;
    renderFav=function(){
      var r=_rf.apply(this,arguments),box=document.getElementById('favList');
      if(box&&S.favs&&S.favs.length){
        var arts=box.querySelectorAll('article.fav');
        for(var i=0;i<arts.length;i++){
          var f=S.favs[i],a=arts[i];if(!f)continue;
          var sp=a.querySelector('.fm span');if(sp&&f.at&&window.gfTime)sp.textContent=(f.name||taName())+' · '+gfTime(f.at);
          var q=a.querySelector('[data-f="q"]'),rm=a.querySelector('[data-f="rm"]');
          if(q)q.textContent='引用';if(rm)rm.textContent='撤下';
        }
      }
      return r;
    };
  }
})();
}catch(e){console.error('[zika] v111.js',e)}
