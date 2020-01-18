 var app = getApp();
var WxParse = require('../../common/wxParse/wxParse.js');
Page({
  data: {
    tabid:0, 
    fontSize:14,
    tstart:null,
  },
  onReady: function () {

  },
  echartInit:function(e) {
    console.log(e)
    initChart(e.detail.canvas, e.detail.width, e.detail.height);
  },
  setHigh:function (ele){
    var eles=app.data.elements;
    var tags=new Array();
    for(var i in eles){
      for(var j in ele){
        if (eles[i]['name'] == "热量"&&ele[j]['element']=="热量"&&tags.length<5) {
          if (parseFloat(ele[j].content_value) >= parseFloat(eles[i].avg) || (parseFloat(ele[j].content_value) >= parseFloat(eles[i].high)&&parseFloat(eles[i].high)>0)) {
            tags.push({cls:"danger",text:"高热量"})
          } 
        }
        if (eles[i]['name'] == "胆固醇" && ele[j]['element'] == "胆固醇" && tags.length < 5) {
          if (parseFloat(ele[j].content_value) >= parseFloat(eles[i].avg) || (parseFloat(ele[j].content_value) >= parseFloat(eles[i].high)&&parseFloat(eles[i].high)>0)) {
            tags.push({ cls: "danger", text: "高胆固醇" })
          }
        }
        if (eles[i]['name'] == "蛋白质" && ele[j]['element'] == "蛋白质" && tags.length < 5) {
          if (parseFloat(ele[j].content_value) >= parseFloat(eles[i].avg) || (parseFloat(ele[j].content_value) >= parseFloat(eles[i].high)&&parseFloat(eles[i].high)>0)) {
            tags.push({ cls: "great", text: "高蛋白" })
          }
        }
        if (eles[i]['name'] == "膳食纤维" && ele[j]['element'] == "膳食纤维" && tags.length < 5) {
          if (parseFloat(ele[j].content_value) >= parseFloat(eles[i].avg) || (parseFloat(ele[j].content_value) >= parseFloat(eles[i].high)&&parseFloat(eles[i].high)>0)) {
            tags.push({ cls: "great", text: "高纤维" })
          }
        }
        if (eles[i]['name'] == "铁" && ele[j]['element'] == "铁" && tags.length < 5) {
          if (parseFloat(ele[j].content_value) >= parseFloat(eles[i].avg) || (parseFloat(ele[j].content_value) >= parseFloat(eles[i].high)&&parseFloat(eles[i].high)>0)) {
            tags.push({ cls: "great", text: "高铁" })
          }
        }
        if (eles[i]['name'] == "锌" && ele[j]['element'] == "锌" && tags.length < 5) {
          if (parseFloat(ele[j].content_value) >= parseFloat(eles[i].avg) || (parseFloat(ele[j].content_value) >= parseFloat(eles[i].high)&&parseFloat(eles[i].high)>0)) {
            tags.push({ cls: "great", text: "高锌" })
          }
        }
        if (eles[i]['name'] == "维生素C" && ele[j]['element'] == "维生素C" && tags.length < 5) {
          if (parseFloat(ele[j].content_value) > parseFloat(eles[i].avg)) {
            tags.push({ cls: "great", text: "高维C" })
          }
        }
       
      }
     
    }
    this.setData({
      tags:tags
    })
  }, 
  touchStart:function(e){
    this.setData({
      tstart:e.touches[0]
    });
  },
  touchMove: function (e) {
    var t=e.data.tstart;
    var tmp=e.touches[0];
    if((tmp.pageX - t.pageX)>100){//向右滑动
      
    }else if((t.pageX - tmp.pageX)<100){//向左滑动

    }
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
            food:ret.data,
            elements:ret.data.elements
          }); 
          that.setHigh(ret.data.elements);
          if (typeof (ret.data.detail) != "undefined" && ret.data.detail!=null){
            var article = ret.data.detail.info
              ;
            WxParse.wxParse('content', 'html', article, that, 5);
          }
          
        }
      },
      error:function(e){

      }
    });
    app.commonInit(this)
  }, 
  //分组点击
  tabchg: function (e) {
    var that = this; 
    this.setData({ 
      tabid: e.currentTarget.dataset.id
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