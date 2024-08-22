const { gql } = require('apollo-server-express');
const bcrypt = require('bcryptjs');
const JWTHelper = require('./../helpers/JWTHelper');
const db = require('./../database');

const typeDefs = gql`
  type Query {
    me: User
  }

  type Mutation {
    login(username: String!, password: String!): AuthPayload
    register(username: String!, password: String!): RegisterResponse
  }

  type User {
    id: ID!
    username: String!
  }

  type AuthPayload {
    token: String!
    refreshToken: String!
  }

  type RegisterResponse {
    message: String!
    statusCode: Int!
  }
`;

const resolvers = {
  Query: {
    me: async (_, __, { user }) => {
      if (!user) throw new Error('Not authenticated');
      return db.users.findByPk(user.id);
    },
  },
  Mutation: {
    login: async (_, { username, password }) => {
      const user = await db.users.findOne({ where: { username } });
    
      if (!user) throw new Error('User not found');
    
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) throw new Error('Invalid password');
    
      const token = JWTHelper.signToken({ id: user.id, username });
      
      const refreshToken = JWTHelper.signRefreshToken({ id: user.id, username });
      
      await db.users.update(
        { token, refreshToken },
        { where: { id: user.id } }
      );

      return {
        token,
        refreshToken,
      };
    },
    

    register: async (_, { username, password }) => {
      const existingUser = await db.users.findOne({ where: { username } });
      if (existingUser) throw new Error('Username already taken');

      const hashedPassword = await bcrypt.hash(password, 10);
      await db.users.create({ username, password: hashedPassword });

      return { message: 'User registered successfully', statusCode: 201 };
    },
  },
};

module.exports = { typeDefs, resolvers };
