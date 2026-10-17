// v18：朋友圈改成空间那种样子。封面能换，自己头像在右下角，按日期排，能发图、能私密发表
// 你发出去以后，他按概率来点赞、用字卡评论；你评论了，他按概率回你。概率和时间都在 设置 → 聊天 → 朋友圈互动 里调，真的在用
'use strict';
var MO_DEF={moLikeRate:85,moCmtRate:60,moCmtMax:2,moMin:1,moMax:20,moReplyRate:70};
function moEnsure(){
  var p=S.prefs;
  for(var k in MO_DEF)if(typeof p[k]!=='number')p[k]=MO_DEF[k];
  if(typeof p.moCover!=='string')p.moCover='';
  if(typeof p.moSign!=='string')p.moSign='';
  if(typeof S.moUnread!=='number')S.moUnread=0;
  if(!Array.isArray(S.moments))S.moments=[];
  S.moments.forEach(function(m){
    if(!Array.isArray(m.likes))m.likes=[];
    if(!Array.isArray(m.comments))m.comments=[];
    if(!Array.isArray(m.imgs))m.imgs=[];
  });
}
var _ensureV18=ensurePrefs;
ensurePrefs=function(){_ensureV18();moEnsure()};
moEnsure();save();

// 时间：在最快和最慢之间随机，至少隔几秒，不会刚发出去就到
function moDelay(){
  var p=S.prefs,a=Math.max(0,+p.moMin||0),b=Math.max(a,+p.moMax||0);
  return Math.max(4000,rnd(a,b)*60000);
}
// 发出去那一刻就掷好：赞不赞、评几条、各在什么时候来。记在动态上，页面关着也照算
function moPlan(m){
  var p=S.prefs,now=Date.now(),ai={like:0,cmts:[]};
  if(Math.random()*100<(+p.moLikeRate))ai.like=now+moDelay();
  if(Math.random()*100<(+p.moCmtRate)){
    var n=1+Math.floor(Math.random()*Math.max(1,+p.moCmtMax||1));
    for(var i=0;i<n;i++)ai.cmts.push(now+moDelay());
  }
  ai.cmts.sort(function(a,b){return a-b});
  if(ai.like||ai.cmts.length)m.ai=ai;
}
function moLine(){var pool=libPool();return pool.length?pickOne(pool):'看到了。'}
function moOn(){var v=document.querySelector('.view.on');return !!v&&v.dataset.view==='moments'}
function moTick(){
  var now=Date.now(),got=0,changed=false;
  S.moments.forEach(function(m){
    var ai=m.ai;
    if(ai){
      if(ai.like&&now>=ai.like){ai.like=0;changed=true;if(m.likes.indexOf('ta')<0){m.likes.push('ta');got++}}
      while(ai.cmts&&ai.cmts.length&&now>=ai.cmts[0]){
        var t=ai.cmts.shift();m.comments.push({id:uid(),from:'ta',text:moLine(),at:t});got++;changed=true;
      }
      if(!ai.like&&!(ai.cmts&&ai.cmts.length)){delete m.ai;changed=true}
    }
    var n=m.comments.length;
    for(var i=0;i<n;i++){
      var c=m.comments[i];
      if(c.from==='me'&&c.replyAt&&now>=c.replyAt){
        var at=c.replyAt;c.replyAt=0;
        m.comments.push({id:uid(),from:'ta',to:'me',text:moLine(),at:at});got++;changed=true;
      }
    }
    if(changed)m.comments.sort(function(a,b){return a.at-b.at});
  });
  if(!changed)return;
  S.moUnread+=got;save();updateNav();
  if(moOn())renderMoments();
}
setInterval(moTick,15000);
document.addEventListener('visibilitychange',function(){if(!document.hidden)moTick()});

function moFind(id){for(var i=0;i<S.moments.length;i++)if(S.moments[i].id===id)return S.moments[i];return null}
function moWho(k){return k==='me'?(S.me.name||'我'):taName()}
function moHM(t){var d=new Date(t);return pad(d.getHours())+':'+pad(d.getMinutes())}
function moDay0(t){var d=new Date(t);d.setHours(0,0,0,0);return d.getTime()}
function moLabel(t){
  var diff=Math.round((moDay0(Date.now())-moDay0(t))/864e5),d=new Date(t);
  if(diff===0)return '<b class="w">今天</b>';
  if(diff===1)return '<b class="w">昨天</b>';
  var y=d.getFullYear()!==new Date().getFullYear()?'<em>'+d.getFullYear()+'</em>':'';
  return '<b>'+pad(d.getDate())+'</b><span>'+(d.getMonth()+1)+'月</span>'+y;
}
var MO_CAM='<svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" fill-rule="evenodd"><path d="M9 4L7.2 6H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-3.2L15 4H9zm3 4.5a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9zm0 2a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5z"/></svg>';
var MO_LOCK='<svg viewBox="0 0 24 24" width="20" height="22" fill="currentColor" fill-rule="evenodd"><path d="M12 2a5 5 0 0 0-5 5v3H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2h-1V7a5 5 0 0 0-5-5zM9 10V7a3 3 0 0 1 6 0v3H9z"/></svg>';

