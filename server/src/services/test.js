const { Test } = require('../models')
class TestService {
    async postTest (data) {
        try {
            const res = await Test.create(data)
            return res.dataValues
        } catch (e) {
            return Promise.reject({
                message: e.name
            })
        }
    }
}

module.exports = new TestService()