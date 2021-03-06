var WxParse = require('../../wxParse/wxParse.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    api: app.data.HOST,
    details: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    console.log(options.question_id)
    //获得资讯详情
    wx.request({
      url: app.data.HOST + 'v1/questionDetails?question_id=' + options.question_id,
      method: 'get',
      success: function (res) {
        // console.log(res.data.mes.question_details)
        res.data.mes.question_details = res.data.mes.question_details.replace(/&amp;nbsp;/g, ' ');
        WxParse.wxParse('article', 'html', res.data.mes.question_details, that, 5);//解析详情内容html富文本
        that.setData({
          details: res.data.mes
        });
      }
    });
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