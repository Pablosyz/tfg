// authRoutes.js
const passport = require('../utils/passport-config');
const express = require('express');
const authController = require('../controllers/authController');
const router = express.Router();

router.get('/register', authController.showRegisterForm);
router.post('/register', authController.registerUser);

router.get('/login', authController.showLoginForm);
router.post('/login', passport.authenticate('local', {
    successFlash: '¡Inicio de sesión exitoso!',
    successRedirect: '/profile',
    failureRedirect: '/auth/login',
    failureFlash: true,
}), (req, res) => {
    console.log('Autenticación exitosa. Redirigiendo a /profile');
    console.log('Datos del formulario:', req);
});

/*
router.get('/profile', (req, res) => {
    console.log('Usuario autenticado:', req.isAuthenticated());
    if (req.isAuthenticated()) {
        res.render('profile', { user: req.user });
    } else {
        res.redirect('/auth/login');
    }
});
*/


router.get('/logout', authController.logoutUser);

module.exports = router;
