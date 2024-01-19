// adminRoutes.js
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const middleware = require('../middleware/checkAdmin');

// Aplica el middleware a todas las rutas de administración
router.use(middleware.isAdmin);


// Rutas para usuarios en el panel de administración
router.get('/users', adminController.getUsers);
router.post('/users', adminController.createUser);
router.get('/users/:id/edit', adminController.editUser);
router.post('/users/:id/edit', adminController.updateUser);
router.get('/users/:id/delete', adminController.deleteUser);

// Rutas para reservas en el panel de administración
router.get('/reservations', adminController.getReservations);
router.post('/reservations', adminController.createReservation);
router.get('/reservations/:id/edit', adminController.editReservation);
router.post('/reservations/:id/edit', adminController.updateReservation);
router.get('/reservations/:id/delete', adminController.deleteReservation);

// Rutas para alojamientos en el panel de administración
router.get('/accommodations', adminController.getAccommodations);
router.post('/accommodations', adminController.createAccommodation);
router.get('/accommodations/:id/edit', adminController.editAccommodation);
router.post('/accommodations/:id/edit', adminController.updateAccommodation);
router.get('/accommodations/:id/delete', adminController.deleteAccommodation);

module.exports = router;
