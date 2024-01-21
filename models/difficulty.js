'use strict';
const {
  Model
} = require('sequelize');
const TableNames = require("../helpers/tableNames");
module.exports = (sequelize, DataTypes) => {
  class Difficulty extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Task, {
        foreignKey: 'difficulty'
      })
    }
  }
  Difficulty.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Difficulty',
    tableName: TableNames.difficulty
  });
  return Difficulty;
};