// pages/help/help.js
const app = getApp()
var WxParse = require('../../wxParse/wxParse.js'); 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    api: app.data.HOST,
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    phone:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    that.setData({
      order: options.order
    });
    that.info()
    this.getPhone()
  },
  getPhone() {
    wx.request({
      url: app.data.HOST + 'v1/getphone',
      method: "get",
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },

      success: res => {
        console.log(res.data)
        this.setData({
          phone: res.data.data
        })

      }
    })
  },
  info: function () {//页面信息
    let that = this;
    let product_id = "1";
    wx.request({
      url: app.data.HOST + 'v1/getCut', 
      method: "get",
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      data: {
        product_id: product_id
      },
      success: res => {
        // console.log(res.data)
        if (res.data.status == 200) {
          console.log(res.data.data)
          that.setData({
            info: res.data.data,
            list: res.data.data.list,
            imgUrls: res.data.data.lunbo,
            comment: res.data.data.comment
          });
          WxParse.wxParse('article', 'html', res.data.data.list.p_descript, that, 5);

        } else {
          wx.showToast({ title: "网络请求失败请稍后重试！", icon: "none" })
        }
      }
    })
  },
  confirm: function () {//确认支付
    let that = this;
    let order = that.data.order
    wx.request({
      url: app.data.HOST + 'v1/pay',
      method: "post",
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      data: {
        orderno: order,
      },
      success: res => {
        console.log(res)
        if (res.data.status == '400') {
          wx.showToast({
            title: res.data.mes,
            icon: 'none',
            duration: 2000
          })
          return false
        }
      
        if (res.statusCode == 200) {
          if (res.data.status == 404) {
            wx.showToast({
              title: '订单已支付！',
              icon: 'none'
            });
          }else{
          let result = res.data;
          wx.requestPayment({
            timeStamp: result.timeStamp,
            nonceStr: result.nonceStr,
            package: result.package,
            signType: result.signType,
            paySign: result.paySign,
            success(data) {
              console.log(data)
              if (data.errMsg == "requestPayment:ok") {
                wx.showToast({
                  title: '支付成功！',
                  icon: 'none'
                });
              } 
            },
            fail(data) {
              console.log(data)
              if (data.errMsg =="requestPayment:fail cancel"){
                wx.showToast({
                  title: '取消支付！',
                  icon: 'none'
                });
              }
              
              console.log(data)
            }
          })
        }
        }
      }
    })
  },
  callPhone: function () {//拨打客服
    let that = this;
    wx.makePhoneCall({
      phoneNumber: this.data.phone
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