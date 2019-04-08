
//login.js
//获取应用实例
var app = getApp();


Page({
  data: {
    user_name: "",
    password: ""
  },

  /** 监听帐号输入 */
  listenerUsernameInput: function (e) {
    this.data.user_name = e.detail.value;
  },
  /** 监听密码输入 */
  listenerPasswordInput: function (e) {
    this.data.password = e.detail.value;
  },
  // 登录按钮点击事件
  loginAction: function () {

    var user_name = this.data.user_name;
    var password = this.data.password;
    var that = this;
    console.log(user_name);
    console.log(password);
    if (user_name === "") {
      wx.showToast({
        type: 'text',
        timer: 1000,
        color: '#fff',
        text: "用户名不能为空！",
        success: () => console.log('用户名不能为空！')
      })
      return;
    } if (password === "") {
      wx.showToast({
        type: 'text',
        timer: 1000,
        color: '#fff',
        text: "密码不能为空！",
        success: () => console.log('密码不能为空！')
      })
      return;
    }

    //加载提示框
    // util.showLoading("登录中...");

    // var urlStr = app.globalData.BaseURL + '/api/adminUser/login';
    wx.request({
      method: "POST",
      url: 'http://hg.airyee.com/tools/small_program.ashx?action=user_login', //仅为示例，并非真实的接口地址
      data: JSON.stringify({
        user_name: user_name,
        password: password
      }),
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        // util.hideToast();
        console.log(res.data);
        var code = res.data[0].msg;
        console.log(code);
         
        if (code === "登录成功") {
          console.log('我来过了');
          // 后台传递过来的值
          var user_name = res.data[0].user_name;
          console.log(user_name);
         
        
          // var token = res.data[0].token;
          // 设置全局变量的值
          
          // app.globalData.user_name = res.data[0].data.user_name;
          // app.globalData.token = res.data.data.token;
          // 将token存储到本地
          wx.setStorageSync('user_name', user_name);
          // wx.setStorageSync('token', token);
          console.log("登录成功的user_name：" + user_name);
          // console.log("登录成功的token：" + token);
          // 切换到首页
          app.appData.userinfo = { user_name: this.data.user_name, password: this.data.password }
          wx.redirectTo({ url: "../center/center" })
          
        }
        
        
        
        
         else {
          wx.showToast({
            type: 'text',
            timer: 1000,
            color: '#fff',
            text: res.data.msg,
            success: () => console.log('登录失败，请稍后重试。' + res.data.msg)
          })
        }
      },
      fail: function () {
        // util.hideToast();
        console.log("登录失败");
        wx.showToast({
          type: 'text',
          timer: 1000,
          color: '#fff',
          text: '服务器君好累??，请稍后重试',
          success: () => console.log('登录失败')
        })
      }
    })
  }




})