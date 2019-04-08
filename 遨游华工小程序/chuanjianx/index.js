Page({
  data: {
    img_url: [],
    content: '',
    shijian: '',
    hx_index: '0',
    xingbie:''

  },
  onLoad: function(options) {

  },
  bindDateChange: function(e) {
    this.setData({
      date: e.detail.value
    })

  },
  bindDateChangev: function (e) {
    this.setData({
      time: e.detail.value
    })

  },
  bindDateChangex: function(e) {
    this.setData({
      datex: e.detail.value
    })

  },


  bindPickerChange_hx: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value);
    this.setData({ //给变量赋值
      hx_index: e.detail.value, //每次选择了下拉列表的内容同时修改下标然后修改显示的内容，显示的内容和选择的内容一致
    })
    var ins = e.detail.value;
    console.log('我携带的', ins)
  },


  input: function(e) {
    this.setData({
      content: e.detail.value,

    })

  },
  inputx: function(e) {

    this.setData({
      mingcheng: e.detail.value,

    })

  },
  inputdi: function (e) {

    this.setData({
      didian: e.detail.value,

    })

  },

  minger: function (e) {

    this.setData({
      minger: e.detail.value,

    })

  },

  feiyong: function (e) {

    this.setData({
      feiyong: e.detail.value,

    })

  },
  dianhua: function (e) {

    this.setData({
      dianhua: e.detail.value,

    })

  },

  duifang: function (e) {

    this.setData({
      duifang: e.detail.value,

    })

  },
  // huodongsi: function (e) {

  //   this.setData({
  //     xingbie: e.detail.value,

  //   })

  // },

  // inputime: function (e) {

  //   this.setData({
  //     shijian: e.detail.shijian,

  //   })
  //   console.log(shijian)
  // },
  onShow: function(e) {
    var that = this;
    wx.request({
      url: 'https://hg.airyee.com/tools/small_program.ashx?action=club_list', //仅为示例，并非真实的接口地址
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      data: {

      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {

        that.setData({

          pic_array: res.data.list,
        })

      }
    });

  },


  chooseimage: function() {
    var that = this;
    wx.chooseImage({
      count: 9, // 默认9  
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有  
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有  
      success: function(res) {

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
  formSubmit: function(e) {

    if (e.detail.value.mingcheng == "") {

      wx.showToast({

        title: '不能为空!',

        icon: 'loading',

        duration: 1500

      })

      setTimeout(function() {

        wx.hideToast()

      }, 2000)

    } else if (e.detail.value.didian == "") {

      wx.showToast({

        title: '地点不为空',

        icon: 'loading',

        duration: 1500

      })

      setTimeout(function() {

        wx.hideToast()

      }, 2000)

    } else if (e.detail.value.minger == "") {

      wx.showToast({

        title: '地点不为空',

        icon: 'loading',

        duration: 1500

      })

      setTimeout(function() {

        wx.hideToast()

      }, 2000)

    } else if (e.detail.value.feiyong == "") {

      wx.showToast({

        title: '地点不为空',

        icon: 'loading',

        duration: 1500

      })

      setTimeout(function() {

        wx.hideToast()

      }, 2000)

    } else if (e.detail.value.dianhua == "") {

      wx.showToast({

        title: '地点不为空',

        icon: 'loading',

        duration: 1500

      })

      setTimeout(function() {

        wx.hideToast()

      }, 2000)

    } else if (e.detail.value.content == "") {

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

    } else {
      var that = this;
      var user_id = wx.getStorageSync('userid')
      // that.img_upload()
      var content = that.data.content;
      var shijian = that.data.date;
      var time = that.data.time;
      var shijianx =that.data.datex;
      var didian=that.data.didian;
      var mingcheng = that.data.mingcheng;
      var minger=that.data.minger;
      var feiyong=that.data.feiyong;
      var dianhua=that.data.dianhua;
      var duifang=that.data.duifang;
      var xingbie = e.detail.value.xingbie;
      console.log('picker的携带值为' + e.detail.value.picker_hx)
      var ins = this.data.pic_array[e.detail.value.picker_hx - 1].id
      console.log('vb', ins)
      wx.request({
        url: 'https://hg.airyee.com/tools/small_program.ashx?action=activity_fa',

        method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT


        data: {
          user_name:'test',

          ins:ins,//俱乐部
          mingcheng: mingcheng,//活动名称
          shijian: shijian,//报名截止时间
          shijianx: shijianx,//活动日期
          time: time,//活动时间
          didian:didian,//活动地点
          minger:minger,//活动名额
          feiyong:feiyong,//活动费用
          dianhua:dianhua,//电话
          content: content,//活动内容
          duifang: duifang,//比赛双方
          xingbie:xingbie//活动私密
        },

        header: {

          "Content-Type": "application/x-www-form-urlencoded"

        },
        success: function(res) {
          console.log(res.data);
          that.setData({

            list: res.data,

            //res代表success函数的事件对，data是固定的，list是数组     

          })
          if (res.data.status == 0) {

            wx.showToast({

              title: '提交失败！！！',
              icon: 'loading',
              duration: 1500

            })
            console.log(that.data.list.msg)
            wx.navigateTo({
              url: '../xiangqing/xiangqing?msg=' + that.data.list.msg,
            })


          } else {

            wx.showToast({

              title: '提交成功！！！', //这里打印出登录成功

              icon: 'success',

              duration: 1000,

            })


            console.log(that.data.list.id)
            wx.navigateTo({
              url: '../tu/index?id=' + that.data.list.id,
            })


          }

        }


      })
    }



  },






  //图片上传
  // img_upload: function() {
  //   let that = this;
  //   let img_url = that.data.img_url;
  //   let img_url_ok = [];
  //   //由于图片只能一张一张地上传，所以用循环
  //   for (let i = 0; i < img_url.length; i++) {
  //     wx.uploadFile({
  //       //路径填你上传图片方法的地址
  //       url: 'https://hg.airyee.com/tools/small_program.ashx?action=activity_img',
  //       filePath: img_url[i],
  //       name: 'file',
  //       formData: {
  //         'user': 'test'
  //       },
  //       success: function(res) {
  //         console.log('上传成功');
  //         //把上传成功的图片的地址放入数组中
  //         img_url_ok.push(res.data)
  //         console.log(res.data)
  //         console.log(img_url_ok)
  //         //如果全部传完，则可以将图片路径保存到数据库
  //         if (img_url_ok.length == img_url.length) {
  //           var userid = wx.getStorageSync('userid');

  //           wx.request({
  //             url: 'https://nasasky.com.cn/webapi/formx.php',
  //             data: {
  //               user_id: userid,


  //             },
  //             success: function(res) {
  //               // if (res.data.status == 1) {
  //               //   wx.hideLoading()
  //               //   wx.showModal({
  //               //     title: '提交成功',
  //               //     showCancel: false,
  //               //     success: function(res) {
  //               //       if (res.confirm) {
  //               //         wx.navigateTo({
  //               //           url: '/pages/my_moments/my_moments',
  //               //         })
  //               //       }
  //               //     }
  //               //   })
  //               // }
  //             }
  //           })
  //         }
  //       },
  //       fail: function(res) {
  //         console.log('上传失败')
  //       }
  //     })
  //   }
  // },

  // delImg: function(e) {
  //   var index = e.currentTarget.dataset.index;
  //   var img_url = this.data.img_url;
  //   var that = this;
  //   wx.showModal({
  //     title: '提示',
  //     content: '确定要删除此商品吗？',
  //     success: function(res) {
  //       if (res.confirm) {
  //         console.log('用户点击确定')
  //         img_url.splice(index, 1);
  //       } else if (res.cancel) {
  //         return false
  //         console.log('用户点击取消')
  //       }
  //       that.setData({
  //         img_url: img_url
  //       });
  //     }
  //   })
  // },


})