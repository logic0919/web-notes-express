// 模块化路由。为了方便对路由进行模块化的管理，Express 不建议将路由直接挂载到 app 上，而是推荐将路由抽离为单独的模块。
// 导入express
const express = require('express')
const app = express()
// 导入路由模块
const router = require('./3.router')
// app.use()函数的作用，就是来注册全局中间件
app.use(router) 
// 以下为为路由模块添加统一的前缀
// app.use('/api',router)
// 启动服务器
app.listen(90, () => console.log('express server running'))
