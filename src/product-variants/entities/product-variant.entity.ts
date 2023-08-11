import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

import { Asset } from 'src/assets/entities/asset.entity';
import { ProductOption } from 'src/product-options/entities/product-option.entity';
import { Product } from 'src/products/entities/product.entity';

@ObjectType()
export class ProductVariant {
  @Field(() => ID, { description: 'Product variant id' })
  id: string;

  @Field(() => String, { description: 'Product variant name' })
  name: string;

  @Field(() => String, {
    description: 'Product variant description',
    nullable: true,
  })
  description: string;

  @Field(() => String, { description: 'Product variant sku', nullable: true })
  sku: string;

  @Field(() => String, {
    description: 'product variant featured  asset',
    nullable: true,
  })
  featuredAsset: string;
  @Field(() => [Asset], { description: 'product assets', nullable: true })
  assets: Asset[];

  @Field(() => Product, { description: 'product', nullable: false })
  product: Product;

  @Field(() => String, { description: 'Product variant product id' })
  productId: string;

  @Field(() => Int, { description: 'normal price' })
  price: number;

  @Field(() => Int, { description: 'sales price', nullable: true })
  salesPrice: number;

  @Field(() => Int, { description: 'Product variant stocklevel' })
  stockLevel: number;

  @Field(() => [ProductOption], { description: 'Product variant stocklevel' })
  productOptions: ProductOption[];
}
