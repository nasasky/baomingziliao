App({

  onLaunch: function() { //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    // 获取小程序更新机制兼容
    // if (wx.canIUse('getUpdateManager')) {
    //   const updateManager = wx.getUpdateManager()
    //   updateManager.onCheckForUpdate(function(res) { // 请求完新版本信息的回调 
    //     if (res.hasUpdate) {
    //       updateManager.onUpdateReady(function() {
    //         wx.showModal({
    //           title: '更新提示',
    //           content: '新版本已经准备好，是否重启应用？',
    //           success: function(res) {
    //             if (res.confirm) { // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启 
    //               updateManager.applyUpdate()
    //             }
    //           }
    //         })
    //       })
    //       updateManager.onUpdateFailed(function() { // 新的版本下载失败 
    //         wx.showModal({
    //           title: '已经有新版本了哟~',
    //           content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~',
    //         })
    //       })
    //     }
    //   })
    // } else { // 如果希望用户在最新版本的客户端上体验您的小程序，可以这样子提示
    //   wx.showModal({
    //     title: '提示',
    //     content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
    //   })
    // }





  },
  globalData: {
    user_name: "user_name",
    avatar: "avatar",
    token: "",
    userInfo: "",

    // BaseURL:"http://airb.cakeboss.com.cn" 
    // BaseURL:"http://192.168.0.107:8080" 
  },






  // appData: {
  //   userinfo: null,
  // }
  gCourse: {},



  convertHtmlToText: function convertHtmlToText(inputText) {
    var returnText = "" + inputText;
    returnText = returnText.replace(/<\/div>/ig, '\r\n');
    returnText = returnText.replace(/<\/li>/ig, '\r\n');
    returnText = returnText.replace(/<li>/ig, '  *  ');
    returnText = returnText.replace(/<\/ul>/ig, '\r\n');
    //-- remove BR tags and replace them with line break
    returnText = returnText.replace(/<br\s*[\/]?>/gi, "\r\n");

    //-- remove P and A tags but preserve what's inside of them
    returnText = returnText.replace(/<p.*?>/gi, "\r\n");
    returnText = returnText.replace(/<a.*href="(.*?)".*>(.*?)<\/a>/gi, " $2 ($1)");

    //-- remove all inside SCRIPT and STYLE tags
    returnText = returnText.replace(/<script.*>[\w\W]{1,}(.*?)[\w\W]{1,}<\/script>/gi, "");
    returnText = returnText.replace(/<style.*>[\w\W]{1,}(.*?)[\w\W]{1,}<\/style>/gi, "");
    //-- remove all else
    returnText = returnText.replace(/<(?:.|\s)*?>/g, "");

    //-- get rid of more than 2 multiple line breaks:
    returnText = returnText.replace(/(?:(?:\r\n|\r|\n)\s*){2,}/gim, "\r\n\r\n");

    //-- get rid of more than 2 spaces:
    returnText = returnText.replace(/ +(?= )/g, '');

    //-- get rid of html-encoded characters:
    returnText = returnText.replace(/ /gi, " ");
    returnText = returnText.replace(/&/gi, "&");
    returnText = returnText.replace(/"/gi, '"');
    returnText = returnText.replace(/</gi, '<');
    returnText = returnText.replace(/>/gi, '>');

    return returnText;
  },






})