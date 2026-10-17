// v12：传讯顶栏只留他的名字和状态；每句话旁边可以显示头像（设置 → 聊天里开关）
'use strict';
if(S.prefs.msgAv===undefined){S.prefs.msgAv=false;save()}

// 每张字卡外面包一层，带上头像
var _cardElV12=cardEl;
cardEl=function(c){
  var el=_cardElV12(c);
  if(!S.prefs.msgAv||!el.classList||!el.classList.contains('card'))return el;
  var me=c.from==='me';
  var row=document.createElement('div');row.className='crow '+(me?'me':'ta');
  var av=document.createElement('span');av.className='cav';setAv(av,me?S.me:S.ta);
  row.appendChild(av);row.appendChild(el);
  return row;
};
function setMsgAv(on){S.prefs.msgAv=!!on;save();renderChat()}

// 设置重新归类：聊天气泡挪到「聊天」，加头像开关
SET_GROUPS=[
  ['我们',[['openProfile','名字和头像',function(){return S.me.name+' × '+taName()}],['openDays','纪念日',function(){return S.days.length?S.days.length+' 个':'还没有'}]]],
  ['外观',[['openLook','材质与配色',function(){return S.style==='glass'?'毛玻璃':'纯色'}],['openWallSet','主页壁纸',function(){return S.prefs.wall?'已设置':'没有'}],['openIconSet','板块图标',function(){return ''}],['openFontSet','全局字体',function(){var f=FONTS.filter(function(x){return x.id===S.prefs.font.id})[0];return f?f.n:''}]]],
  ['聊天',[['sw:msgAv','每句话显示头像'],['openBubble','聊天气泡',function(){return S.bubbleCSS?'已自定义':'CSS'}],['openReplySet','回复与通话',function(){return '概率 · 时长'}],['openGroups','字卡分组',function(){return libTags().length+' 组'}]]],
  ['数据',[['openData','数据备份与导入',function(){return '也认 milk'}]]]
];
openSettings=function(){
  var w=document.createElement('div');
  SET_GROUPS.forEach(function(g){
    var h=document.createElement('div');h.className='sec';h.textContent=g[0];w.appendChild(h);
    var box=document.createElement('div');box.className='menu-list set-grp';
    g[1].forEach(function(it){
      var b=document.createElement('button');b.type='button';b.className='mi';
      if(it[0].indexOf('sw:')===0){
        var k=it[0].slice(3);b.dataset.sw=k;
        b.innerHTML='<b>'+esc(it[1])+'</b><span class="tg'+(S.prefs[k]?' on':'')+'"></span>';
      }else{
        b.dataset.fn=it[0];
        var v='';try{v=it[2]()}catch(e){}
        b.innerHTML='<b>'+esc(it[1])+'</b><span>'+esc(v)+' ›</span>';
      }
      box.appendChild(b);
    });
    w.appendChild(box);
  });
  w.addEventListener('click',function(e){
    var s=e.target.closest('[data-sw]');
    if(s){
      var k=s.dataset.sw,on=!S.prefs[k];
      if(k==='msgAv')setMsgAv(on);else{S.prefs[k]=on;save()}
      s.querySelector('.tg').classList.toggle('on',on);
      return;
    }
    var b=e.target.closest('[data-fn]');if(!b)return;
    var fn=window[b.dataset.fn];if(typeof fn!=='function')return;
    closeSheet();setTimeout(function(){fn();addBack()},80);
  });
  openSheet('设置',w);
};
renderChat();
