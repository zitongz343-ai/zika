// v9：字卡分组管理，导入 / 导出 milk 字卡包（reply-library 那种 json）
function libTags(){
  var cnt={},order=[];
  S.lib.forEach(function(x){if(cnt[x.tag]===undefined){cnt[x.tag]=0;order.push(x.tag)}cnt[x.tag]++});
  return order.map(function(t){return{tag:t,n:cnt[t]}});
}
function refreshLib(){save();if(LIB.built)drawLib();updateNav();renderHome()}
function uniqArr(a){var o=[];a.forEach(function(x){if(o.indexOf(x)<0)o.push(x)});return o}
function cleanTag(t){return String(t||'').trim().slice(0,8)||'未分组'}
function itemText(t){if(t&&typeof t==='object')t=t.text||t.content||'';return String(t||'').trim()}

// 字卡包 → 一行一行的 {tag,text,off}
function packLines(d,opt){
  var out=[],seen={};
  (d.customReplyGroups||[]).forEach(function(g){
    if(!g)return;var tag=cleanTag(g.name);
    (g.items||[]).forEach(function(t){t=itemText(t);if(!t)return;seen[t]=1;if(opt.groups)out.push({tag:tag,text:t,off:!!g.disabled})});
  });
  if(opt.loose)(d.customReplies||[]).forEach(function(t){t=itemText(t);if(t&&!seen[t]){seen[t]=1;out.push({tag:'未分组',text:t})}});
  if(opt.kao)(d.kaomojiLibrary||[]).forEach(function(t){t=itemText(t);if(t)out.push({tag:'颜文字',text:t})});
  return out;
}
function packIntros(d){
  return(d.customIntros||[]).map(function(s){
    s=itemText(s);if(!s)return null;
    var p=s.split('|');return p.length>1?[p[0].trim(),p.slice(1).join('|').trim()]:['∞',s];
  }).filter(Boolean);
}
function mergeLines(lines,replace){
  if(replace){S.lib=[];S.libOff=[]}
  var have={},add=0,offs={};
  S.lib.forEach(function(x){have[x.tag+'\u0001'+x.text]=1});
  lines.forEach(function(x){
    var k=x.tag+'\u0001'+x.text;if(x.off)offs[x.tag]=1;
    if(have[k])return;have[k]=1;S.lib.push({tag:x.tag,text:x.text});add++;
  });
  Object.keys(offs).forEach(function(t){if(S.libOff.indexOf(t)<0)S.libOff.push(t)});
  return add;
}
// 按勾选把字卡包写进库，返回新加了几句
function applyPack(d,o,replace){
  var lines=packLines(d,o),add=0;
  if(lines.length)add=mergeLines(lines,replace);
  if(o.intros){var it=packIntros(d);if(it.length)S.prefs.intros=it}
  return add;
}

// 勾选框和分段按钮，导入字卡包和导入 milk 备份共用
function chkRow(k,label,n,on){return n?'<label><input type="checkbox" data-o="'+k+'"'+(on?' checked':'')+'>'+label+'<span>'+n+'</span></label>':''}
function readOpts(w){var o={};w.querySelectorAll('[data-o]').forEach(function(i){o[i.dataset.o]=i.checked});return o}
function bindSeg(el,cb){
  el.addEventListener('click',function(e){
    var b=e.target.closest('[data-m]');if(!b)return;
    el.querySelectorAll('[data-m]').forEach(function(x){x.classList.toggle('on',x===b)});cb(b.dataset.m);
  });
}
function packRows(d){
  var gs=(d.customReplyGroups||[]).filter(function(g){return g&&(g.items||[]).length}).length;
  return chkRow('groups','字卡（'+gs+' 个分组）',packLines(d,{groups:true}).length,true)
    +chkRow('loose','没分组的散句',packLines(d,{loose:true}).length,true)
    +chkRow('kao','颜文字（单独一组）',packLines(d,{kao:true}).length,false)
    +chkRow('intros','开屏文案',packIntros(d).length,false);
}

function openPackImport(d){
  var rows=packRows(d);
  if(!rows){alert('这个字卡包里没有能用的字卡。');return}
  var w=document.createElement('div');
  w.innerHTML='<div class="chk">'+rows+'</div><div class="seg" id="pkMode"><button data-m="merge" class="on">合并进库</button><button data-m="replace">替换整个库</button></div><button class="primary" id="pkGo" style="width:100%">收 进 库</button><p class="hint">合并会跳过库里已经有的同一句。milk 里关掉的分组，导进来也是关着的。</p>';
  var mode='merge';bindSeg(w.querySelector('#pkMode'),function(m){mode=m});
  w.querySelector('#pkGo').addEventListener('click',function(){
    var o=readOpts(w);
    if(mode==='replace'&&!confirm('先清掉现在库里的 '+S.lib.length+' 句再导入？'))return;
    var bak=JSON.stringify({lib:S.lib,off:S.libOff,intros:S.prefs.intros});
    var add=applyPack(d,o,mode==='replace');
    if(!save()){var b=JSON.parse(bak);S.lib=b.lib;S.libOff=b.off;S.prefs.intros=b.intros;save();alert('存不下了，没导进去。');return}
    refreshLib();closeSheet();alert('收进来 '+add+' 句。');
  });
  openSheet('导入字卡包',w);
}

