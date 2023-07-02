import slugify from 'slugify';

export const seedData = {
  collection: [
    {
      id: 'protein',
      name: 'protein',
      slug: 'protein',
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
      image:
        'https://content.optimumnutrition.com/i/on/on-gold-standard-100-whey-protein_Image_01',
    },
  ],
  productVariants: [
    {
      id: 'gold-standard-banana',
      name: 'OPTIMUM NUTRITION GOLD STANDARD 100% WHEY PROTEIN BANANA CREAM',
      description:
        'Each serving of the world’s best-selling whey protein powder provides 24 grams of high-quality whey protein primarily from Whey Protein Isolate, which has had excess carbohydrates, fat, and lactose ‘isolated’ out using sophisticated filtering technologies. The powder is also instantized for easy mixing using just a glass and spoon. With more than 20 different flavors – including naturally flavored options – there’s no doubt this is the Optimum Nutrition Gold Standard 100% Whey Protein.',
      slug: slugify(
        'OPTIMUM NUTRITION GOLD STANDARD 100% WHEY PROTEIN BANANA CREAM',
        {
          lower: true,
        },
      ),
      productId: 'GOLD-STANDARD',
      image:
        'https://content.optimumnutrition.com/i/on/on-1111987_Image_01?$TTL_PRODUCT_IMAGES$&layer0=$PDP_004$&fmt=auto&img404=no-product-image&v=1&locale=en-us,en-gb,*',
      price: 5000,
      stockLevel: 50,
    },
  ],
};
