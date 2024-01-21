require('dotenv').config()
const { Sequelize, Op, QueryTypes} = require('sequelize');
const models = require('../../models');
const SequelizeConnection = require("../ConexionSequelize");
const tableNames = require('../../helpers/tableNames');
const {response} = require("express");

class UserQuery {
    static find = async (id) => {
        const sequelizeConnection = new SequelizeConnection();

        sequelizeConnection.connect();

        let result = await models.User.findByPk(id);

        sequelizeConnection.disconnect();

        if (!result) {
            throw new Error();
        }

        return result;
    }

    static exists = async (id) => {
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

    static checkLoginCredentials = async (email, password) => {
        const sequelizeConnection = new SequelizeConnection();
        sequelizeConnection.connect();

        let result = await models.User.findOne(
            {
                where: [
                    {email: email},
                    {password: password}
                ]
            }
        );

        sequelizeConnection.disconnect();

        if (!result) {
            throw new Error('Credenciales no validas');
        }

        return result;
    }

    static emailExists = async (email, password) => {
        const sequelizeConnection = new SequelizeConnection();
        sequelizeConnection.connect();

        let result = await models.User.findOne({where: {email: email}});

        sequelizeConnection.disconnect();

        if (!result) {
            throw new Error('Email not exists.');
        }

        return result;
    }

    static save = async (requestBody) => {
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