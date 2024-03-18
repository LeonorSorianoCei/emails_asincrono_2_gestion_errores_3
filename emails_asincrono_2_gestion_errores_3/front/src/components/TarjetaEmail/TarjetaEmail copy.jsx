import React, { useState } from "react";
import "./TarjetaEmail.css";

const TarjetaEmail = ({
  id,
  nombre,
  imagen,
  descripcion,
  estado,
  tema,
  date,
  onToggleEstado,
}) => {
  // Estado local para gestionar el estado actual de la tarjeta
  const [currentEstado, setCurrentEstado] = useState(estado);

  // Función para manejar el cambio de estado al hacer clic en el botón
  const handleToggleEstado = (e) => {
    e.stopPropagation();
    // Alternar el estado actual entre "Archivado" y "Mantenido"
    const newEstado = currentEstado === "Archivado" ? "Mantenido" : "Archivado";
    // Actualizar el estado local y llamar a la función externa para propagar el cambio
    setCurrentEstado(newEstado);
    onToggleEstado(id, newEstado);
  };

  return (
    <div className="tarjeta">
      <div className="informacion">
        <p className="tema">{tema}</p>
        <div className="imagen">
          <div className="flex">
            <img src={imagen} alt={nombre} />
            <p className="nombre-emisor">{nombre}</p>
          </div>
          <p className="date">{date}</p>
        </div>
        <p className="descripcion">{descripcion}</p>
        <div className="flex">
          <p className="estado">{currentEstado}</p>
          {/* Botón que muestra "Archivar" o "Mantener" según el estado actual */}
          <button onClick={handleToggleEstado}>{currentEstado === "Mantenido" ? "Archivar" : "Mantener"}</button>
        </div>
      </div>
    </div>
  );
};

export default TarjetaEmail;
