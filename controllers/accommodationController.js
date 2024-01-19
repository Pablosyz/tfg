// accommodationController.js
const Accommodation = require('../models/accommodationModel');

exports.getAccommodations = async (req, res) => {
    try {
        const accommodations = await Accommodation.find();

        // Verificar si el usuario está logueado y es admin
        if (req.isAuthenticated() && req.user.role === 'admin') {
            // Renderizar la página de administración
            res.render('admin/accommodations', { accommodations });
        } else {
            // Renderizar la página pública de alojamientos
            res.render('alojamientos', { accommodations });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createAccommodation = async (req, res) => {
    try {
        const { nombre, ubicacion, precioPorNoche, capacidad, tipo, descripcion } = req.body;
        const newAccommodation = new Accommodation({ nombre, ubicacion, precioPorNoche, capacidad, tipo, descripcion });
        await newAccommodation.save();
        req.flash('success', 'Alojamiento creado con éxito');
        res.redirect('/admin/accommodations');
    } catch (error) {
        console.error(error);
        req.flash('error', 'Error al crear alojamiento');
        res.redirect('/admin/accommodations');
    }
};

exports.editAccommodation = async (req, res) => {
    try {
        const accommodation = await Accommodation.findById(req.params.id);
        res.render('admin/editAccommodation', { accommodation });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateAccommodation = async (req, res) => {
    try {
        const accommodationId = req.params.id;
        const { nombre, ubicacion, precioPorNoche, capacidad, tipo, descripcion } = req.body;
        await Accommodation.findByIdAndUpdate(accommodationId, { nombre, ubicacion, precioPorNoche, capacidad, tipo, descripcion });
        res.redirect('/admin/accommodations');
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteAccommodation = async (req, res) => {
    try {
        await Accommodation.findByIdAndDelete(req.params.id);
        res.redirect('/admin/accommodations');
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controlador para obtener todas las imágenes de un alojamiento
exports.getAccommodationImages = async (req, res) => {
    try {
        const { id } = req.params;
        const alojamiento = await Accommodation.findById(id);

        if (!alojamiento) {
            return res.status(404).json({ message: 'Alojamiento no encontrado' });
        }

        const imagenes = alojamiento.imagenes || [];
        res.json(imagenes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Controlador para agregar una nueva imagen a un alojamiento
exports.addAccommodationImage = async (req, res) => {
    try {
        const { id } = req.params;
        const alojamiento = await Accommodation.findById(id);

        if (!alojamiento) {
            return res.status(404).json({ message: 'Alojamiento no encontrado' });
        }

        const nuevaImagen = req.body.nuevaImagen; // Asegúrate de enviar la imagen en el cuerpo de la solicitud
        alojamiento.imagenes.push(nuevaImagen);
        await alojamiento.save();

        res.status(201).json(alojamiento);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Controlador para obtener todas las fechas de disponibilidad de un alojamiento
exports.getAccommodationAvailability = async (req, res) => {
   try {
        const { id } = req.params;
        const alojamiento = await Accommodation.findById(id);

        if (!alojamiento) {
            return res.status(404).json({ message: 'Alojamiento no encontrado' });
        }

        const disponibilidad = alojamiento.disponibilidad || [];
        res.json(disponibilidad);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Controlador para agregar una nueva fecha de disponibilidad a un alojamiento
exports.addAccommodationAvailability = async (req, res) => {
    try {
        const { id } = req.params;
        const alojamiento = await Accommodation.findById(id);

        if (!alojamiento) {
            return res.status(404).json({ message: 'Alojamiento no encontrado' });
        }

        const nuevaFechaDisponibilidad = req.body.nuevaFechaDisponibilidad; // Asegúrate de enviar la fecha en el cuerpo de la solicitud
        alojamiento.disponibilidad.push(nuevaFechaDisponibilidad);
        await alojamiento.save();

        res.status(201).json(alojamiento);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Otros controladores para reservas, si es necesario...
