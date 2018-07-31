// user登入注册数据模型
const monogoose = require('mongoose');
const Schema = monogoose.Schema;    //声明schema
let ObjectId = Schema.Types.ObjectId //声明object类型
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;
//创建用户Schema模型
const UserSchema = new Schema({
    UserId:ObjectId,
    username:{type:String,unique:true,required:true},
    password:String,
    state: {type:String,default:true},
    createAt:{type:Date,default:Date.now()},
    lastLoginAt:{type:Date,default:Date.now()}
});
// 加密
UserSchema.pre('save', function(next){
    bcrypt.genSalt(SALT_WORK_FACTOR,(err,salt)=>{
        if(err) return next(err)
        bcrypt.hash(this.password,salt,(err,hash)=>{
            if(err) return next(err)
            this.password = hash
            next()
        })
    })
});

UserSchema.methods={
    comparePassword:(_password,password)=>{
        return new Promise((resolve,reject)=>{
            bcrypt.compare(_password,password,(err,isMatch)=>{
                if(!err) resolve(isMatch)
                else reject(err)
            })
        })
    }
}
//发布模型
const model = monogoose.model('User',UserSchema);

module.exports = model;