// pages/training/training.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    api: app.data.HOST,
    data:{},//培训中心内部设施数据
    indicatorDot: false,
    indicatorDots: true,
    circular: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    tip:false
  },

  //最新开班信息
  kaiban:function(){
    wx.navigateTo({
      url: '/pages/opening-information/opening-information',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that=this
    wx.request({
      url: app.data.HOST +'v1/article',
      method:'GET',
      success:function(result){
        console.log(result.data.mes)
        that.setData({
          data: result.data.mes[0],
          datas: result.data.mes[1]
        })
        // console.log(result.data.mes[0])
        // console.log(result.data.mes.slice(1, result.data.mes.length+1))
      }
    });
 
      wx.request({
        url: app.data.HOST + 'v1/information?information_type=3',
        method: "get",
        success: res => {
          console.log(res.data)
          if (res.data.mes.length!=0){
            that.setData({
              contentTitleUrl: res.data.mes.slice(0, 4)
            });
          }else{
            that.setData({
              tip:true
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
    let that = this;
    wx.request({
      url: app.data.HOST + 'v1/dynamic',
      method: "get",
      success: res => {
        console.log(res.data)
        that.setData({
          textUrl: res.data.mes
        })
      }
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