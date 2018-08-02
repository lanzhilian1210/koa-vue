const Router = require('koa-router');
let router = new Router();
const  className = require('../database/schema/class');

router.get('/className',async(ctx)=>{
    
    ctx.body = 'className';
});

module.exports = router;