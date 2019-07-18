var app = getApp();
var timer = null;
Page({
  data: {
    ticket:"",
    userInfo:{
      nickname:"未授权"
    },
    loginStatus:0,
    times:  0
  }, 
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    app.socket.init();
    app.initDevice();
    var that = this;
    app.getOpenID(this, function () {
      app.getUserInfo(that, null);
    });
    this.setData({
      ticket: decodeURIComponent(options.scene)
    }) 
    timer = setInterval(function () {
      if (that.data.times >= 300) {
        clearInterval(timer);
        return;
      }
      that.setData({
        times: that.data.times + 30
      })
    }, 30000);
  },
  getUserInfo: function (e) {
    var that=this;
    if (this.data.loginStatus==1){
      return false;
    }
    app.getUserInfo(this, function(ret){
      var msg={
        ticket:that.data.ticket,
        type:"weappLogin",
        timestamp:Date.parse(new Date())/1000,
        openid:app.openid
      }
      app.socket.send(msg)
    }, e);
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }
})