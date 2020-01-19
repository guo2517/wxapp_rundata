var app = getApp();
var WxParse = require('../../common/wxParse/wxParse.js');
Page({
  data: {

  },
  onReady: function () {

  },
  onLoad: function (options) {
    app.commonInit(this);
    this.getTermDetail(options.id);
  },
  getTermDetail:function(id){
    var that=this;
    app.request({
      url:"term.detail",
      data:{id:id},
      success:function(ret){
        if(ret.status>0){
          that.setData({
            term:ret.data
          }) 
          var article = ret.data.content.content;
          WxParse.wxParse('content', 'html', article, that, 5);
        }else{
          wx.showModal({
            title: '错误提示',
            content: ret.error,
          })
        }
        
      }
    })
  },
  onShow: function () {

  },
  onHide: function () {
  },
  onUnload: function () {
  },
  onPullDownRefresh: function () {
  },
  onReachBottom: function () {
  },
  onShareAppMessage: function () {
  }
})