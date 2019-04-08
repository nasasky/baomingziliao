var WxParse = require('../../wxParse/wxParse.js');
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    pic: ''
  },
 

 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
  

   
    console.log(options) //打印数据
   
    // 获取传过来的数据
    that.setData({
      id: options.id //options为页面路由过程中传递的pic参数
      
    })

   
    wx.setNavigationBarTitle({
      // title: that.data.title //页面标题为路由参数
      title:'活动详情',
      
    })
    wx.hideToast();
   
    
    wx.showToast({
      title: '加载君正在加载',
      icon: 'loading',
      duration: 100000
    })
  },
  
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var id = this.data.id;
    console.log(id)
    var that = this
 
    wx.request({
     
      url: 'https://hg.airyee.com/tools/small_program.ashx?action=activity_detail',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'

      },
      method: "POST",
      // data: JSON.stringify(js),
      data: {
        id: id,

      },


      success: function (res) {         //将获取到的json数据，存在名字叫list的这个数组中

        console.log(res.data)




        that.setData({

          lists: res.data,

          //res代表success函数的事件对，data是固定的，list是数组     

        })

        var h_content = res.data.h_content;
        WxParse.wxParse('h_content', 'html', h_content, that, 5); 
      }
     
    }) 
    setTimeout(function () {
      wx.hideToast()
    }, 1000)

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})