// accommodationController.js
const Accommodation = require('../models/accommodationModel');

// Middleware para verificar el rol de administrador
function isAdmin(req, res, next) {
    if (req.user && req.user.role === 'admin') {
        // Si el usuario es administrador, continúa con la siguiente operación
        next();
    } else {
        // Si el usuario no es administrador, permite la operación solo si es una consulta (GET)
        if (req.method === 'GET') {
            next();
        } else {
            // Si la solicitud no es una consulta (GET), responde con un error
            res.status(403).json({ message: 'Acceso no autorizado. Se requieren privilegios de administrador para crear alojamientos.' });
        }
    }
}

// Controlador para crear un nuevo alojamiento
async function createAccommodation(req, res) {
    try {
        const nuevoAlojamiento = new Accommodation(req.body);
        await nuevoAlojamiento.save();
        res.status(201).json(nuevoAlojamiento);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Controlador para obtener todas las imágenes de un alojamiento
async function getAccommodationImages(req, res) {
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
async function addAccommodationImage(req, res) {
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
async function getAccommodationAvailability(req, res) {
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
async function addAccommodationAvailability(req, res) {
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

module.exports = {
    isAdmin,
    createAccommodation,
    getAccommodationImages,
    addAccommodationImage,
    getAccommodationAvailability,
    addAccommodationAvailability
    // Otros controladores...
};
