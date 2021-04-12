/**
 * 基础响应模型
 */
class BaseModel {
    constructor ({ code, message, data }) {
        if (code) {
            this.code = code
        }
        if (message) {
            this.message = message
        }
        if (data) {
            this.data = data
        }

    }
}

/**
 * 成功响应模型
 * @param message 成功响应信息
 * @param data 成功响应数据
 */
class SuccessModel extends BaseModel {
    constructor (message = 'success', data = null) {
        super({
            code: 1,
            message,
            data
        })
    }
}

/**
 * 错误响应模型
 * @param message 错误响应信息
 */
class ErrorModel extends BaseModel {
    constructor (message = 'error') {
        super({
            code: -1,
            message
        })
    }
}

module.exports = {
    SuccessModel,
    ErrorModel
}