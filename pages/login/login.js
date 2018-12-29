// pages/user/user.js
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
    let that = this
    that.getSetting()
  },
  onGotUserInfo: function (e) {//点击授权
    let that = this;
    if (e.detail.userInfo) {
      that.getSetting()
    }
  },
  checkSession: function () {//验证Session_Key
    console.log("2")
    let that = this;
    wx.checkSession({
      success: function (res) {
        let user_id = wx.getStorageSync("user_id");
        console.log("生效：" + res)
        if (user_id == "") {
          that.login()//重新登录
        } else {
          wx.switchTab({
            url: '/pages/index/index'
          })
        }
      },
      fail: function () {
        console.log("失效")
        that.login()//重新登录
      }
    })
  },
  getSetting: function () {
    console.log("1")
    let that = this;
    wx.getSetting({// 查看是否授权
      success: res => {
        console.log(res)
        wx.hideLoading()
        if (res.authSetting['scope.userInfo']) {// 已经授权，可以直接调用 getUserInfo 获取头像昵称
          console.log("已授权！")
          wx.getUserInfo({
            success: res => {
     
              wx.setStorageSync('userInfo', res.userInfo)
              that.checkSession()
              
            },
            fail: res => {
              console.log("获取头像失败！")
            }
          })
        } else {
          console.log("未授权！")
        }
      }
    })
  },
  login: function () {//登录
    console.log("3")
    let that = this;
    let nickName = wx.getStorageSync("userInfo");
    wx.login({
      success: res => {
        console.log("code：" + res.code)
        if (res.code) {
          wx.request({
            url: app.data.HOST + 'v1/authl',
            header: {
              "Content-Type": "application/x-www-form-urlencoded"
            },
            data: {
              code: res.code,
              nickName: nickName.nickName,
              avatarUrl: nickName.avatarUrl
            },
            method: "POST",
            success: res => {
              console.log(res.data.data.sessionKey)
              wx.setStorageSync(
                "openId", res.data.data.open_id
              )
              wx.setStorageSync(
                "user_id", res.data.data.user_id
              )
              wx.setStorageSync(
                "sessionKey", res.data.data.sessionKey
              )              
              console.log('wx.getStorageSync("user_id")')

              console.log(wx.getStorageSync("user_id"))
              setTimeout(()=>{
                wx.switchTab({
                  url: '/pages/index/index'
                })
              },500)
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
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