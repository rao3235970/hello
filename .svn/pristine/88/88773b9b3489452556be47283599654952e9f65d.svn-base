// pages/activity-details/activity-details.js
const app = getApp()
var WxParse = require('../../wxParse/wxParse.js'); 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    api: app.data.HOST,
    contentTextUrl: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    let that = this;
    wx.request({
      url: app.data.HOST + 'v1/dynamicDetails',
      method: "get",
      data: { dynamic_id: options.id},
      success: res => {
        
        res.data.mes.dynamic_details = res.data.mes.dynamic_details.replace(/&amp;nbsp;/g, ' ');

      
        WxParse.wxParse('article', 'html', res.data.mes.dynamic_details, that, 5);

        that.setData({
          contentTextUrl: res.data.mes
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