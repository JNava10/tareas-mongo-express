const Task = require('../../models/task');
const {uniqueDuplicatedCode} = require("../../helpers/constants");

const create = async (req, res) => {
    try {
        console.log(req.body)
        return await Task.create(req.body);
    } catch (error) {
        console.log(error);

        if (error.code === uniqueDuplicatedCode) return false
        else return null
    }
}

 const assign = async (req, res) => {
     try {
         return await UserTask.create(req.body);
     } catch (error) {
         if (error.code === uniqueDuplicatedCode) return false
         else return null
     }
 }

module.exports = {
    create
}
