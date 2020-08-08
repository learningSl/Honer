const mongoose = require('mongoose')  //存放mongoose模型

const schema = new mongoose.Schema({
    title:{
        type:String
    },
    categories:[
        {  //关联字段
            type:mongoose.SchemaTypes.ObjectId,//类型表示是mongodb中的_id类型
            ref:'Categoty'   //指定关联的模型
        }
    ],
    body:{
        type: String
    }
})
module.exports = mongoose.model('Article', schema)