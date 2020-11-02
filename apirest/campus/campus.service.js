const config = require('../config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../_helpers/db');

module.exports = {
    getAll,
    create,
    getAllCities,
    delete: _delete
};

async function getAll() {
    return await db.Campus.findAll();
}

async function create(params) {
    await db.Campus.create(params);
}

async function getAllCities() {
    db.Campus.belongsTo(db.Cities, { targetKey: 'id', foreignKey: 'idCity' })
    return await db.Campus.findAll({
        include: [{
            model: db.Cities
        }]
    });
}

async function getUser(id) {
    const campus = await db.Campus.findByPk(id);
    if (!campus) throw 'User not found';
    return campus;
}

async function _delete(id) {
    const campus = await getUser(id);
    await campus.destroy();
}