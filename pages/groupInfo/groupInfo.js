// pages/groupInfo/groupInfo.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    api: app.data.HOST,
    groupInfo: "",
   share: false,
    bgn: false

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    console.log(options)
    that.groupInfo(options)
    that.setData({
      order: options.order
    });
  },
  groupInfo: function (options) {//订单信息
    let that = this
    let order = options.order;
    console.log(order)
    wx.request({
      url: app.data.HOST + 'v1/ready',
      method: "post",
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      data: {
        orderno: order,
      },
      success: res => {
        that.setData({
          groupInfo: res.data.data,
          groupInfoimg: res.data.data.order_thumb
        });
        // if (that.data.groupInfo.contact_name == null || that.data.groupInfo.contact_phone == null || that.data.groupInfo.user_address==null){
        //   wx.showModal({
        //     title: '提示',
        //     content: '请完善地址再下单',
        //     success:function(res){
        //       if(res.confirm){
        //         wx.navigateTo({
        //           url: '/pages/address/address',
        //         })
        //       }
        //     }
        //   })
        // }
        console.log(res)
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
          let result = res.data;
          wx.requestPayment({
            timeStamp: result.timeStamp,
            nonceStr: result.nonceStr,
            package: result.package,
            signType: result.signType,
            paySign: result.paySign,
            success(res) {
              console.log(res)
              wx.showToast({
                title: '支付成功！',
                icon: 'none',
                success:function(){
                  console.log('aaaa')
                  that.setData({
                    share: true,
                    bgn: true
                  })
                }
              });
              // wx.navigateBack({
              //   delta: 1
              // })
              console.log("支付成功！")
             
            },
            fail(res) {
              console.log(res)
              wx.showToast({
                title: '取消支付！',
                icon: 'none'
              });
              console.log("支付失败！")
            }
          })
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

  //分享
  onShareAppMessage: function (options) {
    let that = this;
    let user_id = wx.getStorageSync("user_id");
    let order_id = that.data.id;
    console.log(options);
    if (options.from === 'button') {
      // 来自页面内转发按钮
      that.data.shareBtn = true;
    } else {
      //来自右上角转发
      that.data.shareBtn = false;
    }
    return {
      title: '分享给好友',
      path: '/pages/group/group',
      imageUrl: that.data.groupInfoimg,
      complete: res => {
        console.log(res);
      
        if (res.errMsg == 'shareAppMessage:ok') {
          that.setData({
            share: false,
            bgn: false
          })
          //分享为按钮转发
          if (that.data.shareBtn) {
            //判断是否分享到群
            if (res.hasOwnProperty('shareTickets')) {
              // console.log(res.shareTickets[0]);
              //分享到群
              that.data.isshare = 1;

            } else {

              that.data.isshare = 0;
              // console.log(res.shareTickets[0]);

            }
          }
        } else {
          wx.showToast({
            title: '分享失败',
          })
          that.setData({
            share: false,
            bgn: false
          })
          that.data.isshare = 0;
        }
      }
    }
  }
})