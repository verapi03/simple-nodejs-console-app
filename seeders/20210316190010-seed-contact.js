'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
     await queryInterface.bulkInsert('Contacts', [{
       firstname: 'John',
       lastname: 'Doe',
       phone: '0123456789',
       email: 'test1@email.com',
       createdAt: new Date().toDateString(),
       updatedAt: new Date().toDateString()
     },
     {
      firstname: 'Jane',
      lastname: 'Doe',
      phone: '0123456798',
      email: 'test2@email.com',
      createdAt: new Date().toDateString(),
      updatedAt: new Date().toDateString()
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
