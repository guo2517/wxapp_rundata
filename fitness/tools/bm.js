
var app = getApp();
Page({
  data: {
    sexs:['男',"女"],
    sexIndex:0 ,
    bm:0,
    bmi:{text:'',cls:''}
  },
  onReady: function () {

  },
  onLoad: function () {
    var day2 = new Date();
    day2.setTime(day2.getTime());
    var today = day2.getFullYear() + "-" + (day2.getMonth() + 1) + "-" + day2.getDate();
    this.setData({
      userInfo: app.data.userInfo,
      today: today
    }) 
    app.commonInit(this); 
    if (typeof (app.data.userInfo.birthday) != "undefined" && app.data.userInfo.birthday.length>5){
      var e = {
        detail: {
          value: this.data.userInfo.birthday
        }
      }
      this.birthChange(e);
    } 
  },
  onShow: function () {

  },
  //输入框
  numberInput:function(e){
    var name=e.currentTarget.dataset.name;
    var userInfo=this.data.userInfo;
    if(name=="weight"){
      userInfo.weight=e.detail.value;
    }else if(name=="height"){
      userInfo.height=e.detail.value;
    }else if(name=="age"){ 
      if (!isNaN(parseInt(e.detail.value)) && parseInt(e.detail.value) > 1 && parseInt(e.detail.value) < 101) {
        userInfo.age = e.detail.value;
      }
    }
    this.setData({
      userInfo:userInfo
    });
    this.bmiInfo();
    this.getBM();
  },
  //计算bmi
  bmiInfo:function(){
    var userInfo=this.data.userInfo;
    userInfo.bmi=parseFloat(userInfo.weight/(userInfo.height*userInfo.height/10000)).toFixed(1);
    this.setData({
      userInfo:userInfo
    });
    var bmi = { text: '', cls: '' };
    if(userInfo.bmi<18.5){
      bmi.cls="s";
      bmi.text="偏瘦";
    }else if(userInfo.bmi<24){
      bmi.cls = "m";
      bmi.text = "正常";
    } else if (userInfo.bmi <25) {
      bmi.cls = "l";
      bmi.text = "超重";
    } else if (userInfo.bmi <27) {
      bmi.cls = "xl";
      bmi.text = "肥胖";
    } else if (userInfo.bmi < 30) {
      bmi.cls = "xxl";
      bmi.text = "重度肥胖";
    }else{
      bmi.cls = "xxl";
      bmi.text = "极重度肥胖";
    }
    this.setData({
      bmi:bmi
    })
  },
  bmInfo:function(){
    wx.showLoading({
      title: '正在计算',

    });
    setTimeout(function(){
      wx.hideLoading();
    },500)
  },
  //计算BM代谢
  getBM:function(){
    var bm=0;
    var userInfo=this.data.userInfo; 
    if(isNaN(parseInt(userInfo.height))||parseInt(userInfo.height)<50||parseInt(userInfo.height)>250){
      wx.showToast({
        title:"身高范围 50~250 厘米(cm)",
        icon:"none"
      });
      return false;
    }
    if (isNaN(parseInt(userInfo.weight)) || parseInt(userInfo.weight) < 5 || parseInt(userInfo.weight) > 250) {
      wx.showToast({
        title: "身高范围 5~250 千克(kg)",
        icon: "none"
      });
      return false;
    }
    if (isNaN(parseInt(userInfo.age)) || parseInt(userInfo.age) < 1 || parseInt(userInfo.age) > 100) {
      wx.showToast({
        title: "年龄范围 1~100 ",
        icon: "none"
      });
      return false;
    }

    if(parseInt(userInfo.age)>=18&&parseInt(userInfo.age)<=60){
      //Schofield equation
      //18 - 30：男：63W + 2896女：62W + 2036
      //30 - 60：男：48W + 3653女：34W + 3538
      if(parseInt(userInfo.age)<=30){
        if (parseInt(userInfo.sex) == 1) {//男
          console.log("男")
          bm=63*userInfo.weight+2896;
        } else {//女
          bm=62*userInfo.weight+2036
        }
      }else{
        if (parseInt(userInfo.sex) == 1) {//男
          bm = 48 * userInfo.weight + 3653;
        } else {//女
          bm = 34 * userInfo.weight + 3538
        }
      }
    }else{
      //男：BMR(kcal) = 66.47＋13.75×体重(kg) ＋5.0×身高(cm) －6.76×年龄(岁
      //女：BMR(kcal) = 655.1＋9.56×体重(kg) ＋1.85×身高(cm) －4.67×年龄(岁)
      //Harris-Benedict
      if (parseInt(userInfo.sex) == 1) {//男
        bm = 66.47+13.75*userInfo.weight+5*userInfo.height-6.76*userInfo.age;
      } else {//女
        bm = 655.1 + 9.56 * userInfo.weight + 1.85 * userInfo.height - 4.67 * userInfo.age;
      }
    }
    console.log("热量："+bm+" kj")
    bm=parseInt(bm*0.2385*0.95);
    this.setData({
      bm:bm
    })
  },
  sexChange:function(e){
    this.setData({
      sexIndex:e.detail.value
    })
  },
  //选择生日
  birthChange: function (e) {
    var u = this.data.userInfo;
    u.birthday = e.detail.value;
    var birth=app.tool.strtotime(u.birthday);
    console.log(birth)
    var now=Date.parse(new Date())/1000;
    u.age=Math.floor(((now-birth)/86400)/365);
    this.setData({
      userInfo: u
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