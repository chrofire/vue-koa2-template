const asyncValidator = require('async-validator').default

/**
 * 校验器
 * @param {object} rules 校验规则
 * @param {object} data 校验对象
 * @param {object} options 校验处理选项 first: 校验到第一个错误时返回 firstFields: 校验到该字段的第一个错误后校验下一个字段
 */
async function validator (rules, data, options = { first: false }) {
    try {
        const asyncValid = new asyncValidator(rules)
        await asyncValid.validate({ ...data }, options)
        return Promise.resolve({
            valid: true
        })
    } catch (e) {
        const { errors, fields } = e
        return Promise.reject({
            valid: false,
            message: errors[0].message
        })
    }
}

module.exports = validator
