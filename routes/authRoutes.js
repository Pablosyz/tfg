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
    //successRedirect: '/profile',
    failureRedirect: '/auth/login',
    failureFlash: true,
}), (req, res) => {
    // Este código se ejecutará después de una autenticación exitosa
    // Redirige al perfil o al panel de administración según el rol
    if (req.isAuthenticated()) {
        if (req.user.role === 'admin') {
            return res.redirect('/admin');
        } else {
            return res.redirect('/profile');
        }
    }
    console.log('Autenticación exitosa. Redirigiendo a /profile');
    console.log('Datos del formulario:', req);
});


router.get('/logout', authController.logoutUser);

module.exports = router;
