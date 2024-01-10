// authController.js

const User = require('../models/userModel');

exports.showRegisterForm = (req, res) => {
    res.render('register');
};

exports.registerUser = (req, res) => {
    // Lógica para registrar al usuario
    res.render('register', { message: 'Registro exitoso' });
};

exports.showLoginForm = (req, res) => {
    res.render('login');
};

exports.loginUser = (req, res) => {
    // Lógica para iniciar sesión
    res.redirect('/profile');
};

exports.logoutUser = (req, res) => {
    req.logout();
    res.redirect('/');
};
