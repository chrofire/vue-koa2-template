const bcrypt = require('bcryptjs')

class Bcrypt {
    /**
     * 加密
     * @param {string} data 加密的字符串
     */
    encrypt (encryptStr) {
        const salt = bcrypt.genSaltSync(10)
        // 对明文加密
        return bcrypt.hashSync(encryptStr, salt)
    }
    /**
     * 解密
     * @param {string} decryptStr 解密的字符串
     * @param {string} compareStr 解密对比的字符串
     */
    decrypt (decryptStr, compareStr) {
        return bcrypt.compareSync(decryptStr, compareStr)
    }
}

module.exports = new Bcrypt()