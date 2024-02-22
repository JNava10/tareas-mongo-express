const UserModel = require('../../models/user')
const errorCodes = require('../../helpers/customErrorCodes')

const createUser = async (req) =>  {
    try {
        const createdUser = await UserModel.create(req.body);

        return createdUser;
    } catch (error) {
        if (error.code === errorCodes.DUPLICATE_KEY_ERROR) return "Se ha intentado insertar un email duplicado."

        return error.message
    }
}

const listUser = async (req) =>  {
    try {
        const rows = await UserModel.find({email: req.body.email});
        const findedUser = rows[0];

        if (!findedUser) return false

        return {item: findedUser}
    } catch (error) {
        if (error.code === errorCodes.DUPLICATE_KEY_ERROR) return {
            inserted: false,
            error: "Se ha intentado insertar un email duplicado."
        }

        return {
            inserted: false,
            error: error.message
        }
    }
}

const modifyUser = async (req) =>  {
    try {
        const rows = await UserModel.updateOne(
            {email: req.body.email},
            req.body,
            { new: false }
        );

        const updatedUser = rows[0]

        if (!updatedUser) return false

        return {item: updatedUser}
    } catch (error) {
        if (error.code === errorCodes.DUPLICATE_KEY_ERROR) return {
            inserted: false,
            error: "Se ha intentado insertar un email duplicado."
        }

        return {
            inserted: false,
            error: error.message
        }
    }
}
module.exports = {
    createUser,
    listUser,
    modifyUser,
}
