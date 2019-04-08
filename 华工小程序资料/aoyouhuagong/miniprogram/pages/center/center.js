
var app = getApp();
Page({
  data: {
    user_name: null
  },
  onLoad: function (options) {
    if (app.appData.userinfo == null) {
      // wx.navigateTo({url:"../login/login"})

      wx.redirectTo({ url: "../my/my" })
    } else {

      this.setData({ user_name: app.appData.userinfo.user_name })


    }


  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }
})