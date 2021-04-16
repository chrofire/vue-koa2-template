const validator = require('./validator')

const selectAllRules = {
    pageNum: [
        { required: true, message: '页数必填' },
        { type: 'integer', min: 1, message: '页数为整数，最少为1' }
    ],
    pageSize: [
        { required: true, message: '每页显示条目个数必填' },
        { type: 'integer', min: 1, message: '每页显示条目个数为整数，最少为1' }
    ]
}

class BaseValidator {
    async selectAll (data) {
        return await validator(selectAllRules, data)
    }
}

module.exports = new BaseValidator()