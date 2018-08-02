const Router = require('koa-router');
let router = new Router();
const  majorsInfo = require('../database/schema/majors');

router.get('/majorsInfo',async(ctx)=>{
    
    ctx.body = 'majorsInfo';
});

module.exports = router;