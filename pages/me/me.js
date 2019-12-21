
var app = getApp();

Page({
  data: {
    logined: false
  },
  onLoad: function() {
    var that = this;
    var userInfo = app.globalData.userInfo;
    console.log('userinfo', userInfo)
    if (userInfo) {
      this.setData({
        logined: true,
        userInfo
      })
    }
  },
  bindGetUserInfo(e) {
    console.log(e.detail.userInfo)
    const userInfo = e.detail.userInfo
    console.log('userInfo: ', userInfo);

    this.setData({
      userInfo,
      logined: true
    })
    app.globalData.userInfo = userInfo;
  },
  toDetail(e) {
    console.log(e)
    var target = e.currentTarget.dataset.target;
    if (!this.data.logined) {
      wx.showToast({
        title: '请先登录！',
        icon: 'warning'
      })
    } else {
      wx.navigateTo({
        url: `/pages/me/${target}/${target}`
      })
    }

  }

});