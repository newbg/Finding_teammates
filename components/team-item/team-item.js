var app = getApp();
Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  properties: {
    teamdata: {
      type: Object,
      value: {}
    }
  },
  data: {
    // 这里是一些组件内部数据
    collect: false

  },
  methods: {
    // 这里是一个自定义方法
    navToDetail: function(e) {
      // 获取目标页面的Id
      var postId = e.currentTarget.dataset.postId;
      console.log(postId);
      wx.navigateTo({
        url: '/pages/home/detail/detail?id=' + postId,
      })
    },
    agree: function(e) {
      // console.log(this.properties.teamdata.collect, "666");
      var self = this;
      // console.log(e.currentTarget.dataset.postId);
      self.setData({
        changeAgree: true
      });
      setTimeout(() => {
        self.setData({
          changeAgree: false
        })
      }, 1000);
      // console.log("change agree: ", self.data.changeAgree);
      wx.request({
        url: app.globalData.URL + '/collect.php',
        data: {
          "open_id": app.globalData.openId,
          'team_id': e.currentTarget.dataset.postId,
          'collect': !self.data.collect
        },
        // !self.data.collect
        method: 'GET',
        success: function(res) {
          // console.log('agree res', res);
          
          if (!self.data.collect) {
            wx.showToast({
              title: '收藏成功',
              icon: 'success',
              duration: 1000
            })
          } else {
            wx.showToast({
              title: '已取消',
              icon: 'success',
              duration: 1000
            })
          }
          self.setData({
            collect: !self.data.collect,
          });
        }
      })

    }

  },
  lifetimes: {
    attached() {
      // 在组件实例进入页面节点树时执行
      // console.log(this.properties.teamdata);
      // console.log(this.properties.teamdata.collect);
      // this.data.collect = this.properties.teamdata.collect === "false" ? false : true;
      // this.data.collect = this.properties.teamdata.collect;
      // console.log(this.data.collect)
    },
    detached() {
      // 在组件实例被从页面节点树移除时执行
    }
  },
  observers: {
    'teamdata': function(teamdata) {
      // 在 numberA 或者 numberB 被设置时，执行这个函数
      this.setData({
        collect: teamdata.collect === "false" ? false : true
      })
    }
  }


})