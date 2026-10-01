import { PrismaClient, Role } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Limpiar datos existentes
  await prisma.user.deleteMany();
  await prisma.tenant.deleteMany();

  // Crear tenants
  const tenant1 = await prisma.tenant.create({
    data: {
      name: 'Tech Solutions',
    },
  });

  const tenant2 = await prisma.tenant.create({
    data: {
      name: 'Marketing Pro',
    },
  });

  const tenant3 = await prisma.tenant.create({
    data: {
      name: 'Consulting Experts',
    },
  });

  // Encriptar contraseña
  const password = await bcrypt.hash('123456', 10);

  // Crear usuario de prueba
  await prisma.user.create({
    data: {
      email: 'admin@example.com',
      name: 'Administrador',
      password: password,
      telephone: '88888888',
      role: Role.ADMIN,
      tenantId: tenant1.id,
    },
  });

  console.log('Seed ejecutado correctamente');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });