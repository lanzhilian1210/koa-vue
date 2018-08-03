const Router = require('koa-router');
let router = new Router();
const  className = require('../database/schema/class');
const  majorName = require('../database/schema/majorName');
router.post('/className',async(ctx)=>{
    let classInfo = new className(ctx.request.body);
    await classInfo.save().then((res)=>{
        majorName.update({_id:'5b62c5f4da6ff616b49ec098'},{$push:{departments:res._id}},(err)=>{
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