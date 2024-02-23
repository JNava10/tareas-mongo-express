const {response, request} = require('express');
const {Common} = require("../helpers/common");
const TaskQuery = require("../database/query/TaskQuery");
const UserQuery = require("../database/query/UserQuery");

class TaskController {
    static find = async (req, res = response) => {
        try {
            return await TaskQuery.listTask(req);
        } catch (error) {
            return res.status(200).json({error: error.message})
        }
    };

    // static findAll = async (req, res = response) => {
    //     try {
    //         let data = await TaskQuery.findAll();
    //
    //         // const response = Common.getStandardResponse(200, data)
    //         return res.status(200).json({data: data})
    //     } catch (error) {
    //         console.log(error);
    //
    //         const data = {
    //             error:  error.message
    //         }
    //
    //         const response = Common.getStandardResponse(500, data)
    //         return res.status(200).json(response)
    //     }
    // };

    static save = async (req, res = response) => {
        try {
            const insertedItem = await TaskQuery.createTask(req);

            return res.status(200).json(insertedItem);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    };

    static modify = async (req, res = response) => {
        try {
            const itemUpdated = await TaskQuery.modifyTask(req);

            return res.status(200).json(itemUpdated);
        } catch (error) {
            console.log(error);
            return res.status(200).json({error: error.message})
        }
    };

    static delete = async (req, res = response) => {
        try {
            let itemDeleted =  await TaskQuery.deleteTask(req);
            return res.status(200).json(itemDeleted);
        } catch (error) {
            return res.status(200).json({error: error.message})
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