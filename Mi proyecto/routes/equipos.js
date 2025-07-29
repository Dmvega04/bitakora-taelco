const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const { verificarToken, permitirRol } = require('../middlewares/authMiddleware');
const prisma = new PrismaClient();

// ✅ Crear equipo vinculado a un cliente (solo ADMIN puede crear)
router.post('/', verificarToken, permitirRol('ADMIN'), async (req, res) => {
  const { nombre, tipo, serial, ubicacion, clienteId } = req.body;

  console.log('📦 Datos recibidos para crear equipo:', req.body);

  try {
    // Verificar si el cliente existe
    const cliente = await prisma.cliente.findUnique({
      where: { id: Number(clienteId) },
    });

    if (!cliente) {
      return res.status(404).json({ error: 'Cliente no encontrado' });
    }

    // Crear el equipo conectándolo con el cliente existente
    const equipo = await prisma.equipo.create({
      data: {
        nombre,
        tipo,
        serial,
        ubicacion,
        cliente: {
          connect: { id: Number(clienteId) },
        },
      },
    });

    res.status(201).json({ mensaje: 'Equipo registrado correctamente', equipo });
  } catch (error) {
    console.error('❌ Error al registrar equipo:', error.message);
    res.status(500).json({ error: 'Error al registrar equipo' });
  }
});

// ✅ Listar todos los equipos con su cliente asociado (autenticación requerida)
router.get('/', verificarToken, async (req, res) => {
  try {
    const equipos = await prisma.equipo.findMany({
      include: { cliente: true },
    });

    res.json(equipos);
  } catch (error) {
    console.error('❌ Error al obtener equipos:', error.message);
    res.status(500).json({ error: 'Error al obtener equipos' });
  }
});

module.exports = router;
