const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './peliculas.db',
  logging: false
});

module.exports = sequelize;
