const { body, param } = require('express-validator');

const ALLOWED_ROLES = ['admin', 'editor', 'gestor', 'estudiante'];

module.exports = {
    getById: [
        param('id').isMongoId().withMessage('El parámetro "id" debe ser un ObjectId válido'),
    ],

    update: [
        param('id').isMongoId().withMessage('El parámetro "id" debe ser un ObjectId válido'),

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

    
};
