// v95：正式开屏。页面一打开就先显示这一屏，app 在后面照常加载
// 点一下进入，不点的话 6.5 秒后自己淡出
(function(){
  var sp=document.getElementById('gfsp');if(!sp)return;
  var S=null;try{S=JSON.parse(localStorage.getItem('mj_zika_v2')||'null')}catch(e){}
  // 他的名字跟着设置走，你的名字固定江亭晚
  try{if(S&&S.ta&&S.ta.name)document.getElementById('gfTa').textContent=S.ta.name}catch(e){}
  // 颜色跟着 app 配色：雾蓝用藕紫，青草和夜间用素墨，其余樱粉
  var th=S&&S.theme,dark=S&&S.prefs&&S.prefs.dark,map={mist:'zi',sage:'su',night:'su'};
  sp.dataset.tone=dark?'su':(map[th]||'fen');
  // 名字一个字一个字晕出来
  sp.querySelectorAll('.gf-nm b').forEach(function(b,bi){
    var t=Array.from(b.textContent.replace(/\s/g,''));b.textContent='';
    t.forEach(function(ch,i){var s=document.createElement('span');s.textContent=ch;s.style.animationDelay=(0.9+bi*0.9+i*0.3)+'s';b.appendChild(s)});
  });
  sp.querySelectorAll('.gf-nm i').forEach(function(el){
    var t=Array.from(el.textContent.replace(/\s/g,''));el.textContent='';
    t.forEach(function(ch){var s=document.createElement('span');s.textContent=ch;el.appendChild(s)});
  });
  // 十月十九 · 寅时
  var D='〇一二三四五六七八九';
  function cn(x){if(x<=10)return x===10?'十':D[x];if(x<20)return '十'+D[x-10];return D[Math.floor(x/10)]+'十'+(x%10?D[x%10]:'')}
  var d=new Date(),sc='子丑寅卯辰巳午未申酉戌亥'[Math.floor((d.getHours()+1)/2)%12];
  var day=document.getElementById('gfDay');if(day)day.textContent=cn(d.getMonth()+1)+'月'+cn(d.getDate())+' · '+sc+'时';
  // 白底变透明
  function key(img,maxW){
    return new Promise(function(res){
      function go(){
        try{
          var s=Math.min(1,maxW/img.naturalWidth),w=Math.round(img.naturalWidth*s),h=Math.round(img.naturalHeight*s);
          var c=document.createElement('canvas');c.width=w;c.height=h;
          var x=c.getContext('2d');x.drawImage(img,0,0,w,h);
          var dd=x.getImageData(0,0,w,h),p=dd.data;
          for(var i=0;i<p.length;i+=4){
            var r=Math.min(255,p[i]*255/246),g=Math.min(255,p[i+1]*255/246),bl=Math.min(255,p[i+2]*255/246);
            var a=(255-Math.min(r,g,bl))/255;
            if(a<0.015){p[i+3]=0;continue}
            var k=255*(1-a);
            p[i]=(r-k)/a;p[i+1]=(g-k)/a;p[i+2]=(bl-k)/a;p[i+3]=a*255;
          }
          x.putImageData(dd,0,0);
          c.toBlob(function(blob){res(blob?URL.createObjectURL(blob):null)},'image/png');
        }catch(e){res(null)}
      }
      if(img.complete&&img.naturalWidth)go();else img.addEventListener('load',go,{once:true});
    });
  }
  sp.querySelectorAll('.gf-art').forEach(function(img){
    key(img,1200).then(function(u){if(!u)return;img.src=u;img.classList.add('keyed')});
  });
  // 花瓣
  for(var i=0;i<18;i++){
    var p=document.createElement('span');p.className='gf-pt';
    var s=6+Math.random()*9;
    p.style.cssText='left:'+(Math.random()*100)+'%;width:'+s+'px;height:'+(s*.72)+'px;animation-duration:'+(9+Math.random()*9)+'s;animation-delay:'+(-Math.random()*16)+'s;opacity:'+(.35+Math.random()*.5)+';--dx:'+(-60+Math.random()*140)+'px;--r:'+(180+Math.random()*540)+'deg';
    sp.appendChild(p);
  }
  var done=false;
  function end(){
    if(done)return;done=true;
    sp.classList.add('out');
    setTimeout(function(){if(sp.parentNode)sp.parentNode.removeChild(sp)},650);
  }
  sp.addEventListener('click',end);
  setTimeout(end,6500);
})();
