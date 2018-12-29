// pages/code/code.js
const app = getApp()
const userid = wx.getStorageSync('user_id')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    state:'',
    code:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(userid)
    const user_id = wx.getStorageSync('user_id')

    wx.request({
      url: app.data.HOST + 'v1/myqrcode',
      method: "post",
      data: {
        user_id: user_id
      },
      success: res => {
        console.log(res)
          this.setData({
            state: res.data.data.status,
            code:res.data.data.qrcode
          });
        
        console.log(this.data.state)
      }
    })
  },
  // join(){
  //   var userid = wx.getStorageSync('user_id')
  //   wx.request({
  //     url: app.data.HOST + 'v1/qrcodepost',
  //     method: "post",
  //     data: {
  //       user_id: userid
  //     },
  //     success: res => {
  //       console.log(res.data.data)
  //       if(res.data.status=='200'){
  //         wx.showToast({
  //           title: '申请成功',
  //           icon: 'success',
  //           duration: 2000
  //         })
  //         this.setData({
  //           state:0
  //         })
  //         return false
  //       }
        


  //     }
  //   })
  // },

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