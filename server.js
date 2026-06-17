const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const sequelize = require('./database/database');

const Director = require('./models/Director');
const Pelicula = require('./models/Pelicula');
const Actor = require('./models/Actor');
const Elenco = require('./models/Elenco');

Director.hasMany(Pelicula);
Pelicula.belongsTo(Director);
Pelicula.belongsToMany(Actor, { through: Elenco, foreignKey: 'peliculaId', otherKey: 'actorId' });
Actor.belongsToMany(Pelicula, { through: Elenco, foreignKey: 'actorId', otherKey: 'peliculaId' });

sequelize.sync({ force: false })
  .then(() => {
    console.log('Base de datos sincronizada');
  })
  .catch((error) => {
    console.error('Error al sincronizar base de datos:', error);
  });

// Cargar esquema de GraphQL
const schema = require('./schema/schema');

const app = express();

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en puerto ${PORT}`);
});
