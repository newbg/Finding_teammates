// pages/find/add/add.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    data: null,
    team_id: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log("options",options)
    var url = app.globalData.URL + '/detail.php';
    var self = this
    wx.request({
      url: url,
      data: {
        team_id: options.id,
        open_id: app.globalData.openId,
      },
      method: 'GET',
      success: function (res) {
        console.log('detail:====', res.data[0]);
        self.setData({
          data: res.data[0],
          team_id: options.id
        })
      }
    })
  },
  // 添加新队伍提交表单
  formSubmit: function (e) {
    var self = this;
    wx.showModal({
      title: '',
      content: '确认修改队伍信息',
      success(res) {
        console.log(self.data.team_id);
        console.log(e.detail.value.sort);
        console.log(self.data.data.team_num)
        if (res.confirm) {
          wx.request({
            url: app.globalData.URL + '/update_team.php',
            data: {
              "id": self.data.team_id,
              "open_id": app.globalData.openId,
              'sort': e.detail.value.sort,
              'game_name': e.detail.value.game_name,
              'tele_num': e.detail.value.tele_num,
              'req': e.detail.value.req,
              'team_info': e.detail.value.team_info,
              'max_num': e.detail.value.max_num,
              'team_num': self.data.data.team_num
            },
            method: 'GET',
            header: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            success: function (res) {
              // console.log("返回的结果",res.data);
              console.log('team_info', e.detail.value.team_info);
              self.setData({
                data: null
              })
              wx.showToast({
                title: '修改成功!',
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