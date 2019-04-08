Page({
  data: {
    img_url: [],
    content: ''
  },

  onLoad: function (options) {


    var that = this



    console.log(options) //打印数据

    // 获取传过来的数据
    that.setData({
      id: options.id //options为页面路由过程中传递的pic参数

    })



  },
  input: function (e) {
    this.setData({
      content: e.detail.value
    })
  },
  chooseimage: function () {
    var that = this;
    wx.chooseImage({
      count: 9, // 默认9  
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有  
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有  
      success: function (res) {

        if (res.tempFilePaths.length > 0) {

          //图如果满了9张，不显示加图
          if (res.tempFilePaths.length == 9) {
            that.setData({
              hideAdd: 1
            })
          } else {
            that.setData({
              hideAdd: 0
            })
          }

          //把每次选择的图push进数组
          let img_url = that.data.img_url;
          for (let i = 0; i < res.tempFilePaths.length; i++) {
            img_url.push(res.tempFilePaths[i])
          }
          that.setData({
            img_url: img_url
          })

        }

      }
    })
  },
  //发布按钮事件
  send: function () {
    var that = this;
    var id = this.data.id;
    // var user_id = wx.getStorageSync('userid')
    // wx.showLoading({
    //   title: '上传中',
    // })
    that.img_upload()
  },
  //图片上传
  img_upload: function () {
    let that = this;
    var id = this.data.id;
    let img_url = that.data.img_url;
    let img_url_ok = [];
    //由于图片只能一张一张地上传，所以用循环
    for (let i = 0; i < img_url.length; i++) {
      wx.uploadFile({
        //路径填你上传图片方法的地址
        url: 'https://hg.airyee.com/tools/small_program.ashx?action=activity_img',
        filePath: img_url[i],
        name: 'file',
        formData: {
          'user': 'test',
          id:id
          
        },
        success: function (res) {
          console.log('上传成功');
          console.log(res.data)
          wx.showToast({

            title: '上传成功！！！',
            icon: 'loading',
            duration: 1500

          })
          wx.redirectTo({
            url: '../xiangqingc/xiangqingc',
          })



          //把上传成功的图片的地址放入数组中
          // img_url_ok.push(res.data)
          // console.log(res.data)
          // console.log(img_url_ok)
          //如果全部传完，则可以将图片路径保存到数据库
          // if (img_url_ok.length == img_url.length) {
          //   var userid = wx.getStorageSync('userid');
          //   var content = that.data.content;
          //   wx.request({
          //     url: '',

          //     method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          //     data: {
          //       user_id: userid,
          //       images: img_url_ok,
          //       content: content,
          //     },
          //     success: function (res) {
          //       if (res.data.status == 1) {
          //         wx.hideLoading()
          //         wx.showModal({
          //           title: '提交成功',
          //           showCancel: false,
          //           success: function (res) {
          //             if (res.confirm) {
          //               wx.navigateTo({
          //                 url: '/pages/my_moments/my_moments',
          //               })
          //             }
          //           }
          //         })
          //       }
          //     }
          //   })
          // }
        },
        fail: function (res) {
          console.log('上传失败')
        }
      })
    }
  },

  delImg: function (e) {
    var index = e.currentTarget.dataset.index;
    var img_url = this.data.img_url;
    var that = this;
    wx.showModal({
      title: '提示',
      content: '确定要删除此商品吗？',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          img_url.splice(index, 1);
        } else if (res.cancel) {
          return false
          console.log('用户点击取消')
        }
        that.setData({
          img_url: img_url
        });
      }
    })
  },


  goc: function (e) {

    wx.redirectTo({
      url: "../huodongcheng/huodongcheng"
    })
  },


})