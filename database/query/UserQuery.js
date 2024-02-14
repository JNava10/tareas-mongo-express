const UserModel = require('../../models/user')
const errorCodes = require('../../helpers/customErrorCodes')

const createUser = async (req) =>  {
    try {
        const createdUser = await UserModel.create(req.body, {aggregateErrors: true});

        return {inserted: true, item: createdUser}
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
    createUser
}
