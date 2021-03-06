// pages/order/order.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    api: app.data.HOST,
    page: 1,
    status:"",
    orderList: {},
    all: true,
    pay: false,
    pay: false,
    pay: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    that.List("")
  },
  all: function (e) {//tab切换
    let that = this;
    that.setData({
      page: 1,
      all: true,
      pay: false,
      com: false,
      ord: false
    })
    that.List("")
  },
  pay: function (e) {
    let that = this;
    that.setData({
      status:"1",
      page: 1,
      all: false,
      pay: true,
      com: false,
      ord: false
    })
    that.List(1)
  },
  com: function (e) {
    let that = this;
    that.setData({
      status:"3",
      page: 1,
      all: false,
      pay: false,
      com: true,
      ord: false
    })
    that.List(3)
  },
  ord: function (e) {
    let that = this;
    that.setData({
      status:"4",
      page: 1,
      all: false,
      pay: false,
      com: false,
      ord: true
    })
    that.List(4)
  },
  List: function (status) {//加载订单列表
    var that = this;
    let user_id = wx.getStorageSync("user_id");
    if (user_id == "") {
      wx.showModal({
        title: '提示',
        content: '请先授权登录！',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            wx.switchTab({
              url: '/pages/user/user'
            })
          }
        }
      })
    } else {
      wx.request({
        url: app.data.HOST + 'v1/getOrder',
        method: "get",
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值
        },
        data: {
          user_id: user_id,
          status: status,
          page: that.data.page,
          limit: "8"
        },
        success: res => {
          console.log(res)
          if (res.data.status == 200) {
            if (that.data.page == 1) {
              that.setData({
                orderList: res.data.data
              })
            } else if (res.data.data.length == 0) {
              wx.hideLoading();
              wx.showToast({ title: "没有更多数据！", icon: "none" })
            } else {
              wx.hideLoading();
              var orderList = that.data.orderList;
              for (var i = 0; i < res.data.data.length; i++) {
                orderList.push(res.data.data[i]);
              }
              that.setData({
                orderList: orderList
              })
            }
          } else {
            wx.showToast({ title: "网络请求失败请稍后重试！", icon: "none" })
          }
        }
      })
    }
  },
  //删除订单
  del:function(e){
    console.log(e)
    
    let sts = e.currentTarget.dataset.sts
    console.log(sts)
    let that = this;
    let user_id = wx.getStorageSync("user_id");
    let orderno = e.currentTarget.dataset.index;
    let order_id = e.currentTarget.dataset.id;
    wx.request({
      url: app.data.HOST + 'v1/orderdelete',
      method:'post',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      data:{
        user_id: user_id,
        orderno: orderno,
        order_id: order_id
      },
      success:function(res){
        console.log(res)
        if (res.data.status==200){
          wx.showToast({
            title: '删除成功',
            icon: 'none',
            
          })
          if (that.data.all == true) {
            sts=''
            that.List(sts)
          }else{
            that.List(sts)
          }
          
        }else{
          wx.showToast({
            title: '删除失败',
            icon: 'none'

          })
          if (that.data.all == true) {
            sts = ''
            that.List(sts)
          } else {
            that.List(sts)
          }
          
        }
      }
    })
  },
  confirm: function (e) {//确认支付
    let that = this;
    let order = e.currentTarget.dataset.index;
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
        
      if (res.statusCode == 200) {
        if (res.data.status == 400) {
          wx.showToast({
            title: res.data.mes,
            icon: 'none'
          })
        }else{
          let result = res.data;
          wx.requestPayment({
            timeStamp: result.timeStamp,
            nonceStr: result.nonceStr,
            package: result.package,
            signType: result.signType,
            paySign: result.paySign,
            success(res) {
              console.log(res)
             
              if(res.errMsg=="requestPayment:ok"){
                
                wx.showToast({
                  title: '支付成功！',
                  icon: 'none',
                  duration:5000,
                  success:function(res){
                    that.List("")
                  }
                  
                })

              }
              
              
              console.log("支付成功！")
            },
            fail(res){
              console.log(res)
              wx.showToast({
                title: '支付失败！',
                icon: 'none'
              })
            }
          })
        }
         
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
    let that=this;
    wx.showLoading({
      title: '加载中……',
    });
    var page = this.data.page + 1;
    this.setData({ ["page"]: page });
    this.List(that.data.status);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})