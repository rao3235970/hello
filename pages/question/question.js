// pages/question/question.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    api: app.data.HOST,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  questSubmit:function(e){//提问
    var that = this;
    let user_id=wx.getStorageSync("user_id");
    let interlocution=e.detail.value.interlocution;
    if(user_id==""){
      wx.showModal({
        title: '提示',
        content: '请先授权登录！',
        showCancel: false,
        success: function(res) {
          if (res.confirm) {
            wx.redirectTo({
              url: '/pages/login/login'
            })
          }
        }
      })
    }else if(interlocution==""){
      wx.showModal({
        title: '提示',
        content: '不能提问空消息！',
        showCancel: false,
        success: function(res) {
          if (res.confirm) {
          }
        }
      })
    }else{
      wx.request({
        url: app.data.HOST + 'v1/interadd',
        header: {
					"Content-Type": "application/x-www-form-urlencoded"  
				},
				data:{user_id:user_id,interlocution_title:interlocution},
				method: "POST",
        success: res => {
          console.log(res.data)
          if(res.data.status==200){
            wx.showModal({
              title: '提交成功',
              content: '您的问题已提交！',
              showCancel: false,
              success: function(res) {
                if (res.confirm) {
                  wx.navigateBack({
                    delta:1
                  })
                }
              }
            })
          }
        }
      })
    }
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