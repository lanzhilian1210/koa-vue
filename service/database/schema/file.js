// list 列表
const mongoose = require('mongoose');
const Schema = mongoose.Schema;    //声明schema
let ObjectId = Schema.Types.ObjectId //声明object类型

//创建Schema模型
const fileSchema = ({
    GOOD_TYPE:Number,
    STATE:Number,
    IS_DELETE:Number,
    NAME:String,
    GOOD_SCENT:String,
    CREATE_TIME:Number
});

//发布模型
const model = mongoose.model('file',fileSchema);
module.exports = model;
