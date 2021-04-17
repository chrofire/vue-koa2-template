const { User } = require('../models')
const { formatDate } = require('../utils/formatDate')
const { encrypt, decrypt } = require('../utils/bcrypt')
const jsonwebtoken = require('jsonwebtoken')
const { jwtInfo } = require('../../config')
const { Op } = require('sequelize')
class UserService {
    async createUser (data) {
        try {
            let { password, ...rest } = data
            password = encrypt(password)
            const res = await User.create({
                password,
                ...rest
            })
            return formatDate(res.dataValues)
        } catch (e) {
            return Promise.reject({
                message: e.name
            })
        }
    }
    async isExistsUser (data) {
        let { username } = data
        try {
            const res = await User.findOne({
                where: {
                    username
                }
            })
            if (!res) {
                return false
            } else {
                return true
            }
        } catch (e) {
            return Promise.reject({
                message: e.name
            })
        }
    }
    async loginUser (data) {
        try {
            const { username, password, userType } = data
            const res = await User.findOne({
                where: {
                    username
                }
            })
            if (!res) {
                return Promise.reject({
                    message: '未找到该用户'
                })
            }
            if (res.dataValues.status !== 1) {
                return Promise.reject({
                    message: '该用户已被禁用'
                })
            }
            if (res.dataValues.userType !== userType) {
                return Promise.reject({
                    message: '用户类型不匹配'
                })
            }
            const decryptRes = decrypt(password, res.dataValues.password)
            if (decryptRes) {
                const { id, username, name, userType } = res.dataValues
                const payload = { id, username, name, userType }
                // Token生成
                const token = jsonwebtoken.sign(payload, jwtInfo.secret, jwtInfo.options)
                return {
                    token
                }
            } else {
                return Promise.reject({
                    message: '用户名与密码不匹配'
                })
            }
        } catch (e) {
            console.log(e)
            return Promise.reject({
                message: e.name
            })
        }
    }
    async selectAll (data) {
        try {
            const { username = ``, pageNum, pageSize } = data
            let where = {
                username: {
                    [Op.substring]: username
                }
            }
            const { count, rows } = await User.findAndCountAll({
                offset: (pageNum - 1) * pageSize,
                limit: pageSize,
                where,
                attributes: {
                    exclude: ['password']
                }
            })
            return {
                rows: rows.map((item) => formatDate(item.dataValues)),
                count,
                pageNum,
                pageSize
            }
        } catch (e) {
            return Promise.reject({
                message: e.name
            })
        }
    }
    async comparePassword (data) {
        try {
            let { id, password } = data
            const res = await User.findOne({
                where: {
                    id
                }
            })
            if (!res) {
                return Promise.reject({
                    message: '未找到该用户'
                })
            }
            const decryptRes = decrypt(password, res.dataValues.password)
            if (decryptRes) {
                return true
            } else {
                return Promise.reject({
                    message: '旧密码不匹配'
                })
            }
        } catch (e) {
            return Promise.reject({
                message: e.name
            })
        }
    }
    async updatePassword (data) {
        try {
            let { id, password } = data
            password = encrypt(password)
            await User.update({ password }, {
                where: {
                    id
                }
            })
            return true
        } catch (e) {
            return Promise.reject({
                message: e.name
            })
        }
    }
    async updateUser (data) {
        try {
            let { id, ...rest } = data
            await User.update(rest, {
                where: {
                    id
                }
            })
            return true
        } catch (e) {
            return Promise.reject({
                message: e.name
            })
        }
    }
}

module.exports = new UserService()