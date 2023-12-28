const {Sequelize} = require('sequelize');

const sequelize = new Sequelize(process.env.DB_N, process.env.DB_U, process.env.DB_P,{
    host: process.env.DB_H,
    dialect: 'mysql',
    logging: false,
    pool: {
        max: 20,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
    dialectOptions: {
        connectTimeout: 60000, // Increase the timeout value
    },
});


module.exports = sequelize;