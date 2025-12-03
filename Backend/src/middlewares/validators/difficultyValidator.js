const { body, param } = require('express-validator');

module.exports = {
	create: [
		body('level')
			.exists({ checkFalsy: true })
			.withMessage('El campo "nivel" es obligatorio')
			.bail()
			.isLength({ min: 1, max: 50 })
			.withMessage('El campo "nivel" debe tener entre 1 y 50 caracteres')
			.bail()
			.trim(),

		body('description')
			.optional()
			.isLength({ max: 255 })
			.withMessage('La "descripcion" puede tener como máximo 255 caracteres')
			.bail()
			.trim(),
	],

	update: [
		param('id')
			.isMongoId()
			.withMessage('El parámetro "id" debe ser un ObjectId válido'),

		body('level')
			.optional()
			.isLength({ min: 1, max: 50 })
			.withMessage('El campo "nivel" debe tener entre 1 y 50 caracteres')
			.bail()
			.trim(),
            
		body('description')
			.optional()
			.isLength({ max: 255 })
			.withMessage('La "descripcion" puede tener como máximo 255 caracteres')
			.bail()
			.trim(),
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
