// pages/resp/resp.js
const app = getApp()
var common = require('../../utils/common.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {

    api: app.data.HOST,
    create_time: "",
    enroll_edu: "",
    enroll_name: "",
    enroll_profession: "",
    enroll_tel: "",
    goods_id: "",
    type_id: "",
    array:['初中','高中/中专/职高/技校','大专','本科','硕士'], 
    index:0,

  },

  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e)
    this.setData({
      index: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    

    var today = common.getToday();
    // console.log(today)
    let that = this
   var userid= wx.getStorageSync('user_id')
   console.log(userid)
    that.setData({
      userid: userid
    })
    // wx.showModal({
    //   title: '用户id',
    //   content: JSON.stringify(that.data.userid),
    // })
    console.log(that.data.index)
  
   
  },
  bindDateChange: function(e) {
    console.log('picker发送选择改变，携带值为', e)
    this.setData({
      date: e.detail.value
    });
  },
  formSubmit: function(e) {

    let that = this;
    let data = e.detail.value;
    console.log(that.data.userid)
    that.setData({
      create_time: data.create_time,
      enroll_edu: data.enroll_edu,
      enroll_name: data.enroll_name,
      enroll_tel: data.enroll_tel,
    });
    var phone = /^1[34578]\d{9}$/
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    console.log(data.create_time)
    if ( data.enroll_name == ""  || data.enroll_tel == "") {
      wx.showToast({
        title: '请补全信息',
        icon: 'none'
      });
    } else if (!phone.test(data.enroll_tel)) {
      wx.showToast({
        title: '手机号码格式有误',
        icon: 'none'
      });
    } else {
      
      wx.request({
        url: app.data.HOST + 'v1/Enroll',
        method: 'post',
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data: {
          create_time: data.create_time,
          enroll_edu: that.data.index,
          enroll_name: data.enroll_name,
          enroll_tel: data.enroll_tel,
          goods_id: '留学报名',
          type_id: 0,
          user_id: that.data.userid
        },
        success: function(res) {
          console.log(res.data)
          //如果预约成功就跳到首页
          if (res.data.status == "200") {
            wx.showModal({
              title: '提示',
              content: '恭喜你，预约成功啦！稍后老师会和你取得联系(∩_∩)',
              showCancel: false,
              success: function(res) {
                if (res.confirm) {
                  wx.switchTab({
                    url: "/pages/index/index"
                  });
                };
              }
            });
          } else if (res.data.status == "401") {
            wx.showToast({
              title: '预约中',
              icon: 'none'
            })
          } else {
            wx.showToast({
              
              title: '预约失败',
              icon: 'none'
            });
          };
        },
      });
    };
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    let that = this;
    that.setData({
      create_time: "",
      enroll_edu: "",
      enroll_name: "",
      enroll_profession: "",
      enroll_tel: "",
      date: ""
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})