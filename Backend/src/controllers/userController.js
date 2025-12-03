const User = require('../models/user');

exports.list = async (req, res, next) => {
    try {
        const users = await User.find().select('-password');
        res.json({ success: true, data: users });
    
    } catch (err) { next(err); }
};

exports.get = async (req, res, next) => {
    try {
        const id = req.params.id;
        const user = await User.findById(id).select('-password');
        
        if (!user) {
            const e = new Error('Usuario no encontrado');
            e.status = 404;
            return next(e);
        }

        if (!req.user.roles.includes('admin') && String(req.user._id) !== String(id)) {
            return res.status(403).json({ success: false, message: 'Acceso no permitido' });
        }
        res.json({ success: true, data: user });
        
    } catch (err) { next(err); }
};

exports.update = async (req, res, next) => {
    try {
        const id = req.params.id;

        if (!req.user.roles.includes('admin') && String(req.user._id) !== String(id)) {
            return res.status(403).json({ success: false, message: 'Acceso no permitido' });
        }

        const updates = { ...req.body };

        delete updates.password;

        const user = await User.findById(id);

        if (!user) {
            const e = new Error('Usuario no encontrado');
            e.status = 404;
            return next(e);
        }

        Object.keys(updates).forEach(k => { user[k] = updates[k]; });
        await user.save();
        const out = user.toObject(); delete out.password;
        res.json({ success: true, data: out });

    } catch (err) { next(err); }
};

exports.remove = async (req, res, next) => {
    try {
        if (!req.user.roles.includes('admin'))
            return res.status(403).json({ success: false, message: 'Acceso no permitido' });
        
        const id = req.params.id;
        const user = await User.findByIdAndDelete(id);
        
        if (!user) {
            const e = new Error('Usuario no encontrado');
            e.status = 404;
            return next(e);
        }
        res.json({ success: true, message: 'Usuario eliminado' });
        
    } catch (err) { next(err); }
};
