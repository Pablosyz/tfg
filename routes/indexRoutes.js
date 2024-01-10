// indexRoutes.js

const express = require('express');
const router = express.Router();

// Ruta principal
router.get('/', (req, res) => {
    res.send('¡Bienvenido a la página principal!');
});

module.exports = router;
