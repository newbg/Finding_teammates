// pages/me/feedback/feedback.js
// 获取全局变量
var app = getApp();

Page({

  /**
   * Page initial data
   */
  data: {
    feedback: ""
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function(options) {

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

  },
  //获取textarea内容
  getFeedback: function (e) {
    var val = e.detail.value;
    this.setData({
      feedback: val
    })
    // console.log(e)
  },
  // 发送反馈信息
  sendFeedback: function() {
    var url = app.globalData.URL + '/feedback.php';
    var self = this;
    wx.request({
      url: url,
      data: {
        open_id: app.globalData.openId,
        feedback: this.data.feedback
      },
      method: 'GET',
      success: function(res) {
        console.log("feedback=====",res);
        wx.showToast({
          title: '感谢您的反馈',
          icon: 'success',
          duration: 2000
        })
        self.setData({
          feedback: ""
        })
        setTimeout(function () {
          wx.switchTab({
            url: '/pages/home/home'
          })
        }, 1000)
      }
    })
  }
})