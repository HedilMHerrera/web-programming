const express = require('express');
const router = express.Router();

const difficultyCrtl = require('../controllers/difficultyController');
const ageRangeCrtl = require('../controllers/ageRangeController');

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

module.exports = router;