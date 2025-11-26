const mongoose = require('mongoose');

const AgeRangeSchema = new mongoose.Schema({
    minAge: { type: Number, required: true },
    maxAge: { type: Number, required: true },
    description: { type: String },
}, { timestamps: true });

AgeRangeSchema.index({ minAge: 1, maxAge: 1 }, { unique: true });

AgeRangeSchema.pre('validate', function (next) {
    if (this.minAge == null || this.maxAge == null)
        return next();
    if (this.minAge > this.maxAge)
        return next(new Error('minAge debe ser menor o igual que maxAge'));
    next();
});

module.exports = mongoose.model('AgeRange', AgeRangeSchema);
