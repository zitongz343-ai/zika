// v9：设置面板。回复与通话、主页壁纸、板块图标、全局字体；设置和侧栏加入口
function readFileURL(f){return new Promise(function(ok,no){var fr=new FileReader();fr.onload=function(){ok(fr.result)};fr.onerror=no;fr.readAsDataURL(f)})}
// 压图：square=true 裁成正方形 max×max，否则长边缩到 max
function shrinkImg(src,max,square,q){
  return new Promise(function(ok,no){
    var im=new Image();
    if(/^https?:/.test(src))im.crossOrigin='anonymous';
    im.onload=function(){
      var w=im.width,h=im.height,sx=0,sy=0,sw=w,sh=h,cw,ch;
      if(square){var s=Math.min(w,h);sx=(w-s)/2;sy=(h-s)/2;sw=sh=s;cw=ch=max}
      else{var r=Math.min(1,max/Math.max(w,h));cw=Math.round(w*r);ch=Math.round(h*r)}
      var c=document.createElement('canvas');c.width=cw;c.height=ch;
      c.getContext('2d').drawImage(im,sx,sy,sw,sh,0,0,cw,ch);
      try{ok(c.toDataURL('image/jpeg',q||0.85))}catch(e){/^https?:/.test(src)?ok(src):no(e)}
    };
    im.onerror=no;im.src=src;
  });
}
function shrinkSafe(src,max,square,q){return src?shrinkImg(src,max,square,q).catch(function(){return ''}):Promise.resolve('')}
function pickImage(cb){
  var f=document.createElement('input');f.type='file';f.accept='image/*';f.hidden=true;
  document.body.appendChild(f);
  f.addEventListener('change',function(){var x=f.files&&f.files[0];f.remove();if(x)readFileURL(x).then(cb)});
  f.click();
}

// 滑杆：数值直接写进 S.prefs，最快/最慢会互相推
var PAIRS={replyMin:['replyMax',1],replyMax:['replyMin',-1],mailMin:['mailMax',1],mailMax:['mailMin',-1]};
function fmtPref(k,v){
  if(/Rate$|Dim$/.test(k))return v+'%';
  if(k==='replyMin'||k==='replyMax')return v+' 秒';
  if(v<60)return v+' 分钟';
  var h=v/60;return(h%1?h.toFixed(1):h)+' 小时';
}
function rr(label,k,min,max,step){return '<div class="field"><label>'+label+'</label><div class="rg"><input type="range" data-k="'+k+'" min="'+min+'" max="'+max+'" step="'+(step||1)+'"><b data-v="'+k+'"></b></div></div>'}
function bindRanges(w,onInput,onChange){
  var rs=w.querySelectorAll('input[type=range]');
  function paint(){rs.forEach(function(r){var k=r.dataset.k;r.value=S.prefs[k];w.querySelector('[data-v="'+k+'"]').textContent=fmtPref(k,+S.prefs[k])})}
  rs.forEach(function(r){
    r.addEventListener('input',function(){
      var k=r.dataset.k,v=+r.value,p=PAIRS[k];S.prefs[k]=v;
      if(p){var o=p[0];if(p[1]>0&&S.prefs[o]<v)S.prefs[o]=v;if(p[1]<0&&S.prefs[o]>v)S.prefs[o]=v}
      paint();if(onInput)onInput(k);
    });
    r.addEventListener('change',function(){save();if(onChange)onChange(r.dataset.k)});
  });
  paint();return paint;
}

var REPLY_KEYS=['replyRate','replyMin','replyMax','pokeRate','quoteRate','mailRate','mailMin','mailMax','ringRate','rejectRate'];
function openReplySet(){
  var w=document.createElement('div');
  w.innerHTML='<div class="sec">字卡回复</div>'+rr('回复概率','replyRate',0,100)+rr('最快多久回一张','replyMin',0,60)+rr('最慢多久回一张','replyMax',0,60)+rr('改成拍一拍','pokeRate',0,30)+rr('引用你的话','quoteRate',0,100)
    +'<p class="hint">没掷中回复概率就是已读不回。他一次回 1 到 3 张，每张前面在最快和最慢之间随机等。</p>'
    +'<div class="sec">回信</div>'+rr('回信概率','mailRate',0,100)+rr('最快多久回信','mailMin',0,1440,5)+rr('最慢多久回信','mailMax',0,1440,5)
    +'<p class="hint">从你封好信开始算，页面关着也照算，下次打开就到。</p>'
    +'<div class="sec">视频通话</div>'+rr('主动打来','ringRate',0,100)+rr('你打过去不接','rejectRate',0,100)
    +'<p class="hint">页面开着的时候，每隔 15~60 分钟掷一次看他打不打来。</p>'
    +'<button class="ghost" id="rsReset" style="width:100%;margin-top:14px">恢复默认</button>';
  var paint=bindRanges(w,null,function(){applyReplyPrefs()});
  w.querySelector('#rsReset').addEventListener('click',function(){
    REPLY_KEYS.forEach(function(k){S.prefs[k]=P_DEF[k]});save();applyReplyPrefs();paint();
  });
  openSheet('回复与通话',w);
}

