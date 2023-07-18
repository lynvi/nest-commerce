import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class FilterProductInput {
  @Field(() => String, {
    description: 'Products by collection slug',
    nullable: true,
  })
  collectionSlug: string;

  @Field(() => String, {
    description: 'Products by brandId',
    nullable: true,
  })
  brandId: string;

  @Field(() => Int, {
    description: 'Products by min price',
    nullable: true,
    defaultValue: 0,
  })
  minPrice: number;

  @Field(() => Int, {
    description: 'Products by max price',
    nullable: true,
  })
  maxPrice: number;
}
