import mysql from 'mysql2/promise';
import { connection } from "../index.js";

// Formato de Respuesta
const responseAPI = {
    data: [],
    msg:"",
    status: "ok"
}

// Función para obtener todos los emails
export const getAllEmails = async (req, res) => {
    try {
        // Consulta SQL para obtener todos los emails
        const consulta = `SELECT * FROM datosemails`;

        // Ejecutar la consulta SQL
        const [results, fields] = await connection.query(consulta);

        // Establecer los datos de los emails en la respuesta
        responseAPI.data = results;
        responseAPI.msg = "Obtener todos los emails";
        res.status(200).send(responseAPI);
    } catch (error) {
        // Si ocurre un error durante la ejecución, enviar una respuesta de error
        console.error("Error al obtener todos los emails:", error);
        responseAPI.msg = "Error al obtener todos los emails";
        responseAPI.status = "error";
        res.status(500).send(responseAPI);
    }
};

// Función para obtener un email por su ID
export const getEmailById = async (req, res) => {
    try {
        // Obtener el ID del email de los parámetros de la solicitud
        const { id } = req.params;

        // Consulta SQL para obtener el email por su ID
        const consulta = `SELECT * FROM datosemails WHERE id = ?`;

        // Ejecutar la consulta SQL con el ID proporcionado
        const [results, fields] = await connection.query(consulta, [id]);

        // Verificar si se encontró un email con el ID proporcionado
        if (results.length === 0) {
            // Si no se encuentra ningún email, devolver un mensaje de error
            responseAPI.msg = `No se encontró ningún email con el ID ${id}`;
            responseAPI.status = "error";
        } else {
            // Si se encuentra un email, establecer los datos del email en la respuesta
            responseAPI.data = results[0];
            responseAPI.msg = `Obtener email con ID ${id}`;
        }

        // Enviar la respuesta al cliente
        res.status(200).send(responseAPI);
    } catch (error) {
        // Si ocurre un error durante la ejecución, enviar una respuesta de error
        console.error("Error al obtener email por ID:", error);
        responseAPI.msg = "Error al obtener email por ID";
        responseAPI.status = "error";
        res.status(500).send(responseAPI);
    }
};
