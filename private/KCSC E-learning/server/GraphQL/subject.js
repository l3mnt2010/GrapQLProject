const { gql } = require('apollo-server-express');
const { Op, literal } = require('sequelize');
const db = require('./../database');

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
    monhocs: async (_, __,{req, res}) =>{
     try {
      if(!req.user || !req.user.username || !req.user.id) return "nope";
      return db.monhoc.findAll();
     } 
     catch(err) {
       return "nope";
     }
    },
    monhoc: async (_, __,{req, res}) =>{
      try {
       if(!req.user || !req.user.username || !req.user.id) return "nope";
       return db.monhoc.findByPk(args.id);
      } catch (err) {
        return "nope";
      }},
  },
  Mutation: {
    createMonhoc: async (_, __,{req, res}) =>{
      try {
       if(!req.user || !req.user.username || req.user.admin !== 1) return "nope";
       const monhoc = await db.monhoc.create({
        ten_mon: args.ten_mon,
        khoa_id: args.khoa_id,
      });
      return monhoc.id;
    }
      catch(err) {
        return "nope";
      }
    },
    updateMonhoc: async (_, __,{req, res}) =>{
      try {
       if(!req.user || !req.user.username || req.user.admin !== 1) return "nope";
       await db.monhoc.update({
        ten_mon: args.ten_mon,
        khoa_id: args.khoa_id,
      }, {
        where: { id: args.id },
      });
      return 'Update Success!';}
      catch(err) {
        return "nope";
      }
    },
    searchSubjectByName: async (_, __, {req, res}) => {
      try {
        if(!req.user || !req.user.username || !req.user.id) return "nope";
        const subjects = await db.monhoc.findAll({
          where: {
            [Op.or]: [
              literal('soundex(ten_mon) = soundex(:firstName)'),
              { ten_mon: __.lastName },
            ],
          },
          replacements: { firstName : __.firstName },
        });
    
        return subjects;
        
      } catch (error) {
        return "nope";
      }
    },
    deleteMonhoc: async (_, __,{req, res}) =>{
      try {
       if(!req.user || !req.user.username || req.user.admin !== 1) return "nope";
       await db.monhoc.destroy({ where: { id: args.id } });
       return 'Delete success!';
      } catch (error){
       return "nope"
      }
    }
  }
};

module.exports = { typeDefs, resolvers };