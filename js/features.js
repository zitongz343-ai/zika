// 功能页：朋友圈、回信、塔罗
function renderMoments(){
  var box=$('moList');
  $('moCount').textContent=S.moments.length?S.moments.length+' 条':'';
  if(!S.moments.length){box.innerHTML='<div class="empty"><b>还没有动态</b>点右上角发一条。<br>谁发的都行。</div>';return}
  var list=S.moments.slice().sort(function(a,b){return b.at-a.at});
  box.innerHTML=list.map(function(m){
    var who=m.from==='me'?S.me:S.ta;
    var liked=(m.likes||[]).indexOf('me')>=0;
    var likeNames=(m.likes||[]).map(function(x){return x==='me'?(S.me.name||'我'):taName()}).join('、');
    var cmts=(m.comments||[]).map(function(c){
      var cw=c.from==='me'?S.me:S.ta;
      return '<div><b>'+esc(cw.name||'')+'</b>'+esc(c.text)+'</div>';
    }).join('');
    return '<article class="mo" data-mo="'+m.id+'"><div class="mo-av">'+avStr(who)+'</div><div class="mo-main"><div class="mo-name">'+esc(who.name||'')+'</div><p class="mo-text">'+esc(m.text)+'</p>'+(m.img?'<div class="mo-img">'+esc(m.img)+'</div>':'')+'<div class="mo-meta"><span>'+fmt(m.at)+'</span><button class="'+(liked?'liked':'')+'" data-act="like" data-id="'+m.id+'">♡ '+((m.likes||[]).length?likeNames:'')+'</button><button data-act="comment" data-id="'+m.id+'">评论</button><button data-act="delMo" data-id="'+m.id+'">删</button></div>'+(cmts?'<div class="mo-cmts">'+cmts+'</div>':'')+'</div></article>';
  }).join('');
}
function newMoment(){
  var wrap=document.createElement('div');
  wrap.innerHTML='<div class="pick" id="moPick"><button data-f="me" class="on">'+esc(S.me.name)+'</button><button data-f="ta">'+esc(S.ta.name)+'</button></div><div class="field"><label>说点什么</label><textarea id="moText" placeholder="今天…" style="font-family:var(--serif);font-size:14px;min-height:110px"></textarea></div><div class="field"><label>配一个符号（可不填）</label><input id="moImg" maxlength="4" placeholder="🌤"></div><button class="primary" id="moSend" style="width:100%">发 出 去</button>';
  openSheet('发一条',wrap);
  var from='me';
  wrap.querySelector('#moPick').addEventListener('click',function(e){
    var b=e.target.closest('button');if(!b)return;from=b.dataset.f;
    var all=wrap.querySelectorAll('#moPick button');
    for(var i=0;i<all.length;i++)all[i].classList.toggle('on',all[i]===b);
  });
  wrap.querySelector('#moSend').addEventListener('click',function(){
    var t=wrap.querySelector('#moText').value.trim();
    if(!t)return;
    S.moments.push({id:uid(),from:from,text:t,img:wrap.querySelector('#moImg').value.trim(),at:Date.now(),likes:[],comments:[]});
    save();closeSheet();renderMoments();
  });
}
function renderMail(){
  var box=$('mailList');
  if(!S.mails.length){box.innerHTML='<div class="empty"><b>信箱是空的</b>写一封，慢慢说。<br>'+esc(taName())+'回的信也会落在这里。</div>';return}
  var list=S.mails.slice().sort(function(a,b){return b.at-a.at});
  box.innerHTML=list.map(function(m){
    var who=m.from==='me'?S.me:S.ta;
    return '<article class="mail'+(m.read?'':' unread')+'" data-act="openMail" data-id="'+m.id+'"><div class="mail-top"><span class="mail-title">'+esc(m.title)+'</span><span class="mail-date">'+fmtDay(m.at)+'</span></div><div class="mail-from">'+esc(who.name||'')+' 写</div><p class="mail-prev">'+esc(m.body)+'</p></article>';
  }).join('');
}
function openMail(id){
  var m=null;for(var i=0;i<S.mails.length;i++)if(S.mails[i].id===id)m=S.mails[i];
  if(!m)return;
  currentMail=m;
  var who=m.from==='me'?S.me:S.ta;
  $('rTitle').textContent=m.title;
  $('rBody').textContent=m.body;
  $('rFrom').textContent=(who.name||'')+' · '+fmtDay(m.at);
  reader.hidden=false;
  if(!m.read){m.read=true;save();renderMail()}
}
function closeReader(){reader.hidden=true;currentMail=null}
function newMail(pre){
  pre=pre||{};
  var wrap=document.createElement('div');
  wrap.innerHTML='<div class="pick" id="mPick"><button data-f="me" class="'+(pre.from==='ta'?'':'on')+'">'+esc(S.me.name)+' 写</button><button data-f="ta" class="'+(pre.from==='ta'?'on':'')+'">'+esc(S.ta.name)+' 写</button></div><div class="field"><label>标题</label><input id="mTitle" maxlength="30" placeholder="给'+esc(pre.to||S.ta.name)+'"></div><div class="field"><label>正文</label><textarea id="mBody" placeholder="慢慢写，不着急。" style="font-family:var(--serif);font-size:14px;line-height:1.9"></textarea></div><button class="primary" id="mSend" style="width:100%">封 好</button>';
  openSheet('写一封信',wrap);
  wrap.querySelector('#mTitle').value=pre.title||'';
  wrap.querySelector('#mBody').value=pre.body||'';
  var from=pre.from==='ta'?'ta':'me';
  wrap.querySelector('#mPick').addEventListener('click',function(e){
    var b=e.target.closest('button');if(!b)return;from=b.dataset.f;
    var all=wrap.querySelectorAll('#mPick button');
    for(var i=0;i<all.length;i++)all[i].classList.toggle('on',all[i]===b);
  });
  wrap.querySelector('#mSend').addEventListener('click',function(){
    var t=wrap.querySelector('#mTitle').value.trim()||'无题';
    var b=wrap.querySelector('#mBody').value.trim();
    if(!b){alert('正文还空着。');return}
    S.mails.push({id:uid(),from:from,title:t,body:b,at:Date.now(),read:false});
    save();closeSheet();renderMail();go('mail');
  });
}
var flipped=false;
function renderDraws(){
  var d=new Date();
  $('tarotDate').textContent=(d.getMonth()+1)+'月'+d.getDate()+'日';
  var box=$('drawList');
  if(!S.draws.length){box.innerHTML='<p class="hint">还没有抽过。</p>';return}
  box.innerHTML=S.draws.slice(0,8).map(function(x){
    return '<div class="dr"><b>'+esc(x.name)+(x.rev?' · 逆':' · 正')+'</b><span>'+fmtDay(x.at)+'</span></div>';
  }).join('');
}
function draw(){
  var card=$('tcard');
  var front=$('tfront');
  var btn=$('btnDraw');
  if(flipped){
    flipped=false;card.classList.remove('flipped');
    btn.textContent='再 抽 一 张';
    setTimeout(doDraw,320);
    return;
  }
  doDraw();
  function doDraw(){
    btn.disabled=true;
    card.classList.add('shake');
    setTimeout(function(){
      card.classList.remove('shake');
      var c=TAROT[Math.floor(Math.random()*TAROT.length)];
      var rev=Math.random()<0.34;
      front.querySelector('.sym').textContent=c.s;
      front.querySelector('.nm').textContent=c.n;
      front.querySelector('.en').textContent=c.e;
      front.querySelector('.rev').textContent=rev?'逆 位':'正 位';
      card.classList.add('flipped');flipped=true;
      $('tiName').textContent=c.n+' · '+(rev?'逆位':'正位');
      $('tiMean').textContent=rev?c.rev:c.up;
      btn.disabled=false;btn.textContent='再 抽 一 张';
      S.draws.unshift({id:uid(),name:c.n,rev:rev,at:Date.now()});
      if(S.draws.length>40)S.draws.length=40;
      save();renderDraws();
    },640);
  }
}
