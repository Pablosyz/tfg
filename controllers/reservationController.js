// reservationController.js
const Reservation = require('../models/reservationModel');

exports.getReservations = async (req, res) => {
    try {
        const reservations = await Reservation.find();
        res.render('admin/reservations', { reservations });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createReservation = async (req, res) => {
    try {
        const { usuario, alojamiento, fecha_inicio, fecha_fin, precioTotal } = req.body;
        const newReservation = new Reservation({ usuario, alojamiento, fecha_inicio, fecha_fin, precioTotal });
        await newReservation.save();
        req.flash('success', 'Reserva creada con éxito');
        res.redirect('/admin/reservations');
    } catch (error) {
        console.error(error);
        req.flash('error', 'Error al crear reserva');
        res.redirect('/admin/reservations');
    }
};

exports.editReservation = async (req, res) => {
    try {
        const reservation = await Reservation.findById(req.params.id);
        res.render('admin/editReservation', { reservation });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateReservation = async (req, res) => {
    try {
        const reservationId = req.params.id;
        const { usuario, alojamiento, fecha_inicio, fecha_fin, precioTotal } = req.body;
        await Reservation.findByIdAndUpdate(reservationId, { usuario, alojamiento, fecha_inicio, fecha_fin, precioTotal });
        res.redirect('/admin/reservations');
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteReservation = async (req, res) => {
    try {
        await Reservation.findByIdAndDelete(req.params.id);
        res.redirect('/admin/reservations');
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
// Otros controladores reservas

