
var app = getApp();
// var user_name = wx.getStorageSync('user_name'); //获取本地缓存中的userIdEnc //用户唯一识别码
// var header = {
//   'content-type': 'application/json',
//   'cookie': "devimark=" + loginDevice + ";" + "usenc=" + userIdEnc,
// };

Page({
  data: {
    // user_name:null
    
  },
  onLoad: function (options) {

    // if (app.appData.userinfo == null) {
    //   // wx.navigateTo({url:"../login/login"})

    //   wx.redirectTo({ url: "../my/my" })
    // } else {

    //   this.setData({ user_name: app.appData.userinfo.user_name, nick_name:app.appData.userinfo.nick_name })
    

    // }
     
   
     

 
  },



  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {

    var user_name = wx.getStorageSync('user_name'); //获取本地缓存中的userIdEnc //用户唯一识别码
    console.log(user_name)
    var password = wx.getStorageSync('password'); 

    var that = this
    wx.request({
      url: 'https://hg.airyee.com/tools/small_program.ashx?action=user_login',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      method: "POST",
      // data: JSON.stringify(js),
      data: {
        user_name: user_name,
        password: password
      },


      success: function (res) {         //将获取到的json数据，存在名字叫list的这个数组中



        that.setData({
          list: res.data,         //res代表success函数的事件对，data是固定的，list是数组     

        })
      }
    }) 
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }
})



