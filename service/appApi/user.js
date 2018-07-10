const Router = require('koa-router');
let router = new Router();
const mongoose = require('mongoose');
const user = require("../database/schema/user")
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
    if(password == findUser.password) {
        // ctx.cookies.set('id', findUser._id,{maxAge: 2*60*60*1000})
        ctx.session.id = findUser._id;
        ctx.body = {
            code:200,
            message:'可以登入'
        }
    } else {
        ctx.body = {
            code:500,
            message:'密码错误'
        }
    }
})


module.exports = router;
