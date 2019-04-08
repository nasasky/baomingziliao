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
    wx.setNavigationBarTitle({
      // title: that.data.title //页面标题为路由参数
      title: '报名活动',

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
          var str = res.data.msg;
          if (res.data.status == 0) {
            wx.showModal({
              content: str,
            showCancel:false,
              success: function (res) {
                if (res.confirm) {
                  console.log('用户点击确定')
                } else if (res.cancel) {
                  console.log('用户点击取消')
                }
              }
            })

            // wx.navigateTo({
            //   url: '../xiangqing/xiangqing?msg=' + that.data.list.msg,
            // })

          } else {

            wx.showModal({
              content: str,
              showCancel: false,
              success: function (res) {
                if (res.confirm) {
                  console.log('用户点击确定')
                  
                  wx.switchTab({
                    url: "../user/user"
                  })

                } else if (res.cancel) {
                  console.log('用户点击取消')
                }
              }
            })


            // wx.redirectTo({
            //   url: '../xiangqing/xiangqing?msg=' + that.data.list.msg,

            // })

          }

        },


      })

    }

  },


})