const jwt = require('jsonwebtoken');
const {Common} = require("../helpers/common");

const validateToken = (req , res , next) => {
    const token = req.header('x-token');

    if (!token){
        const response = Common.getStandardResponse(401, 'Debe introducirse el token en la peticion.')

        return res.status(401).json(response);
    }

    try {
        const {userId} = jwt.verify(token, process.env.PRIVATE_TOKEN_KEY);

        req.userId = userId;
        next();
    } catch (error){
        const response = Common.getStandardResponse(401, 'Token no valido.');

        return res.status(401).json(response);
    }
}

module.exports = {
    validateToken
}