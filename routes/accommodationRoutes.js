// accommodationRoutes.js
const express = require('express');
const router = express.Router();
const accommodationController = require('../controllers/accommodationController.js');


// Rutas para alojamientos
router.post('/alojamientos', accommodationController.createAccommodation);
router.get('/alojamientos', accommodationController.getAccommodations);
router.get('/alojamientos/:id/imagenes', accommodationController.getAccommodationImages);
router.post('/alojamientos/:id/imagenes', accommodationController.addAccommodationImage);
router.get('/alojamientos/:id/disponibilidad', accommodationController.getAccommodationAvailability);
router.post('/alojamientos/:id/disponibilidad', accommodationController.addAccommodationAvailability);

// Otras rutas para reservas, si es necesario...

module.exports = router;
