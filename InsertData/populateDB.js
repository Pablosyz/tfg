const mongoose = require('mongoose');
const Accommodation = require('../models/accommodationModel'); // Ajusta la ruta según la estructura de tu proyecto

// Conecta a la base de datos
mongoose.connect('mongodb://127.0.0.1:27017/miaplicaciondb', { useNewUrlParser: true, useUnifiedTopology: true });

// Ejemplo de alojamiento de prueba
const alojamientoPrueba = new Accommodation({
    nombre: 'LovelyLoft Altamira Dúplex',
    ubicacion: 'Centro, Alicante',
    fotos: [
        { url: '/images/Altamira/foto (1).jpg' },
        { url: '/images/Altamira/foto (2).jpg' },
        { url: '/images/Altamira/foto (3).jpg' },
        { url: '/images/Altamira/foto (4).jpg' },
        { url: '/images/Altamira/foto (5).jpg' },
        { url: '/images/Altamira/foto (6).jpg' },
        { url: '/images/Altamira/foto (7).jpg' },
        { url: '/images/Altamira/foto (8).jpg' },
        { url: '/images/Altamira/foto (9).jpg' },
        { url: '/images/Altamira/foto (10).jpg' },
        { url: '/images/Altamira/foto (11).jpg' },
        { url: '/images/Altamira/foto (12).jpg' }
    ],
    disponibilidad: [
        { date: new Date('2024-01-03'), available: true },
        { date: new Date('2024-01-04'), available: true },
        // Puedes agregar más fechas de disponibilidad según sea necesario
    ],
    descripcion: 'En un edificio histórico en el más céntrico emplazamiento de Alicante, junto al Ayuntamiento y la Rambla Méndez Núñez, y a pocos pasos de la playa del Postiguet, encontramos este impresionante loft dúplex de más de 200 mts2 proyectado por un prestigioso equipo de arquitectos. Hacer que este piso sea tu hogar en Alicante por unos días está a tu alcance, y disfrutar de este espacio con altísimos techos y ventanales, su terraza con privacidad total, su enorme cocina con todo el equipamiento imaginable… para una estancia de cinco estrellas.',
    precioPorNoche: 400,
    capacidad: 4,
    tipo: 'Apartamento',
    caracteristicas: [
        { caracteristica: 'Aire Acondicionado'},
        { caracteristica: 'Se permiten mascotas'},
        { caracteristica: 'Terraza'},
        { caracteristica: 'Lavavajillas'},
        { caracteristica: 'Internet'},
        { caracteristica: 'Lavadora'},
        { caracteristica: 'Ubicación céntrica'},
        { caracteristica: 'Televisión'},
    ],
    comentarios: [
        { usuario: 'Pepe', comentario: 'El apartamento es precioso, pasamos una muy buena estancia', fecha: new Date('2024-01-02') }
    ]
});

// Guarda el alojamiento en la base de datos
alojamientoPrueba.save()
    .then(() => {
        console.log('Alojamiento de prueba agregado a la base de datos');
        mongoose.connection.close();
    })
    .catch((error) => {
        console.error('Error al agregar el alojamiento de prueba:', error);
        mongoose.connection.close();
    });
