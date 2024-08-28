'use strict';
require('dotenv').config();
const { Sequelize } = require('sequelize');

const db = {};

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'mysql',
  define: {
    freezeTableName: true,
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  logging: false,
});


const models = [
    require('./models/cauhoi.js'),
    require('./models/khoahoc.js'),
    require('./models/monhoc.js'),
    require('./models/phuongan.js'),
    require('./models/user.js')
];

models.forEach(model => {
    const seqModel = model(sequelize, Sequelize.DataTypes);
    db[seqModel.name] = seqModel;
});

Object.keys(db).forEach(key => {
    if ('associate' in db[key]) {
        db[key].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;