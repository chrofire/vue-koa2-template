const Router = require('@koa/router')
const router = new Router({ prefix: '/api' })

// testRouter
const testRouter = require('../routes/test')
router.use('/test', testRouter.routes())

// userRouter
const userRouter = require('../routes/user')
router.use('/user', userRouter.routes())


module.exports = router