// list 列表
const mongoose = require('mongoose');
const Schema = mongoose.Schema;    //声明schema
let ObjectId = Schema.Types.ObjectId //声明object类型

//创建Schema模型
const  majorsSchema = ({
    majorsId:ObjectId,
    name:String,
    departments:[String]
});

//发布模型
const model = mongoose.model('majors', majorsSchema);
module.exports = model;
