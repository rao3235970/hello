// pages/study-tour/study-tour.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    api: app.data.HOST,
    imgUrls: [],
    comment: {},
    wu:false,
    content:true
  },
  //监听input输入城市或者景点
  findCity: function (event) {
    let that = this;
    var cityName = event.detail.value;
    console.log(cityName)
    wx.request({
      url: app.data.HOST + 'v1/tour?tour_address=&tour_title=' + cityName,
      method: 'get',
      success: function (res) {
        console.log(res.data)
        if(res.data.status==400){
          that.setData({
            wu:true,
            content:false
          })
        }else{
          that.setData({
            content:true,
            imgUrls: res.data.mes,
            wu:false
          })
        }
        
      },
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this;
    wx.request({
      url: app.data.HOST + 'v1/tour?tour_address=&tour_title=',
      method: "get",
      success: res => {
        console.log(res.data)
        that.setData({
          imgUrls: res.data.mes
        });
      
        // for(var i=0;i<that.data.imgUrls.length;i++){
        //   var id=that.data.imgUrls[i].tour_id
        //   console.log(that.data.imgUrls[i])
        //   wx.request({
        //     url: app.data.HOST + 'v1/tourSay?goods_id='+id+'&type=1',
        //     method: 'get',
        //     success: function (res) {
        //       that.setData({
        //         comment: res.data.mes.num
        //       })
             
        //     }
        //   })
        // }
     
      }
    });
   
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