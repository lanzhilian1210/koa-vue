const Router = require('koa-router');
let router = new Router();
const mongoose = require('mongoose');
const list = require("../database/schema/list");
// 查
router.get('/list',async(ctx)=>{
    // console.log(ctx.session.id,1);
    // let id = ctx.cookies.get('id');
    let id = ctx.session.id;
    let findList = await list.find({'memId': id});
    ctx.body = findList;
});
//增加
router.post('/addlist', async(ctx)=>{
    // console.log(ctx.session.id,2);
    let id = ctx.session.id;
    let newList = new list({
        title:ctx.request.body.title,
        text:ctx.request.body.text,
        memId:id
    });
    // let id = ctx.cookies.get('id');
    
    let smallList = await newList.save();
    if(smallList == 'undefined') {
        return ;
    };
    if(smallList) { 
        // 修改
        ctx.body = {
            code: 200,
            message: '保存成功'
        }   
    };
});
// 删除
router.post('/delList',async(ctx)=>{
    let id = ctx.request.body.id;
    await list.remove({'_id':id}).then(()=>{
        ctx.body = '删除成功';
    });
})


module.exports = router;
