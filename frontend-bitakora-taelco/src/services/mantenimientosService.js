import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'https://bitakora-backend.onrender.com';

const token = localStorage.getItem('token');

const headers = {
  Authorization: `Bearer ${token}`,
};

export const obtenerMantenimientos = async () => {
  const response = await axios.get(`${API_URL}/mantenimientos`, { headers });
  return response.data;
};

export const crearMantenimiento = async (mantenimientoData) => {
  const response = await axios.post(`${API_URL}/mantenimientos`, mantenimientoData, { headers });
  return response.data;
};
