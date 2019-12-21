
// 获取全局变量
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    empty: true,
    teams: [],
    flag: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var url = app.globalData.URL + '/my_collect.php';
    var self = this
    wx.showLoading({
      title: '(加载中...)',
    });
    wx.request({
      url: url,
      data: {
        open_id: app.globalData.openId
      },
      method: 'GET',
      success: function(res) {
        console.log("res", res);
        if (res.data.length === 0) {
          self.setData({
            teams: res.data,
            empty: false,
            flag: false
          })
        }else {
          self.setData({
            teams: res.data
          })
        }
        // self.setData({
        //   teams: res.data,
        //   empty: false
        // })
      },
      complete: () => {
        wx.hideLoading();
      }
    })
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