// pages/information-details/information-details.js
const app = getApp()
var WxParse = require('../../wxParse/wxParse.js'); 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    api: app.data.HOST,
    contentTextUrl: {},
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
  
  //事件处理函数
  //收藏
  collection: function () {
    let that = this
    const userid = wx.getStorageSync('user_id')
    wx.request({
      url: that.data.api + 'v1/informationColl',
      data: { user_id: userid, information_id: that.data.information_id },
      method: 'post',
      success: function (res) {
        // console.log(res)
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    const userid = wx.getStorageSync('user_id')
    console.log(userid)
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

    }else{
      that.setData({
        information_id: that.options.information_id,
        userid: userid
      })


      console.log(that.options)
      wx.request({
        url: app.data.HOST + 'v1/informationDetails',
        data: {
          user_id: that.data.userid, information_type: 3, information_id: that.data.information_id
        },
        method: "get",
        success: res => {
          console.log(res.data)
          if (res.data.mes.information_details) {
            res.data.mes.information_details = res.data.mes.information_details.replace(/&amp;nbsp;/g, ' ');
            WxParse.wxParse('article', 'html', res.data.mes.information_details, that, 5);
          }


          that.setData({
            contentTextUrl: res.data.mes,
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
        }
      })
    }
   
  },
  btns: function () {
    let that = this
    that.setData({
      bgn: false,
      share: false
    })
  },
  onclick: function (event) {
    let that = this
    app.goods_id = event.target.dataset.index;//传递给预约报名页面的goods_id
    app.type_id = 1 //传递给预约报名页面的type_id
    console.log(event.target.dataset.index)
    wx.navigateTo({
      url: '/pages/respkai/respkai?id=' + app.goods_id,
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
  //分享
  onShareAppMessage: function (options) {
    let that = this;
    let user_id = wx.getStorageSync("user_id");
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
      path: '/pages/information-details/information-details?information_id=' + that.data.information_id,
      // imageUrl: that.data.info.product.p_thumbs,
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