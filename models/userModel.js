// userModel.js

const mongoose = require('mongoose');

// Define el esquema de User
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['normal', 'admin'], // Definir roles permitidos
        default: 'normal'
    }
});

// Crea y exporta el modelo User
const User = mongoose.model('User', userSchema);

// Exporta el modelo User y la instancia de Passport
module.exports = User;
