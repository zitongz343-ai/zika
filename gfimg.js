// v110：传讯页顶栏底栏、信封、信纸的图——改成小一点的 webp，第一次下载后存进浏览器缓存，以后打开直接从手机里读，不再每次走网络
(function(){
  try{
    var R=document.documentElement,CK='zika-gf110',memo={};
    var SET={tb:'chat/w/top_',fb:'chat/w/foot_',env:'mail/w/env_',paper:'mail/w/paper_'};
    function tone(){
      var t=R.dataset.gt;
      if(!t){try{var S=JSON.parse(localStorage.getItem('mj_zika_v2')||'null');t=(S&&S.prefs&&S.prefs.gfTone)||(S&&S.theme==='mist'?'zi':'fen')}catch(e){}}
      return t==='zi'||t==='qing'?t:'fen';
    }
    function get(u){
      if(memo[u])return memo[u];
      var p;
      if(window.caches&&window.fetch&&location.protocol!=='file:'){
        p=caches.open(CK).then(function(c){return c.match(u).then(function(r){
          if(r)return r.blob();
          return fetch(u).then(function(r2){if(!r2.ok)throw 0;c.put(u,r2.clone()).catch(function(){});return r2.blob()});
        })}).then(function(b){return URL.createObjectURL(b)}).catch(function(){return u});
      }else p=Promise.resolve(u);
      memo[u]=p;return p;
    }
    var cur='';
    function apply(){
      var t=tone();if(t===cur)return;cur=t;
      Object.keys(SET).forEach(function(k){
        get(SET[k]+t+'.webp?v=110').then(function(b){if(cur===t)R.style.setProperty('--gf-'+k,'url("'+b+'")')});
      });
    }
    apply();
    if(window.MutationObserver)new MutationObserver(apply).observe(R,{attributes:true,attributeFilter:['data-gt']});
    window.gfImg=get;
  }catch(e){}
})();
