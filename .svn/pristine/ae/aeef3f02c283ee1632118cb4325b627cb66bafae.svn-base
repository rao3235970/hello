// pages/study-plan/study-plan.js
const app = getApp()
var common = require('../../utils/common.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    api: app.data.HOST,
    array: ['初中', '高中/中专/职高/技校', '大专', '本科', '硕士'],
    index: 0,
  },
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    });
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e)
    this.setData({
      index: e.detail.value
    })
  },
  // formSubmit: function (e) {
  //   let that=this
  //   var phone = /0?(13|14|15|17|18|16)[0-9]{9}/
  //   let data = e.detail.value;
  //   console.log('form发生了submit事件，携带数据为：', e.detail.value)
  //   console.log(data.create_time)
  //   if (data.create_time == null || data.enroll_edu == "" || data.enroll_profession == "" || data.enroll_tel == "") {
  //     wx.showToast({
  //       title: '请补全信息',
  //       icon: 'none'
  //     });
  //   } else if (!phone.test(data.enroll_tel)) {
  //     wx.showToast({
  //       title: '手机号码格式有误',
  //       icon: 'none'
  //     });
  //   } else {
  //     wx.request({
  //       url: app.data.HOST + 'v1/schoolSays',
  //       method: 'post',
  //       header: {
  //         "Content-Type": "application/x-www-form-urlencoded"
  //       },
  //       data: {
  //         user_id: '',
  //         create_time: data.create_time,
  //         say_edu: data.enroll_edu,
  //         say_name: data.enroll_name,
  //         say_weixin: data.enroll_weiChat,
  //         say_tel: data.enroll_tel,
  //         school_id: that.schoolId
  //       },
  //       success: function (res) {
  //         console.log(res.data)
  //         console.log(data.enroll_edu)
  //         //如果预约成功就跳到首页
  //         if (res.data.status == "200") {
  //           wx.showModal({
  //             title: '提示',
  //             content: '预约成功',
  //             showCancel: false,
  //             success: function (res) {
  //               if (res.confirm) {
  //                 wx.switchTab({
  //                   url: "/pages/index/index"
  //                 })
  //               }
  //             }
  //           });
  //         } else if (res.data.status == "401") {
  //           wx.showToast({
  //             title: '预约中',
  //             icon: 'none'
  //           })
  //         } else {
  //           wx.showToast({
  //             title: '预约失败',
  //             icon: 'none'
  //           })
  //         }
  //       }
  //     });
  //   }
  // },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var userid = wx.getStorageSync('user_id')
    console.log(options.school_id)
    console.log(userid)
    let that=this
    that.setData({
      schoolId: that.options.school_id,
      userid: userid
    })
  },
    formSubmit: function (e) {
    
      let that = this
      var phone = /0?(13|14|15|17|18|16)[0-9]{9}/
      let data = e.detail.value;
      console.log('form发生了submit事件，携带数据为：', e.detail.value)
      console.log(data.create_time)
      if (data.enroll_profession == "" || data.enroll_tel == "") {
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
          url: app.data.HOST + 'v1/schoolSays',
          method: 'post',
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          data: {
            user_id: that.data.userid,
            create_time: data.create_time, 
            say_edu: that.data.array[that.data.index],
            say_name: data.enroll_name,
            say_weixin: data.enroll_weiChat,
            say_tel: data.enroll_tel,
            school_id: that.data.schoolId
          },
          success: function (res) {
            console.log(res.data)
            console.log(data.enroll_edu)
            //如果预约成功就跳到首页
            if (res.data.status == "200") {
              wx.showModal({
                title: '提示',
                content: '恭喜你，预约成功啦！稍后老师会和你取得联系(∩_∩)',
                showCancel: false,
                success: function (res) {
                  if (res.confirm) {
                    wx.switchTab({
                      url: "/pages/index/index"
                    })
                  }
                }
              });
            } else if (res.data.status == "400") {
              wx.showToast({
                title: '预约中',
                icon: 'none'
              })

            } else if (res.data.status == "401") {
              wx.showToast({
                title: '评估成功',
                icon: 'none'
              })
            }  
            
            else {
              wx.showToast({
                title: '评估失败',
                icon: 'none'
              })
            }
          }
        });
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
    var today = common.getToday();
    console.log(today)
    let that = this
    that.setData({
      today: today
    })
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