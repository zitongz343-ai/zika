/* ===== js/v89.js ===== */
try{

// 图片搞进大仓以后，设置里那排容量话得重写：文字和图分开算

var _odV89=openData;
openData=function(){
  _odV89();
  var p=sheetBody&&sheetBody.querySelector('.hint');
  if(!p)return;
  var ZM=window.ZikaMedia||{},m=ZM.stats?ZM.stats():{ok:false,count:0,bytes:0};
  var raw=ZM.rawSize?ZM.rawSize():0;
  p.innerHTML='现在存着 '+S.cards.length+' 张字卡记录、'+S.lib.length+' 句字卡库，文字占 '+kb(raw)+'。<br>'
    +(m.ok
      ?'表情包、壁纸、头像、照片一共 '+m.count+' 张，占 '+kb(m.bytes)+'，存在图片大仓里，不挤文字的位置。'
      :'图片大仓没打开，图还和文字挤在一起，存不下是正常的。换浏览器或者关掉无痕模式再试。')
    +'<br>导出的备份里图是展开的，换手机、换浏览器都能导回来。milk 的全量备份（.json 或 .zip）能导入字卡分组、聊天记录、名字头像、纪念日和主页壁纸。';
};

}catch(e){console.error("[zika] js/v89.js",e)}
