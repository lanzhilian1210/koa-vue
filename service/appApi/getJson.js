const Router = require('koa-router');
let router = new Router();
const fs = require('fs');
router.get('/file',async(ctx)=>{
    // ctx.body = '123';
    fs.readFile('./data_json/list.json','utf8',(err,data)=>{
        console.log(data,222);
        // data = JSON.parse(data);
    })
    ctx.body = '123';
});
module.exports = router;