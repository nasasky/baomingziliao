//index.js
//获取应用实例
const app = getApp()

Page({

  data: {
    imglist: [],
    time: '12:00',
    array: [ '华工广州校友会', '足球俱乐部', '篮球俱乐部', '羽球俱乐部', '企业交流俱乐部', '投资俱乐部', '羽球俱乐部', '广州校友董事会'],
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
  bindPickerChange: function (e) {
    var that=this;
    console.log('picker发送选择改变，携带下标为', e.detail.value)
    console.log('picker发送选择改变，携带值为', this.data.array[e.detail.value])
    this.setData({
      index: e.detail.value,
     
    })
    console.log(e.detail.value)
  },

  bindStartTimeChange: function(e) {
    this.setData({
      startDate: e.detail.value
    });
  },





  formSubmit: function(e) {

    self = this
    //图片
    var imglist = self.data.imglist
    //提问内容
    var content = e.detail.value.content;
    if (content == '') {
      wx.showToast({
        title: '内容不能为空',
        icon: 'loading',
        duration: 1000,
        mask: true
      })
    }
    wx.showLoading({
      title: '正在提交...',
      mask: true
    })

  
    //console.log(e.detail.value);
    if (e.detail.value.mingcheng == "") {

      wx.showToast({

        title: '姓名不能为空或过长!',

        icon: 'loading',

        duration: 1500

      })

      setTimeout(function() {

        wx.hideToast()

      }, 2000)

    } else if (e.detail.value.xingbie == "") {

      wx.showToast({

        title: '性别不能为空!',

        icon: 'loading',

        duration: 1500

      })

      setTimeout(function() {

        wx.hideToast()

      }, 2000)

    } else if (e.detail.value.aihao == "") {

      wx.showToast({

        title: '爱好不能为空!',

        icon: 'loading',

        duration: 1500

      })

      setTimeout(function() {

        wx.hideToast()

      }, 2000)

    } else {
      console.log('picker的携带值为' + e.detail.value.julebu) 
      var ins = this.data.array[e.detail.value.julebu]  
      console.log('vb',ins)

      //添加问题
      wx.request({
        url: 'https://nasasky.com.cn/webapi/formx.php',
     
        method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      

        data: {
          ins: ins,
          mingcheng: e.detail.value.mingcheng,
          didian: e.detail.value.didian,
          minger: e.detail.value.minger,
          feiyong: e.detail.value.feiyong,
          dianhua: e.detail.value.dianhua,
          neirong: e.detail.value.neirong,
          shijian: e.detail.value.shijian
        },

        header: {

          "Content-Type": "application/x-www-form-urlencoded"

        }, // 设置请求的 header
        success: function (res) {
          // success
          if (res.data.status == 1) {
            if (imglist != '') {
              //开始插入图片
              for (var i = 0; i < imglist.length; i++) {
                //上传至服务器
                wx.uploadFile({
                  url: 'https://nasasky.com.cn/webapi/mini/img.php', //仅为示例，非真实的接口地址
                  filePath: imglist[0],
                  name: 'files',
                  formData: {
                    'wtid': res.data
                  },
                  header: app.globalData.header,
                  success: function (res) {
                    if (i >= imglist.length) {
                      self.setData({
                        imglist: []
                      })
                      wx.hideLoading();
                      wx.showToast({
                        title: '提问成功',
                        icon: 'success',
                        duration: 2000,
                        mask: true
                      })
                      wx.navigateBack({
                        delta: 1
                      })
                    }
                  }
                })
              }
              console.log(imglist);
            } else {
              wx.hideLoading();
              wx.showToast({
                title: '提问成功',
                icon: 'success',
                duration: 2000,
                mask: true
              })
              wx.navigateBack({
                delta: 1
              })
            }
          } else {
            wx.hideLoading();
            wx.showToast({
              title: '失败',
              icon: 'loading',
              duration: 1000,
              mask: true
            })
          }
        },
        fail: function (res) {
          self.onLoad();
        }
      })








      // wx.request({

      //   url: 'https://nasasky.com.cn/weixin/formx.php',

      //   header: {

      //     "Content-Type": "application/x-www-form-urlencoded"

      //   },

      //   method: "POST",

      //   data: {
      //     ins: ins,
      //     mingcheng: e.detail.value.mingcheng,
      //     didian: e.detail.value.didian,
      //     minger: e.detail.value.minger,
      //     feiyong: e.detail.value.feiyong,
      //     dianhua: e.detail.value.dianhua,
      //     neirong: e.detail.value.neirong,
      //     shijian: e.detail.value.shijian
      //   },

      //   success: function(res) {
      //     console.log(res.data);
      //     if (res.data.status == 0) {

      //       wx.showToast({

      //         title: '提交失败！！！',

      //         icon: 'loading',

      //         duration: 1500

      //       })

      //     } else {

      //       wx.showToast({

      //         title: '提交成功！！！', //这里打印出登录成功

      //         icon: 'success',

      //         duration: 1000,
              
      //       })
          
             
      //             wx.navigateTo({
      //               url: "../index/index"
      //             })
              
      //     }

      //   }

      // })

    }

  },
  //点击选择图片
  checkimg: function() {
    console.log('点击选择图片');
    self = this
    wx.chooseImage({
      count: 9, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function(res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
        self.setData({
          imglist: tempFilePaths
        })
        console.log(tempFilePaths)
      }
    })
  },
  //点击预览图片
  // ylimg: function(e) {
  //   wx.previewImage({
  //     current: e.target.dataset.src,
  //     urls: this.data.imglist // 需要预览的图片http链接列表
  //   })
  // },
  delImg: function (e) {
    var index = e.currentTarget.dataset.index;
    var imglist = this.data.imglist;
    var that = this;
    wx.showModal({
      title: '提示',
      content: '确定要删除此商品吗？',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          imglist.splice(index, 1);
        } else if (res.cancel) {
          return false
          console.log('用户点击取消')
        }
        that.setData({
          imglist: imglist
        });
      }
    })
  },


})