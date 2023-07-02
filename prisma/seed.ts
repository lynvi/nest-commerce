import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';
import { seedData } from './data';
import { nanoid } from 'nanoid';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding...');

  /// --------- Brands ---------------

  const brands = seedData.brands;
  for (let i = 0; i < brands.length; i++) {
    await prisma.brand.create({
      data: brands[i],
    });
  }

  /// --------- Collections ---------------

  const collections = seedData.collection;
  for (let i = 0; i < collections.length; i++) {
    await prisma.collection.create({
      data: collections[i],
    });
  }

  /// --------- Products --------------

  const products = seedData.products;
  for (let i = 0; i < products.length; i++) {
    await prisma.product.create({
      data: {
        ...products[i],
        collections: {
          connect: { id: 'protein' },
        },
      },
    });

    /// --------- Product variants ---------------
    const productVariants = seedData.productVariants;
    for (let i = 0; i < productVariants.length; i++) {
      await prisma.productVariant.create({
        data: productVariants[i],
      });
    }

    await prisma.order.create({
      data: {
        code: nanoid(10).toUpperCase(),
        status: 'ACTIVE',
        paymentStatus: 'PENDING',
        paymentMethod: 'CASH_ON_DELIVERY',
        customer: {
          create: {
            username: 'abdelabou',
            isGuest: true,
            shippingAddresses: {
              create: {
                zipCode: '24000',
                city: 'El jadida',
                country: 'Morocco',
                streetAddress: 'Ibrahim alkhalil route sidi bouzid',
              },
            },
          },
        },
        orderLines: {
          create: {
            quantity: 10,
            productVariantId: 'gold-standard-banana',
          },
        },
      },
    });
  }
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
