// pages/on_lineInfo/index.js
const app = getApp()
var WxParse = require('../../wxParse/wxParse.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    videoData:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options) 
    wx.request({ 
      url: app.data.HOST + 'v1/onlineDetails',
      data:{
        online_id: options.online_id
      },
      method: "get",
      success: res => {
        res.data.mes.online_details = res.data.mes.online_details.replace(/&amp;nbsp;/g, ' ');
        WxParse.wxParse('article', 'html', res.data.mes.online_details, this, 5);
        console.log(res.data)
        this.setData({
          videoData:res.data.mes
        })
        // WxParse.wxParse('article', 'html', res.data.mes.online_details, this, 5);

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