// pages/index1/index1.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    api: app.data.HOST,
    imgUrls: {},
    actList: {},
    indicatorDot: false,
    indicatorDots: true,
    circular: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    msgList: [

    ],

  },
  service:function(){
    wx.navigateTo({
      url: '/pages/service/service',
    })
  },
  
  call:function(){
    let that=this
    wx.makePhoneCall({
      phoneNumber: that.data.phone,
    })
  },
  onClickReturn: function () {
    let that = this;
    wx.switchTab({
      url: '/pages/work-study/work-study',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(wx.getStorageSync("user_id"))
    let that = this;
    that.imgUrls()
    that.getSetting()
    console.log(options)
    var user_id = wx.getStorageSync('user_id')
    if (options.scene) {
      
      
      var options = options.scene.split("%2C")
      wx.setStorageSync('ooptions', options)
      console.log(options[0])
      // wx.showModal({
      //   title: '提示',
      //   content: options[0],
      // })
    
    }
    try {
      var value = wx.getStorageSync('ooptions')
      console.log(value)
      console.log(value[0])
      console.log(user_id)
      if (value && user_id) {
        let userid = value[0]
        let type = value[1]
        wx.request({
          url: app.data.HOST + 'v1/shop',
          method: 'post',
          data: {
            user_id: user_id,
            uid: userid,
            type: type
          },
          success: function (res) {
            var sjson = JSON.stringify(res)
            console.log(user_id)
            console.log(userid)
            console.log(type)

            console.log("请求返回的" + sjson)
            console.log(res)
            // wx.clearStorage("ooptions")
          }
        })
      }
    } catch (e) {
    }


    wx.request({
      url: app.data.HOST + 'v1/getphone',
      method: "get",
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },

      success: res => {
        console.log(res.data)
        that.setData({
          phone: res.data.data
        })

      }
    })

  },
  imgUrls: function () {//轮播图
    let that = this;
    wx.request({
      url: app.data.HOST + 'v1/indexImg?ad_type_id=10',
      method: "get",
      success: res => {
        console.log(res.data.data)
        that.setData({
          imgUrls: res.data.data.data
        });
        that.adimgUrls()
      }
    })
    // wx.navigateTo({
    //   url: '/pages/university/university',
    // })
  },

  adimgUrls: function () {//广告图
    let that = this;
    wx.request({
      url: app.data.HOST + 'v1/indexImg?ad_type_id=11',
      method: "get",
      success: res => {
        console.log(res.data.data)
        that.setData({
          adimgUrls: res.data.data.data
        });
      }
    })
    that.msgList()
  },
  msgList: function () {//公告
    let that = this;
    wx.request({
      url: app.data.HOST + 'v1/indexImg?ad_type_id=12',
      method: "get",
      success: res => {
        console.log(res.data.data)
        that.setData({
          msgList: res.data.data.data
        });
      }
    })
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
  // // 点击下拉显示框
  // selectTap() {
  //   this.setData({
  //     show: !this.data.show
  //   });
  // },
  // optionTap(e) {
  //   let Index = e.currentTarget.dataset.index;
  //   this.setData({
  //     index: Index,
  //     show: !this.data.show
  //   });
  // },
  // // 点击下拉显示框
  // selectTapa() {
  //   this.setData({
  //     showa: !this.data.showa
  //   });
  // },
  // optionTapa(e) {
  //   let Index = e.currentTarget.dataset.index;
  //   this.setData({
  //     indexa: Index,
  //     showa: !this.data.showa
  //   });
  // },
  // // 点击下拉显示框
  // selectTapb() {
  //   this.setData({
  //     showb: !this.data.showb
  //   });
  // },
  // optionTapb(e) {
  //   let Index = e.currentTarget.dataset.index;
  //   this.setData({
  //     indexb: Index,
  //     showb: !this.data.showb
  //   });
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
    let that = this;
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

  },
})
