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
console.log('getUsers', getUsers);
console.log('createUser', createUser);

// Controladores para alojamientos
const {
    getAccommodations,
    createAccommodation,
    editAccommodation,
    updateAccommodation,
    deleteAccommodation
} = accommodationController;


// Controladores para reservas
const {
    getReservations,
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