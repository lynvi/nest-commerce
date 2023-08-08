import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateProductInput {
  @Field(() => String, {
    description: 'Product featured asset',
    nullable: true,
  })
  featuredAsset: string;

  @Field(() => String, { description: 'Product name' })
  name: string;

  @Field(() => String, { description: 'Product slug' })
  slug: string;

  @Field(() => String, { description: 'Product description' })
  description: string;

  @Field(() => String, {
    description: 'Product long description',
    nullable: true,
  })
  long_description: string;

  @Field(() => String, { description: 'Product brand id' })
  brandId: string;

  @Field(() => [String], { description: 'Product tags' })
  tags: string[];

  @Field(() => [String], { description: 'collection ids', nullable: true })
  collectionIds?: string[];
}
