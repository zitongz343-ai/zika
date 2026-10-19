try{

// v99：古风主页 + 侧栏
// 主页：左上日子和节气、右上每日一句（点日历上哪天就换成那天的一句）、宜忌、日历（聊得越多圈越深）、四个入口浮在水面
// 侧栏：绿枝跟着配色换色，九个入口左上五个、右下四个。都不带红点
// 原来主页和侧栏的东西只是藏起来，数据和别处功能不动

(function(){
  if(document.getElementById('gh'))return;
  var home=document.querySelector('section[data-view="home"]'),sb=document.getElementById('sidebar');
  if(!home)return;
  var R=document.documentElement;
  R.classList.remove('lk-on');R.classList.add('gh-on');if(sb)R.classList.add('gs-on');

  var BG=['bg/1040g3k0325j620rgkc3g5pmmebmne18vfi5h6go.jpeg','bg/1040g3k0325j620rgkc405pmmebmne18vs8q79ag.jpeg','bg/1040g3k0325j620rgkc605pmmebmne18vj5g5qng.jpeg'];
  var PET=['raw/1040g34o325qjgns4l82g5otdlisq3abgd48s5u0.jpeg','raw/1040g34o325qjgns4l8205otdlisq3abgla5p9oo.jpeg'];
  var VINE='side/1040g34o31os5air7gs3g5otdlisq3abg53ccl8o.jpeg';
  var CN='\u3007\u4e00\u4e8c\u4e09\u56db\u4e94\u516d\u4e03\u516b\u4e5d';
  function cn(x){if(x<=10)return x===10?'\u5341':CN[x];if(x<20)return '\u5341'+CN[x-10];return CN[Math.floor(x/10)]+'\u5341'+(x%10?CN[x%10]:'')}
  var EN=['JANUARY','FEBRUARY','MARCH','APRIL','MAY','JUNE','JULY','AUGUST','SEPTEMBER','OCTOBER','NOVEMBER','DECEMBER'];
  var TERMS=[[0,5,'小寒'],[0,20,'大寒'],[1,4,'立春'],[1,18,'雨水'],[2,5,'惊蛰'],[2,20,'春分'],[3,5,'清明'],[3,20,'谷雨'],[4,5,'立夏'],[4,21,'小满'],[5,5,'芒种'],[5,21,'夏至'],[6,7,'小暑'],[6,23,'大暑'],[7,7,'立秋'],[7,23,'处暑'],[8,7,'白露'],[8,23,'秋分'],[9,8,'寒露'],[9,23,'霜降'],[10,7,'立冬'],[10,22,'小雪'],[11,7,'大雪'],[11,21,'冬至']];
  function term(d){
    var t0=new Date(d.getFullYear(),d.getMonth(),d.getDate()).getTime();
    for(var k=0;k<2;k++)for(var i=0;i<TERMS.length;i++){
      var x=TERMS[i],t=new Date(d.getFullYear()+k,x[0],x[1]).getTime();
      if(t>=t0){var n=Math.round((t-t0)/864e5);return n===0?'今日'+x[2]:x[2]+'前'+cn(n)+'日'}
    }
    return '';
  }
  // 和 dailyPick 同一套打散，今天这句和原来的「今日一句」是同一句
  function hd(d){
    var h=(d.getFullYear()*10000+(d.getMonth()+1)*100+d.getDate())>>>0;
    h=Math.imul(h^(h>>>16),0x45d9f3b)>>>0;h=Math.imul(h^(h>>>16),0x45d9f3b)>>>0;
    return (h^(h>>>16))>>>0;
  }
  var YI=['想你','早睡','好好吃饭','写一封信','晒太阳','喝热水','抱抱','散步','听一首歌','发呆','慢慢来','多喝水'];
  var JI=['熬夜','只吃面包','逞强','胡思乱想','空腹','久坐','赌气','把话憋着'];
  function pool(){try{return typeof tagPool==='function'?tagPool('每日一句'):[]}catch(e){return []}}
  function sentFor(d){var p=pool();return p.length?p[hd(d)%p.length]:''}
  // 「英文 | 中文」两行显示；只写中文就只显示中文
  function parse(t){
    t=String(t||'');var m=t.split(/\s*[|\uff5c]\s*/);
    if(m.length>1){var a=m[0],b=m.slice(1).join(' '),cj=/[\u4e00-\u9fff]/;if(cj.test(a)&&!cj.test(b))return [b,a];return [a,b]}
    return ['',t];
  }
  function counts(y,m){
    var o={};
    function add(c){if(!c||!c.at)return;var d=new Date(c.at);if(d.getFullYear()===y&&d.getMonth()===m){var k=d.getDate();o[k]=(o[k]||0)+1}}
    (S.cards||[]).forEach(add);
    (S.chats||[]).forEach(function(ch){(ch&&ch.cards||[]).forEach(add)});
    return o;
  }

  // ── 主页 ──
  var ENT=[['chat','传讯','Letters',27,18],['mail','信箱','Mailbox',69,30],['music','音乐','Music',30,112],['lib','字卡','Cards',73,124]];
  var gh=document.createElement('div');gh.id='gh';
  gh.innerHTML='<div class="gh-bg"></div><div class="gh-in">'
    +'<div class="gh-top"><div class="gh-dl"><div class="gh-day"></div><div class="gh-meta"><b></b><span></span></div></div>'
    +'<div class="gh-qt"><small></small><p class="gh-en"></p><p class="gh-zh"></p></div></div>'
    +'<div class="gh-alm"><span><i>宜</i><em class="gh-yi"></em></span><span><i>忌</i><em class="gh-ji"></em></span></div>'
    +'<section class="gh-cal"><div class="gh-hd"><b class="gh-mcn"></b><span class="gh-men"></span><div class="gh-nav"><button type="button" data-nav="-1" aria-label="上个月">\u2039</button><button type="button" data-nav="1" aria-label="下个月">\u203a</button></div></div><div class="gh-grid"></div></section>'
    +'<section class="gh-also"><div class="gh-hd"><b>也去看看</b><span>ALSO HERE</span><i></i></div><div class="gh-pond">'
    +ENT.map(function(e,i){return '<button type="button" class="gh-wd" data-go="'+e[0]+'" style="left:'+e[3]+'%;top:'+e[4]+'px;animation-delay:-'+(i+1)+'s"><b>'+e[1]+'</b><span class="gh-rf" aria-hidden="true">'+e[1]+'</span><em>'+e[2]+'</em></button>'}).join('')
    +'</div></section></div><div class="gh-pts"></div>';
  home.appendChild(gh);
  (function(){var b=gh.querySelector('.gh-bg');if(b){b.id='gbg';document.body.insertBefore(b,document.body.firstChild)}})();
  var q=function(s){return gh.querySelector(s)};
  var pond=q('.gh-pond'),grid=q('.gh-grid'),qt=q('.gh-qt');

  function rip(x,y,once,delay){
    var r=document.createElement('span');r.className='gh-rip'+(once?' once':'');
    r.style.left=x;r.style.top=y;if(delay)r.style.animationDelay=delay+'s';
    pond.appendChild(r);if(once)setTimeout(function(){if(r.parentNode)r.parentNode.removeChild(r)},1700);
  }
  [['27%','62px'],['69%','74px'],['30%','156px'],['73%','168px']].forEach(function(p,k){rip(p[0],p[1],false,k*1.2)});
  [[0,'3%',80,60,-2],[1,'47%',8,66,-5],[0,'82%',96,54,-1],[1,'48%',160,56,-6]].forEach(function(p){
    var e=document.createElement('div');e.className='gh-pimg';
    e.style.cssText='left:'+p[1]+';top:'+p[2]+'px;width:'+p[3]+'px;height:'+Math.round(p[3]*0.63)+'px;animation-delay:'+p[4]+'s';
    pond.appendChild(e);
  });
  pond.querySelectorAll('.gh-pimg').forEach(function(e,i){
    if(window.GIMG)GIMG(i%2?'p2':'p1').then(function(u){if(u)e.style.backgroundImage='url("'+u+'")'});
  });
  var pts=q('.gh-pts');
  for(var j=0;j<10;j++){
    var p=document.createElement('span');p.className='gh-pt';var s=5+Math.random()*7;
    p.style.cssText='left:'+(Math.random()*100)+'%;width:'+s+'px;height:'+(s*.72)+'px;opacity:'+(.3+Math.random()*.4)+';animation-duration:'+(11+Math.random()*9)+'s;animation-delay:'+(-Math.random()*18)+'s;--dx:'+(-50+Math.random()*110)+'px;--r:'+(200+Math.random()*500)+'deg';
    pts.appendChild(p);
  }

  // 配色：桃夭、天青用粉底图（天青在样式里转色），紫藤用紫底图
  var BGI=-1;
  function setBg(bi){
    if(bi===BGI)return;BGI=bi;var el=document.getElementById('gbg')||q('.gh-bg');el.classList.remove('ld');
    var put=function(u){if(BGI!==bi)return;el.style.backgroundImage='url("'+u+'")';el.classList.add('ld');R.style.setProperty('--gbgu','url("'+u+'")')};
    if(window.GIMG)GIMG('bg'+bi).then(function(u){put(u||BG[bi])});else put(BG[bi]);
  }
  function tone(){
    var p=S.prefs||{},cus=!!(p.pal&&p.pal.on),th=S.theme;
    var t=p.gfTone||(cus?'fen':(th==='mist'?'zi':(th==='sage'?'su':'fen')));
    var bi=t==='zi'?2:0;
    R.dataset.gt=t;if(window.gsVine)gsVine();
    setBg(bi);
  }

  var now=new Date(),VY=now.getFullYear(),VM=now.getMonth(),SEL=null,CUR={};
  function quote(dt,label){
    var t=sentFor(dt),pr=parse(t);
    qt.style.opacity=0;
    setTimeout(function(){
      q('.gh-qt small').textContent=label;
      q('.gh-en').textContent=pr[0];
      q('.gh-zh').textContent=t?pr[1]:'字卡库「每日一句」还空着';
      qt.style.opacity=1;
    },180);
  }
  function isToday(y,m,d){var n=new Date();return n.getFullYear()===y&&n.getMonth()===m&&n.getDate()===d}
  function select(d){
    SEL=d;
    grid.querySelectorAll('[data-d]').forEach(function(e){e.classList.toggle('sel',+e.dataset.d===d&&!e.classList.contains('to'))});
    var c=CUR[d]||0;
    quote(new Date(VY,VM,d),isToday(VY,VM,d)?'今日一句':cn(VM+1)+'月'+cn(d)+(c?' · '+c+' 张':''));
  }
  function cal(){
    CUR=counts(VY,VM);
    var mx=0;for(var k in CUR)if(CUR[k]>mx)mx=CUR[k];
    q('.gh-mcn').textContent=cn(VM+1)+'月';
    q('.gh-men').textContent=EN[VM]+(VY!==new Date().getFullYear()?' '+VY:'');
    var h='';'一二三四五六日'.split('').forEach(function(w){h+='<div class="gh-w">'+w+'</div>'});
    var lead=(new Date(VY,VM,1).getDay()+6)%7,days=new Date(VY,VM+1,0).getDate();
    for(var i=0;i<lead;i++)h+='<div></div>';
    for(var d=1;d<=days;d++){
      var n=CUR[d]||0,lv=n?(n>=mx*0.66?3:(n>=mx*0.33?2:1)):0;
      var cls='gh-d'+(isToday(VY,VM,d)?' to':(lv?' l'+lv:''))+(SEL===d&&!isToday(VY,VM,d)?' sel':'');
      h+='<div><button type="button" class="'+cls+'" data-d="'+d+'" aria-label="'+(VM+1)+'月'+d+'日'+(n?'，'+n+' 张':'')+'">'+d+'</button></div>';
    }
    grid.innerHTML=h;
  }
  function renderH(){
    if(!S)return;
    tone();
    var d=new Date(),sc='子丑寅卯辰巳午未申酉戌亥'[Math.floor((d.getHours()+1)/2)%12],x=hd(d);
    q('.gh-day').textContent=d.getDate();
    q('.gh-meta b').textContent=cn(d.getMonth()+1)+'月 · '+sc+'时';
    q('.gh-meta span').textContent=term(d);
    q('.gh-yi').textContent=YI[x%YI.length];
    q('.gh-ji').textContent=JI[(x>>>7)%JI.length];
    cal();
    if(SEL)select(SEL);else quote(d,'今日一句');
  }
  gh.addEventListener('click',function(e){
    var g=e.target.closest('[data-go]');if(g){if(typeof go==='function')go(g.dataset.go);return}
    var dd=e.target.closest('[data-d]');if(dd){select(+dd.dataset.d);return}
    var nv=e.target.closest('[data-nav]');
    if(nv){
      VM+=+nv.dataset.nav;if(VM<0){VM=11;VY--}if(VM>11){VM=0;VY++}
      var t=new Date();SEL=null;cal();
      if(VY===t.getFullYear()&&VM===t.getMonth())quote(t,'今日一句');
      return;
    }
    if(e.target.closest('.gh-pond')){var b=pond.getBoundingClientRect();rip((e.clientX-b.left)+'px',(e.clientY-b.top)+'px',true)}
  });

  var _rhV99=renderHome;
  renderHome=function(){var r=_rhV99.apply(this,arguments);try{renderH()}catch(e){console.error('[zika] v99 home',e)}return r};
  if(typeof applyLook==='function'){var _alV99=applyLook;applyLook=function(){var r=_alV99.apply(this,arguments);try{tone()}catch(e){}return r}}
  setInterval(function(){if(!document.hidden)try{renderH()}catch(e){}},60000);
  document.addEventListener('visibilitychange',function(){if(!document.hidden)try{renderH()}catch(e){}});
  renderH();

  // ── 侧栏 ──
  if(!sb)return;
  var IT=[['home',158,108,'主页','HOME'],['chat',104,190,'传讯','LETTERS'],['mail',70,272,'信箱','MAILBOX'],['moments',50,354,'朋友圈','MOMENTS'],['lib',46,436,'字卡库','CARDS'],
          ['fav',254,366,'收藏','KEEPSAKE'],['tarot',226,448,'塔罗','TAROT'],['music',198,530,'音乐','MUSIC'],['set',170,612,'设置','SETTINGS']];
  var gs=document.createElement('div');gs.id='gside';
  gs.innerHTML='<div class="gs-stage"><div class="gs-vine"><\/div>'
    +IT.map(function(t){return '<button type="button" class="gs-it" data-sv="'+t[0]+'" style="left:'+(t[1]/3).toFixed(2)+'%;top:'+(t[2]/7.2).toFixed(2)+'%"><b>'+t[3]+'</b><small>'+t[4]+'</small><u></u></button>'}).join('')+'</div>';
  sb.appendChild(gs);
  window.gsVine=function(){var t=(S.prefs&&S.prefs.gfTone)||'fen';if(window.GIMG)GIMG('vine_'+t).then(function(u){if(u)gs.querySelector('.gs-vine').style.backgroundImage='url("'+u+'")'})};
  gsVine();
  var stage=gs.querySelector('.gs-stage');
  function fit(){}
  function paintSide(){
    var v=document.querySelector('.view.on'),cur=v?v.dataset.view:'home';
    gs.querySelectorAll('[data-sv]').forEach(function(b){b.classList.toggle('on',b.dataset.sv===cur)});
  }
  gs.addEventListener('click',function(e){
    var b=e.target.closest('[data-sv]');if(!b)return;
    var v=b.dataset.sv;
    if(typeof closeNav==='function')closeNav();
    if(v==='set'){if(typeof openSettings==='function')setTimeout(openSettings,60);return}
    if(typeof go==='function')go(v);
  });
  var _goV99=go;
  go=function(){var r=_goV99.apply(this,arguments);try{paintSide()}catch(e){}return r};
  window.addEventListener('resize',fit);
  var nb=document.getElementById('navBtn');if(nb)nb.addEventListener('click',function(){fit();paintSide()});
  fit();paintSide();
})();

}catch(e){console.error("[zika] v99.js",e)}
