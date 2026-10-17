// v15：字卡库照 milk 整理。分组筛选、分组折叠、单句屏蔽、批量选择/移动/屏蔽/删除、一次加很多句、去重、分组颜色和排序。样子沿用这边原来的
var LB={filter:'all',q:'',batch:false,sel:{},fold:{}};
var LB_COLORS=['#38D9A9','#5C7CFA','#F06595','#748FFC','#FFC542','#CC5DE8','#F783AC','#FF8E53','#868E96'];
function lbEnsure(){
  if(!S.libColors||typeof S.libColors!=='object')S.libColors={};
  if(!Array.isArray(S.libEmpty))S.libEmpty=[];
  if(!Array.isArray(S.libOff))S.libOff=[];
  if(!Array.isArray(S.libOrder))S.libOrder=[];
  S.lib.forEach(function(x){if(!x.id)x.id=uid()});
}
lbEnsure();save();

// 分组：库里有的 + 新建了还空着的，按 libOrder 排
libTags=function(){
  var cnt={},order=[];
  S.lib.forEach(function(x){if(cnt[x.tag]===undefined){cnt[x.tag]=0;order.push(x.tag)}cnt[x.tag]++});
  (S.libEmpty||[]).forEach(function(t){if(cnt[t]===undefined){cnt[t]=0;order.push(t)}});
  var od=Array.isArray(S.libOrder)?S.libOrder:[];
  var res=order.map(function(t,i){var k=od.indexOf(t);return{tag:t,n:cnt[t],k:k<0?1e6+i:k}});
  res.sort(function(a,b){return a.k-b.k});
  return res;
};
function lbColor(t){
  if(S.libColors&&S.libColors[t])return S.libColors[t];
  if(t==='未分组')return '#868E96';
  var i=libTags().map(function(g){return g.tag}).indexOf(t);
  return LB_COLORS[(i<0?0:i)%8];
}
function lbUnempty(t){S.libEmpty=S.libEmpty.filter(function(n){return n!==t})}
// 句子挪走或删光了，分组本身留着
function lbKeep(tags){tags.forEach(function(t){if(!S.lib.some(function(x){return x.tag===t})&&S.libEmpty.indexOf(t)<0)S.libEmpty.push(t)})}
function lbDropTag(t){
  S.libOff=S.libOff.filter(function(x){return x!==t});lbUnempty(t);
  delete S.libColors[t];S.libOrder=S.libOrder.filter(function(x){return x!==t});
}
function lbRename(o,n){
  var wasOff=S.libOff.indexOf(o)>=0,wasEmpty=S.libEmpty.indexOf(o)>=0;
  S.lib.forEach(function(x){if(x.tag===o)x.tag=n});
  if(S.libColors[o]&&!S.libColors[n])S.libColors[n]=S.libColors[o];
  S.libOrder=S.libOrder.map(function(x){return x===o?n:x});
  lbDropTag(o);
  if(wasOff&&S.libOff.indexOf(n)<0)S.libOff.push(n);
  if(wasEmpty)lbKeep([n]);
  if(LB.filter===o)LB.filter=n;
}

// 他回字卡的池子：再去掉单句屏蔽的
libPool=function(){
  var off=S.libOff||[];
  return S.lib.filter(function(x){return x.tag!=='信'&&!x.off&&off.indexOf(x.tag)<0}).map(function(x){return x.text});
};
// 导入 milk 字卡包时把分组颜色也带上
var _applyPackV15=applyPack;
applyPack=function(d,o,rep){
  var n=_applyPackV15(d,o,rep);lbEnsure();
  (d.customReplyGroups||[]).forEach(function(g){if(g&&g.color&&g.name)S.libColors[cleanTag(g.name)]=g.color});
  return n;
};
exportPack=function(){
  var base=Date.now();
  var groups=libTags().map(function(g,i){
    return{id:base+i,name:g.tag,color:lbColor(g.tag),disabled:S.libOff.indexOf(g.tag)>=0,
      items:S.lib.filter(function(x){return x.tag===g.tag}).map(function(x){return x.text})};
  });
  downloadJSON({exportDate:new Date().toISOString(),modules:['replies','groups'],customReplies:uniqArr(S.lib.map(function(x){return x.text})),customReplyGroups:groups},'reply-library-'+ymd()+'.json');
};

function lbItems(){
  var q=LB.q.toLowerCase();
  return S.lib.filter(function(x){
    if(LB.filter!=='all'&&x.tag!==LB.filter)return false;
    if(q&&x.text.toLowerCase().indexOf(q)<0)return false;
    return true;
  });
}
function lbSelected(){return S.lib.filter(function(x){return LB.sel[x.id]})}

