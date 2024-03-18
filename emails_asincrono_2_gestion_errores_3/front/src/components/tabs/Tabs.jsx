import React, { useState } from "react";
import DatosEmails from "../../../../back/db/db";
import TarjetaEmail from "../TarjetaEmail/TarjetaEmail";
import TarjetaEspecifica from "../tarjetaEspecifica/TarjetaEspecifica";
import "./Tabs.css";

const Tabs = () => {
  // Estados para gestionar pestañas, página actual, email seleccionado y visibilidad de los emails
  const [activeTab, setActiveTab] = useState(2);
  const [paginaActual, setPaginaActual] = useState("tabs");
  const [EmailSeleccionado, setEmailSeleccionado] = useState(null);
  const [mostrarEmail, setMostrarEmail] = useState(true);

  // Función para manejar el cambio de pestaña
  const handleClickTab = (tabIndex) => {
    setActiveTab(tabIndex);
    setMostrarEmail(true);
    setPaginaActual("tabs");
  };

  // Función para manejar el cambio de estado de los emails
  const handleToggleEstado = (id) => {
    // Encuentra la tarjeta por ID
    const tarjetaActualizada = DatosEmails.find((tarjeta) => tarjeta.id === id);

    // Cambia el estado de la tarjeta
    tarjetaActualizada.estado = tarjetaActualizada.estado === "Mantenido" ? "Archivado" : "Mantenido";

    // Actualiza el estado global de las tarjetas
    DatosEmails.forEach((tarjeta, index) => {
      if (tarjeta.id === id) {
        DatosEmails[index] = tarjetaActualizada;
      }
    });

    // Actualiza el estado local para forzar la actualización del componente
    setEmailSeleccionado(id);
  };

  // Función para manejar el clic en una tarjeta de email
  const handleClickTarjeta = (idEmail) => {
    setEmailSeleccionado(idEmail);
    setPaginaActual("TarjetaEspecifica");
    setMostrarEmail(false);
  };

  return (
    <section>
      <div>
        <div className="header">
          <div className="user-container">
            <p className="triage" onClick={() => handleClickTab(2)}>Triage</p>
            <p className="nombreUsuario">juanperez@gmail.com</p>
          </div>
          <img className="usuarioImage" src="https://img.freepik.com/foto-gratis/hombre-feliz-pie-playa_107420-9868.jpg?size=626&ext=jpg&ga=GA1.1.117944100.1709942400&semt=sph" alt="" />
        </div>
        {mostrarEmail ? (
          <>
            {activeTab === 0 && (
              <EmailList
                DatosEmails={DatosEmails.filter((email) => email.estado === "Archivado")}
                titulo="Archivados"
                tituloClase="mi-estilo-de-titulo"
                handleClickTarjeta={handleClickTarjeta}
                handleToggleEstado={handleToggleEstado}
                mostrarEmail={mostrarEmail}
              />
            )}
            {activeTab === 1 && (
              <EmailList
                DatosEmails={DatosEmails.filter((email) => email.estado === "Mantenido")}
                titulo="Mantenidos"
                tituloClase="mi-estilo-de-titulo"
                handleClickTarjeta={handleClickTarjeta}
                handleToggleEstado={handleToggleEstado}
                mostrarEmail={mostrarEmail}
              />
            )}
            {activeTab === 2 && (
              <EmailList
                DatosEmails={DatosEmails}
                titulo="Todos los emails"
                tituloClase="mi-estilo-de-titulo"
                handleClickTarjeta={handleClickTarjeta}
                handleToggleEstado={handleToggleEstado}
                mostrarEmail={mostrarEmail}
              />
            )}
          </>
        ) : (
          <TarjetaEspecifica idEmail={EmailSeleccionado} />
        )}
      </div>
      <div className="Tabs-btns-container">
        <button onClick={() => handleClickTab(0)}>Archivados📬</button>
        <button onClick={() => handleClickTab(1)}>Mantenidos📪</button>
      </div>
    </section>
  );
};

// Componente funcional para renderizar la lista de emails
const EmailList = ({ DatosEmails, titulo, handleClickTarjeta, handleToggleEstado, mostrarEmail, tituloClase }) => {
  return (
    <div>
      <h1 className={tituloClase}>{titulo}</h1>

      {mostrarEmail &&
        DatosEmails.map(
          ({ id, nombre, imagen, tema, descripcion, estado, date }, index) => (
            <div key={index} onClick={() => handleClickTarjeta(id)}>
              <TarjetaEmail
                id={id}
                nombre={nombre}
                tema={tema}
                imagen={imagen}
                descripcion={descripcion}
                date={date}
                estado={estado}
                onToggleEstado={() => handleToggleEstado(id)}
              />
            </div>
          )
        )}
    </div>
  );
};

export default Tabs;
