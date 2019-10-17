'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Categories', [
      {
        name: 'Milk',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Beer',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Sugar',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Categories', null, {});
  }
};
