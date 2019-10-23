var tools = {}
tools.initPage=function(page,pagename){
  if(typeof(pagename)=="undefined")pagename="pagnation";
  var data={};
  data[pagename]={
    page:0,
    limit:30,
    pagecount:1
  }
  page.setData(data)
}
tools.nextPage=function(page,pagename){
  if (typeof (pagename) == "undefined") pagename = "page";
  var data = {};
  var pag = typeof(page.data[pagename])!='undefined'?page.data[pagename]:null;
  if (pag == undefined || pag == null){
    console.log("分页变量设置错误")
    return false;
  }
  if (pag.page < pag.pagecount) {
    pag.page++;
    page.setData({
      page: pag
    }); 
    return true;
  } else {
    return false;
  }
  data[pagename] = {
    page: 0,
    limit: 30,
    pagecount: 1
  }
  page.setData(data)
}
tools.compareVersion = function (v0, v1) { //如果v1>v0返回1，v1<=v2返回0

  let vr1 = v1.split(".");
  let vr0 = v0.split(".");
  if (parseInt(vr1[0]) > parseInt(vr0[0])) {
    return 1;
  } else if (parseInt(vr1[0]) < parseInt(vr0[0])) {
    return 0;
  } else {
    if (parseInt(vr1[1]) > parseInt(vr0[1])) {
      return 1;
    } else if (parseInt(vr1[1]) < parseInt(vr0[1])) {
      return 0;
    } else {
      if (parseInt(vr1[2]) > parseInt(vr0[2])) {
        return 1;
      } else if (parseInt(vr1[2]) < parseInt(vr0[2])) {
        return 0;
      } else {
        return 1;
      }
    }
  }
}
tools.toolTap = function (page, e) {
  //计算器点击事件
  var act = e.currentTarget.dataset.val;
  var isNum = parseInt(act);
  var tool = page.data.tool;
  if (act >= 0 && act <= 9) {
    if (tool.result != null) {//有结果情况
      tool.result = null;
      tool.number1 = 0;
      tool.action = null;
      tool.number2 = 0;
    }
    if (tool.action == null) {//输入第一个数字
      tool.number1 = parseInt(tool.number1 + "" + act);

      this.setData({
        tool: tool
      })
    } else {
      tool.number2 = parseInt(tool.number2 + "" + act);
      this.setData({
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
tools.canvasRaduis = function (ctx, x, y, w, h, r, linecolor = "#FFFFFF", bgcolor = "#FFFFFF") {
  if (w < 2 * r) { r = w / 2; }
  if (h < 2 * r) { r = h / 2; }
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
  ctx.fill(bgcolor);
  ctx.setStrokeStyle(linecolor);
  ctx.stroke();
}
tools.canvasText = function (str, width, ctx, initX, initY, lineHeight) {
  // var strWidth = ctx.measureText(str);
  // let rows = Math.floor(strWidth/width);
  // if (strWidth%width>0){rows++};
  // for (let i = 0; i < str.length; i++) {

  // }
  var lineWidth = 0;
  var canvasWidth = width;
  console.log(canvasWidth);
  var lastSubStrIndex = 0;
  for (let i = 0; i < str.length; i++) {
    lineWidth += ctx.measureText(str[i]).width;

    if (lineWidth > canvasWidth - initX) {//减去initX,防止边界出现的问题
      ctx.fillText(str.substring(lastSubStrIndex, i), initX, initY);
      initY += lineHeight;
      lineWidth = 0;
      lastSubStrIndex = i;
    }
    if (i == str.length - 1) {
      console.log(str.substring(lastSubStrIndex, i + 1) + "  " + initX + "  " + initY)
      ctx.fillText(str.substring(lastSubStrIndex, i + 1), initX, initY);
    }
  }
}
//加法函数，用来得到精确的加法结果  
tools.jia = function (arg1, arg2) {
  var r1, r2, m;
  try { r1 = arg1.toString().split(".")[1].length } catch (e) { r1 = 0 }
  try { r2 = arg2.toString().split(".")[1].length } catch (e) { r2 = 0 }
  m = Math.pow(10, Math.max(r1, r2));
  return (arg1 * m + arg2 * m) / m;

}
//乘法函数，用来得到精确的乘法结果    
tools.cheng = function (arg1, arg2) {
  var m = 0, s1 = arg1.toString(), s2 = arg2.toString();
  try { m += s1.split(".")[1].length } catch (e) { }
  try { m += s2.split(".")[1].length } catch (e) { }
  return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
}
//除法函数，用来得到精确的加法结果 
// a/b=chu(a,b)   
tools.chu = function (arg1, arg2) {
  var t1 = 0, t2 = 0, r1, r2;
  try { t1 = arg1.toString().split(".")[1].length } catch (e) { }
  try { t2 = arg2.toString().split(".")[1].length } catch (e) { }
  r1 = Number(arg1.toString().replace(".", ""))
  r2 = Number(arg2.toString().replace(".", ""))
  return (r1 / r2) * Math.pow(10, t2 - t1);

}
//减法函数   a-b=jian(a,b)
tools.jian = function (arg2, arg1) {
  var r1, r2, m, n;
  try { r1 = arg1.toString().split(".")[1].length } catch (e) { r1 = 0 }
  try { r2 = arg2.toString().split(".")[1].length } catch (e) { r2 = 0 }
  m = Math.pow(10, Math.max(r1, r2));
  //lastmodifybydeeka  
  //动态控制精度长度  
  n = (r1 >= r2) ? r1 : r2;
  return ((arg2 * m - arg1 * m) / m).toFixed(n);
}
tools.rand=function(min,max){
  return parseInt(Math.random() * (max - min + 1) + min, 10)
}
tools.randChar=function(len,fuhao){
  var arr="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789,.?:[]!@#$%^&*()_+=-";
  var max=61;
  if(typeof(fuhao)!="undefined")max=82;
  len=(len==undefined||!parseInt(len))?10:len;
  var str=""; 
  for(var i =0;i<len;i++){
    str += arr[this.rand(0, max)];  
  }
  return str;
}
module.exports = tools