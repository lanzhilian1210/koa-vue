const Koa = require('koa');
const app = new Koa();
const mongoose = require('mongoose');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const cors = require('koa2-cors');
const path = require('path');
const session = require('koa-session');
const multer = require('koa-multer');
const static = require('koa-static'); 
// 引入user模块schema
let user = require('./appApi/user.js');
// 引入list模块schema
let list = require('./appApi/list.js');
// 引入上传
let upload = require('./appApi/upload');
// 引入fs读取文件
let getJson = require('./appApi/getJson');
// 引入学校名称表
let universityInfo = require('./appApi/university');
// 引入院系表
let majorsInfo = require('./appApi/majors');
// 引入专业表
let majorNameInfo = require('./appApi/majorName');
// 引入班级表
let classInfo = require('./appApi/class');
//引入connect mongo数据库
const {connect,initSchemas} = require('./database/init.js');
app.keys = ['some secret hurr'];
const CONFIG = {
    key: 'koa:sess', /** (string) cookie key (default is koa:sess) */
    maxAge: 3000,
    overwrite: true, /** (boolean) can overwrite or not (default true) */
    httpOnly: false, /** (boolean) httpOnly or not (default true) */
    signed: true, /** (boolean) signed or not (default true) */
    rolling: false, /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */
    renew: false, /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/
};
app.use(session(CONFIG, app));
app.use(bodyParser());
app.use(cors());
const staticPath = './public/uploads/2018712';
app.use(static(__dirname , staticPath));
  // app.use( async ( ctx ) => {
  //   ctx.body = 'hello world'
  // })
// 装载所有子路由
let router = new Router();
// router.use()使用该接口,第一个参数路由，第二个参数导出user接口的routes();
router.use('/api/v1',user.routes());
router.use('/api/v1',list.routes());
router.use('/api/v1',upload.routes());
router.use('/api/v1',getJson.routes());
router.use('/api/v1',universityInfo.routes());
router.use('/api/v1',majorsInfo.routes());
router.use('/api/v1',majorNameInfo.routes());
router.use('/api/v1',classInfo.routes());
//加载路由中间件
app.use(router.routes());  //加载接口
app.use(router.allowedMethods());

//立即执行函数
(async ()=>{
    await connect();
    initSchemas();
})();


app.listen(3000,()=>{
    console.log('at port 3000')
});