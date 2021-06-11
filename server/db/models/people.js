const { Sequelize } = require('sequelize')
const db = require('../../db')

const People = db.define('people', {
  user_id:{
    type: Sequelize.INTEGER,
    autoIncrement:true,
    allowNull:false,
    primaryKey:true
  },
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
  guest: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
  initials: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
  restrictions: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
  status: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
  idtype: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
  cardissue: {
    type: Sequelize.DATETIME,
    unique: true,
    allowNull: false,
  },
  cardexp: {
    type: Sequelize.DATETIME,
    unique: true,
    allowNull: false,
  },
  userStatus: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
  loginCount: {
    type: Sequelize.TINYINT,
    allowNull: false,
  },
  notes: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
});

module.exports = People