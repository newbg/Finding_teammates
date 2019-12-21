// pages/home/detail/detail.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    searchContent: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var url = app.globalData.URL + '/my_collect.php';
    var self = this
    wx.request({
      url: url,
      data: {
        open_id: app.globalData.openId
      },
      method: 'GET',
      success: function(res) {
        console.log('team info', res.data);
        self.setData({
          list: res.data
        })
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
    wx.showLoading({
      title: '加载中...',
    })
    var url = app.globalData.URL + '/team.php';
    var self = this;
    var timer = setTimeout(function() {
      wx.request({
        url: url,
        data: {
          open_id: app.globalData.openId
        },
        method: 'GET',
        success: function(res) {
          // console.log('team info', res.data);
          self.setData({
            list: res.data
          })
          wx.hideLoading();
        }
      })
    }, 500);
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
  // 点赞功能
  degree: function(e) {
    // console.log(e.currentTarget.dataset.postId);
    // 获取当前item的id
    var curid = e.currentTarget.dataset.postId;
    var that = this;
    // 将数组中需要赋值的对象存起来
    var collect = `list[${curid - 1}].collect`;
    var star_url = `list[${curid - 1}].star_url`;
    var changeAgree = `list[${curid - 1}].changeAgree`;

    setTimeout(() => {
      that.setData({
        changeAgree: false
      })
    }, 1000)
    // 判断当前item是否被收藏
    if (!that.data.list[curid - 1].collect) {
      this.setData({
        [star_url]: "/imgs/star_selected.png",
        [collect]: true,
        [changeAgree]: true
      })
      // console.log(that.data.list[curid - 1].collect, that.data.list[curid - 1].star_url);
      wx.showToast({
        title: '收藏成功',
        icon: 'success',
        duration: 1000
      })
    } else {
      this.setData({
        [star_url]: "/imgs/star.png",
        [collect]: false,
        [changeAgree]: false
      })
      // console.log(that.data.list[curid - 1].collect, that.data.list[curid - 1].star_url);
      wx.showToast({
        title: '已取消',
        icon: 'success',
        duration: 1000
      })
    }

  },
  AddTeam: function() {
    wx.navigateTo({
      url: '/pages/find/add/add',
    })
  },
  navToDetail: function(e) {
    // 获取目标页面的Id
    var postId = e.currentTarget.dataset.postId;
    // console.log(postId);
    wx.navigateTo({
      url: '../home/detail/detail?id=' + postId,
    })
  },
  getSearch: function(e) {
    var val = e.detail.value;
    this.setData({
      searchContent: val
    })
  },
  wxSearchFn: function(e) {
    if(this.data.searchContent === "") {
      wx.showToast({
        title: '搜索内容不能为空哦',
        icon: "none",
        duration: 1000
      })
      return;
    }
    var url = app.globalData.URL + '/search.php';
    var self = this
    wx.request({
      url: url,
      data: {
        word: self.data.searchContent,
        open_id: app.globalData.openId
      },
      method: 'GET',
      success: function(res) {
        console.log('searchContent', self.data.searchContent);
        console.log('searchInfo', res);
        wx.setStorageSync("searchResult", res.data);
        wx.navigateTo({
          url: '/pages/find/result/result',
        })
      }
    })
    this.setData({
      searchContent: ""
    })
  }
})