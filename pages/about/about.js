// pages/about/about.js
var WxParse = require('../../wxParse/wxParse.js');
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    api: app.data.HOST,
    textAbout: {},
    art: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this;
    wx.request({
      url: app.data.HOST + 'v1/aboutus',
      method: "get",
      success: res => {
        console.log(res.data)
        res.data.mes = res.data.mes.replace(/&amp;nbsp;/g, ' ');
        WxParse.wxParse('article', 'html', res.data.mes, that, 5);
        that.setData({
          textAbout: res.data.mes
        });

      }
    })

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

}
})