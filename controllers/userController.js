// userController.js

const User = require('../models/userModel');
const Reservation = require('../models/reservationModel');
const bcrypt = require('bcrypt');

exports.getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.render('admin/users', { users });
        console.log(users)
    } catch (error) {
        console.error('Error al obtener usuarios:', error.message);
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
        const { username, password, nombre, telefono } = req.body;
        // Hashea la contraseña antes de almacenarla en la base de datos, si es proporcionada
        const hashedPassword = password ? bcrypt.hashSync(password, 10) : undefined;

        // Implementa la lógica para actualizar el usuario en la base de datos
        await User.findByIdAndUpdate(req.params.id, { username, password: hashedPassword, nombre, telefono });
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
// Obtener el perfil del usuario
exports.getUserProfile = async (req, res) => {
    try {
        // Obtener el usuario actual
        const user = await User.findById(req.user._id);
        res.render('profile', { user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Editar el perfil del usuario
exports.editUserProfile = async (req, res) => {
    try {
        // Obtener el usuario actual
        const user = await User.findById(req.user._id);
        res.render('profile/editUserProfile', { user, message: req.flash('info') });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Actualizar el perfil del usuario
exports.updateUserProfile = async (req, res) => {
    try {
        const { telefono, password } = req.body;
        const user = await User.findById(req.user._id);

        // Actualizar solo los campos proporcionados
        if (telefono) user.telefono = telefono;
        if (password) {
            // Hashear la contraseña antes de almacenarla en la base de datos, si es proporcionada
            user.password = bcrypt.hashSync(password, 10);
        }

        await user.save();

        // Define un mensaje de éxito
        req.flash('success', 'Perfil actualizado con éxito');
        // Muestra el mensaje en la consola
        console.log('Mensaje de éxito:', 'Perfil actualizado con éxito');
        // Redirige a la misma vista edituserprofile con el mensaje
        res.redirect('/profile/edituserprofile');
    } catch (error) {
        // Define un mensaje de error
        req.flash('error', 'Error al actualizar el perfil');
        // Muestra el mensaje de error en la consola
        console.error('Mensaje de error:', 'Error al actualizar el perfil');
        // Redirige a la misma vista edituserprofile con el mensaje de error
        res.redirect('/profile/edituserprofile');
    }
};

// Obtener las reservas del usuario
exports.getUserReservations = async (req, res) => {
    try {
        // Obtener las reservas del usuario actual
        const reservations = await Reservation.find({ usuario: req.user._id }).populate('alojamiento');
        res.render('profile/reservations', { reservations });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Cancelar una reserva del usuario
exports.deleteUserReservation = async (req, res) => {
    try {
        const reservationId = req.params.id;

        // Verificar si la reserva pertenece al usuario actual
        const reservation = await Reservation.findById(reservationId);
        if (!reservation || reservation.usuario.toString() !== req.user._id.toString()) {
            req.flash('error', 'No tienes permisos para cancelar esta reserva');
            return res.redirect('/profile/reservations');
        }

        // Eliminar la reserva
        await Reservation.findByIdAndDelete(reservationId);

        // Definir un mensaje de éxito
        req.flash('success', 'Reserva cancelada con éxito');

        // Redirigir a la página de reservas
        res.redirect('/profile/reservations');
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};