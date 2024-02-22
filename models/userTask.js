const mongoose = require('mongoose');
const collectionNames = require('../helpers/collectionNames');

const userSchema = new mongoose.Schema({
    user: { type: Number, required: true },
    task: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    deletedAt: { type: Date, default: Date.now },
}, { collection: collectionNames.userTask , versionKey: false });

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;