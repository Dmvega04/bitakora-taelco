const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Función para subir una foto
exports.crearFoto = async (req, res) => {
  try {
    const { url, descripcion, equipoId, mantenimientoId } = req.body;

    const foto = await prisma.foto.create({
      data: {
        url,
        descripcion,
        ...(equipoId && { equipo: { connect: { id: parseInt(equipoId) } } }),
        ...(mantenimientoId && { mantenimiento: { connect: { id: parseInt(mantenimientoId) } } })
      },
    });

    res.status(201).json(foto);
  } catch (error) {
    console.error('Error al crear foto:', error);
    res.status(500).json({ error: 'Error al crear la foto' });
  }
};

// Función para obtener fotos por equipo
exports.getFotosPorEquipo = async (req, res) => {
  try {
    const { equipoId } = req.params;
    const fotos = await prisma.foto.findMany({
      where: {
        equipoId: parseInt(equipoId)
      },
      include: {
        equipo: true
      }
    });
    res.json(fotos);
  } catch (error) {
    console.error('Error al obtener fotos:', error);
    res.status(500).json({ error: 'Error al obtener las fotos' });
  }
};

// Función para obtener fotos por mantenimiento
exports.getFotosPorMantenimiento = async (req, res) => {
  try {
    const { mantenimientoId } = req.params;
    const fotos = await prisma.foto.findMany({
      where: {
        mantenimientoId: parseInt(mantenimientoId)
      },
      include: {
        mantenimiento: true
      }
    });
    res.json(fotos);
  } catch (error) {
    console.error('Error al obtener fotos:', error);
    res.status(500).json({ error: 'Error al obtener las fotos' });
  }
};

// Función para eliminar una foto
exports.eliminarFoto = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.foto.delete({
      where: {
        id: parseInt(id)
      }
    });
    res.json({ message: 'Foto eliminada correctamente' });
  } catch (error) {
    console.error('Error al eliminar foto:', error);
    res.status(500).json({ error: 'Error al eliminar la foto' });
  }
}; 