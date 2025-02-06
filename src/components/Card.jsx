import React from "react";
import "./Card.css";

function Card({ titulo, eliminarTarea, completarTarea, completada }) {
  return (
    <div className="td-card">
      <h2>{completada ? <del>{titulo}</del> : titulo}</h2>
      <button
        onClick={() => completarTarea(titulo)}
        className={completada ? "td-card-button-completada" : "td-card-button"}
      >
        {completada ? "Tarea Completada" : "Completar Tarea"}
      </button>
      <button
        className="td-card-button-terminada"
        onClick={() => eliminarTarea(titulo)}
      >
        Eliminar
      </button>
    </div>
  );
}

export default Card;
