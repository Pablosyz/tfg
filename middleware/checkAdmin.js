// checkAdmin.js
exports.isAdmin = (req, res, next) => {
    if (req.isAuthenticated() && req.user.role === 'admin') {
        return next(); // Permite el acceso al siguiente middleware o ruta
    } else {
        res.redirect('/auth/login'); // Redirige al inicio de sesión si no está autenticado o no es admin
    }
};
