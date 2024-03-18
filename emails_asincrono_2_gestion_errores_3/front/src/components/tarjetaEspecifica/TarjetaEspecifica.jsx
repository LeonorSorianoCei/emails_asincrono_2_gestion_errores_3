import React from "react";
import DatosEmails from "../../../../back/db/db";
import "./TarjetaEspecifica.css";

const TarjetaEspecifica = ({ idEmail }) => {
  // Buscar el email específica por su id
  const email = DatosEmails.find(
    (email) => email.id === idEmail
  );

  // Comprobar si se encontró el email
  if (!email) {
    return <p>No se encontró el email.</p>;
  }

  // Extraer propiedades del email
  const { tema, imagen, descripcion, nombre, estado } = email;

  return (
    <>
      <div className="container-TarjetaEspecifica">
        <h2>{tema}</h2>
        <div className="imagen">
          <div className="flex">
            <img src={imagen} alt={nombre} />
            <h3 className="nombree">{nombre}</h3>
          </div>
        </div>
        <div className="textoDescri">{descripcion}</div>
        <div className="responder">
          <p>{estado}</p>
          <p>Responder</p>
        </div>
      </div>
    </>
  );
};

export default TarjetaEspecifica;
