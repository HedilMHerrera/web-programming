const express = require('express');
const router = express.Router();
const authCtrl = require('../controllers/authController');
const { verifyToken } = require('../middlewares/auth');
const { hasRole } = require('../middlewares/rbac');
const validate = require('../middlewares/validate');
const authValidator = require('../middlewares/validators/authValidator');
const rateLimit = require('express-rate-limit');

const loginLimiter = rateLimit({
	windowMs: 60 * 1000,
	max: 5,
	standardHeaders: true,
	legacyHeaders: false,
	message: { success: false, message: 'Demasiados intentos de login, intenta mas tarde' },
});

router.post('/register', verifyToken, hasRole('admin'), authValidator.register, validate, authCtrl.register);
router.post('/login', loginLimiter, authValidator.login, validate, authCtrl.login);
router.post('/logout', authCtrl.logout);
router.get('/me', verifyToken, authCtrl.me);

module.exports = router;
