//Creación de usuario administrador en base de datos local
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/miaplicaciondb', { useNewUrlParser: true, useUnifiedTopology: true });

const User = require('../models/userModel'); // Ajusta la ruta según la ubicación real de tu modelo

// Genera el hash de la contraseña
const hashedPassword = bcrypt.hashSync("password", 10);

// Inserta el usuario con la contraseña hasheada
User.create({
    username: "admin",
    password: hashedPassword,
    role: "admin",
    nombre: "Administrador",
    telefono: "" // O cualquier otro campo necesario
})
    .then(() => {
        console.log('Usuario administrador creado con éxito.');
        mongoose.connection.close();
    })
    .catch((error) => {
        console.error('Error al crear el usuario administrador:', error);
        mongoose.connection.close();
    });
