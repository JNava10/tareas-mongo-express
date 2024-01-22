
require('dotenv').config()
const { Sequelize, Op, QueryTypes} = require('sequelize');
const models = require('../../models');
const SequelizeConnection = require("../ConexionSequelize");
const sequelizeConnection = new SequelizeConnection();
const tableNames = require('../../helpers/tableNames');
const {response} = require("express");
const {Common} = require("../../helpers/common");

class UserQuery {
    static find = async (id) => {
        sequelizeConnection.connect();

        let result = await models.User.findByPk(id);

        sequelizeConnection.disconnect();

        if (!result) {
            throw new Error();
        }

        return result;
    }

    static create = async (requestBody) => {
        sequelizeConnection.connect();

        let isCreated = await models.Task.create(requestBody);

        sequelizeConnection.disconnect();

        if (!isCreated) {
            throw new Error();
        }

        return isCreated;
    }

    static modify = async (requestBody) => {
        try {
            sequelizeConnection.connect();

            let updated = await models.Task.update(requestBody, {
                where: {id: requestBody.id}
            });

            sequelizeConnection.disconnect();

            if (!updated) {
                throw new Error();
            }

            return updated;
        } catch (error) {
            return error.message
        }
    };

    static delete = async (requestBody) => {
        try {
            sequelizeConnection.connect();

            let deleted = await models.Task.destroy({
                where: {id: requestBody.id}
            });

            sequelizeConnection.disconnect();

            if (!deleted) {
                throw new Error();
            }

            return deleted;
        } catch (error) {
            return error.message
        }
    };

    // static checkIfDifficultyExists = (requestBody) => {
    //
    // };
}

module.exports = UserQuery;