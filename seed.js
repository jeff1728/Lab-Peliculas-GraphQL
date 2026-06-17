const sequelize = require('./database/database');
const Director = require('./models/Director');
const Pelicula = require('./models/Pelicula');
const Actor = require('./models/Actor');
const Elenco = require('./models/Elenco');

// Configurar relaciones
Director.hasMany(Pelicula);
Pelicula.belongsTo(Director);
Pelicula.belongsToMany(Actor, { through: Elenco, foreignKey: 'peliculaId', otherKey: 'actorId' });
Actor.belongsToMany(Pelicula, { through: Elenco, foreignKey: 'actorId', otherKey: 'peliculaId' });

async function cargarDatos() {
  try {
    await sequelize.sync({ force: true });
    
    // Crear Directores
    const nolan = await Director.create({ nombre: 'Christopher Nolan', nacionalidad: 'Británico' });
    const cameron = await Director.create({ nombre: 'James Cameron', nacionalidad: 'Canadiense' });
    
    // Crear Películas y asociar Director
    const inception = await Pelicula.create({ titulo: 'Inception', anio: 2010 });
    await inception.setDirector(nolan);
    
    const titanic = await Pelicula.create({ titulo: 'Titanic', anio: 1997 });
    await titanic.setDirector(cameron);
    
    // Crear Actores
    const actor1 = await Actor.create({ nombre: 'Leonardo DiCaprio' });
    const actor2 = await Actor.create({ nombre: 'Kate Winslet' });
    const actor3 = await Actor.create({ nombre: 'Joseph Gordon-Levitt' });
    
    // Asociar Películas y Actores
    await inception.addActors([actor1, actor3]);
    await titanic.addActors([actor1, actor2]);
    
    console.log('Datos cargados correctamente en peliculas.db');
  } catch (error) {
    console.error('Error al cargar datos de prueba:', error);
  } finally {
    await sequelize.close();
  }
}

cargarDatos();
