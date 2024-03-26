// reservationController.js
const Reservation = require('../models/reservationModel');
const Accommodation = require('../models/accommodationModel')
const User = require('../models/userModel');

exports.getReservations = async (req, res) => {
    try {
        const reservations = await Reservation.find()
            .populate('usuario')
            .populate('alojamiento');
        // Carga las consultas para obtener la lista de alojamientos y usuarios

        res.render('admin/reservations', { reservations });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getNewReservation = async (req, res) => {
    try {
        if (req.isAuthenticated() && req.user.role === 'admin') {
            // Renderizar la página de administración
            const accommodations = await Accommodation.find();
            const users = await User.find();
            res.render('admin/newReservation', {users, accommodations});
        } else {
            res.redirect('/profile')
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createReservation = async (req, res) => {
    try {
        const {
            usuario,
            alojamiento,
            nombreReserva,
            emailConfirmacion,
            telefono,
            fecha_inicio,
            fecha_fin,
            huespedes,
            precioTotal
        } = req.body;

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
        });

        await newReservation.save();

        // Lógica para actualizar el alojamiento una vez realizada la reserva
        const selectedAccommodation = await Accommodation.findById(alojamiento);
        const nuevaReserva = {
            start: fecha_inicio,
            end: fecha_fin,
        };
        selectedAccommodation.disponibilidad.reservas.push(nuevaReserva);
        await selectedAccommodation.save();

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
            .populate('usuario');

        const accommodations = await Accommodation.find();

        res.render('admin/editReservation', { reservation, accommodations });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateReservation = async (req, res) => {
    try {
        const reservationId = req.params.id;
        const {
            alojamiento,
            nombreReserva,
            fecha_inicio,
            fecha_fin,
            huespedes,
            telefono,
            emailConfirmacion,
            precioTotal
        } = req.body;

        const updatedReservation = {
            alojamiento,
            nombreReserva,
            fecha_inicio,
            fecha_fin,
            huespedes,
            telefono,
            emailConfirmacion,
            precioTotal
        };

        await Reservation.findByIdAndUpdate(reservationId, updatedReservation);

        // Lógica para actualizar el alojamiento una vez modificada la reserva
        const selectedAccommodation = await Accommodation.findById(alojamiento);
        const nuevaReserva = {
            start: fecha_inicio,
            end: fecha_fin,
        };
        // Eliminar la reserva anterior del array de reservas
        selectedAccommodation.disponibilidad.reservas = selectedAccommodation.disponibilidad.reservas.filter(reserva =>
            reserva.start !== fecha_inicio && reserva.end !== fecha_fin
        );
        // Agregar la nueva reserva
        selectedAccommodation.disponibilidad.reservas.push(nuevaReserva);
        await selectedAccommodation.save();

        res.redirect('/admin/reservations');
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteReservation = async (req, res) => {
    try {
        const reservation = await Reservation.findById(req.params.id);

        // Verifica si la reserva existe
        if (!reservation) {
            return res.status(404).json({ error: 'Reserva no encontrada' });
        }

        // Verifica si el usuario está autenticado y es un administrador
        if (req.isAuthenticated() && req.user.role === 'admin') {
            // El usuario es administrador, puede eliminar la reserva
            await Reservation.findByIdAndDelete(req.params.id);

            // Lógica para actualizar el alojamiento una vez eliminada la reserva
            const selectedAccommodation = await Accommodation.findById(reservation.alojamiento);
            selectedAccommodation.disponibilidad.reservas = selectedAccommodation.disponibilidad.reservas.filter(reserva =>
                reserva.start !== reservation.fecha_inicio && reserva.end !== reservation.fecha_fin
            );
            await selectedAccommodation.save();

            res.redirect('/admin/reservations');
        } else if (req.isAuthenticated() && req.user.id === reservation.usuario.toString()) {
            // El usuario es el propietario de la reserva, puede eliminarla
            await Reservation.findByIdAndDelete(req.params.id);

            // Lógica para actualizar el alojamiento una vez eliminada la reserva
            const selectedAccommodation = await Accommodation.findById(reservation.alojamiento);
            selectedAccommodation.disponibilidad.reservas = selectedAccommodation.disponibilidad.reservas.filter(reserva =>
                reserva.start !== reservation.fecha_inicio && reserva.end !== reservation.fecha_fin
            );
            await selectedAccommodation.save();

            res.redirect('/profile');
        } else {
            // El usuario no tiene permisos para eliminar esta reserva
            res.status(403).json({ error: 'Acceso no autorizado' });
        }
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

// Lógica para crear una nueva reserva
exports.crearNuevaReserva = async (req, res) => {
    try {
        console.log("Creando nueva reserva...");
        console.log(req.body);
        const { nombreReserva, emailConfirmacion, telefono, fecha_inicio, fecha_fin, huespedes, idAlojamiento } = req.body;

        const usuario = req.user._id;

        const fechaInicioObj = new Date(fecha_inicio);
        const fechaFinObj = new Date(fecha_fin);

        const selectedAccommodation = await Accommodation.findById(idAlojamiento);

        // Verificar si el alojamiento existe
        if (!selectedAccommodation) {
            req.flash('error', 'El alojamiento seleccionado no existe');
            return res.redirect('/profile');
        }

        // Verificar disponibilidad antes de realizar la reserva
        const reservasAntes = [...selectedAccommodation.disponibilidad.reservas];
        console.log("Reservas antes de la reserva:", reservasAntes);

        const fechasOcupadas = reservasAntes
            .filter(reserva => {
                const start = new Date(reserva.start);
                const end = new Date(reserva.end);
                const reservaOverlap = (start <= fechaFinObj && end >= fechaInicioObj);
                return reservaOverlap;
            });

        if (fechasOcupadas.length > 0) {
            req.flash('error', 'Las fechas seleccionadas no están disponibles');
            return res.redirect('/profile');
        }

        // Calcular el precio total
        const calcularPrecioTotal = (precioPorNoche, fechaInicio, fechaFin) => {
            const fechaInicioObj = new Date(fechaInicio);
            const fechaFinObj = new Date(fechaFin);
            const diferenciaDias = (fechaFinObj - fechaInicioObj) / (1000 * 60 * 60 * 24);
            const precioTotal = precioPorNoche * diferenciaDias;


            return precioTotal;
        };

        const precioTotal = calcularPrecioTotal(selectedAccommodation.precioPorNoche, fecha_inicio, fecha_fin);

        const nuevaReserva = {
            start: fecha_inicio,
            end: fecha_fin,
        };

        selectedAccommodation.disponibilidad.reservas.push(nuevaReserva);

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

        // Guardar los cambios en el alojamiento
        await selectedAccommodation.save();

        // Verificar disponibilidad después de realizar la reserva
        const reservasDespues = [...selectedAccommodation.disponibilidad.reservas];
        console.log("Reservas después de la reserva:", reservasDespues);

        req.flash('success', 'Reserva creada con éxito');
        res.redirect('/profile/reservations');

        console.log("Datos de la reserva creada:", {
            usuario,
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

