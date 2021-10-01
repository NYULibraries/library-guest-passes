'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Guest', {
      id:{
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
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
    await queryInterface.dropTable('Guest');
  }
};