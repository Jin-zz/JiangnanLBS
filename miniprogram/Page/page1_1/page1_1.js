//var app = getApp();
//console.log(app.globalData._CLText); // 调用全局变量
//注意在同一个js文件获取data定义的数据，需要使用this.data获取。
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //cltext:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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
    
  },

  bindTextAreaBlur: function (e) {
    // cltext为此js中定义的data
    // this.setData({     
    //   cltext : e.detail.value
    // })
    // console.log(e.detail.value)

    // app.globalData._CLText = e.detail.value
    // console.log(app.globalData._CLText)


    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1];   //当前页面
    var prevPage = pages[pages.length - 2];  //上一个页面

    //直接调用上一个页面的setData()方法，把数据存到上一个页面中去
    //不需要页面更新
    prevPage.setData({
      _CLText:e.detail.value
    })

    console.log('签到内容_CLText：',prevPage.data._CLText)
  },


  radioChange(e) {

    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1];   //当前页面
    var prevPage = pages[pages.length - 2];  //上一个页面
    //直接调用上一个页面的setData()方法，把数据存到上一个页面中去
    //不需要页面更新
    prevPage.setData({
      _CLState: e.detail.value
    })
    console.log('心情状态_CLState(0是开心 1是不开心)：',prevPage.data._CLState)
  }


})