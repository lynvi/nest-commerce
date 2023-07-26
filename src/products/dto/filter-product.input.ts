import { Field, InputType, Int } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';

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

  @Field(() => String, {
    description: 'order by ',
    nullable: true,
  })
  orderBy: string;

  @Field(() => Int, {
    description: 'page number ',
    nullable: true,
    defaultValue: 0,
  })
  page: number;

  @Field(() => Int, {
    description: 'items to return ',
    nullable: true,
    defaultValue: 10,
  })
  take: number;

  @Field(() => Prisma.SortOrder, {
    description: 'order by ',
    nullable: true,
    defaultValue: 'asc',
  })
  sortOrder: 'asc' | 'desc';
}
