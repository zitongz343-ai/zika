// 字卡传讯 · 字卡库：主字卡（按分组）和氛围感（拍一拍、对方状态、每日一句）
// 搜索、筛选、批量选择、批量添加、编辑、换分组、分组管理。导入导出在 data.js
'use strict';
var LB_COLORS=['#38D9A9','#5C7CFA','#F06595','#748FFC','#FFC542','#CC5DE8','#F783AC','#FF8E53','#868E96'];
var ATMO=[['拍一拍','拍一拍'],['状态','对方状态'],['每日一句','每日一句']];
var ATMO_TAGS=ATMO.map(function(a){return a[0]});
var L4={tab:'main',sub:'拍一拍',q:'',search:false,show:'all',group:'all',batch:false,sel:{},open:{}},LIB_BUILT=false;

function cleanTag(t){return String(t||'').trim().slice(0,8)||'未分组'}
function itemText(t){if(t&&typeof t==='object')t=t.text||t.content||'';return String(t||'').trim()}
function isAtmo(t){return ATMO_TAGS.indexOf(t)>=0}
function atmoName(t){for(var i=0;i<ATMO.length;i++)if(ATMO[i][0]===t)return ATMO[i][1];return t}
// 分组：库里有的 + 新建了还空着的，按 libOrder 排
function libTags(){
  var cnt={},order=[];
  S.lib.forEach(function(x){if(cnt[x.tag]===undefined){cnt[x.tag]=0;order.push(x.tag)}cnt[x.tag]++});
  S.libEmpty.forEach(function(t){if(cnt[t]===undefined){cnt[t]=0;order.push(t)}});
  var od=S.libOrder;
  return order.map(function(t,i){var k=od.indexOf(t);return{tag:t,n:cnt[t],k:k<0?1e6+i:k}}).sort(function(a,b){return a.k-b.k});
}
function mainTags(){return libTags().filter(function(g){return !isAtmo(g.tag)})}
function lbColor(t){
  if(S.libColors[t])return S.libColors[t];
  if(t==='未分组')return '#868E96';
  var i=libTags().map(function(g){return g.tag}).indexOf(t);
  return LB_COLORS[(i<0?0:i)%8];
}
function lbUnempty(t){S.libEmpty=S.libEmpty.filter(function(n){return n!==t})}
// 句子挪走或删光了，分组本身留着
function lbKeep(tags){tags.forEach(function(t){if(!S.lib.some(function(x){return x.tag===t})&&S.libEmpty.indexOf(t)<0)S.libEmpty.push(t)})}
function lbDropTag(t){S.libOff=S.libOff.filter(function(x){return x!==t});lbUnempty(t);delete S.libColors[t];S.libOrder=S.libOrder.filter(function(x){return x!==t})}
function lbRename(o,n){
  var wasOff=S.libOff.indexOf(o)>=0,wasEmpty=S.libEmpty.indexOf(o)>=0;
  S.lib.forEach(function(x){if(x.tag===o)x.tag=n});
  if(S.libColors[o]&&!S.libColors[n])S.libColors[n]=S.libColors[o];
  S.libOrder=S.libOrder.map(function(x){return x===o?n:x});
  lbDropTag(o);
  if(wasOff&&S.libOff.indexOf(n)<0)S.libOff.push(n);
  if(wasEmpty)lbKeep([n]);
  if(L4.group===o)L4.group=n;
  if(L4.open[o]){L4.open[n]=true;delete L4.open[o]}
}
function refreshLib(){
  save();if(LIB_BUILT)drawLib();updateNav();
  if(curView()==='home')renderHome();
  if(typeof stCheck==='function')stCheck();
}
function askTag(cb){
  var r=prompt('新分组叫什么？');if(r===null||!r.trim())return;
  var n=cleanTag(r);
  if(isAtmo(n)){alert('「'+n+'」是氛围感专用的名字，换一个吧。');return}
  cb(n);
}

