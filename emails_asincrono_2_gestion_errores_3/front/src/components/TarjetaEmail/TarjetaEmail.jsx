import React, { useState, useEffect } from "react";
import { easyFetch } from '../../helpers/utils';
import "./TarjetaEmail.css";

const { VITE_BACKEND_URL } = import.meta.env;


const TarjetaEmail = ({ id }) => {
  const [email, setEmail] = useState(null);

  useEffect(() => {
    fetchEmail();
  }, []);

  const fetchEmail = () => {
    easyFetch({
      url: `${VITE_BACKEND_URL}/emails/${id}`,
      callback: (jsonData) => {
        setEmail(jsonData.data);
      }
    });
  };

  const handleToggleEstado = (event) => {
    event.stopPropagation();
    const newEstado = email.estado === "Archivado" ? "Mantenido" : "Archivado";
    setEmail((prevEmail) => ({
      ...prevEmail,
      estado: newEstado
    }));
  }
  
  
  
  if (!email) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="tarjeta">
      <div className="informacion">
        <p className="tema">{email.tema}</p>
        <div className="imagen">
          <div className="flex">
            <img src={email.imagen} alt={email.nombre} />
            <p className="nombre-emisor">{email.nombre}</p>
          </div>
          <p className="date">{email.date}</p>
        </div>
        <p className="descripcion">{email.descripcion}</p>
        <div className="flex">
          <p className="estado">{email.estado}</p>
          <button onClick={handleToggleEstado}>
            {email.estado === "Mantenido" ? "Archivar" : "Mantener"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TarjetaEmail;

