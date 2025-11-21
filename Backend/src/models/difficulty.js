const mongoose = require('mongoose');

const DifficultySchema = new mongoose.Schema({
  level: { type: String, required: true, unique: true},
  description: { type: String},
}, {timestamps: true});

module.exports = mongoose.model('Difficulty', DifficultySchema);