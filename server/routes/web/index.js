module.exports = app => {
    const router = require('express').Router()
    const mongoose = require('mongoose')
    const Article = mongoose.model('Article')
    const Categoty = mongoose.model('Categoty')
    router.get('/news/init', async (req, res) => {
        const parents = await Categoty.findOne({
            name: '新闻分类'
        })
        const Cats = await Categoty.find().where({
            parent: parents 
        }).lean()//lean() 表示取json数据
        const newsTitle = ["三分之地，阵营对决赢手机周边，快来参与！", "曲韵芳华丨经典咏流传 《数字化破局》新文创微纪录片首期全网上线", "王者破浪之战暑期狂欢，专属豪礼送上！", "2020QQ名人赛《王者荣耀》第二期开赛，蓝盈莹、曾可妮携手带来峡谷首秀", "腾讯微视王者嘉年华来袭，6位姐姐变身峡谷女英雄陪你开“浪”", "8月6日体验服停机更新公告", "8月6日全服不停机优化公告", "8月6日iOS用户启动游戏异常说明公告", "8月5日体验服违规处罚公告", "8月5日净化游戏环境声明及处罚公告", "夏日盛典开启，新英雄阿古朵登场！送皮肤、抽内测惊喜好礼享不停", "【三分探险】活动开启公告", "夏日有好礼，峡谷乐不停", "【微信用户专属】张飞新皮肤上线抽免单活动", "张飞-虎魄五虎上将限定皮肤即将上架，参与活动领好礼", "2020年王者荣耀世界冠军杯总决赛门票8月10日正式开售", "8月7日【比赛服】版本更新公告", "7月29日【比赛服】版本更新公告", "7月13日【比赛服】版本更新公告", "2020年王者荣耀世界冠军杯小组赛赛程出炉"]
        const newsList = newsTitle.map(title => {
            const randomCats = Cats.slice(0).sort((a, b) => {
                return Math.random() - 0.5
            })
            return {
                categories:randomCats.slice(0, 2),
                title: title
            }
        })
        await Article.deleteMany({})//先清空数据库
        await Article.insertMany(newsList)
        res.send(newsList)
    })
    router.get('/news/list', async (req, res) => {
        // const parent = await Categoty.findOne({
        //     name: '新闻分类'
        // }).populate({
        //     path: 'children',  //调出子分类
        //     populate: {
        //         path: 'newsList'
        //     }
        // }).lean()
        const parent = await Categoty.findOne({
            name: '新闻分类'
        })
        const cats = await Categoty.aggregate([ //聚合查询
            {$match: {parent: parent._id}},  //1 match 条件查询
            {$lookup: {          //2 lookup 外连接多表查询类似sql 中join
                from: 'articles',
                localField: '_id',
                foreignField: 'categories',  //关联articles中的categories字段名
                as: 'newsList'   //取别名
            }},
            {$addFields: {  //对字段进行修改,添加 
                newsList: {$slice: ['$newsList', 5]} //表示newsList字段只要5条记录
            }}
        ])
        const subCats = cats.map(item => {
            return item._id
        })
        cats.unshift({
            name: '热门',
            newsList: await Article.find().where({
                categories:{
                    $in: subCats
                }
            }).populate('categories').limit(5).lean()
        })
        cats.map(item => {
            item.newsList.map(i => {
                i.categoryName = item.name === '热门' ? i.categories[0].name : item.name
                return i
            })
            return item
        })
        res.send(cats)
    })

    app.use('/web/api', router)
}