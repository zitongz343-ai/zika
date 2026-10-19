try{
// v112：朋友圈照预览改古风；信封日期写汉字；另起一页图标兜底（加号面板重建后也补上）
(function(){
  var CN='〇一二三四五六七八九';
  function num(n){if(n<10)return CN[n];var t=Math.floor(n/10),o=n%10;return (t===1?'十':CN[t]+'十')+(o?CN[o]:'')}
  function clock(d){
    var h=d.getHours(),m=d.getMinutes();
    var seg=h<5?'凌晨':h<8?'清晨':h<11?'上午':h<13?'中午':h<17?'午后':h<19?'傍晚':'夜里';
    return seg+' '+(h%12===0?'十二':num(h%12))+'点'+(m===0?'整':m<10?'〇'+CN[m]:num(m));
  }
  var MEI='<circle cx="12" cy="6.5" r="3"/><circle cx="17.2" cy="10.3" r="3"/><circle cx="15.2" cy="16.4" r="3"/><circle cx="8.8" cy="16.4" r="3"/><circle cx="6.8" cy="10.3" r="3"/>';
  function mei(f){return '<svg class="gf-mei" viewBox="0 0 24 24" fill="'+(f?'currentColor':'none')+'" stroke="currentColor" stroke-width="1.4">'+MEI+'</svg>'}

  // ── 朋友圈 ──
  if(typeof MO_CAM!=='undefined')MO_CAM='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M16.5 3.5l4 4L9 19l-5 1 1-5z"/><path d="M14 6l4 4"/></svg>';
  if(typeof MO_LOCK!=='undefined')MO_LOCK='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"><rect x="4" y="9" width="16" height="11" rx="1"/><path d="M8 9V7a4 4 0 0 1 8 0v2"/><circle cx="12" cy="14.5" r="1.3" fill="currentColor"/></svg>';
  if(typeof moHM==='function')moHM=function(t){return clock(new Date(t))};
  if(typeof moLabel==='function'&&typeof moDay0==='function'){
    moLabel=function(t){
      var d=new Date(t),diff=Math.round((moDay0(Date.now())-moDay0(t))/864e5);
      var big=diff===0?'今日':diff===1?'昨日':num(d.getDate())+'日';
      var sm=diff<2?num(d.getMonth()+1)+'月'+num(d.getDate()):num(d.getMonth()+1)+'月';
      var y=d.getFullYear()!==new Date().getFullYear()?'<em>'+d.getFullYear()+'</em>':'';
      return '<b class="w">'+big+'</b><small>'+sm+'</small>'+y;
    };
  }
  if(typeof moPostHTML==='function'){
    var _mp=moPostHTML;
    moPostHTML=function(){
      var h=_mp.apply(this,arguments);
      return h.replace('>♥ 赞<','>'+mei(1)+'赏<').replace('>♡ 赞<','>'+mei(0)+'赏<')
        .replace('data-a="cmt">评论<','data-a="cmt">题跋<').replace('data-a="del">删<','data-a="del">撤<')
        .replace(' · 仅自己可见','<i class="gf-tag">仅己可见</i>')
        .replace('<div class="m2-lk">♡ ','<div class="m2-lk">'+mei(1))
        .replace(/<\/b> 回复 <b>/g,'</b> 回 <b>');
    };
  }
  if(typeof renderMoments==='function'){
    var _rm=renderMoments;
    renderMoments=function(){
      var r=_rm.apply(this,arguments);
      document.querySelectorAll('.m2-pub').forEach(function(b){var s=b.querySelector('span');if(s)s.textContent=b.dataset.pub==='1'?'藏 笺':'落 笔'});
      return r;
    };
    try{renderMoments()}catch(e){}
  }

  // ── 信封：日期写成「十月十九日」 ──
  if(typeof envDate==='function'){
    envDate=function(t){var d=new Date(t);return num(d.getMonth()+1)+'月'+num(d.getDate())+'日'};
    try{if(typeof renderMail==='function')renderMail()}catch(e){}
  }

  // ── 另起一页：矢量信笺图标；加号面板里的格子被重画时再补上 ──
  var PAGE='<svg class="gf-page" viewBox="0 0 48 48" aria-hidden="true"><path d="M12 6h17l9 9v27H12z" fill="#fffdf8" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>'
    +'<path d="M29 6v9h9" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>'
    +'<path d="M17 21h13M17 27h13M17 33h7" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" opacity=".5"/>'
    +'<g fill="currentColor"><circle cx="34" cy="32" r="2.6"/><circle cx="37.8" cy="34.8" r="2.6"/><circle cx="36.4" cy="39.2" r="2.6"/><circle cx="31.6" cy="39.2" r="2.6"/><circle cx="30.2" cy="34.8" r="2.6"/></g>'
    +'<circle cx="34" cy="36" r="1.2" fill="#fffdf8"/></svg>';
  function page(){var i=document.querySelector('#gfNew i');if(i&&!i.querySelector('svg.gf-page'))i.innerHTML=PAGE}
})();
}catch(e){console.error('[zika] v112.js',e)}
