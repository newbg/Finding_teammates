// pages/find/add/add.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    data: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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
  // 添加新队伍提交表单
  formSubmit: function(e) {
    var self = this;
    wx.showModal({
      title: '',
      content: '请确认信息填写无误',
      success(res) {
        if (res.confirm) {
          wx.request({
            url: app.globalData.URL + '/publish.php',
            data: {
              "open_id": app.globalData.openId,
              'sort': e.detail.value.sort,
              'game_name': e.detail.value.game_name,
              'tele_num': e.detail.value.tele_num,
              'req': e.detail.value.req,
              'team_info': e.detail.value.team_info,
              'max_num': e.detail.value.max_num,
              'team_num': 1
            },
            method: 'POST',
            header: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            success: function(res) {
              console.log(res.data);
              console.log('team_info', e.detail.value.team_info);
              self.setData({
                data: ""
              })
              // wx.switchTab({
              //   url: '/pages/home/home'
              // })
              wx.showToast({
                title: '发布成功!',
              })
              setTimeout(function () {
                wx.switchTab({
                  url: '/pages/home/home'
                })
              }, 1000)
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })

  }

})