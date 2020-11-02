const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        name: { type: DataTypes.STRING, allowNull: false },
        idCity: { type: DataTypes.INTEGER, allowNull: false }
    };

    const options = {
        defaultScope: {
            // exclude hash by default
            attributes: {}
        },
        scopes: {
            // include hash with this scope
            withHash: { attributes: {}, }
        }
    };

    return sequelize.define('Campus', attributes, options);
}