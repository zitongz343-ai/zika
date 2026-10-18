// v56：字卡库分「回复库」（主字卡 / 颜文字 / 表情包）和「氛围感」（拍一拍 / 对方状态 / 每日一句）
// 表情包在字卡库和聊天面板里都排成四列方格；⊕ 里的通话格子改小、换图标；他回字卡时按概率在句尾带一个颜文字
'use strict';
var KAO_TAG='颜文字';
(function(){
  if(ATMO_TAGS.indexOf(KAO_TAG)<0){ATMO.push([KAO_TAG,KAO_TAG]);ATMO_TAGS.push(KAO_TAG)}
  if(SPECIAL.indexOf(KAO_TAG)<0)SPECIAL.push(KAO_TAG);
  if(S.prefs.kaoRate===undefined||S.prefs.kaoRate===null)S.prefs.kaoRate=20;
  if(typeof P_DEF==='object')P_DEF.kaoRate=20;
  save();
})();
L4_HINT[KAO_TAG]='一行一个颜文字。顾时夜回字卡时会按概率在句尾带一个，概率在「设置 → 回复与通话」里调。';

// ── 两层分类：回复库 / 氛围感。内部还是 main + atmo 那套，只换了怎么分组显示 ──
var RSUB=[['main','主字卡',null],['kao','颜文字',KAO_TAG],['sk','表情包',SK_TAG]];
function l4Top(){return (L4.tab==='main'||L4.sub===KAO_TAG||L4.sub===SK_TAG)?'reply':'atmo'}
function l4Cnt(t){return S.lib.filter(function(x){return x.tag===t}).length}
var _dlV56=drawLib;
drawLib=function(){
  _dlV56.apply(this,arguments);
  var box=$('libPage');if(!box||!box.querySelector('#l4List'))return;
  var top=l4Top();
  var seg=$('l4Seg');
  if(seg)seg.querySelectorAll('[data-t]').forEach(function(b){
    if(b.dataset.t==='main')b.textContent='回复库';
    else if(b.dataset.t==='atmo')b.textContent='氛围感';
    b.classList.toggle('on',(b.dataset.t==='main')===(top==='reply'));
  });
  var sub=$('l4Sub');
  if(sub){
    sub.hidden=false;
    if(top==='reply'){
      var mainN=S.lib.filter(function(x){return !isAtmo(x.tag)}).length;
      sub.innerHTML=RSUB.map(function(r){
        var on=r[2]?(L4.tab==='atmo'&&L4.sub===r[2]):L4.tab==='main';
        return '<button type="button" class="lb-pill'+(on?' on':'')+'" data-r="'+r[0]+'">'+r[1]+' <em>'+(r[2]?l4Cnt(r[2]):mainN)+'</em></button>';
      }).join('');
    }else{
      sub.innerHTML=ATMO.filter(function(a){return a[0]!==KAO_TAG&&a[0]!==SK_TAG}).map(function(a){
        return '<button type="button" class="lb-pill'+(L4.sub===a[0]?' on':'')+'" data-sub="'+esc(a[0])+'">'+esc(a[1])+' <em>'+l4Cnt(a[0])+'</em></button>';
      }).join('');
    }
  }
  var sk=L4.tab==='atmo'&&L4.sub===SK_TAG;
  var list=$('l4List');if(list)list.classList.toggle('skg',sk);
  if(sk){var lc=$('libCount');if(lc)lc.textContent=l4Scope().length+' 张'}
};
// 顶上两个大分类和「回复库」下面三个小分类：在 #libPage 上抢先接住点击
(function(){
  var box=$('libPage');if(!box)return;
  box.addEventListener('click',function(e){
    if(!e.target.closest)return;
    var t=e.target.closest('#l4Seg [data-t]');
    if(t){
      e.stopPropagation();
      var want=t.dataset.t==='main'?'reply':'atmo';
      if(want===l4Top())return;
      if(want==='reply')L4.tab='main';
      else{L4.tab='atmo';if(L4.sub===KAO_TAG||L4.sub===SK_TAG||ATMO_TAGS.indexOf(L4.sub)<0)L4.sub='拍一拍'}
      L4.group='all';L4.sel={};L4.batch=false;drawLib();return;
    }
    var r=e.target.closest('#l4Sub [data-r]');
    if(r){
      e.stopPropagation();
      var k=r.dataset.r;
      if(k==='main')L4.tab='main';else{L4.tab='atmo';L4.sub=k==='kao'?KAO_TAG:SK_TAG}
      L4.group='all';L4.sel={};L4.batch=false;drawLib();
    }
  },true);
})();

