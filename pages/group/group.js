// pages/group/group.js
const app = getApp()
const userid=wx.getStorageSync('user_id')
var WxParse = require('../../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    api: app.data.HOST,
    countDownList: [],
    orderList: {},
    indicatorDots: true,
    circular: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    now: false,
    join: false,
    bgn: false,
    userid:userid,
    num:0,
    platform:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that=this
    wx.getSystemInfo({
      success(res) {
        that.setData({
          platform: res.platform
        })
        console.log(res.platform)
      }
    })
    this.getPhone()
  },
  getPhone(){
    wx.request({
      url: app.data.HOST + 'v1/getphone',
      method: "get",
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },

      success: res => {
        console.log(res.data)
        this.setData({
          phone:res.data.data
        })

      }
    })
  },
  groupInfo: function () {//拼团列表
    let that = this;
    let g_id = "1";
    wx.request({
      url: app.data.HOST + 'v1/groupget',
      method: "get",
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      data: {
        g_id: g_id,
      },
      success: res => {
        console.log(res.data.data.one_list.g_thumbs)
        console.log(res.data.data.lists)
       
       
        // console.log(res.data.data.comment.splice(0, 2))
      
        if (res.data.status == 200) {
          WxParse.wxParse('article', 'html', res.data.data.one_list.descript, that, 5);
       if (res.data.data.comment.length <= 2){
            that.setData({
              list: res.data.data.one_list,
              orderList: res.data.data.lists,
              comment: res.data.data.comment,
              imgUrls: res.data.data.one_list.g_thumbs
            });
          }else{
            that.setData({
              list: res.data.data.one_list,
              orderList: res.data.data.lists,
              comment: res.data.data.comment.splice(0, 2),
              imgUrls: res.data.data.one_list.g_thumbs 
            });
        

          } 

         
          // 执行倒计时函数
          this.countDown();
        } else {
          wx.showToast({ title: "网络请求失败请稍后重试！", icon: "none" })
        }
      }
    })
  },
  timeFormat(param) {//小于10的格式化函数
    return param < 10 ? '0' + param : param;
  },
  countDown(data) {//倒计时函数
    // 获取当前时间，同时得到活动结束时间数组
    let newTime = new Date().getTime();
    let orderList = this.data.orderList
    let countDownArr = [];
    let platform = this.data.platform
    // 对结束时间进行处理渲染到页面
    orderList.forEach(o => {
      let startTime = new Date(o.starttime).getTime();
      let endTime;
      
      let obj = null;
      // 如果活动未结束，对时间进行处理
      console.log()
      if (platform=='ios'){
        endTime = new Date(String(o.endtime.replace(/\-/g, "/"))).getTime();
        console.log("IOS")
      }else{
        endTime = new Date(String(o.endtime)).getTime();
      }
      // console.log(endTime)
      if (endTime - newTime > 0) {
        let time = (endTime - newTime) / 1000;
        // 获取天、时、分、秒
        let day = parseInt(time / (60 * 60 * 24));
        let hou = parseInt(time % (60 * 60 * 24) / 3600);
        let min = parseInt(time % (60 * 60 * 24) % 3600 / 60);
        let sec = parseInt(time % (60 * 60 * 24) % 3600 % 60);
        obj = {
          satisfy: "1",
          day: this.timeFormat(day),
          hou: this.timeFormat(hou),
          min: this.timeFormat(min),
          sec: this.timeFormat(sec)
        }
      } else {//活动已结束，全部设置为'00'
        // console.log('活动已结束，全部设置为')
        obj = {
          satisfy: "0",
          day: '00',
          hou: '00',
          min: '00',
          sec: '00'
        }
      }
      o.date=obj

      countDownArr.push(o);
    })    
    // 渲染，然后每隔一秒执行一次倒计时函数
    for (var i = 0, flag = true, len = countDownArr.length; i < len; flag ? i++ : i) {
      if (countDownArr[i] && countDownArr[i].satisfy == 0) {
        countDownArr.splice(i, 1);
        flag = false;
      } else {
        flag = true;
      }
    }
    this.setData({
      countDownList: countDownArr
    })
    setTimeout(this.countDown, 1000);
  },
  groupList: function () {//拼团更多
    let that = this;
    that.setData({
      now: true,
      bgn: true
    });
  },
  order: function (e) {//购买、发起拼团
    let that = this;
    let user_id = wx.getStorageSync("user_id");
   
    let num = "1";
    let type = e.currentTarget.dataset.type;
    let goods_id = e.currentTarget.dataset.index;
    if (user_id == "") {
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
    } else if (goods_id == "") {
      wx.showToast({
        title: '请正确选择商品!',
        icon: 'loading',
        duration: 2500
      })
    } else {
      wx.request({
        url: app.data.HOST + 'v1/putOrder',
        method: "post",
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值
        },
        data: {
          user_id: user_id,
          num: num,
          type: type,
          goods_id: 1,

        },
        success: res => {
          console.log(res.data)
          if (res.data.status == 200) {
            let order = res.data.data;
            wx.navigateTo({
              url: '/pages/groupInfo/groupInfo?order=' + order
            })
          } 
          else if (res.data.status == 400){
            wx.showToast({ title: res.data.mes, icon: "none" })

          }
          
          else {
            wx.showToast({ title: "网络请求失败请稍后重试！", icon: "none" })
          }
        }
      })
    }
  },
  order2: function (e) {//购买、发起拼团
    let that = this;
    let user_id = wx.getStorageSync("user_id");

    let num = "1";
    let type = e.currentTarget.dataset.type;
    let goods_id = e.currentTarget.dataset.index;
    if (user_id == "") {
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
    } else if (goods_id == "") {
      wx.showToast({
        title: '请正确选择商品!',
        icon: 'loading',
        duration: 2500
      })
    } else {
      wx.request({
        url: app.data.HOST + 'v1/putOrder',
        method: "post",
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值
        },
        data: {
          user_id: user_id,
          num: num,
          type: type,
          goods_id: 1,
          groupid: goods_id
        },
        success: res => {
          console.log(res.data)
          if (res.data.status == 200) {
            let order = res.data.data;
            wx.navigateTo({
              url: '/pages/groupInfo/groupInfo?order=' + order
            })
          } 
          else if (res.data.status == 400) {
            wx.showToast({ title: res.data.mes, icon: "none" })

          }
         
          else {
            wx.showToast({ title: "网络请求失败请稍后重试！", icon: "none" })
          }
        }
      })
    }
  },
  callPhone: function () {//拨打客服
    let that = this;
    wx.makePhoneCall({
      phoneNumber: this.data.phone
    })
  },
  close: function () {//关闭弹窗
    let that = this;
    that.setData({
      now: false,
      join: false,
      bgn: false
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
    that.groupInfo()
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