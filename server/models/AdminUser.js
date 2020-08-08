const mongoose = require('mongoose')  //存放mongoose模型

const schema = new mongoose.Schema({
    username:{
        type:String
    },
    password:{
        type: String,
        select: false,   //使当前字段不被查出来
        set(value){        //对password进行自定义存储
            return require('bcrypt').hashSync(value, 10)//对密码进行加密10为加密指数  不可逆的
        }
    }
})
module.exports = mongoose.model('AdminUser', schema)