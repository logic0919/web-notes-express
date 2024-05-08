const express = require('express')
// 创建路由对象
const router = express.Router()
// 路由级别的中间件
router.use((req, res, next) => {
    console.log('路由级别的中间件');
    next()
})
// 在路由上挂载
router.get('/get', (req, res) => {
    res.send('get')
})
router.post('/post', (req, res) => {
    res.send('post')
})
// 导出路由模块
module.exports=router