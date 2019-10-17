'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Roles', [
        {
          name: 'User',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Admin',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'PMs',
          createdAt: new Date(),
          updatedAt: new Date()
        },
      ], {});
    
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Roles', null, {});
  }
};
