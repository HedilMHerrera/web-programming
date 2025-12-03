const { body, param } = require('express-validator');
const Category = require('../../models/category');
const Subcategory = require('../../models/subcategory');


module.exports = {
    
    create: [
        body('name')
            .exists({ checkFalsy: true })
            .withMessage('El campo "name" es obligatorio')
            .bail()
            .isLength({ min: 1, max: 50 })
            .withMessage('El campo "name" debe tener entre 1 y 50 caracteres')
            .trim(),

        body('description')
            .optional()
            .isLength({ max: 255 })
            .withMessage('El campo "description" puede tener como máximo 255 caracteres')
            .trim(),

        body('categoryId')
            .exists({ checkFalsy: true })
            .withMessage('El campo "categoryId" es obligatorio')
            .bail()
            .isMongoId()
            .withMessage('El campo "categoryId" debe ser un ObjectId válido')
            .bail()
            .custom(async value => {
                const exists = await Category.findById(value);
                if (!exists) {
                    throw new Error('La categoría no existe');
                }
                return true;
            })
            .bail()
            .custom(async (value, { req }) => {
                const exists = await Subcategory.findOne({
                    name: req.body.name,
                    categoryId: value
                });

                if (exists) {
                    throw new Error('Ya existe una subcategoría con este nombre en esta categoría');
                }
                return true;
            }),
    ],

    update: [
        param('id')
            .isMongoId()
            .withMessage('El parámetro "id" debe ser un ObjectId válido'),

        body('name')
            .optional()
            .isLength({ min: 1, max: 50 })
            .withMessage('El campo "name" debe tener entre 1 y 50 caracteres')
            .trim(),

        body('description')
            .optional()
            .isLength({ max: 255 })
            .withMessage('El campo "description" puede tener como máximo 255 caracteres')
            .trim(),

        body('categoryId')
            .optional()
            .isMongoId()
            .withMessage('El campo "categoryId" debe ser un ObjectId válido')
            .bail()
            .custom(async value => {
                if (!value) return true;
                const exists = await Category.findById(value);
                if (!exists) {
                    throw new Error('La categoría no existe');
                }
                return true;
            }),

        body(['name', 'categoryId']).custom(async (_, { req }) => {
            const subcategoryId = req.params.id;
            const { name, categoryId } = req.body;

            const current = await Subcategory.findById(subcategoryId);
            if (!current) return true;

            const finalName = name || current.name;
            const finalCategoryId = categoryId || current.categoryId;

            const exists = await Subcategory.findOne({
                _id: { $ne: subcategoryId },
                name: finalName,
                categoryId: finalCategoryId
            });

            if (exists) {
                throw new Error('Ya existe otra subcategoría con este nombre en esta categoría');
            }

            return true;
        })
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
    ]
};
