const { DataTypes } = require('sequelize');
const sequelize = require('../database/database');

const Elenco = sequelize.define('Elenco', {
  peliculaId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  actorId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

module.exports = Elenco;
