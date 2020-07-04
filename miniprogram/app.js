//app.js
App({
  onLaunch: function () {
    
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true,
        env: 'test-mycloud-88cd2e'//「Error: errCode: -502005 database collection not exists」
      })
    }

    this.globalData = {}
  },

  globalData: {
    userInfo: null,
    userOpenid: '',
    _mylatitude: 23.099994,
    _mylongitude: 113.324520,
    helloFromApp: 'Hello,I am From App.js',
  }

})
