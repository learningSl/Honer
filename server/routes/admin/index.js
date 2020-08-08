const express = require('express')
const jwt = require('jsonwebtoken')
const assert = require('http-assert')//用于简单抛出错误的库
const AdminUser = require('../../models/AdminUser')//引入模型

const router = express.Router({
    mergeParams: true   //合并url参数将app中的resource参数合并到router
})

// const Categoty = require('../../models/category')
router.post('/', async(req, res) => {
    const model = await req.model.create(req.body)//插入数据
    res.send(model)
})
router.get('/' , async(req, res) => {//populate('parent') 表示查出关联字段parent的完整信息(即关联的信息)
    let queryOptions = {}
    //console.log(req.model.modelName)
    if(req.model.modelName === 'Categoty'){
        //console.log(1)
        queryOptions.populate = 'parent'
    }
    const items = await req.model.find({}).setOptions(queryOptions).limit(10)//查找并限制数据条数
    //console.log(items)
    //console.log(items)
    res.send(items)
})
router.get('/:id', async(req, res) => {
    const item = await req.model.findById(req.params.id)
    res.send(item)
})
router.put('/:id', async(req, res) => { //修改
    const item = await req.model.findByIdAndUpdate(req.params.id, req.body)
    res.send(item)
})
router.delete('/:id', async(req, res) => { //修改
    await req.model.findByIdAndDelete(req.params.id)
    res.send({
        success:true
    })
})

module.exports = app = (app) => {
    const autoMiddleWare = require('../../middleWare/auto')
    app.use('/admin/api/rest/:resource', autoMiddleWare(app) , (req, res, next) => {
        const inflection = require('inflection')//classify转为类名的名称格式
        req.model = require(`../../models/${inflection.classify(req.params.resource)}`)   //给请求对象挂在一个model
        // req.secret = app.get('secret')
        next()
    }, router)
    // app.use(async (err, req, res, next) => {
    //     console.log(1)
    //     res.status(err.statusCode).send({
    //         message: err.message
    //     })
    // })
    const multer = require('multer')
    const upload = multer({
        dest: __dirname + '/../../uploads'   //上传得到的文件放到哪
    })
    //single 表示单个文件的上次 表示接受一个名为'file'字段的数据
    app.post('/admin/api/upload', autoMiddleWare(app) ,upload.single('file'), async(req, res) => {  //multer 专门处理上传文件
        const file = req.file//只有用了multer中间件req上才有file属性
        file.url = `http://localhost:3000/uploads/${file.filename}`
        res.send(file)
    })
    app.post('/admin/api/login', async (req, res) =>{
        const {username, password} = req.body
        //console.log(username)
        //找用户不能username和password同时作为条件，因为密码已将被加密了是一串乱码
        let user = await AdminUser.findOne({username: username}).select('+password')//强制加上password这个字段查找 -password表示排除password这个字段查找
        //console.log(user)
        if(!user){
            return res.status(422).send({
                msg: '用户不存在'
            })
        }
        let result = require('bcrypt').compareSync(password, user.password)//密码校验
        
        if(!result){
            return res.status(422).send({
                msg: '密码错误'
            })
        }
        //返回token
        const token = jwt.sign({
            id: user._id,
        }, app.get('secret'))
        res.send({token})
    })

}