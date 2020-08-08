const mongoose = require('mongoose')

const schame = new mongoose.Schema({
    name:{
        type: String
    },
    avatar: {   //头像存储filename
        type: String
    },
    title:{
        type: String
    },
    categories:[  //关联多个分类
        {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'Categoty'
        }
    ],
    scores:{  //评分
        difficult:{type:Number},
        skills:{type:Number},
        attack:{type:Number},
        survive:{type:Number}
    },
    skills:[  //技能
        {
            icon: {type: String},
            name: {type: String},
            description: {type: String},
            tips: {type: String}            
        }
    ],
    items1:[  //顺风出装
        {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'Item'
        }
    ],
    items2:[  //逆风出装
        {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'Item'
        }
    ],
    usageTips:{  //使用技巧
        type: String
    },
    battleTips:{  //对抗技巧
        type: String
    },
    teamTips:{  //团战技巧
        type: String
    },
    partners:[{   //最佳搭档
        hero:{
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'Hero'
        },
        description: {
            type: String
        }
    }]
})

module.exports = mongoose.model('Hero', schame)