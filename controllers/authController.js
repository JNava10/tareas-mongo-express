const {Task} = require("../models/Task");
const {response, request} = require('express');
const {Common} = require("../helpers/common");
const {Difficulty} = require("../models/Difficulty");

class AuthController {
    static save = async (req, res = response) => {
        const task = new User(
            req.body.description,
            req.body.difficulty
        );

        const saveData = await Task.save(task, Task);
        const response = Common.getStandardResponse(200, saveData);

        res.status(200).json(response);
    };
}

module.exports = {
    AuthController
};