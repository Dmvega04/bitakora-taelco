// frontend-bitakora-taelco/src/services/authService.js

import api from './api';

export const login = async (credentials) => {
  try {
    const response = await api.post('/auth/login', credentials);
    const { token } = response.data;
    if (token) {
      localStorage.setItem('token', token);
      return { success: true, token };
    } else {
      throw new Error('No se recibió token en la respuesta');
    }
  } catch (error) {
    console.error('Error en login:', error.response?.data || error.message);
    throw error;
  }
};
