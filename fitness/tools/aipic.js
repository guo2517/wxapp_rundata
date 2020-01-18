var app = getApp();

Page({
  data: {
    history:[],
    detailindex:0,
    useCamera:0
  },
  onReady: function () {

  },
  itemTap:function(e){
    var id=e.currentTarget.dataset.foodid;
    var name=e.currentTarget.dataset.name;
    if(parseInt(id)>0){
      wx.navigateTo({
        url: '/fitness/food/detail?id='+id
      })
    }else{
      wx.navigateTo({
        url: '/fitness/food/food?keyword='+name,
      })
    }
  },
  historyDetail:function(e){
    this.setData({
      detailindex:e.currentTarget.dataset.index
    })
    var data=this.data.history;
    for (var i in data){
      if (i == e.currentTarget.dataset.index){
        this.setData({
          result:data[i].result
        });
        break;
      }
    }
  },
  onLoad: function () {
    var that = this; 
    setTimeout(function(){
      app.commonInit(that);
      that.history();
    },500)
    wx.authorize({
      scope: 'scope.camera',
      success() {
        that.setData({
          useCamera: 1
        })
      }
    })
  },
  onShow: function () {
    var that=this;
    wx.getSetting({
      success(res) { 
        if (res.authSetting['scope.camera']) {
          that.setData({
            useCamera:1
          })
        }
      }}
    )
  },
  history:function(){
    var that=this;
    app.request({
      url:"tool.aipic",
      data:{
        act:"history"
      },
      success:function(ret){
        that.setData({
          history:ret.data
        })
      }
    })
  },
  uploadPic: function (tempFilePath){
    var that=this;
    wx.showLoading({
      title: '正在识别',
    })
    wx.uploadFile({
    url: app.config.siteroot + 'api/tool.aipic', //仅为示例，非真实的接口地址
    filePath: tempFilePath,
    name: 'picture',
    formData: {
      'act': 'upload',
      'uid': app.data.userInfo.id,
      'o': app.data.userInfo.openid,
      path: tempFilePath 
    },
    success(res) {
      wx.hideLoading();
      console.log(res)
      res = JSON.parse(res.data)
      if (typeof (res.error) != 'undefined') {
        wx.showToast({
          title: res.error,
          icon: "none"
        })
      }
      if (typeof (res.result) != "undefined") {
        var his=that.data.history;
        his.unshift(res.info);
        that.setData({
          history: his 
        }); 
        that.historyDetail({currentTarget:{dataset:{index:0}}})
      } else {
        that.setData({
          result: []
        })
      }
    }, fail: function () {
      wx.hideLoading();
    }
  })
  },
  chooseImg:function(){
    var that=this;
    wx.chooseImage({
      count: 1,
      sizeType: [ 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) { 
        const tempFilePaths = res.tempFilePaths;
        
        that.uploadPic(tempFilePaths[0])
      }
    })
  },
  getPicture:function(){//确认是否授权，没有就打开设置
   // scope.camera
    var that = this;
    wx.getSetting({
      success(res) {
        console.log(res)
        if (!res.authSetting['scope.camera']) {
          wx.showModal({
            title: '授权提示',
            content: '由于未获得摄像头使用授权，是否立即去设置？',
            success(res) {
              if (res.confirm) {
                wx.openSetting()
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
        } else {
          that.setData({
            useCamera: 1
          });
          that.takePhoto();
        }
      }
    }) 
  },
  takePhoto:function(){//拍照动作
    var that=this;
    var camera = wx.createCameraContext();
    camera.takePhoto({
      quality: "low",
      success: function (ret) {
        that.uploadPic(ret.tempImagePath)
      },
      fail: function (e) {
        console.log(e);
        wx.showToast({
          title: '拍照失败',
          icon: "none"
        })
      }
    })
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