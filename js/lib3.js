// v16：字卡库收拾整齐。顶上只留搜索、＋、⋯；分组默认收起；每句只留一个 ⋯，编辑、屏蔽、删除都收在里面
'use strict';
LB.open=LB.open||{};

lbCardEl=function(x,badge){
  var d=document.createElement('div');
  d.className='lb-card'+(x.off?' off':'')+(LB.sel[x.id]?' sel':'');
  var h='';
  if(LB.batch)h+='<span class="lb-chk">'+(LB.sel[x.id]?'✓':'')+'</span>';
  h+='<div class="t"><span class="tx"></span>';
  if(badge){var c=esc(lbColor(x.tag));h+='<span class="bdg" style="color:'+c+';background:'+c+'18;border-color:'+c+'40"><i style="background:'+c+'"></i></span>'}
  h+='</div>';
  if(!LB.batch)h+='<button type="button" class="lb-more" aria-label="这一句的更多操作">⋯</button>';
  d.innerHTML=h;
  d.querySelector('.tx').textContent=x.text;
  if(badge)d.querySelector('.bdg').appendChild(document.createTextNode(x.tag));
  d.addEventListener('click',function(e){
    if(e.target.closest('.lb-more')){e.stopPropagation();lbCardMenu(x);return}
    if(LB.batch){if(LB.sel[x.id])delete LB.sel[x.id];else LB.sel[x.id]=1;drawLib();return}
    useLine(x.text);
  });
  return d;
};

// 一句的操作面板
function lbCardMenu(x){
  var w=document.createElement('div');
  w.innerHTML='<p class="lb-mtext"></p><div class="menu-list set-grp">'
    +'<button type="button" class="mi" data-m="use"><b>带去传讯</b><span>›</span></button>'
    +'<button type="button" class="mi" data-m="ed"><b>编辑</b><span>改字 · 换分组 ›</span></button>'
    +'<button type="button" class="mi" data-m="off"><b>'+(x.off?'取消屏蔽':'屏蔽这句')+'</b><span>'+(x.off?'':'他不会抽到')+'</span></button>'
    +'<button type="button" class="mi" data-m="rm"><b class="lb-danger">删掉</b><span></span></button></div>';
  w.querySelector('.lb-mtext').textContent=x.text;
  w.addEventListener('click',function(e){
    var b=e.target.closest('[data-m]');if(!b)return;var m=b.dataset.m;
    if(m==='use'){closeSheet();useLine(x.text);return}
    if(m==='ed'){lbEdit(x);return}
    if(m==='off'){x.off=!x.off;refreshLib();closeSheet();return}
    if(m==='rm'){
      if(!confirm('删掉这句？'))return;
      S.lib=S.lib.filter(function(y){return y!==x});lbKeep([x.tag]);refreshLib();closeSheet();
    }
  });
  openSheet('这一句',w);
}

// 分组：默认收起，点一下展开。屏蔽挪进「管理分组」，这里只标一下
lbGroupEl=function(g,its){
  var c=esc(lbColor(g.tag)),isOff=S.libOff.indexOf(g.tag)>=0,open=!!LB.open[g.tag];
  var sec=document.createElement('div');sec.className='lb-grp'+(isOff?' off':'')+(open?'':' fold');
  var hd=document.createElement('div');hd.className='lb-gh';
  var allSel=its.length&&its.every(function(x){return LB.sel[x.id]});
  hd.innerHTML='<i style="background:'+c+'"></i><b style="color:'+c+'"></b><span class="c">'+its.length+'</span>'
    +(isOff?'<span class="lb-offtag">已屏蔽</span>':'')+'<span class="sp"></span>'
    +(LB.batch&&its.length?'<button type="button" data-ga="sel">'+(allSel?'取消本组':'全选本组')+'</button>':'')
    +'<span class="arr">⌄</span>';
  hd.querySelector('b').textContent=g.tag;
  hd.addEventListener('click',function(e){
    var b=e.target.closest('[data-ga]');
    if(b){its.forEach(function(x){if(allSel)delete LB.sel[x.id];else LB.sel[x.id]=1});drawLib();return}
    LB.open[g.tag]=!LB.open[g.tag];sec.classList.toggle('fold',!LB.open[g.tag]);
  });
  var cs=document.createElement('div');cs.className='lb-cards';
  if(!its.length)cs.innerHTML='<p class="hint" style="margin:0 0 8px 4px">这组还没有字卡。</p>';
  its.forEach(function(x){cs.appendChild(lbCardEl(x,false))});
  sec.appendChild(hd);sec.appendChild(cs);
  return sec;
};

// 顶上 ⋯ 里的东西
function lbMoreMenu(){
  var rows=[['rand','随机一句','带去传讯'],['batch',LB.batch?'退出批量':'批量选择','移动 · 屏蔽 · 删除'],['grp','管理分组','屏蔽 · 颜色 · 顺序'],['dedup','去重',''],['imp','导入字卡包','milk 的也行'],['exp','导出字卡包','json']];
  var w=document.createElement('div');
  w.innerHTML='<div class="menu-list set-grp">'+rows.map(function(r){return '<button type="button" class="mi" data-m="'+r[0]+'"><b>'+r[1]+'</b><span>'+r[2]+' ›</span></button>'}).join('')+'</div>';
  w.addEventListener('click',function(e){
    var b=e.target.closest('[data-m]');if(!b)return;var m=b.dataset.m;
    if(m==='imp'){closeSheet();importAny();return}
    if(m==='exp'){closeSheet();exportPack();return}
    if(m==='rand'){
      var its=lbItems().filter(function(x){return !x.off&&S.libOff.indexOf(x.tag)<0});
      closeSheet();if(its.length)useLine(pickOne(its).text);return;
    }
    if(m==='batch'){LB.batch=!LB.batch;LB.sel={};closeSheet();drawLib();return}
    if(m==='grp'){openGroups();return}
    if(m==='dedup'){closeSheet();lbDedup()}
  });
  openSheet('字卡库',w);
}

renderLibPage=function(){
  var box=$('libPage');if(!box)return;
  if(!box.querySelector('#lbMore')){
    box.innerHTML='<div class="lb-tools"><div class="lb-search"><input id="lbQ" type="search" placeholder="搜一句…" autocomplete="off"></div>'
      +'<button type="button" class="lb-ib lb-add" id="lbAdd" aria-label="新增字卡">＋</button><button type="button" class="lb-ib" id="lbMore" aria-label="更多">⋯</button></div>'
      +'<div class="lb-pills" id="lbPills"></div><div id="lbList"></div><div class="lb-bbar" id="lbBar" hidden></div>'
      +'<p class="hint lb-foot">点一句带去传讯页 · 点分组名展开或收起<br>每句后面的 ⋯ 里能编辑、屏蔽、删除</p>';
    var q=$('lbQ');q.value=LB.q||'';
    q.addEventListener('input',function(){LB.q=this.value.trim();drawLib()});
    $('lbAdd').addEventListener('click',lbAdd);
    $('lbMore').addEventListener('click',lbMoreMenu);
    $('lbPills').addEventListener('click',function(e){var b=e.target.closest('[data-f]');if(!b)return;LB.filter=b.dataset.f;drawLib()});
    $('lbBar').addEventListener('click',lbBarClick);
    LIB.built=true;
  }
  drawLib();
};
if(LIB.built)renderLibPage();
