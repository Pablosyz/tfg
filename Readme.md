**Trabajo de Fin de Grado sobre Desarrollo de una Plataforma Web de Gestión y Reservas de Alojamientos Turísticos
Resumen del proyecto**

**Descripción:**

Esta aplicación web permite gestionar las reservas de alojamientos turísticos de forma online. Facilita la comunicación entre propietarios de alojamientos y clientes, optimizando el proceso de búsqueda, reserva y gestión de estancias.

**Tecnologías:**

* **Lenguajes de programación:** Node.js
* **Frameworks:** Express
* **Base de datos:** MongoDB
* **Motor de plantillas**: EJS
* **Diseño web:** Materialize CSS
* **Autenticación:** Passport.js

**Funcionalidades:**

Sistema de gestión de alojamientos: Los propietarios pueden publicar sus alojamientos, incluyendo fotos, descripciones, precios y disponibilidad.
Sistema de reservas online: Los clientes pueden buscar y reservar alojamientos según sus preferencias, fechas y presupuesto.
Panel de control para propietarios: Los propietarios pueden gestionar sus reservas, calendarios, comunicación con clientes y estadísticas.
Panel de control para clientes: Los clientes pueden ver sus reservas, realizar pagos, modificar datos y comunicarse con los propietarios.
Autenticación de usuarios: Los usuarios se registran y acceden a la plataforma mediante un sistema de autenticación seguro.

**Instalación**
(Pendiente de definición)

* Descargar e instalar **NodeJS**
* Descargar e instalar **MongoDB**

En primer lugar, habrá que iniciar mongoDB y crear una base de datos para que se pueda usar desde la aplicación.
Después, habrá que modificar la conexión a la BD desde nuestro fichero principal `app.js` 

    mongoose.connect('mongodb://127.0.0.1:27017/miaplicaciondb', { })
    ...

Una vez realizados estos pasos anteriores, lo siguiente será ejecutar el comando

    npm install
Para instalar todos los paquetes de NodeJS necesarios en el proyecto. Posteriormente, podremos iniciar nuestra aplicación
mediante el comando:

    node app.js

**Ejemplos**
(Pendientes de definición)

**Información adicional**
* **Licencia:** (pendiente)

* **Recursos adicionales** (pendiente)
(enlaces a sitios web relacionados, documentación o repositorios)

* **Capturas de pantalla o demostraciones**
