import { useEffect, useState } from "react";
import "./App.css";
import Card from "./components/Card";

function App() {
  // ESTADOS
  const [tarea, setTarea] = useState(() => {
    const tareas = localStorage.getItem("tareas");
    return tareas ? JSON.parse(tareas) : [];
  });
  const [nuevaTarea, setNuevaTarea] = useState({
    titulo: "",
    completada: false,
  });
  const [completadas, setCompletadas] = useState(false);

  // Efecto para actualizar cada vez que se cambie el array tareas y actualizar el localStorage
  useEffect(() => {
    localStorage.setItem("tareas", JSON.stringify(tarea));
  }, [tarea]);

  const recogerInput = (e) => {
    setNuevaTarea({ titulo: e.target.value, completada: false });
  };

  const meterTareas = () => {
    if (nuevaTarea.titulo.trim() === "") return;
    const existe = tarea.some((t) => t.titulo === nuevaTarea.titulo);
    if (existe) return;
    setTarea([...tarea, nuevaTarea]);
    setNuevaTarea({ titulo: "", completada: false });
  };

  const eliminarTarea = (titulo) => {
    setTarea(tarea.filter((t) => t.titulo !== titulo));
  };

  const completarTarea = (titulo) => {
    setTarea(
      tarea.map((t) =>
        t.titulo === titulo ? { ...t, completada: !t.completada } : t
      )
    );
  };
  const tareasFiltradas = tarea.filter((t) =>
    completadas ? t.completada : !t.completada
  );

  return (
    <>
      <header className="td-header">
        <nav className="td-nav">
          <h2>TO DO LIST - REACT </h2>
          <div>
            <input
              className="td-input"
              placeholder="Agrega una tarea..."
              onChange={recogerInput}
              value={nuevaTarea.titulo}
            />
            <button className="td-button" onClick={meterTareas}>
              Agregar
            </button>
            <button
              className="td-button"
              onClick={() => setCompletadas(!completadas)}
            >
              {completadas
                ? "Ver tareas no completadas"
                : "Ver tareas completadas"}
            </button>
          </div>
        </nav>
      </header>
      <main className="td-main">
        {tareasFiltradas.length > 0 ? (
          tareasFiltradas.map((t, index) => (
            <Card
              key={index}
              titulo={t.titulo}
              eliminarTarea={eliminarTarea}
              completarTarea={completarTarea}
              completada={t.completada}
            />
          ))
        ) : (
          <p className="td-no-tareas">
            {completadas
              ? "No hay tareas completadas"
              : "No hay tareas pendientes"}
          </p>
        )}
      </main>
    </>
  );
}

export default App;
