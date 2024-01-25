// indexRoutes.js

const express = require('express');
const router = express.Router();

// Ruta principal
router.get('/', (req, res) => {
    res.render('index', { currentView: 'index', showProfile: false, showAdmin: false });
});

module.exports = router;
