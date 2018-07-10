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
//引入connect mongo数据库
const {connect,initSchemas} = require('./database/init.js');
app.keys = ['some secret hurr'];
const CONFIG = {
    key: 'koa:sess', /** (string) cookie key (default is koa:sess) */
    maxAge: 86400000,
    overwrite: true, /** (boolean) can overwrite or not (default true) */
    httpOnly: false, /** (boolean) httpOnly or not (default true) */
    signed: true, /** (boolean) signed or not (default true) */
    rolling: false, /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */
    renew: false, /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/
  };
app.use(session(CONFIG, app));
app.use(bodyParser());
app.use(cors());
const staticPath = './public';
app.use(static(
    path.join( __dirname,  staticPath)
  ));
app.use(static('D:\public', 'index'));
// 装载所有子路由
let router = new Router();
// router.use()使用该接口,第一个参数路由，第二个参数导出user接口的routes();
router.use('/api/v1',user.routes());
router.use('/api/v1',list.routes());
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