var L4P={
  search:'<circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/>',
  folder:'<path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>',
  filter:'<path d="M4 7h16M7 12h10M10 17h4"/>',
  grid:'<rect x="4" y="4" width="6.5" height="6.5" rx="1.5"/><rect x="13.5" y="4" width="6.5" height="6.5" rx="1.5"/><rect x="4" y="13.5" width="6.5" height="6.5" rx="1.5"/><rect x="13.5" y="13.5" width="6.5" height="6.5" rx="1.5"/>',
  imp:'<path d="M12 4v11M7 10l5 5 5-5M5 20h14"/>',
  exp:'<path d="M12 20V9M7 14l5-5 5 5M5 4h14"/>',
  eyeoff:'<path d="M3 3l18 18M10.6 6.2A9.6 9.6 0 0 1 12 6c5 0 8.5 4.5 9 6-.3.9-1.2 2.4-2.6 3.7M6.4 7.6C4.6 8.9 3.4 10.7 3 12c.5 1.5 4 6 9 6 1.6 0 3-.4 4.2-1.1M9.9 9.9a3 3 0 0 0 4.2 4.2"/>',
  eye:'<path d="M3 12c.5-1.5 4-6 9-6s8.5 4.5 9 6c-.5 1.5-4 6-9 6s-8.5-4.5-9-6z"/><circle cx="12" cy="12" r="3"/>',
  tag:'<path d="M3 12V4a1 1 0 0 1 1-1h8l9 9-9 9z"/><circle cx="7.5" cy="7.5" r="1.3"/>',
  pen:'<path d="M4 20h4L19 9l-4-4L4 16z"/><path d="M13.5 6.5l4 4"/>',
  trash:'<path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"/>',
  down:'<path d="M6 9l6 6 6-6"/>',
  plus:'<path d="M12 5v14M5 12h14"/>'
};
function ic(k){return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+L4P[k]+'</svg>'}

function l4Scope(){return S.lib.filter(function(x){return L4.tab==='main'?!isAtmo(x.tag):x.tag===L4.sub})}
function l4Items(){
  var q=L4.q.toLowerCase();
  return l4Scope().filter(function(x){
    if(L4.tab==='main'&&L4.group!=='all'&&x.tag!==L4.group)return false;
    if(L4.show==='on'&&lineOff(x))return false;
    if(L4.show==='off'&&!lineOff(x))return false;
    if(q&&x.text.toLowerCase().indexOf(q)<0)return false;
    return true;
  });
}
function l4SelList(){return S.lib.filter(function(x){return L4.sel[x.id]})}

// 选分组的下拉框，最后一项是新建
function l4GroupSelect(cur){
  var tags=mainTags().map(function(g){return g.tag});
  if(cur&&tags.indexOf(cur)<0)tags.push(cur);
  if(!tags.length)tags.push('未分组');
  var s=document.createElement('select');s.className='l4-sel';
  function opt(v,t){var o=document.createElement('option');o.value=v;o.textContent=t;return o}
  tags.forEach(function(t){s.appendChild(opt(t,t))});
  s.appendChild(opt('__new','＋ 新建分组…'));
  s.value=cur&&tags.indexOf(cur)>=0?cur:tags[0];s.dataset.prev=s.value;
  s.addEventListener('change',function(){
    if(s.value!=='__new'){s.dataset.prev=s.value;return}
    s.value=s.dataset.prev;
    askTag(function(n){
      if(!Array.prototype.some.call(s.options,function(o){return o.value===n}))s.insertBefore(opt(n,n),s.lastElementChild);
      s.value=n;s.dataset.prev=n;
    });
  });
  return s;
}
function growRow(label){var d=document.createElement('div');d.className='l4-grow';d.innerHTML=ic('folder')+'<span>'+label+'</span>';return d}

