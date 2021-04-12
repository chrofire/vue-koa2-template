const validator = require('./validator')

const postTestRules = {
    testContent: [
        { type: 'integer', message: 'integer' }
    ]
}

class TestValidator {
    async postTest (data) {
        return await validator(postTestRules, data)
    }
}

module.exports = new TestValidator()