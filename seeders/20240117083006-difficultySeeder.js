'use strict';

const TableNames = require("../helpers/tableNames");
const SeedData = require("../helpers/seedData");


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    let difficulties = SeedData.difficulties

    await queryInterface.bulkInsert(TableNames.difficulty, difficulties, {});
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
