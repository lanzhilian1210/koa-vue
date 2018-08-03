const Router = require('koa-router');
let router = new Router();
const  universityInfo = require('../database/schema/university');

router.post('/universityInfo',async(ctx)=>{
    let newInfo = new universityInfo(ctx.request.body);
     let name = await universityInfo.find({name:ctx.request.body.name});
     if(name.length) {
            ctx.body = {
                message: '学校已存在',
                code:1
            };
            return ;
        };
        await newInfo.save().then(()=>{
            ctx.body = {
                code: 200,
                message: '保存成功'
            }
        }).catch(()=>{
            ctx.body = {
                code: 500,
                message: '保存未成功'
            }
        })
});

module.exports = router;