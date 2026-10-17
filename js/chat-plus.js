// v11：引用对方的话、收藏他的字卡、收藏页、设置归类；传讯页顶上的设置按钮去掉
'use strict';

// 他回字卡时只引用你说的话（之前会抽到他自己的）
simulateReply=function(token){
  if(token!==replyRun)return;
  var changed=false;
  S.cards.forEach(function(c){if(c.from==='me'&&!c.read){c.read=true;changed=true}});
  if(changed){save();renderChat()}
  if(Math.random()*100>=(+S.prefs.replyRate)){showTyping(false);return}
  if(Math.random()<REPLY.pokeRate){
    addReplyCard({id:uid(),from:'ta',type:'poke',text:taName()+' '+pickOne(POKES),at:Date.now()});
    return;
  }
  var pool=libPool();
  if(!pool.length)return;
  showTyping(true);
  var now=Date.now();
  var mine=S.cards.filter(function(c){return c.from==='me'&&!c.type&&c.text&&now-c.at<REPLY.quoteWindow}).slice(-REPLY.quoteLast);
  var n=replyCount(),delay=0;
  for(var i=0;i<n;i++){
    delay+=rnd(REPLY.waitMin,REPLY.waitMax);
    (function(i){
      setTimeout(function(){
        if(token!==replyRun)return;
        var c={id:uid(),from:'ta',text:pickOne(pool),at:Date.now()};
        if(i===0&&mine.length&&Math.random()<REPLY.quoteRate){
          var m=pickOne(mine);
          c.quote={name:S.me.name||'我',text:m.text};
        }
        addReplyCard(c);
        if(i===n-1)showTyping(false);
      },delay);
    })(i);
  }
};

// 收藏
function ensureFavs(){if(!Array.isArray(S.favs))S.favs=[]}
var _ensureV11=ensurePrefs;
ensurePrefs=function(){_ensureV11();ensureFavs()};
ensureFavs();save();
function isFav(id){return S.favs.some(function(f){return f.cardId===id})}
function toggleFav(c){
  if(isFav(c.id))S.favs=S.favs.filter(function(f){return f.cardId!==c.id});
  else S.favs.unshift({id:uid(),cardId:c.id,name:taName(),text:c.text,at:c.at,favAt:Date.now()});
  save();updateNav();
}

// 引用：点他的字卡选「引用」，输入框上面出现引用条，递出去的那张带上
var QUOTE=null;
var qBar=document.createElement('div');qBar.id='qBar';qBar.hidden=true;
(function(){var f=document.querySelector('.chat-foot');f.insertBefore(qBar,f.firstChild)})();
function setQuote(q){
  QUOTE=q;qBar.hidden=!q;
  if(!q){qBar.innerHTML='';return}
  qBar.innerHTML='<span><b>'+esc(q.name)+'</b>'+esc(q.text)+'</span><button type="button" aria-label="不引用了">×</button>';
  qBar.querySelector('button').addEventListener('click',function(){setQuote(null)});
  input.focus();
}
var _sendV11=send;
send=function(){
  var q=QUOTE,before=S.cards.length;
  _sendV11();
  if(q&&S.cards.length>before){
    var c=S.cards[S.cards.length-1];
    if(c.from==='me'){c.quote=q;save();renderChat()}
    setQuote(null);
  }
};

// 字卡上的小按钮：他的字卡多「引用」「收藏」，撕掉也收进同一排
function actBtn(t,fn){
  var b=document.createElement('button');b.type='button';b.textContent=t;
  b.addEventListener('click',function(e){e.stopPropagation();fn(b)});
  return b;
}
function paintStar(el,on){
  var s=el.querySelector('.head .fv');
  if(on&&!s){s=document.createElement('span');s.className='fv';s.textContent='★';el.querySelector('.head').appendChild(s)}
  if(!on&&s)s.remove();
}
var _cardElV11=cardEl;
cardEl=function(c){
  var el=_cardElV11(c);
  if(!el.classList||!el.classList.contains('card'))return el;
  var acts=document.createElement('div');acts.className='acts';
  if(c.from==='ta'){
    paintStar(el,isFav(c.id));
    acts.appendChild(actBtn('引用',function(){setQuote({name:taName(),text:c.text});el.classList.remove('show-del')}));
    acts.appendChild(actBtn(isFav(c.id)?'取消收藏':'收藏',function(b){toggleFav(c);var on=isFav(c.id);b.textContent=on?'取消收藏':'收藏';paintStar(el,on)}));
  }
  var del=el.querySelector('.del');if(del)acts.appendChild(del);
  el.appendChild(acts);
  return el;
};

