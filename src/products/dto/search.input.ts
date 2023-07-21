import { Field, InputType, Int } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';

@InputType()
export class SearchInput {
  @Field(() => String, {
    description: 'search term',
  })
  term: string;
}
