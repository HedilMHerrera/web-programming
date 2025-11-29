module.exports = (err, req, res, next) => {

    let status = 500;
    let payload = { success: false, message: 'Error interno del servidor' };

    if (!err) return next();

    if (err.name === 'ValidationError') {
        status = 400;
        const errors = Object.keys(err.errors || {}).map(field => ({ field, message: err.errors[field].message }));
        payload = { success: false, message: 'Errores de validación', errors };

    } else if (err.name === 'MongoServerError' || err.code === 11000) {
        status = err.code === 11000 ? 409 : 500;
        
        const dupFields = err.keyValue ? Object.keys(err.keyValue) : [];
        payload = {
            success: false,
            message: err.code === 11000 ? 'Error de clave duplicada' : 'Error de MongoDB',
            errors: dupFields.map(f => ({ field: f, message: `Valor duplicado en ${f}` })),
        };

    } else if (err.name === 'JsonWebTokenError') {
        status = 401;
        payload = { success: false, message: 'Token inválido' };

    } else if (err.name === 'TokenExpiredError') {
        status = 401;
        payload = { success: false, message: 'Token expirado' };
        
    } else if (err.status && typeof err.status === 'number') {
        status = err.status;
        payload = { success: false, message: err.message || 'Error' };
        if (err.errors) payload.errors = err.errors;
    } else {
        payload = { success: false, message: err.message || payload.message };
    }

    return res.status(status).json(payload);
};
