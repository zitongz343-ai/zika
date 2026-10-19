try{
// v113：拆信、写信都铺在整张信纸图上，字只写在图中间那块白纸里，横排
// 拆信：开头写称呼，正文每段空两格，落款「某某 手书」加一枚小印，最后写日子
// 写信：笺头写标题，正文写在白纸上，落款是自己的名字，按钮「封缄寄出」
(function(){
  var CN='〇一二三四五六七八九';
  function num(n){if(n<10)return CN[n];var t=Math.floor(n/10),o=n%10;return (t===1?'十':CN[t]+'十')+(o?CN[o]:'')}
  function seg(h){return h<5?'凌晨':h<8?'清晨':h<11?'上午':h<13?'午间':h<17?'午后':h<19?'傍晚':'夜'}
  function el(t,c,x){var e=document.createElement(t);if(c)e.className=c;if(x!=null)e.textContent=x;return e}
  // 在信纸上放一个盒子，正好盖住图里那块白纸，字都放进去
  function box(host,list){
    if(!host)return null;
    var b=host.querySelector(':scope>.gfbox');
    if(!b){b=el('div','gfbox');host.insertBefore(b,host.firstChild)}
    list.forEach(function(n){if(n&&n.parentNode!==b)b.appendChild(n)});
    return b;
  }

  // ── 拆信 ──
  var L=document.querySelector('#reader .letter');
  if(L)box(L,[L.querySelector('.letter-head'),L.querySelector('.letter-body')]);
  function dress(){
    var m=(typeof currentMail!=='undefined')?currentMail:null,b=document.getElementById('rBody');
    if(!m||!b)return;
    var mine=m.from==='me';
    var fromN=mine?(S.me.name||'我'):taName(),toN=mine?taName():(S.me.name||'你');
    b.innerHTML='';b.classList.add('gfl');
    b.appendChild(el('p','to',toN+'：'));
    String(m.body||'').split(/\n+/).forEach(function(s){s=s.trim();if(s)b.appendChild(el('p','bd',s))});
    var sg=el('p','sg',fromN+' 手书');sg.appendChild(el('span','seal',fromN.slice(-2)));b.appendChild(sg);
    var d=new Date(m.at);
    b.appendChild(el('p','dt',num(d.getMonth()+1)+'月'+num(d.getDate())+'日 '+seg(d.getHours())));
    b.scrollTop=0;
  }
  // 两条拆信路径（直接打开、拆封动画后打开）最后都会走 letterSlip
  if(typeof letterSlip==='function'){
    var _ls=letterSlip;
    letterSlip=function(){try{dress()}catch(e){console.error('[zika] v113 dress',e)}return _ls.apply(this,arguments)};
  }

  // ── 写信 ──
  function dressWrite(){
    var p=document.querySelector('#sheetBody .wl-paper');
    if(!p||p.querySelector('.gfbox'))return;
    box(p,[p.querySelector('.wl-t'),p.querySelector('.wl-b'),p.querySelector('.wl-sign')]);
    var t=p.querySelector('.wl-t'),bd=p.querySelector('.wl-b'),sg=p.querySelector('.wl-sign');
    if(t)t.placeholder='题 一 个 笺 头';
    if(bd)bd.placeholder='见字如面……';
    if(sg)sg.textContent='—— '+(S.me.name||'我');
    var s=document.getElementById('mSend');if(s)s.innerHTML='<i>缄</i>封缄寄出';
  }
  if(typeof newMail==='function'){
    var _nm=newMail;
    newMail=function(){var r=_nm.apply(this,arguments);dressWrite();setTimeout(dressWrite,0);return r};
  }
})();
}catch(e){console.error('[zika] v113.js',e)}
