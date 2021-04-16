const { SuccessModel, ErrorModel } = require('../utils/responseModel')
const userValidator = require('../validators/user')
const BaseValidator = require('../validators/baseValidator')
const userService = require('../services/user')
class UserController {
    async getRole (ctx) {
        const user = ctx.state.user
        ctx.body = new SuccessModel('获取成功', user)
    }
    async create (ctx) {
        try {
            // 校验参数
            await userValidator.create(ctx.request.body)

            let { username, password, userType } = ctx.request.body

            // 查询用户是否存在
            const isExists = await userService.isExistsUser({ username })
            if (isExists) {
                ctx.body = new ErrorModel('用户名已存在')
                return false
            }
            // 创建用户
            const data = { username, password, userType, status: 1 }
            const res = await userService.createUser(data)
            ctx.body = new SuccessModel('创建成功', res)
        } catch (e) {
            ctx.body = new ErrorModel(e.message)
        }
    }
    async isExistsUser (ctx) {
        try {
            let { username } = ctx.query
            const validData = { username }
            // 校验参数
            await userValidator.isExistsUser(validData)
            // 查询用户是否存在
            const isExists = await userService.isExistsUser(validData)
            ctx.body = new SuccessModel('查询成功', { isExists })
        } catch (e) {
            ctx.body = new ErrorModel(e.message)
        }
    }
    async login (ctx) {
        try {
            // 校验参数
            await userValidator.login(ctx.request.body)

            let { username, password, userType } = ctx.request.body

            const res = await userService.loginUser({ username, password, userType })

            ctx.body = new SuccessModel('登录成功', res)
        } catch (e) {
            ctx.body = new ErrorModel(e.message)
        }
    }
    async select (ctx) {
        try {
            let { pageNum, pageSize } = ctx.query
            pageNum = parseInt(pageNum)
            pageSize = parseInt(pageSize)
            const validData = { pageNum, pageSize }
            // 校验参数
            await BaseValidator.selectAll(validData)

            const res = await userService.selectAll(validData)
            ctx.body = new SuccessModel('查询成功', res)
        } catch (e) {
            ctx.body = new ErrorModel(e.message)
        }
    }
}

module.exports = new UserController()