function openWallSet(){
  var w=document.createElement('div');
  w.innerHTML='<div class="wallprev" id="wp"></div><div class="two" style="margin-bottom:12px"><button class="ghost" id="wPick" style="flex:1">选一张图</button><button class="ghost" id="wDel" style="flex:1">去掉壁纸</button></div>'+rr('遮一层底色','wallDim',0,80)+'<p class="hint">壁纸只铺在主页。遮得多一点，字更清楚。</p>';
  var pv=w.querySelector('#wp');
  function paintPv(){pv.style.backgroundImage=S.prefs.wall?'url("'+S.prefs.wall+'")':'';pv.textContent=S.prefs.wall?'':'还没有壁纸'}
  bindRanges(w,function(){applyWall()});
  w.querySelector('#wPick').addEventListener('click',function(){
    pickImage(function(src){shrinkSafe(src,1400,false,0.82).then(function(u){
      if(!u){alert('这张读不出来，换一张试试。');return}
      var old=S.prefs.wall;S.prefs.wall=u;
      if(!save()){S.prefs.wall=old;alert('这张太大存不下，换一张试试。');return}
      applyWall();paintPv();
    })});
  });
  w.querySelector('#wDel').addEventListener('click',function(){S.prefs.wall='';save();applyWall();paintPv()});
  paintPv();openSheet('主页壁纸',w);
}

function openIconSet(){
  var w=document.createElement('div');
  w.innerHTML='<p class="hint" style="margin:0 0 12px">侧栏和主页入口用同一套。填一个符号或 emoji，也可以换成图片。</p>';
  Object.keys(IC_DEF).forEach(function(k){
    var row=document.createElement('div');row.className='icrow';
    row.innerHTML='<span class="nm2">'+IC_NAME[k]+'</span><span class="icprev"></span><input maxlength="4" placeholder="'+esc(IC_DEF[k])+'"><button data-a="img">图片</button><button data-a="def">默认</button>';
    var pv=row.querySelector('.icprev'),inp=row.querySelector('input');
    function paint(){pv.innerHTML=icHTML(k);var v=S.prefs.icons[k]||'';inp.value=/^(data:|https?:)/.test(v)?'':v}
    inp.addEventListener('change',function(){var v=inp.value.trim();if(v)S.prefs.icons[k]=v;else delete S.prefs.icons[k];save();applyIcons();paint()});
    row.addEventListener('click',function(e){
      var b=e.target.closest('button');if(!b)return;
      if(b.dataset.a==='def'){delete S.prefs.icons[k];save();applyIcons();paint()}
      if(b.dataset.a==='img')pickImage(function(src){shrinkSafe(src,96,true,0.9).then(function(u){
        if(!u)return;S.prefs.icons[k]=u;
        if(!save()){delete S.prefs.icons[k];alert('存不下，换一张小点的。');return}
        applyIcons();paint();
      })});
    });
    paint();w.appendChild(row);
  });
  openSheet('板块图标',w);
}

function openFontSet(){
  var w=document.createElement('div');
  var list=document.createElement('div');list.className='fontlist';
  function paint(){list.querySelectorAll('button').forEach(function(b){b.classList.toggle('on',b.dataset.id===S.prefs.font.id)})}
  FONTS.forEach(function(o){
    var b=document.createElement('button');b.dataset.id=o.id;
    b.innerHTML=esc(o.n)+'<small>'+esc(o.d)+'</small>';
    b.style.fontFamily=o.f||'"Songti SC","Noto Serif SC",serif';
    b.addEventListener('click',function(){S.prefs.font.id=o.id;save();applyFont();paint()});
    list.appendChild(b);
  });
  w.appendChild(list);
  var cf=document.createElement('div');
  cf.innerHTML='<div class="field"><label>自定义字体名</label><input id="fName" placeholder="比如 Kaiti SC"></div><div class="field"><label>或者字体链接（.ttf / .woff2 / .css）</label><input id="fUrl" placeholder="https://…"></div><button class="primary" id="fApply" style="width:100%">用 这 个</button><p class="hint">只填名字的话，要是手机上本来就有的字体。填链接每次打开页面会联网加载一次。</p>';
  w.appendChild(cf);
  cf.querySelector('#fName').value=S.prefs.font.name||'';
  cf.querySelector('#fUrl').value=S.prefs.font.url||'';
  cf.querySelector('#fApply').addEventListener('click',function(){
    S.prefs.font={id:'custom',name:cf.querySelector('#fName').value.trim(),url:cf.querySelector('#fUrl').value.trim()};
    save();applyFont();paint();
  });
  paint();openSheet('全局字体',w);
}

// 设置面板顶上加一排入口；旧的导出/导入/清空挪进「数据备份与导入」
var SET_MENU=[['openReplySet','回复与通话','概率 · 时长'],['openWallSet','主页壁纸','›'],['openIconSet','板块图标','›'],['openFontSet','全局字体','›'],['openGroups','字卡分组','›'],['openData','数据备份与导入','milk 也认']];
var _openSetV9=openSettings;
openSettings=function(){
  _openSetV9();
  sheetBody.querySelectorAll('[data-s="export"],[data-s="import"],[data-s="clear"]').forEach(function(x){x.remove()});
  var m=document.createElement('div');m.className='menu-list';m.style.marginBottom='8px';
  m.innerHTML=SET_MENU.map(function(x){return '<button class="mi" data-v9="'+x[0]+'"><span>'+x[1]+'</span><span>'+x[2]+'</span></button>'}).join('');
  m.addEventListener('click',function(e){
    var b=e.target.closest('[data-v9]');if(!b)return;
    var fn=window[b.dataset.v9];closeSheet();if(typeof fn==='function')setTimeout(fn,80);
  });
  sheetBody.insertBefore(m,sheetBody.firstChild);
};
$('btnSet').removeEventListener('click',_openSetV9);
$('btnSet').addEventListener('click',function(){openSettings()});
// 侧栏底部加一个字体按钮
(function(){
  var b=document.createElement('button');b.className='sb-mini';b.textContent='Aa 字体';
  b.addEventListener('click',function(){closeNav();setTimeout(openFontSet,180)});
  document.querySelector('.sb-foot').appendChild(b);
})();
