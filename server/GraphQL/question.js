const { gql } = require('apollo-server-express');
const db = require('./../database');

// Định nghĩa `typeDefs` và `resolvers` cho bảng `cauhoi`
const typeDefs = gql`
  type Cauhoi {
    id: ID!
    noi_dung: String!
    mon_id: Int
  }

  type Query {
    cauhois: [Cauhoi]
    cauhoi(id: ID!): Cauhoi
  }

  type Mutation {
    createCauhoi(noi_dung: String, mon_id: Int): ID
    updateCauhoi(id: Int, noi_dung: String, mon_id: Int): String
    deleteCauhoi(id: Int): String
  }
`;

const resolvers = {
  Query: {
    cauhois: async () => db.cauhoi.findAll(),
    cauhoi: async (obj, args) => db.cauhoi.findByPk(args.id),
  },
  Mutation: {
    createCauhoi: async (root, args) => {
      const cauhoi = await db.cauhoi.create({
        noi_dung: args.noi_dung,
        mon_id: args.mon_id,
      });
      return cauhoi.id;
    },
    updateCauhoi: async (root, args) => {
      await db.cauhoi.update({
        noi_dung: args.noi_dung,
        mon_id: args.mon_id,
      }, {
        where: { id: args.id },
      });
      return 'Update Success!';
    },
    deleteCauhoi: async (root, args) => {
      await db.cauhoi.destroy({ where: { id: args.id } });
      return 'Delete success!';
    }
  }
};

module.exports = { typeDefs, resolvers };
