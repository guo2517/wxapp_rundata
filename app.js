//app.js
App({ 
  config:{
    socket_fid:null,
    socketServer:"wss://fitness.guo888.cn:30002",
    siteroot: "https://fitness.guo888.cn/",
    version: "1.0.3"
  },
  data:{},//全局参数
  userInfo:null,
  openid:null,
  onLaunch: function () {
    var app = this; 
  },  
  request: function (options, func = null) { 
    var url0 = "",openid="",that=this,time=Date.parse(new Date())/1000;
    if (this.openid != null  ){
      openid=this.openid;
    }
    if (typeof (options) != "object") {
      url0 = options;
    } else {
      url0 = this.config.siteroot+"api/"+(options.url);
      if (options.url.indexOf("http") != -1) {//自定义url
        url0 = options.url;
      }
    } 
    var params= {
        version:that.version,
        o:openid,
        t:time,
        sign:"",
        "from": "weapp"}; 
    if (typeof (options.data)!= "undefined") { 
      params = Object.assign(options.data, {t:time, v: that.version, o: openid, "from": "weapp" })
    } 
    params.sign=that.getSign(params);
    wx.request({
      url: url0, //仅为示例，并非真实的接口地址
      data: params,
      method:"POST",
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        if (res.statusCode < 400) {
          console.log(res.data)
          if (typeof (options) != "object") {
            if (typeof (func) == "function") {
              func(res.data);//回调
            }
          } else {
            if (typeof (options.success) == "function") {
              options.success(res.data);//回调
            }
          }
        } else {
          console.log("请求出错，状态码：" + res.statusCode);
        }
      },
      fail: function (e) {
        if (e.errMsg.indexOf("domain") != -1) {
          console.log("缺少request域名配置: " + url0);
        }
        if (typeof (options) == "object") {
          options.fail(e);//回调
        }
      }
    })
  },

  //获取设备宽高等信息，这里将常用的可用宽高改为width,height（原本是windowWidth，windowHeight）
  //默认参数为true时直接在当前页面赋变量device
  initDevice: function (setdata = true) {
    var deviceinfo = this.data.device;
    if (deviceinfo == null) {
      var res = wx.getSystemInfoSync()
      deviceinfo = {
        width: parseInt(res.windowWidth),
        height: parseInt(res.windowHeight),
        screenWidth: parseInt(res.screenWidth),
        screenHeight: parseInt(res.screenHeight),
        brand: res.brand,//手机品牌
        model: res.model,//手机型号
      }
      this.data.device = deviceinfo;
    }
    this.initPageData({
      device: deviceinfo
    });
    return this.data.device;
  }, 
  //获取当前页面
  currentPage: function () {
    var pages = getCurrentPages();
    return pages[pages.length - 1];
  },
  //调用当前页setData
  initPageData: function (data) {
    var pages = getCurrentPages();
    var currentPage = pages[pages.length - 1]; 
    currentPage.setData(data)
  },
  onHide: function () {

  },
  onError: function (msg) {

  },
  getSign:function(data){
    var md5=require("common/js/md5.js");
    var str=data.o+"&"+data.t;
    return md5(str);
  },
  getUserInfo:function(page,func,e){
    var that=this;
    if(e==undefined){//通过openid获取保存的信息
      that.request({
        url:"user.userInfo",
        data:{act:"get"},
        success:function(ret){ 
          if(ret.status){
            that.initPageData({
              userInfo: ret.data
            })
          }
          if(typeof(func)=="function"){ 
            func(ret.data);
          }
        }
      })
    }else{//通过授权接口获取用户信息
      wx.getUserInfo({
        lang: "zh_CN",
        success: function (ret) {
          if (ret.userInfo != undefined) {
            that.request({
              url: "user.userInfo",
              data: ret.userInfo,
              success: function (res) {
                if (ret.status) {
                  that.initPageData({
                    userInfo: ret.data
                  })
                }
                if (typeof (func) == "function") {
                  func(ret.data);
                }
              }
            })
          }
        }, fail: function (ret) {
          console.log(ret)
        }
      })
    }
    
  },
  getOpenID: function (page, func = null) {
    //调用登录接口
    var that = this;  
    wx.login({
      success: function (res) { 
        that.request({
          url: 'user.login',
          method: "post",
          dataType: "json",
          data: { code: res.code }, 
          success: function (res) {
            if(res.status>0){
              that.openid = res.openid; 
            }else{
              wx.showToast({
                title: res.errmsg,
              })
            }
            if (typeof (func) == "function") return func(res);
          }
        });
      }
    }) 
  }, 
  socket:require("common/js/socket.js"),
  tool:require("common/js/tool.js") 
}); 