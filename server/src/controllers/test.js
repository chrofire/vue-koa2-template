const { SuccessModel, ErrorModel } = require('../utils/responseModel')
const TestService = require('../services/test')
const TestValidator = require('../validators/test')

class TestController {
    async getTest (ctx) {
        ctx.body = new SuccessModel('get')
    }
    async postTest (ctx) {
        try {
            const data = ctx.request.body

            await TestValidator.postTest(data)
            
            const res = await TestService.postTest(data)
            ctx.body = new SuccessModel('创建成功', res)
        } catch (e) {
            ctx.body = new ErrorModel(e.message)
        }
    }
}

module.exports = new TestController()