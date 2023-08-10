import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Asset } from 'src/assets/entities/asset.entity';
import { Brand } from 'src/brands/entities/brand.entity';
import { Collection } from 'src/collections/entities/collection.entity';
import { ProductVariant } from 'src/product-variants/entities/product-variant.entity';
import { Tag } from 'src/tags/entities/tag.entity';

@ObjectType()
export class Product {
  @Field(() => String, { description: 'Id' })
  id: string;

  @Field(() => String, { description: 'Example field (placeholder)' })
  name: string;

  @Field(() => String, { description: 'Product slug' })
  slug: string;

  @Field(() => String, { description: 'product description', nullable: true })
  description: string;

  @Field(() => String, {
    description: 'product long description',
    nullable: true,
  })
  long_description: string;

  @Field(() => String, {
    description: 'average variant  price',
    nullable: true,
  })
  price: string;

  @Field(() => String, {
    description: 'average variant sales price ',
    nullable: true,
  })
  salesPrice: string;

  @Field(() => String, {
    description: 'product featured  asset',
    nullable: true,
  })
  featuredAsset: string;

  @Field(() => [Asset], { description: 'product assets', nullable: true })
  assets: Asset[];

  @Field((type) => Brand, { nullable: true })
  brand?: Brand;

  @Field((type) => Brand, { nullable: true })
  seller?: Brand;

  @Field((type) => [Tag], { nullable: true })
  tags?: Tag[];

  @Field((type) => [Collection], { nullable: true })
  collections?: Collection[];

  @Field((type) => [ProductVariant])
  productVariants: ProductVariant[];
}

@ObjectType()
export class PaginatedProduct {
  @Field(() => Int, { description: 'total products' })
  totalItems: number;

  @Field(() => Int, { description: 'total pages' })
  totalPages: number;

  @Field(() => Int, { description: 'page number' })
  page: number;

  @Field(() => Int, { description: 'page number' })
  take: number;

  @Field(() => [Product], { description: 'Products' })
  items: Product[];
}
