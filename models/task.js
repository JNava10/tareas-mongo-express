'use strict';
const {
  Model
} = require('sequelize');
const TableNames = require("../helpers/tableNames");
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Difficulty)
    }
  }
  Task.init({
    description: DataTypes.STRING,
    difficulty: DataTypes.STRING,
    workedHours: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    realizedPercentage: DataTypes.DATE,
    isEnded: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    sequelize,
    modelName: 'Task',
    tableName: TableNames.task,
    paranoid: true
  });
  return Task;
};