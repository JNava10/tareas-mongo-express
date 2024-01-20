const {response, request} = require('express');
const {Common} = require("../helpers/common");
const models = require('../models/index.js');
const TaskQuery = require("../database/query/TaskQuery");

class TaskController {
    static find = async (req, res = response) => {
        try {
            return await models.task.find(req.body.id);
        } catch (error) {
            let response = Common.getStandardResponse(500, error)
            return res.status(200).json(response)
        }
    };

    static save = async (req, res = response) => {
        try {
            // FIXME: Unknown column 'createdAt' in 'field list'.
            return await TaskQuery.save(req.body);
        } catch (error) {
            let response = Common.getStandardResponse(500, error)
            return res.status(200).json(response)
        }
    };

    static modify = async (req, res = response) => {
        try {
            return await models.task.update(req.body, {
                where: {id: req.body.id}
            });
        } catch (error) {
            let response = Common.getStandardResponse(500, error)
            return res.status(200).json(response)
        }
    };

    static delete = async (req, res = response) => {
        try {
            return await models.task.destroy(req.body, {
                where: {id: req.body.id}
            });
        } catch (error) {
            let response = Common.getStandardResponse(500, error)
            return res.status(200).json(response)
        }
    };

}

module.exports = {
    TaskController
};