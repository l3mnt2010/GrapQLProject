const { gql } = require('apollo-server-express');
const { Op, literal } = require('sequelize');
const db = require('./../database');  // Cấu hình Sequelize của bạn

const typeDefs = gql`
  type Monhoc {
    id: ID!
    ten_mon: String!
    khoa_id: Int
  }

  type Query {
    monhocs: [Monhoc]
    monhoc(id: ID!): Monhoc
  }

  type Mutation {
    createMonhoc(ten_mon: String, khoa_id: Int): ID
    updateMonhoc(id: Int, ten_mon: String, khoa_id: Int): String
    searchSubjectByName(firstName: String!, lastName: String!): [Monhoc!]!
    deleteMonhoc(id: Int): String
  }
`;

const resolvers = {
  Query: {
    monhocs: async () => db.monhoc.findAll(),
    monhoc: async (obj, args) => db.monhoc.findByPk(args.id),
  },
  Mutation: {
    createMonhoc: async (root, args) => {
      const monhoc = await db.monhoc.create({
        ten_mon: args.ten_mon,
        khoa_id: args.khoa_id,
      });
      return monhoc.id;
    },
    updateMonhoc: async (root, args) => {
      await db.monhoc.update({
        ten_mon: args.ten_mon,
        khoa_id: args.khoa_id,
      }, {
        where: { id: args.id },
      });
      return 'Update Success!';
    },
    searchSubjectByName: async (_, { firstName, lastName }) => {
      try {
        const subjects = await db.monhoc.findAll({
          where: {
            [Op.or]: [
              literal('soundex(ten_mon) = soundex(:firstName)'),
              { ten_mon: lastName },
            ],
          },
          replacements: { firstName },
        });
    
        return subjects;
      } catch (error) {
        console.error('Error searching subjects:', error);
        throw new Error('Error searching subjects');
      }
    },
    deleteMonhoc: async (root, args) => {
      await db.monhoc.destroy({ where: { id: args.id } });
      return 'Delete success!';
    }
  }
};

module.exports = { typeDefs, resolvers };
