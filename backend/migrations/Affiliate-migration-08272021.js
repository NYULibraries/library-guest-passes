'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Affiliate', {
      id:{
        type: Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
      },
      name: {
        type: Sequelize.STRING,
        allowNull:false
      },
      permission_status: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
        allowNull:false
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Affiliate');
  }
};