// 批量添加：每行一条，自动去重
function l4AddSheet(){
  var atmo=L4.tab==='atmo';
  var cur=atmo?L4.sub:(L4.group!=='all'?L4.group:((mainTags()[0]||{}).tag||'未分组'));
  var w=document.createElement('div');
  w.innerHTML='<p class="hint" style="margin:0 0 12px">每行一条，自动去重</p>'
    +'<label class="l4-swrow"><span>换行作为新条目</span><input type="checkbox" id="l4Split" checked><i class="l4-tg"></i></label>'
    +'<textarea id="l4Txt" class="l4-ta" placeholder="在此粘贴内容，每行一条…"></textarea><div class="l4-cnt" id="l4Cnt">0 条</div>'
    +(atmo?'<p class="hint" style="margin:0 0 14px">加到「'+esc(atmoName(cur))+'」</p>':'')
    +'<div class="two"><button type="button" class="ghost" id="l4No" style="flex:1">取消</button><button type="button" class="primary" id="l4Ok" style="flex:1.6">添加</button></div>';
  var sel=null;
  if(!atmo){var g=growRow('添加到分组');sel=l4GroupSelect(cur);g.appendChild(sel);w.insertBefore(g,w.querySelector('.two'))}
  var ta=w.querySelector('#l4Txt'),sp=w.querySelector('#l4Split'),cnt=w.querySelector('#l4Cnt');
  function lines(){
    var v=ta.value,arr=sp.checked?v.split('\n').map(function(s){return s.trim()}):[v.trim()];
    return uniqArr(arr.filter(Boolean));
  }
  function paint(){cnt.textContent=lines().length+' 条'}
  ta.addEventListener('input',paint);sp.addEventListener('change',paint);
  w.querySelector('#l4No').addEventListener('click',closeSheet);
  w.querySelector('#l4Ok').addEventListener('click',function(){
    var ls=lines();if(!ls.length)return;
    var tag=atmo?cur:sel.value;if(!tag||tag==='__new')tag='未分组';
    var have={},add=0;
    S.lib.forEach(function(x){if(x.tag===tag)have[x.text]=1});
    ls.forEach(function(t){if(have[t])return;have[t]=1;S.lib.push({id:uid(),tag:tag,text:t});add++});
    lbUnempty(tag);if(!atmo)L4.open[tag]=true;
    refreshLib();closeSheet();
    if(add<ls.length)alert('加进去 '+add+' 条，另外 '+(ls.length-add)+' 条这组里本来就有。');
  });
  openSheet(atmo?'批量添加'+atmoName(cur):'批量添加字卡',w);
  setTimeout(function(){ta.focus()},60);
}
function l4EditSheet(x){
  var main=!isAtmo(x.tag),w=document.createElement('div');
  w.innerHTML='<textarea id="l4Et" class="l4-ta" style="min-height:120px"></textarea><button type="button" class="primary" id="l4EOk" style="width:100%;margin-top:12px">收 好</button>';
  w.querySelector('#l4Et').value=x.text;
  var sel=null;
  if(main){var g=growRow('分组');g.style.marginTop='12px';sel=l4GroupSelect(x.tag);g.appendChild(sel);w.insertBefore(g,w.querySelector('#l4EOk'))}
  w.querySelector('#l4EOk').addEventListener('click',function(){
    var t=w.querySelector('#l4Et').value.trim();if(!t)return;
    var old=x.tag;x.text=t;
    if(sel&&sel.value&&sel.value!=='__new')x.tag=sel.value;
    lbUnempty(x.tag);lbKeep([old]);refreshLib();closeSheet();
  });
  openSheet('编辑',w);
}
function l4MoveSheet(list){
  var w=document.createElement('div');
  w.innerHTML='<p class="hint" style="margin:0 0 12px">把 '+list.length+' 条挪到：</p><button type="button" class="primary" id="l4MOk" style="width:100%">挪 过 去</button>';
  var g=growRow('分组'),sel=l4GroupSelect(list[0].tag);g.appendChild(sel);w.insertBefore(g,w.querySelector('#l4MOk'));
  w.querySelector('#l4MOk').addEventListener('click',function(){
    var tag=sel.value;if(!tag||tag==='__new')return;
    var old=uniqArr(list.map(function(x){return x.tag}));
    list.forEach(function(x){x.tag=tag});
    lbUnempty(tag);lbKeep(old);L4.sel={};L4.open[tag]=true;refreshLib();closeSheet();
  });
  openSheet('移到分组',w);
}

