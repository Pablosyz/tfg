// reservationController.js
const Reservation = require('../models/reservationModel');
const Accommodation = require('../models/accommodationModel')
const User = require('../models/userModel');

exports.getReservations = async (req, res) => {
    try {
        const reservations = await Reservation.find()
            .populate('usuario')
            .populate('alojamiento');
        // Cargamos las consultas para obtener la lista de alojamientos y usuarios

        res.render('admin/reservations', { reservations });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getNewReservation = async (req, res) => {
    try {
        const accommodations = await Accommodation.find();
        const users = await User.find();
        res.render('admin/newReservation', { users, accommodations });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createReservation = async (req, res) => {
    try {
        const { usuario, alojamiento, nombreReserva, emailConfirmacion, telefono, fecha_inicio, fecha_fin, huespedes, precioTotal } = req.body;
        const newReservation = new Reservation({
            usuario,
            alojamiento,
            nombreReserva,
            fecha_inicio,
            fecha_fin,
            huespedes,
            telefono,
            emailConfirmacion,
            precioTotal
        });await newReservation.save();
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
        const reservation = await Reservation.findById(req.params.id)
            .populate('alojamiento')
            .populate('usuario')

        const accommodations = await Accommodation.find();
        res.render('admin/editReservation', { reservation, accommodations });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateReservation = async (req, res) => {
    try {
        const reservationId = req.params.id;
        const { alojamiento,
            nombreReserva,
            fecha_inicio,
            fecha_fin,
            huespedes,
            telefono,
            emailConfirmacion,
            precioTotal } = req.body;
        await Reservation.findByIdAndUpdate(reservationId, {
            alojamiento,
            nombreReserva,
            fecha_inicio,
            fecha_fin,
            huespedes,
            telefono,
            emailConfirmacion,
            precioTotal });
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

exports.mostrarNuevaReserva = async (req, res) => {
    try {
        // Recuperar el ID del alojamiento desde el formulario
        console.log("Mostrando nueva reserva...");
        const accommodationId = req.body.idAlojamiento;

        // Verificar si el usuario ha iniciado sesión
        if (!req.isAuthenticated()) {
            // Redirigir al usuario a la página de inicio de sesión
            return res.redirect('/auth/login');
        }

        // Consultar la información del alojamiento seleccionado
        const selectedAccommodation = await Accommodation.findById(accommodationId);
        const usuario = req.user;
        console.log("Datos enviados a la vista:", { selectedAccommodation, usuario });

        // Renderizar la vista con la información del alojamiento
        res.render('nuevaReserva', {
            selectedAccommodation,
            usuario,
            precioPorNoche: selectedAccommodation.precioPorNoche,
        });
        console.log("Vista renderizada con éxito.");
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.crearNuevaReserva = async (req, res) => {
    try {
        console.log("Creando nueva reserva...");
        console.log(req.body);
        const { nombreReserva, emailConfirmacion, telefono, fecha_inicio, fecha_fin, huespedes, idAlojamiento } = req.body;

        // Asumo que el usuario está autenticado y su información está disponible en req.user
        const usuario = req.user._id;


        const selectedAccommodation = await Accommodation.findById(idAlojamiento);

        // Verificar si el alojamiento existe
        if (!selectedAccommodation) {
            console.error("El alojamiento no existe");
            console.error("ID del alojamiento seleccionado:", idAlojamiento);
            req.flash('error', 'El alojamiento seleccionado no existe');
            return res.redirect('/profile');
        }
        // Calcular el precio total según tus necesidades
        const calcularPrecioTotal = (precioPorNoche, fechaInicio, fechaFin) => {
            // Lógica para calcular el precio total basado en el precio por noche y el rango de fechas
            // Por ejemplo, podrías calcular la diferencia de días y multiplicar por el precio por noche
            const fechaInicioObj = new Date(fechaInicio);
            const fechaFinObj = new Date(fechaFin);
            const diferenciaDias = (fechaFinObj - fechaInicioObj) / (1000 * 60 * 60 * 24);
            const precioTotal = precioPorNoche * diferenciaDias;

            // Puedes agregar lógica adicional según tus necesidades

            return precioTotal;
        };
        const precioTotal = calcularPrecioTotal(selectedAccommodation.precioPorNoche, fecha_inicio, fecha_fin);

        const newReservation = new Reservation({
            usuario,
            alojamiento: idAlojamiento,
            nombreReserva,
            fecha_inicio,
            fecha_fin,
            huespedes,
            telefono,
            emailConfirmacion,
            precioTotal
        });
        await newReservation.save();

        req.flash('success', 'Reserva creada con éxito');
        res.redirect('/profile/reservations');
        console.log("Datos de la reserva creada:", { usuario,
            idAlojamiento,
            nombreReserva,
            fecha_inicio,
            fecha_fin,
            huespedes,
            telefono,
            emailConfirmacion,
            precioTotal
        });
    } catch (error) {
        console.error("Error en crearNuevaReserva:", error);
        req.flash('error', 'Error al crear reserva');
        res.redirect('/profile');
    }
};
// Otros controladores reservas

