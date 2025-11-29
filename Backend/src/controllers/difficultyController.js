const Difficulty = require('../models/difficulty');

exports.list = async (req, res, next) => {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit) || 10));
    const q = req.query.q;

    const filter = {};
    if (q) filter.level = { $regex: q, $options: 'i' };

    try {
        const total = await Difficulty.countDocuments(filter);
        const items = await Difficulty.find(filter)
            .sort('level')
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
        const item = await Difficulty.findById(id);
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
        const item = new Difficulty(req.body);
        await item.save();
        res.status(201).json(item);
    } catch (err) {
        return next(err);
    }
};

exports.update = async (req, res, next) => {
    const { id } = req.params;
    try {
        const item = await Difficulty.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
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
        const item = await Difficulty.findByIdAndDelete(id);
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
