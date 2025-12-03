const { body } = require('express-validator');

const ALLOWED_ROLES = ['admin', 'editor', 'gestor', 'estudiante'];

module.exports = {
    register: [
        body('email')
            .exists({ checkFalsy: true })
            .withMessage('El campo "email" es obligatorio')
            .bail()
            .isEmail()
            .withMessage('Email inválido')
            .bail()
            .trim(),

        body('password')
            .exists({ checkFalsy: true })
            .withMessage('El campo "password" es obligatorio')
            .bail()
            .isLength({ min: 6 })
            .withMessage('La contraseña debe tener al menos 6 caracteres'),

        body('name')
            .optional()
            .isLength({ max: 100 })
            .withMessage('El nombre puede tener máximo 100 caracteres')
            .bail()
            .trim(),

        body('roles')
            .optional()
            .isArray()
            .withMessage('roles debe ser un arreglo')
            .bail()
            .custom((roles) => {
                for (const r of roles) {
                    if (!ALLOWED_ROLES.includes(r)) throw new Error(`Rol inválido: ${r}`);
                }
                if (roles.includes('estudiante') && (roles.includes('editor') || roles.includes('gestor'))) {
                    throw new Error('El rol estudiante no puede combinarse con editor o gestor');
                }
                return true;
            }),
    ],

    login: [
        body('email')
            .exists({ checkFalsy: true })
            .withMessage('El campo "email" es obligatorio')
            .bail()
            .isEmail()
            .withMessage('Email inválido')
            .bail()
            .trim(),

        body('password')
            .exists({ checkFalsy: true })
            .withMessage('El campo "password" es obligatorio'),
    ],
};
