const {response, request} = require('express');
const {Common} = require("../helpers/common");
const UserQuery = require("../database/query/UserQuery");
const TaskQuery = require("../database/query/TaskQuery");
const bcrypt = require("bcrypt");

class UserController {
    static find = async (req, res = response) => {
        const user = await UserQuery.find(req.params.id);

        if (!user) {
            return res.status(404).json(
                Common.getStandardResponse(404)
            );
        }

        return res.status(200).json(
            Common.getStandardResponse(200, user)
        );
    };

    static findAll = async (req, res = response) => {
        const users = await UserQuery.findAll();

        if (!users) {
            return res.status(404).json(users);
        }

        return res.status(200).json(users);
    };

    static save = async (req, res = response) => {
        req.body = await UserController.hashPasswordIfExists(req.body);

        let user = await UserQuery.createUser(req);

        if (!user) {
            return res.status(400).json("No se ha creado el usuario.");
        }

        return res.status(200).json(user);
    };

    static modify = async (req, res = response) => {
        try {
            req.body = await UserController.hashPasswordIfExists(req.body);

            let itemUpdated = await UserQuery.modify(req.body);

            let isUpdated = !itemUpdated.length < 1;

            let response = Common.getStandardResponse(200, {updated: isUpdated});

            return res.status(200).json(response);
        } catch (error) {
            let response = Common.getStandardResponse(500, error)
            console.log(error);
            return res.status(200).json(response)
        }
    };

    static hashPasswordIfExists = async (requestBody) => {
        if (requestBody.password) {
            requestBody.password = await bcrypt.hash(requestBody.password, 10);
        }

        return requestBody;
    }

    static delete = async (req, res = response) => {
        try {
            let user = await UserQuery.idExists(req.body.id);

            console.log(user)

            if (!user) {
                return res.status(404).json(
                    Common.getStandardResponse(404)
                );
            }

            let itemDeleted =  await UserQuery.delete(req.body)
            let isDeleted = itemDeleted === 1;

            let response = Common.getStandardResponse(200, {itemDeleted: isDeleted});

            return res.status(200).json(response);
        } catch (error) {
            let response = Common.getStandardResponse(500, error)
            return res.status(200).json(response)
        }
    };
}

module.exports = {
    UserController
};