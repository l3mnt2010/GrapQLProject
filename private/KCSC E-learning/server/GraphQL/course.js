const { gql } = require('apollo-server-express');
const db = require('./../database');

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
        return db.khoahoc.findByPk(__.id)
      }
      catch (err) {return "nope"};
    },
  },
  Mutation: {
    createKhoahoc: async (_, __, {req, res}) => {
      try {
        if(!req.user || !req.user.username || !req.user.id || req.user.admin !== 1) return "nope";
      const khoahoc = await db.khoahoc.create({
        ten_khoa: __.ten_khoa,
      });
      return khoahoc.id;
    }
    catch (err) {return "nope"};
    },
    updateKhoahoc: async (_, __, {req, res}) => {
      try {
        if(!req.user || !req.user.username || !req.user.id || req.user.admin !== 1) return "nope";
      await db.khoahoc.update({
        ten_khoa: __.ten_khoa,
      }, {
        where: { id: __.id },
      });
      return 'Update Success!';
    }
      catch (err) {return "nope"};
    },
    deleteKhoahoc: async (_, __, {req, res}) => {
      try {
        if(!req.user || !req.user.username || !req.user.id || req.user.admin !== 1) return "nope";
        await db.khoahoc.destroy({ where: { id: __.id } });
        return 'Delete success!';
      }
      catch (err) {return "nope"};
    }
  }
};

module.exports = { typeDefs, resolvers };