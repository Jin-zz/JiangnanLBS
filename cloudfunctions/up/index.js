// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  traceUser: true,
  env: 'test-mycloud-88cd2e',
})
const db = cloud.database()
// const _ = db.command
// const _mer = []
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  //start   limit(20).where({typecode: event.typecode})
  try {
    return await db.collection('Merchants').limit(100).where({ typecode: event.typecode }).get();

      // success(res) {
        // for (var i = 0; i < res.data.length; i++) {
        //   var one = {
        //     name: res.data[i].name,
        //     address: res.data[i].address,
        //     location_x: res.data[i].x,
        //     location_y: res.data[i].y,
        //     type: res.data[i].type,
        //     typecode: res.data[i].typecode,
        //     src: res.data[i].src,
        //     dist: 0,
        //   }
        //   _mer.push(one)
        //   console.log("one:", one)
        // }
      // }
    // })
  } catch (e) {
    console.error(e)
  }
  // return {
  //   _mer,
  //   // event,
  //   // openid: wxContext.OPENID,
  //   // appid: wxContext.APPID,
  //   // unionid: wxContext.UNIONID,
  // }
}