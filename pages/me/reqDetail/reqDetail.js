// pages/me/reqDetail/reqDetail.js
var app = getApp();
Page({

  /**
   * Page initial data
   */
  data: {

  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function(options) {
    console.log('entry options', options);
    var info = JSON.parse(options.info);
    // var keys = [];
    // Object.keys(info).forEach(key => {
    //   keys.push(key);
    // })
    // console.log('keys', keys);
    this.setData({
      ...info
    })
  },

  handleAgree(e){
    var self = this;
    wx.request({
      url: app.globalData.URL + '/operate.php',
      data: {
        id: e.currentTarget.dataset.msgId,
        status: 'agree'
      },
      success: res => {
        self.setData({
          status: 'agree'
        })
      }
    })
  },
  handleRefuse(e){
    var self = this;
    wx.request({
      url: app.globalData.URL + '/operate.php',
      data: {
        id: e.currentTarget.dataset.msgId,
        status: 'refuse'
      },
      success: res => {
        wx.showToast({
          title: '已拒绝！',
        }),
        self.setData({
          status: 'refused'
        })
      }
    }) 
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function() {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function() {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function() {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function() {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function() {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function() {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function() {

  }
})