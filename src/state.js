// 字卡传讯 · 数据层
// 存储键、全部默认值、读取和旧数据迁移、常用小工具。以前散在十几个文件里的 ensureXxx 都合到这里
'use strict';
var KEY='mj_zika_v2',TA_NAME='顾时夜';
var LIB_DEFAULT=[
['想他','今天风大，我第一反应是想告诉你。'],['想他','我刚才笑了一下，因为想到你。'],['想他','你在做什么。不用回，我就是想知道。'],
['晚安','睡了。梦里别乱跑，站在原地等我。'],['晚安','晚安。灯我关了，你那边也早点。'],
['撒娇','你今天还没理我。'],['撒娇','过来。'],['撒娇','抱一下，就一下。'],
['嘴硬','我没生气。真的。'],['嘴硬','算了，当我没说。'],
['日常','吃饭了吗。'],['日常','外面下雨了，带伞。'],['日常','看到一只猫，长得像你。'],
['信','写到这里卡住了。想说的太多，纸不够。']];

// 所有设置的默认值。回复、回信、状态、通话照 milk
var PREF_DEF={
  replyMin:3,replyMax:7,readNo:false,readNoRate:20,pokeRate:3,quoteRate:30,
  comboOn:false,comboRate:100,comboMin:2,comboMax:3,
  mailRate:100,mailMin:600,mailMax:1440,statMin:1,statMax:8,
  ringRate:25,rejectRate:35,cancelRate:30,callWall:'',
  moLikeRate:85,moCmtRate:60,moCmtMax:2,moMin:1,moMax:20,moReplyRate:70,moCover:'',moSign:'',
  dark:false,pal:{on:false,accent:'',bgA:'',bgB:''},ink:'',sub:'',fontScale:100,
  font:{id:'serif',name:'',url:''},fontFile:'',icons:{},
  wallImgs:{},walls:{},wallAll:'',wallSync:false,wallSchemes:[],wallDim:20,
  bubKind:'note',bubMe:'#b9787d',bubMeInk:'#ffffff',bubTa:'#ffffff',bubTaInk:'#3a322a',
  bubR:18,bubTail:true,bubPad:10,bubMax:78,bubShadow:true,bubTime:true,
  msgAv:false,avShape:'round',avSize:34,
  snd:true,sndKind:'bell',sndVol:60,sndPoke:true,keepAlive:false,kaMode:'quiet',
  taStatus:'',statAt:0,statNext:0,dayPin:''
};
// 「恢复 milk 默认」用的那一组
var MILK_KEYS=['replyMin','replyMax','readNo','readNoRate','pokeRate','quoteRate','mailRate','mailMin','mailMax','ringRate','rejectRate','cancelRate','statMin','statMax'];
var SPECIAL_TAGS=['信','拍一拍','状态','每日一句'];

function clone(v){return JSON.parse(JSON.stringify(v))}
function uid(){return Math.random().toString(36).slice(2,8)+Date.now().toString(36).slice(-4)}
function defaults(){
  return{me:{name:'江月棠',avatar:'🌙',img:''},ta:{name:TA_NAME,avatar:'✦',img:''},theme:'paper',style:'glass',
    cards:[],days:[],lib:LIB_DEFAULT.map(function(x){return{id:uid(),tag:x[0],text:x[1]}}),
    moments:[],mails:[],draws:[],favs:[],bubbleCSS:'',call:{reject:true,random:true},
    libOff:[],libColors:{},libEmpty:[],libOrder:[],moUnread:0,prefs:{}};
}
function _arr(o,k){if(!Array.isArray(o[k]))o[k]=[]}
function _obj(o,k){if(!o[k]||typeof o[k]!=='object'||Array.isArray(o[k]))o[k]={}}

