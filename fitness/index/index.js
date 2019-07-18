var app=getApp();
const verify = require("../../common/tpl/verify.js")
Page({
  data:{  
    tabbar:{
      dataset:[
        { "type": "index", text: "社区" },
        { "type": "tool", text: "工具" }, 
        { "type": "my", text: "我的" },
      ],
      active:"index"
    },
    verifyStatus:0
  },
  tabbarTap:function (e){
    let action = e.currentTarget.dataset.action;
    if (this.data.tabbar.active==action){
      return false;
    } 
    var tabs=this.data.tabbar;
    tabs.active=action;
    switch(action){
      case "cate": 
        break;
      default:
        break;
    }

    this.setData({
      tabbar:tabs
    });
   
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    app.initDevice(); 
    verify.checkVerify(this);
    var that=this;
    app.getOpenID(this,function(){
      app.getUserInfo(that, null);
    });
    app.request({
      url:"home.index",
      success:function(ret){
        that.setData({
          msgs:ret.data.msgs
        })
      }
    })
  },
  getUserInfo:function(e){
    app.getUserInfo(this,function(){
      
    },e);
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },
  verifyToolTap: function (e) {
    verify.toolTap(e, this)
  }
})