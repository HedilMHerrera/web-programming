const Category = require('../models/category');
const mongoose = require('mongoose');

exports.list = async (req, res) => {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit) || 10));
    const q = req.query.q;

    const filter = {};
    if (q) filter.name = { $regex: q, $options: 'i' }; 

    const total = await Category.countDocuments(filter);
    const items = await Category.find(filter)
        .sort('name')
        .skip((page - 1) * limit)
        .limit(limit);

    res.json({
        total,
        page,
        limit,
        pages: Math.ceil(total / limit) || 1,
        data: items,
    });
};

exports.get = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'ID invalido' });
    }
    const item = await Category.findById(id);
    if (!item) return res.status(404).json({ error: 'No encontrado' });
    res.json(item);
};

exports.create = async (req, res) => {
    try {
        const item = new Category(req.body);
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
        const item = await Category.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
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
    const item = await Category.findByIdAndDelete(id);
    if (!item) return res.status(404).json({ error: 'No encontrado' });
    res.json({ success: true });
};