// 选分组的一排胶囊，最后一个是新建
function lbGroupPick(el,cur,cb){
  function draw(){
    var tags=libTags().map(function(g){return g.tag});if(tags.indexOf(cur)<0)tags.push(cur);
    el.innerHTML='';
    tags.forEach(function(t){
      var c=lbColor(t),on=t===cur,b=document.createElement('button');
      b.type='button';b.className='lb-pill'+(on?' on':'');
      if(on){b.style.background=c;b.style.borderColor=c}
      b.innerHTML='<i style="background:'+(on?'#fff':c)+'"></i>';b.appendChild(document.createTextNode(t));
      b.addEventListener('click',function(){cur=t;cb(t);draw()});
      el.appendChild(b);
    });
    var n=document.createElement('button');n.type='button';n.className='lb-pill';n.textContent='＋ 新分组';
    n.addEventListener('click',function(){
      var r=prompt('新分组叫什么？');if(r===null||!r.trim())return;
      cur=cleanTag(r);cb(cur);draw();
    });
    el.appendChild(n);
  }
  draw();
}

function lbCardEl(x,badge){
  var d=document.createElement('div');
  d.className='lb-card'+(x.off?' off':'')+(LB.sel[x.id]?' sel':'');
  var h='';
  if(LB.batch)h+='<span class="lb-chk">'+(LB.sel[x.id]?'✓':'')+'</span>';
  h+='<div class="t"><span class="tx"></span>';
  if(badge){var c=lbColor(x.tag);h+='<span class="bdg" style="color:'+c+';background:'+c+'18;border-color:'+c+'40"><i style="background:'+c+'"></i></span>'}
  h+='</div>';
  if(!LB.batch)h+='<div class="ops"><button type="button" data-op="ed" aria-label="编辑">✎</button><button type="button" data-op="off" aria-label="'+(x.off?'取消屏蔽':'屏蔽')+'">'+(x.off?'↺':'⊘')+'</button><button type="button" data-op="rm" aria-label="删除">×</button></div>';
  d.innerHTML=h;
  d.querySelector('.tx').textContent=x.text;
  if(badge)d.querySelector('.bdg').appendChild(document.createTextNode(x.tag));
  d.addEventListener('click',function(e){
    var b=e.target.closest('[data-op]');
    if(b){e.stopPropagation();lbOp(x,b.dataset.op);return}
    if(LB.batch){if(LB.sel[x.id])delete LB.sel[x.id];else LB.sel[x.id]=1;drawLib();return}
    useLine(x.text);
  });
  return d;
}
function lbGroupEl(g,its){
  var c=lbColor(g.tag),isOff=S.libOff.indexOf(g.tag)>=0,fold=!!LB.fold[g.tag];
  var sec=document.createElement('div');sec.className='lb-grp'+(isOff?' off':'')+(fold?' fold':'');
  var hd=document.createElement('div');hd.className='lb-gh';
  var allSel=its.length&&its.every(function(x){return LB.sel[x.id]});
  hd.innerHTML='<i style="background:'+c+'"></i><b style="color:'+c+'"></b><span class="c">'+its.length+' 句</span>'
    +(LB.batch&&its.length?'<button type="button" data-ga="sel">'+(allSel?'取消本组':'全选本组')+'</button>':'')
    +'<button type="button" data-ga="off">'+(isOff?'已屏蔽':'屏蔽')+'</button><span class="arr">⌄</span>';
  hd.querySelector('b').textContent=g.tag;
  hd.addEventListener('click',function(e){
    var b=e.target.closest('[data-ga]');
    if(b&&b.dataset.ga==='off'){
      if(isOff)S.libOff=S.libOff.filter(function(t){return t!==g.tag});else S.libOff.push(g.tag);
      refreshLib();return;
    }
    if(b&&b.dataset.ga==='sel'){its.forEach(function(x){if(allSel)delete LB.sel[x.id];else LB.sel[x.id]=1});drawLib();return}
    LB.fold[g.tag]=!LB.fold[g.tag];sec.classList.toggle('fold',LB.fold[g.tag]);
  });
  var cs=document.createElement('div');cs.className='lb-cards';
  if(!its.length)cs.innerHTML='<p class="hint" style="margin:0 0 8px 4px">这组还没有字卡。</p>';
  its.forEach(function(x){cs.appendChild(lbCardEl(x,false))});
  sec.appendChild(hd);sec.appendChild(cs);
  return sec;
}
function lbEmpty(t,s){return '<div class="empty"><b>'+t+'</b>'+s+'</div>'}

