// authController.js

const User = require('../models/userModel');
const bcrypt = require('bcrypt');

exports.showRegisterForm = (req, res) => {
    res.render('register', { error: null }); // Pasa 'error' como null o un valor adecuado
};

exports.registerUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        // Hashea la contraseña antes de almacenarla en la base de datos
        const hashedPassword = bcrypt.hashSync(password, 10);
        const newUser = new User({ username, password: hashedPassword });
        await newUser.save();
        // Configura un mensaje flash de éxito
        req.flash('success', 'Usuario registrado con éxito');
        res.redirect('/auth/login');
    } catch (error) {
        console.error(error);

        if (error.code === 11000 && error.keyPattern && error.keyPattern.username) {
            res.render('register', { error: 'El nombre de usuario ya está en uso' });
        } else {
            res.render('register', { error: 'Error al registrar usuario' });
        }
    }
};

exports.showLoginForm = (req, res) => {
    res.render('login', { error: req.flash('error') });
};

exports.loginUser = (req, res) => {
    res.redirect('/profile');
};

exports.logoutUser = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Error al cerrar sesión:', err);
        }
        res.redirect('/');
    });
};
