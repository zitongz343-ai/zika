try{

// v109：音乐条加「上一首」；称谓与小像改成两张名帖；提示音去掉；通知分「应用外 / 应用内」
(function(){
  // 提示音从设置里拿掉了，升级时顺手关掉，免得响了关不掉
  if(!S.prefs.v109){S.prefs.snd=false;S.prefs.v109=1;save()}

  // ── 音乐条：在播放键前面补一个上一首 ──
  function muPrev(){
    var el=document.getElementById('muNow');if(!el||el.querySelector('[data-mu="prev"]'))return;
    var tg=el.querySelector('[data-mu="toggle"]');if(!tg)return;
    var b=document.createElement('button');b.type='button';b.dataset.mu='prev';b.setAttribute('aria-label','上一首');
    b.innerHTML=(typeof MI==='object'&&MI.prev)?MI.prev:'\u2039';
    el.insertBefore(b,tg);
  }
  muPrev();
  if(typeof muPaintNow==='function'){var _mp=muPaintNow;muPaintNow=function(){var r=_mp.apply(this,arguments);muPrev();return r}}

  // ── 称谓与小像：两张名帖，中间一枚「同心」 ──
  function e3(s){return String(s==null?'':s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
  function pfAv(k){var o=S[k]||{};return o.img?'<img src="'+e3(o.img)+'" alt="">':e3(o.avatar||(k==='me'?'\ud83c\udf19':'\u2726'))}
  function card(k,who){
    return '<div class="gfpf-card"><div class="who">'+who+'</div><div class="av" data-gfav="'+k+'" data-gfpick="'+k+'" role="button" aria-label="换小像">'+pfAv(k)+'</div>'
      +'<div class="fld"><label>称 谓</label><input data-gfnm="'+k+'" maxlength="12"></div>'
      +'<div class="fld s"><label>无小像时</label><input data-gfsy="'+k+'" maxlength="4"></div></div>';
  }
  openProfile=function(){
    var w=document.createElement('div');w.className='gfpf';
    w.innerHTML='<div class="gfpf-tie">'+card('me','我')+'<div class="gfpf-knot"><i></i><span>同心</span><i></i></div>'+card('ta','他')+'</div>'
      +'<button type="button" class="gfpf-ok" data-gfok="1">收 好</button>'
      +'<button type="button" class="gfpf-lnk" data-gfno="1">小像都换回符号</button>';
    w.querySelector('[data-gfnm="me"]').value=S.me.name||'';
    w.querySelector('[data-gfnm="ta"]').value=S.ta.name||'';
    w.querySelector('[data-gfsy="me"]').value=S.me.avatar||'';
    w.querySelector('[data-gfsy="ta"]').value=S.ta.avatar||'';
    w.addEventListener('click',function(e){
      var p=e.target.closest('[data-gfpick]');
      if(p){if(typeof pickAvatar==='function')pickAvatar(p.dataset.gfpick);return}
      if(e.target.closest('[data-gfok]')){
        var dn=typeof TA_NAME==='string'?TA_NAME:'顾时夜';
        S.me.name=(w.querySelector('[data-gfnm="me"]').value||'我').trim().slice(0,12);
        S.ta.name=(w.querySelector('[data-gfnm="ta"]').value||dn).trim().slice(0,12);
        S.me.avatar=(w.querySelector('[data-gfsy="me"]').value||'\ud83c\udf19').trim().slice(0,4);
        S.ta.avatar=(w.querySelector('[data-gfsy="ta"]').value||'\u2726').trim().slice(0,4);
        save();paintNames();if(typeof renderHome==='function')renderHome();if(typeof renderChat==='function')renderChat();closeSheet();return;
      }
      if(e.target.closest('[data-gfno]')){
        if(confirm('把两张小像都去掉？')){S.me.img='';S.ta.img='';save();paintNames();if(typeof renderMoments==='function')renderMoments()}
      }
    });
    openSheet('名字和头像',w);
  };
  // 换完照片，名帖上的小像跟着换
  var _pnG=paintNames;
  paintNames=function(){
    var r=_pnG.apply(this,arguments);
    document.querySelectorAll('[data-gfav]').forEach(function(a){a.innerHTML=pfAv(a.dataset.gfav)});
    return r;
  };

  // ── 通知：两节改名「应用外通知」「应用内横幅」 ──
  if(typeof openBanSet==='function'){
    var _ob=openBanSet;
    openBanSet=function(){
      var r=_ob.apply(this,arguments);
      try{
        var M={'系统通知':'应用外通知','页面里的横幅':'应用内横幅'};
        document.querySelectorAll('#sheetBody .sec').forEach(function(s){var t=s.textContent.trim();if(M[t])s.textContent=M[t]});
      }catch(e){}
      return r;
    };
  }
})();

}catch(e){console.error("[zika] v109.js",e)}
