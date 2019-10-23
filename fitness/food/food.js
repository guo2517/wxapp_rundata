var app = getApp();
Page({
  data: {
    groupsActive: 0,
    foods: [],
    page: {
      page: 1, limit: 30, pagecount: 1, count: 21
    }
  },
  onReady: function () {

  },
  onLoad: function () {
    var that = this;
    app.request({
      url: "food.groups",
      success: function (ret) {
        that.setData({
          groups: ret.data
        });
      }
    })
  },
  searchInput: function (e) {
    console.log(e)
    this.setData({
      keyword: e.detail.value
    })
  }, 
  nextPage: function () { 
    if (app.tool.nextPage(this)) { 
      this.foodSearch();
    } else {
      wx.showToast({
        title: '没有了',
      })
    }
  },
  foodSearch: function () {
    var that = this;
    var datas = this.data.page;
    datas.keyword = that.data.keyword;
    datas.group_id = that.data.groupsActive;
    app.request({
      url: "food.search",
      data: datas,
      loading:true,
      success: function (ret) {
        that.setData({
          foods: that.data.foods.concat(ret.data),
          page:ret.page
        })
      }
    })
  },
  grouptap: function (e) {
    var group_id = parseInt(e.currentTarget.dataset.id);
    this.setData({
      groupsActive: group_id,
      foods: [],
      keyword: ""
    });
    app.tool.initPage(this);
    this.foodSearch();
  },
  formsub: function (e) {
    this.setData({
      foods: []
    });
    app.tool.initPage(this);
    this.foodSearch();
  },
  foodDetail:function(e){
    var id=e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/fitness/food/detail?id='+id,
    })
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