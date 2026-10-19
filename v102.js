try{

// v102：古风传讯页
// 顶栏、底栏垫图（跟设色转色）；底栏四个图标换成竹窗、梅瓶、鸟笼、折屏，按设色用三套预先染好的图
// 「另起一页」收进竹窗（加号）里；时间写成「午后 二点四十一」；已读改「已阅」，没读的写「未启」
// 状态写「在侧 · …」，他打字时写「正提笔」；键盘弹起时气泡区跟着变矮并贴住最底下

(function(){
  var R=document.documentElement;
  var ICON={btnPlus:'zhuchuang',btnEmo:'meiping',btnPic:'niaolong',btnSend:'pingfeng'};
  function tone(){var t=R.dataset.gt;return t==='zi'||t==='qing'?t:'fen'}
  function src(n){return 'chat/ic/'+n+'_'+tone()+'.png?v=104'}

  // ── 顶栏、底栏底图：插一层真的 div，不占用别处已经在用的 ::before ──
  function layer(host,cls){
    if(!host||host.querySelector(':scope>.'+cls))return;
    var d=document.createElement('div');d.className=cls;d.setAttribute('aria-hidden','true');
    host.insertBefore(d,host.firstChild);
  }
  layer(document.querySelector('.view[data-view="chat"] .chat-top'),'gf-tb');
  layer(document.querySelector('.chat-foot'),'gf-fb');

  // ── 另起一页：放进加号展开的格子最前面，点了打开对话列表（新开 / 翻旧的都在里面） ──
  (function(){
    var pp=$('plusp');if(!pp||$('gfNew'))return;
    var t=document.createElement('button');t.type='button';t.id='gfNew';
    t.innerHTML='<i><img alt=""></i><span>另起一页</span>';
    t.addEventListener('click',function(){
      pp.classList.remove('on');var p=$('btnPlus');if(p)p.classList.remove('on');
      if(typeof openChats==='function')openChats();
    });
    pp.insertBefore(t,pp.firstChild);
  })();

  function paintIcons(){
    Object.keys(ICON).forEach(function(id){
      var b=$(id);if(!b)return;
      var im=b.querySelector('img.gfic');
      if(!im){b.innerHTML='';im=document.createElement('img');im.className='gfic';im.alt='';b.appendChild(im)}
      var s=src(ICON[id]);if(im.getAttribute('src')!==s)im.setAttribute('src',s);
    });
    var h=document.querySelector('#gfNew img');if(h)h.setAttribute('src',src('haitang'));
  }
  paintIcons();
  new MutationObserver(paintIcons).observe(R,{attributes:true,attributeFilter:['data-gt']});

  // ── 时间：看得懂的钟点，只是写成汉字 ──
  var CN='〇一二三四五六七八九';
  function num(n){if(n<10)return CN[n];var t=Math.floor(n/10),o=n%10;return (t===1?'十':CN[t]+'十')+(o?CN[o]:'')}
  function clock(d){
    var h=d.getHours(),m=d.getMinutes();
    var seg=h<5?'凌晨':h<8?'清晨':h<11?'上午':h<13?'中午':h<17?'午后':h<19?'傍晚':'夜里';
    var hs=h%12===0?'十二':num(h%12);
    return seg+' '+hs+'点'+(m===0?'整':m<10?'〇'+CN[m]:num(m));
  }
  window.gfTime=function(t){
    var d=new Date(t),n=new Date(),y=new Date(n.getFullYear(),n.getMonth(),n.getDate()-1);
    if(d.toDateString()===n.toDateString())return clock(d);
    if(d.toDateString()===y.toDateString())return '昨日 '+clock(d);
    return num(d.getMonth()+1)+'月'+num(d.getDate())+' '+clock(d);
  };
  if(typeof pmTime==='function')pmTime=function(t){return gfTime(t)};

  // ── 已阅 / 未启 ──
  if(typeof cardEl==='function'){
    var _ce=cardEl;
    cardEl=function(c){
      var el=_ce.apply(this,arguments);
      if(!el||!el.querySelectorAll||!c)return el;
      var hd0=el.querySelector('.head');if(hd0&&c.at)hd0.querySelectorAll('span').forEach(function(x){if(!x.className&&/^\d/.test(x.textContent))x.textContent=gfTime(c.at)});
      el.querySelectorAll('.rd,.rd2').forEach(function(r){r.textContent='已阅'});
      // 便签样式的时间在 .head 里，用的是 月-日 时:分，这里也换成古风写法
      if(c.at){var hs=el.querySelectorAll('.head>span:not(.n):not(.rd)');for(var i=0;i<hs.length;i++){if(/\d{1,2}:\d{2}/.test(hs[i].textContent)){hs[i].textContent=gfTime(c.at);break}}}
      if(c.from==='me'&&!c.read&&c.type!=='poke'){
        var m=el.querySelector('.pmeta'),u=document.createElement('span');u.textContent='未启';
        if(m){u.className='rd2 gfun';m.insertBefore(u,m.firstChild)}
        else{var hd=el.querySelector('.head');if(hd){u.className='rd gfun';hd.appendChild(u)}}
      }
      return el;
    };
  }
  if(typeof openBubble==='function'){
    var _ob=openBubble;
    openBubble=function(){
      var r=_ob.apply(this,arguments),pv=$('bkPrev');
      if(pv){pv.querySelectorAll('.rd,.rd2').forEach(function(x){x.textContent='已阅'});pv.querySelectorAll('.pmeta .tm').forEach(function(x){x.textContent='夜里 七点三十一'})}
      return r;
    };
  }

  // ── 状态：在侧 · 字卡库里抽的状态；他打字时换成正提笔 ──
  var typingOn=false;
  function stText(){var s=(S.prefs&&S.prefs.taStatus)||'';return typingOn?'正提笔…':'在侧'+(s?' · '+s:'')}
  function stShow(){var el=$('taSt');if(el){el.textContent=stText();el.title=el.textContent;el.hidden=false}}
  if(typeof stPaint==='function'){var _sp=stPaint;stPaint=function(){var r=_sp.apply(this,arguments);stShow();return r}}
  if(typeof showTyping==='function'){
    var _st=showTyping;
    showTyping=function(on){
      var r=_st.apply(this,arguments);typingOn=!!on;
      var t=document.getElementById('typing');
      if(on&&t){var sp=t.querySelector('span:not(.ty-av)');if(sp)sp.textContent=taName()+' 正提笔'}
      stShow();
      return r;
    };
  }
  stShow();

  // ── 键盘弹起：页面高度已经跟着可见区域缩（kb.js），这里让气泡区贴住最底下，不被输入条挡住 ──
  (function(){
    var s=$('stream'),vv=window.visualViewport,inp=$('input');if(!s)return;
    var gap=0;
    function rec(){gap=s.scrollHeight-s.clientHeight-s.scrollTop}
    function keep(){if(gap<90)s.scrollTop=s.scrollHeight}
    s.addEventListener('scroll',rec,{passive:true});
    if(vv)vv.addEventListener('resize',function(){requestAnimationFrame(keep);setTimeout(keep,80)});
    window.addEventListener('resize',function(){requestAnimationFrame(keep)});
    if(window.ResizeObserver)new ResizeObserver(keep).observe(s);
    if(inp)inp.addEventListener('focus',function(){[0,140,320,560].forEach(function(t){setTimeout(function(){s.scrollTop=s.scrollHeight;rec()},t)})});
  })();
})();

}catch(e){console.error("[zika] v102.js",e)}

