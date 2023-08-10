import { InputType, Int, Field } from '@nestjs/graphql';
import { CreateProductOptionInput } from 'src/product-options/dto/create-product-option.input';
import { ProductOption } from 'src/product-options/entities/product-option.entity';

@InputType()
export class CreateProductVariantInput {
  @Field(() => String, { description: 'Product variant name' })
  name: string;

  @Field(() => String, { description: 'Product reference', nullable: true })
  ref: string;
  @Field(() => String, { description: 'Product variant description' })
  description: string;

  @Field(() => String, { description: 'Product variant image', nullable: true })
  featuredAsset: string;

  @Field(() => String, { description: 'Product variant slug' })
  slug: string;

  @Field(() => String, { description: 'Product variant product id' })
  productId: string;

  @Field(() => Int, { description: 'Product variant product id' })
  price: number;

  @Field(() => [CreateProductOptionInput], {
    description: 'Product options',
    nullable: true,
  })
  productOptions: CreateProductOptionInput[];

  @Field(() => Int, {
    description: 'Product variant sales price',
    nullable: true,
  })
  salesPrice: number;

  @Field(() => Int, { description: 'Product variant stocklevel' })
  stockLevel: number;
}
