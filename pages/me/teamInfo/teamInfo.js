var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    item: null,
    team_id: 0,
    caption: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.showToast({
      title: '加载中',
      icon: 'loading',
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
        console.log('detail:====5555', res.data);
        wx.setStorageSync("team_id", res.data[0].id);
        wx.setStorageSync("open_id", res.data[0].open_id);
        self.setData({
          item: res.data[0],
          team_id: options.id
        })
        wx.hideToast();
        if (res.data[0].open_id === app.globalData.openId) {
          self.setData({
            caption: true
          })
        }
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
  teammateInfo: function() {
    wx.navigateTo({
      url: '/pages/me/teammateInfo/teammateInfo'
      // ?id=' + postId,
    })
  },
  changeInfo: function(e) {
    var id = e.currentTarget.dataset.teamid;
    console.log(e.currentTarget.dataset.teamid);
    wx.navigateTo({
      url: '/pages/me/changeInfo/changeInfo?id=' + id,
    })
  }
})