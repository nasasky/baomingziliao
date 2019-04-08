// 获取数据的方法，具体怎么获取列表数据大家自行发挥
var GetList = function(that) {
  that.setData({
    hidden: false
  });
  var id = that.data.id


}
Page({
  data: {

    list: [],



  },
  onLoad: function(options) {
    //  这里要非常注意，微信的scroll-view必须要设置高度才能监听滚动事件，所以，需要在页面的onLoad事件中给scroll-view的高度赋值

    console.log(options)
    this.setData({
      id: options.id,

    })

    wx.setNavigationBarTitle({
      // title: that.data.title //页面标题为路由参数
      title: '活动掠影',

    })

var that=this;
    var id = this.data.id;
    wx.request({

      url: 'https://hg.airyee.com/tools/small_program.ashx?action=activity_img_list',

      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      method: "POST",
      // data: JSON.stringify(js),
      data: {

        id: id

      },

      success: function (res) {


        //console.info(that.data.list);
        var list = that.data.list;
        console.log(list)

        if (res.data.status == 0) {

          wx.showToast({

            title: '活动没有相册',
            icon: 'loading',
            duration: 1500

          })

        } else {
          for (var i = 0; i < res.data.list.length; i++) {
            list.push(res.data.list[i]);
          }
          that.setData({
            list: list
          });

          that.setData({
            hidden: true
          });

        }


      },
      //预览图片



    });



  },
  onShow: function() {
    //  在页面展示之后先获取一次数据
    var that = this;
 

  },

  

  previewImage: function(e) {
    
    console.log(e.currentTarget.dataset.index);
    var index = e.currentTarget.dataset.index;
    console.log('dddd' + index)
    // var imgList = this.data.list[index].img_utl;
    // var imgList = JSON.parse(this.data.list[index].img_utl); 
    // imgList.push(this.data.list[index].img_utl);
    var imgList = [this.data.list[index].img_utl];
    // var imgList = imgList.push([this.data.list[index].img_utl]);
    console.log('dds' + imgList)
    wx.previewImage({
      current: this.data.list[index].img_utl, //当前图片地址
      urls: imgList, //所有要预览的图片的地址集合 数组形式 

    })
  }




})