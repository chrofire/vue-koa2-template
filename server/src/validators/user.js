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

const updateUserPasswordRules = {
    id: [
        { required: true, message: 'id必填' },
        { type: 'integer', message: 'id类型错误' }
    ],
    oldPassword: [
        { required: true, message: '旧密码必填' },
        { type: 'string', message: '旧密码类型错误' }
    ],
    newPassword: [
        { required: true, message: '新密码必填' },
        { type: 'string', message: '新密码类型错误' }
    ]
}

const updateUserRules = {
    id: [
        { required: true, message: 'id必填' },
        { type: 'integer', message: 'id类型错误' }
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
    async updateUserPassword (data) {
        return await validator(updateUserPasswordRules, data)
    }
    async updateUser (data) {
        return await validator(updateUserRules, data)
    }
}

module.exports = new UserValidator()
