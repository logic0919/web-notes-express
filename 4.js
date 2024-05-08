// 中间件
// Express 的中间件，本质上就是一个 function 处理函数
// 中间件函数的形参列表中，必须包含 next 参数，而路由处理函数中只包含 req 和 res
const express = require('express')
const app = express()

//1 全局中间件
// 定义一个中间件函数
const mw1 = (req, res, next) => {
    console.log('第一个中间件函数，全局的')
    next()
}
const mw2 = (req, res, next) => {
    console.log('第二个中间件函数，全局的')
    next()
}


// 客户端发起的任何请求，到达服务器之后，都会触发的中间件，叫做全局生效的中间件。
// 将mw注册为全局生效的中间件
// 可以使用 app.use() 连续定义多个全局中间件。客户端请求到达服务器之后，会按照中间件定义的先后顺序依次进行调用
app.use(mw1)
app.use(mw2)
// 简化形式：
// app.use((req, res, next) => {
//     console.log('第一个中间件函数')
//     next()
// })

// 多个中间件之间，共享同一份 req 和 res。基于这样的特性，我们可以在上游的中间件中，统一为 req 或 res 对象添加自定义的属性或方法，供下游的中间件或路由进行便用。


// 2 局部生效的中间件
const mw3 = (req, res, next) => {
    console.log('第三个中间件函数，局部的')
    next()
}
const mw4 = (req, res, next) => {
    console.log('第四个中间件函数，局部的')
    next()
}
app.get('/get', [mw3,mw4] ,(req, res) => {
    res.send('getok')
})
app.post('/post', (req, res) => {
    res.send('postok')
})



// 3 使用中间件的5个注意事项
// 一定要在路由之前注册中间件（除了错误级别的中间件）
// 客户端发送过来的请求，可以连续调用多个中间件进行处理
// 执行完中间件的业务代码之后，不要忘记调用 next() 函数
// 为了防止代码逻辑混乱，调用 next() 函数后不要再写额外的代码
// 连续调用多个中间件时，多个中间件之间，共享 req 和 res 对象



// 4 中间件的分类
// 应用级别的中间件：绑定到 app 实例上,eg:app.use() app.get() app.post()
// 路由级别的中间件：绑定到 router 实例上
// 错误级别的中间件：专门用来捕获整个项目中发生的异常错误，从而防止项目异常崩溃的问题。
// Express内置的中间件
// 第三方的中间件：非 Express 官方内置的，而是由第三方开发出来的中间件，叫做第三方中间件。在项目中，大家可以按需下载并配置第三方中间件，从而提高项目的开发效率。



// 5 Express内置的3个中间件
// express.static 快速托管静态资源的内置中间件，例如: HTML 文件、图片、CSS 样式等(无兼容性)
// express.json 解析JSON 格式的请求体数据(有兼容性，仅在 4.16.0 + 版本中可用)
// app.use(express.json())
// express.urlencoded 解析 URL-encoded 格式的请求体数据(有兼容性，仅在 4.16.0 + 版本中可用)
// app.use(express.urlencoded({extended:false}))

// 通过 express.json() 这个中间件，解析表单中的 JSON 格式的数据，并挂载到req中，即req.body属性
// 在服务器，可以使用 req.body 这个属性，来接收客户端发送过来的请求体数据
// 默认情况下，如果不配置解析表单数据的中间件，则 req.body 默认等于 undefined
app.use(express.json())
app.post('/json', (req, res) => {
    console.log(req.body)
    res.send('ok')
})

app.use(express.urlencoded({ extended: false }))
app.post('/encoded', (req, res) => {
    console.log(req.body)
    res.send('ok')
})




// 5 错误级别的中间件
// 注意: 错误级别的中间件必须注册在所有路由之后！
app.get('/error', (req, res) => {
    throw new Error('服务器内部发生错误')
    res.send('error')
})
app.use((err, req, res, next) => {
    console.log('发生错误：' + err.message)
    res.send('Error!'+err.message)
})



app.listen(3030, () => console.log('express server running'))