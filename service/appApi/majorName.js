const Router = require('koa-router');
let router = new Router();
const  majorName = require('../database/schema/majorName');

router.get('/majorName',async(ctx)=>{
    
    ctx.body = 'majorName';
});

module.exports = router;