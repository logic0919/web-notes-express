// 自定义中间件


// 自己手动横拟一个类似于 express.urlencoded 这样的中间件，来解析 POST 提交到服务器的表单数据
// 实现步骤:
// 定义中间件
// 监听 req 的 data 事件
// 监听 req 的 end 事件
// 使用node的querystring 模块解析请求体数据
// 将解析出来的数据对象挂载为 req.body
// 将自定义中间件封装为模块
const express = require('express')
const qs = require('querystring')
// 导入自己封装的中间件
const myUrlencoded = require('./6.myUrlencoded')
const app = express()
app.use(myUrlencoded)
app.post('/myUrlencoded', (req, res) => {
    res.send(req.body)
})
app.listen(90, () => console.log('express server running'))