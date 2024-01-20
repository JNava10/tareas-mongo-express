const jwt = require('jsonwebtoken')


const generarJWT = (userId) => {
    return jwt.sign({userId}, process.env.PRIVATE_TOKEN_KEY, {
        expiresIn: '4h'
    });
}

module.exports ={
    generarJWT
}

/*

Para revocar tokens no hay instruccions establecidas. Se pueden usar técnicas de programación para saber aquellos que están revocados. Ejemplo:

let blacklistedTokens = [];

const revokeToken = (token) => {
    blacklistedTokens.push(token);
 }

 const verifyToken = (token) => {
    if (blacklistedTokens.includes(token)) {
        throw new Error('Token has been revoked');
    }

    // Verificar el token...
}
*/