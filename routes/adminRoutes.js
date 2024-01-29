// adminRoutes.js
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const middleware = require('../middleware/checkAdmin');
const multer = require('multer');
const path = require('path');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images');
    },
    filename: function (req, file, cb) {
        // Cambia el nombre del archivo según tus necesidades
        const fileName = file.fieldname + '-' + Date.now() + path.extname(file.originalname);
        const imageURL = '/images/' + fileName; // Construye la URL completa
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

// Aplica el middleware a todas las rutas de administración
router.use(middleware.isAdmin);
const uploadMiddleware = upload.array('fotos', 12);

// Rutas para usuarios en el panel de administración
router.get('/users', adminController.getUsers);
router.post('/users', adminController.createUser);
router.get('/users/:id/edit', adminController.editUser);
router.post('/users/:id/edit', adminController.updateUser);
router.get('/users/:id/delete', adminController.deleteUser);

// Rutas para reservas en el panel de administración
router.get('/reservations', adminController.getReservations);
router.get('/reservations/new', adminController.getNewReservation);
router.post('/reservations', adminController.createReservation);
router.get('/reservations/:id/edit', adminController.editReservation);
router.post('/reservations/:id/edit', adminController.updateReservation);
router.get('/reservations/:id/delete', adminController.deleteReservation);

// Rutas para alojamientos en el panel de administración
router.get('/accommodations', adminController.getAccommodations);
router.get('/accommodations/new', adminController.getNewAccommodation);
router.post('/accommodations', uploadMiddleware, adminController.createAccommodation);
router.get('/accommodations/:id/edit', adminController.editAccommodation);
router.post('/accommodations/:id/edit', adminController.updateAccommodation);
router.get('/accommodations/:id/delete', adminController.deleteAccommodation);

module.exports =  router;
