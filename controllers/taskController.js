const {response, request} = require('express');
const {Common} = require("../helpers/common");
const models = require('../models/index.js');

class TaskController {
    static find = async (req, res = response) => {
        try {
            return await models.task.find(req, res);
        } catch (error) {
            let response = Common.getStandardResponse(200, error)
            return res.status(200).json(response)
        }
    };
}

module.exports = {
    TaskController
};