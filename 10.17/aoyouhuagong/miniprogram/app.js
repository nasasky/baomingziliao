App({

  onLaunch: function () { //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
     logs.unshift(Date.now())
      wx.setStorageSync('logs', logs)
    
    
  },
  globalData: {
    user_name: "user_name",
    token: "",
    userInfo: "",
    // BaseURL:"http://airb.cakeboss.com.cn" 
    // BaseURL:"http://192.168.0.107:8080" 
  },





  appData: {
    userinfo: null,
  
  }


})

