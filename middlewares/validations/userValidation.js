const {body} = require('express-validator');
const Validator = require("../../helpers/validator");
const {UserController} = require("../../controllers/userController");

// Range constants //

const minName = 2;
const maxName = 15;

// Field exists validations //

// const emailExists = async (email) => {
//     body('email').custom(await UserController.emailExists(email))
// }

// Field format validations //

const emailFormat = [
    body('email', 'No se ha introducido el email').exists(),
    body('email', 'El email debe tener un formato adecuado.').isEmail(),
];

const nameFormat = [
    body('name', `El nombre debe tener un formato adecuado (${minName}-${maxName}).`).isString().isLength({max: maxName, min: minName}),
    body('name', 'No se ha introducido el email').exists(),
]

const passwordFormat = [
    body('password', 'La contraseña debe tener un formato adecuado.').isString(),
    body('password').exists(),
];

const firstLastnameFormat = [
    body('firstLastName').isString(),
    body('firstLastName').exists(),
];

const secondLastnameFormat = [
    body('secondLastName').isString(),
    body('secondLastName').exists(),
];

// Body validations //

const userInsertFields = [
    ...nameFormat,
    ...emailFormat,
    ...passwordFormat,
    ...firstLastnameFormat,
    ...secondLastnameFormat,
    Validator.validateFields
];

module.exports = {
    userInsertFields
}