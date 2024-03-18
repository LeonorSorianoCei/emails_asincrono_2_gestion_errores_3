import mysql from 'mysql';
import dbData from './db/db.js';

// Función para migrar datos a la base de datos MySQL
function migrarDatos() {
    // Configurar la conexión a la base de datos MySQL
    const connection = mysql.createConnection({
        host: "localhost",
    user: "root",
    database: "datosemails"
    });

    // Conectar a la base de datos MySQL
    connection.connect();

    // Iterar sobre los datos de db.js y insertarlos en la base de datos
    dbData.forEach(email => {
        const { nombre, id, imagen, descripcion, tema, estado, date } = email;
        const query = `INSERT INTO datosemails (nombre, id, imagen, descripcion, tema, estado, date) VALUES (?, ?, ?, ?, ?, ?, ?)`;
        connection.query(query, [nombre, id, imagen, descripcion, tema, estado, date], (error, results, fields) => {
            if (error) throw error;
            console.log(`Registro insertado con ID: ${results.insertId}`);
        });
    });

    // Cerrar la conexión a la base de datos MySQL
    connection.end();
}

// Ejecutar la función de migración
migrarDatos();
