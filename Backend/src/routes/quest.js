const express = require('express');
const router = express.Router();

const difficultyCrtl = require('../controllers/difficultyController');
const ageRangeCrtl = require('../controllers/ageRangeController');
const categoryCrtl = require('../controllers/categoryController');
const subcategoryCtrl = require('../controllers/subcategoryController');

router.get('/difficulties', difficultyCrtl.list);
router.get('/difficulties/:id', difficultyCrtl.get);
router.post('/difficulties', difficultyCrtl.create);
router.put('/difficulties/:id', difficultyCrtl.update);
router.delete('/difficulties/:id', difficultyCrtl.remove);

router.get('/ageranges', ageRangeCrtl.list);
router.get('/ageranges/:id', ageRangeCrtl.get);
router.post('/ageranges', ageRangeCrtl.create);
router.put('/ageranges/:id', ageRangeCrtl.update);
router.delete('/ageranges/:id', ageRangeCrtl.remove);

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