function moPostHTML(m){
  var mine=m.from==='me',who=mine?S.me:S.ta,h='<article class="m2-post" data-id="'+esc(m.id)+'">';
  if(!mine)h+='<div class="m2-by"><span class="m2-bav">'+avStr(who)+'</span><b>'+esc(who.name||'')+'</b></div>';
  var im=m.imgs||[];
  if(im.length){
    var cls=im.length===1?'n1':(im.length===2||im.length===4?'n2':'n3');
    h+='<div class="m2-imgs '+cls+'">'+im.map(function(s,i){return '<img src="'+esc(s)+'" data-z="'+i+'" alt="">'}).join('')+'</div>';
  }else if(m.img)h+='<div class="m2-sym">'+esc(m.img)+'</div>';
  if(m.text)h+='<p class="m2-text">'+esc(m.text)+'</p>';
  var liked=m.likes.indexOf('me')>=0;
  h+='<div class="m2-meta"><span>'+moHM(m.at)+(m.priv?' · 仅自己可见':'')+'</span><button type="button" data-a="like" class="'+(liked?'on':'')+'">'+(liked?'♥':'♡')+' 赞</button><button type="button" data-a="cmt">评论</button><button type="button" data-a="del">删</button></div>';
  var likes=m.likes.map(function(k){return esc(moWho(k))});
  var cm=m.comments.slice().sort(function(a,b){return a.at-b.at});
  if(likes.length||cm.length){
    h+='<div class="m2-ia">';
    if(likes.length)h+='<div class="m2-lk">♡ '+likes.join('，')+'</div>';
    cm.forEach(function(c){
      h+='<div class="m2-c" data-c="'+esc(c.id)+'"><b>'+esc(moWho(c.from))+'</b>'+(c.to?' 回复 <b>'+esc(moWho(c.to))+'</b>':'')+'：'+esc(c.text)+'</div>';
    });
    h+='</div>';
  }
  return h+'</article>';
}

function moBuild(){
  var v=document.querySelector('.view[data-view="moments"]');
  if(!v||v.dataset.v18)return;v.dataset.v18='1';
  v.innerHTML='<div class="m2-cover" id="m2Cover"><div class="m2-who"><span class="m2-nm" id="m2Nm"></span><button type="button" class="m2-av" id="m2Av" aria-label="换我的头像"></button></div></div>'
    +'<p class="m2-sign" id="m2Sign"></p><div id="m2New" hidden></div><div id="moList"></div>'
    +'<span id="moCoverName" hidden></span><span id="moCount" hidden></span>';
  $('m2Cover').addEventListener('click',function(e){
    if(e.target.closest('#m2Av')){pickAvatar('me');return}
    moCoverSet();
  });
  $('m2Sign').addEventListener('click',moSignSet);
  $('moList').addEventListener('click',moListClick);
}

renderMoments=function(){
  moBuild();moEnsure();
  var cv=$('m2Cover');if(!cv)return;
  var src=S.prefs.moCover;
  cv.style.backgroundImage=src?'url("'+src+'")':'';
  cv.classList.toggle('has-img',!!src);
  setAv($('m2Av'),S.me);
  $('m2Nm').textContent=S.me.name||'我';
  var sg=$('m2Sign');sg.textContent=S.prefs.moSign||'点这里写一句签名';sg.classList.toggle('ph',!S.prefs.moSign);
  var nw=$('m2New');
  if(moOn()&&S.moUnread>0){nw.hidden=false;nw.textContent=taName()+' 来过 · '+S.moUnread+' 条新互动';S.moUnread=0;save();updateNav()}
  else nw.hidden=true;
  var ms=S.moments.slice().sort(function(a,b){return b.at-a.at});
  var groups=[],cur=null,today=moDay0(Date.now());
  ms.forEach(function(m){
    var k=moDay0(m.at);
    if(!cur||cur.k!==k){cur={k:k,t:m.at,items:[]};groups.push(cur)}
    cur.items.push(m);
  });
  if(!groups.length||groups[0].k!==today)groups.unshift({k:today,t:Date.now(),items:[]});
  var pubs='<div class="m2-pubs"><button type="button" class="m2-pub" data-pub="0">'+MO_CAM+'<span>发表</span></button><button type="button" class="m2-pub" data-pub="1">'+MO_LOCK+'<span>私密发表</span></button></div>';
  $('moList').innerHTML=groups.map(function(g){
    return '<div class="m2-day"><div class="m2-dl">'+moLabel(g.t)+'</div><div class="m2-posts">'+(g.k===today?pubs:'')+g.items.map(moPostHTML).join('')+'</div></div>';
  }).join('');
  $('moCount').textContent=S.moments.length?S.moments.length+' 条':'';
};

