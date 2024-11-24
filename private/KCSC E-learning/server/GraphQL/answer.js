const { gql } = require('apollo-server-express');
const db = require('./../database');

const typeDefs = gql`
  type Phuongan {
    id: ID!
    noi_dung: String!
    dung: Boolean!
    cau_hoi_id: Int
  }

  type Query {
    phuongans: [Phuongan]
    phuongan(id: ID!): Phuongan
  }

  type Mutation {
    createPhuongan(noi_dung: String, dung: Boolean, cau_hoi_id: Int): ID
    updatePhuongan(id: Int, noi_dung: String, dung: Boolean, cau_hoi_id: Int): String
    deletePhuongan(id: Int): String
  }
`;

const resolvers = {
  Query: {
    phuongans: async (_, __, { req, res }) => {
      try {
        if (!req.user || !req.user.username || !req.user.id || req.user.admin !== 1) {
          return "NOPE"
        }
        return db.phuongan.findAll();
      }catch(err) {
          return "nope";
      }
    },
    phuongan: async (_, __, { req, res }) => {
      try {
        if (!req.user || !req.user.username || !req.user.id || req.user.admin !== 1) {
          return "NOPE"
        }
        return db.phuongan.findByPk(__.id)
      }  catch(err) {
          return "nope";
         }},
  },
  Mutation: {
    createPhuongan: async (_, __, { req, res }) => {
      try {
        if (!req.user || !req.user.username || !req.user.id || req.user.admin !== 1) {
          return "NOPE"
        }
      const phuongan = await db.phuongan.create({
        noi_dung: __.noi_dung,
        dung: __.dung,
        cau_hoi_id: __.cau_hoi_id,
      });
      return phuongan.id;
    }
      catch(err) {
        return "nope";
       }}
    ,
    updatePhuongan:async (_, __, { req, res }) => {
      try {
        if (!req.user || !req.user.username || !req.user.id || req.user.admin !== 1) {
          return "NOPE"
        }
      await db.phuongan.update({
        noi_dung: __.noi_dung,
        dung: __.dung,
        cau_hoi_id: __.cau_hoi_id,
      }, {
        where: { id: __.id },
      });
      return 'Update success!';}
      catch(err) {
        return "nope";
       }
    },
    deletePhuongan: async (_, __, { req, res }) => {
      try {
        if (!req.user || !req.user.username || !req.user.id || req.user.admin !== 1) {
          return "NOPE"
        }
      await db.phuongan.destroy({ where: { id: __.id } });
      return 'Delete success!';
    }
      catch(err) {
        return "nope";
       }
    }
  }
};

module.exports = { typeDefs, resolvers };