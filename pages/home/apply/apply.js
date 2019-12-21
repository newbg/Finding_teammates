// pages/home/apply/apply.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    flag: 0,
    items: [{
        name: 'weixin',
        value: '微信',
      },
      {
        name: 'qq',
        value: 'QQ'
      },
      {
        name: 'tele',
        value: '手机号'
      },
    ],
    msg: "",
    reason: "",
    contact: ""
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
  radioChange(e) {
    console.log('radio发生change事件，携带value值为：', e);
    for (var i = 0; i <= 2; i++) {
      if (this.data.items[i].name === e.detail.value) {
        this.setData({
          msg: this.data.items[i].value
        })
        return;
      }
    }
  },
  getContact: function(e) {
    var val = e.detail.value;
    this.setData({
      contact: val
    })
    console.log(e)
  },
  getReason: function(e) {
    var val = e.detail.value;
    this.setData({
      reason: val
    })
    console.log(e)
  },
  applyTeam: function() {
    // var url = app.globalData.URL + '/apply.php';
    var userInfo = wx.getStorageSync("userInfo");
    var self = this;
    wx.showModal({
      title: '提示',
      content: '确认申请加入该队伍吗',
      success(res) {
        // console.log("jopen_id", wx.getStorageSync("team_id"));
        // console.log("popen_id", self.data.item.open_id);
        // console.log("teamid", wx.getStorageSync("team_id"));
        console.log("reason", self.data.reason);
        console.log("contact", self.data.contact);
        console.log("nickname", userInfo.nickName, );
        if (res.confirm) {
          wx.request({
            url: app.globalData.URL + '/apply.php',
            data: {
              jopen_id: app.globalData.openId,
              popen_id: wx.getStorageSync("open_id"),
              team_id: wx.getStorageSync("team_id"),
              reason: self.data.reason,
              contact: self.data.contact,
              name: userInfo.nickName,
              avatarUrl: userInfo.avatarUrl
            },
            method: 'GET',
            success: function(res) {
              console.log('apply success', res);
              wx.showToast({
                title: '已发送申请',
                icon: 'success',
                duration: 1000
              })
              setTimeout(function() {
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