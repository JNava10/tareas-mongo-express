'use strict';
const {
  Model
} = require('sequelize');
const TableNames = require("../helpers/tableNames");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({ // Like Laravel fillable field
    name: DataTypes.STRING,
    firstLastName: DataTypes.STRING,
    secondLastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'User',
    tableName: TableNames.user,
    paranoid: true
  });
  return User;
};