'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.bulkInsert('Affiliate', [
      {
        name: 'Adam',
        permission_status: true
      },
      {
        name: 'Lilith',
        permission_status: true
      },
      {
        name: 'Sachiel',
        permission_status: true
      },
      {
        name: 'Ramiel',
        permission_status: true
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Affiliate');
  }
};
