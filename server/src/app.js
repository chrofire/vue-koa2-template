const Koa = require('koa')
const koaBody = require('koa-body')
const cors = require('@koa/cors')
const koaStatic = require('koa-static')
const jsonError = require('./middlewares/jsonErrorResponse')
const logger = require('koa-logger')
const path = require('path')
const { koaPort } = require('../config')
const app = new Koa()


// 错误处理
app.use(jsonError)

// 跨域配置
app.use(cors())

// 日志
app.use(logger())

// 静态文件处理
app.use(koaStatic(path.join(__dirname, '/public')))

// 解析请求体
app.use(
    koaBody({
        parsedMethods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD'],
        multipart: true, // 启用文件支持
        // formidable 第三方包 文件上传模块
        formidable: {
            uploadDir: path.join(__dirname, '/public/uploads'), // 文件存放目录
            keepExtensions: true // 保留文件扩展名
        }
    })
)

// router 配置路由
const router = require('./routes')
app.use(router.routes()).use(router.allowedMethods())

app.listen(koaPort, () => {
    console.log(`http://localhost:${koaPort}`)
})
