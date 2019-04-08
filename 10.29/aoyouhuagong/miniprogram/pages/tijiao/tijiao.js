//index.js
//获取应用实例
const app = getApp()

Page({

  data: {
    id: '',
    time: '12:00',
    tel: '',
    index: 0,
    // onOff: true 
  },

  // btnclick: function () {
  //   var onOff = this.data.onOff;
  //   this.setData({ onOff: !onOff });
  // },
  onLoad: function(options) {
    console.log(options)
    this.setData({
      id: options.id,
      tel: options.tel,
    })

    var that = this
    wx.getStorage({
      key: 'user_name',
      success: function(res) {
        that.setData({
          user_name: res.data
        })
      },
    })
    wx.getStorage({
      key: 'nick_name',
      success: function(res) {
        console.log(res.data)
        that.setData({
          nick_name: res.data
        })
      },
    })




  },

  // bindTimeChange: function(e) {
  //   this.setData({
  //     time: e.detail.value
  //   })
  // },
  // bindDateChange: function(e) {
  //   this.setData({
  //     date: e.detail.value
  //   })
  // },
  // bindPickerChange: function(e) {
  //   this.setData({
  //     index: e.detail.value
  //   })
  // },
  // bindStartTimeChange: function(e) {
  //   this.setData({
  //     startDate: e.detail.value
  //   });
  // },





  formSubmit: function(e) {

    //console.log(e.detail.value);
    if (e.detail.value.user_name == "") {

      wx.showToast({

        title: '手机号不能为空!',

        icon: 'loading',

        duration: 1500

      })

      setTimeout(function() {

        wx.hideToast()

      }, 2000)

    } else if (e.detail.value.nick_name == "") {

      wx.showToast({

        title: '姓名不能为空!',

        icon: 'loading',

        duration: 1500

      })

      setTimeout(function() {

        wx.hideToast()

      }, 2000)

    } else if (e.detail.value.suixing == "") {

      wx.showToast({

        title: '随行人数不能为空!',

        icon: 'loading',

        duration: 1500

      })

      setTimeout(function() {

        wx.hideToast()

      }, 2000)

    } else {
      var that = this
      var id = this.data.id;
      var tel = this.data.tel;
      console.log(id)
      wx.request({

        url: 'https://hg.airyee.com/tools/small_program.ashx?action=activity_bao',

        header: {

          "Content-Type": "application/x-www-form-urlencoded"

        },

        method: "POST",

        data: {
          // index: e.detail.value.index,
          id: id,
          tel: tel,
          user_name: e.detail.value.user_name,
          nick_name: e.detail.value.nick_name,
          suixing: e.detail.value.suixing,

        },

        success: function(res) {
          // console.log(res.data);

          that.setData({

            list: res.data,

            //res代表success函数的事件对，data是固定的，list是数组     

          })

          if (res.data.status == 0) {


            wx.navigateTo({
              url: '../xiangqing/xiangqing?msg=' + that.data.list.msg,
            })

          } else {

            wx.showToast({

              title: '提交成功！！！', //这里打印出登录成功

              icon: 'success',

              duration: 1000,

            })


            wx.navigateTo({
              url: "../index/index?msg={{list.msg}}"

            })

          }

        },


      })

    }

  },


})