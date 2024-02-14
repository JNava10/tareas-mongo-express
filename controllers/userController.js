const {response, request} = require('express');
const {Common} = require("../helpers/common");
const TaskQuery = require("../database/query/TaskQuery");
const bcrypt = require("bcrypt");
const userQuery = require("../database/query/UserQuery");

const createUser = async (req, res = response) => {
    try {
        req.body.password = await bcrypt.hash(req.body.password, 10)

        const data = await userQuery.createUser(req, res)

        return res.status(200).json(data)
    } catch (error) {
        console.error(error);

        return res.status(500).json(false)
    }
}

module.exports = {
    createUser
}
