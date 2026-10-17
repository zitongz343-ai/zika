// v27：纪念日换个样子。一个日子一张卡，点进去单独一页改；能选每年倒数（生日那种）；能选主页数哪一个
'use strict';
var _nearV27=nearDay;
function dyNext(d){
  var p=String(d.date).split('-'),now=new Date();now.setHours(0,0,0,0);
  var t=new Date(now.getFullYear(),Number(p[1])-1,Number(p[2]));
  if(isNaN(t.getTime()))return null;
  if(t<now)t.setFullYear(t.getFullYear()+1);
  return Math.round((t-now)/864e5);
}
function dyInfo(d){
  var n=dayDiff(d.date);if(n===null)return{num:'—',unit:'',label:''};
  if(d.kind==='yearly'){
    var k=dyNext(d);if(k===null)return{num:'—',unit:'',label:''};
    return k===0?{num:'今天',unit:'',label:''}:{num:k,unit:'天',label:'还有'};
  }
  if(n>=0)return{num:n+1,unit:'天',label:'第'};
  return{num:-n,unit:'天',label:'还有'};
}
function dyText(d){
  var i=dyInfo(d);
  if(i.num==='今天')return d.title+' · 就是今天';
  if(i.num==='—')return d.title;
  return d.title+' · '+(i.label==='第'?'第 '+i.num+' 天':'还有 '+i.num+' 天');
}
function dyHomeId(){
  var pin=S.prefs.dayPin;
  if(pin&&S.days.some(function(d){return d.id===pin}))return pin;
  var nd=_nearV27();return nd?nd.item.id:'';
}
nearDay=function(){
  var id=dyHomeId();if(!id)return null;
  var it=S.days.filter(function(d){return d.id===id})[0];
  return it?{item:it,n:dayDiff(it.date)}:null;
};
dayText=function(nd){return dyText(nd.item)};

function dyFull(){if(!sheet.hidden)sheet.classList.add('full')}
function dyBack(){openDays();if(typeof addBack==='function')addBack();dyFull()}
function dyFmt(s){var p=String(s).split('-');return p.length===3?p[0]+'.'+p[1]+'.'+p[2]:s}

openDays=function(){
  var w=document.createElement('div');w.className='v27';
  var home=dyHomeId();
  if(!S.days.length){
    w.innerHTML='<div class="empty"><b>还没有日子</b>记下在一起的那天，<br>主页会一直替你数着。</div>';
  }else{
    w.innerHTML='<div class="v27-list">'+S.days.map(function(d){
      var i=dyInfo(d);
      return '<button type="button" class="v27-d" data-id="'+esc(d.id)+'"><div class="l"><b>'+esc(d.title)+(d.id===home?'<span class="v27-tag">主页</span>':'')+'</b><span>'+esc(dyFmt(d.date))+' · '+(d.kind==='yearly'?'每年倒数':'从那天数起')+'</span></div>'
        +'<div class="r">'+(i.label?'<em>'+i.label+'</em>':'')+'<strong>'+esc(String(i.num))+'</strong>'+(i.unit?'<i>'+i.unit+'</i>':'')+'</div></button>';
    }).join('')+'</div>';
  }
  var add=document.createElement('button');add.type='button';add.className='primary v27-add';add.textContent='＋ 记一个日子';
  add.addEventListener('click',function(){dyForm(null)});
  w.appendChild(add);
  var h=document.createElement('p');h.className='hint';h.textContent='点一个日子可以改名字、改日期、删掉，也能选主页上数哪一个。';w.appendChild(h);
  w.addEventListener('click',function(e){
    var b=e.target.closest('[data-id]');if(!b)return;
    var d=S.days.filter(function(x){return x.id===b.dataset.id})[0];if(d)dyForm(d);
  });
  openSheet('纪念日',w);
};

function dyForm(d){
  var isNew=!d,kind=d&&d.kind==='yearly'?'yearly':'up';
  var w=document.createElement('div');w.className='v27';
  w.innerHTML='<button type="button" class="sh-back" id="dyBk">‹ 纪念日</button>'
    +'<div class="field"><label>名字</label><input id="dyT" maxlength="16" placeholder="在一起"></div>'
    +'<div class="field"><label>那天</label><input id="dyD" type="date"></div>'
    +'<div class="field"><label>怎么数</label><div class="seg" id="dyK"><button type="button" data-k="up">从那天数起</button><button type="button" data-k="yearly">每年倒数</button></div></div>'
    +'<p class="hint" id="dyH" style="margin:-6px 0 14px"></p>'
    +'<label class="l4-swrow"><span>显示在主页</span><input type="checkbox" id="dyPin"><i class="l4-tg"></i></label>'
    +'<button type="button" class="primary" id="dyOk" style="width:100%;height:48px">'+(isNew?'记 下':'收 好')+'</button>'
    +(isNew?'':'<button type="button" class="ghost v27-del" id="dyDel">删掉这个日子</button>');
  var t=w.querySelector('#dyT'),dt=w.querySelector('#dyD'),pin=w.querySelector('#dyPin');
  if(d){t.value=d.title;dt.value=d.date}
  pin.checked=isNew?!S.days.length:dyHomeId()===d.id;
  function paintK(){
    w.querySelectorAll('#dyK [data-k]').forEach(function(b){b.classList.toggle('on',b.dataset.k===kind)});
    w.querySelector('#dyH').textContent=kind==='yearly'?'生日这种每年都有的，数到下一次还有几天。':'过去的日子数第几天，还没到的数还有几天。';
  }
  w.querySelector('#dyK').addEventListener('click',function(e){var b=e.target.closest('[data-k]');if(!b)return;kind=b.dataset.k;paintK()});
  w.querySelector('#dyBk').addEventListener('click',dyBack);
  w.querySelector('#dyOk').addEventListener('click',function(){
    var tt=t.value.trim(),dd=dt.value;
    if(!tt||!dd){alert('名字和日期都填一下。');return}
    var item=d;
    if(isNew){item={id:uid(),title:tt.slice(0,16),date:dd,kind:kind};S.days.push(item)}
    else{item.title=tt.slice(0,16);item.date=dd;item.kind=kind}
    if(pin.checked)S.prefs.dayPin=item.id;
    else if(S.prefs.dayPin===item.id)S.prefs.dayPin='';
    save();renderHome();updateNav();dyBack();
  });
  var del=w.querySelector('#dyDel');
  if(del)del.addEventListener('click',function(){
    if(!confirm('删掉「'+d.title+'」？'))return;
    S.days=S.days.filter(function(x){return x.id!==d.id});
    if(S.prefs.dayPin===d.id)S.prefs.dayPin='';
    save();renderHome();updateNav();dyBack();
  });
  paintK();
  openSheet(isNew?'记一个日子':'改一下',w);dyFull();
}

SET_GROUPS.forEach(function(g){g[1].forEach(function(i){
  if(i[0]==='openDays')i[2]=function(){var nd=nearDay();return nd?dyText(nd.item):'还没有'};
})});
renderHome();updateNav();
