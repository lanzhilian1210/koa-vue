const Router = require('koa-router');
let router = new Router();
const fs = require('fs');
const file = require('../database/schema/file');
router.get('/insertfile',async(ctx)=>{
    fs.readFile('./data_json/list.json','utf8',(err,data)=>{
        let newData = JSON.parse(data);
        let newFile = new file(newData);
        newFile.save().then((res) => {
            console.log(res);
        }).catch((err) => {
            console.log(err);
        });
    });
    ctx.body = '开始导入数据';
});
module.exports = router;