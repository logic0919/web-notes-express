// 1 基本使用
// 安装npm i express@4.17.1
// 导入express
const express = require('express')
// 创建web服务器
const app = express()
// 监听客户端的 GET 和 POST 请求，并向客户端响应具体的内容
// 在express中使用路由最简单的方式就是把路由挂载到app服务器实例上，如下
app.get('/user', (req, res) => {
    // 调用 express 提供的 res.send() 方法，向客户端响应一个 JSON 对象
    res.send({ name: 'zs', age: 20, gender: '男' })
})
app.get('/', (req, res) => {
    //req.query本质为对象，默认是一个空对象，如果有查询参数的话存的是查询参数
    res.send(req.query)
    console.log(req.query)
})
app.post('/user', (req, res) => {
    // 调用 express 提供的 res.send() 方法，向客户端响应一个 文本字符串
    // res.send('请求成功')
    res.send(req.query)
})
// 注意，这里的id是一个动态的参数
app.get('/paramsTest/:id/:name', (req, res) => {
    // req.params 是动态匹配到的 URL 参数，默认也是一个空对象
    res.send(req.params)
})
// 启动服务器
app.listen(80, () => console.log('express server running'))




// 2 托管静态资源
// 访问静态资源文件时，express.static() 函数会根据目录的添加顺序查找所需的文件
// (1)不挂载前缀路径
app.use(express.static('./htmls'))
app.use(express.static('./text'))
// (2)挂载前缀路径
app.use('/abc', express.static('imgs'))
