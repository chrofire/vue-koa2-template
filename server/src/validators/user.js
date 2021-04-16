const validator = require('./validator')

const createRules = {
    username: [
        { required: true, message: '用户名必填' },
        { type: 'string', message: '用户名类型错误' }
    ],
    password: [
        { required: true, message: '密码必填' },
        { type: 'string', message: '密码类型错误' },
        { min: 5, message: '密码最少5位' },
        { max: 15, message: '密码最多15位' }
    ],
    userType: [
        { required: true, message: '类型必填' },
        { type: 'integer', message: '类型错误' }
    ],
    status: [
        { type: 'integer', message: '状态类型错误' }
    ]
}

const isExistsUserRules = {
    username: [
        { required: true, message: '用户名必填' },
        { type: 'string', message: '用户名类型错误' }
    ]
}

const loginRules = {
    username: [
        { required: true, message: '用户名必填' },
        { type: 'string', message: '用户名类型错误' }
    ],
    password: [
        { required: true, message: '密码必填' },
        { type: 'string', message: '密码类型错误' },
        { min: 5, message: '密码最少5位' },
        { max: 15, message: '密码最多15位' }
    ],
    userType: [
        { required: true, message: '类型必填' },
        { type: 'integer', message: '类型错误' }
    ]
}



class UserValidator {
    async create (data) {
        return await validator(createRules, data)
    }
    async isExistsUser (data) {
        return await validator(isExistsUserRules, data)
    }
    async login (data) {
        return await validator(loginRules, data)
    }
}

module.exports = new UserValidator()
