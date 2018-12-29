// pages/my-release/index.js
const app = getApp()
const userid = wx.getStorageSync('user_id')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    data:[],
    radio_state:false, // 编辑状态
    state:false,
    zan:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.load()
  },
  edit(){
    this.setData({
      radio_state: !this.data.radio_state,
      
    })
    if (this.data.radio_state==false){
      this.data.data.forEach(item=>{
        item.radio_src = '../../images/chackbox_false.png'
      })
      this.setData({
        data: this.data.data,
        state:false
      })
    }
    
  },
  radio(e){
    var index = e.currentTarget.dataset.index;
    this.data.data[index].radio_src == '../../images/fb_xz.png' ? this.data.data[index].radio_src = '../../images/chackbox_false.png' : this.data.data[index].radio_src = '../../images/fb_xz.png'
    this.setData({
      data: this.data.data
    })
    console.log()
  },
  all_radio(){
    this.data.state = !this.data.state
    if(this.data.state){
      this.data.data.forEach(item => {
        item.radio_src = '../../images/fb_xz.png'
      })
    }else{
      this.data.data.forEach(item => {
        item.radio_src = '../../images/chackbox_false.png'
      })
    }
    
    this.setData({
      data:this.data.data,
      state:this.data.state
    })
  },
  remove_item(){
    let obj={}
    let a1=[]
    let a2=[]
    let that=this
    this.data.data.forEach(item=>{
      item.type == 1 ? item.radio_src == '../../images/fb_xz.png' ? a1.push(item.interlocution_id)  :'':
        item.radio_src == '../../images/fb_xz.png' ? a2.push(item.video_id)  : ''
    })
    obj.video_id=a2.join(',')
    obj.inter_id=a1.join(',')
    wx.showModal({
      title: '提示',
      content: '确定删除吗',
      success(res) {
        if (res.confirm) {
          wx.request({
            url: app.data.HOST + 'v1/pushdel',
            method: "post",
            data: {
              array: JSON.stringify(obj)
            },
            success: res => {
              that.load()
              // if(res.data.data.length)
              that.setData({
                radio_state:false
              })
              
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
    
  },
  load(){
    var user_id = wx.getStorageSync('user_id')
    console.log(user_id)
    wx.request({
      url: app.data.HOST + 'v1/mypush',
      method: "get",
      data: {
        user_id: user_id
      },
      success: res => {
        console.log(res)
        res.data.data.forEach(item => {
          item.radio_src = '../../images/chackbox_false.png'
        })
        console.log(res.data.data)
        if(res.data.data.length==0){
          this.setData({
            zan:true,
            data: res.data.data
          })
        }else{
          this.setData({
            zan:false,
            data: res.data.data
          })
        }
      
        if (this.data.legnth==0){
          this.setData({
            radio_state:false
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