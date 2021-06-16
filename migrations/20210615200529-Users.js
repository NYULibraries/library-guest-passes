'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id:{
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
        type: Sequelize.DATE,
        unique: true,
        allowNull: false,
      },
      cardexp: {
        type: Sequelize.DATE,
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
        unique: true,
        allowNull: false,
      },
      notes: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Users');
  }
};