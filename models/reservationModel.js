// reservationModel.js
const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    alojamiento: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Accommodation',
        required: true
    },
    nombreReserva: {
        type: String,
        required: true,
    },
    huespedes: { type: Number, required: true },
    fecha_inicio: { type: Date, required: true },
    fecha_fin: { type: Date, required: true },
    precioTotal: { type: Number, required: true},
    telefono: { type: String, required: true},
    emailConfirmacion: { type: String, required: true },
    // Otros campos relacionados con la reserva
});

const Reservation = mongoose.model('Reservation', reservationSchema);

module.exports = Reservation;