function moListClick(e){
  var t=e.target;
  var pb=t.closest('[data-pub]');if(pb){newMoment2(pb.dataset.pub==='1');return}
  var art=t.closest('.m2-post');if(!art)return;
  var m=moFind(art.dataset.id);if(!m)return;
  if(t.closest('.m2-cbox'))return;
  var z=t.closest('img[data-z]');if(z){moZoom(z.src);return}
  var a=t.closest('[data-a]');
  if(a){
    var k=a.dataset.a;
    if(k==='like'){var i=m.likes.indexOf('me');if(i>=0)m.likes.splice(i,1);else m.likes.push('me');save();renderMoments();return}
    if(k==='cmt'){moBox(art,m,'');return}
    if(k==='del'){if(confirm('删掉这条动态？')){S.moments=S.moments.filter(function(x){return x!==m});save();renderMoments();updateNav()}return}
  }
  var ce=t.closest('.m2-c');
  if(ce){
    var c=m.comments.filter(function(x){return x.id===ce.dataset.c})[0];if(!c)return;
    if(c.from==='ta')moBox(art,m,'ta');
    else if(confirm('删掉这条评论？')){m.comments=m.comments.filter(function(x){return x!==c});save();renderMoments()}
  }
}
function moBox(art,m,to){
  document.querySelectorAll('.m2-cbox').forEach(function(x){x.remove()});
  var b=document.createElement('div');b.className='m2-cbox';
  b.innerHTML='<input placeholder="'+(to?'回复 '+esc(taName())+'…':'评论…')+'" enterkeyhint="send"><button type="button">发</button>';
  var inp=b.querySelector('input');
  function go(){var v=inp.value.trim();if(v)moComment(m,v,to)}
  b.querySelector('button').addEventListener('click',function(e){e.stopPropagation();go()});
  inp.addEventListener('keydown',function(e){if(e.key==='Enter'){e.preventDefault();go()}});
  art.appendChild(b);inp.focus();
}
// 你评论了：私密的不算，其余按「回复你的概率」掷一次
function moComment(m,text,to){
  var c={id:uid(),from:'me',text:text,at:Date.now()};
  if(to)c.to=to;
  if(!m.priv&&Math.random()*100<(+S.prefs.moReplyRate))c.replyAt=Date.now()+moDelay();
  m.comments.push(c);save();renderMoments();
}

// 看大图
var moView=document.createElement('div');moView.id='m2View';moView.hidden=true;
document.body.appendChild(moView);
moView.addEventListener('click',function(){moView.hidden=true;moView.innerHTML=''});
function moZoom(src){moView.innerHTML='';var im=document.createElement('img');im.src=src;im.alt='';moView.appendChild(im);moView.hidden=false}

// 一次选好几张图，压小再存
function moPickMany(max,cb){
  var f=document.createElement('input');f.type='file';f.accept='image/*';f.multiple=true;f.hidden=true;
  document.body.appendChild(f);
  f.addEventListener('change',function(){
    var fs=Array.prototype.slice.call(f.files||[],0,max);f.remove();
    if(!fs.length)return;
    Promise.all(fs.map(function(x){return readFileURL(x).then(function(s){return shrinkSafe(s,1000,false,0.76)}).catch(function(){return ''})}))
      .then(function(arr){cb(arr.filter(Boolean))});
  });
  f.click();
}
function newMoment2(priv){
  var w=document.createElement('div'),pics=[];
  w.innerHTML='<div class="field"><textarea id="m2T" placeholder="这一刻的想法…" style="min-height:110px;font-family:var(--serif);font-size:16px;line-height:1.8"></textarea></div>'
    +'<div class="m2-pics" id="m2P"></div>'
    +'<label class="m2-priv"><input type="checkbox" id="m2Pv"'+(priv?' checked':'')+'>私密发表<span>只有你看得到，'+esc(taName())+'也不会来</span></label>'
    +'<button class="primary" id="m2Go" style="width:100%">发 表</button>';
  var box=w.querySelector('#m2P');
  function draw(){
    box.innerHTML=pics.map(function(s,i){return '<div class="m2-pic"><img src="'+esc(s)+'" alt=""><button type="button" data-rm="'+i+'" aria-label="去掉这张">×</button></div>'}).join('')
      +(pics.length<9?'<button type="button" class="m2-pic add" data-add="1" aria-label="加图片">＋</button>':'');
  }
  box.addEventListener('click',function(e){
    var r=e.target.closest('[data-rm]');if(r){pics.splice(+r.dataset.rm,1);draw();return}
    if(e.target.closest('[data-add]'))moPickMany(9-pics.length,function(arr){pics=pics.concat(arr).slice(0,9);draw()});
  });
  w.querySelector('#m2Go').addEventListener('click',function(){
    var t=w.querySelector('#m2T').value.trim();
    if(!t&&!pics.length)return;
    var m={id:uid(),from:'me',text:t,imgs:pics.slice(),priv:w.querySelector('#m2Pv').checked,at:Date.now(),likes:[],comments:[]};
    if(!m.priv)moPlan(m);
    S.moments.push(m);
    if(!save()){S.moments.pop();save();alert('图太多存不下了。少放几张，或者删掉几条旧动态再试。');return}
    closeSheet();renderMoments();updateNav();
  });
  draw();openSheet(priv?'私密发表':'发表',w);
}
newMoment=function(){newMoment2(false)};

