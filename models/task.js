const mongoose = require('mongoose');
const collectionNames = require('../helpers/collectionNames');

const taskSchema = new mongoose.Schema({
    id: { type: String, unique: true },
    name: { type: String },
    description: { type: String },
    difficulty: { type: String },
    plannedHours: { type: Number , default: 0  },
    workedHours: { type: Number , default: 0  },
    realizedPercentage: { type: Number, default: 0  },
    ended: { type: Boolean, default: false },
}, { collection: collectionNames.user , versionKey: false });

const UserModel = mongoose.model('User', taskSchema);

module.exports = UserModel;