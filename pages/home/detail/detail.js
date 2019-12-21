// pages/home/detail/detail.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    item: null,
    team_id: 0,
    flag: 0 ,// 表示是否是队伍的创建者,
    // collect: false,
    caption: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // wx.showToast({
    //   title: '加载中',
    // })
    wx.showLoading({
      title: '加载中',
    })
    var url = app.globalData.URL + '/detail.php';
    var self = this
    wx.request({
      url: url,
      data: {
        team_id: options.id,
        open_id: app.globalData.openId,
      },
      method: 'GET',
      success: function(res) {
        console.log('detail:====', res.data[0]);
        wx.setStorageSync("team_id", res.data[0].id);
        wx.setStorageSync("open_id", res.data[0].open_id);
        self.setData({
          item: res.data[0],
          team_id: options.id
        })
        // 判断用户是否是该队伍的创建者
        if (app.globalData.openId === self.data.item.open_id) {
          self.setData({
            flag: 1,
            caption: true
          })
        }
        // 判断用户是否申请过该队伍
        else if (self.data.item.ap === "false") {
          self.setData({
            flag: 2
          })
        } else {
          self.setData({
            flag: 3
          })
        }
        wx.hideLoading();

      }
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  applyTeam: function() {
    // var url = app.globalData.URL + '/apply.php';
    // var self = this;
    // wx.showModal({
    //   title: '提示',
    //   content: '确认申请加入该队伍吗',
    //   success(res) {
    //     console.log("jopen_id", app.globalData.openId);
    //     console.log("popen_id", self.data.item.open_id);
    //     console.log("teamid", self.data.team_id);
    //     if (res.confirm) {
    //       wx.request({
    //         url: app.globalData.URL + '/apply.php',
    //         data: {
    //           jopen_id: app.globalData.openId,
    //           popen_id: self.data.item.open_id,
    //           team_id: self.data.team_id,
    //           reason: "因为爱情"
    //         },
    //         method: 'GET',
    //         success: function(res) {
    //           console.log('apply success', res);
    //           wx.switchTab({
    //             url: '/pages/home/home'
    //           })
    //           wx.showToast({
    //             title: '已发送申请',
    //             icon: 'success',
    //             duration: 2000
    //           })
    //         }
    //       })
    //     } else if (res.cancel) {
    //       console.log('用户点击取消')
    //     }
    //   }
    // })
    wx.navigateTo({
      url: '/pages/home/apply/apply',
    })

  }
})