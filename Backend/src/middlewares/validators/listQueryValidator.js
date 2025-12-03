const { query } = require('express-validator');

module.exports = [

    query('page')
        .optional()
        .isNumeric().withMessage('El parametro page debe ser numérico')
        .bail()
        .isInt({ min: 1 }).withMessage('El parametro page debe ser un entero mayor o igual a 1')
        .toInt(),

    query('limit')
        .optional()
        .isNumeric().withMessage('El parametro limit debe ser numerico')
        .bail()
        .isInt({ min: 1, max: 100 }).withMessage('El parametro limit debe ser un entero entre 1 y 100')
        .toInt(),

    query('q')
        .optional()
        .isString().withMessage('El parámetro q debe ser texto')
        .bail()
        .isLength({ max: 50 }).withMessage('El parámetro q puede tener como maximo 50 caracteres'),

    query('categoryId')
    .optional()
    .isMongoId()
    .withMessage('El parametro categoryId debe ser un ObjectId valido'),
];
