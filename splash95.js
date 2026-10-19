// v98：字体改用内嵌的截字宋体 GF Song，不再从网上加载。
// v97：正式开屏。页面一打开就先显示这一屏，app 在后面照常加载
// 名字等 app 跑完、宋体到了再开始浮现：app.js 执行那一两秒手机主线程是满的，
// 这时候开始的动画会被跳帧，看着就是直接蹦出来（原来右边江亭晚排在最前面，正好撞上）
// 不再在手机上抠白底换图：换图那一下会闪，开屏有自己的底色，multiply 叠底就够了
(function(){
  var sp=document.getElementById('gfsp');if(!sp)return;
  var S=null;try{S=JSON.parse(localStorage.getItem('mj_zika_v2')||'null')}catch(e){}
  // 他的名字跟着设置走，你的名字固定江亭晚
  try{if(S&&S.ta&&S.ta.name)document.getElementById('gfTa').textContent=S.ta.name}catch(e){}
  // 颜色跟着 app 配色：雾蓝用藕紫，青草和夜间用素墨，其余樱粉
  var th=S&&S.theme,dark=S&&S.prefs&&S.prefs.dark,map={mist:'zi',sage:'su',night:'su'};
  sp.dataset.tone=(S&&S.prefs&&S.prefs.gfTone)||(dark?'su':(map[th]||'fen'));
  // 名字一个字一个字晕出来
  sp.querySelectorAll('.gf-nm b').forEach(function(b,bi){
    var t=Array.from(b.textContent.replace(/\s/g,''));b.textContent='';
    t.forEach(function(ch,i){var s=document.createElement('span');s.textContent=ch;s.style.animationDelay=(0.25+bi*0.9+i*0.3)+'s';b.appendChild(s)});
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

  // 等两件事：宋体到了、app 脚本跑完。最多等 3.2 秒；字体还没到就干脆用手机自带宋体，后面不再换字
  var fontOk=false,started=false,t0=Date.now();
  try{
    var txt='江亭晚长相思'+(document.getElementById('gfTa').textContent||'');
    if(document.fonts&&document.fonts.load){
      document.fonts.load('50px "GF Song"',txt).then(function(){
        try{fontOk=document.fonts.check('50px "GF Song"',txt)}catch(e){fontOk=true}
      },function(){});
    }
  }catch(e){}
  function appOk(){return !!document.getElementById('gh')}
  function tick(){
    if(started||done)return;
    var ok=fontOk&&appOk();
    if(ok||Date.now()-t0>3200){
      started=true;
      if(!fontOk)sp.classList.add('nofont');
      // 再让出两帧，确认主线程空下来
      setTimeout(function(){requestAnimationFrame(function(){requestAnimationFrame(function(){
        sp.classList.add('rd');
        setTimeout(end,5200);
      })})},120);
      return;
    }
    setTimeout(tick,80);
  }
  tick();
  // 兜底：什么都没等到也不会一直停在开屏
  setTimeout(end,9500);
})();
