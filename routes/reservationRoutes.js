// reservationRoutes.js

const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservationController');

// Ruta para mostrar la página de reserva
router.post('/nuevaReserva', reservationController.mostrarNuevaReserva);

// Ruta para procesar la reserva (POST)
router.post('/reservar', reservationController.crearNuevaReserva);

// Otros enrutamientos de reservas

module.exports = router;
