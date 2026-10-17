// 表情包：字卡库「氛围感 → 表情包」里存图；底栏点一下挑一张递过去；他也会按概率回表情包，概率在设置里调
'use strict';
var SK_TAG='表情包';
(function(){
  if(ATMO_TAGS.indexOf(SK_TAG)<0){ATMO.push([SK_TAG,SK_TAG]);ATMO_TAGS.push(SK_TAG)}
  if(SPECIAL.indexOf(SK_TAG)<0)SPECIAL.push(SK_TAG);
  if(S.prefs.stickerRate===undefined||S.prefs.stickerRate===null)S.prefs.stickerRate=12;
  P_DEF.stickerRate=12;
  save();
})();
if(typeof L4_HINT==='object')L4_HINT[SK_TAG]='下面「新增」里一行贴一个图片链接，或者在传讯页点表情按钮从相册选。你和他都从这里发。';
function skIsImg(s){return /^(data:image|https?:\/\/)/.test(String(s||''))}
function skPool(){return tagPool(SK_TAG).filter(skIsImg)}
function skAll(){return S.lib.filter(function(x){return x.tag===SK_TAG&&skIsImg(x.text)})}

// 聊天里画成图：没有气泡底，头像、时间、已读、撕掉还在
var _ceSk=cardEl;
cardEl=function(c){
  var el=_ceSk(c);
  if(!c||c.type!=='sticker'||!c.img||!el||!el.querySelector)return el;
  var card=el.classList&&el.classList.contains('card')?el:el.querySelector('.card');
  if(!card)return el;
  card.classList.add('sk');
  var b=card.querySelector('.body');
  if(b){
    b.textContent='';
    var im=document.createElement('img');im.className='sk-img';im.src=c.img;im.alt='表情';im.loading='lazy';
    b.appendChild(im);
  }
  return el;
};

// 字卡库里也显示缩略图，而不是一长串链接
var _l4cSk=l4CardEl;
l4CardEl=function(x,badge){
  var d=_l4cSk(x,badge);
  if(!x||x.tag!==SK_TAG||!skIsImg(x.text))return d;
  var t=d.querySelector('.tx');
  if(t){t.textContent='';var im=document.createElement('img');im.className='sk-th';im.src=x.text;im.alt='表情';im.loading='lazy';t.appendChild(im)}
  return d;
};

// 他回一张表情包
function taSticker(){
  var p=skPool();if(!p.length)return false;
  showTyping(false);
  addReplyCard({id:uid(),from:'ta',type:'sticker',img:pickOne(p),text:'',at:Date.now()});
  return true;
}
// 照 v25 那套流程，在拍一拍后面多掲一次表情包
simulateReply=function(token){
  if(token!==replyRun)return;
  var p=S.prefs,changed=false;
  S.cards.forEach(function(c){if(c.from==='me'&&!c.read){c.read=true;changed=true}});
  if(changed){save();renderChat()}
  if(p.readNo&&Math.random()*100<(+p.readNoRate)){showTyping(false);return}
  if(Math.random()*100<(+p.pokeRate)){taPoke();return}
  if(Math.random()*100<(+p.stickerRate)&&taSticker())return;
  var pool=libPool();
  if(!pool.length){showTyping(false);return}
  showTyping(true);
  var mine=S.cards.filter(function(c){return c.from==='me'&&!c.type&&c.text}).slice(-10);
  var n=replyCount(),delay=0;
  for(var i=0;i<n;i++){
    delay+=rnd(REPLY.waitMin,REPLY.waitMax);
    (function(i){
      setTimeout(function(){
        if(token!==replyRun)return;
        var c={id:uid(),from:'ta',text:comboText(pool),at:Date.now()};
        if(i===0&&mine.length&&Math.random()*100<(+p.quoteRate)){
          var m=pickOne(mine);c.quote={name:S.me.name||'我',text:m.text};
        }
        addReplyCard(c);
        if(i===n-1)showTyping(false);
      },delay);
    })(i);
  }
};

