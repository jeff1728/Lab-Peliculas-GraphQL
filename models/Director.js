const { DataTypes } = require('sequelize');
const sequelize = require('../database/database');

const Director = sequelize.define('Director', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  nacionalidad: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = Director;
