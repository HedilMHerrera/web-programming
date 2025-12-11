const User = require('../models/user');
const { signAccessToken } = require('../services/jwtService');

exports.register = async (req, res, next) => {
    try {
        if (!req.user || !req.user.roles || !req.user.roles.includes('admin')) {
            return res.status(403).json({ success: false, message: 'Solo admin puede crear usuarios' });
        }

        const { name, email, password, roles } = req.body;
        const user = new User({ name, email, password, roles: roles || ['estudiante'] });
        await user.save();

        return res.status(201).json({ success: true, data: { user: user.toJSON() } });
    
    } catch (err) {
        next(err);
    }
};

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user)
            return res.status(401).json({ success: false, message: 'Credenciales inválidas' });

        const match = await user.comparePassword(password);
        if (!match)
            return res.status(401).json({ success: false, message: 'Credenciales invalidas' });

        const accessToken = signAccessToken({ id: user._id, roles: user.roles });

        return res.json({ success: true, data: { user: user.toJSON(), tokens: { accessToken } } });
    
    } catch (err) {
        next(err);
    }
};

exports.logout = async (req, res, next) => {
    try {
        return res.json({ success: true, message: 'Logout (borra el token en cliente)' });
    
    } catch (err) {
        next(err);
    }
};

exports.me = async (req, res, next) => {
    try {
        if (!req.user)
            return res.status(401).json({ success: false, message: 'No autorizado' });
        
        return res.json({ success: true, data: req.user });
    
    } catch (err) {
        next(err);
    }
};
