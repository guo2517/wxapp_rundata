var app = getApp();
Page({
  data: {
    sexs:["保密","男","女"], 
  },
  onReady: function () {

  },
  //输入框
  numberInput: function (e) {
    var name = e.currentTarget.dataset.name;
    var userInfo = this.data.userInfo;
    if (name == "weight") {
      userInfo.weight = e.detail.value;
    } else if (name == "height") {
      userInfo.height = e.detail.value;
    } else if (name == "age") {
      if (!isNaN(parseInt(e.detail.value)) && parseInt(e.detail.value) > 1 && parseInt(e.detail.value) < 101) {
        userInfo.age = e.detail.value;
      }
    }
    this.setData({
      userInfo: userInfo
    }); 
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
      this.setData({
        sexIndex: e.detail.value
      }) 
  
    u.sex = e.detail.value;
    this.setData({
      userInfo: u
    })
    app.commonInit(this)
  },
  syncUserInfo:function(e){ 
      var that=this;
      app.getUserInfo(this, function (user) {
        var u=that.data.userInfo;
        u.city=user.city;
        u.province=user.province;
        u.sex=user.gender;
        u.nickname=user.nickName;
        u.avatar=user.avatarUrl;
        that.setData({
          userInfo:u
        })
        that.saveInfo();
      }, e); 
  },
  saveInfo:function(e){
    var that=this;
    app.request({
      url:"user.syncInfo",
      data:that.data.userInfo,
      success:function(ret){
        
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