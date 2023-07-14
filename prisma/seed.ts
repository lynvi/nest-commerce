import { PrismaClient } from '@prisma/client';
import slugify from 'slugify';
import { seedData } from './data';

const prisma = new PrismaClient();

const seedSettings = async () => {
  await prisma.setting.create({
    data: {
      name: 'lowStockThreshold',
      type: 'NUMBER',
      value: '10',
      description:
        'notify store admin that the stock level of specific product variant is running short',
    },
  });
};

async function main() {
  console.log('Seeding...');

  await seedSettings();

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
    const { collectionIds, price, featuredAsset, ...product } = products[i];
    await prisma.product.create({
      data: {
        ...product,
        collections: {
          connect: [...collectionIds.map((item) => ({ id: item }))],
        },
        featuredAsset,

        assets: {
          create: {
            url: featuredAsset,
          },
        },
        productVariants: {
          create: {
            id: product.id,
            name: product.name,
            description: product.description,
            slug: slugify(product.slug),
            price,
            stockLevel: 120,
            featuredAsset,

            assets: product.assets && {
              createMany: {
                data: product?.assets?.map((item) => ({ url: item })),
              },
            },
          },
        },
      },
    });

    // await prisma.order.create({
    //   data: {
    //     code: nanoid(10).toUpperCase(),
    //     status: 'ACTIVE',
    //     paymentStatus: 'PENDING',
    //     paymentMethod: 'CASH_ON_DELIVERY',
    //     customer: {
    //       create: {
    //         firstName: 'Abdelkader',
    //         lastName: 'Aboukinane',
    //         email: 'aboukinaneee@gmail.com',
    //         isGuest: true,
    //         shippingDetails: {
    //           create: {
    //             zipCode: '24000',

    //             city: 'El jadida',
    //             country: 'Morocco',
    //             streetAddress: 'Ibrahim alkhalil route sidi bouzid',
    //           },
    //         },
    //       },
    //     },
    //     orderLines: {
    //       create: {
    //         quantity: 10,
    //         productVariantId: 'GOLD-STANDARD',
    //       },
    //     },
    //   },
    // });
  }
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
