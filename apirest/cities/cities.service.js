const config = require('../config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../_helpers/db');

module.exports = {
    getAll,
    create,
    delete: _delete
};

async function getAll() {
    return await db.Cities.findAll();
}

async function create(params) {
    await db.Cities.create(params);
}

async function getUser(id) {
    const city = await db.Cities.findByPk(id);
    if (!city) throw 'User not found';
    return city;
}

async function _delete(id) {
    const city = await getUser(id);
    await city.destroy();
}