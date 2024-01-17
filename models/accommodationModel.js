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
});

const Accommodation = mongoose.model('Accommodation', accommodationSchema);

module.exports = Accommodation;
