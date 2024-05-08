// 使用cors中间件
// 步骤：
// 安装，导入，配置
// CORS 主要在服务器端进行配置。客户端浏览器无须做任何额外的配置，即可请求开启了 CORS 的接口。
const cors = require('cors')
const express = require('express')


// 如果项目中已经配置了CORS 跨域资源共享，为了防止冲突，必须在配置CORS 中间件之前声明JSONP 的接口。否则JSONP 接口会被处理成开启了CORS 的接口。
// 优先创建 JSONP 接口[这个接口不会被处理成 CORS 接口]
app.get('/api/jsonp', (req, res) => {
    // TODO: 定义 JSONP 接口具体的实现过程
    // 1.得到函数的名称
    const funcName = req.query.callback
    // 2.定义要发送到客户端的数据对象
    const data = { name: 'zs', age: 22 }
    // 3.拼接出一个函数的调用
    const scriptStr = `${funcName}(${JSON.stringify(data)})`
    // 4.把拼接的字符串，响应给客户端
    res.send(scriptStr)
})

const app = express()
// 一定要在路由之前配置cors
app.use(cors())
app.get('/api/get', (req, res) => {

    // 1.关于域
    res.setHeader('Access-Control-Allow-Origin','*')//表示允许来自任何域的请求
    // res.setHeader('Access-Control-Allow-Origin', 'http://itcast.cn')//表示允许来自http://itcast.cn域的请求

    // 2.关于请求头
    // 默认情况下，CORS 仅支持客户端向服务器发送如下的9个请求头: 
    // Accept、Accept - Language Content - Language、 DPR、Downlink、 Save - Data、 Viewport - Width, Width Content - Type(值仅限于 text / plain、multipart / form - data、 application / x - www - form - urlencoded 三者之一)
    // 如果客户端向服务器发送了额外的请求头信息，则需要在服务器端通过 Access - Control - Allow - Headers 对额外的请求头进行声明，否则这次请求会失败!
    // 以下允许客户端额外向服务器发送 Content - Type 请求头和 X - Custom - Header 请求头
    //注意:多个请求头之间使用英文的号进行分割
    res.setHeader('Access-Control-Allow-Headers', ' Content-Type, X-Custom-Header ')
    
    // 3.关于请求方法
    // 默认情况下，CORS仅支持客户端发起 GET、POST、HEAD 请求
    // 如果客户端希望通过 PUT、DELETE 等方式请求服务器的资源，则需要在服务器端，通过 Acess - Control - Alow - Methods来指明实际请求所允许使用的 HTTP 方法。
    // 以下只允许 POST、GET、DELETE、HEAD 请求方法
    res.setHeader('Access-Control-Allow-Methods', 'POST,GET,DELETE,HEAD')
    // 以下允许所有的 HTTP 请求方法
    // res.setHeader('Access-Control-Allow-Methods','*')

    // 4.CORS请求分类：简单请求、预检请求

    // 同时满足以下两大条件的请求，就属于简单请求:
    // 请求方式:GET、POST、HEAD 三者之一
    // HTTP 头部信息不超过以下几种字段: 无自定义头部字段、Accept、Accept - Language、Content - Language、DPR、Downlink、Save - Data Viewport - Width、 WidthContent - Type(只有三个值application / x - www - formurlencoded、multipart / form - data、 text / plain)
    // 简单请求的特点: 客户端与服务器之间只会发生一次请求

    // 只要符合以下任何一个条件的请求，都需要进行预检请求
    // 请求方式为 GET、POST、HEAD 之外的请求Method类型
    // 请求头中包含自定义头部字段
    // 向服务器发送了 application / json 格式的数据
    // 在浏览器与服务器正式通信之前，浏览器会先发送 OPTION 请求进行预检，以获知服务器是否允许该实际请求，所以这次的OPTION请求称为“预检请求”
    // 服务器成功响应预检请求后，才会发送真正的请求，并且携带真实数据
    // 预检请求的特点: 客户端与服务器之间会发生两次请求，OPTION 预检请求成功之后，才会发起真正的请求

})
app.listen(3031, () => {
    
})

