import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Probably this is not the best way to organize this file jeje 🙈

const loadPlans = async () => {
  console.log('Loading Plans . . .');

  await prisma.plan.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
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
  });

  await prisma.plan.upsert({
    where: { id: 2 },
    update: {},
    create: {
      id: 2,
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
  });

  await prisma.plan.upsert({
    where: { id: 3 },
    update: {},
    create: {
      id: 3,
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
  });
};

interface UserMockInformation {
  email: string;
  firstName: string;
  lastName: string;
}

const loadUser = async (
  id: number,
  { email, firstName, lastName }: UserMockInformation
) => {
  console.log(`Loading User ${email}`);

  const user = await prisma.user.upsert({
    where: { id },
    update: {},
    create: {
      id,
      email,
      firstName,
      lastName,
      password:
        '819f7644f7883384ffdf2522826d38afeafb4338374e71cdeff315e8831e0c6f',
      avatar: 'https://i.pravatar.cc/120',
      role: 'user',
    },
  });

  const customer = await prisma.customer.create({
    data: {
      userId: user.id,
    },
  });

  return customer;
};

interface SubscriptionMockInformation {
  customerId: number;
  planId: number;
  status: 'active' | 'canceled' | 'paused' | 'trial';
  billingFrequency: 'annual' | 'monthly';
  lastPayment?: Date;
  nextPayment?: Date;
  startDate: Date;
  endDate?: Date;
}

const loadSubscription = async (
  id: number,
  {
    customerId,
    planId,
    status,
    billingFrequency,
    lastPayment,
    nextPayment,
    startDate,
    endDate,
  }: SubscriptionMockInformation
) => {
  console.log(`Loading Subscription for customer ${customerId}`);

  await prisma.subscription.upsert({
    where: { id },
    update: {},
    create: {
      id,
      customerId,
      planId,
      status,
      billingFrequency,
      lastPayment,
      nextPayment,
      startsAt: startDate,
      endsAt: endDate,
    },
  });
};

async function main() {
  await loadPlans();

  // ---------------------------------------------------------------------------

  const alton = await loadUser(1, {
    email: 'abellsmythe@gmail.com',
    firstName: 'Alton',
    lastName: 'Bell Smythe',
  });

  await loadSubscription(1, {
    customerId: alton.id,
    planId: 1,
    status: 'active',
    billingFrequency: 'monthly',
    lastPayment: new Date('2023-03-01'),
    nextPayment: new Date('2023-04-01'),
    startDate: new Date('2023-01-01'),
    endDate: new Date('2024-01-01'),
  });

  // ---------------------------------------------------------------------------

  const pao = await loadUser(2, {
    email: 'paotoro94@gmail.com',
    firstName: 'Paola',
    lastName: 'Toro',
  });

  await loadSubscription(2, {
    customerId: pao.id,
    planId: 2,
    status: 'active',
    billingFrequency: 'monthly',
    lastPayment: new Date('2023-03-15'),
    nextPayment: new Date('2023-04-15'),
    startDate: new Date('2023-02-15'),
  });

  // ---------------------------------------------------------------------------

  const luke = await loadUser(3, {
    email: 'luke.bellsmythe@gmail.com',
    firstName: 'Luke',
    lastName: 'Bell Smythe',
  });

  await loadSubscription(3, {
    customerId: luke.id,
    planId: 3,
    status: 'paused',
    billingFrequency: 'annual',
    lastPayment: new Date('2023-01-01'),
    nextPayment: new Date('2024-01-01'),
    startDate: new Date('2023-01-20'),
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
