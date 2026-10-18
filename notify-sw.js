// 只管系统通知：点通知回到页面并跳到对应板块。不缓存任何东西，不影响更新
self.addEventListener('install',function(){self.skipWaiting()});
self.addEventListener('activate',function(e){e.waitUntil(self.clients.claim())});
self.addEventListener('notificationclick',function(e){
  e.notification.close();
  var to=(e.notification.data&&e.notification.data.to)||'chat';
  e.waitUntil(self.clients.matchAll({type:'window',includeUncontrolled:true}).then(function(cs){
    for(var i=0;i<cs.length;i++){
      try{cs[i].postMessage({zika:'go',to:to})}catch(err){}
      if('focus' in cs[i])return cs[i].focus();
    }
    if(self.clients.openWindow)return self.clients.openWindow('./?go='+to);
  }));
});
