var app = getApp();
Page({
  data: {
    groupsActive: 0,
    foods: [],
    sortfields:[{id:0,name:"默认排序",selected:1}],  
    page: {
      page: 1, limit: 30, pagecount: 1, count: 21
    },
    showSort:0,
    desc_code:0,
    desc:"desc"
  },
  onReady: function () {

  },
  onLoad: function () {
    var that = this;
    this.getEles();
    that.setData({
      sortfields:app.data.elements
    });
    app.request({
      url:"food.groups",
      success:function(ret){
        that.setData({
          groups:ret.data
        })
      }
    })
     
    app.commonInit(this);
    this.foodSearch();
  },
  //设置排序字段
  setsortfield:function(e){  
    this.setData({
      desc_code: e.currentTarget.dataset.code
    })
  },
  //设置显示字段
  sele:function(e){
    var code=e.currentTarget.dataset.code;
    var data=this.data.eles;
    var sortfields=this.data.sortfields; 
    var len=0; 
    for(var i in data){ 
      if (code == data[i].code){ 
        if(data[i].checked==1){ 
          data[i].checked=0; 
        }else{ ;
          data[i].checked=1;   
        } 
      }
    }
    for(var i in data){
      if(data[i].checked==1){
        console.log(data[i].name+" 选中")
        len=len+1;
      }
      for (var k in sortfields) {
        if (sortfields[k].code == code) {
          if(data[i].checked==1){ 
            sortfields.splice(k);
          } 
          break;
        }
      }
    } 
    if(len>4){
      wx.showToast({
        title: '元素最多选择4个',
        icon:"none"
      })
      return false;
    }
    this.setData({
      eles:data,
      sortfields:sortfields
    })
  },
  //弹出字段显示框
  showsortfield:function(e){
    if (this.data.showSort==1){
      this.setData({
        showSort:0
      })
    }else{
      this.setData({
        showSort:1
      })
    }
    if(typeof(e.currentTarget.dataset.research)!='undefined'){
      this.formsub();
    }
  },
  //高低排序切换
  changesort:function(e){
    var desc="desc";
    if(e.currentTarget.dataset.sort=="desc"){
      desc="asc";
    }
    this.setData({
      desc:desc
    })
    this.formsub();
  },
  searchInput: function (e) {
    console.log(e)
    this.setData({
      keyword: e.detail.value
    })
  }, 

  //下一页
  nextPage: function () { 
    if (app.tool.nextPage(this)) { 
      this.foodSearch();
    } else {
      wx.showToast({
        title: '没有了',
      })
    }
  },
  //搜索
  foodSearch: function () {
    var that = this;
    var datas = this.data.page;
    var fields = that.data.eles;
    datas.desc_code = that.data.desc_code;
    datas.show_field = new Array();
    for(var i in fields){
      if(fields[i].checked==1){
        datas.show_field.push(fields[i].code)
      }
    }
    datas.show_field = datas.show_field.join(",")
    datas.desc = that.data.desc;
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
  //分类点击
  grouptap: function (e) {
    var group_id = parseInt(e.currentTarget.dataset.id);
    this.setData({
      groupsActive: group_id,
      foods: [],
      keyword: ""
    });
    app.tool.initPage(this);
    this.formsub();
  },
  //触发搜索
  formsub: function (e) {
    this.setData({
      foods: []
    });
    app.tool.initPage(this,"page");
    this.foodSearch();
  },
  foodDetail:function(e){
    var id=e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/fitness/food/detail?id='+id,
    })
  },
  //获取元素字段
  getEles:function(){
    var that=this;
    app.request({
      url:"food.eles",
      success:function(ret){
        that.setData({
          eles:ret.data
        })
      }
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