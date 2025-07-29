// src/pages/Clientes.jsx
import { useState, useEffect } from 'react';
import api from '../../services/api';

const ClienteList = () => {
  const [clientes, setClientes] = useState([]);
  const [form, setForm] = useState({ nombre: '', nit: '' });

  const fetchClientes = async () => {
    const res = await api.get('/clientes');
    setClientes(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post('/clientes', form);
    setForm({ nombre: '', nit: '' });
    fetchClientes(); // Recargar la lista
  };

  useEffect(() => {
    fetchClientes();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Clientes</h2>

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
          placeholder="NIT"
          value={form.nit}
          onChange={(e) => setForm({ ...form, nit: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Crear Cliente
        </button>
      </form>

      <table className="w-full text-left border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Nombre</th>
            <th className="p-2 border">NIT</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map((cliente) => (
            <tr key={cliente.id}>
              <td className="p-2 border">{cliente.nombre}</td>
              <td className="p-2 border">{cliente.nit}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClienteList;