const { verifyAccessToken } = require('../services/jwtService');
const User = require('../models/user');

async function verifyToken(req, res, next) {
    try {
        const header = req.headers['authorization'];
        if (!header)
            return res.status(401).json({ success: false, message: 'No autorizado' });

        const token = header.replace('Bearer ', '');
        const decoded = verifyAccessToken(token);
        const user = await User.findById(decoded.id).select('-password');

        if (!user)
            return res.status(401).json({ success: false, message: 'Usuario no encontrado' });
        req.user = user;
        next();

    } catch (err) {
        next(err);
    }
}

module.exports = { verifyToken };