drawLib=function(){
  var pills=$('lbPills'),list=$('lbList');if(!pills||!list)return;
  lbEnsure();
  var tags=libTags(),off=S.libOff;
  if(LB.filter!=='all'&&!tags.some(function(g){return g.tag===LB.filter}))LB.filter='all';
  pills.innerHTML='<button class="lb-pill'+(LB.filter==='all'?' on':'')+'" data-f="all">全部 <em>'+S.lib.length+'</em></button>'+tags.map(function(g){
    var c=lbColor(g.tag),on=LB.filter===g.tag;
    return '<button class="lb-pill'+(on?' on':'')+(off.indexOf(g.tag)>=0?' off':'')+'" data-f="'+esc(g.tag)+'"'+(on?' style="background:'+c+';border-color:'+c+'"':'')+'><i style="background:'+(on?'#fff':c)+'"></i>'+esc(g.tag)+' <em>'+g.n+'</em></button>';
  }).join('');
  var bb=document.querySelector('[data-la="batch"]');
  if(bb){bb.classList.toggle('on',LB.batch);bb.textContent=LB.batch?'退出批量':'批量'}
  var items=lbItems();
  list.innerHTML='';
  if(LB.filter==='all'&&!LB.q){
    if(!tags.length)list.innerHTML=lbEmpty('库是空的','点「＋ 新增字卡」加几句，<br>或者导入一个字卡包。');
    tags.forEach(function(g){list.appendChild(lbGroupEl(g,items.filter(function(x){return x.tag===g.tag})))});
  }else if(!items.length){
    list.innerHTML=LB.q?lbEmpty('没找到','换个词试试。'):lbEmpty('这组还空着','点「＋ 新增字卡」往里加。');
  }else{
    items.forEach(function(x){list.appendChild(lbCardEl(x,LB.filter==='all'))});
  }
  var lc=$('libCount');if(lc)lc.textContent=S.lib.length+' 句';
  lbDrawBar();
};
function lbDrawBar(){
  var bar=$('lbBar');if(!bar)return;
  bar.hidden=!LB.batch;
  if(!LB.batch){bar.innerHTML='';return}
  var n=lbSelected().length;
  bar.innerHTML='<span>已选 '+n+' 句</span><button class="ghost" data-b="all">全选</button><button class="ghost" data-b="mv">移到分组</button><button class="ghost" data-b="off">屏蔽</button><button class="ghost" data-b="on">取消屏蔽</button><button class="ghost" data-b="rm">删除</button><button class="primary" data-b="done">完成</button>';
}
function lbBarClick(e){
  var b=e.target.closest('[data-b]');if(!b)return;
  var a=b.dataset.b,sel=lbSelected();
  if(a==='done'){LB.batch=false;LB.sel={};drawLib();return}
  if(a==='all'){
    var vis=lbItems(),all=vis.length&&vis.every(function(x){return LB.sel[x.id]});
    LB.sel={};if(!all)vis.forEach(function(x){LB.sel[x.id]=1});
    drawLib();return;
  }
  if(!sel.length){alert('先点几句选上。');return}
  if(a==='off'||a==='on'){sel.forEach(function(x){x.off=a==='off'});refreshLib();return}
  if(a==='rm'){
    if(!confirm('删掉选中的 '+sel.length+' 句？'))return;
    var tags=uniqArr(sel.map(function(x){return x.tag}));
    S.lib=S.lib.filter(function(x){return !LB.sel[x.id]});LB.sel={};lbKeep(tags);refreshLib();return;
  }
  if(a==='mv')lbMove(sel);
}
function lbMove(sel){
  var w=document.createElement('div'),tag=sel[0].tag;
  w.innerHTML='<p class="hint" style="margin:0 0 10px">把选中的 '+sel.length+' 句挪到：</p><div class="lb-gpick" id="lmG"></div><button class="primary" id="lmOk" style="width:100%;margin-top:16px">挪 过 去</button>';
  lbGroupPick(w.querySelector('#lmG'),tag,function(t){tag=t});
  w.querySelector('#lmOk').addEventListener('click',function(){
    var old=uniqArr(sel.map(function(x){return x.tag}));
    sel.forEach(function(x){x.tag=tag});lbUnempty(tag);lbKeep(old);
    LB.sel={};refreshLib();closeSheet();
  });
  openSheet('移到分组',w);
}
function lbOp(x,op){
  if(op==='ed'){lbEdit(x);return}
  if(op==='off'){x.off=!x.off;refreshLib();return}
  if(op==='rm'){
    if(!confirm('删掉这句？'))return;
    S.lib=S.lib.filter(function(y){return y!==x});lbKeep([x.tag]);refreshLib();
  }
}
function lbEdit(x){
  var w=document.createElement('div'),tag=x.tag;
  w.innerHTML='<div class="field"><label>字卡</label><textarea id="leT" style="min-height:90px;font-family:var(--serif);font-size:14px;line-height:1.8"></textarea></div><div class="field"><label>分组</label><div class="lb-gpick" id="leG"></div></div><button class="primary" id="leOk" style="width:100%;margin-top:4px">收 好</button>';
  w.querySelector('#leT').value=x.text;
  lbGroupPick(w.querySelector('#leG'),tag,function(t){tag=t});
  w.querySelector('#leOk').addEventListener('click',function(){
    var t=w.querySelector('#leT').value.trim();if(!t)return;
    var old=x.tag;x.text=t;x.tag=tag;lbUnempty(tag);lbKeep([old]);
    refreshLib();closeSheet();
  });
  openSheet('编辑字卡',w);
}
// 一次加很多句，一行一句
function lbAdd(){
  var tags=libTags(),tag=LB.filter!=='all'?LB.filter:(tags[0]?tags[0].tag:'我的');
  var w=document.createElement('div');
  w.innerHTML='<div class="field"><label>收进哪个分组</label><div class="lb-gpick" id="laG"></div></div><div class="field"><label>一行一句，可以一次贴很多</label><textarea id="laT" placeholder="第一句&#10;第二句&#10;第三句" style="min-height:150px;font-family:var(--serif);font-size:14px;line-height:1.8"></textarea></div><button class="primary" id="laOk" style="width:100%">收 进 库</button>';
  var ta=w.querySelector('#laT'),ok=w.querySelector('#laOk');
  function lines(){return uniqArr(ta.value.split('\n').map(function(s){return s.trim()}).filter(Boolean))}
  ta.addEventListener('input',function(){var n=lines().length;ok.textContent=n?'收进库 · '+n+' 句':'收 进 库'});
  lbGroupPick(w.querySelector('#laG'),tag,function(t){tag=t});
  ok.addEventListener('click',function(){
    var ls=lines();if(!ls.length)return;
    var have={},add=0;
    S.lib.forEach(function(x){if(x.tag===tag)have[x.text]=1});
    ls.forEach(function(t){if(have[t])return;have[t]=1;S.lib.push({id:uid(),tag:tag,text:t});add++});
    lbUnempty(tag);refreshLib();closeSheet();
    if(add<ls.length)alert('收进 '+add+' 句，另外 '+(ls.length-add)+' 句这组里本来就有。');
  });
  openSheet('新增字卡',w);
}
function lbDedup(){
  var seen={},keep=[],n=0;
  S.lib.forEach(function(x){if(seen[x.text]){n++;return}seen[x.text]=1;keep.push(x)});
  if(!n){alert('没有重复的字卡。');return}
  if(!confirm('找到 '+n+' 句重复的。同一句只留第一次出现的那条？'))return;
  var tags=libTags().map(function(g){return g.tag});
  S.lib=keep;lbKeep(tags);refreshLib();
  alert('删掉了 '+n+' 句重复的。');
}

