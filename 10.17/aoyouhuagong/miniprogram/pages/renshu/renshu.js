//index.js
//获取应用实例
const app = getApp()

Page({

    data: {
     
      time: '12:00',
      array: ['华工广州校友会', '足球俱乐部', '篮球俱乐部', '羽球俱乐部', '企业交流俱乐部', '投资俱乐部', '羽球俱乐部', '广州校友董事会'],
      index: 0,

    },

    onLoad: function() {

    },

    bindTimeChange: function(e) {
      this.setData({
        time: e.detail.value
      })
    },
    bindDateChange: function(e) {
      this.setData({
        date: e.detail.value
      })
    },
    bindPickerChange: function(e) {
      this.setData({
        index: e.detail.value
      })
    },
  bindStartTimeChange: function (e) {
    this.setData({
      startDate: e.detail.value
    });
  },

  

  formSubmit: function(e) {

    //console.log(e.detail.value);
    if (e.detail.value.xingming.length == 0 || e.detail.value.xingming.length >= 8) {

      wx.showToast({

        title: '姓名不能为空或过长!',

        icon: 'loading',

        duration: 1500

      })

      setTimeout(function() {

        wx.hideToast()

      }, 2000)

    } else if (e.detail.value.xingbie.length == 0) {

      wx.showToast({

        title: '性别不能为空!',

        icon: 'loading',

        duration: 1500

      })

      setTimeout(function() {

        wx.hideToast()

      }, 2000)

    } else if (e.detail.value.aihao.length == 0) {

      wx.showToast({

        title: '爱好不能为空!',

        icon: 'loading',

        duration: 1500

      })

      setTimeout(function() {

        wx.hideToast()

      }, 2000)

    } else {


      wx.request({

        url: 'https://nasasky.com.cn/weixin/form.php',

        header: {

          "Content-Type": "application/x-www-form-urlencoded"

        },

        method: "POST",

        data: {
          xingming: e.detail.value.xingming,
          xingbie: e.detail.value.xingbie,
          aihao: e.detail.value.aihao
        },

        success: function(res) {
          console.log(res.data);
          if (res.data.status == 0) {

            wx.showToast({

              title: '提交失败！！！',

              icon: 'loading',

              duration: 1500

            })

          } else {

            wx.showToast({

              title: '提交成功！！！', //这里打印出登录成功

              icon: 'success',

              duration: 1000

            })

          }

        }

      })

    }

  },

})