// ── 字卡库里的表情包：一格一张图，点开有大图、发给他、屏蔽、删掉 ──
function skTileSheet(x){
  var w=document.createElement('div');
  w.innerHTML='<div class="skv"><img alt="表情"></div>'
    +'<button type="button" class="primary" data-k="send" style="width:100%">发 给 他</button>'
    +'<div class="two" style="margin-top:10px"><button type="button" class="ghost" data-k="off" style="flex:1">'+(x.off?'取消屏蔽':'屏蔽')+'</button><button type="button" class="ghost" data-k="rm" style="flex:1">删掉</button></div>'
    +'<p class="hint">屏蔽的表情包还在，只是'+esc(taName())+'不会发它。</p>';
  w.querySelector('img').src=x.text;
  w.addEventListener('click',function(e){
    var b=e.target.closest('[data-k]');if(!b)return;var k=b.dataset.k;
    if(k==='send'){closeSheet();go('chat');if(typeof skSend==='function')skSend(x.text);return}
    if(k==='off'){x.off=!x.off;refreshLib();if(typeof skPaint==='function')skPaint();closeSheet();return}
    if(k==='rm'){
      if(!confirm('删掉这张表情包？'))return;
      S.lib=S.lib.filter(function(y){return y!==x});lbKeep([x.tag]);refreshLib();
      if(typeof skPaint==='function')skPaint();closeSheet();
    }
  });
  openSheet('表情包',w);
}
var _l4cV56=l4CardEl;
l4CardEl=function(x,badge){
  if(!x||x.tag!==SK_TAG||!skIsImg(x.text))return _l4cV56.apply(this,arguments);
  var d=document.createElement('div');
  d.className='sk-tile'+(l4Off(x)?' off':'')+(L4.sel[x.id]?' sel':'');
  d.innerHTML=(L4.batch?'<span class="l4-chk">'+(L4.sel[x.id]?'✓':'')+'</span>':'')+'<img alt="表情" loading="lazy">';
  d.querySelector('img').src=x.text;
  d.addEventListener('click',function(){
    if(L4.batch){if(L4.sel[x.id])delete L4.sel[x.id];else L4.sel[x.id]=1;drawLib();return}
    skTileSheet(x);
  });
  return d;
};

// ── 颜文字：他回字卡时按概率在句尾带一个 ──
function kaoPool(){return typeof tagPool==='function'?tagPool(KAO_TAG):[]}
var _arcV56=addReplyCard;
addReplyCard=function(c){
  if(c&&c.from==='ta'&&!c.type&&typeof c.text==='string'&&c.text&&Math.random()*100<(+S.prefs.kaoRate||0)){
    var p=kaoPool();if(p.length)c.text=c.text.replace(/\s+$/,'')+' '+pickOne(p);
  }
  return _arcV56.apply(this,arguments);
};
var _orsV56=openReplySet;
openReplySet=function(){
  _orsV56.apply(this,arguments);
  if(typeof sheetBody==='undefined'||!sheetBody||$('kaoR'))return;
  var after=null;
  sheetBody.querySelectorAll('.field>label').forEach(function(l){if(l.textContent==='发表情包概率')after=l.parentNode});
  if(after&&after.nextElementSibling&&after.nextElementSibling.classList.contains('hint'))after=after.nextElementSibling;
  if(!after){var a=sheetBody.querySelector('input[type=range][data-k="pokeRate"]');after=a&&a.closest('.field')}
  if(!after)return;
  var box=document.createElement('div');box.className='field';
  box.innerHTML='<label>句尾带颜文字概率</label><div class="rg"><input type="range" id="kaoR" min="0" max="100" step="1"><b></b></div>';
  var r=box.querySelector('input'),v=box.querySelector('b');
  function paint(){r.value=+S.prefs.kaoRate||0;v.textContent=(+S.prefs.kaoRate||0)+'%'}
  r.addEventListener('input',function(){S.prefs.kaoRate=+r.value;paint()});
  r.addEventListener('change',function(){save()});
  paint();
  after.parentNode.insertBefore(box,after.nextSibling);
};

// ── ⊕ 里的通话格子：换成实心听筒 ──
(function(){
  var PH='<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"/></svg>';
  document.querySelectorAll('#plusp button').forEach(function(t){
    var s=t.querySelector('span'),i=t.querySelector('i');
    if(s&&i&&/通话|电话/.test(s.textContent))i.innerHTML=PH;
  });
})();

if(LIB.built)drawLib();
if(typeof skPaint==='function')skPaint();