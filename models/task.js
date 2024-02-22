const mongoose = require('mongoose');
const collectionNames = require('../helpers/collectionNames');

const taskSchema = new mongoose.Schema({
    name: { type: String },
    description: { type: String },
    difficulty: { type: String },
    plannedHours: { type: Number , default: 0  },
    workedHours: { type: Number , default: 0  },
    realizedPercentage: { type: Number, default: 0  },
    ended: { type: Boolean, default: false },
}, { collection: collectionNames.task , versionKey: false });

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;