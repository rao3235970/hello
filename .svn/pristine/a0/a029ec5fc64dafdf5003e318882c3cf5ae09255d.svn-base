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
    let product_id = "1";
    wx.request({
      url: app.data.HOST + 'v1/getCut',
      method: "get",
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      data: {
        product_id: product_id
      },
      success: res => {
        // console.log(res.data)
        if (res.data.status == 200) {
          console.log(res.data.data)
          that.setData({
            comment: res.data.data.comment
          });


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