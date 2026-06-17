const { DataTypes } = require('sequelize');
const sequelize = require('../database/database');

const Pelicula = sequelize.define('Pelicula', {
  titulo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  anio: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

module.exports = Pelicula;
