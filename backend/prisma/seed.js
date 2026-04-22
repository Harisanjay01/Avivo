const { PrismaClient } = require('@prisma/client');
const fetch = require('node-fetch');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Fetching users from DummyJSON...');

  const res = await fetch('https://dummyjson.com/users?limit=30');
  const data = await res.json();

  // Map DummyJSON user fields to our Prisma schema
  const users = data.users.map((u) => ({
    firstName: u.firstName,
    lastName:  u.lastName,
    email:     u.email,
    image:     u.image,
    company:   u.company.name,
    role:      u.company.title,
    country:   u.address.country,
    age:       u.age,
    gender:    u.gender,
    phone:     u.phone,
    username:  u.username,
  }));

  // Clear existing users before seeding to avoid duplicate key errors
  await prisma.user.deleteMany();
  console.log('🗑️  Cleared existing users');

  await prisma.user.createMany({ data: users });
  console.log(`✅ Seeded ${users.length} users successfully!`);
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
