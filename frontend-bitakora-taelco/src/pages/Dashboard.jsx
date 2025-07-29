import React, { useEffect, useState } from "react";
import { API_URL } from "../config";

function Dashboard() {
  const [equipos, setEquipos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      setError("No autenticado. Por favor, inicia sesión.");
      setLoading(false);
      return;
    }

    fetch(`${API_URL}/equipos`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Error al obtener los equipos");
        }
        return res.json();
      })
      .then((data) => {
        setEquipos(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Error desconocido");
        setLoading(false);
      });
  }, [token]);

  if (loading) return <p className="p-4">Cargando equipos...</p>;

  if (error) return <p className="p-4 text-red-600">Error: {error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard - Equipos</h1>

      {equipos.length === 0 ? (
        <p>No hay equipos registrados.</p>
      ) : (
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2 text-left">ID</th>
              <th className="border px-4 py-2 text-left">Nombre</th>
              <th className="border px-4 py-2 text-left">Tipo</th>
              <th className="border px-4 py-2 text-left">Ubicación</th>
              <th className="border px-4 py-2 text-left">Serial</th>
            </tr>
          </thead>
          <tbody>
            {equipos.map((equipo) => (
              <tr key={equipo.id}>
                <td className="border px-4 py-2">{equipo.id}</td>
                <td className="border px-4 py-2">{equipo.nombre}</td>
                <td className="border px-4 py-2">{equipo.tipo}</td>
                <td className="border px-4 py-2">{equipo.ubicacion}</td>
                <td className="border px-4 py-2">{equipo.serial}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Dashboard;
