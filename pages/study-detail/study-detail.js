// pages/study-detail/study-detail.js
var WxParse = require('../../wxParse/wxParse.js');
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    api: app.data.HOST,
    imgUrls: {},
    imgTitle: {},
    imgDiscuss: {},
    textAbout: {},
    actList: {},
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    num: 1,
    minusStatus: 'disable',
    actulPay: '',
    actulPa: '',
    img: '/images/xinb.png',
    share: false,
    bgn: false

  },
  onshare: function () {
    let that = this
    that.setData({
      share: true,
      bgn: true
    })

  },
  //事件处理函数


  //收藏wx.showShareMenu()
  collection: function () {
    let that = this
    const userid = wx.getStorageSync('user_id')
    wx.request({
      url: that.data.api + 'v1/tourColl',
      data: { user_id: userid, tour_id: that.data.id },
      method: 'post',
      success: function (res) {
        console.log(res)
        if (res.data.status == 200) {
          that.setData({
            img: '/images/xina.png'
          })
        } else if (res.data.status == 300) {
          that.setData({
            img: '/images/xinb.png'
          })
        }
      }
    })




  },
  /*点击减号*/
  bindMinus: function () {
    var num = this.data.num;
    if (num > 1) {
      num--;
    }
    var minusStatus = num > 1 ? 'normal' : 'disable';
    this.setData({
      num: num,
      minusStatus: minusStatus
    })
    let that = this
    let subtraction = that.data.actulPayTic
    console.log(that.data.num + "/" + subtraction)
    that.setData({
      actulPa: num * subtraction
    })

    console.log(num * subtraction)
    console.log(that.data.actulPay)
  },
  /*点击加号*/
  bindPlus: function () {
    var num = this.data.num;
    num++;
    var minusStatus = num > 1 ? 'normal' : 'disable';
    this.setData({
      num: num,
      minusStatus: minusStatus
    })
    let that = this
    var actulPay = that.data.actulPay

    console.log(actulPay)
    let adition = that.data.num * actulPay

    that.setData({
      actulPa: adition
    })

    console.log(that.data.actulPay)
  },
  /*输入框事件*/
  bindManual: function (e) {
    var num = e.detail.value;
    var minusStatus = num > 1 ? 'normal' : 'disable';
    this.setData({
      num: num,
      minusStatus: minusStatus
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    const userid = wx.getStorageSync('user_id')
    console.log(userid)
    console.log(that.options.tour_id)
    that.setData({
      id: that.options.tour_id
    })

    if (!userid || userid == undefined) {
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

    } else {
      wx.request({
        url: app.data.HOST + 'v1/tourDetails',
        data: { user_id: userid, tour_id: that.options.tour_id },
        method: "get",
        success: res => {
          console.log(res.data)

          that.setData({ //标题
            imgTitle: res.data.mes,
            actulPa: res.data.mes.tour_money,
            actulPay: res.data.mes.tour_money, //点击加法使用的数据
            actulPayTic: res.data.mes.tour_money, //点击减法使用的数据
            tour_count: res.data.mes.tour_count,
            imgUrls: res.data.mes.tour_img
          });
          WxParse.wxParse('article', 'html', res.data.mes.tour_run, that, 5);
          that.setData({
            textAbout: res.data.mes
          });
          if (res.data.mes.status == 1) {
            that.setData({
              img: '/images/xina.png'
            })
          } else if (res.data.mes.status == 0) {
            that.setData({
              img: '/images/xinb.png'
            })
          }

          console.log(that.data.imgTitle)
        }
      })
    }










  },
  btns:function(){
    let that=this
    that.setData({
      bgn:false,
      share:false
    })
  },
  // 单击进入预约详情
  onClick: function (event) {
    let that = this;
    app.goods_id = event.target.dataset.index;//传递给预约报名页面的goods_id
    app.type_id = 2 //传递给预约报名页面的type_id
    wx.navigateTo({
      url: '/pages/respyou/respyou?id=' + app.goods_id
    })
  },
  /**
aaa     * 生命周期函数--监听页面初次渲染完成
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
    that.setData({
      share: false,
      bgn: false
    })
    return {
      title: '分享给好友',
      path: '/pages/study-detail/study-detail?tour_id=' + order_id,     
      imageUrl: that.data.imgUrls[0],
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
              console.log(res.shareTickets);
              //分享到群
              that.data.isshare = 1;

            } else {

              that.data.isshare = 0;
              console.log(res.shareTickets);

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