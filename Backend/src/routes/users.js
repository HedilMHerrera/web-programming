const router = require('express').Router();
const userCtrl = require('../controllers/userController');
const { verifyToken } = require('../middlewares/auth');
const { hasRole } = require('../middlewares/rbac');
const validate = require('../middlewares/validate');
const userValidator = require('../middlewares/validators/userValidator');


router.get('/', verifyToken, hasRole('admin'), userCtrl.list);
router.get('/:id', verifyToken, userValidator.getById, validate, userCtrl.get);
router.put('/:id', verifyToken, userValidator.update, validate, userCtrl.update);
router.delete('/:id', verifyToken, hasRole('admin'), userValidator.getById, validate, userCtrl.remove);

module.exports = router;
