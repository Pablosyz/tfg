// app.js

const express = require('express');
const mongoose = require('mongoose');
const configurePassport = require('./utils/passport-config');
const indexRoutes = require('./routes/indexRoutes');
const authRoutes = require('./routes/authRoutes');
const User = require('./models/userModel');

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/miaplicaciondb', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Conexión a la base de datos establecida');
    })
    .catch((error) => {
        console.error('Error de conexión a la base de datos:', error.message);
    });

app.use(require('express-session')({ secret: 'tu-secreto', resave: true, saveUninitialized: true }));

app.use(configurePassport.initialize());
app.use(configurePassport.session());

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use('/', indexRoutes);
app.use('/auth', authRoutes);

app.get('/profile', (req, res) => {
    if (req.isAuthenticated()) {
        res.render('profile', { user: req.user });
    } else {
        res.redirect('/auth/login');
    }
});

app.get('/admin', (req, res) => {
    if (req.isAuthenticated() && req.user.role === 'admin') {
        res.render('admin', { user: req.user });
    } else {
        res.redirect('/auth/login');
    }
});

app.use((req, res) => {
    res.status(404).render('error', { message: 'Página no encontrada' });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).render('error', { message: 'Error interno del servidor' });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor en ejecución en http://localhost:${PORT}`);
});
