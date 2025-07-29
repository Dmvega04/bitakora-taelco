import { useEffect, useState } from 'react';
import { obtenerMantenimientos } from '../services/mantenimientosService';

const MantenimientosPage = () => {
  const [mantenimientos, setMantenimientos] = useState([]);

  useEffect(() => {
    const fetchMantenimientos = async () => {
      try {
        const data = await obtenerMantenimientos();
        setMantenimientos(data);
      } catch (error) {
        console.error('Error al obtener mantenimientos:', error);
      }
    };

    fetchMantenimientos();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Mantenimientos Realizados</h1>
      {mantenimientos.length === 0 ? (
        <p>No hay mantenimientos registrados.</p>
      ) : (
        <div className="space-y-4">
          {mantenimientos.map((mantenimiento) => (
            <div key={mantenimiento.id} className="bg-white shadow-md p-4 rounded">
              <p><strong>Equipo:</strong> {mantenimiento.equipo?.nombre}</p>
              <p><strong>Ubicación:</strong> {mantenimiento.equipo?.ubicacion}</p>
              <p><strong>Fecha:</strong> {new Date(mantenimiento.fecha).toLocaleDateString()}</p>
              <p><strong>Descripción:</strong> {mantenimiento.descripcion}</p>
              <p><strong>Técnico:</strong> {mantenimiento.usuario?.nombre || 'No asignado'}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MantenimientosPage;
