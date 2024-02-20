const {response, request} = require('express');
const {Common} = require("../helpers/common");
const models = require('../models/index.js');
const TaskQuery = require("../database/query/TaskQuery");

class TaskController {
    static find = async (req, res = response) => {
        try {
            return await TaskQuery.find(req.params.id);
        } catch (error) {
            let response = Common.getStandardResponse(500, error)
            return res.status(200).json(response)
        }
    };

    static findAll = async (req, res = response) => {
        try {
            let data = await TaskQuery.findAll();

            // const response = Common.getStandardResponse(200, data)
            return res.status(200).json({data: data})
        } catch (error) {
            console.log(error);

            const data = {
                error:  error.message
            }

            const response = Common.getStandardResponse(500, data)
            return res.status(200).json(response)
        }
    };

    static save = async (req, res = response) => {
        try {
            let insertedItem = await TaskQuery.create(req.body);
            let response = Common.getStandardResponse(200, {savedId: insertedItem.id});

            return res.status(200).json(response);
        } catch (error) {
            let response = Common.getStandardResponse(500, error);
            return res.status(200).json(response);
        }
    };

    static modify = async (req, res = response) => {
        try {
            let itemUpdated = await TaskQuery.modify(req.body);
            let isUpdated = !itemUpdated.length < 1;

            let response = Common.getStandardResponse(200, {updated: isUpdated});

            return res.status(200).json(response);
        } catch (error) {
            let response = Common.getStandardResponse(500, error)
            console.log(error);
            return res.status(200).json(response)
        }
    };

    static delete = async (req, res = response) => {
        try {
            let itemDeleted =  await TaskQuery.delete(req.body)
            let isDeleted = itemDeleted === 1;

            let response = Common.getStandardResponse(200, {itemDeleted: isDeleted});

            return res.status(200).json(response);
        } catch (error) {
            let response = Common.getStandardResponse(500, error)
            return res.status(200).json(response)
        }
    };


    static assign = async (req, res = response) => {
        try {
            const { user, task } = req.body;

            TaskQuery.assignTask(user, task);

        } catch (error) {
            return res.status(200).json({})
        }
    };
}

module.exports = {
    TaskController
};