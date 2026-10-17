// 开屏随机文案，取自 milk 的 WELCOME_ANIMATIONS
var SPLASH_LINES=[
['Love','若要由我来谈论爱的话'],
['Echo','听见我的回音了吗'],
['Soulmate','灵魂正在共振'],
['Melody','心跳的旋律为你奏响'],
['Destiny','命运的红线将我们相连'],
['Memory','创造属于我们的回忆'],
['∞','无限循环的思念'],
['Serendipity','最美丽的意外'],
['Paracosm','共同构建的私宇宙'],
['Kiss','未说出口的告白'],
['Lucky','此生最大的幸运'],
['Comet','划过天际的相遇'],
['Étoile','你是我唯一的星辰'],
['Aurore','黎明前的极光']
];
(function(){
  var p=SPLASH_LINES[Math.floor(Math.random()*SPLASH_LINES.length)];
  var m=document.querySelector('.sp-mark'),t=document.querySelector('.sp-title');
  if(m)m.textContent=p[0];
  if(t)t.textContent=p[1];
})();
