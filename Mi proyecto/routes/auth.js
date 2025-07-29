const express = require('express');
const router = express.Router();

const {
  registrarUsuario,
  loginUsuario,
  obtenerUsuarios,
  eliminarUsuario // 👈 Agregado aquí

} = require('../controllers/authController');

const {
  verificarToken,
  permitirRol
} = require('../middlewares/authMiddleware');

// 👉 Ruta protegida: solo un ADMIN puede registrar nuevos usuarios
router.post('/registro', verificarToken, permitirRol('ADMIN'), registrarUsuario);

// 👉 Ruta pública: login de usuarios
router.post('/login', loginUsuario);

// 👉 Ruta para obtener todos los usuarios (solo ADMIN)
router.get('/usuarios', verificarToken, permitirRol('ADMIN'), obtenerUsuarios);

router.delete('/usuarios/:id', verificarToken, permitirRol('ADMIN'), eliminarUsuario);


module.exports = router;
