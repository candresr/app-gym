const config = require('../config.json');
const mysql = require('mysql2/promise');
const { Sequelize } = require('sequelize');

module.exports = db = {};

initialize();

async function initialize() {

    const { host, port, user, password, database } = config.database;
    const connection = await mysql.createConnection({ host, port, user, password });
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);

    const sequelize = new Sequelize(database, user, password, { host: host, dialect: 'mysql' });

    db.User = require('../users/user.model')(sequelize);
    db.Cities = require('../cities/cities.model')(sequelize);
    db.Campus = require('../campus/campus.model')(sequelize);

    await sequelize.sync();
}