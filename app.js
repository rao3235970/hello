//app.js
App({
  data: {
    HOST: "https://dispatch.yuxwl.top/",
    HOSTS: "https://dispatch.yuxwl.top",
  },
  
  onLaunch: function () {
    // this.getSetting()
  },
  getSetting: function () {// 查看是否授权
    let that = this;
    wx.getSetting({
      success: res => {
        // console.log(res)
        if (res.authSetting['scope.userInfo']) {// 已经授权，可以直接调用 getUserInfo 获取头像昵称
          console.log("已授权！")
          wx.getUserInfo({
            success: res => {
              console.log(res.userInfo)
              wx.setStorageSync('userInfo', res.userInfo)
            },
            fail: res => {
              console.log("失效！")
            }
          })
        } else {
          wx.showModal({
            title: '提示',
            content: '请先授权登录！',
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
                wx.redirectTo({
                  url: '/pages/login/login'
                })
              }
            }
          })
          console.log("未授权！")
        }
      }
    })
  },
})