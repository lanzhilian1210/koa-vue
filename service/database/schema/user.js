// user登入注册数据模型
const monogoose = require('mongoose');
const Schema = monogoose.Schema;    //声明schema
let ObjectId = Schema.Types.ObjectId //声明object类型

//创建用户Schema模型
const UserSchema = new Schema({
    UserId:ObjectId,
    username:{type:String,unique:true,required:true},
    password:String,
    state: {type:String,default:true},
    createAt:{type:Date,default:Date.now()},
    lastLoginAt:{type:Date,default:Date.now()}
});

//发布模型
const model = monogoose.model('User',UserSchema);

module.exports = model;