// userModel.js

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Define el esquema de User
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true // Asegurar que el correo electrónico sea único
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['normal', 'admin'],
        default: 'normal'
    },
    // Nuevos campos para datos personales
    nombre: {
        type: String,
        required: true
    },
    telefono: String,
    // Otros campos de datos personales según sea necesario
});

userSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

// Crea y exporta el modelo User
const User = mongoose.model('User', userSchema);

// Exporta el modelo User y la instancia de Passport
module.exports = User;
