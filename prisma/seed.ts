import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.plan.createMany({
    data: [
      {
        name: 'Basic Plan',
        price: 9.99,
        currency: 'usd',
        billingFrequency: 'monthly',
        storage: 10000,
        supportLevel: 'basic',
        analytics: 'none',
        integrations: 'none',
        annualDiscount: 10,
      },
      {
        name: 'Pro Plan',
        price: 19.99,
        currency: 'usd',
        billingFrequency: 'monthly',
        storage: 50000,
        supportLevel: 'priority',
        analytics: 'basic',
        integrations: 'none',
        annualDiscount: 15,
      },
      {
        name: 'Enterprise Plan',
        price: 49.99,
        currency: 'usd',
        billingFrequency: 'monthly',
        storage: -1,
        supportLevel: 'dedicated',
        analytics: 'advanced',
        integrations: 'custom',
        annualDiscount: 20,
      },
    ],
  });

  const user = await prisma.user.create({
    data: {
      email: 'abellsmythe@gmail.com',
      first_name: 'Alton',
      last_name: 'Bell Smythe',
      password: '819f7644f7883384ffdf2522826d38afeafb4338374e71cdeff315e8831e0c6f',
      avatar: 'https://i.pravatar.cc/120',
      role: 'user',
    }
  });

  await prisma.customer.create({
    data: {
      userId: user.id,
    }
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
