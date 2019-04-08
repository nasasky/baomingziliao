var app = getApp();
// const app = getApp();


// var user_name = wx.getStorageSync('user_name'); //获取本地缓存中的userIdEnc //用户唯一识别码
// var header = {
//   'content-type': 'application/json',
//   'cookie': "devimark=" + loginDevice + ";" + "usenc=" + userIdEnc,
// };

Page({
  data: {
    // user_name:null
    list:[],
    data:[],
 
    
  },
  onLoad: function(options) {

    // if (app.appData.userinfo == null) {
    //   // wx.navigateTo({url:"../login/login"})

    //   wx.redirectTo({ url: "../my/my" })
    // } else {

    //   this.setData({ user_name: app.appData.userinfo.user_name, nick_name:app.appData.userinfo.nick_name })


    // }





  },



  onReady: function() {
    // 页面渲染完成
  },
  onShow: function() {

    var user_name = wx.getStorageSync('user_name'); //获取本地缓存中的userIdEnc //用户唯一识别码
    console.log(user_name)
    var password = wx.getStorageSync('password');

    var that = this
    wx.request({
      header: {
        'user_name': wx.getStorageSync('user_name')
      },
      url: 'https://hg.airyee.com/tools/small_program.ashx?action=can_activity_list',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
       
      },
      method: "POST",
      // data: JSON.stringify(js),
      data: {
        user_name: user_name,
       
      },


      success: function(res) {         //将获取到的json数据，存在名字叫list的这个数组中
      
       console.log(res.data)




        that.setData({
           
            lists: res.data,  
          
        //res代表success函数的事件对，data是固定的，list是数组     
         
        })
        
        
      }
    }) 
  },
  onHide: function() {
    // 页面隐藏
  },
  onUnload: function() {
    // 页面关闭
  }
})








// const app = getApp();
// Page({
//   onLoad: function() {
//     let token = wx.getStorageSync('token');
//     if (token == '') { //第一次登录，获取登录状态 
//       app.getToken().then(function(res) {
//         _this.getData(); //此时token必然已经获取到，且getData()在此时才会执行
//       })
//     } else { //有token的情况直接获取数据
//       _this.getData();
//     }
//   }, //获取数据 
//   getData: function() {
//     wx.request({
//       header: {
//         'token': wx.getStorageSync('token')
//       },
//       url: 'https://xxxxx.xxxxx',
//       method: 'GET',
//       success: res => {
//         console.log(res);
//       }
//     })
//   }
// })