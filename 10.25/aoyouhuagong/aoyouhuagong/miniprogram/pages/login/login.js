
//login.js
//获取应用实例
var app = getApp();


Page({
  data: {
    user_name: "",
    password: "",
    userinfo:"",

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
        title: '用户名不能为空',
        icon: 'none',
        duration: 2000,
        success: () => console.log('用户名不能为空！')
      })
      return;
    } if (password === "") {
      wx.showToast({
        title: '密码不能为空',
        icon: 'none',
        duration: 2000,
        success: () => console.log('密码不能为空！')
      })
      return;
    }

    //加载提示框
    // util.showLoading("登录中...");

    // var urlStr = app.globalData.BaseURL + '/api/adminUser/login';
    wx.request({
      method: "POST",
      url: 'https://hg.airyee.com/tools/small_program.ashx?action=user_login', //仅为示例，并非真实的接口地址
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

        // listenerStorageSave: function() { //以键值对的形式存储 传进去的是个对象
        //  wx.setStorage({ 
        //    key: 'key',
        //     data: '我是storeage异步存储的信息', 
        //     success: function(res) {
        //        console.log(res)
        //         } 
        //         })
        //  }



        // if (res && res.header && res.header['user_name']) {
        //   wx.setStorageSync('key', res.header['user_name']);//保存Cookie到Storage
        // } 
        if (code === "登录成功") {
          console.log('我来过了');
          // 后台传递过来的值
          var user_name = res.data[0].user_name;
          var nick_name = res.data[0].nick_name;
          var avatar= res.data[0].avatar;
          console.log(user_name);
          console.log(nick_name);
          console.log(avatar);

          // model.user_name
          // session['123']=model
          // session['123'] != null ? model = (model)session['123']:""

          // // var token = res.data[0].token;
          // // 设置全局变量的值

          app.globalData.user_name = res.data[0].user_name;
          // app.globalData.avatar = res.data[0].avatar;
          // // app.globalData.token = res.data.data.token;
          // // 将token存储到本地


          wx.setStorageSync('user_name', user_name);
          wx.setStorageSync('password', password);
          wx.setStorageSync('nick_name', nick_name);
          wx.setStorageSync('avatar', avatar);
          // wx.setStorageSync('userinfo', userinfo);
          // wx.setStorageSync('token', token);
          console.log("登录成功的user_name：" + user_name);
          // console.log("登录成功的token：" + token);
          // 切换到首页
          // app.globalData.avatar = { avatar: res.data[0].avatar }
          console.log('我的值')
          wx.switchTab({ url: "../all/all" })

          that.setData({
            list: res.data,         //res代表success函数的事件对，data是固定的，list是数组     

          })

        }


        else {
          wx.showToast({
            title: '登录失败，请稍后重试',
            icon: 'none',
            duration: 2000,
            success: () => console.log('登录失败，请稍后重试。' + res.data.msg)
          })
        }




      },
      fail: function () {
        // util.hideToast();
        console.log("登录失败");
        wx.showToast({
          title: '服务器接口出问题??，请稍后重试',
          icon: 'none',
          duration: 2000,

          success: () => console.log('登录失败')
        })
      }


    })
  },




})







// var app = getApp();

// Page({
//   data:{
//     username:null,
//     password:null,
//   },
//   onLoad:function(options){
   
//   },
//   onReady:function(){
    
//   },
//   onShow:function(){
//     // 页面显示
//   },
//   onHide:function(){
//     // 页面隐藏
//   },
//   onUnload:function(){
//     // 页面关闭
//   },

//  loginCBtnClick:function (){
//    app.appData.userinfo = {username:this.data.username,password:this.data.password}
//    console.log()
//    wx.switchTab ({url:"../user/user"})
//   },

//   usernameInput : function (event){

//     console.log(event)
//     this.setData({username:event.detail.value})
//   },

//   passwordInput : function (event){
//     this.setData({password:event.detail.value})
//   }


// })