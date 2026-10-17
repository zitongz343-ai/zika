// v15：壁纸可以每个板块单独设，也可以全部同步一张；能存成方案随时换回来。回信默认图标改成文字样式
var WALL_VIEWS=['home','chat','lib','fav','moments','mail','tarot'];
var WALL_NAME={home:'主页',chat:'传讯',lib:'字卡库',fav:'收藏',moments:'朋友圈',mail:'回信',tarot:'塔罗'};
var wallView=(document.querySelector('.view.on')||{dataset:{}}).dataset.view||'home';
function wallPut(src){
  var m=S.prefs.wallImgs;
  for(var k in m)if(m[k]===src)return k;
  var id='w'+uid();m[id]=src;return id;
}
function ensureWall(){
  var p=S.prefs;
  if(!p.wallImgs||typeof p.wallImgs!=='object')p.wallImgs={};
  if(!p.walls||typeof p.walls!=='object')p.walls={};
  if(!Array.isArray(p.wallSchemes))p.wallSchemes=[];
  if(typeof p.wallSync!=='boolean')p.wallSync=false;
  if(typeof p.wallAll!=='string')p.wallAll='';
  if(p.wall){p.walls.home=wallPut(p.wall);p.wall=''} // 旧版只有主页一张，或者刚从 milk 导进来的
}
// 没有任何地方用到的图删掉，省地方
function wallGC(){
  var p=S.prefs,used={};
  function mark(id){if(id)used[id]=1}
  function markSet(all,ws){mark(all);WALL_VIEWS.forEach(function(v){mark((ws||{})[v])})}
  markSet(p.wallAll,p.walls);
  p.wallSchemes.forEach(function(s){markSet(s.all,s.walls)});
  Object.keys(p.wallImgs).forEach(function(k){if(!used[k])delete p.wallImgs[k]});
}
function wallSrc(id){return id&&S.prefs.wallImgs[id]||''}
function wallOf(v){var p=S.prefs;return wallSrc(p.wallSync?p.wallAll:p.walls[v])}
applyWall=function(v){
  ensureWall();if(v)wallView=v;
  var src=wallOf(wallView);
  wallEl.style.backgroundImage=src?'url("'+src+'")':'';
  wallEl.style.setProperty('--dim',(+S.prefs.wallDim||0)/100);
  document.body.classList.toggle('has-wall',!!src);
};
var _goV15w=go;
go=function(v){_goV15w(v);applyWall(v)};
// 改壁纸都走这里：存不下就整个退回去
function wallChange(fn){
  var p=S.prefs,bak=JSON.stringify({i:p.wallImgs,w:p.walls,a:p.wallAll,s:p.wallSchemes,y:p.wallSync,d:p.wallDim});
  fn(p);wallGC();
  if(!save()){
    var b=JSON.parse(bak);p.wallImgs=b.i;p.walls=b.w;p.wallAll=b.a;p.wallSchemes=b.s;p.wallSync=b.y;p.wallDim=b.d;save();
    alert('图太多存不下了。删掉几张壁纸或者几个方案再试。');return false;
  }
  applyWall();return true;
}
function wallPick(cb){
  pickImage(function(src){shrinkSafe(src,1080,false,0.78).then(function(u){if(!u){alert('这张读不出来，换一张试试。');return}cb(u)})});
}
openWallSet=function(){
  ensureWall();
  var w=document.createElement('div');
  w.innerHTML='<div class="seg" id="wsMode"><button data-m="sync">全部同步</button><button data-m="each">每个板块单独</button></div><div id="wsBox"></div>'
    +rr('遮一层底色','wallDim',0,80)
    +'<div class="sec">方案</div><div id="wsList"></div><button class="ghost" id="wsSave" style="width:100%;margin-top:10px">＋ 把现在这套存成方案</button>'
    +'<p class="hint">遮得多一点，字更清楚。方案只记用了哪几张图，同一张图存进几个方案也只占一份地方。</p>';
  var box=w.querySelector('#wsBox'),list=w.querySelector('#wsList');
  function bg(el,src){el.style.backgroundImage=src?'url("'+src+'")':''}
  function draw(){
    var p=S.prefs;
    w.querySelectorAll('#wsMode button').forEach(function(b){b.classList.toggle('on',(b.dataset.m==='sync')===p.wallSync)});
    if(p.wallSync){
      box.innerHTML='<div class="wallprev" id="wsPv"></div><div class="two" style="margin-bottom:12px"><button class="ghost" data-wp="__all" style="flex:1">选一张图</button><button class="ghost" data-wx="__all" style="flex:1">去掉</button></div>';
      var pv=box.querySelector('#wsPv'),s=wallSrc(p.wallAll);bg(pv,s);pv.textContent=s?'':'还没有壁纸，所有板块都会铺这一张';
    }else{
      box.innerHTML=WALL_VIEWS.map(function(v){return '<div class="wrow"><span class="wth" data-th="'+v+'"></span><span class="wnm">'+WALL_NAME[v]+'</span><button data-wp="'+v+'">换</button><button data-wx="'+v+'">去掉</button></div>'}).join('');
      box.querySelectorAll('[data-th]').forEach(function(el){bg(el,wallSrc(p.walls[el.dataset.th]))});
    }
    list.innerHTML=p.wallSchemes.length?'':'<p class="hint" style="margin:0">还没有存过方案。</p>';
    p.wallSchemes.forEach(function(s,i){
      var r=document.createElement('div');r.className='wsc';
      var fid=s.sync?s.all:WALL_VIEWS.map(function(v){return(s.walls||{})[v]}).filter(Boolean)[0];
      r.innerHTML='<span class="wth"></span><span class="wnm"></span><button data-a="use">用这套</button><button data-a="rm">删</button>';
      bg(r.querySelector('.wth'),wallSrc(fid));
      r.querySelector('.wnm').textContent=s.name+(s.sync?' · 同步':' · 分开');
      r.addEventListener('click',function(e){
        var b=e.target.closest('[data-a]');if(!b)return;
        if(b.dataset.a==='use')wallChange(function(p){p.wallSync=!!s.sync;p.wallAll=s.all||'';p.walls=JSON.parse(JSON.stringify(s.walls||{}));if(typeof s.dim==='number')p.wallDim=s.dim});
        if(b.dataset.a==='rm'){if(!confirm('删掉方案「'+s.name+'」？'))return;wallChange(function(p){p.wallSchemes.splice(i,1)})}
        draw();paint();
      });
      list.appendChild(r);
    });
  }
  var paint=bindRanges(w,function(){applyWall()});
  w.addEventListener('click',function(e){
    var m=e.target.closest('#wsMode [data-m]');
    if(m){wallChange(function(p){p.wallSync=m.dataset.m==='sync'});draw();return}
    var pk=e.target.closest('[data-wp]'),x=e.target.closest('[data-wx]');
    if(pk){var k=pk.dataset.wp;wallPick(function(u){wallChange(function(p){var id=wallPut(u);if(k==='__all')p.wallAll=id;else p.walls[k]=id});draw()});return}
    if(x){var k2=x.dataset.wx;wallChange(function(p){if(k2==='__all')p.wallAll='';else delete p.walls[k2]});draw()}
  });
  w.querySelector('#wsSave').addEventListener('click',function(){
    var p=S.prefs,def='方案 '+(p.wallSchemes.length+1),n=prompt('给这套起个名字',def);
    if(n===null)return;n=n.trim().slice(0,16)||def;
    wallChange(function(p){p.wallSchemes.push({id:uid(),name:n,sync:p.wallSync,all:p.wallAll,walls:JSON.parse(JSON.stringify(p.walls)),dim:+p.wallDim||0})});
    draw();
  });
  draw();openSheet('壁纸',w);
};
SET_GROUPS.forEach(function(g){g[1].forEach(function(it){
  if(it[0]!=='openWallSet')return;
  it[1]='壁纸';
  it[2]=function(){var p=S.prefs;if(p.wallSync)return p.wallAll?'全部同步':'没有';var n=WALL_VIEWS.filter(function(v){return p.walls[v]}).length;return n?n+' 个板块':'没有'};
})});
// 回信图标：✉ 在 iOS 上会变成彩色 emoji，加 FE0E 让它跟别的图标一样是单色字
IC_DEF.mail='\u2709\uFE0E';
if(S.prefs.icons&&S.prefs.icons.mail==='\u2709')delete S.prefs.icons.mail;
ensureWall();save();applyWall();applyIcons();