try{
// v104：加号里的格子换古风——传音（如意佩）、听曲（竹瓶），和另起一页一样按设色染色
(function(){
  var R=document.documentElement;
  function tone(){var t=R.dataset.gt;return t==='zi'||t==='qing'?t:'fen'}
  function src(n){return 'chat/ic/'+n+'_'+tone()+'.png?v=104'}
  var MAP={'语音通话':['ruyi','传音'],'传音':['ruyi','传音'],'听歌':['zhuping','听曲'],'听曲':['zhuping','听曲']};
  function paint(){
    var pp=document.getElementById('plusp');if(!pp)return;
    pp.querySelectorAll('button').forEach(function(b){
      var sp=b.querySelector('span'),i=b.querySelector('i');if(!sp||!i)return;
      var k=b.dataset.gfi||sp.textContent.trim(),m=MAP[k];if(!m)return;
      b.dataset.gfi=m[1];if(sp.textContent!==m[1])sp.textContent=m[1];
      var im=i.querySelector('img.gfic2');
      if(!im){i.innerHTML='';im=document.createElement('img');im.className='gfic2';im.alt='';i.appendChild(im)}
      var s=src(m[0]);if(im.getAttribute('src')!==s)im.setAttribute('src',s);
    });
    var h=document.querySelector('#gfNew img');if(h)h.setAttribute('src',src('haitang'));
  }
  paint();
  new MutationObserver(paint).observe(R,{attributes:true,attributeFilter:['data-gt']});
  var p=document.getElementById('btnPlus');if(p)p.addEventListener('click',paint);
})();
}catch(e){console.error("[zika] v104",e)}

try{
// v105：正提笔从底栏里挪出来，放回底栏上方；它一出现，气泡区贴住最底下
(function(){
  var t=document.getElementById('typing'),f=document.querySelector('.chat-foot'),s=document.getElementById('stream');
  if(!t||!f)return;
  if(t.parentNode===f)f.parentNode.insertBefore(t,f);
  if(s&&window.MutationObserver)new MutationObserver(function(){
    if(t.hidden)return;var g=s.scrollHeight-s.clientHeight-s.scrollTop;
    if(g<140)requestAnimationFrame(function(){s.scrollTop=s.scrollHeight});
  }).observe(t,{attributes:true,attributeFilter:['hidden']});
})();
}catch(e){console.error("[zika] v105",e)}
