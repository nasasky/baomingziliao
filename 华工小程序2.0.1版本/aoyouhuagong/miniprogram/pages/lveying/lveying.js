
// 获取数据的方法，具体怎么获取列表数据大家自行发挥
var GetList = function(that) {
  that.setData({
    hidden: false
  });
 
  var id = that.data.id
  wx.request({
 
    url: 'https://hg.airyee.com/tools/small_program.ashx?action=activity_canyu',
    
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    method: "POST",
    // data: JSON.stringify(js),
    data: {
      
      id: id
     
    },
  
    success: function(res) {
      //console.info(that.data.list);
      var list = that.data.list;
      console.log(list)
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
   
  });
 

}
Page({
  data: {
    hidden: true,
    list: [],
    scrollTop: 0,
    scrollHeight: 0,
    hiddenitem: false,
   
    
  },
  onLoad: function (options) {
    //  这里要非常注意，微信的scroll-view必须要设置高度才能监听滚动事件，所以，需要在页面的onLoad事件中给scroll-view的高度赋值
    console.log(options)
    this.setData({
      id: options.id,
      
    })

    wx.setNavigationBarTitle({
      // title: that.data.title //页面标题为路由参数
      title: '活动人数',

    })

    var that = this;
 
    wx.getSystemInfo({
      success: function(res) {
        console.info(res.windowHeight);
        that.setData({
          scrollHeight: res.windowHeight
        });
      }
    });
  },

  onShow: function() {
    //  在页面展示之后先获取一次数据
    var that = this;
    GetList(that);
    var id = this.data.id;
  },
  // bindDownLoad: function() {
  //   //  该方法绑定了页面滑动到底部的事件
  //   var that = this;
  //   GetList(that);
  // },
  // scroll: function(event) {
    
  //   //  该方法绑定了页面滚动时的事件，我这里记录了当前的position.y的值,为了请求数据之后把页面定位到这里来。
  //   this.setData({
  //     scrollTop: event.detail.scrollTop
  //   });
  //   console.log(event.detail.scrollTop)
  // },


 
 




  
 
})