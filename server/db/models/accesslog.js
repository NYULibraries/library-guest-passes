const Sequelize = require('sequelize')
const db = require('../db')

const AccessLog = db.define('accesslog', {
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
  notes: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
});