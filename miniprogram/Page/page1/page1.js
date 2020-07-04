var app = getApp();

// 在需要使用的js文件中，导入util js
var util = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: { 

    //  _db = wx.cloud.database(),
    // _marker = _db.collection('MapMarker'),
    _markerlist: [],
    _mark:[],
    _lastmark: [],

    //初始值为腾讯地址
    // mylongitude: 113.324520,//经度120.269048
    // mylatitude: 23.099994,//纬度31.47757
    mylongitude: 120.269048,//经度120.269048
    mylatitude: 31.47757,//纬度31.47757
    // mylongitude: 0,//经度
    // mylatitude: 0,//纬度

    markers: [
      {
      iconPath: "../../images/marker_yellow.png",
      id: 0,
      latitude: 0,
      longitude: 0,
      callout: {
        content: "",
        color: '#FFFFFF',
        bgColor: '#00000000',
        fontSize: 20,
        display: 'ALWAYS',
      },
      width: 30,
      height: 45
    },
      {
        iconPath: "../../images/marker_yellow.png",
        id: 1,
        latitude: 0,
        longitude: 0,
        callout: {
          content: "",
          color: '#FFFFFF',
          bgColor: '#00000000',
          fontSize: 20,
          display: 'ALWAYS',
        },
        width: 30,
        height: 45
      },
      {
        iconPath: "../../images/marker_yellow.png",
        id: 2,
        latitude: 0,
        longitude: 0,
        callout: {
          content: "",
          color: '#FFFFFF',
          bgColor: '#00000000',
          fontSize: 20,
          display: 'ALWAYS',
        },
        width: 30,
        height: 45
      },
      {
        iconPath: "../../images/marker_yellow.png",
        id: 3,
        latitude: 0,
        longitude: 0,
        callout: {
          content: "",
          color: '#FFFFFF',
          bgColor: '#00000000',
          fontSize: 20,
          display: 'ALWAYS',
        },
        width: 30,
        height: 45
      },
      {
        iconPath: "../../images/marker_yellow.png",
        id: 4,
        latitude: 0,
        longitude: 0,
        callout: {
          content: "",
          color: '#FFFFFF',
          bgColor: '#00000000',
          fontSize: 20,
          display: 'ALWAYS',
        },
        width: 30,
        height: 45
      },
      {
        iconPath: "../../images/marker_yellow.png",
        id: 5,
        latitude: 0,
        longitude: 0,
        callout: {
          content: "",
          color: '#FFFFFF',
          bgColor: '#00000000',
          fontSize: 20,
          display: 'ALWAYS',
        },
        width: 30,
        height: 45
      },
      {
        iconPath: "../../images/marker_yellow.png",
        id: 6,
        latitude: 0,
        longitude: 0,
        callout: {
          content: "",
          color: '#FFFFFF',
          bgColor: '#00000000',
          fontSize: 20,
          display: 'ALWAYS',
        },
        width: 30,
        height: 45
      },
      {
        iconPath: "../../images/marker_yellow.png",
        id: 7,
        latitude: 0,
        longitude: 0,
        callout: {
          content: "",
          color: '#FFFFFF',
          bgColor: '#00000000',
          fontSize: 20,
          display: 'ALWAYS',
        },
        width: 30,
        height: 45
      },
      {
        iconPath: "../../images/marker_yellow.png",
        id: 8,
        latitude: 0,
        longitude: 0,
        callout: {
          content: "",
          color: '#FFFFFF',
          bgColor: '#00000000',
          fontSize: 20,
          display: 'ALWAYS',
        },
        width: 30,
        height: 45
      },
      {
        iconPath: "../../images/marker_yellow.png",
        id: 9,
        latitude: 0,
        longitude: 0,
        callout: {
          content: "",
          color: '#FFFFFF',
          bgColor: '#00000000',
          fontSize: 20,
          display: 'ALWAYS',
        },
        width: 30,
        height: 45
      },
      {
        iconPath: "../../images/marker_yellow.png",
        id: 10,
        latitude: 0,
        longitude: 0,
        callout: {
          content: "",
          color: '#FFFFFF',
          bgColor: '#00000000',
          fontSize: 20,
          display: 'ALWAYS',
        },
        width: 30,
        height: 45
      },
      {
        iconPath: "../../images/marker_yellow.png",
        id: 11,
        latitude: 0,
        longitude: 0,
        callout: {
          content: "",
          color: '#FFFFFF',
          bgColor: '#00000000',
          fontSize: 20,
          display: 'ALWAYS',
        },
        width: 30,
        height: 45
      },
      {
        iconPath: "../../images/marker_yellow.png",
        id: 12,
        latitude: 0,
        longitude: 0,
        callout: {
          content: "",
          color: '#FFFFFF',
          bgColor: '#00000000',
          fontSize: 20,
          display: 'ALWAYS',
        },
        width: 30,
        height: 45
      },
      {
        iconPath: "../../images/marker_yellow.png",
        id: 13,
        latitude: 0,
        longitude: 0,
        callout: {
          content: "",
          color: '#FFFFFF',
          bgColor: '#00000000',
          fontSize: 20,
          display: 'ALWAYS',
        },
        width: 30,
        height: 45
      },
      {
        iconPath: "../../images/marker_yellow.png",
        id: 14,
        latitude: 0,
        longitude: 0,
        callout: {
          content: "",
          color: '#FFFFFF',
          bgColor: '#00000000',
          fontSize: 20,
          display: 'ALWAYS',
        },
        width: 30,
        height: 45
      }
    ],

    _CLPlace: "",
    _CLTime: 0,
    _CLText: "",//签到内容 page1_1
    _CLState: -1,//签到心情 page1_1 //0是快乐 1是不快乐
    _CLPageStateImg: "../../images/img_CL_null.png",//赋一个空白的值
    _CLPage_display: 'none',//显示和隐藏coverview签到页面
    _CLPageImg_display: 'inline-block',
    


//签到信息集合
    massage: [
      {
        mas_time:0,
        mas_place:"",
        mas_text:"",
        mas_state:-1,
        mas_lon:0,
        mas_lat: 0
      }
    ]

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.onGetOpenid();// 获取用户openid 
    var that = this;
    //云开发初始化
    wx.cloud.init({
      traceUser: true,
      env: 'test-mycloud-88cd2e',
    })
    //云函数
    wx.cloud.callFunction({
      // 云函数名称
      name: "mark",
      // //传给云函数的参数
      // data: {
      //   typecode: this.data.typecode,
      // },
    }).then(res => {
      //成功运行云函数 返回值
      console.log(res)
      that.setData({
        _mark: res.result.data
      })
      console.log("_mark:", this.data._mark)

    }).catch(err => {
      console.log(err)
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    //var that = this
    this.mapCtx = wx.createMapContext('myMap')
    this.mapCtx.moveToLocation()//moveToLocation要晚于getCenterLocation

    // this.mapCtx.getCenterLocation({
    //   success: function (res) {
    //     //这里获取不到更新后的位置 只有初始位置 0 0
    //     console.log(res.latitude)
    //     console.log(res.latitude)
    //   }
    // })
    // console.log(this.data.mylatitude)
  },

  /**
   * 生命周期函数--监听页面显示 页面从onhide返回时会调用
   */
  onShow: function () {
    if (this.data._CLText != "" && this.data._CLState != -1){
      this.setData({
        _CLPageImg_display: 'none'
      })
    }

    if (this.data._CLState != -1) {
      if (this.data._CLState == 0){
        this.setData({
          _CLPageStateImg: "../../images/img_face_0_click.png"
        })

      }
      if (this.data._CLState == 1) {
        this.setData({
          _CLPageStateImg: "../../images/img_face_1_click.png"
        })
      }
    }
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

  //更新实时位置
  updateLocation: function () {
    this.mapCtx.moveToLocation()  
    var that = this;
    this.mapCtx.getCenterLocation({
      success: function (res) {
        that.setData({
          mylatitude: res.latitude,
          mylongitude: res.longitude,
        })
        console.log("当前经度",that.data.mylongitude)
        console.log("当前纬度",that.data.mylatitude)
        app.globalData._mylongitude = that.data.mylongitude
        app.globalData._mylatitude = that.data.mylatitude
        var newmarkers;
        newmarkers = that.updatedist(that.data._mark, res.latitude, res.longitude)
        console.log("new:", newmarkers)
        that.getmarkers(newmarkers)
       }
    })


  },

  //markers点击事件
  markertap: function (e) {
    var that = this;
    console.log("点击marker的ID：",e.markerId)
    that.setData({
      _CLPage_display: 'inline-block'
    })

    // 调用函数时，传入new Date()参数，返回值是日期和时间
    var time = util.formatTime(new Date());
    // 再通过setData更改Page()里面的data，动态更新页面的数据
    this.setData({
      _CLTime: time,
      _CLPlace: this.data.markers[e.markerId].callout.content
    });
    console.log("_CLPlace：", this.data._CLPlace)
  },


//CLPageImg 事件内容 点击事件
  CLPageImg_1: function () {
    //清理进入page1_1的数据
    this.setData({
      _CLText: "",
      _CLState: -1,
    })


    //页面跳转到page1_1
    wx.navigateTo({
      url: '../page1_1/page1_1',
    })
  },

  CLPageBtnConfirm:function(){
    //储存签到信息到数组中
    this.setData({
      ['massage.mas_time']: this.data._CLTime,
      ['massage.mas_place']: this.data._CLPlace,
      ['massage.mas_text']: this.data._CLText,
      ['massage.mas_state']: this.data._CLState,
      ['massage.mas_lon']: this.data.mylongitude,
      ['massage.mas_lat']: this.data.mylatitude,
    });
    console.log(this.data.massage)

    //此处开始清理数据 回到初始状态
    this.setData({
      _CLPage_display: 'none',//隐藏coverview
      _CLPlace: "",
      _CLTime: 0,
      _CLText: "",
      _CLState: -1,
      _CLPageImg_display: 'inline-block',
      _CLPageStateImg: "../../images/img_CL_null.png"
    })

//写入数据库
    const _db = wx.cloud.database()
    _db.collection('CLMessage').add({
      // data 字段表示需新增的 JSON 数据
      data: {
        // _id: 'todo-identifiant-aleatoire', // 可选自定义 _id，在此处场景下用数据库自动分配的就可以了
        time: this.data.massage.mas_time,
        place: this.data.massage.mas_place,
        text: this.data.massage.mas_text,
        state: this.data.massage.mas_state,
        location: new _db.Geo.Point(this.data.massage.mas_lon, this.data.massage.mas_lat),
      },
      // success(res) {
      //   // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
      //   console.log(res)
      // }
    })
  },

  // 获取用户openid 
  onGetOpenid: function () {
    // 调用云函数
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)
        app.globalData.userOpenid = res.result.openid
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
      }
    })
  },
  
  getmarkers:function(e){
    var list = this.data.markers
    for(var i=0;i<15;i++){
      list[i].callout.content = e[i]._place
      list[i].longitude = e[i].x
      list[i].latitude = e[i].y
    }
    this.setData({
      markers: list
    })
    console.log("markers:",this.data.markers)

  },



//app.globalData._mylatitude, app.globalData._mylongitude
  updatedist: function (e, mylatitude, mylongitude){
    //计算距离 并放入集合中
   // var e = this.data._mark
    for (var i = 0; i < e.length; i++) {
      var dist = this.getDistance(e[i].y, e[i].x, mylatitude, mylongitude)
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
    e = lastmark.splice(15, 35)

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