const sequelize = require('./sequelize')
const { syncConfig } = require('../config')

// 导入模型
require('../src/models')

sequelize
    .authenticate()
    .then(() => {
        console.log('数据库连接成功')
    })
    .catch((err) => {
        console.log(err)
    })

sequelize
    .sync(syncConfig)
    .then(() => {
        console.log('同步成功')
        process.exit()
    })
    .catch((err) => {
        console.log(err)
    })
