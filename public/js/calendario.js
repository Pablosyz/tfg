// calendario.js
import { Calendar } from '@fullcalendar/core'
import dayGridPlugin from '@fullcalendar/daygrid'
document.addEventListener('DOMContentLoaded', function () {
    const fechasOcupadasArray = Array.isArray(fechasOcupadas) ? fechasOcupadas : [];

    // Filtrar las fechas ocupadas para obtener un array de objetos con el formato que FullCalendar espera
    const eventos = fechasOcupadasArray.map(fecha => ({
        title: 'Ocupado',
        date: fecha
    }));

    // Inicializar y mostrar el calendario
    const calendarEl = document.getElementById('calendario');
    const calendar = new Calendar(calendarEl, {
        plugins: [dayGridPlugin],
        initialView: 'dayGridMonth',
        events: eventos
    });

    calendar.render();
});
