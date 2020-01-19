var app=getApp();
const verify = require("../../common/tpl/verify.js")
Page({
  data:{  
    scrollTop:0,
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
    article_type:"latest",
    verifyStatus:0
  },
  homesharetap:function(e){//首页分类点击
    let oldtype=this.data.article_type;
    this.setData({
      article_type:e.currentTarget.dataset.type
    })
    if(oldtype!=e.currentTarget.dataset.type){
      app.tool.initPage(this,"artpage");
      this.getArticle();
    }
  },
  topage:function(e){
    if(typeof(e.currentTarget.dataset.date)!='undefined'){
      wx.showToast({
        title: '敬请期待',
        icon:'none'
      })
      return false;
    }
    wx.navigateTo({
      url: e.currentTarget.dataset.url
    })
  },
  tabbarTap:function (e){//底部导航点击
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
  searchArticle:function(){
    app.tool.initPage(this,"artpage");
    this.getArticle();
  },
  getArticle:function(){
    var that=this;
    var datas={
      page:that.data.artpage,
      type:that.data.article_type,
      keyword:that.data.keyword
    }
    app.request({
      data: datas,
      url: "home.articles",
      success: function (ret) {
        if (ret.status == 1) {
          that.setData({
            artpage: ret.page,
            articles: ret.data
          })
        } else {
          wx.showToast({
            title: '获取数据失败！',
          })
        }

      }
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
      url:"banner",
      data:{"position":"hometool"},
      success:function(ret){
        that.setData({
          banner:ret.data
        })
      }
    });
    this.getArticle();
  },
  articleDetail:function(e){
    var id=e.currentTarget.dataset.id;
    var type=e.currentTarget.dataset.type;
    if(type=="article"){
      wx.navigateTo({
        url: "/fitness/article/detail?id=" + id
      })
    }
    
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
    var date=e.currentTarget.dataset.date;
    if(typeof(date)!="undefined"){
      wx.showToast({
        title: '预计 '+date+" 上线",
        icon:"none"
      })
      return false;
    }
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
  },
  totop:function(e){
    this.setData({
      scrollTop:0,
      showtop:0
    })
  },
  indexscroll:function(e){
    var top=e.detail.scrollTop;
    if(top>100){
      this.setData({
        showtop:1
      })
    }else{
      this.setData({
        showtop:0
      })
    }
  },
  keywordInput:function(e){
    this.setData({
      keyword:e.detail.value
    })
  }
})