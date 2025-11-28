const express = require('express');
const { check } = require('express-validator');
const router = express.Router();
const controller = require('../controllers/productsController');
const validate = require('../middleware/validate');

router.get('/', controller.getAll);
router.get('/:id', controller.getById);

router.post(
	'/',
	[
		check('name').isString().withMessage('Nome é obrigatório').notEmpty(),
		check('price').optional().isFloat({ min: 0 }).withMessage('Preço deve ser numérico e >= 0'),
		check('description').optional().isString().withMessage('Descrição deve ser texto'),
	],
	validate,
	controller.create
);

router.put(
	'/:id',
	[
		check('name').optional().isString().withMessage('Nome deve ser texto'),
		check('price').optional().isFloat({ min: 0 }).withMessage('Preço deve ser numérico e >= 0'),
		check('description').optional().isString().withMessage('Descrição deve ser texto'),
	],
	validate,
	controller.update
);

router.delete('/:id', controller.remove);

module.exports = router;