// 一个分组的操作：改名、屏蔽、换颜色、删。done 是做完以后回到哪
function l4GroupMenu(tag,done){
  done=done||closeSheet;
  var g=libTags().filter(function(x){return x.tag===tag})[0];if(!g)return;
  var off=S.libOff.indexOf(tag)>=0,c=lbColor(tag),w=document.createElement('div');
  w.innerHTML='<div class="menu-list set-grp">'
    +'<button type="button" class="mi" data-m="rn"><b>改名</b><span>'+esc(tag)+' ›</span></button>'
    +'<button type="button" class="mi" data-m="tg"><b>'+(off?'取消屏蔽':'屏蔽这组')+'</b><span>'+(off?'':esc(taName())+'不从这组抽')+'</span></button>'
    +'<button type="button" class="mi" data-m="up"><b>往前挪</b><span>排在前一组前面</span></button>'
    +'<button type="button" class="mi" data-m="col"><b>换颜色</b><span><i class="l4-dot" style="background:'+esc(c)+'"></i></span></button>'
    +'<div class="lb-colors" hidden></div>'
    +'<button type="button" class="mi" data-m="rm"><b class="lb-danger">删掉分组</b><span>'+(tag==='未分组'?'连句子一起删':'句子挪到未分组')+'</span></button></div>';
  var cols=w.querySelector('.lb-colors');
  LB_COLORS.forEach(function(col){
    var b=document.createElement('button');b.type='button';b.style.background=col;b.dataset.col=col;
    if(col.toLowerCase()===String(c).toLowerCase())b.className='on';
    cols.appendChild(b);
  });
  w.addEventListener('click',function(e){
    var cb=e.target.closest('[data-col]');
    if(cb){S.libColors[tag]=cb.dataset.col;refreshLib();done();return}
    var b=e.target.closest('[data-m]');if(!b)return;var m=b.dataset.m;
    if(m==='col'){cols.hidden=!cols.hidden;return}
    if(m==='tg'){if(off)S.libOff=S.libOff.filter(function(t){return t!==tag});else S.libOff.push(tag);refreshLib();done();return}
    if(m==='up'){
      var ts=mainTags().map(function(x){return x.tag}),i=ts.indexOf(tag);
      if(i>0){ts[i]=ts[i-1];ts[i-1]=tag;S.libOrder=ts}
      refreshLib();done();return;
    }
    if(m==='rn'){
      var r=prompt('改成什么？',tag);if(r===null||!r.trim())return;
      var nn=cleanTag(r);if(nn===tag)return;
      if(isAtmo(nn)){alert('「'+nn+'」是氛围感专用的名字，换一个吧。');return}
      lbRename(tag,nn);refreshLib();done();return;
    }
    if(m==='rm'){
      if(tag==='未分组'){
        if(g.n&&!confirm('删掉「未分组」里的 '+g.n+' 句？'))return;
        S.lib=S.lib.filter(function(x){return x.tag!=='未分组'});
      }else{
        if(!confirm('删掉分组「'+tag+'」？'+(g.n?'里面的 '+g.n+' 句挪到「未分组」。':'')))return;
        S.lib.forEach(function(x){if(x.tag===tag)x.tag='未分组'});
      }
      lbDropTag(tag);if(L4.group===tag)L4.group='all';
      refreshLib();done();
    }
  });
  openSheet('分组 · '+tag,w);
}
// 管理分组。从设置里进来时 back 是回设置
function l4GroupsSheet(back){
  var w=document.createElement('div');
  function again(){l4GroupsSheet(back)}
  var tags=mainTags();
  w.innerHTML=(tags.length?'<div class="menu-list set-grp">'+tags.map(function(g){
      var off=S.libOff.indexOf(g.tag)>=0;
      return '<button type="button" class="mi" data-g="'+esc(g.tag)+'"><b><i class="l4-dot" style="background:'+esc(lbColor(g.tag))+'"></i>'+esc(g.tag)+'</b><span>'+(off?'已屏蔽 · ':'')+g.n+' 条 ›</span></button>';
    }).join('')+'</div>':'<p class="hint">还没有分组。</p>')
    +'<button type="button" class="ghost" data-new="1" style="width:100%;margin-top:12px">＋ 新建分组</button>'
    +'<p class="hint">点一组可以改名、换颜色、往前挪、屏蔽或删掉。屏蔽的分组还在，只是'+esc(taName())+'回字卡时不从里面抽。</p>';
  w.addEventListener('click',function(e){
    var g=e.target.closest('[data-g]');if(g){l4GroupMenu(g.dataset.g,again);return}
    if(e.target.closest('[data-new]'))askTag(function(n){
      if(!libTags().some(function(x){return x.tag===n}))S.libEmpty.push(n);
      refreshLib();again();
    });
  });
  if(back)subPage('字卡分组',w,back);else openSheet('管理分组',w);
}
function l4Dedup(){
  var scope=l4Scope(),seen={},drop={},n=0;
  scope.forEach(function(x){if(seen[x.text]){drop[x.id]=1;n++}else seen[x.text]=1});
  closeSheet();
  if(!n){alert('没有重复的。');return}
  if(!confirm('找到 '+n+' 句重复的，同一句只留第一条？'))return;
  var tags=uniqArr(scope.map(function(x){return x.tag}));
  S.lib=S.lib.filter(function(x){return !drop[x.id]});lbKeep(tags);refreshLib();
  alert('删掉了 '+n+' 句重复的。');
}
function l4FilterSheet(){
  var rows=[['all','显示全部'],['on','只看在用的'],['off','只看屏蔽的']],w=document.createElement('div');
  w.innerHTML='<div class="menu-list set-grp">'+rows.map(function(r){return '<button type="button" class="mi" data-s="'+r[0]+'"><b>'+r[1]+'</b><span>'+(L4.show===r[0]?'✓':'')+'</span></button>'}).join('')+'</div>'
    +'<div class="menu-list set-grp" style="margin-top:12px"><button type="button" class="mi" data-s="dedup"><b>去重</b><span>同一句只留一条 ›</span></button></div>';
  w.addEventListener('click',function(e){
    var b=e.target.closest('[data-s]');if(!b)return;
    if(b.dataset.s==='dedup'){l4Dedup();return}
    L4.show=b.dataset.s;closeSheet();drawLib();
  });
  openSheet('筛选',w);
}

