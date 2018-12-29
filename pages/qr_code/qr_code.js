// pages/qr_code/ot.js
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
    console.log(options)
    let that=this
    let user_id = wx.getStorageSync("user_id");
    that.setData({
      user_id: user_id
    })
    if (options.img){
      that.setData({
        img: options.img
      })
    }
    
  },
  formSubmit:function(res){
    let that=this
    console.log(res)
    var value = res.detail.value
    var phone = /^1[34578]\d{9}$/
    if(value.name==""||value.tel==""){
      wx.showModal({
        title: '提示',
        content: '请补全信息',
      })
    }else if(!phone.test(value.tel)){
      wx.showModal({
        title: '提示',
        content: '请输入正确的手机号',
      })
    }else{

      wx.request({
        url: app.data.HOST + 'v1/postanqrcode',
        method: 'post',
        data: { user_id: that.data.user_id,name:value.name,tel:value.tel},
        success: function (res) {
        console.log(res)
        if(res.data.status==200){
          wx.showModal({
            title: '提示',
            content: '恭喜你，预约成功啦！稍后老师会和你取得联系(∩_∩)',
            success:function(res){
              wx.navigateBack({
                delta:1
              })
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