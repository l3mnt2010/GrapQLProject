const { gql } = require('apollo-server-express');
const db = require('./../database');

// Định nghĩa `typeDefs` và `resolvers` cho bảng `phuongan`
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
    phuongan: async (obj, args) => db.phuongan.findByPk(args.id),
  },
  Mutation: {
    createPhuongan: async (root, args) => {
      const phuongan = await db.phuongan.create({
        noi_dung: args.noi_dung,
        dung: args.dung,
        cau_hoi_id: args.cau_hoi_id,
      });
      return phuongan.id;
    },
    updatePhuongan: async (root, args) => {
      await db.phuongan.update({
        noi_dung: args.noi_dung,
        dung: args.dung,
        cau_hoi_id: args.cau_hoi_id,
      }, {
        where: { id: args.id },
      });
      return 'Update Success!';
    },
    deletePhuongan: async (root, args) => {
      await db.phuongan.destroy({ where: { id: args.id } });
      return 'Delete success!';
    }
  }
};

module.exports = { typeDefs, resolvers };
