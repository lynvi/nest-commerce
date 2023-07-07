import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

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

  @Field(() => String, { description: 'Product variant slug', nullable: true })
  slug: string;

  @Field(() => String, { description: 'Product variant image', nullable: true })
  image: string;

  @Field(() => String, { description: 'Product variant product id' })
  productId: string;

  @Field(() => Int, { description: 'Product variant product id' })
  price: number;

  @Field(() => Int, { description: 'Product variant stocklevel' })
  stockLevel: number;
}
