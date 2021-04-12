const Sequelize = require('sequelize')

const { sequelizeConfig } = require('../config')
const { database, username, password, sqlConfig } = sequelizeConfig

const sequelize = new Sequelize(database, username, password, sqlConfig)

module.exports = sequelize
