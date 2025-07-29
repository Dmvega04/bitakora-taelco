const jwt = require('jsonwebtoken');
require('dotenv').config();

const verificarToken = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ error: 'Token no proporcionado' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = decoded; // ✅ CORREGIDO
    next();
  } catch (err) {
    return res.status(403).json({ error: 'Token inválido' });
  }
};

const permitirRol = (...rolesPermitidos) => {
  return (req, res, next) => {
    try {
      const usuario = req.usuario;
      if (!usuario) {
        return res.status(401).json({ mensaje: 'No autenticado.' });
      }
      if (!rolesPermitidos.includes(usuario.rol)) {
        return res.status(403).json({ mensaje: 'Acceso denegado. Rol no autorizado.' });
      }
      next();
    } catch (error) {
      return res.status(500).json({ mensaje: 'Error al verificar el rol.' });
    }
  };
};


module.exports = { verificarToken, permitirRol };
