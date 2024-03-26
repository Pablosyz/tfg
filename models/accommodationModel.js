// accommodationModel.js
const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    url: String,
});

const reservationSchema = new mongoose.Schema({
    start: Date, // Fecha de inicio de la reserva
    end: Date,   // Fecha de finalización de la reserva
});

const accommodationSchema = new mongoose.Schema({
    nombre: String,
    ubicacion: String,
    fotos: [imageSchema], // Array de imágenes
    disponibilidad: {
        reservas: [reservationSchema], // Array de reservas existentes
    }, // Array de disponibilidad
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
