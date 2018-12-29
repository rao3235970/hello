// pages/exchange/exchange.js
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    api: app.data.HOST,
    already: true,
    not: false,
    exchList: {},
    videoList:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that=this;
    that.exchList()
  },
  already: function (e) {//tab切换
    let that = this;
    that.setData({
      not: false,
      already: true
    })
    that.exchList()
  },
  not: function (e) {//tab切换
    let that = this;
    that.setData({
      already: false,
      not: true
    })
    that.videoList()
  },
  exchList:function(){//问答列表
    var that = this;
    wx.request({
      url: app.data.HOST + 'v1/interlist',
      method: "get",
      success: res => {
        console.log(res.data.data)
        that.setData({
          exchList: res.data.data
        });
      }
    })
  },
  videoList:function(){//视频列表
    var that = this;
    wx.request({
      url: app.data.HOST + 'v1/videolist',
      method: "get",
      success: res => {
        console.log(res.data.data)
        that.setData({
          videoList: res.data.data
        });
      }
    })
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
    let that=this
    that.exchList()
    that.videoList()
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