var PACK_COLORS=['#38D9A9','#5C7CFA','#F06595','#748FFC','#FFC542','#CC5DE8','#F783AC','#FF8E53'];
function exportPack(){
  var base=Date.now();
  var groups=libTags().map(function(g,i){
    return{id:base+i,name:g.tag,color:PACK_COLORS[i%PACK_COLORS.length],disabled:S.libOff.indexOf(g.tag)>=0,
      items:S.lib.filter(function(x){return x.tag===g.tag}).map(function(x){return x.text})};
  });
  var all=uniqArr(S.lib.map(function(x){return x.text}));
  downloadJSON({exportDate:new Date().toISOString(),modules:['replies','groups'],customReplies:all,customReplyGroups:groups},'reply-library-'+ymd()+'.json');
}
function importPackFile(){importAny(function(){})}

// 分组管理：开关（关了他就不从这组抽）、改名、整组删
function openGroups(){
  var w=document.createElement('div');
  w.innerHTML='<div class="libbar"><button class="ghost" id="gImp">导入字卡包</button><button class="ghost" id="gExp">导出字卡包</button></div><div id="gList"></div><p class="hint">关掉的分组还在库里，只是'+esc(taName())+'回字卡的时候不从里面抽。「信」这组只给回信用。</p>';
  var list=w.querySelector('#gList');
  function draw(){
    list.innerHTML='';
    var tags=libTags();
    if(!tags.length){list.innerHTML='<p class="hint">库是空的。</p>';return}
    tags.forEach(function(g){
      var off=S.libOff.indexOf(g.tag)>=0;
      var row=document.createElement('div');row.className='grp'+(off?' off':'');
      row.innerHTML='<span class="n">'+esc(g.tag)+'<span class="c">'+g.n+' 句</span></span><button data-a="tg">'+(off?'开':'关')+'</button><button data-a="rn">改名</button><button data-a="rm">删</button>';
      row.addEventListener('click',function(e){
        var b=e.target.closest('button');if(!b)return;var a=b.dataset.a;
        if(a==='tg'){if(off)S.libOff=S.libOff.filter(function(t){return t!==g.tag});else S.libOff.push(g.tag)}
        if(a==='rn'){
          var nn=cleanTag(prompt('改成什么？',g.tag)||'');if(!nn||nn==='未分组'&&g.tag!=='未分组'||nn===g.tag)return;
          S.lib.forEach(function(x){if(x.tag===g.tag)x.tag=nn});
          S.libOff=uniqArr(S.libOff.map(function(t){return t===g.tag?nn:t}));
        }
        if(a==='rm'){
          if(!confirm('删掉「'+g.tag+'」里的 '+g.n+' 句？'))return;
          S.lib=S.lib.filter(function(x){return x.tag!==g.tag});
          S.libOff=S.libOff.filter(function(t){return t!==g.tag});
        }
        refreshLib();draw();
      });
      list.appendChild(row);
    });
  }
  w.querySelector('#gImp').addEventListener('click',importPackFile);
  w.querySelector('#gExp').addEventListener('click',exportPack);
  draw();openSheet('字卡分组',w);
}

// 字卡库页：关掉的分组标签变灰，顶上加「管理分组」「导入字卡包」
var _drawLibV9=drawLib;
drawLib=function(){
  _drawLibV9();
  var off=S.libOff||[];
  document.querySelectorAll('#libTags .lt').forEach(function(b){b.classList.toggle('off',off.indexOf(b.textContent)>=0)});
  var page=$('libPage');
  if(page&&!$('libBar')){
    var bar=document.createElement('div');bar.className='libbar';bar.id='libBar';
    bar.innerHTML='<button class="ghost" data-lb="g">管理分组</button><button class="ghost" data-lb="i">导入字卡包</button>';
    bar.addEventListener('click',function(e){var b=e.target.closest('[data-lb]');if(!b)return;if(b.dataset.lb==='g')openGroups();else importPackFile()});
    page.insertBefore(bar,page.firstChild);
  }
};

// 导入过开屏文案的话，开屏从里面随机挑一条
(function(){
  var it=S.prefs&&S.prefs.intros;if(!Array.isArray(it)||!it.length)return;
  var p=pickOne(it),m=document.querySelector('.sp-mark'),t=document.querySelector('.sp-title');
  if(m)m.textContent=p[0];if(t)t.textContent=p[1];
})();
