// 字卡传讯 · 塔罗：照 milk。78 张带牌面图，单张 / 三张牌阵，可以先写下问题，点牌翻面看释义，占卜记录
// 牌的数据从 milk 固定版本读一次，存在本机；没网的时候用 22 张大阿卡纳
'use strict';
var MILK_GAMES=['https://cdn.jsdelivr.net/gh/aielin17/milk@db66146284641be775207b752c3de770968578f3/js/games.js','https://raw.githubusercontent.com/aielin17/milk/db66146284641be775207b752c3de770968578f3/js/games.js'];
var T78_KEY='mj_zika_tarot78',TAROT78=null,TV={spread:'single',busy:false};
var TAROT22=[
['愚人','The Fool','🌱','新的开始。不用准备好，走出去就是了。','冲动。你在拿没想清楚的事当勇气。'],
['魔术师','The Magician','🎩','你手里其实有牌。开口、动手，就能成。','空谈。想得比做得多。'],
['女祭司','The High Priestess','🌙','别急着说。你心里已经有答案了。','自我隐瞒。你在装作不知道。'],
['女帝','The Empress','🌾','被好好对待的时候。也去好好对待人。','过度付出。先顾自己。'],
['皇帝','The Emperor','👑','立个规矩。该定的定下来。','控制过头。松一点。'],
['教皇','The Hierophant','🔑','找个懂的人问一句。老办法有用。','不想听劝。你在硬撑。'],
['恋人','The Lovers','💞','选它。这一次选心里那个。','犹豫。两头都想要，就两头都没有。'],
['战车','The Chariot','🐎','往前走，别回头解释。','方向乱了。先停下看清楚。'],
['力量','Strength','🦁','温柔比强硬更管用。你比你以为的能扛。','硬撑。承认累不丢人。'],
['隐士','The Hermit','🕯','一个人待会儿。灯在你自己手上。','关太久。该出来了。'],
['命运之轮','Wheel of Fortune','☸','轮到你了。接住。','卡住的一段时间。会过去。'],
['正义','Justice','⚖','该算清的算清。该说的说清楚。','偏了。你在给自己找理由。'],
['倒吊人','The Hanged Man','🙃','换个方向看。停着也是一种走。','白等。你不是在等，是在拖。'],
['死神','Death','💀','结束了。别缝补，让它过去。','不肯放手。握着的是壳。'],
['节制','Temperance','🍶','调一调。慢一点正好。','过了。多一点就变味。'],
['恶魔','The Devil','⛓','你看清那条链子是松的。','还在里面。但你知道出口在哪。'],
['高塔','The Tower','🗼','塌了。塌了才看得见天。','怕它塌。其实已经在裂了。'],
['星星','The Star','⭐','许个愿。这次会有人接。','不信了。别把希望关掉。'],
['月亮','The Moon','🌕','看不清就先别走。等天亮。','自己吓自己。多半没事。'],
['太阳','The Sun','☀','好日子。笑就笑，别忍着。','光被挡住了。但还在。'],
['审判','Judgement','📯','该回的话回了。该认的认了。','装作没听见。心里响着呢。'],
['世界','The World','🌍','这一圈走完了。可以庆祝。','差最后一步。别停在这儿。']];
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
function fallback22(){return TAROT22.map(function(c){return{name:c[0],eng:c[1],sym:c[2],keyword:'',upright:c[3],reversed:c[4],img:''}})}
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
  var v=document.querySelector('.view[data-view="tarot"]');if(!v||v.dataset.built)return;v.dataset.built='1';
  v.innerHTML='<div class="mo-bar"><h3>塔 罗</h3><span class="hh-date" id="tarotDate"></span></div>'
    +'<div class="t2-tabs" id="t2Tabs"><button type="button" data-t="draw" class="on">塔罗占卜</button><button type="button" data-t="hist">占卜记录</button></div>'
    +'<div id="t2Draw"><div id="t2Setup"><div class="t2-lbl">牌阵选择</div><div class="t2-spreads"><button type="button" data-s="single" class="on"><b>1</b><span>单张</span></button><button type="button" data-s="three"><b>3</b><span>三张</span></button></div><div class="t2-desc" id="t2Desc">单张牌 · 直指当下</div>'
    +'<div class="t2-lbl">你的提问（可选）</div><textarea id="t2Q" placeholder="将内心的迷惑轻轻诉说..."></textarea><button type="button" class="primary" id="t2Go" style="width:100%">开始塔罗占卜</button><p class="hint" id="t2Note" style="text-align:center"></p></div>'
    +'<div id="t2Res" hidden></div><button type="button" class="ghost" id="t2Reset" hidden style="width:100%;margin-top:14px">重新占卜</button></div>'
    +'<div id="t2Hist" hidden><div class="t2-hh"><span>每一次占卜，皆是与命运的对话</span><button type="button" class="ghost" id="t2Clear">清空记录</button></div><div id="t2HList"></div></div>';
  $('t2Tabs').addEventListener('click',function(e){
    var b=e.target.closest('[data-t]');if(!b)return;var h=b.dataset.t==='hist';
    $('t2Tabs').querySelectorAll('button').forEach(function(x){x.classList.toggle('on',x===b)});
    $('t2Draw').hidden=h;$('t2Hist').hidden=!h;if(h)t2Hist();
  });
  v.querySelector('.t2-spreads').addEventListener('click',function(e){var b=e.target.closest('[data-s]');if(b)t2Spread(b.dataset.s)});
  $('t2Go').addEventListener('click',t2Draw);
  $('t2Reset').addEventListener('click',t2Reset);
  $('t2Clear').addEventListener('click',function(){
    if(!S.draws.length||!confirm('确定要清空所有占卜记录吗？'))return;
    S.draws=[];save();updateNav();t2Hist();
  });
}
function t2Spread(s){
  TV.spread=s;
  document.querySelectorAll('.t2-spreads [data-s]').forEach(function(x){x.classList.toggle('on',x.dataset.s===s)});
  txt('t2Desc',s==='three'?'三张牌 · 洞察全局':'单张牌 · 直指当下');
}
function t2Reset(){$('t2Setup').hidden=false;$('t2Res').hidden=true;$('t2Reset').hidden=true;$('t2Q').value='';txt('t2Note','');t2Spread('single')}
function t2NoImg(c,rv){return '<div class="t2-noimg'+(rv?' rv':'')+'"><b>'+esc(c.sym||'✧')+'</b><span>'+esc(c.name)+'</span></div>'}
function t2CardHTML(x){
  var c=x.card,m=x.rev?c.reversed:c.upright;
  var front=c.img?'<img src="'+esc(c.img)+'" alt="'+esc(c.name)+'"'+(x.rev?' class="rv"':'')+'>':t2NoImg(c,x.rev);
  return '<div class="t2-col"><div class="t2-card"><div class="t2-in"><div class="t2-face t2-front">'+front+'</div>'
    +'<div class="t2-face t2-back"><div class="t2-pos">'+esc(x.pos)+'</div><div class="t2-nm">'+esc(c.name)+'</div><div class="t2-badge'+(x.rev?' rv':'')+'">'+(x.rev?'逆位':'正位')+'</div>'
    +(c.keyword?'<div class="t2-kw">「'+esc(c.keyword)+'」</div>':'')+'<div class="t2-mean">'+esc(m)+'</div></div></div></div>'
    +'<div class="t2-cap">'+esc(x.pos)+' · '+esc(c.name)+'</div></div>';
}
function t2Draw(){
  if(TV.busy)return;TV.busy=true;
  var btn=$('t2Go');btn.disabled=true;btn.textContent='洗牌中…';
  load78().catch(function(){txt('t2Note','没连上网，这次先用 22 张大阿卡纳。');return fallback22()}).then(function(deck){
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
    res.querySelectorAll('.t2-front img').forEach(function(im){im.onerror=function(){im.parentNode.innerHTML=t2NoImg({name:im.alt},im.classList.contains('rv'))}});
    $('t2Setup').hidden=true;res.hidden=false;$('t2Reset').hidden=false;
    S.draws.unshift({id:uid(),at:Date.now(),type:three?'三张塔罗':'单张塔罗',question:q,name:drawn[0].card.name,rev:drawn[0].rev,
      cards:drawn.map(function(x){return{name:x.card.name,keyword:x.card.keyword||'',position:x.pos,isReversed:x.rev,meaning:x.rev?x.card.reversed:x.card.upright}})});
    if(S.draws.length>50)S.draws.length=50;
    save();updateNav();
  });
}
function t2Hist(){
  var box=$('t2HList');if(!box)return;
  if(!S.draws.length){box.innerHTML=emptyBox('尚无占卜记录','完成一次占卜后，结果将自动收录于此');return}
  box.innerHTML=S.draws.map(function(x){
    var cards=x.cards||[{name:x.name,isReversed:x.rev}];
    return '<div class="t2-h"><div class="t2-ht"><b>'+esc(x.type||'塔罗')+'</b><span>'+fmt(x.at)+'</span></div>'
      +(x.question?'<div class="t2-hq">「'+esc(x.question)+'」</div>':'')
      +'<div class="t2-tags">'+cards.map(function(c){return '<span class="'+(c.isReversed?'rv':'')+'">'+(c.position?esc(c.position)+' · ':'')+esc(c.name)+(c.isReversed?' · 逆':' · 正')+'</span>'}).join('')+'</div>'
      +cards.filter(function(c){return c.meaning}).map(function(c){return '<p class="t2-hm"><b>'+esc(c.name)+'</b>'+esc(c.meaning)+'</p>'}).join('')
      +'</div>';
  }).join('');
}
onView('tarot',function(){buildTarot();var d=new Date();txt('tarotDate',(d.getMonth()+1)+'月'+d.getDate()+'日');t2Hist()});
NAV_COUNT.tarot=function(){return S.draws.length};
onBoot(function(){buildTarot();load78().catch(function(){})});
