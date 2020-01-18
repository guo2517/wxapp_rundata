var app = getApp();
Page({
  data: {
    lines:1,
    group_id:0,
    groups:[],
    terms:[],
    page: {
      page: 1, limit: 30, pagecount: 1, count: 21
    },
    keyword:"",
  },
  onReady: function () {

  },
  //下一页
  nextPage: function () {
    if (app.tool.nextPage(this)) {
      this.termsearch();
    } else {
      wx.showToast({
        title: '没有了',
      })
    }
  },
  onLoad: function () {
    var that=this;
    app.commonInit(this);
    app.request({
      url:"term.groups",
      success:function(ret){
        that.setData({
          groups:ret.data
        });
      }
    });
    var line = Math.floor((100 - 3 - 1.6 * (this.data.fontSize + 3)) / ((this.data.fontSize + 1) * 1.4))

    var lineEls=this.setData({
      lines: ((line>4)?4:line)
    });
    this.getTerm();
  },
  //搜索输入
  searchInput: function (e) {
    console.log(e)
    this.setData({
      keyword: e.detail.value
    })
  }, 
  //触发搜索
  formsub: function (e) {
    this.setData({
      terms: []
    });
    app.tool.initPage(this);
    this.getTerm();
  },
  //搜索名词
  getTerm: function () {
    var that = this;
    var datas = this.data.page;   
    datas.keyword = that.data.keyword;
    datas.type_id = that.data.group_id; 
    app.request({
      url: "term.search",
      data: datas,
      loading: true,
      success: function (ret) {
        that.setData({
          terms: that.data.terms.concat(ret.data),
          page: ret.page
        })
      }
    })
  },
  //分组点击
  groupchg:function(e){
    var that=this;
    app.tool.initPage(this);
    this.setData({
      terms:[],
      group_id:e.currentTarget.dataset.id
    }); 
    this.getTerm();
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