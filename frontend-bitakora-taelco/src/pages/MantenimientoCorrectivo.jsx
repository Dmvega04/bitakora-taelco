import { useEffect, useState } from 'react';
import { obtenerMantenimientos } from '../services/mantenimientosService';

const MantenimientoCorrectivo = () => {
  const [mantenimientos, setMantenimientos] = useState([]);

  useEffect(() => {
    const fetchMantenimientos = async () => {
      try {
        const data = await obtenerMantenimientos();
        const correctivos = data.filter(m => m.tipo === 'CORRECTIVO');
        setMantenimientos(correctivos);
      } catch (error) {
        console.error('Error al obtener mantenimientos correctivos:', error);
      }
    };

    fetchMantenimientos();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Mantenimientos Correctivos</h1>
      {mantenimientos.length === 0 ? (
        <p>No hay mantenimientos correctivos registrados.</p>
      ) : (
        <div className="space-y-4">
          {mantenimientos.map((m) => (
            <div key={m.id} className="bg-white shadow p-4 rounded">
              <p><strong>Equipo:</strong> {m.equipo?.nombre}</p>
              <p><strong>Fecha:</strong> {new Date(m.fecha).toLocaleDateString()}</p>
              <p><strong>Descripción:</strong> {m.descripcion}</p>
              <p><strong>Técnico:</strong> {m.usuario?.nombre || 'No asignado'}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MantenimientoCorrectivo;
