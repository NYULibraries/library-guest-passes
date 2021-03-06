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
        allowNull: true,
        onDelete: 'SET NULL',
        references: {
          model: 'Affiliate',
          key: 'id',
          as: 'affiliate_id',
        }
      },
      logincount: {
        type: Sequelize.INTEGER
      },
      guest_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      affiliate_name: {
        type: Sequelize.STRING,
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
      user_status: {
        type: Sequelize.STRING,
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