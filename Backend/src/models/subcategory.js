const mongoose = require('mongoose');

const SubcategorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    }

}, { timestamps: true });
SubcategorySchema.index({ name: 1, categoryId: 1 }, { unique: true });

module.exports = mongoose.model('Subcategory', SubcategorySchema);
