const { DataTypes } = require('sequelize')
const sequelize = require('../../db/sequelize')

const User = sequelize.define('users', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: '用户名'
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: '密码'
    },
    userType: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '用户分类: 1. 管理员 2. 普通用户'
    },
    status: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '用户状态: 1. 启用 2. 禁用'
    }
})
module.exports = User
