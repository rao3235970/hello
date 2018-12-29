// pages/university/university.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    api: app.data.HOST,
    show: false,
    showa: false,
    showb: false,
    showc: false,
    schoolInfo: {},
    selectData: ['全部地区', '北海道地区', '东北地区', '关东地区', '中部地区', '近畿地区', '中国地区', '四国地区', '九州地区', '冲绳地区'],
    selecta: [
      ["城市"],
      ["北海道"],
      ["青森县", "岩手县", "宫城县", "秋田县", "山形县", "福岛县"],
      ["芡城县", "枥木县", "群马县", "琦玉县", "千叶县", "京东都", "神奈川县"],
      ["新潟县", "富山县", "石川县", "福井县", "山梨县", "长野县", "岐阜县", "静冈县", "爱知县"],
      ["滋贺县", "京都府", "大阪府", "兵库县", "奈良县", "和歌山县", "三重县"],
      ["鸟取县", "岛根县", "冈山县", "广岛县", "山口县"],
      ["德岛县", "香川县", "爱媛县", "高知县"],
      ["福冈县", "佐贺县", "长崎县", "熊本县", "大分县", "宫崎县", "鹿儿岛县"],
      ["冲绳县"]
    ],
    selectb: ['性质', '国立', '公立', '私立'],
    selectc: ['专业', '人文科学', '社会科学', '理学', '工学', '保健', '农学', '家政', '艺术', '综合新领域'],
    index: 0,
    indexa: 0,
    indexb: 0,
    indexc: 0,
    school_area: "",
    school_address: "",
    school_nature: "",
    school_major: ""
  },
  // 监听input的输入值
  findSchool: function (event) {
    let that = this;
    var schoolName = event.detail.value;
    console.log(schoolName)
    wx.request({
      url: app.data.HOST + 'v1/schoolLibrary?school_name=' + schoolName + '&school_area=&school_address=&school_nature=&school_major=',
      method: 'GET',
      success: function (res) {
        console.log(res.data)
        that.setData({
          schoolInfo: res.data.mes
        })
      },
    });
  },
  //默认展示全部学校
  initAll: function () {
    let that = this;
    wx.request({
      url: app.data.HOST + "v1/schoolLibrary?school_name=&school_area=&school_address=&school_nature=&school_major=",
      method: "get",
      success: res => {
        console.log(res.data);
        that.setData({
          //轮播
          schoolInfo: res.data.mes
        });
        // that.setData({ //标题
        //   imgTitle: res.data.mes
        // });
      }
    });
  },
  //条件搜索学校
  searchSchool: function () {
    let that = this;
    wx.request({
      url: app.data.HOST + 'v1/schoolLibrary?school_name=&school_area=' + that.data.school_area + '&school_address=' + that.data.school_address + '&school_nature=' + that.data.school_nature + '&school_major=' + that.data.school_major,
      method: 'get',
      success: function (res) {
        console.log(res.data.mes);
        that.setData({
          schoolInfo: res.data.mes
        })
      }
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    wx.request({
      url: app.data.HOST + 'v1/schoolLibrary?school_name=&school_area=&school_address=&school_nature=&school_major=',
      method: "get",
      success: res => {
        console.log(res.data)
        that.setData({ //轮播
          schoolInfo: res.data.mes
        });
        // that.setData({ //标题
        //   imgTitle: res.data.mes
        // });
      }
    })

  },
  // 地区点击下拉显示框
  selectTap() {
    this.setData({
      show: !this.data.show,
      showa: false,
      showb: false,
      showc: false
    });
  },
  optionTap(e) {
    let that = this;
    let Index = e.currentTarget.dataset.index;
    that.data.school_area = e.currentTarget.dataset.item;
    console.log(that.data.school_area)
    this.setData({
      index: Index,
      show: !this.data.show
    });
    if (Index == 0) {
      that.data.school_area = ""
    }
    that.searchSchool();
  },
  // 城市点击下拉显示框
  selectTapa() {
    this.setData({
      showa: !this.data.showa,
      showb: false,
      showc: false,
      show: false
    });
  },
  optionTapa(e) {
    let that = this;
    let Index = e.currentTarget.dataset.index;
    that.data.school_address = e.currentTarget.dataset.item;
    console.log(that.school_address)
    this.setData({
      indexa: Index,
      showa: !this.data.showa
    });
    if (Index == 0 && that.data.school_area == "") {
      that.data.school_address = "";
    }
    that.searchSchool();
  },
  // 性质点击下拉显示框
  selectTapb() {
    this.setData({
      showb: !this.data.showb,
      showa: false,
      showc: false,
      show: false
    });
  },
  optionTapb(e) {
    let that = this;
    let Index = e.currentTarget.dataset.index;
    that.data.school_nature = e.currentTarget.dataset.item;
    console.log(Index);
    console.log(that.data.school_nature)
    if (Index == 0) {
      that.data.school_nature = ""
    }
    this.setData({
      indexb: Index,
      showb: !this.data.showb
    });
    that.searchSchool();
  },
  // 专业点击下拉显示框
  selectTapc() {
    this.setData({
      showc: !this.data.showc,
      showa: false,
      showb: false,
      show: false
    });
  },
  optionTapc(e) {
    let that = this;
    let Index = e.currentTarget.dataset.index;
    that.data.school_major = e.currentTarget.dataset.item;
    console.log(that.data.school_major)
    if (Index == 0) {
      that.data.school_major = ""
    }
    this.setData({
      indexc: Index,
      showc: !this.data.showc
    });
    that.searchSchool();
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