const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { mergeTypeDefs, mergeResolvers } = require('@graphql-tools/merge');
const { ApolloServer } = require('apollo-server-express');
const { db, sequelize } = require('./database');
const auth = require('./GraphQL/auth');
const answer = require('./GraphQL/answer');
const course = require('./GraphQL/course');
const question = require('./GraphQL/question');
const subject = require('./GraphQL/subject');
const user = require('./GraphQL/user');
const { limitMiddleware, validateRequestMiddleware } = require('./middleware/MiddlewareLimit');
const middlewareController = require('./middleware/authGuard');
const routes = require('./routes/routes');

const typeDefs = mergeTypeDefs([
  auth.typeDefs,
  answer.typeDefs,
  course.typeDefs,
  question.typeDefs,
  subject.typeDefs,
  user.typeDefs
]);

const resolvers = mergeResolvers([
  auth.resolvers,
  answer.resolvers,
  course.resolvers,
  question.resolvers,
  subject.resolvers,
  user.resolvers
]);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, res }) => ({ req, res, user: req.user, db }),
  formatError: (error) => {
    return new Error('Internal server error');
  },
});

const startServer = async () => {
  await new Promise(resolve => setTimeout(resolve, 10000));
try {
  
  await sequelize.authenticate();
  console.log('Connection has been established successfully.');
  await sequelize.sync({ alter: true });
  console.log('Database synchronized.');
  await server.start();
  const app = express();
  app.use(cors({ origin: 'http://localhost:3000' }));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(limitMiddleware);
  app.use(validateRequestMiddleware);
  app.use(middlewareController.verifyTokenAndAuth())

  server.applyMiddleware({ app });

  app.use("/", middlewareController.verifyTokenAndAuth(), routes);

  app.use(function(req, res) {
    res.status(404).send({ message: 'Prohibit' });
  });

  app.listen({ port: 4000 }, () => 
    console.log(`🚀 Server ready at http://localhost:4000/graphql`)
  );
} catch (error) {
  console.error('Unable to connect to the database:', error);
}
};

startServer();