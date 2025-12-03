function hasRole(role) {
    return (req, res, next) => {
        const roles = (req.user && req.user.roles) || [];
        
        if (!roles.includes(role))
            return res.status(403).json({ success: false, message: 'Acceso no permitido' });
        next();
    };
}

function hasAnyRole(list) {
    return (req, res, next) => {
        const roles = (req.user && req.user.roles) || [];
        const ok = list.some(r => roles.includes(r));

        if (!ok)
            return res.status(403).json({ success: false, message: 'Acceso no permitido' });
        next();
    };
}

module.exports = { hasRole, hasAnyRole };
