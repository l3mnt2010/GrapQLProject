const { gql } = require('apollo-server-express');
const db = require('./../database');

// Định nghĩa `typeDefs` và `resolvers` cho bảng `users`
const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    password: String!
    admin: Int!
  }
  
   type DeleteResponse { 
    success: Boolean!
    message: String!
  }

  type Query {
    users: [User]
    user(id: ID!): User
  }

  type Mutation {
    createUser(username: String, password: String, admin: Int): ID
    updateUser(id: Int, username: String, password: String, admin: Int): String
    deleteUser(id: Int): DeleteResponse
  }
`;  

const resolvers = {
  Query: {
    users: async (_, __, { req, res }) => {
      try {
        if (!req.user || req.user.admin !== 1) {
          return "NOPE"
        }
        const users = await db.users.findAll();
        if (users) return users;
      } catch (error) {
        throw new Error('Failed to fetch users. Please try again later.');
      }
    },
    user: async (_, __, { req, res }) => {
      try {
        if (!req.user || req.user.admin !== 1) {
          return "NOPE"
        }
        const user = await db.users.findByPk(__.id);
        if (user) return user;
      } catch (error) {
        throw new Error('nope');
      }
    },
  },
  Mutation: {
    createUser: async (_, __, {req, res}) => {
      try {
        if (!req.user || req.user.admin !== 1) {
          return "nope"
        }
        const user = await db.users.create({
        username: __.username,
        password: __.password,
        admin: __.admin
         });
        return user.id;
      } catch (error) {
          throw new Error('nope');
      }
    },
    updateUser: async (_, __,{req, res}) => {
      try {
        if (!req.user || req.user.admin !== 1) {
          return "nope"
        }
      await db.users.update({
        username: __.username,
        password: __.password,
        admin: __.admin
      }, {
        where: { id: __.id },
      });
      return 'Update Success!';
      } catch (error) {
      throw new Error('nope');
  }
    },
    deleteUser: async (_, __,{req, res}) => {
      try {
        if (!req.user || req.user.admin !== 1) {
          return "nope"
        }
      await db.users.destroy({ where: { id: __.id } });
      return {
        success: true,
        message:'Delete success!'};
    } catch (error) {
      return {
        success: false,
        message:'Delete failed!'};
    }
    }
  }
};

module.exports = { typeDefs, resolvers };
