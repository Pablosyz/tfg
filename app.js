// app.js

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('./utils/passport-config');  // Importa tu configuración de Passport.js

const indexRoutes = require('./routes/indexRoutes');
const profileRoutes = require('./routes/profileRoutes')
const authRoutes = require('./routes/authRoutes');
const accommodationRoutes = require('./routes/accommodationRoutes');
const adminRoutes = require('./routes/adminRoutes');

const flash = require('connect-flash');
const session = require('express-session');
const User = require('./models/userModel');

const app = express();

// Configuración de body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configuración de connect-flash
app.use(flash());

mongoose.connect('mongodb://127.0.0.1:27017/miaplicaciondb', { })
    .then(() => {
        console.log('Conexión a la base de datos establecida');
    })
    .catch((error) => {
        console.error('Error de conexión a la base de datos:', error.message);
    });

// Configuración de express-session antes de Passport
app.use(session({
    secret: 'tu-secreto',
    resave: false,
    saveUninitialized: false,
}));

// Configuración de Passport
console.log('Antes de la configuración de Passport');
app.use(passport.initialize());
app.use(passport.session());

console.log('Después de la configuración de Passport');

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');


// Rutas principales
app.use('/', indexRoutes);
app.use('/', profileRoutes)
// Rutas de autenticación
app.use('/auth', authRoutes);
app.use('/admin', adminRoutes);
//Rutas de alojamientos
app.use('/', accommodationRoutes);

app.get('/admin', (req, res) => {
    if (req.isAuthenticated()) {
        if (req.user.role === 'admin') {
            return res.render('admin', { user: req.user });
        }
        // Si no es admin, puedes redirigirlo a otra página o mostrar un mensaje de error
        return res.redirect('/profile');
    }
    res.redirect('/auth/login');
});

app.get('/profile', (req, res) => {
    console.log('Accediendo a /profile');
    console.log('Usuario autenticado:', req.isAuthenticated());
    if (req.isAuthenticated()) {
        res.render('profile', { user: req.user });
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
