// middleware/authMiddleware.js

// Middleware para asegurar que el usuario esté autenticado
exports.ensureAuthenticated = (req, res, next) => {
    // Passport.js agrega el objeto 'user' al objeto 'req' si el usuario está autenticado
    if (req.isAuthenticated()) {
        return next(); // El usuario está autenticado, permite el acceso a la siguiente ruta o controlador
    } else {
        // El usuario no está autenticado, redirige al inicio de sesión
        res.redirect('/auth/login');
    }
};
