const {response, request} = require('express');
const {Common} = require("../helpers/common");
const UserQuery = require("../database/query/UserQuery");

class UserController {
    static find = async (req, res = response) => {
        let user = await UserQuery.checkLoginCredentials(req.body.email, req.body.password);
        let response = Common.getStandardResponse(200, user);

        return res.status(200).json(response);
    };

    static save = async (req, res = response) => {
        let user = await UserQuery.save(req.body);
        let response = Common.getStandardResponse(200, user);

        return res.status(200).json(response);
    };

    // static emailExists = async (email = '') => {
    //     return await UserQuery.emailExists(email);
    // }
}

module.exports = {
    UserController
};