renderLibPage=function(){
  var box=$('libPage');if(!box)return;
  if(!box.querySelector('#lbList')){
    box.innerHTML='<div class="lb-tools"><input id="lbQ" placeholder="搜一句…"><button class="ghost" id="lbRand">随机一句</button></div>'
      +'<div class="lb-acts"><button class="ghost" data-la="add">＋ 新增字卡</button><button class="ghost" data-la="batch">批量</button><button class="ghost" data-la="grp">管理分组</button><button class="ghost" data-la="dedup">去重</button><button class="ghost" data-la="imp">导入</button><button class="ghost" data-la="exp">导出</button></div>'
      +'<div class="lb-pills" id="lbPills"></div><div id="lbList"></div><div class="lb-bbar" id="lbBar" hidden></div>'
      +'<p class="hint">点一句就带去传讯页，填进输入框。✎ 编辑，⊘ 屏蔽这一句，× 删掉。分组名那一行点「屏蔽」整组都不抽，点别处折起来。「信」这组只给回信用。</p>';
    $('lbQ').addEventListener('input',function(){LB.q=this.value.trim();drawLib()});
    $('lbRand').addEventListener('click',function(){
      var its=lbItems().filter(function(x){return !x.off&&S.libOff.indexOf(x.tag)<0});
      if(its.length)useLine(pickOne(its).text);
    });
    box.querySelector('.lb-acts').addEventListener('click',function(e){
      var b=e.target.closest('[data-la]');if(!b)return;var a=b.dataset.la;
      if(a==='add')lbAdd();
      if(a==='batch'){LB.batch=!LB.batch;LB.sel={};drawLib()}
      if(a==='grp')openGroups();
      if(a==='dedup')lbDedup();
      if(a==='imp')importAny();
      if(a==='exp')exportPack();
    });
    $('lbPills').addEventListener('click',function(e){var b=e.target.closest('[data-f]');if(!b)return;LB.filter=b.dataset.f;drawLib()});
    $('lbBar').addEventListener('click',lbBarClick);
    LIB.built=true;
  }
  drawLib();
};

