'use strict';

const TableNames = require("../helpers/tableNames");
const SeedData = require("../helpers/seedData");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    let users = SeedData.users;

    await queryInterface.bulkInsert(TableNames.user, users, {});
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
