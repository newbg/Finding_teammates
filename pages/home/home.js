// 获取全局变量
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // changeAgree: false,
    // collect: false,
    curid: 0,
    swiper_imgs: [
      "https://webexercise.xyz/weixin/picture/swiper1.png",
      "https://webexercise.xyz/weixin/picture/swiper2.png",
      "https://webexercise.xyz/weixin/picture/swiper3.png",
      "https://webexercise.xyz/weixin/picture/swiper4.png",
    ],
    list: [], 
    showModal: false ,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 把list数据写入缓存,用做全局变量
    // console.log("nickname",app.globalData.userInfo)
    // console.log(wx.getStorageSync("userInfo"))

    // var url = app.globalData.URL + '/detail_apply.php';
    // var self = this
    // wx.request({
    //   url: url,
    //   data: {
    //     open_id: app.globalData.openId
    //   },
    //   method: 'GET',
    //   success: function(res) {
    //     console.log("res",res)
    //   }
    // })
    var userInfo = wx.getStorageSync('userInfo');
    if(!userInfo) {
      wx.redirectTo({
        url: '/pages/modal/modal',
      })
    }

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    //获得teamitem组件
    this.teamitem = this.selectComponent("#teamitem");
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    // var url = app.globalData.URL + '/new_team.php';
    // var self = this
    // wx.request({
    //   url: url,
    //   data: {
    //     open_id: app.globalData.openId
    //   },
    //   method: 'GET',
    //   success: function (res) {
    //     console.log('new_team info', res.data);
    //     self.setData({
    //       list: res.data
    //     })
    //   }
    // })

    wx.showLoading({
      title: '加载中...',
    })
    var self = this;
    var timer = setTimeout(function() {
      // console.log("----Countdown----");
      var url = app.globalData.URL + '/new_team.php';
      wx.request({
        url: url,
        data: {
          open_id: app.globalData.openId
        },
        method: 'GET',
        success: function(res) {
          console.log('new_team info', res.data);
          self.setData({
            list: res.data
          })
          wx.hideLoading();
        }
      })
    }, 1000);
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

  }

})