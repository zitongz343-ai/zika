// v101：主页底图、侧栏绿枝、水面花瓣
// 第一次打开时在手机上把大图缩到屏幕大小，花瓣和绿枝顺手把白底抠成透明，存进浏览器缓存；以后打开直接读缓存
// 绿枝按三种配色各转一份颜色存起来，侧栏打开时不用再现算滤镜
(function(){
  var CK='zika-gimg-v2';try{if(window.caches)caches.delete('zika-gimg-v1')}catch(e){}
  var VI='side/1040g34o31os5air7gs3g5otdlisq3abg53ccl8o.jpeg';
  var A={
    bg0:['bg/1040g3k0325j620rgkc3g5pmmebmne18vfi5h6go.jpeg',900,0],
    bg1:['bg/1040g3k0325j620rgkc405pmmebmne18vs8q79ag.jpeg',900,0],
    bg2:['bg/1040g3k0325j620rgkc605pmmebmne18vj5g5qng.jpeg',900,0],
    bg3:['bg/qing.jpg',900,0],
    vine_fen:[VI,640,236,255,.68],
    vine_zi:[VI,640,236,185,.62],
    vine_qing:[VI,640,236,105,.58],
    p1:['raw/1040g34o325qjgns4l82g5otdlisq3abgd48s5u0.jpeg',320,246],
    p2:['raw/1040g34o325qjgns4l8205otdlisq3abgla5p9oo.jpeg',320,246]
  };
  // 跟 CSS 的 hue-rotate() saturate() 同一套矩阵：先转色相再调饱和
  function mat(deg,sat){
    var r=deg*Math.PI/180,c=Math.cos(r),s=Math.sin(r);
    var h=[.213+c*.787-s*.213,.715-c*.715-s*.715,.072-c*.072+s*.928,
           .213-c*.213+s*.143,.715+c*.285+s*.140,.072-c*.072-s*.283,
           .213-c*.213-s*.787,.715-c*.715+s*.715,.072+c*.928+s*.072];
    var t=sat,q=[.213+.787*t,.715-.715*t,.072-.072*t,.213-.213*t,.715+.285*t,.072-.072*t,.213-.213*t,.715-.715*t,.072+.928*t];
    var m=[];
    for(var i=0;i<3;i++)for(var j=0;j<3;j++)m[i*3+j]=q[i*3]*h[j]+q[i*3+1]*h[3+j]+q[i*3+2]*h[6+j];
    return m;
  }
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
            var d=x.getImageData(0,0,w,h),p=d.data,M=a[2],m=a.length>3?mat(a[3],a[4]):null;
            for(var i=0;i<p.length;i+=4){
              var r=Math.min(255,p[i]*255/M),g=Math.min(255,p[i+1]*255/M),b=Math.min(255,p[i+2]*255/M);
              var al=(255-Math.min(r,g,b))/255;
              if(al<0.02){p[i+3]=0;continue}
              var kk=255*(1-al),R=(r-kk)/al,G=(g-kk)/al,B=(b-kk)/al;
              if(m){var R2=m[0]*R+m[1]*G+m[2]*B,G2=m[3]*R+m[4]*G+m[5]*B,B2=m[6]*R+m[7]*G+m[8]*B;R=R2;G=G2;B=B2}
              p[i]=R;p[i+1]=G;p[i+2]=B;p[i+3]=al*255;
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
  // 先做马上要用的底图、花瓣和这一色的绿枝，别的等空下来再做
  var t='fen';
  try{var S=JSON.parse(localStorage.getItem('mj_zika_v2')||'null');t=(S&&S.prefs&&S.prefs.gfTone)||(S&&S.theme==='mist'?'zi':'fen')}catch(e){}
  var bi=t==='zi'?2:(t==='qing'?3:0);
  GIMG('bg'+bi);GIMG('p1');GIMG('p2');GIMG('vine_'+t);
  setTimeout(function(){GIMG(bi===2?'bg0':'bg2');['fen','zi','qing'].forEach(function(x){if(x!==t)GIMG('vine_'+x)})},9000);
})();
