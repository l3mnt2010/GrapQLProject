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

  type Query {
    users: [User]
    user(id: ID!): User
  }

  type Mutation {
    createUser(username: String, password: String, admin: Int): ID
    updateUser(id: Int, username: String, password: String, admin: Int): String
    deleteUser(id: Int): String
  }
`;  

const resolvers = {
  Query: {
    users: async () => db.users.findAll(),
    user: async (obj, args) => db.users.findByPk(args.id),
  },
  Mutation: {
    createUser: async (root, args) => {
      const user = await db.users.create({
        username: args.username,
        password: args.password,
        admin: args.admin
      });
      return user.id;
    },
    updateUser: async (root, args) => {
      await db.users.update({
        username: args.username,
        password: args.password,
        admin: args.admin
      }, {
        where: { id: args.id },
      });
      return 'Update Success!';
    },
    deleteUser: async (root, args) => {
      await db.users.destroy({ where: { id: args.id } });
      return 'Delete success!';
    }
  }
};

module.exports = { typeDefs, resolvers };
