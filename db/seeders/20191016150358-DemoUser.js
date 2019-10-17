'use strict';
var bcrypt = require('bcryptjs');
module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Users', [
        {
          name: 'Hung Ha',
          email: "hungha@gmail.com",
          password: bcrypt.hashSync("123", 8),
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'An Tran',
          email: "antran@gmail.com",
          password: bcrypt.hashSync("345", 8),
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Phat Cao',
          email: "phatcao@gmail.com",
          password: bcrypt.hashSync("567", 8),
          createdAt: new Date(),
          updatedAt: new Date()
        },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Users', null, {});
  }
};
