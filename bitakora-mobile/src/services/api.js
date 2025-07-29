import AsyncStorage from '@react-native-async-storage/async-storage';

// Asegurarnos que la URL termine sin barra
const BASE_URL = 'https://bitakora-backend.onrender.com/api'.replace(/\/$/, '');

console.log('URL Base configurada:', BASE_URL);

const getHeaders = async () => {
  const token = await AsyncStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  };
};

// Autenticación
export const loginUser = async (email, password) => {
  try {
    const url = `${BASE_URL}/auth/login`;
    console.log('URL completa:', url);
    console.log('Datos enviados:', { email, password });

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ email, password }),
    });
    
    console.log('Status de la respuesta:', response.status);
    console.log('Headers de la respuesta:', response.headers);
    
    const responseText = await response.text();
    console.log('Respuesta como texto:', responseText);

    // Si la respuesta está vacía
    if (!responseText) {
      throw new Error('El servidor devolvió una respuesta vacía');
    }

    try {
      const data = JSON.parse(responseText);
      console.log('Datos parseados:', data);
      
      if (!response.ok) {
        throw new Error(data.message || 'Error en la autenticación');
      }
      
      return data;
    } catch (parseError) {
      console.error('Error al parsear JSON. Texto recibido:', responseText);
      throw new Error('El servidor no respondió con JSON válido');
    }
  } catch (error) {
    console.error('Error completo:', error);
    throw error;
  }
};

// Clientes
export const getClients = async () => {
  try {
    const response = await fetch(`${BASE_URL}/clientes`, {
      headers: await getHeaders(),
    });
    return await response.json();
  } catch (error) {
    throw new Error('Error al obtener clientes');
  }
};

export const registerClient = async (clientData) => {
  try {
    const response = await fetch(`${BASE_URL}/clientes`, {
      method: 'POST',
      headers: await getHeaders(),
      body: JSON.stringify(clientData),
    });
    return await response.json();
  } catch (error) {
    throw new Error('Error al registrar cliente');
  }
};

// Equipos
export const getEquipments = async () => {
  try {
    const response = await fetch(`${BASE_URL}/equipos`, {
      headers: await getHeaders(),
    });
    return await response.json();
  } catch (error) {
    throw new Error('Error al obtener equipos');
  }
};

export const registerEquipment = async (equipmentData) => {
  try {
    const response = await fetch(`${BASE_URL}/equipos`, {
      method: 'POST',
      headers: await getHeaders(),
      body: JSON.stringify(equipmentData),
    });
    return await response.json();
  } catch (error) {
    throw new Error('Error al registrar equipo');
  }
};

// Mantenimientos
export const getMaintenances = async () => {
  try {
    const response = await fetch(`${BASE_URL}/mantenimientos`, {
      headers: await getHeaders(),
    });
    return await response.json();
  } catch (error) {
    throw new Error('Error al obtener mantenimientos');
  }
};

export const registerMaintenance = async (maintenanceData) => {
  try {
    const response = await fetch(`${BASE_URL}/mantenimientos`, {
      method: 'POST',
      headers: await getHeaders(),
      body: JSON.stringify(maintenanceData),
    });
    return await response.json();
  } catch (error) {
    throw new Error('Error al registrar mantenimiento');
  }
};

// Usuarios (solo para ADMIN)
export const getUsers = async () => {
  try {
    const response = await fetch(`${BASE_URL}/usuarios`, {
      headers: await getHeaders(),
    });
    return await response.json();
  } catch (error) {
    throw new Error('Error al obtener usuarios');
  }
};

export const registerUser = async (userData) => {
  try {
    const response = await fetch(`${BASE_URL}/usuarios`, {
      method: 'POST',
      headers: await getHeaders(),
      body: JSON.stringify(userData),
    });
    return await response.json();
  } catch (error) {
    throw new Error('Error al registrar usuario');
  }
};

export const deleteUser = async (userId) => {
  try {
    const response = await fetch(`${BASE_URL}/usuarios/${userId}`, {
      method: 'DELETE',
      headers: await getHeaders(),
    });
    return await response.json();
  } catch (error) {
    throw new Error('Error al eliminar usuario');
  }
}; 