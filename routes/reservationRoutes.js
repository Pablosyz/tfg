// reservationRoutes.js
const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservationController');

// Rutas para reservas
router.post('/reservas', reservationController.createReservation);
router.get('/reservas/:id', reservationController.getReservation);
router.get('/reservas', reservationController.getAllReservations);

module.exports = router;
