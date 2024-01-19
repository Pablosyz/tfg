// profileRoutes.js
const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../middleware/authMiddleware');
const userController = require('../controllers/userController');

// Ruta para mostrar la página de edición de perfil de usuario
router.get('/profile/editUserProfile', ensureAuthenticated, userController.editUserProfile);

//Ruta para mostrar la página de reservas del usuario
router.get('/profile/reservations', ensureAuthenticated, userController.getUserReservations);

// Ruta para manejar la actualización de datos del perfil de usuario
router.post('/profile/editUserProfile', ensureAuthenticated, userController.updateUserProfile);

// Ruta para cancelar una reserva del usuario
router.post('/profile/reservations/:id/cancel', ensureAuthenticated, userController.deleteUserReservation);


module.exports = router;
