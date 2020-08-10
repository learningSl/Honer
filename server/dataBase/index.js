module.exports = app = () => {
    const mongoose = require('mongoose')
    mongoose.connect('mongodb://localhost:27017/node-vue-honer', {
        useNewUrlParser:true
    })
    require('require-all')(__dirname + '/../models')//引用文件夹里的所有模块
}