// 收藏页
function renderFav(){
  ensureFavs();
  var box=$('favList');if(!box)return;
  $('favCount').textContent=S.favs.length?S.favs.length+' 句':'';
  if(!S.favs.length){box.innerHTML='<div class="empty"><b>还没有收藏</b>在传讯页点一下'+esc(taName())+'的字卡，<br>选「收藏」就会放到这里。</div>';return}
  box.innerHTML='';
  S.favs.forEach(function(f){
    var a=document.createElement('article');a.className='fav';
    a.innerHTML='<p></p><div class="fm"><span></span><button type="button" data-f="q">引用回他</button><button type="button" data-f="rm">取消收藏</button></div>';
    a.querySelector('p').textContent=f.text;
    a.querySelector('.fm span').textContent=(f.name||taName())+' · '+fmt(f.at);
    a.addEventListener('click',function(e){
      var b=e.target.closest('[data-f]');if(!b)return;
      if(b.dataset.f==='q'){go('chat');setQuote({name:f.name||taName(),text:f.text})}
      if(b.dataset.f==='rm'){S.favs=S.favs.filter(function(x){return x.id!==f.id});save();renderFav();updateNav()}
    });
    box.appendChild(a);
  });
}
var _goV11=go;
go=function(v){_goV11(v);if(v==='fav')renderFav()};
var _navV11=updateNav;
updateNav=function(){_navV11();var e=$('sbcFav');if(e)e.textContent=(S.favs||[]).length||''};
IC_DEF.fav='☆';IC_NAME.fav='收藏';
applyIcons();updateNav();

// 传讯页顶上的设置按钮去掉，气泡挪进设置里
(function(){var b=$('btnChatSet');if(b)b.remove()})();

