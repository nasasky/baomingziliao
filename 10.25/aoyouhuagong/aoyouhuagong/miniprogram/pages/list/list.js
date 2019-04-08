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
      id: options.id, //options为页面路由过程中传递的pic参数
      title: options.title, //options为页面路由过程中传递的title参数
      number:options.number,
      cost:options.cost,
      article_name: options.article_name,
      other_party: options.other_party,
      initiator: options.initiator,
      user_cont: options.user_cont,
      begin_time: options.begin_time,
      address:options.address,
      h_content:options.h_content
    })
    wx.setNavigationBarTitle({
      // title: that.data.title //页面标题为路由参数
      title:'活动详情',
      
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