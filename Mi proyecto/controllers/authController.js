const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const prisma = new PrismaClient();

// REGISTRO
exports.registrarUsuario = async (req, res) => {
  const { nombre, email, password, rol } = req.body;

  try {
    const usuarioExistente = await prisma.usuario.findUnique({ where: { email } });
    if (usuarioExistente) {
      return res.status(400).json({ error: 'El correo ya está registrado' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const nuevoUsuario = await prisma.usuario.create({
      data: { nombre, email, password: hashedPassword, rol }
    });

    res.status(201).json({ mensaje: 'Usuario creado exitosamente', usuario: nuevoUsuario });
  } catch (error) {
    console.error('Error en registrarUsuario:', error);
    res.status(500).json({ error: 'Error al registrar usuario' });
  }
};

// LOGIN
exports.loginUsuario = async (req, res) => {
  const { email, password } = req.body;

  try {
    const usuario = await prisma.usuario.findUnique({ where: { email } });

    if (!usuario || !(await bcrypt.compare(password, usuario.password))) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    const token = jwt.sign(
      { id: usuario.id, nombre: usuario.nombre, rol: usuario.rol },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    );

    res.json({ mensaje: 'Login exitoso', token });
  } catch (error) {
    console.error('Error en loginUsuario:', error);
    res.status(500).json({ error: 'Error al iniciar sesión' });
  }
};

// Obtener lista de usuarios
exports.obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await prisma.usuario.findMany({
      select: {
        id: true,
        nombre: true,
        email: true,
        rol: true
      }
    });
    res.json(usuarios);
  } catch (error) {
    console.error('Error en obtenerUsuarios:', error);
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
};

exports.eliminarUsuario = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.usuario.delete({
      where: { id: parseInt(id) }
    });
    res.json({ mensaje: 'Usuario eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar usuario:', error);
    res.status(500).json({ error: 'No se pudo eliminar el usuario' });
  }
};

