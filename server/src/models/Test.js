const { DataTypes } = require('sequelize')
const sequelize = require('../../db/sequelize')

const Test = sequelize.define('test', {
    testContent: {
        type: DataTypes.INTEGER,
        allowNull: true,
        comment: '测试'
    }
})

module.exports = Test