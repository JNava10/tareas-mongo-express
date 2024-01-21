const {response, request} = require('express');
const {Common} = require("../helpers/common");
const UserQuery = require("../database/query/UserQuery");
const TaskQuery = require("../database/query/TaskQuery");
const bcrypt = require("bcrypt");

class UserController {
    static find = async (req, res = response) => {
        let user = await UserQuery.checkLoginCredentials(req.body.email, req.body.password);
        let response = Common.getStandardResponse(200, user);

        return res.status(200).json(response);
    };

    static save = async (req, res = response) => {
        req.body = await UserController.hashPasswordIfExists(req.body);

        let user = await UserQuery.save(req.body);
        let response = Common.getStandardResponse(200, user);

        return res.status(200).json(response);
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
            let itemDeleted =  await UserQuery.delete(req.body)
            let isDeleted = itemDeleted === 1;

            let response = Common.getStandardResponse(200, {itemDeleted: isDeleted});

            return res.status(200).json(response);
        } catch (error) {
            let response = Common.getStandardResponse(500, error)
            return res.status(200).json(response)
        }
    };

    // static emailExists = async (email = '') => {
    //     return await UserQuery.emailExists(email);
    // }
}

module.exports = {
    UserController
};