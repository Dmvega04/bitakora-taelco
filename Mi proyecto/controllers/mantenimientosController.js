const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Crear un nuevo mantenimiento
exports.crearMantenimiento = async (req, res) => {
  const { descripcion, equipoId } = req.body;
  const usuarioId = req.usuario.id;

  try {
    const equipoExistente = await prisma.equipo.findUnique({
      where: { id: parseInt(equipoId) }
    });

    if (!equipoExistente) {
      return res.status(404).json({ error: 'El equipo no existe' });
    }

    const nuevoMantenimiento = await prisma.mantenimiento.create({
      data: {
        descripcion,
        equipoId: parseInt(equipoId),
        usuarioId,
      },
    });

    res.status(201).json(nuevoMantenimiento);
  } catch (error) {
    console.error('Error al crear mantenimiento:', error);
    res.status(500).json({ error: 'Error al registrar mantenimiento' });
  }
};

// Obtener todos los mantenimientos
exports.obtenerMantenimientos = async (req, res) => {
  try {
    const mantenimientos = await prisma.mantenimiento.findMany({
      orderBy: { fecha: 'desc' },
      include: {
        equipo: true,
        usuario: {
          select: {
            id: true,
            nombre: true,
            email: true,
            rol: true
          }
        }
      }
    });

    res.json(mantenimientos);
  } catch (error) {
    console.error('Error al obtener mantenimientos:', error);
    res.status(500).json({ error: 'Error al obtener los mantenimientos' });
  }
};

// Obtener historial de un equipo específico
exports.obtenerMantenimientosPorEquipo = async (req, res) => {
  const { id } = req.params;

  try {
    const historial = await prisma.mantenimiento.findMany({
      where: { equipoId: parseInt(id) },
      orderBy: { fecha: 'desc' },
      include: {
        usuario: {
          select: {
            id: true,
            nombre: true,
            email: true,
            rol: true
          }
        }
      }
    });

    res.json(historial);
  } catch (error) {
    console.error('Error al obtener historial de equipo:', error);
    res.status(500).json({ error: 'Error al obtener el historial del equipo' });
  }
};

exports.eliminarMantenimiento = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.mantenimiento.delete({
      where: { id: parseInt(id) }
    });
    res.json({ mensaje: 'Mantenimiento eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar mantenimiento:', error);
    res.status(500).json({ error: 'No se pudo eliminar el mantenimiento' });
  }
};
