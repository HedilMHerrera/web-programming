const express = require('express');
const router = express.Router();

const difficultyCrtl = require('../controllers/difficultyController');
const ageRangeCrtl = require('../controllers/ageRangeController');
const categoryCrtl = require('../controllers/categoryController');
const subcategoryCtrl = require('../controllers/subcategoryController');
const validate = require('../middlewares/validate');
const difficultyValidator = require('../middlewares/validators/difficultyValidator');
const ageRangeValidator = require('../middlewares/validators/ageRangeValidator');

router.get('/', (req, res) => {
    res.json({
    success: true,
    msg: 'modulo quest vivoo',
    });
});

router.get('/difficulties', difficultyCrtl.list);
router.get('/difficulties/:id', difficultyValidator.getById, validate, difficultyCrtl.get);
router.post('/difficulties', difficultyValidator.create, validate, difficultyCrtl.create);
router.put('/difficulties/:id', difficultyValidator.update, validate, difficultyCrtl.update);
router.delete('/difficulties/:id', difficultyValidator.delete, validate, difficultyCrtl.remove);

router.get('/ageranges', ageRangeCrtl.list);
router.get('/ageranges/:id', ageRangeValidator.getById, validate, ageRangeCrtl.get);
router.post('/ageranges', ageRangeValidator.create, validate, ageRangeCrtl.create);
router.put('/ageranges/:id', ageRangeValidator.update, validate, ageRangeCrtl.update);
router.delete('/ageranges/:id', ageRangeValidator.delete, validate, ageRangeCrtl.remove);

router.get('/categories', categoryCrtl.list);
router.get('/categories/:id', categoryCrtl.get);
router.post('/categories', categoryCrtl.create);
router.put('/categories/:id', categoryCrtl.update);
router.delete('/categories/:id', categoryCrtl.remove);

router.get('/subcategories', subcategoryCtrl.list);
router.get('/subcategories/:id', subcategoryCtrl.get);
router.post('/subcategories', subcategoryCtrl.create);
router.put('/subcategories/:id', subcategoryCtrl.update);
router.delete('/subcategories/:id', subcategoryCtrl.remove);


module.exports = router;