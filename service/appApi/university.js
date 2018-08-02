const Router = require('koa-router');
let router = new Router();
const  universityInfo = require('../database/schema/university');

router.post('/universityInfo',async(ctx)=>{
    
    console.log(ctx.request.body);
});

module.exports = router;