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
    khoahocs: async (_, __, {req, res}) => {
      try {
        if(!req.user || !req.user.username || !req.user.id) return "nope";
        return db.khoahoc.findAll()
      }
      catch (err) {return "nope"}
    },
    khoahoc: async (_, __, {req, res}) => {
      try {
        if(!req.user || !req.user.username || !req.user.id) return "nope";
        return db.khoahoc.findByPk(args.id)
      }
      catch (err) {return "nope"};
    },
  },
  Mutation: {
    createKhoahoc: async (_, __, {req, res}) => {
      try {
        if(!req.user || !req.user.username || !req.user.id) return "nope";
      const khoahoc = await db.khoahoc.create({
        ten_khoa: args.ten_khoa,
      });
      return khoahoc.id;
    }
    catch (err) {return "nope"};
    },
    updateKhoahoc: async (_, __, {req, res}) => {
      try {
        if(!req.user || !req.user.username || !req.user.id) return "nope";
      await db.khoahoc.update({
        ten_khoa: args.ten_khoa,
      }, {
        where: { id: args.id },
      });
      return 'Update Success!';
    }
      catch (err) {return "nope"};
    },
    deleteKhoahoc: async (_, __, {req, res}) => {
      try {
        if(!req.user || !req.user.username || !req.user.id) return "nope";
        await db.khoahoc.destroy({ where: { id: args.id } });
        return 'Delete success!';
      }
      catch (err) {return "nope"};
    }
  }
};

module.exports = { typeDefs, resolvers };