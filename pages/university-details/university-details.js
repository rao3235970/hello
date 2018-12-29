// pages/university-details/university-details.js
var WxParse = require('../../wxParse/wxParse.js');
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    api: app.data.HOST,
    imgUrl: {},
    imgUrls: {},
    actList: {},
    schoolVideo: {},
    indicatorDot: false,
    indicatorDots: true,
    circular: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    img: {},
  },

  // 图片预览
  img: function(e) {
    var that = this;
    var all_pic = [];
    var url = e.currentTarget.dataset.item
    console.log("点击的url：", url);
    for (var i = 0; i < that.data.img.length; i++) {
      var imgs = that.data.img[i]
      all_pic.push(imgs)
    }



    wx.previewImage({
      current: url, // 当前显示图片的http链接
      urls: all_pic // 需要预览的图片http链接列表
    })
  },
  onClickReturn: function() {
    let that = this;
    wx.switchTab({
      url: '/pages/index/index',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this
    that.setData({
      oid: options.school_id
    })

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
    console.log(that.data.oid)
    wx.request({
      url: app.data.HOST + 'v1/schoolDetails?school_id=' + that.data.oid,
      method: "get",
      success: res => {
       
        // console.log(res.data.mes.school_special)
        that.setData({ //首页图片
          imgUrls: res.data.mes,
          img: res.data.mes.school_img,
          school_name: res.data.mes.school_name,
        });
        //学校介绍
        if (that.data.imgUrls.school_details) {
          that.data.imgUrls.school_details = that.data.imgUrls.school_details.replace(/&amp;nbsp;/g, ' ');
          WxParse.wxParse('article', 'html', that.data.imgUrls.school_details, that, 5);
        }
        //学部学科介绍
        if (that.data.imgUrls.school_care) {
          that.data.imgUrls.school_care = that.data.imgUrls.school_care.replace(/&amp;nbsp;/g, ' ');
          WxParse.wxParse('school_care', 'html', that.data.imgUrls.school_care, that, 5);
        }
        //学费介绍
        if (that.data.imgUrls.school_question) {
          that.data.imgUrls.school_question = that.data.imgUrls.school_question.replace(/&amp;nbsp;/g, ' ');
          WxParse.wxParse('school_question', 'html', that.data.imgUrls.school_question, that, 5);
        }
        //申请条件
        if (that.data.imgUrls.school_term){
          that.data.imgUrls.school_term = that.data.imgUrls.school_term.replace(/&amp;nbsp;/g, ' ');
          WxParse.wxParse('school_term', 'html', that.data.imgUrls.school_term, that, 5);
        }
        //专业设置
        if (that.data.imgUrls.school_pro){
          that.data.imgUrls.school_pro = that.data.imgUrls.school_pro.replace(/&amp;nbsp;/g, ' ');
          WxParse.wxParse('school_pro', 'html', that.data.imgUrls.school_pro, that, 5);
        }
        //就业支持
        if (that.data.imgUrls.school_zan){
          that.data.imgUrls.school_zan = that.data.imgUrls.school_zan.replace(/&amp;nbsp;/g, ' ');
          WxParse.wxParse('school_zan', 'html', that.data.imgUrls.school_zan, that, 5);
        }
        //就业单位
        if (that.data.imgUrls.school_unit){
          that.data.imgUrls.school_unit = that.data.imgUrls.school_unit.replace(/&amp;nbsp;/g, ' ');
          WxParse.wxParse('school_unit', 'html', that.data.imgUrls.school_unit, that, 5);
        }
        //课程设置
        if (that.data.imgUrls.school_source){
          that.data.imgUrls.school_source = that.data.imgUrls.school_source.replace(/&amp;nbsp;/g, ' ');
          WxParse.wxParse('school_source', 'html', that.data.imgUrls.school_source, that, 5);
        }
        //学校特色
        if (that.data.imgUrls.school_special){
           that.data.imgUrls.school_special = that.data.imgUrls.school_special.replace(/&amp;nbsp;/g, ' ');
          WxParse.wxParse('school_special', 'html', that.data.imgUrls.school_special, that, 5);
        }
        // console.log(that.data.schoolVideo.length)
        wx.setNavigationBarTitle({
          title: that.data.school_name,
        })
      }
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