// 我递一张
function skSend(url){
  if(!skIsImg(url))return;
  S.cards.push({id:uid(),from:'me',type:'sticker',img:url,text:'',at:Date.now()});
  if(!save()){S.cards.pop();alert('存不下了。表情包比字卡占地方大很多，删几张再试。');return}
  renderChat();updateNav();
  skClose();
  if(typeof scheduleReply==='function')scheduleReply();
}
// 从相册加一张，压到 260px 再存
function skAdd(){
  pickImage(function(src){shrinkSafe(src,260,false,0.8).then(function(u){
    if(!u){alert('这张读不出来，换一张试试。');return}
    S.lib.push({id:uid(),tag:SK_TAG,text:u});
    if(typeof lbUnempty==='function')lbUnempty(SK_TAG);
    if(!save()){S.lib.pop();save();alert('存不下了。表情包占地方比字卡大很多，先删几张。');return}
    refreshLib();skPaint();
  })});
}

// 底栏的面板
(function(){
  var foot=document.querySelector('.chat-foot'),bar=$('fbar');if(!foot||!bar||$('skp'))return;
  var p=document.createElement('div');p.className='skp';p.id='skp';
  p.innerHTML='<div class="skp-hd"><span>表情包</span><span class="sp"></span><button type="button" data-sk="add">＋ 相册</button><button type="button" data-sk="lib">管理</button></div><div class="skp-grid" id="skpGrid"></div>';
  foot.insertBefore(p,bar);
  p.addEventListener('click',function(e){
    var b=e.target.closest('[data-sk]');if(!b)return;
    var a=b.dataset.sk;
    if(a==='add'){skAdd();return}
    if(a==='lib'){skClose();L4.tab='atmo';L4.sub=SK_TAG;go('lib');return}
    if(a==='pick'){skSend(b.dataset.u)}
  });
  var b=document.createElement('button');b.type='button';b.className='ico';b.id='btnSk';
  b.setAttribute('aria-label','表情包');b.innerHTML='<span class="zsl">表</span>';
  b.addEventListener('click',skToggle);
  bar.insertBefore(b,bar.firstChild);
})();
function skPaint(){
  var g=$('skpGrid');if(!g)return;
  var list=skAll();
  if(!list.length){g.innerHTML='<p class="skp-none">还没有表情包。<br>点「＋ 相册」从手机里选，或者点「管理」去字卡库贴图片链接。</p>';return}
  g.innerHTML=list.map(function(x){
    return '<button type="button" data-sk="pick" data-u="'+esc(x.text)+'"><img src="'+esc(x.text)+'" alt="表情" loading="lazy"></button>';
  }).join('');
}
function skToggle(){var p=$('skp');if(!p)return;if(p.classList.contains('on')){skClose();return}skPaint();p.classList.add('on')}
function skClose(){var p=$('skp');if(p)p.classList.remove('on')}
input.addEventListener('focus',skClose);

// 设置 → 回复 · 回信 · 通话 里加一条概率
var _orsSk=openReplySet;
openReplySet=function(){
  _orsSk();
  var anchor=sheetBody.querySelector('input[type=range][data-k="pokeRate"]');
  if(!anchor)return;
  var host=anchor.closest('.field');if(!host)return;
  var box=document.createElement('div');box.className='field';
  box.innerHTML='<label>改成发表情包</label><div class="rg"><input type="range" min="0" max="100" step="1"><b></b></div>';
  var r=box.querySelector('input'),v=box.querySelector('b');
  function paint(){r.value=+S.prefs.stickerRate||0;v.textContent=(+S.prefs.stickerRate||0)+'%'}
  r.addEventListener('input',function(){S.prefs.stickerRate=+r.value;paint()});
  r.addEventListener('change',function(){save()});
  paint();
  host.parentNode.insertBefore(box,host.nextSibling);
  var h=document.createElement('p');h.className='hint';
  h.textContent='掲中就不回字，改成从字卡库「氛围感 → 表情包」里挑一张发过来。那里空着就跳过，照旧回字卡。';
  box.parentNode.insertBefore(h,box.nextSibling);
};
renderChat();
