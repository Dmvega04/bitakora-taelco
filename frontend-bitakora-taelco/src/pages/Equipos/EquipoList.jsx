// src/pages/Clientes.jsx
import { useState, useEffect } from 'react';
import api from '../../services/api';

const EquipoList = () => {
  const [equipos, setEquipos] = useState([]);
  const [form, setForm] = useState({ nombre: '', tipo: '', serial: '', ubicacion: '', clienteId:'' });

  const fetchEquipos = async () => {
    const res = await api.get('/equipos');
    setEquipos(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post('/equipos', form);
    setForm({ nombre: '', tipo: '', serial: '', ubicacion: '', clienteId:'' });
    fetchEquipos(); // Recargar la lista
  };

  useEffect(() => {
    fetchEquipos();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Equipos</h2>

      <form onSubmit={handleSubmit} className="mb-6 space-y-4">
        <input
          type="text"
          placeholder="Nombre"
          value={form.nombre}
          onChange={(e) => setForm({ ...form, nombre: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          placeholder="Tipo"
          value={form.tipo}
          onChange={(e) => setForm({ ...form, tipo: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />
         <input
          type="text"
          placeholder="Serial"
          value={form.serial}
          onChange={(e) => setForm({ ...form, serial: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          placeholder="Ubicación"
          value={form.ubicacion}
          onChange={(e) => setForm({ ...form, ubicacion: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          placeholder="Id Cliente"
          value={form.clienteId}
          onChange={(e) => setForm({ ...form, clienteId: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Crear Equipo
        </button>
      </form>

      <table className="w-full text-left border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Nombre</th>
            <th className="p-2 border">Tipo</th>
            <th className="p-2 border">Serial</th>
            <th className="p-2 border">Ubicación</th>
            <th className="p-2 border">Id del Cliente</th>
          </tr>
        </thead>
        <tbody>
          {equipos.map((equipo) => (
            <tr key={equipo.id}>
              <td className="p-2 border">{equipo.nombre}</td>
              <td className="p-2 border">{equipo.tipo}</td>
              <td className="p-2 border">{equipo.serial}</td>
              <td className="p-2 border">{equipo.ubicacion}</td>
              <td className="p-2 border">{equipo.clienteId}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EquipoList;