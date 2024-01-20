'use strict';

const TableNames = require("../helpers/tableNames");
const UserFactory = require("../factories/UserFactory");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // let users = UserFactory.create(3);
    let userName = UserFactory.getName()
    let user =
      {
        name: userName,
        firstLastName: 'Apellido',
        secondLastName: 'Apellido',
        email: UserFactory.getEmail(userName),
        password: UserFactory.password
      };


    await queryInterface.bulkInsert(TableNames.user, [user], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
