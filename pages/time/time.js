// pages/index1/index1.js
// let goodsList = [
//   { actEndTime: '2018-10-30 16:30:00' },
//   { actEndTime: '2018-11-01 11:00:00' },
//   { actEndTime: '2018-10-31 12:45:56' },
//   { actEndTime: '2018-12-20 15:00:23' },
//   { actEndTime: '2018-12-10 17:00:22' },
//   { actEndTime: '2018-11-06 19:00:44' },
//   { actEndTime: '2018-11-21 21:00:34' },
//   { actEndTime: '2018-12-17 09:00:37' },
//   { actEndTime: '2018-11-21 05:00:59' },
//   { actEndTime: '2018-11-19 07:00:48' },
//   { actEndTime: '2018-12-28 03:00:11' }
// ]
Page({
  data: {
    countDownList: [],
    actEndTimeList: [],
    orderList: {}
  },
  onLoad() {
    let that = this;
    let endTimeList = [];
    let g_id = "1";
    wx.request({//列表接口
      url: 'http://dispatch.yuxwl.top/v1/groupget',
      method: "get",
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      data: {
        g_id: g_id,
      },
      success: res => {
        console.log(res.data)
        if (res.data.status == 200) {
          that.setData({
            orderList: res.data.data.lists
          });
          // 将活动的结束时间参数提成一个单独的数组，方便操作
          res.data.data.lists.forEach(o => {
            endTimeList.push(o.endtime)
          })
          this.setData({
            actEndTimeList: endTimeList
          });
          // 执行倒计时函数
          this.countDown();
        } else {
          wx.showToast({ title: "网络请求失败请稍后重试！", icon: "none" })
        }
      }
    })
  },

  timeFormat(param) {//小于10的格式化函数
    return param < 10 ? '0' + param : param;
  },
  countDown() {//倒计时函数
    // 获取当前时间，同时得到活动结束时间数组
    let newTime = new Date().getTime();
    let endTimeList = this.data.actEndTimeList;
    let countDownArr = [];

    // 对结束时间进行处理渲染到页面
    endTimeList.forEach(o => {
      let endTime = new Date(o).getTime();
      let obj = null;
      // 如果活动未结束，对时间进行处理
      if (endTime - newTime > 0) {
        let time = (endTime - newTime) / 1000;
        // 获取天、时、分、秒
        let day = parseInt(time / (60 * 60 * 24));
        let hou = parseInt(time % (60 * 60 * 24) / 3600);
        let min = parseInt(time % (60 * 60 * 24) % 3600 / 60);
        let sec = parseInt(time % (60 * 60 * 24) % 3600 % 60);
        obj = {
          day: this.timeFormat(day),
          hou: this.timeFormat(hou),
          min: this.timeFormat(min),
          sec: this.timeFormat(sec)
        }
      } else {//活动已结束，全部设置为'00'
        obj = {
          day: '00',
          hou: '00',
          min: '00',
          sec: '00'
        }
      }
      countDownArr.push(obj);
    })
    // 渲染，然后每隔一秒执行一次倒计时函数
    this.setData({
      countDownList: countDownArr
    })
    setTimeout(this.countDown, 1000);
  }
})