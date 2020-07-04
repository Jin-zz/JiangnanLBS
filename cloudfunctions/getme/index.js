// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  traceUser: true,
  env: 'test-mycloud-88cd2e',
})
const db = cloud.database()
const _ = db.command
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  try {
    return await db.collection('CLMessage').limit(50).where({
      _openid=_.eq(event.myopenid)
      //_openid:'oH8oo4xzm1rG6dhnJgoaaHmma42c'
    })
    .get();
  } catch (e) {
    console.error(e)
  }
  return {
    event,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
}