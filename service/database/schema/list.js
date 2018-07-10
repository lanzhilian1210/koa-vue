// list 列表
const mongoose = require('mongoose');
const Schema = mongoose.Schema;    //声明schema
let ObjectId = Schema.Types.ObjectId //声明object类型

//创建Schema模型
const listSchema = ({
    title: String,
    text: String,
    memId: {type:String,require:true},
    createAt:{type:Date,default:Date.now()},
    lastLoginAt:{type:Date,default:Date.now()},
});

//发布模型
const model = mongoose.model('List',listSchema);
module.exports = model;
