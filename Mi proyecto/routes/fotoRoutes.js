const express = require('express');
const router = express.Router();
const fotoController = require('../controllers/fotoController');
const { verificarToken, esAdmin } = require('../middlewares/auth');

// Rutas protegidas con autenticación
router.use(verificarToken);

// Crear una nueva foto
router.post('/', fotoController.crearFoto);

// Obtener fotos por equipo
router.get('/equipo/:equipoId', fotoController.getFotosPorEquipo);

// Obtener fotos por mantenimiento
router.get('/mantenimiento/:mantenimientoId', fotoController.getFotosPorMantenimiento);

// Eliminar foto (solo admin)
router.delete('/:id', esAdmin, fotoController.eliminarFoto);

module.exports = router; 