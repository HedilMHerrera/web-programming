const express = require('express');
const router = express.Router();

const difficultyCrtl = require('../controllers/difficultyController');

router.get('/difficulties', difficultyCrtl.list);
router.get('/difficulties/:id', difficultyCrtl.get);
router.post('/difficulties', difficultyCrtl.create);
router.put('/difficulties/:id', difficultyCrtl.update);
router.delete('/difficulties/:id', difficultyCrtl.remove);

module.exports = router;