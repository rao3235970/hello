// pages/question-info/question-info.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inter:{},
    comment:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that=this;
    that.setData({
      options: options
    })
    that.info(that.data.options)
  },
  info:function(options){//视频详情
    let that=this;
    wx.request({
      url: app.data.HOST + 'v1/videodetail',
      data:{video_id:options.video_id},
      method: "get",
      success: res => {
        console.log(res.data.data.inter)
        that.setData({
          inter: res.data.data.inter,
          comment:res.data.data.comment,
          num:res.data.data.num
        });
      }
    })
  },
  index:function(){
    wx.switchTab({
      url: '/pages/index/index'
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
    that.info(that.data.options)
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