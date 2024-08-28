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
    phuongans: async () => db.phuongan.findAll(),
    phuongan: async (_, __) => db.phuongan.findByPk(__.id),
  },
  Mutation: {
    createPhuongan: async (root, __) => {
      const phuongan = await db.phuongan.create({
        noi_dung: __.noi_dung,
        dung: __.dung,
        cau_hoi_id: __.cau_hoi_id,
      });
      return phuongan.id;
    },
    updatePhuongan: async (root, __) => {
      await db.phuongan.update({
        noi_dung: __.noi_dung,
        dung: __.dung,
        cau_hoi_id: __.cau_hoi_id,
      }, {
        where: { id: __.id },
      });
      return 'Update Success!';
    },
    deletePhuongan: async (root, __) => {
      await db.phuongan.destroy({ where: { id: __.id } });
      return 'Delete success!';
    }
  }
};

module.exports = { typeDefs, resolvers };