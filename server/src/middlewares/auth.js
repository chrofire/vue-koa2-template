const { jwtInfo } = require('../../config')
const jwt = require('koa-jwt')
const auth = jwt({ secret: jwtInfo.secret }).unless(jwtInfo.unlessParams)
const baseAuth = jwt({ secret: jwtInfo.secret })
module.exports = {
    auth,
    baseAuth
}