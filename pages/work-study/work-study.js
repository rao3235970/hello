// pages/work-study/work-study.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    api: app.data.HOST,
    apii: app.data.HOSTS,
    contentLiUrl: {},
    see_code:false,

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let user_id = wx.getStorageSync("user_id");
    let that =this
    that.setData({
      user_id: user_id
    })
    console.log(that.data.user_id)
  },
  see:function(){
    let that=this
    var img = that.data.api+that.data.img
    console.log(img)
    wx.navigateTo({
      url: '/pages/qr_code/qr_code?img='+img,
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  //申请二维码
  button:function(){
    let that =this
    wx.navigateTo({
      url: '/pages/qr_code/qr_code',
    })

   
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let that = this;
    wx.request({
      url: app.data.HOST + 'v1/answer',
      method: "get",
      success: res => {
        console.log(res.data)
        that.setData({
          contentLiUrl: res.data.mes
        });
      }
    })
    wx.request({
      url: app.data.HOST + 'v1/myanqrcode',
      data:{user_id:that.data.user_id},
      method: "post",
      success: res => {
        console.log(res.data)
        if (res.data.status==402){
          that.setData({
            see_code:false
          })
        } else if (res.data.status == 200){
          that.setData({
            see_code: true,
            img: res.data.data.qrcode
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