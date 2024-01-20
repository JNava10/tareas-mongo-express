require('dotenv').config()
const { Sequelize, Op } = require('sequelize');
const models = require('../../../../../../Users/juann/Downloads/Asociaciones/Asociaciones/models'); //Esto tiene acceso a todos los modelos.

class SequelizeConnection {

    constructor() {
        this.db = new Sequelize(process.env.DB_DEV, process.env.DB_USER, process.env.DB_PASSWORD, {
            host: process.env.DB_HOST,
            dialect:process.env.DB_DIALECT, /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
            pool: {
                max: 5,
                min: 0,
                acquire: 30000,
                idle: 10000
             }
          });
    }

    /**
     * Sequelize will keep the connection open by default, and use the same connection for all queries. If you need to close the connection, 
     * call sequelize.close() (which is asynchronous and returns a Promise).
     */

    //https://sequelize.org/docs/v6/core-concepts/model-querying-basics/

    connect = () => {
        this.db.authenticate().then(() => {
            console.log('Connection has been established successfully.');
        }).catch((error) => {
            console.error('Unable to connect to the database: ', error);
        });
    }

    disconnect = () => {
        console.log('Disconnected');
        this.db.close();
    }

    getlistado = async() => {
        let resultado = [];
        this.connect();
        console.log(`Accediendo a los datos...`)
        resultado = await models.User.findAll({
            attributes: ['id', 'firstName', 'lastName', 'email']
          });
        this.disconnect();
        return resultado;
    }




    //----------------------------------------
    getComments = async() => {
        let resultado = [];
        this.connect();
        resultado = await models.Comment.findAll();
        this.disconnect();
        return resultado;
    }

    getCommentsId = async(idU) => {
        let resultado = [];
        this.connect();
        console.log(idU)
        resultado = await models.User.findAll({ 
            where: { id: { [Op.eq]: idU } },
            include: [{
              model: models.Comment,
              as: 'commentsUser'
            }],
            attributes: ['id', 'firstName', 'lastName', 'email']
           });
        this.disconnect();
        return resultado;
    }

    getRolesUsuario = async(idU) => {
        console.log(idU);
        const userWithRoles = await models.User.findByPk(idU, {
            include: [{
                model: models.Rol,
                as: 'roles',
                through: models.RolAsignado
            }]
            });
            
        console.log(userWithRoles)
        const roles = userWithRoles.roles; 
        roles.forEach(role => {
            console.log(role.desc);
        });
        console.log(roles);
        return roles;
    }
}

module.exports = SequelizeConnection;
