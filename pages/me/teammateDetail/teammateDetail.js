// pages/me/applyDetail/applyDetail.js
var app = getApp();
Page({

  /**
   * Page initial data
   */
  data: {
    detail: null
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    console.log("options==",options)
    var self = this;
    // var Id = e.currentTarget.dataset.index;
    // console.log("e=====",e)
    wx.request({
      url: app.globalData.URL + '/detail_teammate.php',
      data: {
        jopen_id: options.id,
        team_id: wx.getStorageSync("team_id")
      },
      method: 'GET',
      success: res => {
        console.log("res",res.data)
        this.setData({
          detail: res.data
        })
      }
    })
  }
})

  