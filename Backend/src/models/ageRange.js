const mongoose = require('mongoose');

const AgeRangeSchema = new mongoose.Schema({
    range: {type: String, required: true, unique: true},
    description: {type: String},
}, {timestamps: true});

module.exports = mongoose.model('AgeRange', AgeRangeSchema);
