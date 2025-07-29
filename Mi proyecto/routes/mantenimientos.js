const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Crear mantenimiento (preventivo o correctivo)
router.post('/', async (req, res) => {
  const { descripcion, tipo, equipoId, usuarioId, fecha } = req.body;

  try {
    const mantenimiento = await prisma.mantenimiento.create({
      data: {
        descripcion,
        tipo, // <--- aquí lo añadimos
        equipoId,
        usuarioId: usuarioId || null,
        fecha: fecha ? new Date(fecha) : undefined,
      },
    });
    res.json(mantenimiento);
  } catch (error) {
    console.error('Error al crear mantenimiento:', error);
    res.status(500).json({ error: 'Error al crear mantenimiento' });
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { tipo } = req.body;

  try {
    const actualizado = await prisma.mantenimiento.update({
      where: { id: parseInt(id) },
      data: { tipo }
    });
    res.json(actualizado);
  } catch (error) {
  console.error('❌ Error al actualizar mantenimiento:', error);
  res.status(500).json({ error: error.message });
}

});

// Obtener mantenimientos
router.get('/', async (req, res) => {
  try {
        console.log('📥 Solicitando todos los mantenimientos...');
    const data = await prisma.mantenimiento.findMany({
      include: {
        equipo: true,
        usuario: true,
      },
    });
        console.log('✅ Mantenimientos obtenidos:', data);

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener mantenimientos' });
  }
});
// Obtener un mantenimiento por ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  console.log('Buscando mantenimiento con ID:', id);

  try {
    const mantenimiento = await prisma.mantenimiento.findUnique({
      where: {
        id: parseInt(id)
      },
      include: {
        equipo: true,
        usuario: true
      }
    });

    if (!mantenimiento) {
      return res.status(404).json({ error: 'Mantenimiento no encontrado' });
    }

    res.json(mantenimiento);
  } catch (error) {
    console.error('Error al obtener mantenimiento:', error);
    res.status(500).json({ error: 'Error al obtener mantenimiento' });
  }
});

module.exports = router;
