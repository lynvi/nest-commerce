import { ObjectType, Field, Int } from '@nestjs/graphql';
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

  @Field(() => String, { description: 'product image', nullable: true })
  image: string;

  @Field((type) => Brand, { nullable: true })
  brand?: Brand;

  @Field((type) => Brand, { nullable: true })
  seller?: Brand;

  @Field((type) => [Tag], { nullable: true })
  tags?: Tag[];

  @Field((type) => [Collection], { nullable: true })
  collections?: Collection[];

  @Field((type) => [ProductVariant], { nullable: true })
  productVariants?: ProductVariant[];
}
