// 获取全局变量
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    list: [1,1,1,1,1,1,1,1,1,1,1],
    inbox_a: [],
    inbox_b: [],
    requestStat: 0,
    flag: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.updateData();
  },

  toApplyDetail(e) {
    var self = this;
    var id = e.currentTarget.dataset.msgId;
    console.log('id', id);
    wx.navigateTo({
      url: "/pages/me/applyDetail/applyDetail?id=" + id,
    })
  },

  toTeamDetail(e) {
    var self = this;
    var id = e.currentTarget.dataset.teamId;
    var info = e.currentTarget.dataset.info;
    var status = info.status;
    console.log('id', id);

    if(status !== 'agree') {
      wx.navigateTo({
        url: "/pages/me/teamDetail/teamDetail?info=" + JSON.stringify(info),
      });
    } else {
        // 获取目标页面的Id
        // var postId = e.currentTarget.dataset.postId;
        // console.log(postId);
        wx.navigateTo({
          url: '/pages/home/detail/detail?id=' + id,
        }); 
    }
    
  },

  updateData() {
    var url = app.globalData.URL + '/inbox_a.php';
    var self = this
    wx.showLoading({
      title: '正在更新数据',
    })
    var loading = setInterval(() => {
      if(self.data.requestStat >= 2) {
        wx.hideLoading();
        clearInterval(loading);
      }
    },500)
    wx.request({
      url: url,
      data: {
        open_id: app.globalData.openId
      },
      method: 'GET',
      success: function (res) {
        console.log('inbox_a', res.data);
        self.setData({
          inbox_a: res.data,
          requestStat: self.data.requestStat + 1
        });
        console.log('req stat: ', self.data.requestStat);
      }
    })
    wx.request({
      url: app.globalData.URL + '/inbox_b.php',
      data: {
        open_id: app.globalData.openId
      },
      method: 'GET',
      success: function (res) {
        console.log('inbox_b', res.data);
        var info = res.data;
        var counter = 0;
        info.map(item => {
          wx.request({
            url: app.globalData.URL + '/detail.php',
            data: {
              open_id: app.globalData.openId,
              team_id: item.team_id
            },
            success: res => {
              console.log('team.detail.res', res.data[0]);  
              item.game_name = res.data[0].game_name;
              counter ++;
              if(counter === info.length) {
                self.setData({
                  inbox_b: info,
                  requestStat: self.data.requestStat + 1
                });
              }
              if (this.data.inbox_a.length === 0 && this.data.inbox_b.length === 0) {
                this.setData({
                  flag: false
                })
              }
            }
          })
        })
        
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
    this.updateData();
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
    this.updateData();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    this.updateData();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})