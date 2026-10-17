// 界面：弹层、字卡库页、气泡、设置、纪念日、备份、事件绑定、启动
function openSheet(title,node){
  closeNav();
  sheetTitle.textContent=title;sheetBody.innerHTML='';sheetBody.appendChild(node);sheet.hidden=false;
}
function closeSheet(){sheet.hidden=true}
$('sheetX').addEventListener('click',closeSheet);
sheet.addEventListener('click',function(e){if(e.target===sheet)closeSheet()});
function fillInput(t){
  input.value=t;input.focus();input.style.height='auto';
  input.style.height=Math.min(input.scrollHeight,120)+'px';
}
// 字卡库：侧栏里单独一页。点一句就带去传讯页填进输入框
var LIB={active:'全部',q:'',built:false};
function libItems(){
  return S.lib.filter(function(x){
    if(LIB.active!=='全部'&&x.tag!==LIB.active)return false;
    if(LIB.q&&x.text.toLowerCase().indexOf(LIB.q.toLowerCase())<0)return false;
    return true;
  });
}
function useLine(t){go('chat');fillInput(t)}
function drawLib(){
  var tags=$('libTags'),list=$('libList');
  tags.innerHTML='';
  var all=['全部'],seen={};
  S.lib.forEach(function(x){if(!seen[x.tag]){seen[x.tag]=1;all.push(x.tag)}});
  if(all.indexOf(LIB.active)<0)LIB.active='全部';
  all.forEach(function(tag){
    var b=document.createElement('button');
    b.className='lt'+(tag===LIB.active?' on':'');b.textContent=tag;
    b.addEventListener('click',function(){LIB.active=tag;drawLib()});
    tags.appendChild(b);
  });
  list.innerHTML='';
  var items=libItems();
  if(!items.length){var p=document.createElement('p');p.className='hint';p.textContent='没找到。换个词，或者在下面加一句。';list.appendChild(p)}
  items.forEach(function(x){
    var row=document.createElement('div');row.className='librow';
    var b=document.createElement('button');b.className='li';b.textContent=x.text;
    b.addEventListener('click',function(){useLine(x.text)});
    var rm=document.createElement('button');rm.className='rm';rm.textContent='×';rm.setAttribute('aria-label','删掉这句');
    rm.addEventListener('click',function(ev){ev.stopPropagation();S.lib=S.lib.filter(function(y){return y!==x});save();drawLib();updateNav()});
    row.appendChild(b);row.appendChild(rm);list.appendChild(row);
  });
  $('libCount').textContent=S.lib.length+' 句';
}
function renderLibPage(){
  var box=$('libPage');if(!box)return;
  if(!LIB.built){
    box.innerHTML='<div class="lib-search"><input id="libQ" placeholder="搜一句…"><button id="libRand">随机一句</button></div><div class="lib-tags" id="libTags"></div><div id="libList"></div>'
      +'<div class="field" style="margin-top:16px"><label>加几句（一行一条）</label><textarea id="newLibText" placeholder="第一句&#10;第二句" style="min-height:88px;font-family:var(--serif);font-size:13.5px"></textarea></div>'
      +'<div class="two"><div class="field"><label>归到哪类</label><input id="newLibTag" maxlength="6" placeholder="我的"></div><div class="field" style="display:flex;align-items:flex-end"><button class="ghost" id="addLibBtn" style="width:100%">＋ 收进库</button></div></div>'
      +'<p class="hint">点一句就带去传讯页，填进输入框。× 从库里删掉。顾时夜回你的字卡也从这里抽。</p>';
    $('libQ').addEventListener('input',function(){LIB.q=this.value.trim();drawLib()});
    $('libRand').addEventListener('click',function(){
      var items=libItems();if(!items.length)return;
      useLine(items[Math.floor(Math.random()*items.length)].text);
    });
    $('addLibBtn').addEventListener('click',function(){
      var raw=$('newLibText').value;
      var g=$('newLibTag').value.trim()||'我的';
      var lines=raw.split('\n').map(function(x){return x.trim()}).filter(Boolean);
      if(!lines.length)return;
      lines.forEach(function(t){S.lib.push({tag:g,text:t})});
      save();drawLib();updateNav();
      $('newLibText').value='';
    });
    LIB.built=true;
  }
  drawLib();
}
function openBubble(){
  var wrap=document.createElement('div');
  wrap.innerHTML='<p class="hint" style="margin-top:0">写 CSS 声明就行，会套到字卡上。也可以直接写整段规则（比如 .card.me{...}）。</p><div class="presets"><button data-p="background:rgba(255,255,255,.5);border-radius:18px;box-shadow:0 10px 30px rgba(0,0,0,.1)">玻璃圆泡</button><button data-p="background:var(--solid);border-radius:4px;border:1px solid var(--line)">纸片</button><button data-p="background:transparent;border:1px solid var(--accent);border-radius:0;box-shadow:none">描边</button><button data-p="background:transparent;border:0;box-shadow:none;padding:4px 0;backdrop-filter:none">无框</button><button data-p="border-radius:22px 22px 22px 4px">大圆角</button></div><div class="field"><label>气泡 CSS</label><textarea id="bubbleBox" placeholder="background:#fff;border-radius:20px;" style="min-height:130px"></textarea></div><div class="two"><button class="ghost" id="bubbleReset" style="flex:1">恢复默认</button><button class="primary" id="bubbleApply" style="flex:1">应 用</button></div>';
  openSheet('聊天气泡',wrap);
  var box=wrap.querySelector('#bubbleBox');
  box.value=S.bubbleCSS||'';
  wrap.querySelector('.presets').addEventListener('click',function(e){
    var b=e.target.closest('button');if(b)box.value=b.dataset.p;
  });
  wrap.querySelector('#bubbleApply').addEventListener('click',function(){
    S.bubbleCSS=box.value.trim();save();applyBubbleCSS();closeSheet();
  });
  wrap.querySelector('#bubbleReset').addEventListener('click',function(){
    S.bubbleCSS='';box.value='';save();applyBubbleCSS();
  });
}
// 传讯页顶栏的设置，放在视频通话右边
function openChatSet(){
  var wrap=document.createElement('div');wrap.className='menu-list';
  wrap.innerHTML='<button class="mi" data-c="bubble"><span>聊天气泡</span><span>CSS ›</span></button><button class="mi" data-c="all"><span>名字、头像和外观</span><span>›</span></button>';
  wrap.addEventListener('click',function(e){
    var b=e.target.closest('[data-c]');if(!b)return;
    closeSheet();setTimeout(b.dataset.c==='bubble'?openBubble:openSettings,80);
  });
  openSheet('聊天设置',wrap);
}
(function(){
  var b=document.createElement('button');
  b.className='ico';b.id='btnChatSet';b.setAttribute('aria-label','聊天设置');b.textContent='⚙';
  b.addEventListener('click',openChatSet);
  document.querySelector('.chat-top').appendChild(b);
})();
function openSettings(){
  var wrap=document.createElement('div');
  wrap.innerHTML='<div class="field"><label>材质</label><div class="seg" id="styleSeg"><button data-s="glass">毛玻璃</button><button data-s="solid">纯色</button></div></div><div class="field"><label>配色</label><div class="swatches" id="swWrap"></div></div>';
  wrap.querySelectorAll('#styleSeg button').forEach(function(b){
    b.classList.toggle('on',b.dataset.s===S.style);
    b.addEventListener('click',function(){
      if(S.style!==b.dataset.s)toggleStyle();
      wrap.querySelectorAll('#styleSeg button').forEach(function(x){x.classList.toggle('on',x===b)});
    });
  });
  var sw=wrap.querySelector('#swWrap');
  var themes=[{id:'paper',c:'#efe4d4',dot:'#b07b62'},{id:'night',c:'#17161c',dot:'#c99c8b'},{id:'rose',c:'#f6e3e3',dot:'#b96f74'},{id:'sage',c:'#e4e9df',dot:'#6f8a6d'}];
  themes.forEach(function(t){
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
  var f1=document.createElement('div');f1.className='two';
  f1.innerHTML='<div class="field"><label>我的名字</label><input id="inMeName" maxlength="12"></div><div class="field"><label>没照片时的符号</label><input id="inMeAv" maxlength="4"></div>';
  wrap.appendChild(f1);
  var f2=document.createElement('div');f2.className='two';
  f2.innerHTML='<div class="field"><label>他的名字</label><input id="inTaName" maxlength="12"></div><div class="field"><label>没照片时的符号</label><input id="inTaAv" maxlength="4"></div>';
  wrap.appendChild(f2);
  var ph=document.createElement('div');ph.className='two';ph.style.marginBottom='12px';
  ph.innerHTML='<button class="ghost" data-pick="me" style="flex:1">换我的照片</button><button class="ghost" data-pick="ta" style="flex:1">换他的照片</button>';
  wrap.appendChild(ph);
  var btn=document.createElement('button');btn.className='primary';btn.textContent='收 好';btn.style.width='100%';
  btn.addEventListener('click',function(){
    S.me.name=(wrap.querySelector('#inMeName').value||'我').trim().slice(0,12);
    S.me.avatar=(wrap.querySelector('#inMeAv').value||'🌙').trim().slice(0,4);
    S.ta.name=(wrap.querySelector('#inTaName').value||TA_NAME).trim().slice(0,12);
    S.ta.avatar=(wrap.querySelector('#inTaAv').value||'✦').trim().slice(0,4);
    save();paintNames();renderHome();renderChat();closeSheet();
  });
  wrap.appendChild(btn);
  var row2=document.createElement('div');row2.className='two';row2.style.marginTop='10px';
  row2.innerHTML='<button class="ghost" id="btnDays" style="flex:1">纪念日</button><button class="ghost" id="btnBubble2" style="flex:1">聊天气泡</button>';
  wrap.appendChild(row2);
  row2.querySelector('#btnDays').addEventListener('click',function(){closeSheet();setTimeout(openDays,80)});
  row2.querySelector('#btnBubble2').addEventListener('click',function(){closeSheet();setTimeout(openBubble,80)});
  var menu=document.createElement('div');menu.className='menu-list';menu.style.marginTop='14px';
  menu.innerHTML='<button class="mi" data-s="noimg"><span>照片换回符号</span><span>两个都换</span></button><button class="mi" data-s="export"><span>导出备份</span><span>json</span></button><button class="mi" data-s="import"><span>导入备份</span><span></span></button><button class="mi" data-s="clear"><span>全部清空</span><span></span></button>';
  wrap.appendChild(menu);
  menu.addEventListener('click',function(e){
    var b=e.target.closest('[data-s]');if(!b)return;
    if(b.dataset.s==='noimg'){if(confirm('把两张照片都去掉？')){S.me.img='';S.ta.img='';save();paintNames();renderMoments()}}
    if(b.dataset.s==='export')exportData();
    if(b.dataset.s==='import')$('fileIn').click();
    if(b.dataset.s==='clear'){
      if(confirm('清空所有字卡、动态、信件和抽牌记录？')){
        if(confirm('真的清？不能撤回。')){localStorage.removeItem(KEY);location.reload()}
      }
    }
  });
  wrap.querySelector('#inMeName').value=S.me.name;
  wrap.querySelector('#inMeAv').value=S.me.avatar;
  wrap.querySelector('#inTaName').value=S.ta.name;
  wrap.querySelector('#inTaAv').value=S.ta.avatar;
  openSheet('设置',wrap);
}
function openDays(){
  var wrap=document.createElement('div');
  var list=document.createElement('div');
  function drawDays(){
    list.innerHTML='';
    if(!S.days.length){var p=document.createElement('p');p.className='hint';p.textContent='还没有日子。加一个开始的那天，主页就会一直数着。';list.appendChild(p)}
    S.days.forEach(function(d){
      var row=document.createElement('div');row.className='day';
      var left=document.createElement('div');
      var n=dayDiff(d.date);
      left.innerHTML=esc(d.title)+'<span class="d">'+esc(d.date)+'</span>';
      var right=document.createElement('div');right.style.display='flex';right.style.alignItems='center';
      var t=document.createElement('span');t.className='t';
      t.textContent=n===null?'—':(n>=0?'第 '+(n+1)+' 天':'还有 '+(-n)+' 天');
      var x=document.createElement('button');x.textContent='删';
      x.addEventListener('click',function(){S.days=S.days.filter(function(y){return y.id!==d.id});save();drawDays();renderHome();updateNav()});
      right.appendChild(t);right.appendChild(x);
      row.appendChild(left);row.appendChild(right);list.appendChild(row);
    });
  }
  var f=document.createElement('div');f.className='two';
  f.innerHTML='<div class="field" style="flex:1.4"><label>名字</label><input id="dTitle" maxlength="16" placeholder="在一起"></div><div class="field"><label>那天</label><input id="dDate" type="date"></div>';
  wrap.appendChild(f);
  var add=document.createElement('button');add.className='ghost';add.textContent='＋ 记一个日子';add.style.marginBottom='14px';
  add.addEventListener('click',function(){
    var t=wrap.querySelector('#dTitle').value.trim();
    var d=wrap.querySelector('#dDate').value;
    if(!t||!d){alert('名字和日期都填一下。');return}
    S.days.push({id:uid(),title:t,date:d});save();drawDays();renderHome();updateNav();wrap.querySelector('#dTitle').value='';
  });
  wrap.appendChild(add);wrap.appendChild(list);drawDays();
  openSheet('纪念日',wrap);
}
function exportData(){
  var blob=new Blob([JSON.stringify(S,null,2)],{type:'application/json'});
  var a=document.createElement('a');var d=new Date();
  a.href=URL.createObjectURL(blob);
  a.download='字卡-'+d.getFullYear()+pad(d.getMonth()+1)+pad(d.getDate())+'.json';
  document.body.appendChild(a);a.click();
  setTimeout(function(){URL.revokeObjectURL(a.href);a.remove()},1000);
}
$('fileIn').addEventListener('change',function(e){
  var f=e.target.files&&e.target.files[0];if(!f)return;
  var fr=new FileReader();
  fr.onload=function(){
    try{
      var d=JSON.parse(fr.result);
      if(!d||!Array.isArray(d.cards))throw new Error('bad');
      if(!confirm('导入会覆盖现在的数据，确定？'))return;
      S=Object.assign(defaults(),d);S.from='me';S.autoReply=true;
      save();applySkin();applyBubbleCSS();paintNames();paintStyleBtns();renderHome();renderChat();renderMoments();renderMail();renderDraws();
      if(LIB.built)drawLib();
      alert('回来了。');
    }catch(err){alert('这个文件读不出来。')}
  };
  fr.readAsText(f);e.target.value='';
});
// 按钮
$('btnSend').addEventListener('click',function(){send()});
$('btnSet').addEventListener('click',openSettings);
$('btnStyle').addEventListener('click',toggleStyle);
$('btnDraw').addEventListener('click',draw);
$('rClose').addEventListener('click',closeReader);
$('rDel').addEventListener('click',function(){
  if(!currentMail)return;
  if(confirm('撕掉这封信？')){S.mails=S.mails.filter(function(x){return x.id!==currentMail.id});save();closeReader();renderMail()}
});
$('rReply').addEventListener('click',function(){
  if(!currentMail)return;
  var pre={from:currentMail.from==='me'?'ta':'me',title:'回：'+currentMail.title};
  closeReader();setTimeout(function(){newMail(pre)},120);
});
reader.addEventListener('click',function(e){if(e.target===reader)closeReader()});
// 侧栏
$('navBtn').addEventListener('click',openNav);
$('navMask').addEventListener('click',closeNav);
$('sbClose').addEventListener('click',closeNav);
$('sbStyle').addEventListener('click',toggleStyle);
$('sbSet').addEventListener('click',function(){closeNav();setTimeout(openSettings,180)});
$('tabbar').addEventListener('click',function(e){
  var b=e.target.closest('.tab');if(!b)return;
  go(b.dataset.view);closeNav();
});
document.addEventListener('keydown',function(e){if(e.key==='Escape')closeNav()});
(function(){
  var sx=0,sy=0,mode=null;
  document.addEventListener('touchstart',function(e){
    var t=e.touches[0];sx=t.clientX;sy=t.clientY;
    if(document.body.classList.contains('nav-open'))mode='close';
    else mode=(sx<22&&sheet.hidden&&reader.hidden)?'open':null;
  },{passive:true});
  document.addEventListener('touchend',function(e){
    if(!mode)return;
    var t=e.changedTouches[0],dx=t.clientX-sx,dy=Math.abs(t.clientY-sy);
    if(dy<60){if(mode==='open'&&dx>50)openNav();if(mode==='close'&&dx<-50)closeNav()}
    mode=null;
  },{passive:true});
})();
// 全局点击
document.addEventListener('click',function(e){
  var pk=e.target.closest('[data-pick]');if(pk){pickAvatar(pk.dataset.pick);return}
  var g=e.target.closest('[data-go]');if(g){go(g.dataset.go);return}
  var a=e.target.closest('[data-act]');if(!a)return;
  var act=a.dataset.act,id=a.dataset.id;
  if(act==='settings')openSettings();
  if(act==='newMoment')newMoment();
  if(act==='newMail')newMail();
  if(act==='openMail')openMail(id);
  if(act==='delMo'){if(confirm('删掉这条动态？')){S.moments=S.moments.filter(function(x){return x.id!==id});save();renderMoments()}}
  if(act==='like'){
    var m=null;for(var i=0;i<S.moments.length;i++)if(S.moments[i].id===id)m=S.moments[i];
    if(!m)return;m.likes=m.likes||[];
    var k=m.likes.indexOf('me');if(k>=0)m.likes.splice(k,1);else m.likes.push('me');
    save();renderMoments();
  }
  if(act==='comment'){
    var mo=null;for(var j=0;j<S.moments.length;j++)if(S.moments[j].id===id)mo=S.moments[j];
    if(!mo)return;
    var art=document.querySelector('[data-mo="'+id+'"]');
    if(!art)return;
    var old=art.querySelector('.mo-cbox');
    if(old){old.remove();return}
    var box=document.createElement('div');box.className='mo-cbox';
    box.innerHTML='<button data-who="me" class="on">'+esc(S.me.name)+'</button><button data-who="ta">'+esc(S.ta.name)+'</button><input placeholder="说一句…"><button data-send="1">发</button>';
    art.querySelector('.mo-main').appendChild(box);
    var who='me';
    box.addEventListener('click',function(ev){
      var b=ev.target.closest('button');if(!b)return;
      if(b.dataset.who){
        who=b.dataset.who;
        box.querySelectorAll('[data-who]').forEach(function(x){x.classList.toggle('on',x===b)});
      }
      if(b.dataset.send){
        var val=box.querySelector('input').value.trim();
        if(!val)return;
        mo.comments=mo.comments||[];
        mo.comments.push({id:uid(),from:who,text:val,at:Date.now()});
        save();renderMoments();
      }
    });
    box.querySelector('input').focus();
  }
});
input.addEventListener('input',function(){
  input.style.height='auto';
  input.style.height=Math.min(input.scrollHeight,120)+'px';
});
input.addEventListener('keydown',function(e){
  if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();send()}
});
// 启动
applySkin();applyBubbleCSS();paintNames();paintStyleBtns();
go('home');renderChat();splash();
window.addEventListener('beforeunload',save);
