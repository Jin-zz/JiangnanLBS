const _db = wx.cloud.database()
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mer: [],  //云函数从数据库取到的数据
    lastmer: [],  //排序后的数据
    // ispage3:true,
    // merl:0,
    isupdate: false,
    isclassify1: false,
    issort: false,
    typecode:"",
    listlength: '',

    multiArray: [
      ['汽车服务', '餐饮服务', '购物服务','生活服务'],
      ['汽车服务相关', '加油站', '其它能源站', '加气站', '洗车场', '汽车俱乐部', '汽车配件销售', '汽车租赁', '二手车交易','充电站']
    ],
    multiIndex: [0, 0],

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getMessageMer()
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

  },

  getMessageMer: function() {
    var that = this
//获取数据
    // _db.collection('Merchants').where({
    //   typecode: this.data.typecode
    // }).get({
    //   success(res) {
    //     //console.log(res.data.length)
    //     that.data.mer.splice(0, that.data.mer.length) //清空
    //     for (var i = 0; i < res.data.length; i++) {
    //       var one = {
    //         name: res.data[i].name,
    //         address: res.data[i].address,
    //         location_x: res.data[i].x,
    //         location_y: res.data[i].y,
    //         type: res.data[i].type,
    //         typecode: res.data[i].typecode,
    //         src: res.data[i].src
    //       }
    //       that.data.mer.push(one)
    //     }
    //   }
    // })
    //云开发初始化
    wx.cloud.init({
      traceUser:true,
      env: 'test-mycloud-88cd2e',
    })
    //云函数
    wx.cloud.callFunction({
      // 云函数名称
      name: "up",
      //传给云函数的参数
      data: {
        typecode: this.data.typecode,
      },
    }).then(res=>{
      //成功运行云函数 返回值
      console.log(res)
      that.setData({
        mer: res.result.data
      })
    }).catch(err=>{
      console.log(err)
    })

    if(this.data.mer.length>30)
    {
      this.setData({
        listlength: 30
      })
    }
    else{
      this.setData({
        listlength: this.data.mer.length
      })
    }
    console.log(this.data.listlength)

    //计算距离 并放入集合中
    var e = this.data.mer
    for (var i = 0; i < e.length; i++) {
      var dist = this.getDistance(e[i].y, e[i].x, app.globalData._mylatitude, app.globalData._mylongitude)
      e[i].dist = dist
    }
    this.setData({
      mer:e
    })
    console.log("mer:", this.data.mer)
    this.getSort(this.data.mer)
    console.log("lastmer:", this.data.lastmer)
    if (this.data.issort) {
      this.setData({
        isupdate: true
      })
    }
  },


  // mersearch: function() {
  //   this.getMessageMer()
  //   if (this.data.issort) {
  //     this.setData({
  //       isupdate: true
  //     })
  //   }
  // },

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
    var _mer = that.data.mer;
    var sortRule = true; // 正序倒序
    var _lastmer = _mer.sort(that.getCompare(property, sortRule))

    that.setData({
      lastmer: _lastmer.splice(0, 30),
      issort:true,
    })

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


  bindMultiPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      multiIndex: e.detail.value
    })
    var typeindex = this.data.multiIndex
    var _typecode; 
    if (typeindex[0]==0){
      switch (typeindex[1]) {
        case 0: _typecode = '0100'; break;
        case 1: _typecode = '0101'; break;
        case 2: _typecode = '0102'; break;
        case 3: _typecode = '0103'; break;
        // case 4: _typecode = '0104'; break;
        case 4: _typecode = '0105'; break;
        case 5: _typecode = '0106'; break;
        // case 7: _typecode = '0107'; break;
        case 6: _typecode = '0108'; break;
        case 7: _typecode = '0109'; break;
        case 8: _typecode = '0110'; break;
        case 9: _typecode = '0111'; break;

      }
    }
    if (typeindex[0] == 1) {
      switch (typeindex[1]) {
        case 0: _typecode = '0500'; break;
        case 1: _typecode = '0501'; break;
        case 2: _typecode = '0502'; break;
        case 3: _typecode = '0503'; break;
        case 4: _typecode = '0504'; break;
        case 5: _typecode = '0505'; break;
        case 6: _typecode = '0506'; break;
        case 7: _typecode = '0507'; break;
        case 8: _typecode = '0508'; break;
        case 9: _typecode = '0509'; break;
      }
    }
    if (typeindex[0] == 2) {
      switch (typeindex[1]) {
        case 0: _typecode = '0600'; break;
        case 1: _typecode = '0601'; break;
        // case 2: _typecode = '0602'; break;
        case 2: _typecode = '0603'; break;
        case 3: _typecode = '0604'; break;
        case 4: _typecode = '0605'; break;
        case 5: _typecode = '0606'; break;
        case 6: _typecode = '0607'; break;
        case 7: _typecode = '0608'; break;
        case 8: _typecode = '0609'; break;
        case 9: _typecode = '0610'; break;
      }
    }
    if (typeindex[0] == 3) {
      switch (typeindex[1]) {
        case 0: _typecode = '0700'; break;
        case 1: _typecode = '0701'; break;
        case 2: _typecode = '0702'; break;
        case 3: _typecode = '0703'; break;
        case 4: _typecode = '0704'; break;
        case 5: _typecode = '0705'; break;
        case 6: _typecode = '0706'; break;
        case 7: _typecode = '0707'; break;
        case 8: _typecode = '0708'; break;
        case 9: _typecode = '0709'; break;
        case 10: _typecode = '0710'; break;
        case 11: _typecode = '0711'; break;
      }
    }

    this.setData({
      typecode: _typecode
    })
    console.log('typecode:', this.data.typecode)
    this.getMessageMer()


  },

  bindMultiPickerColumnChange: function(e) {
    console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };
    data.multiIndex[e.detail.column] = e.detail.value;

    this.setData({
      multiIndex: this.data.multiIndex
    })

    if (e.detail.column==0){
      switch (data.multiIndex[0]) {
        case 0:
          data.multiArray[1] = ['汽车服务相关', '加油站', '其它能源站', '加气站', '洗车场', '汽车俱乐部','汽车配件销售', '汽车租赁', '二手车交易', '充电站'];//12
          data.multiIndex[1] = 0;
          break;
        case 1:
          data.multiArray[1] = ['餐饮相关场所', '中餐厅', '外国餐厅', '快餐厅', '休闲餐饮场所', '咖啡厅', '茶艺馆', '冷饮店', '糕饼店', '甜品店'];//10
          data.multiIndex[1] = 0;
          break;
        case 2:
          data.multiArray[1] = ['购物相关场所','商场','家电电子卖场','超级市场','花鸟鱼虫市场','家居建材市场','综合市场','文化用品店','体育用品店','特色商业街'];//10
          data.multiIndex[1] = 0;
          break;
        case 3:
          data.multiArray[1] = ['生活服务场所', '旅行社', '信息咨询中心', '售票处', '邮局', '物流速递', '电讯营业厅', '事务所', '人才市场', '自来水营业厅', '电力营业厅', '美容美发店'];//12
          data.multiIndex[1] = 0;
          break;
      }
    }

    this.setData(data);
  },


})