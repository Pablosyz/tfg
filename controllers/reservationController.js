// reservationController.js
const Reservation = require('../models/reservationModel');

// Controlador para crear una nueva reserva
async function createReservation(req, res) {
    try {
        const nuevaReserva = new Reservation(req.body);
        await nuevaReserva.save();
        res.status(201).json(nuevaReserva);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Controlador para obtener una reserva por ID
async function getReservation(req, res) {
    try {
        const { id } = req.params;
        const reserva = await Reservation.findById(id);

        if (!reserva) {
            return res.status(404).json({ message: 'Reserva no encontrada' });
        }

        res.json(reserva);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Controlador para obtener todas las reservas
async function getAllReservations(req, res) {
    try {
        const reservas = await Reservation.find();
        res.json(reservas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    createReservation,
    getReservation,
    getAllReservations
};
