try{

// v101：古风设置页
// 设色三种（桃夭 / 紫藤 / 天青），底图、字色、绿枝、花瓣一起换
// 其余只留：称谓与小像、岁时、尺素往来、提示音、曲库、长明、封存与启封
// 点进去的子页面改名字，样子在 v101.css 里统一改成古风

(function(){
  var TONES={
    fen:{n:'桃夭',d:'灼灼其华',theme:'rose',accent:'#c27a86',bgA:'#fbf1f2',bgB:'#f3dfe3',ink:'#5a4a52',sub:'#a08890',dot:'linear-gradient(135deg,#f6d6dc,#c27a86)'},
    zi:{n:'紫藤',d:'挂云而垂',theme:'rose',accent:'#7f78b4',bgA:'#f5f2fb',bgB:'#e6e0f3',ink:'#4e4766',sub:'#9590b0',dot:'linear-gradient(135deg,#e3dcf3,#7f78b4)'},
    qing:{n:'天青',d:'雨过云破',theme:'mist',accent:'#5f86a6',bgA:'#f1f5f9',bgB:'#dde7ef',ink:'#3f5160',sub:'#8597a6',dot:'linear-gradient(135deg,#d8e5ef,#5f86a6)'}
  };
  function setTone(t){
    var o=TONES[t]?TONES[t]:TONES.fen,p=S.prefs;
    p.gfTone=TONES[t]?t:'fen';
    p.pal={on:true,accent:o.accent,bgA:o.bgA,bgB:o.bgB};
    p.ink=o.ink;p.sub=o.sub;p.dark=false;
    if(typeof LOOK_T==='object'&&LOOK_T[o.theme])S.theme=o.theme;
    save();
    if(typeof applyLook==='function')applyLook();
  }
  window.gfSetTone=setTone;
  // 第一次升级：原来是雾蓝的接着用紫藤（之前主页就是紫的底图），其余桃夭
  if(!S.prefs.gfTone)setTone(S.theme==='mist'?'zi':'fen');

  var GROUPS=[
    ['同心','US',[
      ['openProfile','称谓与小像','传讯页上的名字和头像',function(){return (S.me.name||'我')+' × '+taName()}],
      ['openDays','岁时','纪念日',function(){return S.days&&S.days.length?S.days.length+' 个':'还没有'}]]],
    ['鱼雁','REPLIES',[
      ['openReplySet','尺素往来','回信快慢、已读不回、拍一拍、主动找你',function(){return '概率 · 时长'}]]],
    ['檐铃','CHIME',[
      ['openSndSet','提示音','他来信时响一声',function(){if(!S.prefs.snd)return '关';var k=(typeof SND==='object')&&(SND[S.prefs.sndKind]||SND.bell);return k&&k.n||'开'}]]],
    ['丝竹','MUSIC',[
      ['openMuSet','曲库','QQ 音乐',function(){return typeof muOk==='function'&&muOk()?'已填':'没填'}]]],
    ['锦匣','STORAGE',[
      ['openKaSet','长明','后台保活',function(){return S.prefs.keepAlive?'开':'关'}],
      ['openData','封存与启封','数据备份与导入',function(){return '也认 milk'}]]]
  ];
  function e2(s){return String(s==null?'':s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
  function hd(b,s){return '<div class="gfs-hd"><b>'+b+'</b><span>'+s+'</span><i></i></div>'}
  function body(){
    var cur=S.prefs.gfTone||'fen';
    var h='<section class="gfs-sec">'+hd('设色','PALETTE')+'<div class="gfs-box"><div class="gfs-sw">'
      +Object.keys(TONES).map(function(k){var o=TONES[k];
        return '<button type="button" data-gtone="'+k+'"'+(k===cur?' class="on"':'')+'><span class="dot" style="background:'+o.dot+'"></span><b>'+o.n+'</b><small>'+o.d+'</small><span class="seal">选</span></button>'}).join('')
      +'</div></div></section>';
    GROUPS.forEach(function(g){
      var rows=g[2].filter(function(it){return typeof window[it[0]]==='function'});
      if(!rows.length)return;
      h+='<section class="gfs-sec">'+hd(g[0],g[1])+'<div class="gfs-box">'+rows.map(function(it){
        var v='';try{v=it[3]()}catch(e){}
        return '<button type="button" class="gfs-row" data-fn="'+it[0]+'"><span class="t"><b>'+it[1]+'</b><small>'+it[2]+'</small></span><em>'+e2(v)+'</em></button>';
      }).join('')+'</div></section>';
    });
    return h;
  }

  // 设置首页：沿用原来的打开方式（全屏、返回记位置），只把里面换成这一套
  var _osG=openSettings;
  openSettings=function(){
    var r=_osG.apply(this,arguments);
    try{
      var g=sheetBody.querySelector('.set-grp'),w=g&&g.parentNode;
      if(w){
        w.className='gfs';w.innerHTML=body();
        w.addEventListener('click',function(e){
          var b=e.target.closest('[data-gtone]');if(!b)return;
          setTone(b.dataset.gtone);
          w.querySelectorAll('[data-gtone]').forEach(function(x){x.classList.toggle('on',x===b)});
        });
      }
    }catch(e){console.error('[zika] v101 settings',e)}
    return r;
  };

  // 子页面的标题换成古风的名字
  var TT={'名字和头像':'称谓与小像','纪念日':'岁时','回复与通话':'尺素往来','回复 · 回信 · 通话':'尺素往来','提示音':'提示音','后台保活':'长明','数据备份与导入':'封存与启封','QQ 音乐':'曲库'};
  var _shG=openSheet;
  openSheet=function(t,n){return _shG.call(this,TT[t]||t,n)};
})();

}catch(e){console.error("[zika] v101.js",e)}
