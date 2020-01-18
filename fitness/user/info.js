var app = getApp();
Page({
  data: {
    sexs:["保密","男","女"],
  },
  onReady: function () {

  },
  onLoad: function () {
    var day2 = new Date();
    day2.setTime(day2.getTime());
    var today = day2.getFullYear() + "-" + (day2.getMonth() + 1) + "-" + day2.getDate();
    this.setData({
      userInfo:app.data.userInfo,
      today:today
    }) 
    app.commonInit(this);
  },
  //选择生日
  birthdayChange:function(e){
    var u=this.data.userInfo;
    u.birthday=e.detail.value;
    this.setData({
      userInfo:u
    })
  },
  //性别切换
  sexChange:function(e){
    var u = this.data.userInfo;
    u.sex = e.detail.value;
    this.setData({
      userInfo: u
    })
    app.commonInit(this)
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