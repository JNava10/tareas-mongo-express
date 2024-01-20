require('dotenv').config()
const { Sequelize, Op, QueryTypes} = require('sequelize');
const models = require('../../models');
const SequelizeConnection = require("../ConexionSequelize");
const sequelizeConnection = new SequelizeConnection();
const tableNames = require('../../helpers/tableNames');

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

    static emailExists = async (email) => {
        sequelizeConnection.connect();

        let result = await models.User.findOne({where: {email: email}});

        sequelizeConnection.disconnect();

        if (!result) {
            throw new Error('Email not exists.');
        }

        return result;
    }

    static save = async (requestBody) => {
        sequelizeConnection.connect();

        let isCreated = await models.User.create(requestBody);

        sequelizeConnection.disconnect();

        if (!isCreated) {
            throw new Error();
        }

        return isCreated;
    }
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

