const UserQuery = require("../../../database/query/UserQuery");

const userExists = async (userId) => {
    let exists = await UserQuery.exists(userId);

    if (!exists) throw new Error('User not exists.');
    else console.log('Not exists')
}

module.exports = {
    checkIfUserExists: userExists
}