function moSignSet(){
  var r=prompt('写一句签名',S.prefs.moSign||'');
  if(r===null)return;
  S.prefs.moSign=r.trim().slice(0,30);save();renderMoments();
}
function moCoverSet(){
  var w=document.createElement('div');
  w.innerHTML='<div class="menu-list set-grp"><button type="button" class="mi" data-c="pick"><b>换封面</b><span>从相册选 ›</span></button>'
    +(S.prefs.moCover?'<button type="button" class="mi" data-c="rm"><b>去掉封面</b><span></span></button>':'')
    +'<button type="button" class="mi" data-c="sign"><b>改签名</b><span>'+esc(S.prefs.moSign||'还没写')+' ›</span></button>'
    +'<button type="button" class="mi" data-c="av"><b>换我的头像</b><span>›</span></button></div>';
  w.addEventListener('click',function(e){
    var b=e.target.closest('[data-c]');if(!b)return;var c=b.dataset.c;
    if(c==='pick')pickImage(function(src){shrinkSafe(src,1200,false,0.8).then(function(u){
      if(!u){alert('这张读不出来，换一张试试。');return}
      var old=S.prefs.moCover;S.prefs.moCover=u;
      if(!save()){S.prefs.moCover=old;save();alert('这张太大存不下，换一张试试。');return}
      closeSheet();renderMoments();
    })});
    if(c==='rm'){S.prefs.moCover='';save();closeSheet();renderMoments()}
    if(c==='sign'){closeSheet();setTimeout(moSignSet,80)}
    if(c==='av'){closeSheet();pickAvatar('me')}
  });
  openSheet('朋友圈封面',w);
}

// 设置 → 聊天 → 朋友圈互动
PAIRS.moMin=['moMax',1];PAIRS.moMax=['moMin',-1];
var _fmtV18=fmtPref;
fmtPref=function(k,v){
  if(k==='moCmtMax')return v+' 条';
  if((k==='moMin'||k==='moMax')&&v===0)return '马上';
  return _fmtV18(k,v);
};
function openMoSet(){
  var w=document.createElement('div');
  w.innerHTML='<div class="sec">你发朋友圈以后</div>'+rr('点赞概率','moLikeRate',0,100)+rr('评论概率','moCmtRate',0,100)+rr('最多评论几条','moCmtMax',1,5)+rr('最快多久来','moMin',0,120)+rr('最慢多久来','moMax',0,720,5)
    +'<div class="sec">你评论以后</div>'+rr('回复你的概率','moReplyRate',0,100)
    +'<p class="hint">动态发出去那一刻就掷好了：赞不赞、评几条、各在什么时候来。时间记在动态上，页面关着也照算，下次打开就到。评论从字卡库里抽，屏蔽的分组和句子不会抽到。私密发表的他看不到，也不会来。</p>'
    +'<button class="ghost" id="moReset" style="width:100%;margin-top:14px">恢复默认</button>';
  var paint=bindRanges(w);
  w.querySelector('#moReset').addEventListener('click',function(){for(var k in MO_DEF)S.prefs[k]=MO_DEF[k];save();paint()});
  openSheet('朋友圈互动',w);
}
SET_GROUPS.forEach(function(g){
  if(g[0]==='聊天'&&!g[1].some(function(i){return i[0]==='openMoSet'}))
    g[1].push(['openMoSet','朋友圈互动',function(){return '赞 '+S.prefs.moLikeRate+'% · 评 '+S.prefs.moCmtRate+'%'}]);
});

var _navV18=updateNav;
updateNav=function(){_navV18();var e=$('sbcMo');if(e&&S.moUnread>0)e.textContent=S.moUnread+' 新'};

moBuild();moTick();renderMoments();updateNav();
