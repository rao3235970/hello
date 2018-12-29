// pages/cash-record/cash-record.js
const app = getApp()
const userid = wx.getStorageSync('user_id')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user_id:userid,
    zan:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   let that=this
   that.setData({
     userid: userid
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
    let that=this
    wx.request({
      url: app.data.HOST + 'v1/withdrawget',
      method: "get",
      data: {
        user_id: that.data.user_id
      },
      success: res => {
        console.log(res.data.data)
        if(res.data.data.length!=0){
          this.setData({
            data: res.data.data,
            zan:false
          })
        }else{
          this.setData({
            data: res.data.data,
            zan: true
          })
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