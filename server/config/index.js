module.exports = {
    koaPort: 3000,
    sequelizeConfig: {
        database: 'test',
        username: 'root',
        password: '123456',
        sqlConfig: {
            host: 'localhost',
            dialect: 'mysql',
            // logging: false, // 是否将 SQL 语句打印到控制台，默认为 true
            timezone: '+08:00', // 解决时差 - 默认存储时间存在8小时误差
            define: {
                // underscored: true,
                freezeTableName: true
            }
        }
    },
    syncConfig: {
        // force: true,
        alter: true
    }
}