// 分组管理：新建、换颜色、往前挪、屏蔽、改名、删
openGroups=function(){
  lbEnsure();
  var w=document.createElement('div');
  w.innerHTML='<div class="libbar"><button class="ghost" data-g="new">＋ 新建分组</button><button class="ghost" data-g="imp">导入字卡包</button><button class="ghost" data-g="exp">导出</button></div><div id="gmList"></div><p class="hint">屏蔽的分组还在库里，只是'+esc(taName())+'回字卡时不从里面抽。点前面的圆点换颜色，↑ 往前挪。删分组的话，里面的句子挪到「未分组」。</p>';
  var list=w.querySelector('#gmList');
  function done(){refreshLib();draw()}
  function draw(){
    list.innerHTML='';
    var tags=libTags();
    if(!tags.length){list.innerHTML='<p class="hint">还没有分组。</p>';return}
    tags.forEach(function(g,i){
      var off=S.libOff.indexOf(g.tag)>=0,c=lbColor(g.tag);
      var row=document.createElement('div');row.className='lb-gm'+(off?' off':'');
      row.innerHTML='<div class="r"><button type="button" class="dot" data-a="col" aria-label="换颜色"></button><span class="n"></span><span class="c">'+g.n+' 句</span>'
        +(i?'<button type="button" data-a="up" aria-label="往前挪">↑</button>':'')
        +'<button type="button" data-a="tg">'+(off?'启用':'屏蔽')+'</button><button type="button" data-a="rn">改名</button><button type="button" data-a="rm">删</button></div><div class="lb-colors" hidden></div>';
      row.querySelector('.dot').style.background=c;
      row.querySelector('.n').textContent=g.tag;
      var cols=row.querySelector('.lb-colors');
      LB_COLORS.forEach(function(col){
        var b=document.createElement('button');b.type='button';b.style.background=col;b.dataset.col=col;
        if(col.toLowerCase()===String(c).toLowerCase())b.className='on';
        cols.appendChild(b);
      });
      row.addEventListener('click',function(e){
        var cb=e.target.closest('[data-col]');
        if(cb){S.libColors[g.tag]=cb.dataset.col;done();return}
        var b=e.target.closest('[data-a]');if(!b)return;var a=b.dataset.a;
        if(a==='col'){cols.hidden=!cols.hidden;return}
        if(a==='up'){var ts=tags.map(function(x){return x.tag}),t=ts[i];ts[i]=ts[i-1];ts[i-1]=t;S.libOrder=ts;done();return}
        if(a==='tg'){if(off)S.libOff=S.libOff.filter(function(t){return t!==g.tag});else S.libOff.push(g.tag);done();return}
        if(a==='rn'){
          var r=prompt('改成什么？',g.tag);if(r===null||!r.trim())return;
          var nn=cleanTag(r);if(nn===g.tag)return;lbRename(g.tag,nn);done();return;
        }
        if(a==='rm'){
          if(g.tag==='未分组'){
            if(g.n&&!confirm('删掉「未分组」里的 '+g.n+' 句？'))return;
            S.lib=S.lib.filter(function(x){return x.tag!=='未分组'});
          }else{
            if(!confirm('删掉分组「'+g.tag+'」？'+(g.n?'里面的 '+g.n+' 句会挪到「未分组」。':'')))return;
            S.lib.forEach(function(x){if(x.tag===g.tag)x.tag='未分组'});
          }
          lbDropTag(g.tag);done();
        }
      });
      list.appendChild(row);
    });
  }
  w.querySelector('.libbar').addEventListener('click',function(e){
    var b=e.target.closest('[data-g]');if(!b)return;var a=b.dataset.g;
    if(a==='new'){
      var r=prompt('新分组叫什么？');if(r===null||!r.trim())return;
      var nm=cleanTag(r);if(!libTags().some(function(x){return x.tag===nm}))S.libEmpty.push(nm);
      done();
    }
    if(a==='imp')importAny();
    if(a==='exp')exportPack();
  });
  draw();openSheet('字卡分组',w);
};
if(LIB.built)renderLibPage();
