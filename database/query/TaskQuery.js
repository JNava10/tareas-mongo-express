const Task = require('../../models/task');
const {uniqueDuplicatedCode} = require("../../helpers/constants");
const UserModel = require("../../models/user");
const errorCodes = require("../../helpers/customErrorCodes");
const TaskModel = require("../../models/task");

const createTask = async (req) =>  {
    try {
        const createdTask = await TaskModel.create(req.body);

        return createdTask;
    } catch (error) {
        if (error.code === errorCodes.DUPLICATE_KEY_ERROR) return "Ese nombre ya existe."

        return error.message;
    }
}

const listTask = async (req) =>  {
    try {
        const rows = await UserModel.find({email: req.body.email});
        const foundUser = rows[0];

        if (!foundUser) return false

        return {item: foundUser}
    } catch (error) {
        // if (error.code === errorCodes.DUPLICATE_KEY_ERROR) return {
        //     inserted: false,
        //     error: "Se ha intentado insertar un email duplicado."
        // }

        return {
            executed: false,
            error: error.message
        }
    }
}

const modifyTask = async (req) =>  {
    try {
        const userExists = await listTask(req)

        if (!userExists.item) return "Usuario no encontrado."

        const updatedUser = await UserModel.updateOne(
            {email: req.body.email},
            req.body,
            { new: false }
        );

        if (!updatedUser) return false

        return {item: updatedUser}
    } catch (error) {
        if (error.code === errorCodes.DUPLICATE_KEY_ERROR) return {
            inserted: false,
            error: "Se ha intentado insertar un email duplicado."
        }

        return {
            executed: false,
            error: error.message
        }
    }
}

const deleteTask = async (req) => {
    try {
        const userExists = await listTask(req)

        if (!userExists.item) return "Tarea no encontrada."

        const deletedUser = await TaskModel.deleteOne(
            {name: req.body.name},
            req.body,
            { new: false }
        );

        if (!deletedUser) return false;

        return {deleted: deletedUser.acknowledged};
    } catch (error) {
        return {
            executed: false,
            error: error.message
        }
    }
}


module.exports = {
    create
}
