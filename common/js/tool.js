var tools = {}
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
tools.city2cn = function (str) {

  var citys = { "Beijing": "北京", "Tianjin": "天津", "Shanghai": "上海", "Chongqing": "重庆", "Yinchuan": "银川", "Shizuishan": "石嘴山", "Wuzhong": "吴忠", "Guyuan": "固原", "Zhongwei": "中卫", "Wulumuqi": "乌鲁木齐", "Kelamayi": "克拉玛依", "Lasa": "拉萨", "Huhehaote": "呼和浩特", "Baotou": "包头", "Wuhai": "乌海", "Chifeng": "赤峰", "Tongliao": "通辽", "Eerduosi": "鄂尔多斯", "Hulunbeier": "呼伦贝尔", "Bayannaoer": "巴彦淖尔", "Wulanchabu": "乌兰察布", "Nanning": "南宁", "Liuzhou": "柳州", "Guilin": "桂林", "Wuzhou": "梧州", "Beihai": "北海", "Chongzuo": "崇左", "Laibin": "来宾", "Hezhou": "贺州", "Yulin": "玉林", "Baise": "百色", "Hechi": "河池", "Qinzhou": "钦州", "Fangchenggang": "防城港", "Guigang": "贵港", "Haerbin": "哈尔滨", "Daqing": "大庆", "Qiqihaer": "齐齐哈尔", "Jiamusi": "佳木斯", "Jixi": "鸡西", "Hegang": "鹤岗", "Shuangyashan": "双鸭山", "Mudanjiang": "牡丹江", "Yichun": "伊春", "Qitaihe": "七台河", "Heihe": "黑河", "Suihua": "绥化", "Changchun": "长春", "Jilin": "吉林", "Siping": "四平", "Liaoyuan": "辽源", "Tonghua": "通化", "Baishan": "白山", "Songyuan": "松原", "Baicheng": "白城", "Shenyang": "沈阳", "Dalian": "大连", "Anshan": "鞍山", "Fushun": "抚顺", "Benxi": "本溪", "Dandong": "丹东", "Jinzhou": "锦州", "Yingkou": "营口", "Fuxin": "阜新", "Liaoyang": "辽阳", "Panjin": "盘锦", "Tieling": "铁岭", "Chaoyang": "朝阳", "Huludao": "葫芦岛", "Shijiazhuang": "石家庄", "Tangshan": "唐山", "Handan": "邯郸", "Qinghuangdao": "秦皇岛", "Baoding": "保定", "Zhangjiakou": "张家口", "Chengde": "承德", "Langfang": "廊坊", "Cangzhou": "沧州", "Hengshui": "衡水", "Xingtai": "邢台", "Jinan": "济南", "Qingdao": "青岛", "Zibo": "淄博", "Zaozhuang": "枣庄", "Dongying": "东营", "Yantai": "烟台", "Weifang": "潍坊", "Jining": "济宁", "Taian": "泰安", "Weihai": "威海", "Rizhao": "日照", "Laiwu": "莱芜", "Linyi": "临沂", "Dezhou": "德州", "Liaocheng": "聊城", "Heze": "菏泽", "Binzhou": "滨州", "Nanjing": "南京", "Zhenjiang": "镇江", "Changzhou": "常州", "Wuxi": "无锡", "Suzhou": "苏州", "Xuzhou": "徐州", "Lianyungang": "连云港", "Huaian": "淮安", "Yancheng": "盐城", "Yangzhou": "扬州", "Taizhou": "泰州", "Nantong": "南通", "Suqian": "宿迁", "Hefei": "合肥", "Bengbu": "蚌埠", "Wuhu": "芜湖", "Huainan": "淮南", "Bozhou": "亳州", "Fuyang": "阜阳", "Huaibei": "淮北", "Suzhou": "宿州", "Chuzhou": "滁州", "Anqing": "安庆", "Chaohu": "巢湖", "Maanshan": "马鞍山", "Xuancheng": "宣城", "Huangshan": "黄山", "Chizhou": "池州", "Tongling": "铜陵", "Hangzhou": "杭州", "Jiaxing": "嘉兴", "Huzhou": "湖州", "Ningbo": "宁波", "Jinhua": "金华", "Wenzhou": "温州", "Lishui": "丽水", "Shaoxing": "绍兴", "Quzhou": "衢州", "Zhoushan": "舟山", "Taizhou": "台州", "Fuzhou": "福州", "Xiamen": "厦门", "Quanzhou": "泉州", "Sanming": "三明", "Nanping": "南平", "Zhangzhou": "漳州", "Putian": "莆田", "Ningde": "宁德", "Longyan": "龙岩", "Guangzhou": "广州", "Shenzhen": "深圳", "Shantou": "汕头", "Huizhou": "惠州", "Zhuhai": "珠海", "Jieyang": "揭阳", "Foshan": "佛山", "Heyuan": "河源", "Yangjiang": "阳江", "Maoming": "茂名", "Zhanjiang": "湛江", "Meizhou": "梅州", "Zhaoqing": "肇庆", "Shaoguan": "韶关", "Chaozhou": "潮州", "Dongguan": "东莞", "Zhongshan": "中山", "Qingyuan": "清远", "Jiangmen": "江门", "Shanwei": "汕尾", "Yunfu": "云浮", "Haikou": "海口", "Sanya": "三亚", "Kunming": "昆明", "Qujing": "曲靖", "Yuxi": "玉溪", "Baoshan": "保山", "Zhaotong": "昭通", "Lijiang": "丽江", "Puer": "普洱", "Lincang": "临沧", "Guiyang": "贵阳", "Liupanshui": "六盘水", "Zunyi": "遵义", "Anshun": "安顺", "Chengdu": "成都", "Mianyang": "绵阳", "Deyang": "德阳", "Guangyuan": "广元", "Zigong": "自贡", "Panzhihua": "攀枝花", "Leshan": "乐山", "Nanchong": "南充", "Neijiang": "内江", "Suining": "遂宁", "Guangan": "广安", "Luzhou": "泸州", "Dazhou": "达州", "Meishan": "眉山", "Yibin": "宜宾", "Yaan": "雅安", "Ziyang": "资阳", "Changsha": "长沙", "Zhuzhou": "株洲", "Xiangtan": "湘潭", "Hengyang": "衡阳", "Yueyang": "岳阳", "Chenzhou": "郴州", "Yongzhou": "永州", "Shaoyang": "邵阳", "Huaihua": "怀化", "Changde": "常德", "Yiyang": "益阳", "Zhangjiajie": "张家界", "Loudi": "娄底", "Wuhan": "武汉", "Xiangfan": "襄樊", "Yichang": "宜昌", "Huangshi": "黄石", "Ezhou": "鄂州", "Suizhou": "随州", "Jingzhou": "荆州", "Jingmen": "荆门", "Shiyan": "十堰", "Xiaogan": "孝感", "Huanggang": "黄冈", "Xianning": "咸宁", "Zhengzhou": "郑州", "Luoyang": "洛阳", "Kaifeng": "开封", "Luohe": "漯河", "Anyang": "安阳", "Xinxiang": "新乡", "Zhoukou": "周口", "Sanmenxia": "三门峡", "Jiaozuo": "焦作", "Pingdingshan": "平顶山", "Xinyang": "信阳", "Nanyang": "南阳", "Hebi": "鹤壁", "Puyang": "濮阳", "Xuchang": "许昌", "Shangqiu": "商丘", "Zhumadian": "驻马店", "Taiyuan": "太原", "DaTong": "大同", "Xinzhou": "忻州", "Yangquan": "阳泉", "Changzhi": "长治", "Jincheng": "晋城", "Shuozhou": "朔州", "Jinzhong": "晋中", "Yuncheng": "运城", "Linfen": "临汾", "Lvliang": "吕梁", "Xian": "西安", "Xianyang": "咸阳", "Tongchuan": "铜川", "Yanan": "延安", "Baoji": "宝鸡", "Weinan": "渭南", "Hanzhoung": "汉中", "Ankang": "安康", "Shangluo": "商洛", "Yulin": "榆林", "Lanzhou": "兰州", "Tianshui": "天水", "Pingliang": "平凉", "Jiuquan": "酒泉", "Jiayuguan": "嘉峪关", "Jinchang": "金昌", "baiyiin": "白银", "Wuwei": "武威", "Zhangye": "张掖", "Qingyang": "庆阳", "Dingxi": "定西", "Longnan": "陇南", "Xining": "西宁", "Nanchang": "南昌", "Jiujiang": "九江", "Ganzhou": "赣州", "Jian": "吉安", "Yingtan": "鹰潭", "Shangrao": "上饶", "Pingxiang": "萍乡", "Jingdezhen": "景德镇", "Xinyu": "新余", "Yichun": "宜春", "Fuzhou": "抚州" }
  var provinces = { "Beijing": "北京", "Tianjin": "天津", "Shanghai": "上海", "Chongqing": "重庆", "Xianggang": "香港", "Aomen": "澳门", "Anhui": "安徽", "Fujian": "福建", "Guangdong": "广东", "Guangxi": "广西", "Guizhou": "贵州", "Gansu": "甘肃", "Hainan": "海南", "Hebei": "河北", "Henan": "河南", "Heilongjiang": "黑龙江", "Hubei": "湖北", "Hunan": "湖南", "Jilin": "吉林", "Jiangsu": "江苏", "Jiangxi": "江西", "Liaoling": "辽宁", "Neimenggu": "内蒙古", "Ningxia": "宁夏", "Qinghai": "青海", "Shanxi": "山西", "Shanxi": "陕西", "Shandong": "山东", "Sichuan": "四川", "Taiwan": "台湾", "Xizang": "西藏", "Xinjiang": "新疆", "Yunnan": "云南", "Zhejiang": "浙江" }
  console.log(provinces);
  for (var p in citys) {//遍历json对象的每个key/value对,p为key
    if (str == p) {
      return citys[p];
    }
  }
  for (var p in provinces) {//遍历json对象的每个key/value对,p为key
    if (str == p) {
      return provinces[p];
    }
  }

  return str;
}
module.exports = tools