// ── 一句和一组 ──
function l4CardEl(x,badge){
  var d=document.createElement('div'),off=lineOff(x);
  d.className='l4-card'+(off?' off':'')+(L4.sel[x.id]?' sel':'');
  var h=(L4.batch?'<span class="l4-chk">'+(L4.sel[x.id]?'✓':'')+'</span>':'')+'<div class="t"><span class="tx"></span>'+(badge?'<span class="l4-bdg"><i></i><em></em></span>':'')+'</div>';
  if(!L4.batch){
    h+='<div class="l4-ops"><button type="button" data-op="off" aria-label="'+(x.off?'取消屏蔽':'屏蔽')+'">'+ic(x.off?'eye':'eyeoff')+'</button>'
      +(isAtmo(x.tag)?'':'<button type="button" data-op="tag" aria-label="换分组">'+ic('tag')+'</button>')
      +'<button type="button" data-op="ed" aria-label="编辑">'+ic('pen')+'</button><button type="button" data-op="rm" aria-label="删除">'+ic('trash')+'</button></div>';
  }
  d.innerHTML=h;
  d.querySelector('.tx').textContent=x.text;
  if(badge){
    var c=lbColor(x.tag),bd=d.querySelector('.l4-bdg');
    bd.style.color=c;bd.style.borderColor=c+'40';bd.style.background=c+'18';
    bd.querySelector('i').style.background=c;bd.querySelector('em').textContent=x.tag;
  }
  d.addEventListener('click',function(e){
    var b=e.target.closest('[data-op]');
    if(b){
      e.stopPropagation();var op=b.dataset.op;
      if(op==='off'){x.off=!x.off;refreshLib();return}
      if(op==='tag'){l4MoveSheet([x]);return}
      if(op==='ed'){l4EditSheet(x);return}
      if(op==='rm'&&confirm('删掉这句？')){S.lib=S.lib.filter(function(y){return y!==x});lbKeep([x.tag]);refreshLib()}
      return;
    }
    if(L4.batch){if(L4.sel[x.id])delete L4.sel[x.id];else L4.sel[x.id]=1;drawLib();return}
    if(isAtmo(x.tag))l4EditSheet(x);else useLine(x.text);
  });
  return d;
}
function l4GroupEl(g,its){
  var c=lbColor(g.tag),off=S.libOff.indexOf(g.tag)>=0,open=!!L4.open[g.tag];
  var sec=document.createElement('div');sec.className='l4-grp'+(off?' off':'')+(open?' open':'');
  var hd=document.createElement('div');hd.className='l4-gh';
  var allSel=its.length&&its.every(function(x){return L4.sel[x.id]});
  hd.innerHTML='<i></i><b></b><span class="c">'+its.length+' 条</span>'+(off?'<span class="l4-offtag">已屏蔽</span>':'')+'<span class="sp"></span>'
    +(L4.batch&&its.length?'<button type="button" class="l4-mini" data-ga="sel">'+(allSel?'取消本组':'全选本组')+'</button>':'')
    +'<button type="button" class="l4-ib sm" data-ga="ed" aria-label="编辑分组">'+ic('pen')+'</button><span class="arr">'+ic('down')+'</span>';
  hd.querySelector('i').style.background=c;
  var b=hd.querySelector('b');b.style.color=c;b.textContent=g.tag;
  hd.addEventListener('click',function(e){
    var a=e.target.closest('[data-ga]');
    if(a&&a.dataset.ga==='ed'){l4GroupMenu(g.tag);return}
    if(a&&a.dataset.ga==='sel'){its.forEach(function(x){if(allSel)delete L4.sel[x.id];else L4.sel[x.id]=1});drawLib();return}
    L4.open[g.tag]=!L4.open[g.tag];drawLib();
  });
  sec.appendChild(hd);
  if(open){
    var cs=document.createElement('div');cs.className='l4-cards';
    if(!its.length)cs.innerHTML='<p class="hint" style="margin:0 0 8px 4px">这组还没有字卡。</p>';
    its.forEach(function(x){cs.appendChild(l4CardEl(x,false))});
    sec.appendChild(cs);
  }
  return sec;
}
var L4_HINT={'拍一拍':'他拍你的时候从这里抽，显示成「NAME 拍了拍我…」。开头不用写名字。','状态':'传讯页名字旁边的小标签从这里抽，1 到 8 小时换一次。','每日一句':'主页「今日一句」每天从这里挑一句。这里空着的话就从主字卡里挑。'};

