const jwt = require('jsonwebtoken')


const generarJWT = (uid = '') => {
    let token = jwt.sign({ uid }, process.env.SECRETORPRIVATEKEY, {
        expiresIn: '4h'
      });
    return token;
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