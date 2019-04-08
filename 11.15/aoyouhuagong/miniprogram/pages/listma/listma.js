

Page({
  /**
   * 页面的初始数据
   */
  data: {
    name: '',//姓名
    phone: '',//手机号
    code: '',//验证码
    iscode: null,//用于存放验证码接口里获取到的code
    codename: '获取验证码'
  },
  //获取input输入框的值
  // getNameValue: function (e) {
  //   this.setData({
  //     name: e.detail.value
  //   })
  // },
  getPhoneValue: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },
  getCodeValue: function (e) {
    this.setData({
      code: e.detail.value
    })
  },
  getCode: function () {
    var a = this.data.phone;
    var _this = this;
    var myreg = /^(14[0-9]|13[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8}$$/;
    if (this.data.phone == "") {
      wx.showToast({
        title: '手机号不能为空',
        icon: 'none',
        duration: 1000
      })
      return false;
    } else if (!myreg.test(this.data.phone)) {
      wx.showToast({
        title: '请输入正确的手机号',
        icon: 'none',
        duration: 1000
      })
      return false;
    } else {
      var that = this
      var phone = this.data.phone;
      wx.request({
        url: 'https://hg.airyee.com/tools/small_program.ashx?action=send_sms_code',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'

        },
        method: "POST",
        data: {
         phone:phone
        },

        success(res) {
          console.log(res.data)
          _this.setData({
            iscode: res.data.msg
          })
          var num = 61;
          var timer = setInterval(function () {
            num--;
            if (num <= 0) {
              clearInterval(timer);
              _this.setData({
                codename: '重新发送',
                disabled: false
              })

            } else {
              _this.setData({
                codename: num + "s"
              })
            }
          }, 1000)
        }
      })

    }


  },
  //获取验证码
  getVerificationCode() {
    this.getCode();
    var _this = this
    _this.setData({
      disabled: true
    })
  },
  //提交表单信息
  save: function () {
    // var code = that.data.code;
    var myreg = /^(14[0-9]|13[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8}$$/;
    // if (this.data.name == "") {
    //   wx.showToast({
    //     title: '姓名不能为空',
    //     icon: 'none',
    //     duration: 1000
    //   })
    //   return false;
    // }
    if (this.data.phone == "") {
      wx.showToast({
        title: '手机号不能为空',
        icon: 'none',
        duration: 1000
      })
      return false;
    } else if (!myreg.test(this.data.phone)) {
      wx.showToast({
        title: '请输入正确的手机号',
        icon: 'none',
        duration: 1000
      })
      return false;
    }
    if (this.data.code == "") {
      wx.showToast({
        title: '验证码不能为空',
        icon: 'none',
        duration: 1000
      })
      return false;
    } else if (this.data.code != this.data.iscode) {
      wx.showToast({
        title: '验证码错误',
        icon: 'none',
        duration: 1000
      })
      console.log(this.data.code)
      console.log(this.data.iscode)
      return false;
    } else {
      // wx.setStorageSync('name', this.data.name);
      // wx.setStorageSync('phone', this.data.phone);
      
      var that = this
      var username = this.data.phone;
      wx.request({
        url: 'https://hg.airyee.com/tools/small_program.ashx?action=code_user_login',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'

        },
        method: "POST",
        data: {
          username: username
        },

        success(res) {
         
          console.log(res.data);
          that.setData({

            list: res.data,

            //res代表success函数的事件对，data是固定的，list是数组     

          })
          var str = res.data.msg;
          if (res.data.status == 0) {

            wx.showModal({
              title: str,
              showCancel: false,
              confirmColor: "#4E77CC",
              success: function (res) {
                if (res.confirm) {
                  console.log('用户点击确定')
                } else if (res.cancel) {
                  console.log('用户点击取消')
                }
              }
            })
            // console.log(that.data.list.msg)
            // wx.navigateTo({
            //   url: '../xiangqing/xiangqing?msg=' + that.data.list.msg,
            // })


          } else {

            wx.showToast({

              title: '提交成功！！！', //这里打印出登录成功

              icon: 'success',

              duration: 1000,

            })

            var username = this.data.phone;
            wx.setStorageSync('username', username);
            console.log(username)
            wx.redirectTo({
              url: '../tu/tu?id=' + that.data.list.id,
            })


          }
        
        }
      })
    }
  
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this



    console.log(options) //打印数据

    // 获取传过来的数据
    that.setData({
      id: options.id //options为页面路由过程中传递的pic参数

    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})