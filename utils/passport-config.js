// passport-config.js
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/userModel');

passport.use(new LocalStrategy({ usernameField: 'username' }, async (username, password, done) => {
    try {
        console.log('Intento de autenticación para usuario:', username);
        const user = await User.findOne({ username: username }).exec();

        if (!user) {
            return done(null, false, { message: 'Usuario no encontrado' });
        }

        if (!user.validPassword(password)) {
            return done(null, false, { message: 'Contraseña incorrecta' });
        }

        return done(null, user);
    } catch (err) {
        console.error('Error durante la autenticación:', err);
        return done(err);
    }
}));

passport.serializeUser((user, done) => {
    console.log('Serializando usuario:', user);
    done(null, user.id);
});

passport.deserializeUser(async(id, done) => {
    console.log('Deserializando usuario con ID:', id);
    try {
        const user = await User.findById(id).exec();
        done(null, user);
    } catch (err) {
        done(err, null);
    }
});

module.exports = passport;
