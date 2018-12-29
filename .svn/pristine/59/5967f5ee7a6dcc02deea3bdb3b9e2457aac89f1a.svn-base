// pages/university/university.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    api: app.data.HOST,
    schoolInfo:[],
    xs:false,
    x:true
  },
  // 监听input的输入值


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    let that = this;
    wx.request({
      url: app.data.HOST + 'v1/schoolRecommend',
      method: "get",
      data: { recommend: options.id},
      success: res => {
        console.log(res.data.data)
        if (res.data.data.length==0) {
          that.setData({
            xs: true,
            x:false
          })
        }else{
          that.setData({ //轮播
            x:true,
            xs:false,
            schoolInfo: res.data.data,
          });
        }
      
        
        
      }
    })

  },
 
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