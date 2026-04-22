const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function test() {
  try {
    await prisma.$connect();
    console.log('Successfully connected to the database!');
    const count = await prisma.user.count();
    console.log(`User count: ${count}`);
  } catch (e) {
    console.error('Failed to connect to the database:', e);
  } finally {
    await prisma.$disconnect();
  }
}

test();
