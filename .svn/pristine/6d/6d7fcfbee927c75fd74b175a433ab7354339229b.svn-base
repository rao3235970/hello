const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    pay_method:['银行卡','微信','支付宝'],
    index:0,
    data:{},
    score:'',
    monry:'',
    myscore:'',
  },
  //提现记录
  cash_record:function(res){
    wx.navigateTo({
      url: '/pages/cash-record/cash-record',
    })
  },
  bindPickerChange(e){
    console.log(e)
    this.setData({
      index: e.detail.value
    })
    
  },
  zfb(e) {
    this.data.data.code=e.detail.value
  },
  pic(e){
    this.setData({
      monry: (e.detail.value).replace(/[^\d^\.]+/g, '')
    })
    console.log(this.data.monry)
    this.data.data.score = e.detail.value
  },
  user(e){
    this.data.data.user=e.detail.value
  },
  cash(){
    var userid = wx.getStorageSync('user_id')
    if(!this.data.data.user){
      wx.showToast({
        title: '请输入昵称',
        icon: 'none',
        duration: 2000
      })
      return false
    }
    if(!this.data.data.code){
      wx.showToast({
        title: '请输入'+this.data.pay_method[this.data.index]+'账号',
        icon: 'none',
        duration: 2000
      })
      return false
    }
    if (!this.data.data.score || this.data.data.score==0){
      wx.showToast({
        title: '请输入正确的提现金额',
        icon: 'none',
        duration: 2000
      })
      return false
    }
    this.data.data.type = parseInt(this.data.index)+1
    console.log(this.data.data)
    wx.request({
      url: app.data.HOST + 'v1/withdrawput',
      method: "post",
      data: {
        user_id: userid,
        score:this.data.data.score,
        code:this.data.data.code,
        name:this.data.data.user,
        type:this.data.data.type
      },
      success: res => {
        console.log(res.data)
        if (res.data.status=='400'){
          wx.showModal({
            title: '提示',
            content: res.data.mes,
            success: function () {
              wx.navigateBack({
                delta: 1
              })
            }
          })
        
        }
        if (res.data.status == '200') {
          wx.showModal({
            title: '提示',
            content: '提现成功，请耐心等待',
            success: function () {
              wx.navigateBack({
                delta: 1
              })
            }
          })
        }
       
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var userid = wx.getStorageSync('user_id')
    console.log(userid)
    wx.request({
      url: app.data.HOST + 'v1/withdrawapply',
      method: "get",
      data: {
        user_id: userid
      },
      success: res => {
        console.log(res.data.data)
        this.setData({
          myscore: res.data.data.score
        })
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