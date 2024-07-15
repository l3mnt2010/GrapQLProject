require('dotenv').config();
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const Database = require('./database');
const cors = require('cors')

// Load schema & resolvers
const typeDefs = require('./schema/schema');
const resolvers = require('./resolver');

global.db = new Database();
const app = express();
app.use(cors())

const startServer = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: () => ({ db }),
  });

  await server.start();
  server.applyMiddleware({ app });

  app.listen({ port: process.env.PORT || 4000 }, () =>
    console.log(`Server ready at http://localhost:4000${server.graphqlPath}`)
  );
};

startServer();
