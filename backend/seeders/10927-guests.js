'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.bulkInsert('Guest', [
      {
        name: 'Rei Ayanami',
        permission_status: true
      },
      {
        name: 'Shinji Ikari',
        permission_status: true
      },
      {
        name: 'Misato Katsuragi',
        permission_status: true
      },
      {
        name: 'Asuka Langley',
        permission_status: true
      },
      {
        name: 'Majima Goro',
        permission_status: true
      },
      {
        name: 'Ichiban Kasuga',
        permission_status: true
      },
      {
        name: 'Kiryu Kazuma',
        permission_status: true
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Guest');
  }
};
