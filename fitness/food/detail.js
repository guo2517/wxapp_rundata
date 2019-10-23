var app = getApp();
Page({
  data: {

  },
  onReady: function () {

  },
  onLoad: function (options) {
    console.log(options);
    var that=this;
    app.request({
      url:"food.detail",
      data:{id:options.id},
      loading: true,
      success:function(ret){
        if(ret.status==1){
          that.setData({
            food:ret.data
          })
        }
      },
      error:function(e){

      }
    });
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