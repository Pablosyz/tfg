// accommodationController.js
const Accommodation = require('../models/accommodationModel');
const User = require("../models/userModel");


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

exports.getNewAccommodation = async (req, res) => {
    try {
        // Verificar si el usuario está logueado y es admin
        if (req.isAuthenticated() && req.user.role === 'admin') {
            // Renderizar la página de administración
            res.render('admin/newAccommodation');
        } else {
            // Renderizar la página pública de alojamientos
            res.redirect('/alojamientos');
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createAccommodation = async (req, res) => {
    try {
        const { nombre, ubicacion, precioPorNoche, capacidad, tipo, descripcion, caracteristicas } = req.body;

        // Accede a las imágenes cargadas desde el formulario
        const fotos = req.files;

        // Procesa las imágenes y construye el array de objetos para el modelo
        const fotosArray = fotos.map(image => {
            return {
                url: `/images/${image.filename}`, // Ajusta la ruta según tu estructura de archivos

            };
        });

        const parsedCaracteristicas = Array.isArray(caracteristicas) ? caracteristicas : [caracteristicas];

        const newAccommodation = new Accommodation({
            nombre,
            ubicacion,
            precioPorNoche,
            capacidad,
            tipo,
            descripcion,
            caracteristicas: parsedCaracteristicas,
            fotos: fotosArray,
        });

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
        const accommodation = await Accommodation.findById(id);

        if (!accommodation) {
            return res.status(404).json({ message: 'Alojamiento no encontrado' });
        }

        const imagenes = accommodation.imagenes || [];
        res.json(imagenes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Controlador para agregar una nueva imagen a un alojamiento
exports.addAccommodationImage = async (req, res) => {
    try {
        const { id } = req.params;
        const accommodation = await Accommodation.findById(id);

        if (!accommodation) {
            return res.status(404).json({ message: 'Alojamiento no encontrado' });
        }

        const nuevaImagen = req.body.nuevaImagen;
        accommodation.imagenes.push(nuevaImagen);
        await accommodation.save();

        res.status(201).json(accommodation);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Controlador para obtener todas las fechas de disponibilidad de un alojamiento
exports.getAccommodationAvailability = async (req, res) => {
    try {
        const { id } = req.params;
        const accommodation = await Accommodation.findById(id);

        if (!accommodation) {
            return res.status(404).json({ message: 'Alojamiento no encontrado' });
        }

        const availability = accommodation.disponibilidad || [];
        // Renderizar la vista con los detalles del alojamiento y las fechas de disponibilidad
        res.render('detalleAlojamiento.ejs', { accommodation, availability });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controlador para agregar una nueva fecha de disponibilidad a un alojamiento
exports.addAccommodationAvailability = async (req, res) => {
    try {
        const { id } = req.params;
        const accommodation = await Accommodation.findById(id);

        if (!accommodation) {
            return res.status(404).json({ message: 'Alojamiento no encontrado' });
        }

        const nuevaFechaDisponibilidad = req.body.nuevaFechaDisponibilidad;
        accommodation.disponibilidad.push(nuevaFechaDisponibilidad);
        await accommodation.save();

        res.status(201).json(accommodation);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.getAccommodationDetail = async (req, res) => {
    try {
        const accommodation = await Accommodation.findById(req.params.id);

        if (!accommodation) {
            // Manejar el caso en que el alojamiento no se encuentre
            return res.status(404).render('error.ejs', { message: 'Alojamiento no encontrado' });
        }

        // Obtener las fechas ocupadas o disponibilidad del alojamiento, dependiendo de tu implementación
        const reservas = accommodation.disponibilidad.reservas || [];

        // Renderizar la vista con los detalles del alojamiento y las fechas ocupadas
        res.render('detalleAlojamiento.ejs', { accommodation, reservas });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
// Otros controladores para reservas, si es necesario...
