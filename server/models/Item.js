const mongoose = require('mongoose')

const schame = new mongoose.Schema({
    name:{
        type: String
    },
    icon: {
        type: String
    }
})

module.exports = mongoose.model('Item', schame)