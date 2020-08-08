const express = require('express')
const cors = require('cors')

const app = express()
app.set('secret', 'dsrbdfrc')//表示在express实例上设置一个变量 token密钥
app.use(cors())
app.use(express.json())
app.use('/uploads', express.static(__dirname + '/uploads'))//静态文件
require('./dataBase/index')(app)

require('./routes/admin/index')(app)
app.listen(3000, () => {
    console.log('http://localhost:3000')
})