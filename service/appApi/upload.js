
const Router = require('koa-router');
let router = new Router();
const mongoose = require('mongoose');
const multer = require('koa-multer');
const send = require('koa-send');

const storage = multer.diskStorage({
    destination:'public/uploads/'+new Date().getFullYear() + (new Date().getMonth()+1) + new Date().getDate(),
    filename(ctx,file,cb){
      const filenameArr = file.originalname.split('.');
      cb(null,Date.now() + '.' + filenameArr[filenameArr.length-1]);
    }
  });
  // 上传
const upload = multer({storage});

router.post('/upload', upload.single('file'),(ctx)=> {
    console.log(ctx.req.file);
    ctx.req.file.filename = ctx.req.file.originalname;
    ctx.body = {
        fileName:ctx.req.file.filename
        };
    });

    //下载
router.get('/download',async(ctx)=>{
    ctx.set('Content-disposition','attachment;filename='+'name.txt'); // 设置你的文件名
    ctx.body = 'http://localhost:3000/public/uploads/2018712/1531363731849.png';
});



module.exports = router;