// authRoutes.js

const express = require('express');
const passport = require('../utils/passport-config');
const authController = require('../controllers/authController');
const router = express.Router();

router.get('/register', authController.showRegisterForm);
router.post('/register', authController.registerUser);

router.get('/login', authController.showLoginForm);
router.post('/login', passport.authenticate('local', {
    successRedirect: '/profile',
    failureRedirect: '/auth/login',
    failureFlash: true
}));

router.get('/logout', authController.logoutUser);

module.exports = router;
