const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Importar rutas
const clientesRoutes = require('./routes/clientes');
const equiposRoutes = require('./routes/equipos');
const mantenimientosRoutes = require('./routes/mantenimientos');
const authRoutes = require('./routes/auth');

// Configuración CORS simple
app.use(cors());

// Headers adicionales para CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With, Accept');
  
  // Manejar las solicitudes OPTIONS
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

// Middleware para parsear JSON con límite aumentado
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Ruta raíz
app.get('/', (req, res) => {
  res.json({
    message: 'Bienvenido a la API de Bitakora',
    endpoints: {
      auth: '/auth',
      clientes: '/clientes',
      equipos: '/equipos',
      mantenimientos: '/mantenimientos'
    }
  });
});

// Rutas
app.use('/auth', authRoutes);
app.use('/clientes', clientesRoutes);
app.use('/equipos', equiposRoutes);
app.use('/mantenimientos', mantenimientosRoutes);

// Middleware de manejo de errores
app.use((err, req, res, next) => {
  console.error('Error no capturado:', err);
  res.status(500).json({ error: 'Error interno del servidor' });
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});

