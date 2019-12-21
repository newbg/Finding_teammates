

var app = getApp();
Page({
  /**
  
  * 页面的初始数据
  
  */

  data: {
    offsetRecord: {
      'index': -1,
      'startX': 0,
      'offset': 0
    }, // 偏移记录

    deleteButtonWidth: 200, // 删除按钮的宽度(rpx)

    pixelScale: 1,
    userInfo: wx.getStorageSync("userInfo"),
    list: [],
    flag: true

  },



  /**
  
  * 生命周期函数--监听页面加载
  
  */

  onLoad: function(options) {
    console.log("===========", wx.getStorageSync("team_id"))
    var self = this;
    wx.request({
      url: app.globalData.URL + '/teammate.php',
      data: {
        team_id: wx.getStorageSync("team_id")
      },
      method: 'GET',
      success: res => {
        console.log('my_teamDetail', res.data);
        if (res.data.length === 0) {
          self.setData({
            flag: false,
            list: res.data
          })
          // console.log("666")
        } else {
          self.setData({
            list: res.data
          })
        }
      }
    })
    let res = wx.getSystemInfoSync();
    // console.log("=====",options)
    console.log("====", wx.getStorageSync("team_id"))
    this.data.pixelScale = (750 / 2) / (res.screenWidth / 2);


    // this.setData({
    //   list: wx.getStorageSync("teammatelist")
    // })

    // wx.removeStorageSync("teammatelist")
  },



  /**
  
  * 生命周期函数--监听页面初次渲染完成
  
  */

  onReady: function() {

  },


  /**
  
  * 表格cell触摸开始事件
  
  */

  onTableCellTouchStart: function(event) {

    if (event.changedTouches.length != 1) return;

    let index = event.currentTarget.dataset.index;

    let x = event.changedTouches[0].clientX;

    this.setData({
      offsetRecord: {
        'index': index,
        'startX': x,
        'offset': 0
      }
    });

  },



  /**
  
  * 表格cell触摸移动事件
  
  */

  onTableCellTouchMove: function(event) {

    if (event.changedTouches.length != 1) return;

    let index = event.currentTarget.dataset.index;

    let record = this.data.offsetRecord;

    if (index != Reflect.get(record, 'index')) {

      return;

    }

    let clientX = event.changedTouches[0].clientX;

    let startX = Reflect.get(record, 'startX');

    let distance = Math.max(Math.min((startX - clientX) * this.data.pixelScale, this.data.deleteButtonWidth), 0);

    Reflect.set(record, 'offset', distance);

    this.setData({
      offsetRecord: record
    });

  },



  /**
  
  * 表格cell触摸结束事件
  
  */

  onTableCellTouchEnd: function(event) {

    if (event.changedTouches.length != 1) return;

    let index = event.currentTarget.dataset.index;
    let record = this.data.offsetRecord;



    if (index == Reflect.get(record, 'index')) {

      let offset = Reflect.get(record, 'offset');

      if (offset >= this.data.deleteButtonWidth / 2) {

        Reflect.set(record, 'offset', this.data.deleteButtonWidth);

      } else {

        record = null;

      }

      this.setData({
        offsetRecord: record
      });
    }

  },



  /**
  
  * 表格cell删除按钮点击事件
  
  */

  onDeleteButtonTapped: function(event) {

    let index = event.currentTarget.dataset.index;
    // console.log("pub info", event.currentTarget.dataset.teamid)
    wx.showModal({

      content: `确定要将该队员踢出队伍吗`,

      showCancel: true,

      success: (res) => {

        if (!res.confirm) return;

        var self = this;
        console.log("jopen_id", event.currentTarget.dataset.jopenid)
        wx.request({
          url: app.globalData.URL + '/del_teammate.php',
          data: {
            teammate_id: event.currentTarget.dataset.jopenid
          },
          method: 'GET',
          success: res => {
            console.log('delete_info', res);

            wx.request({
              url: app.globalData.URL + '/teammate.php',
              data: {
                team_id: wx.getStorageSync("team_id")
              },
              method: 'GET',
              success: res => {
                console.log('my_teamDetail', res.data);
                self.setData({
                  list: res.data
                })
              }
            })
          }
        })
        wx.showToast({
          title: '删除成功!',
        })
      }
    })
  },
  naviTodetail: function(e) {

    var id = e.currentTarget.dataset.jopenid;
    console.log(e.currentTarget.dataset.jopenid);
    wx.navigateTo({
      url: "/pages/me/teammateDetail/teammateDetail?id=" + id,
    })
  }


})