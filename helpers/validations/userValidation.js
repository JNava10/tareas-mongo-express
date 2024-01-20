const {body} = require('express-validator');
const Validator = require("../validator");

const userInsertFields = [
    body('name').notEmpty().isString(),
    body('email').notEmpty().isEmail(),
    body('password').notEmpty().isString(),
    body('firstLastName').notEmpty().isString(),
    body('secondLastName').notEmpty().isString(),
    Validator.validateFields
]

module.exports = {
    userInsertFields
}