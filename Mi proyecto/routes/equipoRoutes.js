const express = require('express');
const router = express.Router();
const equipoController = require('../controllers/equipoController');
const { verificarToken, esAdmin, esTecnico } = require('../middlewares/auth');

// Rutas protegidas con autenticación
router.use(verificarToken);

// Obtener todos los equipos
router.get('/', equipoController.getEquipos);

// Obtener equipo por ID
router.get('/:id', equipoController.getEquipoPorId);

// Obtener equipo por QR
router.get('/qr/:qrCode', equipoController.getEquipoPorQR);

// Crear nuevo equipo (admin y técnico)
router.post('/', esTecnico, equipoController.crearEquipo);

// Actualizar estado del equipo (admin y técnico)
router.patch('/:id/estado', esTecnico, equipoController.actualizarEstadoEquipo);

module.exports = router; 