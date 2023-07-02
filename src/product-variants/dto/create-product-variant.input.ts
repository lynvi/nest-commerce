import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateProductVariantInput {
  @Field(() => String, { description: 'Product variant name' })
  name: string;

  @Field(() => String, { description: 'Product variant description' })
  description: string;

  @Field(() => String, { description: 'Product variant image' })
  image: string;

  @Field(() => String, { description: 'Product variant slug' })
  slug: string;

  @Field(() => String, { description: 'Product variant product id' })
  productId: string;

  @Field(() => Int, { description: 'Product variant product id' })
  price: number;

  @Field(() => Int, { description: 'Product variant stocklevel' })
  stockLevel: number;
}
