
var socket={
  fid:null,
  tid:null,
  timer:null,
  task:null,
  closeStatus:0,//等于1是不在自动关闭重连
}
socket.close=function(){
  this.closeStatus=1;
  clearInterval(this.timer)
  this.task.close()
}
socket.connect=function(urll){
  var app = getApp();
  var urlt = (urll == undefined) ? app.config.socketServer : urll;
  this.task=wx.connectSocket({
    url: urlt,
    header: {
      'content-type': 'application/json'
    },
    method: "POST",
    success: function (ret) {
      console.log(ret);
    }
  })
}
socket.init = function (urll){
  var app=getApp();
  this.closeStatus == 0 
  this.connect();
  this.task.onMessage(function(data){
    var app = getApp(); 
    data=JSON.parse(data.data);
    console.log(data)
    switch(data.type){
      case 'init':
        app.socket.fid=data.fid;  
        break;
      case 'weblogin':
        break;
      
      case 'weappLoginOk':
        console.log(data.status)
        if(parseInt(data.status)==1){
          wx.showToast({
            title: '登录成功！',
          }); 
          app.initPageData({
            loginStatus: 1
          });
         
         
        }else{
          wx.showToast({
            title: data.error,
          })
          app.initPageData({
            times:301
          })
        }
        
        app.socket.close();
        break;
      default:
        break;
        
    }
  });
  this.task.onClose(function () {
    //关闭自动重连
    if(app.socket.closeStatus==0){
      app.socket.connect(); 
    } 
  })
  clearInterval(this.timer);
  this.timer=setInterval(function(){ 
    //定时发送心跳
    var app = getApp(); 
    app.socket.heart();
  },5000);
}
socket.send=function(str){ 
  if (typeof (str)!="string"){
    str = JSON.stringify(str);
  } 
  console.log(str);
  this.task.send({
    data:str,
    success:function(){

    },
    fail:function(){

    }
    })
}
socket.heart=function(){
  var app=getApp();
  var data={"type":"heart","fd":app.socket.fid}; 
  this.send(data);
} 
module.exports=socket;