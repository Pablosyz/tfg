// userController.js

const User = require('../models/userModel');
const bcrypt = require('bcrypt');

exports.getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.render('admin/users', { users });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createUser = async (req, res) => {
    try {
        const { username, password, nombre, telefono } = req.body;
        // Hashea la contraseña antes de almacenarla en la base de datos
        const hashedPassword = bcrypt.hashSync(password, 10);
        const newUser = new User({ username, password: hashedPassword, nombre, telefono });
        await newUser.save();
        // Configura un mensaje flash de éxito
        req.flash('success', 'Usuario creado con éxito');
        res.redirect('/admin/users');
    } catch (error) {
        console.error(error);

        if (error.code === 11000 && error.keyPattern && error.keyPattern.username) {
            req.flash('error', 'El nombre de usuario ya está en uso');
        } else {
            req.flash('error', 'Error al crear usuario');
        }

        res.redirect('/admin/users');
    }
};

exports.editUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.render('admin/editUser', { user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const { username, password, role } = req.body;
        await User.findByIdAndUpdate(req.params.id, { username, password, role });
        res.redirect('/admin/users');
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.redirect('/admin/users');
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
// Otros controladores para editar y eliminar usuarios...
