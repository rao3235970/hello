// pages/faq/faq.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    api: app.data.HOST,
    answerList:{},
    activel:'',
    activer: '',
    xsl:false,
    xsr:false,
    tab:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  btn: function (res) {
    let that = this
    
    console.log(res.currentTarget.dataset.index)
    var index = res.currentTarget.dataset.index
    if (index) {
      that.setData({
        tab: index
      })
      console.log(that.data.tab)
      wx.setStorageSync('tab1', index)
    }
    if (index == 1) {
      that.setData({
        activel: 'active',
        xsl: true,
        activer: '',
        xsr: false
      })
      wx.request({
        url: app.data.HOST + 'v1/information?information_type=1',
        method: 'get',
        success: function (res) {
          console.log(res.data)
          that.setData({
            answerList: res.data.mes
          })
        }
      });
    }
    else if(index==2){
        that.setData({
          activer: 'active',
          xsr: true,
          activel: '',
          xsl: false
        })
      wx.request({
        url: app.data.HOST + 'v1/information?information_type=2',
        method: 'get',
        success: function (res) {
          console.log(res.data)
          that.setData({
            answerList: res.data.mes
          })
        }
      });
      
    }
  },
  onLoad: function(options) {
    let that = this;
    //获得问答列表
 

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
    let that = this
    let tab1 = wx.getStorageSync('tab1')
    if (tab1) {
      that.setData({
        tab: tab1
      })
    } else {
      that.setData({
        tab: 1
      })
    }
    if (that.data.tab == 1) {
      that.setData({
        activel: 'active',
        xsl: true,
        activer: '',
        xsr: false
      })
    }
    else if (that.data.tab == 2) {
      that.setData({
        activer: 'active',
        xsr: true,
        activel: '',
        xsl: false
      })

    }
    wx.request({
      url: app.data.HOST + 'v1/information?information_type='+that.data.tab,
      method: 'get',
      success: function (res) {
        console.log(res.data)
        that.setData({
          answerList: res.data.mes
        })
      }
    });
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