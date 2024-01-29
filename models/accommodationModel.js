// accommodationModel.js
const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    url: String,
    // Puedes agregar más campos como descripción, título, etc. según tus necesidades
});

const availabilitySchema = new mongoose.Schema({
    date: Date,
    available: Boolean,
    // Otros campos según tus necesidades
});


const accommodationSchema = new mongoose.Schema({
    nombre: String,
    ubicacion: String,
    fotos: [imageSchema], // Array de imágenes
    disponibilidad: [availabilitySchema], // Array de disponibilidad
    descripcion: String,
    precioPorNoche: Number, // Nuevo atributo: precio por noche
    capacidad: Number, // Nuevo atributo: capacidad
    tipo: String, // Nuevo atributo: tipo de alojamiento (hotel, casa rural, etc.)
    caracteristicas: [ String ],
    comentarios: [
        {
            usuario: String, // Nombre del usuario que dejó el comentario
            comentario: String, // Texto del comentario
            fecha: Date, // Fecha del comentario
        }
    ],
});

const Accommodation = mongoose.model('Accommodation', accommodationSchema);

module.exports = Accommodation;
