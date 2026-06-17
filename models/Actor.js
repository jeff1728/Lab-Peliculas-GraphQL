const { DataTypes } = require('sequelize');
const sequelize = require('../database/database');

const Actor = sequelize.define('Actor', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = Actor;
