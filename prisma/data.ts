import { randomBytes } from 'crypto';
import { nanoid, random } from 'nanoid';
import slugify from 'slugify';

const categories = [
  'Acides Aminés Essentiels',
  "Acides Aminés et Bcaa's",
  'Adaptogènes',
  'Aides au sommeil',
  'Aliments verts',
  'Antioxydants',
  'Ashwagandha',
  'Barres Protéinées',
  "Bcaa's",
  'Boissons Énergétiques',
  "Bouteille d'eau",
  'Brûleur sans stimulants',
  'Brûleurs de graisse',
  'Bêta Alanine',
  'CLA',
  'Caféine',
  'Calcium',
  'Carbohydrates',
  'Caséine',
  'Ceinture',
  'Collagène',
  'Collations et boissons',
  'Creatine Monohydrate',
  'Gaba',
  'Gants',
  'Gestion des repas',
  'Gestion du poids',
  'Herbes et Homéopathie',
  'Joint Support',
  'Kre-Alkalyn',
  'L-Arginine',
  'L-Carnitine',
  'L-Citrulline',
  'L-Glutamine',
  'Maca',
  'Magnisium',
  'Mass Gainers',
  'Minéraux',
  'Multi Minéral',
  'Multivitamines pour femmes',
  'Multivitamines pour hommes',
  'Multivitaminés',
  'Mélange de creatine',
  'Mélatonine',
  'Nutrition Sportive',
  'Omega-3',
  'Perte de poids',
  'Poissons et Omégas',
  'Pre-Workout',
  'Pre-Workout Sans Stimulant',
  'Pre-workout et brûleur',
  'Probiotique',
  'Promotions',
  'Proteine concentrat',
  'Protéine Complexe',
  'Protéine Végétale',
  'Protéine de Bœuf',
  'Protéines',
  'Récupération',
  'Sacs',
  'Sacs de repas',
  'Sangles de puissance',
  'Sans creatine',
  'Soutien digestif',
  'Stimulant élevé',
  'Stimulateurs de GH',
  'Stimulus naturels',
  'T-shirts et hauts',
  'Testosterone Support',
  'Tribulus',
  'Vitamine B',
  'Vitamine B6',
  'Vitamine C',
  'Vitamine D',
  'Vitamine K',
  'Vitamine b12',
  'Vitamines',
  'Vitamines et Minéraux',
  'Vêtements Pour Hommes',
  'Whey Proteine blend',
  'Whey Protéine',
  'Whey Protéine Hydrolysée',
  'Whey Protéine Isolâtes',
  'ZMA',
  'Zinc',
  'Énergies et endurance',
];

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
      id: 'accessories',
      name: 'Accessories',
      slug: 'accessories',
      description: 'Shakers , Bande Poignet Musculation ...',
    },

    {
      id: 'bande',
      name: 'Bandes',
      slug: 'bande-poignet-musculation',
      parentId: 'accessories',
      description: 'Les meilleur shakers ',
    },
    {
      id: 'shakers',
      name: 'shakers',
      slug: 'shakers',
      parentId: 'accessories',
      description: 'Les meilleur shakers ',
    },
    {
      id: 'creatine',
      name: 'Creatine',
      slug: 'creatine',
      parentId: 'supplements',
      description:
        "Vous souhaitez améliorer vos performances sportives ? Notre supplément de créatine de première qualité est là pour vous aider. Grâce à sa capacité avérée à augmenter les niveaux d'énergie, à améliorer la force musculaire et à favoriser une récupération plus rapide, notre supplément de créatine est un incontournable pour les passionnés de fitness et les athlètes. Maximisez vos entraînements et atteignez vos objectifs de remise en forme avec notre supplément de créatine de qualité supérieure.",
    },
    {
      id: 'protein',
      name: 'protéine',
      slug: 'proteine',
      parentId: 'supplements',
      description:
        "Découvrez notre vaste sélection de compléments alimentaires de fitness et de santé, avec les meilleures marques de suppléments sportifs, de produits de bien-être et d'articles de santé naturels, ainsi que des collations saines pour vous aider à atteindre vos objectifs de santé et de remise en forme. Explorez nos catégories pour trouver des produits tels que la whey protéine, les BCAA, les Vitamines, les oméga 3, les minéraux, le zinc, la spiruline, le moringa,",
    },
    {
      id: 'multivitamin',
      name: 'multi-vitamin',
      slug: 'multi-vitamin',
      parentId: 'supplements',
      description:
        "Découvrez notre collection de multivitamines pour vous aider à obtenir le bon équilibre en vitamines et minéraux dans votre alimentation. Commandez en ligne dès aujourd'hui.",
    },
    {
      id: 'gainer',
      name: 'Gainers',
      slug: 'mass-gainer',
      parentId: 'supplements',
      description:
        'Obtenez une masse musculaire accrue avec notre complément alimentaire Muscle Mass Gainer : Développez pleinement votre potentiel et atteignez vos objectifs de remise en forme grâce à notre complément alimentaire de première qualité, spécialement conçu pour augmenter votre masse musculaire. Notre formule scientifiquement élaborée associe des protéines de haute qualité, des nutriments essentiels et des ingrédients améliorant les performances, pour favoriser la croissance musculaire, soutenir la récupération musculaire et renforcer votre force globale. Obtenez des résultats visibles et transformez votre physique grâce à notre Muscle Mass Gainer de confiance. Commandez dès maintenant et faites passer votre parcours de remise en forme à un niveau supérieur !',
    },
    {
      id: 'energie-recuperation',
      name: 'Energie & récupération',
      slug: 'energie-recuperation',
      parentId: 'supplements',
      description:
        'Achetez en ligne des suppléments de récupération musculaire de qualité supérieure au Maroc. Maximisez vos objectifs de remise en forme, atteignez des performances optimales et obtenez des résultats rapides avec une variété de produits à base de créatine et de pré-workout.',
    },
  ],
  brands: [
    {
      id: 'cellucor',
      name: 'cellucor',
      slug: slugify('cellucor', { lower: true }),
      website: 'https://cellucor.com',
      description:
        "Avec plus de 3 milliards de portions vendues dans le monde entier, les compléments nutritionnels et les suppléments d'entraînement de Cellucor® sont conçus pour rendre l'énergie de performance accessible à tous.",
      logo: 'cellucor.png',
    },
    {
      id: 'optimum-nutrition',
      name: 'Optimum Nutrition',
      slug: slugify('Optimum Nutrition', { lower: true }),
      website: 'https://www.optimumnutrition.com',
      description:
        'Optimum Nutrition® has been the brand professional athletes and gym enthusiasts trust. Everybody has goals - let us help you reach yours.',
      logo: 'optimum-nutrition-logo.png',
    },
    {
      id: 'tesla-nutrition',
      name: 'Tesla nutritions',
      slug: slugify('Tesla nutritions', { lower: true }),
      website: 'https://www.tesla-nutritions.com/',
      description:
        'Tesla Sport Nutrition est la marque de suppléments qui connaît la croissance la plus rapide en Europe depuis 2012 ',
      logo: 'tesla-logo.png',
    },
    {
      id: 'muscletech',
      name: 'Muscletech',
      slug: slugify('Muscletech', { lower: true }),
      website: 'https://www.muscletech.com/',
      description:
        'MuscleTech is a brand of dietary supplements, marketed by Iovate Health Sciences Inc., which includes Hydroxycut.',
      logo: 'Muscletech.png',
    },
    {
      id: 'superior14',
      name: 'Superior 14',
      slug: slugify('superior 14.', { lower: true }),
      website: 'https://www.superior14.com/',
      description: '',
      logo: 'superior14.png',
    },
  ],
  products: [
    {
      id: 'c4',
      name: 'C4® Original Pre Workout Powder',

      description:
        "C4 Original stimule l'énergie explosive, l'endurance et la concentration grâce à une teneur en caféine de 150 mg.",
      slug: slugify('C4® Original Pre Workout Powder', {
        lower: true,
      }),
      brandId: 'cellucor',
      collectionIds: ['energie-recuperation', 'supplements'],

      featuredAsset: 'c4.png',

      price: 34900,
    },
    {
      id: 'masstech-extreme',
      name: 'Masstech Extreme 2000 2,72Kg',

      description:
        "Obtenez des gains de masse musculaire exceptionnels avec Masstech Extreme 2000 2,72 kg : Notre formule puissante vous aide à atteindre des résultats de construction musculaire spectaculaires. Avec une combinaison optimale de protéines de haute qualité, de glucides complexes et d'autres nutriments essentiels, Masstech Extreme 2000 favorise la croissance musculaire, augmente la force et améliore la récupération après l'entraînement. Avec sa texture délicieuse et ses bienfaits nutritionnels remarquables, ce supplément est votre allié pour développer une masse musculaire incroyable. Adoptez Masstech Extreme 2000 dès aujourdhui et franchissez les limites de votre potentiel musculaire !",
      slug: slugify('Masstech Extreme 2000 2,72Kg', {
        lower: true,
      }),
      brandId: 'tesla-nutrition',
      collectionIds: ['gainer', 'supplements'],

      featuredAsset: 'masstech-extreme.png',

      price: 34900,
    },
    {
      id: 'TESLA-CREATINE',
      name: '100% Créatine Monohydrate Powder Tesla',

      description:
        'Créatine monohydrate .Augmente la force et les performances 5g de créatine par dose',
      slug: slugify('100% Créatine Monohydrate Powder Tesla', {
        lower: true,
      }),
      brandId: 'tesla-nutrition',
      collectionIds: ['creatine', 'supplements'],

      featuredAsset: 'tesla-creatine.png',

      price: 34900,
    },
    {
      id: 'SHAKER-BIOTECHUSA',
      name: 'Biotech Wave+ Compact Shaker',

      description:
        'Compact shaker with a capacity of 500 ml Custom bayonet lock with 150 ml bottom container (developed for storing powders and tablets) Popular wave design, leak-free construction Made of BPA and toxin-free plastic (Made in the EU) Colors: blue, black-smoke, magenta',
      slug: slugify('Biotech Wave plus Compact Shaker', {
        lower: true,
      }),
      brandId: 'tesla-nutrition',
      collectionIds: ['accessories', 'shakers'],
      assets: ['shaker-savage.png'],

      featuredAsset: 'shaker-savage.png',

      price: 7900,
    },
    {
      id: 'GOLD-STANDARD',
      name: 'optimum nutrition gold standard 100% whey protein',
      description:
        'Each serving of the world’s best-selling whey protein powder provides 24 grams of high-quality whey protein primarily from Whey Protein Isolate, which has had excess carbohydrates, fat, and lactose ‘isolated’ out using sophisticated filtering technologies. The powder is also instantized for easy mixing using just a glass and spoon. With more than 20 different flavors – including naturally flavored options – there’s no doubt this is the Optimum Nutrition Gold Standard 100% Whey Protein.',
      slug: slugify('OPTIMUM NUTRITION GOLD STANDARD 100% WHEY PROTEIN', {
        lower: true,
      }),
      brandId: 'optimum-nutrition',
      collectionIds: ['protein', 'supplements'],
      assets: ['gold-standard.png'],

      featuredAsset: 'gold-standard.png',

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
      brandId: 'muscletech',
      featuredAsset: 'nitrotech.png',
      price: 75000,
    },
    {
      id: 'superior-hydro',
      name: 'HYDRO WHEY ZERO',
      collectionIds: ['protein', 'supplements'],
      description:
        'Peptides de lactosérum hydrolysés à absorption rapide , concentré pour un profil supérieur ',
      slug: slugify('HYDRO WHEY ZERO', {
        lower: true,
      }),
      brandId: 'superior14',
      featuredAsset: 'hydro-superior14.png',
      price: 75000,
    },
    {
      id: 'bande-pakka',
      name: 'BANDE POIGNET PAKKA',
      collectionIds: ['accessories', 'bande'],
      description:
        'Les poignets enveloppants soutiennent les poignets lors de divers exercices d’haltères',
      slug: 'bande-poignet-pakka',

      featuredAsset: 'pakka-bande.png',
      price: 4500,
    },
  ],
};
