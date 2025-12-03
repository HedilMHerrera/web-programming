const Subcategory = require('../models/subcategory');
const Category = require('../models/category');
const mongoose = require('mongoose');
exports.list = async (req, res, next) => {
    try {
        const page = req.query.page ?? 1;
        const limit = req.query.limit ?? 10;
        const q = req.query.q;
        const categoryId = req.query.categoryId;

        const filter = {};

        if (q) filter.name = { $regex: q, $options: 'i' };
        if (categoryId) filter.categoryId = categoryId;

        const total = await Subcategory.countDocuments(filter);
        const pages = Math.ceil(total / limit) || 1;

        if (page > pages) {
            return res.status(400).json({
                success: false,
                message: `La pagina ${page} no existe. Solo hay ${pages} pagina(s)`,
            });
        }

        const items = await Subcategory.find(filter)
            .populate('categoryId', 'name')
            .sort('name')
            .skip((page - 1) * limit)
            .limit(limit);

        return res.json({
            total,
            page,
            limit,
            pages: Math.ceil(total / limit) || 1,
            data: items
        });

    } catch (err) {
        return next(err);
    }
};

exports.get = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'ID invalido' });
    }

    const item = await Subcategory.findById(id).populate('categoryId', 'name');

    if (!item) return res.status(404).json({ error: 'No encontrado' });

    res.json(item);
};

exports.create = async (req, res) => {
    try {
        const categoryExists = await Category.findById(req.body.categoryId);
        if (!categoryExists) {
            return res.status(400).json({ error: 'La categoría no existe' });
        }

        const item = new Subcategory(req.body);
        await item.save();
        res.status(201).json(item);

    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.update = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'ID invalido' });
    }

    try {
        if (req.body.categoryId) {
            const categoryExists = await Category.findById(req.body.categoryId);
            if (!categoryExists) {
                return res.status(400).json({ error: 'La categoría no existe' });
            }
        }

        const item = await Subcategory.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true
        });

        if (!item) return res.status(404).json({ error: 'No encontrado' });

        res.json(item);

    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.remove = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'ID invalido' });
    }

    const item = await Subcategory.findByIdAndDelete(id);

    if (!item) return res.status(404).json({ error: 'No encontrado' });

    res.json({ success: true });
};
