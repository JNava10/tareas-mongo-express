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
      estimatedHours: {
        type: Sequelize.INTEGER
      },
      workedHours: {
        type: Sequelize.INTEGER
      },
      realizedPercentage: {
        type: Sequelize.INTEGER
      },
      isEnded: {
        type: Sequelize.BOOLEAN,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deletedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(TableNames.task);
  }
};