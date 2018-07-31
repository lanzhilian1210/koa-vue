const Router = require('koa-router');
let router = new Router();
const mongoose = require('mongoose');
const user = require("../database/schema/user");
const session = require('koa-session');


//注册
router.post('/reg',async(ctx)=>{
    let newUser = new user(ctx.request.body);
    let userName = ctx.request.body.username;
    let findUser = await user.findOne({username:userName});
    if(findUser && findUser != null) {
        ctx.body = {
            code: 500,
            message: '已注册'
        }
        return ;
    };
    await newUser.save().then(()=>{
        ctx.body = {
            code: 200,
            message: '注册成功'
        }
    }).catch(err=>{
        ctx.body = {
            code: 500,
            message: err
        }
    })
});

//登入
router.post('/login',async(ctx)=>{
    let loginUser = ctx.request.body;
    let userName = loginUser.username;
    let password = loginUser.password;
    let findUser = await user.findOne({username:userName}).exec();
    if(findUser == null) {
        ctx.body = {
            code:500,
            message:'账户不存在'
        };
        return ;
    };
    let newUser = new user();
    await newUser.comparePassword(password,findUser.password).then(isMatch=>{
        // ctx.session.username = "张三";
        // console.log(ctx.session.username);
        ctx.body = {code:200,message:isMatch,objId:findUser._id};
    }).catch(err=>{
        ctx.body = {code:500,message:err};
    })
})
// 状态值
router.post('/state',async(ctx) => {
    let id = ctx.request.body.id;
    let findUser = await user.findById(id);
    ctx.body = findUser.state;
})
// 修改状态
router.post('/newstate',async(ctx) => {
    let id = ctx.request.body.id;
     await user.findByIdAndUpdate(id,{ $set: { state: true }},(err,docs)=>{
        if(err){
            console.log(err)
        }else{
            console.log('修改成功')
        }
    });
    let findUser = await user.findById(id);
    ctx.body = findUser.state;
})

module.exports = router;
