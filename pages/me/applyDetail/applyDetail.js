// pages/me/applyDetail/applyDetail.js
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
    console.log('onload applydetail page: ', options.id);
    var self = this;
    const id = options.id;
    wx.showLoading({
      title: '正在加载...',
    })
    wx.request({
      url: app.globalData.URL + '/detail_apply.php',
      data: {
        id: id
      },
      success: res => {
        console.log('apply detail: ', res.data);
        var data = res.data;
        self.setData({
          ...data
        })
        wx.hideLoading();
      },
      fail: res => {
        wx.showToast({
          title: '请求数据失败!',
        });
        wx.hideLoading();
      }
    })
  },


  onAgree(e) {
    var self = this;
    console.log('operate event' ,e);
    wx.showModal({
      title: '提示',
      content: '确定同意此人加入队伍吗',
      success(res) {
        if (res.confirm) {
          wx.request({
            url: app.globalData.URL + '/operate.php',
            data: {
              id: e.currentTarget.dataset.msgId,
              status: 'agree',
              team_id: e.currentTarget.dataset.teamId
            },
            method: 'GET',
            success: function(res) {
                self.setData({
                  status: 'agree'
                });
                wx.showToast({
                  title: '已同意！',
                })
              setTimeout(function() {
                wx.navigateBack({

                });
              }, 1000)
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  onRefuse(e) {
    var self = this;
    wx.request({
      url: app.globalData.URL + '/operate.php',
      data: {
        id: e.currentTarget.dataset.msgId,
        status: 'refuse',
        team_id: e.currentTarget.dataset.teamId
      },
      success: res => {
        self.setData({
          status: 'refused'
        });
        wx.showToast({
          title: '已拒绝！',
        });
        wx.navigateBack({

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

  }
})