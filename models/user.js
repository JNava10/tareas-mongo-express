const mongoose = require('mongoose');
const collectionNames = require('../helpers/collectionNames');

const userSchema = new mongoose.Schema({
    email: { type: String, unique: true },
    password: { type: String },
    name: { type: String },
    surname: { type: String },
    secondSurname: { type: String },
}, { collection: collectionNames.user , versionKey: false });

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;