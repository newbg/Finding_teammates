var app = getApp();
Page({
  data: {
  
  },
  onLoad(){
    // wx.hideShareMenu()
  },
  submit: function() {

    this.setData({

      showModal: true

    })

  },
  preventTouchMove: function() {
    console.log('catch mask touch event');
  },


  bindGetUserInfo(e) {
    console.log(e.detail.userInfo);
    const userInfo = e.detail.userInfo;
    console.log('userInfo: ', userInfo);
    this.setData({
      logined: true
    });
    app.globalData.userInfo = userInfo;
    wx.setStorageSync('userInfo', userInfo);
    wx.switchTab({
      url: '/pages/home/home',
    })
  },



})