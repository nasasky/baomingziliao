
var app = getApp();
Page({
  data:{
    // user_name:null
    // avatar:'',
  },
 
  
  onReady:function(){
    // 页面渲染完成
  },

  
  onShow: function () {
   
   
    var user_name = wx.getStorageSync('user_name'); //获取本地缓存中的userIdEnc //用户唯一识别码
    console.log(user_name)
    var password = wx.getStorageSync('password');
    console.log(user_name)
    var nick_name =wx.getStorageSync('nick_name');
    var avatar = wx.getStorageSync('avatar');
  
    if (user_name == "") {
      //  wx.navigateTo({url:"../login/login"})

      wx.redirectTo({ url: "../login/login" })
    } else {

      // this.setData({ avatar: app.globalData.avatar.avatar })
      wx.redirectTo({ url: "../user/user" })

    }
    this.setData({
      user_name: user_name,
      nick_name:nick_name,
      avatar:avatar,
    })


    // if (user_name == null) {
    //   //  wx.navigateTo({url:"../login/login"})
      
    //   wx.redirectTo({ url: "../login/login" })
    // } else {

    //   // this.setData({ user_name: app.globalData.user_name.user_name })


    // }

    
    
  },
  // onHide:function(){
  //   // 页面隐藏
  // },
  // onUnload:function(){
  //   // 页面关闭
  // },
  goB: function (e) {

    wx.redirectTo({//关闭当前页面，跳转到应用内的某个页面

      url: '../home/home'

    })

  },
})
