'use strict';
const TableNames = require("../helpers/tableNames");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(TableNames.task, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT
      },
      description: {
        type: Sequelize.STRING
      },
      difficulty: {
        type: Sequelize.BIGINT,
        references: {
          model: {
            tableName: TableNames.difficulty
          },
          key: 'id'
        },
      },
      workedHours: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      realizedPercentage: {
        allowNull: false,
        type: Sequelize.DATE
      },
      isEnded: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(TableNames.task);
  }
};