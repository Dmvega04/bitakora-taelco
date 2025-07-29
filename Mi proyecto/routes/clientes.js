const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Crear cliente
router.post('/', async (req, res) => {
  const { nombre, nit } = req.body;

  try {
    const cliente = await prisma.cliente.create({
      data: { nombre, nit },
    });
    res.json(cliente);
  } catch (error) {
    console.error('Error al crear cliente:', error);
    res.status(500).json({ error: 'Error al crear cliente' });
  }
});

// Listar clientes
router.get('/', async (req, res) => {
  try {
    const clientes = await prisma.cliente.findMany(
      {
      select: {
        id: true,
        nombre: true,
        nit: true,
        
      }
    }
    );
    res.json(clientes);
  } catch (error) {
    console.error('Error al obtener clientes:', error);
    res.status(500).json({ error: 'Error al obtener clientes' });
  }
});

module.exports = router;
