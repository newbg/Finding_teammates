// pages/me/teamDetail/teamDetail.js
var app = getApp();
Page({
  onLoad: function(options) {
    console.log('on load team detail page...');
    var info = JSON.parse(options.info);
    var self = this;
    console.log('load team detail page: ', info);
    wx.showLoading({
      title: '正在加载数据...',
    });
    self.setData({
      ...info
    });
    wx.request({
      url: app.globalData.URL + '/detail.php',
      data: {
        team_id: info.team_id,
        open_id: app.globalData.openId,
      },
      method: 'GET',
      success: function(res) {
        // console.log('detail:====', res.data[0]);
        var detail = res.data[0];
        self.setData({
          game_name: detail.game_name,
          sort: detail.sort,
          team_info: detail.team_info || '无',
          collect: detail.collect,
          max_num: detail.max_num,
          team_num: detail.team_num,
          tele_num: detail.tele_num,
          req: detail.req || '无'
        });
        wx.hideLoading();
      },
    })
  }
})