// 底下的「新增」和批量操作栏挂在 body 上，钉在屏幕底部，字卡不会从下面露出来
var l4Foot=document.createElement('div');l4Foot.id='l4Foot';document.body.appendChild(l4Foot);
l4Foot.addEventListener('click',function(e){var b=e.target.closest('[data-b]');if(b)l4BarClick(b.dataset.b)});
document.addEventListener('focusin',function(e){if(e.target&&e.target.matches&&e.target.matches('input,textarea'))document.body.classList.add('typing')});
document.addEventListener('focusout',function(){document.body.classList.remove('typing')});

function drawLib(){
  var box=$('libPage');if(!box||!$('l4List'))return;
  var main=L4.tab==='main';
  box.querySelectorAll('#l4Seg [data-t]').forEach(function(b){b.classList.toggle('on',b.dataset.t===L4.tab)});
  var sub=$('l4Sub');sub.hidden=main;
  if(!main)sub.innerHTML=ATMO.map(function(a){
    var n=S.lib.filter(function(x){return x.tag===a[0]}).length;
    return '<button type="button" class="lb-pill'+(L4.sub===a[0]?' on':'')+'" data-sub="'+esc(a[0])+'">'+esc(a[1])+' <em>'+n+'</em></button>';
  }).join('');
  box.querySelector('[data-a="grp"]').hidden=!main;
  box.querySelector('[data-a="search"]').classList.toggle('on',L4.search);
  box.querySelector('[data-a="filter"]').classList.toggle('on',L4.show!=='all');
  box.querySelector('[data-a="batch"]').classList.toggle('on',L4.batch);
  $('l4S').hidden=!L4.search;
  var pills=$('l4Pills'),tags=mainTags();pills.hidden=!main;
  if(L4.group!=='all'&&!tags.some(function(g){return g.tag===L4.group}))L4.group='all';
  if(main){
    var total=S.lib.filter(function(x){return !isAtmo(x.tag)}).length;
    pills.innerHTML='<button type="button" class="lb-pill'+(L4.group==='all'?' on':'')+'" data-g="all">全部 <em>'+total+'</em></button>'+tags.map(function(g){
      var c=esc(lbColor(g.tag)),on=L4.group===g.tag,off=S.libOff.indexOf(g.tag)>=0;
      return '<button type="button" class="lb-pill'+(on?' on':'')+(off?' off':'')+'" data-g="'+esc(g.tag)+'"'+(on?' style="background:'+c+';border-color:'+c+'"':'')+'><i style="background:'+(on?'#fff':c)+'"></i>'+esc(g.tag)+' <em>'+g.n+'</em></button>';
    }).join('');
  }
  var items=l4Items(),list=$('l4List');list.innerHTML='';
  if(main&&L4.group==='all'&&!L4.q&&L4.show==='all'){
    if(!tags.length)list.innerHTML=emptyBox('主字卡是空的','点下面「新增」加几句，<br>或者导入一个字卡包。');
    tags.forEach(function(g){list.appendChild(l4GroupEl(g,items.filter(function(x){return x.tag===g.tag})))});
  }else if(!items.length){
    list.innerHTML=L4.q?emptyBox('没找到','换个词试试。'):(L4.show!=='all'?emptyBox('这里没有','换个筛选看看。'):emptyBox('这里还空着','点下面「新增」加几句。'));
  }else{
    var cap=300;
    items.slice(0,cap).forEach(function(x){list.appendChild(l4CardEl(x,main&&L4.group==='all'))});
    if(items.length>cap){var p=document.createElement('p');p.className='hint l4-hint';p.textContent='还有 '+(items.length-cap)+' 句没列出来，搜一下更快找到。';list.appendChild(p)}
  }
  if(!main&&L4_HINT[L4.sub]){var h=document.createElement('p');h.className='hint l4-hint';h.textContent=L4_HINT[L4.sub].replace('NAME',taName());list.appendChild(h)}
  if(L4.batch){
    l4Foot.innerHTML='<div class="l4-bar"><span>已选 '+l4SelList().length+' 条</span><button type="button" class="ghost" data-b="all">全选</button>'+(main?'<button type="button" class="ghost" data-b="mv">移到分组</button>':'')+'<button type="button" class="ghost" data-b="off">屏蔽</button><button type="button" class="ghost" data-b="on">取消屏蔽</button><button type="button" class="ghost" data-b="rm">删除</button><button type="button" class="primary" data-b="done">完成</button></div>';
  }else l4Foot.innerHTML='<button type="button" class="primary l4-new" data-b="new">'+ic('plus')+'新 增</button>';
  txt('libCount',l4Scope().length+' 句');
}
function l4BarClick(a){
  if(a==='new'){l4AddSheet();return}
  if(a==='done'){L4.batch=false;L4.sel={};drawLib();return}
  if(a==='all'){
    var vis=l4Items(),all=vis.length&&vis.every(function(x){return L4.sel[x.id]});
    L4.sel={};if(!all)vis.forEach(function(x){L4.sel[x.id]=1});
    drawLib();return;
  }
  var sel=l4SelList();
  if(!sel.length){alert('先点几句选上。');return}
  if(a==='off'||a==='on'){sel.forEach(function(x){x.off=a==='off'});L4.sel={};refreshLib();return}
  if(a==='mv'){l4MoveSheet(sel);return}
  if(a==='rm'){
    if(!confirm('删掉选中的 '+sel.length+' 条？'))return;
    var tags=uniqArr(sel.map(function(x){return x.tag}));
    S.lib=S.lib.filter(function(x){return !L4.sel[x.id]});L4.sel={};lbKeep(tags);refreshLib();
  }
}
function renderLibPage(){
  var box=$('libPage');if(!box)return;
  if(!$('l4List')){
    box.innerHTML='<div class="l4-seg" id="l4Seg"><button type="button" data-t="main">主字卡</button><button type="button" data-t="atmo">氛围感</button></div>'
      +'<div class="l4-sub" id="l4Sub" hidden></div>'
      +'<div class="l4-tools"><button type="button" class="l4-ib" data-a="search" aria-label="搜索">'+ic('search')+'</button><button type="button" class="l4-ib" data-a="grp" aria-label="管理分组">'+ic('folder')+'</button><button type="button" class="l4-ib" data-a="filter" aria-label="筛选">'+ic('filter')+'</button><span class="sp"></span>'
      +'<button type="button" class="l4-ib" data-a="batch" aria-label="批量选择">'+ic('grid')+'</button><button type="button" class="l4-ib" data-a="imp" aria-label="导入">'+ic('imp')+'</button><button type="button" class="l4-ib" data-a="exp" aria-label="导出">'+ic('exp')+'</button></div>'
      +'<div class="l4-search" id="l4S" hidden><input id="l4Q" type="search" placeholder="搜一句…" autocomplete="off"></div>'
      +'<div class="lb-pills" id="l4Pills"></div><div id="l4List"></div>';
    $('l4Seg').addEventListener('click',function(e){
      var b=e.target.closest('[data-t]');if(!b||b.dataset.t===L4.tab)return;
      L4.tab=b.dataset.t;L4.group='all';L4.sel={};L4.batch=false;drawLib();
    });
    $('l4Sub').addEventListener('click',function(e){var b=e.target.closest('[data-sub]');if(!b)return;L4.sub=b.dataset.sub;L4.sel={};drawLib()});
    box.querySelector('.l4-tools').addEventListener('click',function(e){
      var b=e.target.closest('[data-a]');if(!b)return;var a=b.dataset.a;
      if(a==='search'){L4.search=!L4.search;if(!L4.search){L4.q='';$('l4Q').value=''}drawLib();if(L4.search)$('l4Q').focus();return}
      if(a==='grp')l4GroupsSheet();
      if(a==='filter')l4FilterSheet();
      if(a==='batch'){L4.batch=!L4.batch;L4.sel={};drawLib()}
      if(a==='imp'&&typeof importAny==='function')importAny();
      if(a==='exp'&&typeof exportPack==='function')exportPack();
    });
    $('l4Q').addEventListener('input',function(){L4.q=this.value.trim();drawLib()});
    $('l4Pills').addEventListener('click',function(e){var b=e.target.closest('[data-g]');if(!b)return;L4.group=b.dataset.g;drawLib()});
    LIB_BUILT=true;
  }
  drawLib();
}
onView('lib',renderLibPage);
NAV_COUNT.lib=function(){return S.lib.filter(function(x){return !isAtmo(x.tag)}).length};
