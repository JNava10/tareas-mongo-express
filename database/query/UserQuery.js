require('dotenv').config()
const { Sequelize, Op, QueryTypes} = require('sequelize');
const models = require('../../models');
const SequelizeConnection = require("../ConexionSequelize");
const tableNames = require('../../helpers/tableNames');
const {response} = require("express");
const bcrypt = require("bcrypt");
const {generarJWT: generateToken} = require("../../helpers/generate_jwt");
const {Common} = require("../../helpers/common");

class UserQuery {
    static find = async (id) => {
        const sequelizeConnection = new SequelizeConnection();

        sequelizeConnection.connect();

        let result = await models.User.findByPk(id);

        sequelizeConnection.disconnect();

        if (!result) {
            return false;
        }

        return result;
    }

    static idExists = async (id) => {
        const sequelizeConnection = new SequelizeConnection();

        try {
            sequelizeConnection.connect();
            let result = await models.User.findByPk(id);
            sequelizeConnection.disconnect();

            return result === {};
        } catch (error) {
            sequelizeConnection.disconnect();

            console.log(error);

            throw error;
        }
    }

    static checkLoginCredentials = async (email, password, user) => {
        console.log(user)
        let passwordIsValid = await bcrypt.compare(password, user.password);

        if (passwordIsValid) {
            return generateToken(user.id)
        } else {
            return false;
        }
    }

    static emailExists = async (email) => {
        const sequelizeConnection = new SequelizeConnection();
        sequelizeConnection.connect();

        let result = await models.User.findOne({where: {email: email}});

        sequelizeConnection.disconnect();

        if (!result) {
            return false;
        }

        return result;
    }

    static save = async (requestBody) => {
        let userExists = await UserQuery.emailExists(requestBody.email);
        if (userExists) return false;

        const sequelizeConnection = new SequelizeConnection();
        sequelizeConnection.connect();

        let isCreated = await models.User.create(requestBody);

        sequelizeConnection.disconnect();

        if (!isCreated) {
            throw new Error();
        }

        return isCreated;
    }

    static modify = async (requestBody) => {
        const sequelizeConnection = new SequelizeConnection();

        try {
            sequelizeConnection.connect();

            let update = await models.User.update(requestBody, {
                where: {id: requestBody.id}
            });

            console.log(update)

            let isUpdated = update[0] === 1;

            if (!isUpdated) {
                throw new Error('Error en la actualización.');
            }

            sequelizeConnection.disconnect();

            return update;
        } catch (error) {
            sequelizeConnection.disconnect();

            throw error;
        }
    };

    static delete = async (requestBody) => {
        try {
            sequelizeConnection.connect();

            let deleted = await models.User.destroy({
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
}

module.exports = UserQuery;