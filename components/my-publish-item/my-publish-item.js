// components/my-publish-item/my-publish-item.js
Component({
  /**
   * Component properties
   */
  properties: {
    itemData: Object
  },

  /**
   * Component initial data
   */
  data: {

  },

  /**
   * Component methods
   */
  methods: {
    touchS: function(e) {  // touchstart
      let startX = App.Touches.getClientX(e)
      startX && this.setData({
        startX
      })
    },
    touchM: function(e) {  // touchmove
      let itemData = App.Touches.touchM(e, this.data.itemData, this.data.startX)
      itemData && this.setData({
        itemData
      })

    },
    touchE: function(e) {  // touchend
      const width = 150  // 定义操作列表宽度
      let itemData = App.Touches.touchE(e, this.data.itemData, this.data.startX, width)
      itemData && this.setData({
        itemData
      })
    },
    itemDelete: function(e) {  // itemDelete
      let itemData = App.Touches.deleteItem(e, this.data.itemData)
      itemData && this.setData({
        itemData
      })
    },

  }
})