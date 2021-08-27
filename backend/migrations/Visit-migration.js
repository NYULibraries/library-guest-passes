"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Visit', {
      id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      guest_id:{
        type: Sequelize.INTEGER,
        references: {
          model: 'Guest',
          key: 'id',
          as: 'guest_id',
        }
      },
      affiliate_id:{
        type: Sequelize.INTEGER,
        references: {
          model: 'Affiliate',
          key: 'id',
          as: 'affiliate_id',
        }
      },
      initials: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      restrictions: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      idtype: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      cardissue: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      cardexp: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      userStatus: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 1,
      },
      loginCount: {
        type: Sequelize.TINYINT,
        allowNull: false,
        defaultValue: 1,
      },
      notes: {
        type: Sequelize.STRING,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Visit');
  }
};