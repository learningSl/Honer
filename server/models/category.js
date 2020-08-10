const mongoose = require('mongoose')  //存放mongoose模型

const schema = new mongoose.Schema({
    name:{
        type:String
    },
    parent:{  //关联字段
        type:mongoose.SchemaTypes.ObjectId,//类型表示是mongodb中的_id类型
        ref:'Categoty'   //指定关联的模型
    }
})

schema.virtual('children', {  //子分类
    localField: '_id',
    foreignField: 'parent',
    justOne: false,
    ref: 'Categoty'
})
schema.virtual('newsList', {
    localField: '_id',
    foreignField: 'categories',
    justOne: false,
    ref: 'Article'
})
module.exports = mongoose.model('Categoty', schema)