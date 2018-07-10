const mongoose = require('mongoose');
const db = "mongodb://127.0.0.1:27017/blog";
const glob = require('glob');
const {resolve} = require('path');

//拿到所有的schema模型
exports.initSchemas = () =>{
    glob.sync(resolve(__dirname,'./schema/','**/*.js')).forEach(require);
}

exports.connect = () =>{
    //连接数据库
    mongoose.connect(db,function(err){
        if(err){
            console.log('连接失败');
        } else {
            console.log('连接成功');
        }
    });
    let maxConnectTimes = 0;
    return new Promise((resolve,reject)=>{

    
        //增加数据库连接的事件监听
        mongoose.connection.on('disconnected',()=>{
            //进行重连
            console.log('数据库断开');
            if(maxConnectTimes<=3) {
                maxConnectTimes ++;
                mongoose.connect(db);
            } else {
                reject();
                throw new Error('出现问题');
            }
            
        });

        //数据库出现错误时
        mongoose.connection.on('error',err=>{
            console.log(err);
            if(maxConnectTimes<=3) {
                maxConnectTimes ++;
                mongoose.connect(db);
            } else {
                reject();
                throw new Error('出现问题');
            }
        });

        //连接打开时

        mongoose.connection.once('open',()=>{
            console.log('success');
            resolve();
        });
    });
}