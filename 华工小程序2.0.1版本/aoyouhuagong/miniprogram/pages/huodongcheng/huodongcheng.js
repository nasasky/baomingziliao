//index.js
//获取应用实例
const app = getApp()

Page({

  data: {


  },

  // btnclick: function () {
  //   var onOff = this.data.onOff;
  //   this.setData({ onOff: !onOff });
  // },
  onLoad: function(options) {
    wx.setNavigationBarTitle({
      // title: that.data.title //页面标题为路由参数
      title: '发起活动成功',

    })

    // var that = this



    // console.log(options) //打印数据

    // // 获取传过来的数据
    // that.setData({
    //   msg: options.msg //options为页面路由过程中传递的pic参数

    // })



  },

  /**
   * 生命周期函数--监听页面显示
   */
  // onShow: function () {
  //   var msg = this.data.msg;
  //   console.log(msg)

  // },

  goB: function(e) {

    wx.switchTab({
      url: "../allx/allx"
    })
  },



})