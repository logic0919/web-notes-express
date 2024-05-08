const myUrlencoded=(req, res, next) => {
    let str = ''
    // 监听req的data数据
    req.addListener('data', (chunk) => {
        str += chunk
    })
    req.addListener('end', () => {
        req.body = qs.parse(str)
        next()
    })
}
module.exports = myUrlencoded