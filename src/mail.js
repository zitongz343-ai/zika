// 字卡传讯 · 信箱：收到的信 / 寄出的信。你写的放「寄出的信」，不带回复按钮
// 他按回信概率和时长，用字卡拼一封回你（照 milk：8~12 句连成一段）。时间记在信上，页面关着也照算
'use strict';
var MAILTAB='in',currentMail=null;
(function(){
  var v=document.querySelector('.view[data-view="mail"]');if(!v||$('mlTabs'))return;
  var bar=v.querySelector('.mo-bar');
  var t=document.createElement('div');t.className='l4-seg ml-tabs';t.id='mlTabs';
  t.innerHTML='<button type="button" data-m="in">收到的信<em id="mlIn"></em></button><button type="button" data-m="out">寄出的信<em id="mlOut"></em></button>';
  bar.parentNode.insertBefore(t,bar.nextSibling);
  t.addEventListener('click',function(e){var b=e.target.closest('[data-m]');if(!b)return;MAILTAB=b.dataset.m;renderMail()});
  var nb=v.querySelector('[data-act="newMail"]');if(nb)nb.addEventListener('click',function(){newMail()});
})();

function composeMail(src){
  var pool=libPool().concat(tagPool('信')),n=8+Math.floor(Math.random()*5),s='';
  for(var i=0;i<n&&pool.length;i++){
    var t=pickOne(pool);
    if(!/[。！？!?…~～.」』）)]$/.test(t))t+=Math.random()<0.2?'！':(Math.random()<0.2?'...':'。');
    s+=t;
  }
  return{id:uid(),from:'ta',title:'回：'+src.title,body:s||'收到了。',at:Date.now(),read:false,replyAt:0};
}
function mailTick(){
  var p=S.prefs,now=Date.now(),changed=false;
  var a=Math.max(0,+p.mailMin||0),b=Math.max(a,+p.mailMax||0);
  S.mails.forEach(function(m){
    if(m.from==='ta'||m.replyAt===0)return;
    if(m.replyAt===undefined){m.replyAt=Math.random()*100<(+p.mailRate)?now+rnd(a,b)*60000:0;changed=true;return}
    if(now>=m.replyAt){m.replyAt=0;S.mails.push(composeMail(m));changed=true}
  });
  if(!changed)return;
  save();updateNav();
  if(curView()==='mail')renderMail();
}
setInterval(mailTick,20000);
document.addEventListener('visibilitychange',function(){if(!document.hidden)mailTick()});
onBoot(mailTick);

function renderMail(){
  var box=$('mailList');if(!box)return;
  var ins=S.mails.filter(function(m){return m.from==='ta'}),outs=S.mails.filter(function(m){return m.from!=='ta'});
  var unread=ins.filter(function(m){return !m.read}).length;
  document.querySelectorAll('#mlTabs [data-m]').forEach(function(b){b.classList.toggle('on',b.dataset.m===MAILTAB)});
  txt('mlIn',unread?unread+' 未读':(ins.length||''));txt('mlOut',outs.length||'');
  var isIn=MAILTAB==='in',list=(isIn?ins:outs).slice().sort(function(x,y){return y.at-x.at});
  if(!list.length){
    box.innerHTML=isIn?emptyBox('还没有收到信','给'+esc(taName())+'写一封，<br>他会慢慢回，回信落在这里。'):emptyBox('还没有寄出的信','点右上角「写一封信」。');
    return;
  }
  var now=Date.now();
  box.innerHTML=list.map(function(m){
    var st='';
    if(!isIn){
      if(m.replyAt>now)st='<div class="mail-st wait">'+esc(taName())+' 在写回信</div>';
      else st='<div class="mail-st">'+(m.replyAt===undefined?'刚寄出':'已寄出')+'</div>';
    }
    return '<article class="mail'+(isIn&&!m.read?' unread':'')+'" data-id="'+esc(m.id)+'"><div class="mail-top"><span class="mail-title">'+esc(m.title)+'</span><span class="mail-date">'+fmtDay(m.at)+'</span></div><div class="mail-from">'+(isIn?esc(taName())+' 写给你':'寄给 '+esc(taName()))+'</div><p class="mail-prev">'+esc(m.body)+'</p>'+st+'</article>';
  }).join('');
}
$('mailList').addEventListener('click',function(e){var a=e.target.closest('.mail[data-id]');if(a)openMail(a.dataset.id)});
onView('mail',function(){mailTick();renderMail()});
NAV_COUNT.mail=function(){var u=S.mails.filter(function(m){return m.from==='ta'&&!m.read}).length;return u?u+' 未读':S.mails.length};

function openMail(id){
  var m=S.mails.filter(function(x){return x.id===id})[0];if(!m)return;
  currentMail=m;
  txt('rTitle',m.title);txt('rBody',m.body);
  txt('rFrom',(m.from==='ta'?taName():meName())+' · '+fmtDay(m.at));
  $('rReply').hidden=m.from!=='ta';
  reader.hidden=false;
  if(!m.read){m.read=true;save();renderMail();updateNav()}
}
function closeReader(){reader.hidden=true;currentMail=null}
$('rClose').addEventListener('click',closeReader);
reader.addEventListener('click',function(e){if(e.target===reader)closeReader()});
$('rDel').addEventListener('click',function(){
  if(!currentMail||!confirm('撕掉这封信？'))return;
  var id=currentMail.id;S.mails=S.mails.filter(function(x){return x.id!==id});
  save();closeReader();renderMail();updateNav();
});
$('rReply').addEventListener('click',function(){
  if(!currentMail)return;var t='回：'+currentMail.title;
  closeReader();setTimeout(function(){newMail({title:t})},120);
});

// 写信只有自己写，寄出后放进「寄出的信」
function newMail(pre){
  pre=pre||{};
  var w=document.createElement('div');
  w.innerHTML='<div class="field"><label>标题</label><input id="mTitle" maxlength="30" placeholder="给 '+esc(taName())+'"></div>'
    +'<div class="field"><label>正文</label><textarea id="mBody" class="l4-ta" placeholder="慢慢写，不着急。" style="min-height:220px;line-height:1.9"></textarea></div>'
    +'<button type="button" class="primary" id="mSend" style="width:100%">封 好 寄 出</button>'
    +'<p class="hint">寄出以后放在「寄出的信」里。'+esc(taName())+'会按回信概率和时长回你，回信落在「收到的信」。</p>';
  w.querySelector('#mTitle').value=pre.title||'';
  w.querySelector('#mSend').addEventListener('click',function(){
    var t=w.querySelector('#mTitle').value.trim()||'无题',bd=w.querySelector('#mBody').value.trim();
    if(!bd){alert('正文还空着。');return}
    S.mails.push({id:uid(),from:'me',title:t,body:bd,at:Date.now(),read:true});
    save();closeSheet();MAILTAB='out';mailTick();go('mail');
  });
  openSheet('写一封信',w);
}
