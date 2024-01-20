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

    static save = async (requestBody) => {
        sequelizeConnection.connect();

        let isCreated = await models.Task.create(requestBody);

        sequelizeConnection.disconnect();

        if (!isCreated) {
            throw new Error();
        }

        return isCreated;
    }

    static create = async (req, res = response) => {
        try {
            sequelizeConnection.connect();

            let isCreated = models.task.create(req.body);

            sequelizeConnection.disconnect();

            if (!isCreated) {
                throw new Error(isCreated);
            }

            return isCreated;
        } catch (error) {
            return error.message
        }
    };

    static modify = async (req, res = response) => {
        try {
            sequelizeConnection.connect();

            let updated = await models.task.update(req.body, {
                where: {id: req.body.id}
            });

            sequelizeConnection.disconnect();

            if (!updated) {
                throw new Error();
            }

            return updated;
        } catch (error) {
            let response = Common.getStandardResponse(500, error)
            return res.status(200).json(response)
        }
    };

    static delete = async (req, res = response) => {
        try {
            sequelizeConnection.connect();

            let deleted = await models.task.destroy(req.body, {
                where: {id: req.body.id}
            });

            sequelizeConnection.disconnect();

            if (!deleted) {
                throw new Error();
            }

            return deleted;
        } catch (error) {
            let response = Common.getStandardResponse(500, error)
            return res.status(200).json(response)
        }
    };
}

module.exports = UserQuery;
//
// registrarUsuario = async(body) => {
//     let resultado = 0;
//     this.conectar();
//     try{
//         // const usuarioNuevo = new Persona(body); //Con esto añade los timeStamps.
//         // await usuarioNuevo.save();
//         const usuarioNuevo = await models.User.create(body);
//         resultado = 1; // Asume que la inserción fue exitosa
//     } catch (error) {
//         if (error instanceof Sequelize.UniqueConstraintError) {
//             console.log(`El id ${body.id} ya existe en la base de datos.`);
//         } else {
//             console.log('Ocurrió un error desconocido: ', error);
//         }
//         throw error;
//     } finally {
//         this.desconectar();
//     }
//     return resultado;
// }

