// v100：主页底图、侧栏绿枝、水面花瓣
// 第一次打开时在手机上把大图缩到屏幕大小，花瓣和绿枝顺手把白底抠成透明，存进浏览器缓存；以后打开直接读缓存，不再下载大图
(function(){
  var CK='zika-gimg-v1';
  var A={
    bg0:['bg/1040g3k0325j620rgkc3g5pmmebmne18vfi5h6go.jpeg',900,0],
    bg1:['bg/1040g3k0325j620rgkc405pmmebmne18vs8q79ag.jpeg',900,0],
    bg2:['bg/1040g3k0325j620rgkc605pmmebmne18vj5g5qng.jpeg',900,0],
    vine:['side/1040g34o31os5air7gs3g5otdlisq3abg53ccl8o.jpeg',640,236],
    p1:['raw/1040g34o325qjgns4l82g5otdlisq3abgd48s5u0.jpeg',320,246],
    p2:['raw/1040g34o325qjgns4l8205otdlisq3abgla5p9oo.jpeg',320,246]
  };
  var memo={},queue=Promise.resolve();
  function cache(){try{return window.caches?caches.open(CK):Promise.reject(0)}catch(e){return Promise.reject(0)}}
  function ck(k){return 'gimg-cache/'+k}
  function build(k){
    var a=A[k];
    return new Promise(function(res){
      var img=new Image();
      img.onload=function(){
        try{
          var s=Math.min(1,a[1]/img.naturalWidth),w=Math.round(img.naturalWidth*s),h=Math.round(img.naturalHeight*s);
          var c=document.createElement('canvas');c.width=w;c.height=h;
          var x=c.getContext('2d');x.drawImage(img,0,0,w,h);
          if(a[2]){
            var d=x.getImageData(0,0,w,h),p=d.data,m=a[2];
            for(var i=0;i<p.length;i+=4){
              var r=Math.min(255,p[i]*255/m),g=Math.min(255,p[i+1]*255/m),b=Math.min(255,p[i+2]*255/m);
              var al=(255-Math.min(r,g,b))/255;
              if(al<0.02){p[i+3]=0;continue}
              var kk=255*(1-al);p[i]=(r-kk)/al;p[i+1]=(g-kk)/al;p[i+2]=(b-kk)/al;p[i+3]=al*255;
            }
            x.putImageData(d,0,0);
          }
          c.toBlob(function(bl){res(bl)},a[2]?'image/png':'image/jpeg',0.84);
        }catch(e){res(null)}
      };
      img.onerror=function(){res(null)};
      img.src=a[0];
    });
  }
  // 排队一张一张做，不同时解码好几张大图
  function line(k){var j=queue.then(function(){return build(k)});queue=j.then(function(){},function(){});return j}
  function get(k){
    return cache().then(function(c){
      return c.match(ck(k)).then(function(r){
        if(r)return r.blob();
        return line(k).then(function(bl){
          if(bl)c.put(ck(k),new Response(bl,{headers:{'Content-Type':bl.type}})).catch(function(){});
          return bl;
        });
      });
    },function(){return line(k)}).then(function(bl){return bl?URL.createObjectURL(bl):null},function(){return null});
  }
  window.GIMG=function(k){if(!A[k])return Promise.resolve(null);if(!memo[k])memo[k]=get(k);return memo[k]};
  // 先做马上要用的那张底图，再做花瓣和绿枝，另外两张底图等空下来再做
  var bi=0;
  try{var S=JSON.parse(localStorage.getItem('mj_zika_v2')||'null'),th=S&&S.theme,cus=S&&S.prefs&&S.prefs.pal&&S.prefs.pal.on;bi=cus?0:(th==='mist'?2:(th==='rose'?1:0))}catch(e){}
  GIMG('bg'+bi);GIMG('p1');GIMG('p2');GIMG('vine');
  setTimeout(function(){[0,1,2].forEach(function(i){if(i!==bi)GIMG('bg'+i)})},9000);
})();
