// v61：表情包能从相册一次选好多张，一张张排队压好存进去，底下有进度
// PNG / WebP 留透明底（原来压成 JPG 透明的地方会变黑）；300KB 以内的 GIF 原样存着，会动
'use strict';
var SK61={busy:false,tip:null,tt:null};
(function(){
  var st=document.createElement('style');
  st.textContent='#sk61tip{position:fixed;z-index:310;left:50%;bottom:calc(env(safe-area-inset-bottom) + 96px);transform:translate(-50%,10px);padding:9px 16px;border-radius:999px;background:rgba(40,36,38,.86);color:#fff;font-family:var(--sans);font-size:13px;letter-spacing:.04em;opacity:0;pointer-events:none;transition:opacity .2s,transform .2s;white-space:nowrap}#sk61tip.on{opacity:1;transform:translate(-50%,0)}';
  document.head.appendChild(st);
})();
function sk61Tip(t,auto){
  var e=SK61.tip;
  if(!e){e=document.createElement('div');e.id='sk61tip';document.body.appendChild(e);SK61.tip=e}
  clearTimeout(SK61.tt);
  if(!t){e.classList.remove('on');return}
  e.textContent=t;e.classList.add('on');
  if(auto)SK61.tt=setTimeout(function(){e.classList.remove('on')},auto);
}
function sk61Read(f){return new Promise(function(ok,no){var r=new FileReader();r.onload=function(){ok(r.result)};r.onerror=no;r.readAsDataURL(f)})}
function sk61Shrink(f){
  return sk61Read(f).then(function(src){
    var type=String(f.type||'');
    if(/gif/i.test(type)&&f.size<=300*1024)return src;
    var alpha=/png|webp|gif/i.test(type);
    return new Promise(function(ok){
      var im=new Image();
      im.onload=function(){
        var max=260,r=Math.min(1,max/Math.max(im.width,im.height));
        var w=Math.max(1,Math.round(im.width*r)),h=Math.max(1,Math.round(im.height*r));
        var c=document.createElement('canvas');c.width=w;c.height=h;
        var x=c.getContext('2d');
        if(!alpha){x.fillStyle='#fff';x.fillRect(0,0,w,h)}
        x.drawImage(im,0,0,w,h);
        try{ok(alpha?c.toDataURL('image/png'):c.toDataURL('image/jpeg',0.82))}catch(e){ok('')}
      };
      im.onerror=function(){ok('')};
      im.src=src;
    });
  }).catch(function(){return ''});
}
function sk61Pick(cb){
  var f=document.createElement('input');f.type='file';f.accept='image/*';f.multiple=true;
  f.style.cssText='position:fixed;left:-9999px;top:0;opacity:0';
  document.body.appendChild(f);
  f.addEventListener('change',function(){var xs=[].slice.call(f.files||[]);f.remove();if(xs.length)cb(xs)});
  f.click();
}

// 字卡库「新增」和聊天里表情面板的「＋ 相册」都走这里
skAdd=function(){
  if(SK61.busy){sk61Tip('上一批还在加，等一下',1600);return}
  sk61Pick(function(files){
    SK61.busy=true;
    var have={},add=0,dup=0,bad=0,full=false,i=0,n=files.length;
    S.lib.forEach(function(x){if(x.tag===SK_TAG)have[x.text]=1});
    function next(){
      if(full||i>=n){finish();return}
      sk61Tip('正在加表情包 '+(i+1)+' / '+n);
      sk61Shrink(files[i++]).then(function(u){
        if(!u){bad++;next();return}
        if(have[u]){dup++;next();return}
        S.lib.push({id:uid(),tag:SK_TAG,text:u});
        if(!save()){S.lib.pop();full=true;next();return}
        have[u]=1;add++;next();
      });
    }
    function finish(){
      SK61.busy=false;
      if(add&&typeof lbUnempty==='function')lbUnempty(SK_TAG);
      save();
      if(typeof refreshLib==='function')refreshLib();
      if(typeof skPaint==='function')skPaint();
      if(full){
        sk61Tip('');
        alert('存不下了。加进去 '+add+' 张，后面 '+(n-add-dup-bad)+' 张没放进去。表情包很占地方，删几张旧的再试。');
        return;
      }
      var m='加好了 '+add+' 张';
      if(dup)m+='，'+dup+' 张本来就有';
      if(bad)m+='，'+bad+' 张读不出来';
      sk61Tip(m,2200);
    }
    next();
  });
};

// 字卡库 → 表情包 → 新增：按钮和说明改一下，选完先把弹层收起来，好看见格子一张张冒出来
var _l4AddV61=l4AddSheet;
l4AddSheet=function(){
  _l4AddV61.apply(this,arguments);
  var b=$('skUp');if(!b)return;
  b.textContent='＋ 从相册选图（能多选）';
  var h=b.nextElementSibling;
  if(h&&h.classList.contains('hint'))h.textContent='在相册里一次勾好几张都行。PNG 会留着透明底，300KB 以内的 GIF 原样存，会动。其余的压到 260px 再存，省地方。';
  b.addEventListener('click',function(){closeSheet()});
};
