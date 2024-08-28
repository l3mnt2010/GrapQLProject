const { gql } = require('apollo-server-express');
const db = require('./../database');
const fs = require('fs');
const path = require('path');

const typeDefs = gql`
  type PhuA {
    id: ID!
    noi_dung: String!
    dung: Boolean!
    cau_hoi_id: Int
  }  

  type Cauhoi {
    id: ID!
    noi_dung: String!
    mon_id: Int
    phuongan: [PhuA]
  }

  type Query {
    cauhois: [Cauhoi]
    cauhoi(id: ID!): Cauhoi
  }

  type Mutation {
    createCauhoi(noi_dung: String, mon_id: Int): ID
    updateCauhoi(id: Int, noi_dung: String, mon_id: Int): String
    deleteCauhoi(id: Int): String
    createNote(content: String!): String
  }
`;

const resolvers = {
  Query: {
    cauhois: async (_, __, {req, res}) => {
      try {
        if(!req.user || !req.user.username || !req.user.id) return "nope";
        return db.cauhoi.findAll({
          include: [{ model: db.phuongan, as: 'phuongan' }]
        });
        }
       catch(err) {
        return "nope";
       }
      },
    cauhoi: async (_, __, {req, res}) => {
      try {
        if(!req.user || !req.user.username || !req.user.id) return "nope";
        return db.cauhoi.findByPk(__.id);}
      catch(err) {
        return "nope";
      }
      }

  },
  Mutation: {
    createCauhoi: async (_, __, {req, res}) => {
      try {
        if(!req.user || !req.user.username || !req.user.id) return "nope";
      const cauhoi = await db.cauhoi.create({
        noi_dung: __.noi_dung,
        mon_id: __.mon_id,
      });
      return cauhoi.id;
      }
      catch (err) {return "nope"};
    },
    updateCauhoi: async (_, __, {req, res}) => {
      try {
        if(!req.user || !req.user.username || !req.user.id) return "nope";
        await db.cauhoi.update({
        noi_dung: __.noi_dung,
        mon_id: __.mon_id,
      }, {
        where: { id: __.id },
      });
      return 'Update Success!';
    }
    catch (err) {return "nope"};
    },
    deleteCauhoi: async (_, __, {req, res}) => {
      try {
        if(!req.user || !req.user.username || !req.user.id) return "nope";
        await db.cauhoi.destroy({ where: { id: __.id } });
        return 'Delete success!';
      }
      catch (err) {return "nope"};
    },
    createNote: async (_, { content }, {req, res}) => {
      try {
        if(!req.user || !req.user.username || !req.user.id) return "nope";
      if (!content) {
        throw new Error('Content is required.');
      }

      const dirPath = path.join(__dirname, '../utils');
      const filePath = path.join(dirPath, 'data.txt');

      if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
      }
      return new Promise((resolve, reject) => {
        fs.appendFile(filePath, `${content}\n\n`, (err) => {
          if (err) {
            reject(new Error('Error writing to file.'));
          }
          resolve('Content has been saved to file.');
        });
      });
    }
    catch (err) {return "nope"}}
  }
};

module.exports = { typeDefs, resolvers };