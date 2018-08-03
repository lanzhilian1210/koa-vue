const Router = require('koa-router');
let router = new Router();
const  majorsInfo = require('../database/schema/majors');
const  universityInfo = require('../database/schema/university');
router.post('/majorsInfo',async(ctx)=>{
    let newInfo = new majorsInfo(ctx.request.body);
    await newInfo.save().then((req)=>{
        //把当前数据的_id保存到universityInfo的departments中.
        universityInfo.update({_id:"5b62bcbb097fab29c480151c"},{$push: {departments:req._id}},(err)=>{
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
    }).catch(()=>{
        ctx.body = {
            code: 500,
            message: '保存未成功'
        }
    });


});

module.exports = router;