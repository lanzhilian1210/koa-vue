const Router = require('koa-router');
let router = new Router();
const  majorName = require('../database/schema/majorName');
const  majorsInfo = require('../database/schema/majors');
router.post('/majorName',async(ctx)=>{  
    let maInfo = new majorName(ctx.request.body);
    await maInfo.save().then((res)=>{
        majorsInfo.update({_id:'5b63b8b403e2a22154e44f6c'},{$push:{departments:res._id}},(err)=>{
            if(err){
                console.log(err);
            } else {
                console.log('插入成功');
            }
        });
        ctx.body = {
            code: 200,
            message: '保存成功'
        }
    }).catch((err)=>{
        console.log(err);
        ctx.body = {
            code: 500,
            message: '保存未成功'
        }
    });
});

module.exports = router;