// 读进来的数据不管多旧，都补齐成现在的样子
function fixState(S){
  var D=defaults(),k;
  if(!S||typeof S!=='object')S=D;
  ['me','ta'].forEach(function(w){
    _obj(S,w);
    for(var f in D[w])if(typeof S[w][f]!=='string')S[w][f]=D[w][f];
  });
  if(!S.ta.name||S.ta.name==='他')S.ta.name=TA_NAME;
  ['cards','days','moments','mails','draws','favs','libOff','libEmpty','libOrder'].forEach(function(f){_arr(S,f)});
  _obj(S,'libColors');_obj(S,'call');_obj(S,'prefs');
  if(!Array.isArray(S.lib)||!S.lib.length)S.lib=D.lib;
  if(typeof S.bubbleCSS!=='string')S.bubbleCSS='';
  if(typeof S.moUnread!=='number')S.moUnread=0;
  if(S.style!=='glass'&&S.style!=='solid')S.style='glass';
  S.from='me';S.autoReply=true;

  var p=S.prefs;
  // 以前夜间是一种配色，现在是单独的开关
  if(S.theme==='night'){S.theme='paper';p.dark=true}
  if(['paper','rose','sage'].indexOf(S.theme)<0)S.theme='paper';
  // 第一次换成 milk 的数时，旧的滑杆值作废
  if(!p.v19){MILK_KEYS.forEach(function(x){p[x]=PREF_DEF[x]});p.v19=1}
  if(!p.v25){if(+p.statMax===7)p.statMax=8;p.v25=1}
  for(k in PREF_DEF)if(p[k]===undefined||p[k]===null)p[k]=clone(PREF_DEF[k]);
  ['icons','wallImgs','walls','pal','font'].forEach(function(f){_obj(p,f)});
  _arr(p,'wallSchemes');
  if(!p.font.id)p.font={id:'serif',name:'',url:''};
  // 旧版只有一张主页壁纸
  if(typeof p.wall==='string'&&p.wall){var wid='w'+uid();p.wallImgs[wid]=p.wall;p.walls.home=wid}
  delete p.wall;
  // 去掉已经不用的旧字段
  ['replyRate','v9','mailInit'].forEach(function(f){if(f!=='mailInit')delete p[f]});

  S.lib.forEach(function(x){if(!x.id)x.id=uid();x.tag=String(x.tag||'未分组');x.text=String(x.text||'')});
  S.lib=S.lib.filter(function(x){return x.text.trim()});
  // 拍一拍和状态先放几句，字卡库里能改
  if(!p.v19seed){
    seedTag(S,'拍一拍',['拍了拍我的脑袋','戳了戳我的脸','捏了捏我的手','揉了揉我的头发','拽了拽我的袖子']);
    seedTag(S,'状态',['在线','想你中','在忙','发呆中','等你回消息','刚睡醒']);
    p.v19seed=1;
  }
  // 旧信件不再补回信；自己写的一律算已读
  if(!p.mailInit){S.mails.forEach(function(m){if(m.replyAt===undefined)m.replyAt=0});p.mailInit=true}
  S.mails.forEach(function(m){if(m.from!=='ta')m.read=true});
  S.moments.forEach(function(m){_arr(m,'likes');_arr(m,'comments');_arr(m,'imgs')});
  return S;
}
function seedTag(S,tag,arr){
  if(S.lib.some(function(x){return x.tag===tag})||S.libEmpty.indexOf(tag)>=0)return;
  arr.forEach(function(t){S.lib.push({id:uid(),tag:tag,text:t})});
}

var S=fixState((function(){try{return JSON.parse(localStorage.getItem(KEY)||'null')}catch(e){return null}})());
function save(){try{localStorage.setItem(KEY,JSON.stringify(S));return true}catch(e){return false}}
save();

// ── 小工具 ──
function $(id){return document.getElementById(id)}
function esc(s){return String(s).replace(/[&<>"']/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
function pad(n){return n<10?'0'+n:''+n}
function fmt(t){var d=new Date(t);return pad(d.getMonth()+1)+'-'+pad(d.getDate())+' '+pad(d.getHours())+':'+pad(d.getMinutes())}
function fmtHM(t){var d=new Date(t),n=new Date();return d.toDateString()===n.toDateString()?pad(d.getHours())+':'+pad(d.getMinutes()):fmt(t)}
function fmtDay(t){var d=new Date(t);return(d.getMonth()+1)+'月'+d.getDate()+'日'}
function ymd(){var d=new Date();return d.getFullYear()+pad(d.getMonth()+1)+pad(d.getDate())}
function tiltOf(id){var h=0;id=String(id);for(var i=0;i<id.length;i++)h=(h+id.charCodeAt(i)*7)%11;return((h-5)*0.28).toFixed(2)+'deg'}
function dayDiff(str){
  var now=new Date();now.setHours(0,0,0,0);
  var p=String(str).split('-'),d=new Date(Number(p[0]),Number(p[1])-1,Number(p[2]));
  return isNaN(d.getTime())?null:Math.round((now-d)/864e5);
}
function rnd(a,b){return a+Math.random()*(b-a)}
function pickOne(a){return a[Math.floor(Math.random()*a.length)]}
function uniqArr(a){var o=[];a.forEach(function(x){if(o.indexOf(x)<0)o.push(x)});return o}
function isHex(s){return /^#[0-9a-f]{6}$/i.test(s||'')}
function kb(n){return n>1048576?(n/1048576).toFixed(1)+' MB':Math.ceil(n/1024)+' KB'}
function taName(){return S.ta.name||TA_NAME}
function meName(){return S.me.name||'我'}

// ── 字卡池：回复只用普通分组；拍一拍、状态、每日一句、信各管各的 ──
function isSpecial(t){return SPECIAL_TAGS.indexOf(t)>=0}
function lineOff(x){return !!x.off||S.libOff.indexOf(x.tag)>=0}
function libPool(){return S.lib.filter(function(x){return !isSpecial(x.tag)&&!lineOff(x)}).map(function(x){return x.text})}
function tagPool(t){return S.lib.filter(function(x){return x.tag===t&&!lineOff(x)}).map(function(x){return x.text})}
