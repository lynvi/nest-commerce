import slugify from 'slugify';

export const seedData = {
  collection: [
    {
      id: 'supplements',
      name: 'supplements',
      slug: 'supplements',
      description:
        "Découvrez notre vaste sélection de compléments alimentaires de fitness et de santé, avec les meilleures marques de suppléments sportifs, de produits de bien-être et d'articles de santé naturels, ainsi que des collations saines pour vous aider à atteindre vos objectifs de santé et de remise en forme. Explorez nos catégories pour trouver des produits tels que la whey protéine, les BCAA, les Vitamines, les oméga 3, les minéraux, le zinc, la spiruline, le moringa,",
    },
    {
      id: 'protein',
      name: 'protein',
      slug: 'protein',
      parentId: 'supplements',
      description:
        "Découvrez notre vaste sélection de compléments alimentaires de fitness et de santé, avec les meilleures marques de suppléments sportifs, de produits de bien-être et d'articles de santé naturels, ainsi que des collations saines pour vous aider à atteindre vos objectifs de santé et de remise en forme. Explorez nos catégories pour trouver des produits tels que la whey protéine, les BCAA, les Vitamines, les oméga 3, les minéraux, le zinc, la spiruline, le moringa,",
    },
  ],
  brands: [
    {
      id: 'optimum-nutrition',
      name: 'Optimum Nutrition',
      description:
        'Optimum Nutrition® has been the brand professional athletes and gym enthusiasts trust. Everybody has goals - let us help you reach yours.',
      logo: 'https://www.optimumnutrition.com/_ui/v9373bb3d3e3d/responsive/common/images/on-logo-white.svg',
    },
    {
      id: 'muscle-tech',
      name: 'Muscletech',
      description:
        'MuscleTech is a brand of dietary supplements, marketed by Iovate Health Sciences Inc., which includes Hydroxycut.',
      logo: 'https://fitandshop.es/img/m/5.jpg',
    },
  ],

  products: [
    {
      id: 'GOLD-STANDARD',
      name: 'OPTIMUM NUTRITION GOLD STANDARD 100% WHEY PROTEIN',
      description:
        'Each serving of the world’s best-selling whey protein powder provides 24 grams of high-quality whey protein primarily from Whey Protein Isolate, which has had excess carbohydrates, fat, and lactose ‘isolated’ out using sophisticated filtering technologies. The powder is also instantized for easy mixing using just a glass and spoon. With more than 20 different flavors – including naturally flavored options – there’s no doubt this is the Optimum Nutrition Gold Standard 100% Whey Protein.',
      slug: slugify('OPTIMUM NUTRITION GOLD STANDARD 100% WHEY PROTEIN', {
        lower: true,
      }),
      brandId: 'optimum-nutrition',
      collectionIds: ['protein', 'supplements'],

      image:
        'https://content.optimumnutrition.com/i/on/on-gold-standard-100-whey-protein_Image_01',

      price: 5000,
    },
    {
      id: 'NITROTECH',
      name: 'Nitrotech 100%Whey Gold 910g - Muscletech',
      collectionIds: ['protein', 'supplements'],
      description:
        'Peptides de lactosérum hydrolysés à absorption rapide , concentré pour un profil supérieur ',
      slug: slugify('Nitrotech 100%Whey Gold 910g - Muscletech', {
        lower: true,
      }),
      brandId: 'muscle-tech',
      image:
        'https://cdn.shopify.com/s/files/1/0490/0975/4274/products/Untitleddesign_16.png',
      price: 8600,
    },
  ],
};
