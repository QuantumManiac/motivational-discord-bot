const Sequelize = require('sequelize');

// Init Sqlite DB connection
const sequelize = new Sequelize('database', 'user', 'password', {
    host: 'localhost',
    dialect: 'sqlite',
    logging: false,
    storage: 'database.sqlite',
});

const Subscribers = require('../models/Subscribers')(sequelize, Sequelize.DataTypes);

module.exports = { Subscribers };
