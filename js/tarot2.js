// v15：塔罗照 milk：78 张带牌面图的牌、单张/三张牌阵、可以先写下问题、点牌翻面看释义、占卜记录
// 牌的数据从 milk 固定版本（db66146）读一次，存在本机，以后不用再联网读
var MILK_GAMES=['https://cdn.jsdelivr.net/gh/aielin17/milk@db66146284641be775207b752c3de770968578f3/js/games.js','https://raw.githubusercontent.com/aielin17/milk/db66146284641be775207b752c3de770968578f3/js/games.js'];
var T78_KEY='mj_zika_tarot78',TAROT78=null,TV={spread:'single',busy:false};
// 只当数据读：把 milk 里的对象字面量转成 JSON 再解析，不执行它的代码
function parse78(src){
  var m=/ALL_78_TAROT_CARDS\s*=\s*\[/.exec(src);if(!m)return null;
  var s=m.index+m[0].length-1,e=src.indexOf('];',s);if(e<0)return null;
  var body=src.slice(s,e+1).replace(/([{,]\s*)([A-Za-z_]\w*)\s*:/g,'$1"$2":').replace(/,(\s*[\]}])/g,'$1');
  var arr;try{arr=JSON.parse(body)}catch(err){return null}
  if(!Array.isArray(arr))return null;
  arr=arr.filter(function(c){return c&&c.name}).map(function(c){
    return{name:String(c.name),eng:String(c.eng||''),keyword:String(c.keyword||''),upright:String(c.upright||''),reversed:String(c.reversed||''),img:/^https:\/\//.test(c.img||'')?String(c.img):''};
  });
  return arr.length>=78?arr:null;
}
function fallback22(){return TAROT.map(function(c){return{name:c.n,eng:c.e,keyword:'',upright:c.up,reversed:c.rev,img:'',sym:c.s}})}
function load78(){
  if(TAROT78)return Promise.resolve(TAROT78);
  try{var c=JSON.parse(localStorage.getItem(T78_KEY)||'null');if(Array.isArray(c)&&c.length>=78){TAROT78=c;return Promise.resolve(c)}}catch(e){}
  var i=0;
  function next(){
    if(i>=MILK_GAMES.length)return Promise.reject(new Error('net'));
    return fetch(MILK_GAMES[i++]).then(function(r){if(!r.ok)throw new Error('http');return r.text()}).then(function(t){var a=parse78(t);if(!a)throw new Error('parse');return a}).catch(next);
  }
  return next().then(function(a){TAROT78=a;try{localStorage.setItem(T78_KEY,JSON.stringify(a))}catch(e){}return a});
}
function buildTarot(){
  var v=document.querySelector('.view[data-view="tarot"]');if(!v||v.dataset.v15)return;v.dataset.v15='1';
  v.innerHTML='<div class="mo-bar" style="padding-top:24px"><h3>塔 罗</h3><span class="hh-date" id="tarotDate"></span></div>'
    +'<div class="t2-tabs" id="t2Tabs"><button data-t="draw" class="on">塔罗占卜</button><button data-t="hist">占卜记录</button></div>'
    +'<div id="t2Draw"><div id="t2Setup"><div class="t2-lbl">牌阵选择</div><div class="t2-spreads"><button data-s="single" class="on"><b>1</b><span>单张</span></button><button data-s="three"><b>3</b><span>三张</span></button></div><div class="t2-desc" id="t2Desc">单张牌 · 直指当下</div>'
    +'<div class="t2-lbl">你的提问（可选）</div><textarea id="t2Q" placeholder="将内心的迷惑轻轻诉说..."></textarea><button class="primary" id="t2Go" style="width:100%">开始塔罗占卜</button><p class="hint" id="t2Note" style="text-align:center"></p></div>'
    +'<div id="t2Res" hidden></div><button class="ghost" id="t2Reset" hidden style="width:100%;margin-top:14px">重新占卜</button></div>'
    +'<div id="t2Hist" hidden><div class="t2-hh"><span>每一次占卜，皆是与命运的对话</span><button class="ghost" id="t2Clear">清空记录</button></div><div id="t2HList"></div></div>';
  $('t2Tabs').addEventListener('click',function(e){
    var b=e.target.closest('[data-t]');if(!b)return;var h=b.dataset.t==='hist';
    $('t2Tabs').querySelectorAll('button').forEach(function(x){x.classList.toggle('on',x===b)});
    $('t2Draw').hidden=h;$('t2Hist').hidden=!h;if(h)t2Hist();
  });
  v.querySelector('.t2-spreads').addEventListener('click',function(e){
    var b=e.target.closest('[data-s]');if(!b)return;t2Spread(b.dataset.s);
  });
  $('t2Go').addEventListener('click',t2Draw);
  $('t2Reset').addEventListener('click',t2Reset);
  $('t2Clear').addEventListener('click',function(){
    if(!S.draws.length)return;if(!confirm('确定要清空所有占卜记录吗？'))return;
    S.draws=[];save();updateNav();t2Hist();
  });
}
function t2Spread(s){
  TV.spread=s;
  document.querySelectorAll('.t2-spreads [data-s]').forEach(function(x){x.classList.toggle('on',x.dataset.s===s)});
  $('t2Desc').textContent=s==='three'?'三张牌 · 洞察全局':'单张牌 · 直指当下';
}
function t2Reset(){
  $('t2Setup').hidden=false;$('t2Res').hidden=true;$('t2Reset').hidden=true;$('t2Q').value='';$('t2Note').textContent='';t2Spread('single');
}
function t2CardHTML(x){
  var c=x.card,m=x.rev?c.reversed:c.upright;
  var front=c.img?'<img src="'+esc(c.img)+'" alt="'+esc(c.name)+'"'+(x.rev?' class="rv"':'')+'>'
    :'<div class="t2-noimg'+(x.rev?' rv':'')+'"><b>'+esc(c.sym||'✧')+'</b><span>'+esc(c.name)+'</span></div>';
  return '<div class="t2-col"><div class="t2-card"><div class="t2-in"><div class="t2-face t2-front">'+front+'</div>'
    +'<div class="t2-face t2-back"><div class="t2-pos">'+esc(x.pos)+'</div><div class="t2-nm">'+esc(c.name)+'</div><div class="t2-badge'+(x.rev?' rv':'')+'">'+(x.rev?'逆位':'正位')+'</div>'
    +(c.keyword?'<div class="t2-kw">「'+esc(c.keyword)+'」</div>':'')+'<div class="t2-mean">'+esc(m)+'</div></div></div></div>'
    +'<div class="t2-cap">'+esc(x.pos)+' · '+esc(c.name)+'</div></div>';
}
function t2Draw(){
  if(TV.busy)return;TV.busy=true;
  var btn=$('t2Go');btn.disabled=true;btn.textContent='洗牌中…';
  load78().catch(function(){$('t2Note').textContent='没连上网，这次先用 22 张大阿卡纳。';return fallback22()}).then(function(deck){
    TV.busy=false;btn.disabled=false;btn.textContent='开始塔罗占卜';
    var d=deck.slice();
    for(var i=d.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1)),t=d[i];d[i]=d[j];d[j]=t}
    var q=$('t2Q').value.trim(),three=TV.spread==='three';
    var drawn=(three?['牌一','牌二','牌三']:['当下']).map(function(p,k){return{card:d[k],pos:p,rev:Math.random()>0.5}});
    var res=$('t2Res');
    res.innerHTML=(q?'<div class="t2-qs">「'+esc(q)+'」</div>':'')
      +'<div class="t2-tip">'+(three?'三张牌为你揭示 · 洞见能量流动':'塔罗为你揭示 · 一切皆有答案')+'</div>'
      +'<div class="t2-row'+(three?'':' single')+'">'+drawn.map(t2CardHTML).join('')+'</div><p class="hint" style="text-align:center">点牌翻过来看释义</p>';
    res.querySelectorAll('.t2-card').forEach(function(el){el.addEventListener('click',function(){el.classList.toggle('flipped')})});
    res.querySelectorAll('.t2-front img').forEach(function(im){im.onerror=function(){var p=im.parentNode;p.innerHTML='<div class="t2-noimg'+(im.classList.contains('rv')?' rv':'')+'"><b>✧</b><span>'+esc(im.alt)+'</span></div>'}});
    $('t2Setup').hidden=true;res.hidden=false;$('t2Reset').hidden=false;
    S.draws.unshift({id:uid(),at:Date.now(),type:three?'三张塔罗':'单张塔罗',question:q,name:drawn[0].card.name,rev:drawn[0].rev,
      cards:drawn.map(function(x){return{name:x.card.name,keyword:x.card.keyword||'',position:x.pos,isReversed:x.rev,meaning:x.rev?x.card.reversed:x.card.upright}})});
    if(S.draws.length>50)S.draws.length=50;
    save();updateNav();
  });
}
function t2Hist(){
  var box=$('t2HList');if(!box)return;
  if(!S.draws.length){box.innerHTML='<div class="empty"><b>尚无占卜记录</b>完成一次占卜后，结果将自动收录于此</div>';return}
  box.innerHTML=S.draws.map(function(x){
    var cards=x.cards||[{name:x.name,isReversed:x.rev}];
    return '<div class="t2-h"><div class="t2-ht"><b>'+esc(x.type||'塔罗')+'</b><span>'+fmt(x.at)+'</span></div>'
      +(x.question?'<div class="t2-hq">「'+esc(x.question)+'」</div>':'')
      +'<div class="t2-tags">'+cards.map(function(c){return '<span class="'+(c.isReversed?'rv':'')+'">'+(c.position?esc(c.position)+' · ':'')+esc(c.name)+(c.isReversed?' · 逆':' · 正')+'</span>'}).join('')+'</div>'
      +cards.filter(function(c){return c.meaning}).map(function(c){return '<p class="t2-hm"><b>'+esc(c.name)+'</b>'+esc(c.meaning)+'</p>'}).join('')
      +'</div>';
  }).join('');
}
renderDraws=function(){
  buildTarot();
  var d=new Date(),e=$('tarotDate');if(e)e.textContent=(d.getMonth()+1)+'月'+d.getDate()+'日';
  t2Hist();
};
buildTarot();load78().catch(function(){});
