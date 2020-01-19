var app = getApp();
var WxParse = require('../../common/wxParse/wxParse.js');
Page({
  data: {

  },
  onReady: function () {

  },
  onLoad: function (options) {
    app.commonInit(this);
    var that = this;
    app.request({
      url: "article.detail",
      data: { id: "1" },
      success: function (ret) {
        that.setData({
          article: ret.article
        })
        var article = ret.content;
        WxParse.wxParse('content', 'html', article, that, 5);
      }
    })
  },
  copyText: function (e) {
    app.tool.copyText(e)
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