const {body} = require('express-validator');
const Validator = require("../../helpers/validator");
const {UserController} = require("../../controllers/userController");
const {validateToken} = require("../validateToken");
const TaskQuery = require("../../database/query/TaskQuery");

// Field format validations //

const idFormat = [
    body('id', 'No se ha introducido el ID.').exists(),
    body('id', 'El ID debe ser un numero.').isInt(),
];

const descriptionFormat = [
    body('description', 'No se ha introducido la descripción.').exists(),
    body('description', 'La descripción debe tener un formato adecuado.').isString(),
];

const difficultyFormat = [
    body('difficulty', `La dificultad debe tener un formato adecuado.`).isString(),
    body('difficulty', 'No se ha introducido la dificultad.').exists(),
];

const estimatedHoursFormat = [
    body('estimatedHours', 'La horas estimadas deben ser un numero.').isInt(),
    body('estimatedHours').exists(),
];

const workedHoursFormat = [
    body('estimatedHours', 'La horas estimadas deben ser un numero.').isInt(),
    body('estimatedHours').exists(),
];

const realizedPercentageFormat = [
    body('realizedPercentage', 'La horas estimadas deben ser un numero.').isInt().isLength({min: 0, max: 100}),
    body('realizedPercentage').exists(),
];

// Value validations //

const difficultyExists = () => {
    body('difficulty').custom(TaskQuery.checkIfDifficultyExists)
}

// const taskInsert = [
//     ...nameFormat,
//     ...emailFormat,
//     ...passwordFormat,
//     ...firstLastnameFormat,
//     ...secondLastnameFormat,
//     Validator.validateFields,
//     tokenValidation
// ];

const taskUpdate = [
    ...idFormat,
    ...descriptionFormat,
    ...difficultyFormat,
    ...estimatedHoursFormat,
    ...workedHoursFormat,
    ...realizedPercentageFormat,
    Validator.validateFields
];

const taskInsert = [
    ...descriptionFormat,
    ...difficultyFormat,
    ...estimatedHoursFormat,
    Validator.validateFields
];

const taskDelete = [
    ...idFormat,
    Validator.validateFields
];

const taskGet = [
    ...idFormat,
    Validator.validateFields
];


module.exports = {
    taskUpdate,
    taskInsert,
    taskDelete,
    taskGet
}