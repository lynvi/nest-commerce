import { PrismaClient } from '@prisma/client';
import slugify from 'slugify';
import { seedData } from './data';
import { readFile } from 'fs/promises';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding...');

  const json = await readFile(__dirname + '/products.json', {
    encoding: 'utf-8',
  });

  const products = JSON.parse(json);

  for (let i = 0; i < products.length; i++) {
    const {
      collectionIds,
      featuredAsset,
      variants,
      brandId,
      price,
      ...product
    } = products[i];

    const p = await prisma.product.findUnique({
      where: { slug: product.slug },
    });
    if (!p) {
      await prisma.product.create({
        data: {
          ...product,
          price: Number(price.toString().replace(/[^0-9.-]+/g, '')),
          brand: {
            connectOrCreate: {
              create: {
                name: brandId,
                logo: '',
                slug: slugify(brandId, { lower: true }),
                description: '',
              },
              where: {
                name: brandId,
              },
            },
          },

          collections: {
            connect: [...collectionIds.map((item) => ({ id: item }))],
          },
          featuredAsset: slugify(product.name, { lower: true }) + '.png',

          assets: product.assets && {
            createMany: {
              data: product?.assets?.map((item) => ({
                url: slugify(product.name, { lower: true }) + '.png',
              })),
            },
          },
          productVariants: variants && {
            create: [
              ...variants.map((variant) => ({
                ref: Math.floor(10000000 + Math.random() * 90000000) + '',
                name: variant?.name || product.name,
                description: product.description,
                salesPrice: variant?.salesPrice,
                slug: slugify(product.slug),
                price: Number(
                  variant.price.toString().replace(/[^0-9.-]+/g, ''),
                ),
                stockLevel: variant.stockLevel,
                featuredAsset: slugify(variant.name, { lower: true }) + '.png',
                assets: variant.assets && {
                  createMany: {
                    data: variant?.assets?.map((item) => ({ url: item })),
                  },
                },
                productOptions: variant?.productOptions && {
                  connectOrCreate: [
                    ...variant?.productOptions.map((item) => ({
                      create: {
                        name: item.name,
                        value: item.value,
                      },
                      where: {
                        name_value: {
                          name: item.name,
                          value: item.value,
                        },
                      },
                    })),
                  ],
                },
              })),
            ],
          },
        },
      });
    }
  }
}

main()
  .then((e) => {
    console.log('Done seeding database');
  })
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
