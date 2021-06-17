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
      },
      guest: {
        type: Sequelize.STRING,
      },
      initials: {
        type: Sequelize.STRING,
      },
      restrictions: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.STRING,
      },
      idtype: {
        type: Sequelize.STRING,
      },
      cardissue: {
        type: Sequelize.DATE,
      },
      cardexp: {
        type: Sequelize.DATE,
      },
      userStatus: {
        type: Sequelize.STRING,
      },
      loginCount: {
        type: Sequelize.TINYINT,
      },
      notes: {
        type: Sequelize.STRING,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Users');
  }
};