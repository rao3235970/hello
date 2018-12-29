// pages/helpInfo/helpInfo.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    api: app.data.HOST,
    info: {},
    cutdetail: {},
    order_id: "",
    user_id: "",
    indicatorDots: false,
    circular: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    share: false,
    bgn: false,
    desc: false,
    pay: false,
    btns: false,
    btn: true,
    bgn: false,
    pays:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    let userId = options.userId;
    that.setData({
      userId: userId
    })
    let orderId = options.orderId;
    let user_id = wx.getStorageSync("user_id");
    let order_id = wx.getStorageSync("order_id");
    console.log("userId=" + userId + "--orderId=" + orderId + "order_id-" + order_id)
    if (userId == undefined) {
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
      } else if (order_id == "") {
      
        that.order()
      } else {
        that.setData({
          user_id: user_id,
          order_id: order_id
        });
        that.info()
      }
    } else {
      if (user_id == "") {
        that.setData({
          user_id: userId,
          order_id: orderId,
          btns: true,
          btn: false
        });
        that.info()
      }
      
     else {
        that.setData({
          user_id: user_id,
          order_id: orderId,
        });
        that.info()
      }

    }

    // if (userId == undefined && user_id == "") {
    //   wx.showModal({
    //     title: '提示',
    //     content: '请先授权登录！',
    //     showCancel: false,
    //     success: function (res) {
    //       if (res.confirm) {
    //         wx.redirectTo({
    //           url: '/pages/login/login'
    //         })
    //       }
    //     }
    //   })
    // }else if (userId == undefined && orderId == "") {
    //   that.order()
    // } else {
    //   that.setData({
    //     orderId: orderId
    //   });
    //   that.info()
    // }
    // wx.showShareMenu({
    //   // shareTicket 是获取转发目标群信息的票据，只有拥有 shareTicket 才能拿到群信息，用户每次转发都会生成对应唯一的shareTicket 。
    //   withShareTicket: true
    // });
    // wx.request({//轮播图
    //   url: 'https://yxtsjs.yuxwl.top/v1/getByType?ad_type_id=4',
    //   method: "get",
    //   success: res => {
    //     console.log(res.data.data)
    //     that.setData({
    //       imgUrls: res.data.data
    //     });
    //   }
    // })
  },
  order: function () {//生成订单
    let that = this;
    let user_id = wx.getStorageSync("user_id");
    let num = "1";
    let type = "3";
    let goods_id = "1";
    // if (user_id == "") {
    //   wx.showModal({
    //     title: '提示',
    //     content: '请先授权登录！',
    //     showCancel: false,
    //     success: function (res) {
    //       if (res.confirm) {
    //         wx.redirectTo({
    //           url: '/pages/login/login'
    //         })
    //       }
    //     }
    //   })
    // } else {
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
        goods_id: goods_id
      },
      success: res => {
        console.log(res.data)
        if (res.data.status == 200) {
          wx.setStorageSync('order_id', res.data.data)
          that.setData({
            user_id: wx.getStorageSync("user_id"),
            order_id: res.data.data
          });
          that.info()
        } 
    
        else {
          wx.showToast({ title: "网络请求失败请稍后重试！", icon: "none" })
        }
      }
    })
    // }
  },
  info: function () {//页面信息
    let that = this;
    let user_id = that.data.user_id;
    let order_id = that.data.order_id;
    wx.request({
      url: app.data.HOST + 'v1/share',
      method: "post",
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      data: {
        user_id: user_id,
        order_id: order_id
      },
      success: res => {
        console.log(res.data)
        console.log(res.data.pay_status)
        if (res.data.status == 200) {
          console.log(res.data.data)
          that.setData({
            info: res.data.data,
            cutdetail: res.data.data.cutdetail
          });
     
          that.help()
        } else {
          wx.showToast({ title: "网络请求失败请稍后重试！", icon: "none" })
        }
      }
    })
  },
  help: function () {//助力砍刀
    let that = this;
    let user_id = wx.getStorageSync("user_id");
    let order_id = that.data.order_id;
    console.log(user_id)
    if (user_id == "") {
      return;
    }
    wx.request({
      url: app.data.HOST + 'v1/cutPrice',
      method: "post",
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      data: {
        user_id: user_id,
        order_id: order_id
      },
      success: res => {
        console.log(res)
        console.log("啦啦" + res.data.data.status)
        if (res.data.status == 200) {
          wx.showModal({
            title: '好友助力',
            content: '您砍了' + res.data.data.money + "元",
            showCancel: false,
            success: function (res) {
              console.log(res)
              if (res.confirm) {
                that.setData({
                  user_id: wx.getStorageSync("user_id")
                });
                that.info()
              }
            }
          })
          that.setData({
            btns: false,
            btn: true
          });
        } else if (res.data.status == 406) {
          that.setData({
            pay: true,
            btns: false,
            btn: false
          });
        } else if (res.data.status == 402){
            that.setData({
              pays: true,
              pay: false,
              btn:false
            })
       
        }
        
         else if(res.data.status == 405){
          if (that.data.userId==undefined){
            wx.removeStorageSync('order_id')
            this.order()
          }else{
            wx.showModal({
              title: '提示',
              content: '该订单已过期',
            })
          }
          
          
          // wx.showToast({ title: "您已助力过，可邀请好友继续助力！", icon: "none" })
        }
      }
    })
  },
  payOrder: function (e) {//购买、助力支付
    let that = this;
    let user_id = wx.getStorageSync("user_id");
    let order = wx.getStorageSync("order_id");
    wx.navigateTo({
      url: '/pages/help/help?order=' + order
    })
    // let num = "1";
    // let type = e.currentTarget.dataset.type;
    // let goods_id = e.currentTarget.dataset.index;
    // if (user_id == "") {
    //   wx.showModal({
    //     title: '提示',
    //     content: '请先授权登录！',
    //     showCancel: false,
    //     success: function (res) {
    //       if (res.confirm) {
    //         wx.redirectTo({
    //           url: '/pages/login/login'
    //         })
    //       }
    //     }
    //   })
    // } else if (goods_id == "") {
    //   wx.showToast({
    //     title: '请正确选择商品!',
    //     icon: 'loading',
    //     duration: 2500
    //   })
    // } else {
    //   wx.request({
    //     url: app.data.HOST + 'v1/putOrder',
    //     method: "post",
    //     header: {
    //       'content-type': 'application/x-www-form-urlencoded' // 默认值
    //     },
    //     data: {
    //       user_id: user_id,
    //       num: num,
    //       type: type,
    //       goods_id: goods_id
    //     },
    //     success: res => {
    //       console.log(res.data)
    //       if (res.data.status == 200) {
    //         let order = res.data.data;
    //         wx.navigateTo({
    //           url: '/pages/help/help?order=' + order
    //         })
    //       } else {
    //         wx.showToast({ title: "网络请求失败请稍后重试！", icon: "none" })
    //       }
    //     }
    //   })
    // }
  },

  rule: function () {//规则说明
    let that = this;
    that.setData({
      desc: true,
      bgn: true
    })
  },
  desc: function () {
    let that = this;
    that.setData({
      desc: false,
      bgn: false
    })
  },
  helpBtn: function () {
    let that = this;
    that.setData({
      share: true,
      bgn: true,
    })
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
          that.help()
          // wx.switchTab({
          //   url: '/pages/index/index'
          // })
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
        // console.log(res)
        wx.hideLoading()
        if (res.authSetting['scope.userInfo']) {// 已经授权，可以直接调用 getUserInfo 获取头像昵称
          console.log("已授权！")
          wx.getUserInfo({
            success: res => {
              // that.setData({
              //     city: res.userInfo.city,
              // });
              wx.setStorageSync('userInfo', res.userInfo)
              that.checkSession()
              // that.setData({
              //   avatarUrl:wx.getStorageSync("userInfo").avatarUrl,
              //   nickNames:wx.getStorageSync("userInfo").nickName
              // })
              // console.log(res.errMsg)
              // console.log(res.userInfo)
              // console.log(res.rawData)
              // console.log(res.encryptedData)
              // console.log(res.iv)
              // console.log(res.signature)
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
              // wx.setStorageSync(
              //   "openId", res.data.data.open_id
              // )
              wx.setStorageSync(
                "user_id", res.data.data.user_id
              )
              that.info()
              // wx.setStorageSync(
              //   "sessionKey", res.data.data.sessionKey
              // )
              // wx.switchTab({
              //   url: '/pages/index/index'
              // })
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
  isGsysb(){
    this.setData({
      bgn:false,
      share:false
    })
  },
  onShareAppMessage: function (options) {
    let that = this;
    let user_id = wx.getStorageSync("user_id");
    let order_id = that.data.order_id;
    console.log(options);
    if (options.from === 'button') {
      // 来自页面内转发按钮
      that.data.shareBtn = true;
    } else {
      //来自右上角转发
      that.data.shareBtn = false;
      
    }
    
    return {
      title: '我要出国了，帮我加速领福利！',
      path: '/pages/helpInfo/helpInfo?userId=' + user_id + '&orderId=' + order_id,
      imageUrl: 'https://dispatch.yuxwl.top/images/zhuli.jpg',
      complete: res => {
        console.log(res);
        
        if (res.errMsg == 'shareAppMessage:ok') {
          that.setData({
            share: false,
            bgn: false,
          })
          //分享为按钮转发
          if (that.data.shareBtn) {
            //判断是否分享到群
            if (res.hasOwnProperty('shareTickets')) {
              console.log(res.shareTickets[0]);
              //分享到群
              that.data.isshare = 1;
              // if (res.shareTickets.length == 0) {
              //   return false;
              // }
              // wx.getShareInfo({
              //   shareTicket: res.shareTickets[0],
              //   success: function (res) {
              //     var encryptedData = res.encryptedData;
              //     var iv = res.iv;
              //   }
              // })
            } else {
              // 分享到个人
              that.data.isshare = 0;
              console.log(res.shareTickets[0]);
              // if (res.shareTickets.length == 0) {
              //   return false;
              // }
              // wx.getShareInfo({
              //   shareTicket: res.shareTickets[0],
              //   success: function (res) {
              //     var encryptedData = res.encryptedData;
              //     var iv = res.iv;
              //   }
              // })
            }
          }
        } else {
          wx.showToast({
            title: '分享失败',
          })
          that.data.isshare = 0;
        }
      }
    }
  },
})