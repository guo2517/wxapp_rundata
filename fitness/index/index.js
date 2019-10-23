var app=getApp();
const verify = require("../../common/tpl/verify.js")
Page({
  data:{  
    artpage:{
      page:1,
      size:20
    },
    adverts:[
      '/common/images/demo.jpg',
      "/common/images/goods.png"
    ],
    tabbar:{
      dataset:[
        { "type": "index", text: "首页" },
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
    app.tool.randChar();
    app.request({
      data:that.artpage,
      url:"home.articles",
      success:function(ret){
        if(ret.status==1){
          that.setData({
            artpage: ret.page,
            articles:ret.data
          })
        }else{
          wx.showToast({
            title: '获取数据失败！',
          })
        }
        
      }
    })
  },
  getUserInfo:function(e){
    app.getUserInfo(this,function(){
      
    },e);
  }, 
  mymenutap: function(e) {
    var menu = e.currentTarget.dataset.menu;
    wx.navigateTo({
      url: '/fitness/user/' + menu,
    })
  },
  tooltap:function(e){
    var tool=e.currentTarget.dataset.url;
    wx.navigateTo({
      url: '/fitness' + tool,
    })
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