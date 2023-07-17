import { Field, InputType } from '@nestjs/graphql';

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
}