// 设置：分组收好，点进去的子页顶上有「‹ 设置」回来
function openProfile(){
  var w=document.createElement('div');
  w.innerHTML='<div class="two"><div class="field"><label>我的名字</label><input id="inMeName" maxlength="12"></div><div class="field"><label>没照片时的符号</label><input id="inMeAv" maxlength="4"></div></div>'
    +'<div class="two"><div class="field"><label>他的名字</label><input id="inTaName" maxlength="12"></div><div class="field"><label>没照片时的符号</label><input id="inTaAv" maxlength="4"></div></div>'
    +'<div class="two" style="margin-bottom:12px"><button class="ghost" data-pick="me" style="flex:1">换我的照片</button><button class="ghost" data-pick="ta" style="flex:1">换他的照片</button></div>'
    +'<button class="primary" id="pfSave" style="width:100%">收 好</button>'
    +'<button class="ghost" id="pfNoImg" style="width:100%;margin-top:10px">照片都换回符号</button>';
  w.querySelector('#inMeName').value=S.me.name||'';
  w.querySelector('#inMeAv').value=S.me.avatar||'';
  w.querySelector('#inTaName').value=S.ta.name||'';
  w.querySelector('#inTaAv').value=S.ta.avatar||'';
  w.querySelector('#pfSave').addEventListener('click',function(){
    S.me.name=(w.querySelector('#inMeName').value||'我').trim().slice(0,12);
    S.me.avatar=(w.querySelector('#inMeAv').value||'🌙').trim().slice(0,4);
    S.ta.name=(w.querySelector('#inTaName').value||TA_NAME).trim().slice(0,12);
    S.ta.avatar=(w.querySelector('#inTaAv').value||'✦').trim().slice(0,4);
    save();paintNames();renderHome();renderChat();closeSheet();
  });
  w.querySelector('#pfNoImg').addEventListener('click',function(){
    if(confirm('把两张照片都去掉？')){S.me.img='';S.ta.img='';save();paintNames();renderMoments()}
  });
  openSheet('名字和头像',w);
}
function openLook(){
  var w=document.createElement('div');
  w.innerHTML='<div class="field"><label>材质</label><div class="seg" id="styleSeg"><button data-s="glass">毛玻璃</button><button data-s="solid">纯色</button></div></div><div class="field"><label>配色</label><div class="swatches" id="swWrap"></div></div>';
  w.querySelectorAll('#styleSeg button').forEach(function(b){
    b.classList.toggle('on',b.dataset.s===S.style);
    b.addEventListener('click',function(){
      if(S.style!==b.dataset.s)toggleStyle();
      w.querySelectorAll('#styleSeg button').forEach(function(x){x.classList.toggle('on',x===b)});
    });
  });
  var sw=w.querySelector('#swWrap');
  [{id:'paper',c:'#efe4d4',dot:'#b07b62'},{id:'night',c:'#17161c',dot:'#c99c8b'},{id:'rose',c:'#f6e3e3',dot:'#b96f74'},{id:'sage',c:'#e4e9df',dot:'#6f8a6d'}].forEach(function(t){
    var b=document.createElement('button');
    b.className='sw'+(S.theme===t.id?' on':'');b.style.background=t.c;
    var i=document.createElement('i');i.style.background=t.dot;b.appendChild(i);
    b.addEventListener('click',function(){
      S.theme=t.id;applySkin();save();
      sw.querySelectorAll('.sw').forEach(function(x){x.classList.remove('on')});
      b.classList.add('on');
    });
    sw.appendChild(b);
  });
  openSheet('材质与配色',w);
}
var SET_GROUPS=[
  ['我们',[['openProfile','名字和头像',function(){return S.me.name+' × '+taName()}],['openDays','纪念日',function(){return S.days.length?S.days.length+' 个':'还没有'}]]],
  ['外观',[['openLook','材质与配色',function(){return S.style==='glass'?'毛玻璃':'纯色'}],['openWallSet','主页壁纸',function(){return S.prefs.wall?'已设置':'没有'}],['openIconSet','板块图标',function(){return ''}],['openFontSet','全局字体',function(){var f=FONTS.filter(function(x){return x.id===S.prefs.font.id})[0];return f?f.n:''}],['openBubble','聊天气泡',function(){return S.bubbleCSS?'已自定义':'CSS'}]]],
  ['聊天',[['openReplySet','回复与通话',function(){return '概率 · 时长'}],['openGroups','字卡分组',function(){return libTags().length+' 组'}]]],
  ['数据',[['openData','数据备份与导入',function(){return '也认 milk'}]]]
];
function addBack(){
  if(sheet.hidden||sheetBody.querySelector('.sh-back'))return;
  var b=document.createElement('button');b.type='button';b.className='sh-back';b.textContent='‹ 设置';
  b.addEventListener('click',function(){closeSheet();setTimeout(openSettings,60)});
  sheetBody.insertBefore(b,sheetBody.firstChild);
}
openSettings=function(){
  var w=document.createElement('div');
  SET_GROUPS.forEach(function(g){
    var h=document.createElement('div');h.className='sec';h.textContent=g[0];w.appendChild(h);
    var box=document.createElement('div');box.className='menu-list set-grp';
    g[1].forEach(function(it){
      var b=document.createElement('button');b.type='button';b.className='mi';b.dataset.fn=it[0];
      var v='';try{v=it[2]()}catch(e){}
      b.innerHTML='<b>'+esc(it[1])+'</b><span>'+esc(v)+' ›</span>';
      box.appendChild(b);
    });
    w.appendChild(box);
  });
  w.addEventListener('click',function(e){
    var b=e.target.closest('[data-fn]');if(!b)return;
    var fn=window[b.dataset.fn];if(typeof fn!=='function')return;
    closeSheet();setTimeout(function(){fn();addBack()},80);
  });
  openSheet('设置',w);
};
