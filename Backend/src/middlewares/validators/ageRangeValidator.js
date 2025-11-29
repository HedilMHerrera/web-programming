const { body, param } = require('express-validator');

module.exports = {
    create: [
        body('minAge')
            .exists({ checkFalsy: true })
            .withMessage('El campo "minAge" es obligatorio')
            .bail()
            .isInt({ min: 0, max: 100 })
            .withMessage('El campo "minAge" debe ser un entero entre 0 y 100')
            .toInt(),

        body('maxAge')
            .exists({ checkFalsy: true })
            .withMessage('El campo "maxAge" es obligatorio')
            .bail()
            .isInt({ min: 0, max: 100 })
            .withMessage('El campo "maxAge" debe ser un entero entre 0 y 100')
            .toInt(),

        body('description')
            .optional()
            .isLength({ max: 255 })
            .withMessage('La "description" puede tener como máximo 255 caracteres')
            .bail()
            .trim(),

        body()
            .custom((_, { req }) => {
                const min = req.body.minAge;
                const max = req.body.maxAge;
                if (min != null && max != null && Number(min) >= Number(max)) {
                    throw new Error('minAge debe ser menor que maxAge');
                }
                return true;
            }),
    ],

    update: [
        param('id')
            .isMongoId()
            .withMessage('El parámetro "id" debe ser un ObjectId válido'),

        body('minAge')
            .optional()
            .isInt({ min: 0, max: 100 })
            .withMessage('El campo "minAge" debe ser un entero entre 0 y 100')
            .toInt(),

        body('maxAge')
            .optional()
            .isInt({ min: 0, max: 100 })
            .withMessage('El campo "maxAge" debe ser un entero entre 0 y 100')
            .toInt(),

        body('description')
            .optional()
            .isLength({ max: 255 })
            .withMessage('La "description" puede tener como máximo 255 caracteres')
            .bail()
            .trim(),

        body()
            .custom((_, { req }) => {
                const min = req.body.minAge;
                const max = req.body.maxAge;
                if (min != null && max != null && Number(min) >= Number(max)) {
                    throw new Error('minAge debe ser menor que maxAge');
                }
                return true;
            }),
    ],

    getById: [
        param('id')
            .isMongoId()
            .withMessage('El parámetro "id" debe ser un ObjectId válido'),
    ],

    delete: [
        param('id')
            .isMongoId()
            .withMessage('El parámetro "id" debe ser un ObjectId válido'),
    ],
};
