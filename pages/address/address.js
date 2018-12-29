// pages/address/address.js
const app = getApp()


Page({

  /**
   * 页面的初始数据
   */
  data: {
    address:[],
    state:1,
    address_item:{},
    nstate:0,
    id:'',
    save:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var userid = wx.getStorageSync('user_id')
    let that=this
    that.setData({
      userid: userid
    })
    console.log(that.data.userid)
    this.addressList()
  },
  formSubmit(e){
    let that=this
    that.setData({
      save:true
    })
    console.log(e)
    var v=e.detail.value
    var t = this.data
    if (!v.name) {
      wx.showToast({
        title: '请输入联系人',
        icon: 'none',
        duration: 2000
      })
      return false
    }
    if (!v.phone) {
      wx.showToast({
        title: '请输入手机号码',
        icon: 'none',
        duration: 2000
      })
      return false
    }
    if (!(/^1[34578]\d{9}$/.test(v.phone))) {
      wx.showToast({
        title: '手机号码有误，请重填',
        icon: 'none',
        duration: 2000
      })
      return false;
    } 
    console.log(t.address)
    if (t.address.length==0){
      wx.showToast({
        title: '请选择地区',
        icon: 'none',
        duration: 2000
      })
      return false
    }
    
    
    
    if (!v.address_info) {
      wx.showToast({
        title: '请输入详细地址',
        icon: 'none',
        duration: 2000
      })
      return false
    }
    if (this.data.nstate==0){
      wx.request({
        url: app.data.HOST + 'v1/addressadd',
        method: "post",
        data: {
          user_id: that.data.userid,
          contact_name: v.name,
          contact_phone: v.phone,
          province: t.address[0],
          city: t.address[1],
          region: t.address[2],
          address: v.address_info,
          is_default: 1
        },
        success: res => {
          if (res.data.status == '200') {
            wx.showToast({
              title: '添加成功',
              icon: 'none',
              duration: 2000
            })
            this.addressList()
          }

        }
      })
    } else if (this.data.nstate==1){
      wx.request({
        url: app.data.HOST + 'v1/addressput',
        method: "post",
        data: {
          user_id: that.data.userid,
          contact_name: v.name,
          contact_phone: v.phone,
          province: t.address[0],
          city: t.address[1],
          region: t.address[2],
          address: v.address_info,
          is_default: 1,
          id:t.id
        },
        success: res => {
          if (res.data.status == '200') {
            wx.showToast({
              title: '修改成功',
              icon: 'none',
              duration: 2000
            })
            this.addressList()
          }

        }
      })
    }

    



  },
  bindRegionChange(e){
    console.log(e)
    this.setData({
      address: e.detail.value
    })
  },
  addressList(){
    let that=this
    wx.request({
      url: app.data.HOST + 'v1/addressget',
      method: "get",
      data: {
        user_id: that.data.userid
      },
      success: res => {
        console.log(res.data.data)
        if (res.data.data.length > 0) {
          this.setData({
            data: res.data.data,
            state: 0,
            id:res.data.data[0].id
          });
        } else {
          this.setData({
            state: 1
          })
        }

      }
    })
  },
  edit(e){
    console.log(e)
    this.setData({
      state:1,
      address_item: e.currentTarget.dataset.item,
      address: [e.currentTarget.dataset.item.province, e.currentTarget.dataset.item.city, e.currentTarget.dataset.item.region],
      nstate:1
    })
  },
  formReset(){
    this.setData({
      state:0,
      nstate:0,
    })
  },
  regInp(e){
    console.log(e.detail)
    
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