// pages/user/user.js
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    api: app.data.HOST,
    UserInfo: false,
    phone:'',


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
    let that = this
    var userid = wx.getStorageSync('user_id')
    console.log('useriduseriduserid')

    console.log(userid)
    that.setData({
      userid: userid
    })
    
    that.getSetting()
    wx.request({
      url: app.data.HOST + 'v1/getuserinfos',
      data: { user_id: that.data.userid},
      header: {
        'content-type': 'application/json' // 默认值
      },
      method:"GET",
      success:function(res){
        console.log(res.data.data)
        if(res.data.data==1){
          that.setData({
            detail_url: '/pages/team/team'
          })
        }else{
          that.setData({
            detail_url: '/pages/team_details/team_details'
          })
        }
      }
    })
  },


  getSetting: function () {// 查看是否授权
    console.log("1")
    let that = this;
    wx.getSetting({
      success: res => {
        console.log(res)
        wx.hideLoading()
        if (res.authSetting['scope.userInfo']) {// 已经授权，可以直接调用 getUserInfo 获取头像昵称
          console.log("已授权！")
          let phone = wx.getStorageSync("phone");
          let userInfo = wx.getStorageSync("userInfo");
          that.setData({
            avatarUrl: userInfo.avatarUrl
          });
          if (phone == "") {
            that.setData({
              UserInfo: true
            })
          }else{
            that.setData({
              phone:phone,
              UserInfo: false
            })
          }
          wx.getUserInfo({
            success: res => {
              wx.setStorageSync('userInfo', res.userInfo)
            },
            fail: res => {
              console.log("获取头像失败！")
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
  getPhoneNumber: function (e) {//点击获取手机号码按钮
    var that = this;
    console.log(that.data.userid)
    wx.checkSession({
    
      success: function () {
        console.log(1)
        console.log(e.detail.errMsg)
        console.log(e.detail.iv)
        console.log(e.detail.encryptedData)
        var ency = e.detail.encryptedData;
        var iv = e.detail.iv;
        var sessionk = wx.getStorageSync("sessionKey");
        if (e.detail.errMsg == 'getPhoneNumber:fail user deny') {
          wx.switchTab({
            url: '/pages/index/index'
          })
        } else {//同意授权
          wx.request({
            method: "POST",
            url: app.data.HOST + 'v1/phone',
            header: {
              "Content-Type": "application/x-www-form-urlencoded"
            },
            data: {
              encryptedData: ency,
              iv: iv,
              sessionKey: sessionk,
              user_id: that.data.userid
            },
            header: {
              'content-type': 'application/json' // 默认值
            },
            success: (res) => {
              console.log(res.data)
              if(res.data.status==200){
                res.data.data.replace(res.data.data.substr(3, 4), "****")
                var phone = res.data.data;
                phone = phone.replace(phone.substr(3, 4), "****")

                wx.setStorageSync(
                  "phone", phone
                )
                that.setData({
                  UserInfo: false,
                  phone: phone
                });
              } else if(res.data.status == 400){
                res.data.data.replace(res.data.data.substr(3, 4), "****")
                var phone = res.data.data;
                phone = phone.replace(phone.substr(3, 4), "****")

                wx.setStorageSync(
                  "phone", phone
                )
                that.setData({
                  UserInfo: false,
                  phone: phone
                });
              }
              
              
            }, fail: function (res) {
              console.log("失败");
              console.log(res);
            }
          });
        }
      },
      fail: function () {
        console.log("session_key 已经失效，需要重新执行登录流程");
        // that.login(); //重新登录
        // wx.reLaunch({
        //   url: '/pages/login/login',
        // })
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
      }
    });
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
    let that = this;
    // that.getSetting()
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