const AgeRange = require('../models/ageRange');

exports.list = async (req, res, next) => {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit) || 10));
    const q = req.query.q;

    const filter = {};
    if (q) {
        filter.description = { $regex: q, $options: 'i' };
    }

    try {
        const total = await AgeRange.countDocuments(filter);
        const items = await AgeRange.find(filter)
            .sort('minAge')
            .skip((page - 1) * limit)
            .limit(limit);

        res.json({ total, page, limit, pages: Math.ceil(total / limit) || 1, data: items });
    } catch (err) {
        return next(err);
    }
};

exports.get = async (req, res, next) => {
    const { id } = req.params;
    try {
        const item = await AgeRange.findById(id);
        if (!item) {
            const e = new Error('No encontrado');
            e.status = 404;
            return next(e);
        }
        res.json(item);
    } catch (err) {
        return next(err);
    }
};

exports.create = async (req, res, next) => {
    try {
        const item = new AgeRange(req.body);
        const saved = await item.save();
        res.status(201).json(saved);
    } catch (err) {
        return next(err);
    }
};

exports.update = async (req, res, next) => {
    const { id } = req.params;
    try {
        const item = await AgeRange.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        if (!item) {
            const e = new Error('No encontrado');
            e.status = 404;
            return next(e);
        }
        res.json(item);
    } catch (err) {
        return next(err);
    }
};

exports.remove = async (req, res, next) => {
    const { id } = req.params;
    try {
        const item = await AgeRange.findByIdAndDelete(id);
        if (!item) {
            const e = new Error('No encontrado');
            e.status = 404;
            return next(e);
        }
        res.json({ success: true });
    } catch (err) {
        return next(err);
    }
};