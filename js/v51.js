// 字卡库的表情包分组：「新增」里能从相册选图；底栏的表情包和通话收进「⋯」
'use strict';

// ── 字卡库 → 氛围感 → 表情包 → 新增：先给一个从相册选的按钮，下面还能贴链接 ──
var _l4AddV51=l4AddSheet;
l4AddSheet=function(){
  if(typeof L4==='undefined'||L4.tab!=='atmo'||L4.sub!==SK_TAG){_l4AddV51();return}
  var w=document.createElement('div');
  w.innerHTML='<button type="button" class="primary" id="skUp" style="width:100%;height:50px;letter-spacing:.16em">＋ 从相册选图</button>'
    +'<p class="hint">选中的图会压到 260px 再存，省地方。可以一张一张加。</p>'
    +'<div class="sec">或者贴图片链接</div>'
    +'<textarea id="skTa" class="l4-ta" placeholder="一行一个链接，https:// 开头…" style="min-height:120px"></textarea>'
    +'<div class="l4-cnt" id="skCnt">0 个链接</div>'
    +'<button type="button" class="primary" id="skOk" style="width:100%">添 加</button>';
  var ta=w.querySelector('#skTa'),cnt=w.querySelector('#skCnt');
  function lines(){return uniqArr(ta.value.split('\n').map(function(s){return s.trim()}).filter(skIsImg))}
  function paint(){cnt.textContent=lines().length+' 个链接'}
  ta.addEventListener('input',paint);
  w.querySelector('#skUp').addEventListener('click',function(){skAdd()});
  w.querySelector('#skOk').addEventListener('click',function(){
    var ls=lines();if(!ls.length){alert('没找到可用的图片链接。要 https:// 开头。');return}
    var have={},add=0;
    S.lib.forEach(function(x){if(x.tag===SK_TAG)have[x.text]=1});
    ls.forEach(function(t){if(have[t])return;have[t]=1;S.lib.push({id:uid(),tag:SK_TAG,text:t});add++});
    if(typeof lbUnempty==='function')lbUnempty(SK_TAG);
    if(!save()){alert('存不下了，先删几张。');return}
    refreshLib();if(typeof skPaint==='function')skPaint();closeSheet();
    if(add<ls.length)alert('加进去 '+add+' 张，其余本来就有。');
  });
  openSheet('添加表情包',w);
};

// ── 底栏：表情包和通话收进一个「⋯」 ──
(function(){
  var bar=$('fbar');if(!bar||$('btnMore'))return;
  var sk=$('btnSk'),call=$('btnCall');
  var wrap=document.createElement('div');wrap.className='fb-wrap';wrap.id='fbWrap';
  if(sk)wrap.appendChild(sk);
  if(call)wrap.appendChild(call);
  var m=document.createElement('button');m.type='button';m.className='ico';m.id='btnMore';
  m.setAttribute('aria-label','更多');m.innerHTML='<span class="zsl">⋯</span>';
  m.addEventListener('click',function(){
    var on=bar.classList.toggle('on');
    if(!on&&typeof skClose==='function')skClose();
  });
  bar.insertBefore(m,bar.firstChild);
  bar.insertBefore(wrap,m.nextSibling);
  input.addEventListener('focus',function(){bar.classList.remove('on')});
})();
