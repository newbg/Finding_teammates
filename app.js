//app.js
App({
  onLaunch: function() {
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        // console.log("wx.login.code", res.code)

        var openid = '';
        var code = res.code;
        var self = this;
        wx.request({
          url: self.globalData.URL + '/gget_openid.php',
          data: {
            code: code
          },
          header: {
            'content-type': 'application/json'
          },
          success: res => {
            console.log('get openid res: ', res);
            openid = res.data;
            self.globalData.openId = openid;
            // console.log('login res: ', self.globalData.openId)

          }
        })

      }
    });
    //获取用户信息
    var flag = true;
    var userInfo = wx.getStorageSync('userInfo');
    if(userInfo == '') {
      flag = false;
    }
    else {
      this.globalData.userInfo = userInfo;
    }
    if(!flag)
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
              // console.log(this.globalData.userInfo);
              wx.setStorageSync("userInfo", res.userInfo);
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    openId: '',
    URL: "https://webexercise.xyz/weixin"
  }


})