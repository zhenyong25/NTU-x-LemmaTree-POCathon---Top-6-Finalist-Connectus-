const express = require('express')
const router = express.Router()

const AuthController = require('../controllers/authController')

router.get('/signup', AuthController.signupPage);
router.post('/signup', AuthController.signup);
router.get('/login', AuthController.loginPage);
router.post('/login', AuthController.login);
router.get('/logout', AuthController.logout);
// router.post('/token', AuthController.refresh);

module.exports = router