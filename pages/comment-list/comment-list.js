// pages/comment-list/comment-list.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    api: app.data.HOST,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options)
    // let that = this;
    // wx.request({ //评论
    //   url: app.data.HOST + 'v1/tourSay?goods_id=' + options.id+'&type=1',
    //   method: "get",
    //   success: res => {
    //     console.log(res.data)
    //     that.setData({
    //       imgDiscuss: res.data.mes
    //     });
    //   }
    // })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let that = this;
    let g_id = "1";
    wx.request({
      url: app.data.HOST + 'v1/groupget',
      method: "get",
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      data: {
        g_id: g_id,
      },
      success: res => {
        console.log(res.data.data.one_list.g_thumbs)
        if (res.data.status == 200) {
          that.setData({
            comment: res.data.data.comment
          });
          // 执行倒计时函数
         
        } else {
          wx.showToast({ title: "网络请求失败请稍后重试！", icon: "none" })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})