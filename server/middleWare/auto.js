const jwt = require('jsonwebtoken')
const AdminUser = require('../models/AdminUser')//引入模型
module.exports = options => {
    console.log(123)
    return async (req, res, next) =>{ //                     .pop()表示提取数组中的最后一个元素
        const token = String(req.headers.authorization || '').split(' ').pop()//获取请求头中的token
        //登陆验证
        if(!token){
            return res.status(401).send({
                msg: '请先登录'
            })
        }
        const { id } = jwt.verify(token, options.get('secret'))
        if(!id){
            return res.status(401).send({
                msg: '请先登录'
            })
        }
        req.user = await AdminUser.findById(id) 
        if(!req.user){
            return res.status(401).send({
                msg: '请先登录'
            })
        }
        next()
    }
}