var app = getApp();//全局变量

Page({

  /**
   * 页面的初始数据
   */
  data: {
    //进入页面3时 地图中央为最新一次刷新位置时获得的位置 见 updateLocation（）
    // _mylongitude: app.globalData._mylongitude,//经度
    // _mylatitude: app.globalData._mylatitude,//纬度
    // _myopenid: app.globalData.userOpenid,//ID

    _mylongitude: 120.27196,//经度
    _mylatitude: 31.477967,//纬度
  //  _myopenid: "",//ID

    // markersWorld: [],
    // markersCntWorld:[],

    // markersMe: [],
    // markersCntMe: [],

    markers: [],
    markersCnt:[],
    ismap:true,//用于刷新map

    _Page_display: 'none',
    _Place: "",
    _Time: "",
    _Text: "",
    _State: -1,
    _StateImg: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获得myID号
    //初始状态默认是刷新world记录
    // this.setData({
    //   _myopenid: app.globalData.userOpenid
    // })
    console.log(app.globalData.userOpenid)
    this.getMessageWorld()

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.mapCtx = wx.createMapContext('MapWorld')
    this.mapCtx.moveToLocation()//moveToLocation要晚于getCenterLocation
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

//world
  getMessageWorld:function(){
    var that = this
    //云开发初始化
    wx.cloud.init({
      traceUser: true,
      env: 'test-mycloud-88cd2e',
    })
    //云函数
    wx.cloud.callFunction({
      // 云函数名称
      name: "getworld",
      //传给云函数的参数
      data: {
        myopenid: app.globalData.userOpenid,//传递参数 本人id
      },
    }).then(res => {
      //成功运行云函数 返回数据给markersWorld
      console.log(res.result.data)

      var newmarkers;//排序完的前20的数组
      newmarkers = that.updatedist(res.result.data, app.globalData._mylatitude, app.globalData._mylongitude)
      console.log("newmarkers:", newmarkers)

      var e1=[];//提取需要的内容 赋给新的数组
      var e2 = [];//提取需要的内容 赋给新的数组
      for (var i = 0; i < newmarkers.length; i++) {
        var one = {
          iconPath: "../../images/marker_me_org.png",
          id: i,
          longitude: newmarkers[i].location.coordinates[0],
          latitude: newmarkers[i].location.coordinates[1],
          width: 20,
          height: 20
        }
        var two = {
          time : newmarkers[i].time,
          place : newmarkers[i].place,
          text : newmarkers[i].text,
          state : newmarkers[i].state
        }
        e1.push(one)
        e2.push(two)
      }
      that.setData({
        markers: e1,
        markersCnt: e2
      })
      console.log("markers", that.data.markers)
      console.log("markersCnt:", that.data.markersCnt)

    }).catch(err => {
      console.log(err)
    })


    // //利用 ifelse 强制刷新 map
    // this.setData({
    //   markers: this.data.markersWorld,
    //   markersCnt: this.data.markersCntWorld,
    //   ismap: false
    // });
    // this.setData({
    //   ismap: true
    // });
    // ///////
    // console.log("markers:", this.data.markers)
    // console.log("markers:", this.data.markersCnt)
  },

//Me
  getMessageMe:function(){
    var that = this
    //云开发初始化
    wx.cloud.init({
      traceUser: true,
      env: 'test-mycloud-88cd2e',
    })

    //云函数
    wx.cloud.callFunction({
      // 云函数名称
      name: "getme",
      //传给云函数的参数
      data: {
        myopenid: app.globalData.userOpenid,//传递参数 本人id
      },
    }).then(res => {
      //成功运行云函数
      // console.log(res.result.data)
      var e1 = [];//提取需要的内容 赋给新的数组
      var e2 = [];//提取需要的内容 赋给新的数组
      for (var i = 0; i < res.result.data.length; i++) {
        var one = {
          iconPath: "../../images/marker_me_pink.png",
          id: i,
          longitude: res.result.data[i].location.coordinates[0],
          latitude: res.result.data[i].location.coordinates[1],
          width: 20,
          height: 20
        }
        var two = {
          time: res.result.data[i].time,
          place: res.result.data[i].place,
          text: res.result.data[i].text,
          state: res.result.data[i].state
        }
        e1.push(one)
        e2.push(two)
      }
      that.setData({
        markers: e1,
        markersCnt: e2
      })
      console.log("markers:", that.data.markers)
      console.log("markersCnt:", that.data.markersCnt)   
    }).catch(err => {
      console.log(err)
    })
  },


  //markers点击事件
  markertap: function (e) {
    var that = this;
    console.log("点击marker的ID：", e.markerId)
    that.setData({
      _Page_display: 'inline-block',
      _Place: this.data.markersCnt[e.markerId].place,
      _Time: this.data.markersCnt[e.markerId].time,
      _Text: this.data.markersCnt[e.markerId].text,
    })
    if (this.data.markersCnt[e.markerId].state == 0) {
      that.setData({
        _State: 0,
        _StateImg: "../../images/img_face_0_click.png"
      })
    }
    else {
      that.setData({
        _State: 1,
        _StateImg: "../../images/img_face_1_click.png"
      })
    }
    // console.log(this.data._MeText)
  },

//关闭message
  closeMessage:function(){
    var that = this;
    //清空
    that.setData({
      _Page_display: 'none',
      _Place: "",
      _Time: "",
      _Text: "",
      _State: -1,
      _StateImg: "",
    })

  },

  //app.globalData._mylatitude, app.globalData._mylongitude
  updatedist: function (e, mylatitude, mylongitude) {
    var that = this
//    console.log("cc", e.length)
    //计算距离 并放入集合中
    for (var i = 0; i < e.length; i++) {
      var lat = e[i].location.coordinates[1];
      var lon = e[i].location.coordinates[0];
//      console.log("aaa", lat)
      var dist = that.getDistance(lat, lon, mylatitude, mylongitude)
      e[i].dist = dist
    }
    this.getSort(e) //对e排序 并赋给_lastmark

    return e
  },

  //计算两点位置距离
  getDistance: function (lat1, lng1, lat2, lng2) {
    lat1 = lat1 || 0;
    lng1 = lng1 || 0;
    lat2 = lat2 || 0;
    lng2 = lng2 || 0;
    var rad1 = lat1 * Math.PI / 180.0;
    var rad2 = lat2 * Math.PI / 180.0;
    var a = rad1 - rad2;
    var b = lng1 * Math.PI / 180.0 - lng2 * Math.PI / 180.0;
    var r = 6378137;  //地球半径
    var distance = r * 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(rad1) * Math.cos(rad2) * Math.pow(Math.sin(b / 2), 2)));
    /*
    if (distance > 1000){
      distance = Math.round(distance / 1000);
    }*/
    return distance;
  },

  getSort: function (e) {
    //property 根据什么排序
    var property = 'dist';
    var that = this;
    var mm = e;
    var sortRule = true; // 正序倒序
    var lastmark = mm.sort(that.getCompare(property, sortRule))
    e = lastmark.splice(20, 30)//砍掉距离过远的点

    return e
  },

  getCompare: function (property, bol) {
    return function (a, b) {
      var value1 = a[property];
      var value2 = b[property];
      if (bol) {
        return value1 - value2;
      } else {
        return value2 - value1;
      }
    }
  },


})