'use strict';
const TableNames = require("../helpers/tableNames");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(TableNames.userTask, {
      task: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.BIGINT,
        references: {
          model: {
            tableName: TableNames.task
          },
          key: 'id'
        },
      },
      user: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.BIGINT,
        references: {
          model: {
            tableName: TableNames.user
          },
          key: 'id'
        },
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(TableNames.userTask);
  }
};