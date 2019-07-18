var verify={

}
verify.checkVerify=function(page){
  var app=getApp();
  app.request({
    url:"common.verify",
    data:{
      version:app.config.version
    },
    success:function(ret){
      if(ret.status!=2){
        wx.setNavigationBarTitle({
          title: '简易计算器'
        })
      }
      page.setData({
        verifyStatus:ret.status
      })
    }
  })
}
  //这个是计算器按钮点击事件
verify.toolTap=function (e,page) {
  var tool=page.data.verify_tool;
  if(typeof(tool)=="undefined"){
    page.setData({ 
      verify_tool: {
          number1: 0,
          number2: 0,
          action: null,
          clear: true,
          result: null
        }})
  } 
  var act = e.currentTarget.dataset.val;
  var isNum = parseInt(act);
  var tool = page.data.verify_tool;
  if (act >= 0 && act <= 9) {
    if (tool.result != null) {//有结果情况
      tool.result = null;
      tool.number1 = 0;
      tool.action = null;
      tool.number2 = 0;
    }
    if (tool.action == null) {//输入第一个数字
      tool.number1 = parseInt(tool.number1 + "" + act);

      page.setData({
        tool: tool
      })
    } else {
      tool.number2 = parseInt(tool.number2 + "" + act);
      page.setData({
        tool: tool
      })
    }
  } else {
    if (act == "=") {//计算
      var number1 = parseInt(tool.number1);
      var number2 = parseInt(tool.number2);

      switch (tool.action) {
        case "-":
          tool.result = number1 - number2;
          break;
        case "*":
          tool.result = number1 * number2;
          break;
        case "/":
          tool.result = number1 / number2;
          break;
        default:
          tool.result = number1 + number2;
          break;
      }
      page.setData({
        tool: tool
      })
    } else if (act == "c") {//清除
      page.setData({
        tool: {
          number1: 0,
          number2: 0,
          action: null,
          clear: true,
          result: null
        }
      })
    } else {
      tool.action = act;
      page.setData({
        tool: tool
      })
    }
  }
}
module.exports=verify;