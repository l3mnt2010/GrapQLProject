require('dotenv').config();
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const Database = require('./database');
const cors = require('cors');
const authGuard = require('./middleware/authGuard');
const JWTHelper = require('./helpers/JWTHelper');

// Load schema & resolvers
const typeDefs = require('./schema/schema');
const resolvers = require('./resolver');

global.db = Database;
const app = express();
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware for authentication
// app.use(authGuard);

const startServer = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    // add middleware
    context: ({ req }) => {
      const token = req.headers.authorization || '';
      try {
        const { userId } = JWTHelper.verifyToken(token);
        return { userId, db };
       } catch (error) {
         return { db };
        }
      }
  });

  await server.start();
  server.applyMiddleware({ app });

  app.listen({ port: process.env.PORT || 4000 }, () =>
    console.log(`Server ready at http://localhost:4000${server.graphqlPath}`)
  );
};

startServer();
