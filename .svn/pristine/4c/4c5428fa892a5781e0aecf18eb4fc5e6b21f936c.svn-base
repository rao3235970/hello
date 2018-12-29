const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    data: [],
   
  },
  freezing_integral: function () {
    wx.navigateTo({
      url: '/pages/freezing_integral/freezing_integral',
    })
  },
  //提现
  cash: function () {
    wx.navigateTo({
      url: '/pages/cash/cash',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that=this
    var userid = wx.getStorageSync('user_id')
    that.setData({
      user_id: userid
    })
    console.log(that.data.user_id)
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
    let that = this
    wx.request({
      url: app.data.HOST + 'v1/account',
      method: "post",
      data: {
        user_id: that.data.user_id,
        type: 2
      },
      success: res => {
        console.log(res.data.data)
        this.setData({
          data: res.data.data.data,
          numcount: res.data.data.int
        });
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