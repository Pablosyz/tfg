// adminController.js
const User = require('../models/userModel');
const Reservation = require('../models/reservationModel');
const Accommodation = require('../models/accommodationModel');
const accommodationController = require('../controllers/accommodationController');  // Importar el controlador de alojamientos
const reservationController = require('../controllers/reservationController');  // Importar el controlador de reservas

// Controladores para usuarios
// Controladores para usuarios
const userController = require('./userController');
const {
    getUsers,
    createUser,
    editUser,
    updateUser,
    deleteUser
} = userController;
console.log('getUsers', getUsers);
console.log('createUser', createUser);

const getAccommodations = async (req, res) => {
    try {
        const accommodations = await Accommodation.find();
        res.render('admin/accommodations', { accommodations });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createAccommodation = async (req, res) => {
    try {
        await accommodationController.createAccommodation(req, res);
        res.redirect('/admin/accommodations');
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const editAccommodation = async (req, res) => {
    try {
        await accommodationController.editAccommodation(req, res);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateAccommodation = async (req, res) => {
    try {
        await accommodationController.updateAccommodation(req, res);
        res.redirect('/admin/accommodations');
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteAccommodation = async (req, res) => {
    try {
        await accommodationController.deleteAccommodation(req, res);
        res.redirect('/admin/accommodations');
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getReservations = async (req, res) => {
    try {
        const reservations = await Reservation.find();
        res.render('admin/reservations', { reservations });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createReservation = async (req, res) => {
    try {
        await reservationController.createReservation(req, res);
        res.redirect('/admin/reservations');
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const editReservation = async (req, res) => {
    try {
        await reservationController.editReservation(req, res);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateReservation = async (req, res) => {
    try {
        await reservationController.updateReservation(req, res);
        res.redirect('/admin/reservations');
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteReservation = async (req, res) => {
    try {
        await reservationController.deleteReservation(req, res);
        res.redirect('/admin/reservations');
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getUsers,
    createUser,
    editUser,
    updateUser,
    deleteUser,
    getAccommodations,
    createAccommodation,
    editAccommodation,
    updateAccommodation,
    deleteAccommodation,
    getReservations,
    createReservation,
    editReservation,
    updateReservation,
    deleteReservation,
};