const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function crearAdmin() {
  const nombre = 'Admin';
  const email = 'admin@taelco.com';
  const password = 'taelco123'; // Cambia esta contraseña si quieres
  const rol = 'ADMIN';

  // Hashear la contraseña
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    // Verificar si ya existe un usuario con ese email
    const usuarioExistente = await prisma.usuario.findUnique({
      where: { email },
    });

    if (usuarioExistente) {
      console.log('Ya existe un usuario con ese correo:', email);
      return;
    }

    // Crear usuario ADMIN
    const nuevoUsuario = await prisma.usuario.create({
      data: {
        nombre,
        email,
        password: hashedPassword,
        rol,
      },
    });

    console.log('Usuario ADMIN creado:', nuevoUsuario);
  } catch (error) {
    console.error('Error creando usuario ADMIN:', error);
  } finally {
    await prisma.$disconnect();
  }
}

crearAdmin();
