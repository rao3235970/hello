const app = getApp()
const userid = wx.getStorageSync('user_id')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active:'active',
    actives: '',
    lefta: 'lefta',
    school: false,
    newclass:false,
    api: app.data.HOST,
    user_id:userid,
    xs:false,
    xss:false
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  //删除
  delnewclass:function(e){
    console.log(e.currentTarget.dataset.index)
    var information_id = e.currentTarget.dataset.index
    let that = this
    const userid = wx.getStorageSync('user_id')
    wx.request({
      url: that.data.api + 'v1/informationColl',
      data: { user_id: that.data.user_id, information_id: information_id },
      method: 'post',
      success: function (res) {
        console.log(res)
        if (res.data.status == 300) {
          wx.showToast({
            title: '删除成功',
            success:function(){
              that.newclass()
            }
          })

        }
      }
    })
  },
  delschool:function(e){
    console.log(e.currentTarget.dataset.index)
    var tour_id = e.currentTarget.dataset.index
    let that = this
    const userid = wx.getStorageSync('user_id')
    wx.request({
      url: that.data.api + 'v1/tourColl',
      data: { user_id: that.data.user_id, tour_id: tour_id },
      method: 'post',
      success: function (res) {
        console.log(res)
        if (res.data.status == 300) {
          wx.showToast({
            title: '删除成功',
            success: function () {
              that.school()
            }
          })
        
         
        }
      }
    })
  },
  school:function(e){
    let that=this
    that.setData({
      active: 'active',
      actives:'',
      lefta:'lefta',
      leftb:'',
      newclass:false,
      xss:false
    })
    console.log(that.data.user_id)
    wx.request({
      url: that.data.api + 'v1/mytourcoll',
      data: { user_id: that.data.user_id },
      method: 'post',
      success: function (res) {
        console.log(res)
        if (res.data.data.length != 0) {
          that.setData({
            datas: res.data.data,
            school: true,
            xs:false
          })
        }else{
          that.setData({
            school:false,
            xs:true
          })
        }

      }
    })
  },
  newclass:function(e){
    let that = this
    that.setData({
      actives: 'active',
      lefta: '',
      leftb: 'leftb',
      active:'',
      school:false,
      xs:false
    })
    wx.request({
      url: that.data.api + 'v1/myinfcoll',
      data: { user_id: that.data.user_id },
      method: 'post',
      success: function (res) {
        console.log(res)
        if (res.data.data.length == 0) {
          that.setData({
            newclass: false,
            xss:true
          })
        } else {
          that.setData({
            data: res.data.data,
            newclass: true,
            xss:false
          })
         
        }

      }
    })
  },
  onLoad: function (options) {
    console.log(userid)
    let that = this
    var userid = wx.getStorageSync('user_id')
    that.setData({
      user_id: userid
    })
    console.log(that.data.user_id)
    wx.request({
      url: that.data.api + 'v1/mytourcoll',
      data: { user_id: that.data.user_id },
      method: 'post',
      success: function (res) {
        console.log(res)
        if (res.data.data.length != 0) {
          that.setData({
            datas: res.data.data,
            school: true,
            xs: false
          })
        } else {
          that.setData({
            school: false,
            xs: true
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