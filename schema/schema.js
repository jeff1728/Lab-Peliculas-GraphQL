const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLSchema,
  GraphQLNonNull
} = require('graphql');

const Director = require('../models/Director');
const Pelicula = require('../models/Pelicula');
const Actor = require('../models/Actor');

// Tipos GraphQL
const DirectorType = new GraphQLObjectType({
  name: 'Director',
  fields: () => ({
    id: { type: GraphQLInt },
    nombre: { type: GraphQLString },
    nacionalidad: { type: GraphQLString }
  })
});

const ActorType = new GraphQLObjectType({
  name: 'Actor',
  fields: () => ({
    id: { type: GraphQLInt },
    nombre: { type: GraphQLString }
  })
});

const PeliculaType = new GraphQLObjectType({
  name: 'Pelicula',
  fields: () => ({
    id: { type: GraphQLInt },
    titulo: { type: GraphQLString },
    anio: { type: GraphQLInt },
    director: {
      type: DirectorType,
      async resolve(parent) {
        return await parent.getDirector();
      }
    },
    actores: {
      type: new GraphQLList(ActorType),
      async resolve(parent) {
        return await parent.getActors();
      }
    }
  })
});

// RootQuery
const RootQuery = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    peliculas: {
      type: new GraphQLList(PeliculaType),
      async resolve() {
        return await Pelicula.findAll();
      }
    },
    pelicula: {
      type: PeliculaType,
      args: { id: { type: GraphQLInt } },
      async resolve(parent, args) {
        return await Pelicula.findByPk(args.id);
      }
    }
  }
});

// Mutations
const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    crearDirector: {
      type: DirectorType,
      args: {
        nombre: { type: new GraphQLNonNull(GraphQLString) },
        nacionalidad: { type: new GraphQLNonNull(GraphQLString) }
      },
      async resolve(parent, args) {
        return await Director.create({
          nombre: args.nombre,
          nacionalidad: args.nacionalidad
        });
      }
    },
    actualizarDirector: {
      type: DirectorType,
      args: {
        id: { type: GraphQLInt },
        nombre: { type: GraphQLString },
        nacionalidad: { type: GraphQLString }
      },
      async resolve(parent, args) {
        const director = await Director.findByPk(args.id);
        if (!director) throw new Error('Director no encontrado');
        if (args.nombre) director.nombre = args.nombre;
        if (args.nacionalidad) director.nacionalidad = args.nacionalidad;
        await director.save();
        return director;
      }
    },
    eliminarDirector: {
      type: GraphQLString,
      args: {
        id: { type: GraphQLInt }
      },
      async resolve(parent, args) {
        const director = await Director.findByPk(args.id);
        if (!director) throw new Error('Director no encontrado');
        await director.destroy();
        return 'Director eliminado correctamente';
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
