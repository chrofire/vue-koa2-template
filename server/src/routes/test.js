const Router = require('@koa/router')
const router = new Router()
const TestController = require('../controllers/test')

/**
 * @route POST /api/test/get
 * @desc get测试
 */
router.get('/get', TestController.getTest)

/**
 * @route POST /api/test/post
 * @desc post测试
 */
router.post('/post', TestController.postTest)


module.exports = router
