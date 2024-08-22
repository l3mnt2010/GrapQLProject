const { gql } = require('apollo-server-express');
const db = require('./../database');

// Định nghĩa `typeDefs` và `resolvers` cho bảng `khoahoc`
const typeDefs = gql`
  type Khoahoc {
    id: ID!
    ten_khoa: String!
  }

  type Query {
    khoahocs: [Khoahoc]
    khoahoc(id: ID!): Khoahoc
  }

  type Mutation {
    createKhoahoc(ten_khoa: String): ID
    updateKhoahoc(id: Int, ten_khoa: String): String
    deleteKhoahoc(id: Int): String
  }
`;

const resolvers = {
  Query: {
    khoahocs: async () => db.khoahoc.findAll(),
    khoahoc: async (obj, args) => db.khoahoc.findByPk(args.id),
  },
  Mutation: {
    createKhoahoc: async (root, args) => {
      const khoahoc = await db.khoahoc.create({
        ten_khoa: args.ten_khoa,
      });
      return khoahoc.id;
    },
    updateKhoahoc: async (root, args) => {
      await db.khoahoc.update({
        ten_khoa: args.ten_khoa,
      }, {
        where: { id: args.id },
      });
      return 'Update Success!';
    },
    deleteKhoahoc: async (root, args) => {
      await db.khoahoc.destroy({ where: { id: args.id } });
      return 'Delete success!';
    }
  }
};

module.exports = { typeDefs, resolvers };
