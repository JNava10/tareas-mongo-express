const {response, request} = require('express');
const {Common} = require("../helpers/common");
const models = require('../models/index.js');
const UserTaskQuery = require("../database/query/UserTaskQuery");

class UserTaskController {
    static assign = async (req, res = response) => {
        try {
            const {id} = await UserTaskQuery.assign(req.body);

            return res.status(200).json(id)
        } catch (error) {
            return res.status(200).json({})
        }
    };
}

module.exports = {
    UserTaskController
};