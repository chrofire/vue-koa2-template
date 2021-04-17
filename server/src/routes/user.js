const Router = require('@koa/router')
const router = new Router()
const userController = require('../controllers/user')

/**
 * @route POST /api/user/getRole
 * @desc 用户getRole
 */
router.post('/getRole', userController.getRole)
 
/**
 * @route POST /api/user/create
 * @desc 用户注册接口
 */
router.post('/create', userController.create)

/**
 * @route GET /api/user/isExistsUser
 * @desc 查询用户是否存在
 */
router.get('/isExistsUser', userController.isExistsUser)

/**
 * @route POST /api/user/login
 * @desc 用户登录接口
 */
router.post('/login', userController.login)

/**
 * @route GET /api/user/select
 * @desc 分页查询所有用户
 */
router.get('/select', userController.select)

/**
 * @route POST /api/user/updateUserPassword
 * @desc 修改用户密码
 */
router.post('/updateUserPassword', userController.updateUserPassword)

/**
 * @route POST /api/user/update
 * @desc 修改用户
 */
router.post('/update', userController.updateUser)


module.exports = router
