// adminController.js
const accommodationController = require('../controllers/accommodationController');
const reservationController = require('../controllers/reservationController');  // Importar el controlador de reservas
const userController = require('./userController');

const {
    getUsers,
    createUser,
    editUser,
    updateUser,
    deleteUser
} = userController;


// Controladores para alojamientos
const {
    getAccommodations,
    getNewAccommodation,
    createAccommodation,
    editAccommodation,
    updateAccommodation,
    deleteAccommodation
} = accommodationController;


// Controladores para reservas
const {
    getReservations,
    getNewReservation,
    createReservation,
    editReservation,
    updateReservation,
    deleteReservation
} = reservationController;


module.exports = {
    getUsers,
    createUser,
    editUser,
    updateUser,
    deleteUser,
    getAccommodations,
    getNewAccommodation,
    createAccommodation,
    editAccommodation,
    updateAccommodation,
    deleteAccommodation,
    getReservations,
    getNewReservation,
    createReservation,
    editReservation,
    updateReservation,
    deleteReservation,
};