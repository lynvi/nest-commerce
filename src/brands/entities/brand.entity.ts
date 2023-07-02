import { ObjectType, Field, Int, ID } from '@nestjs/graphql';

@ObjectType()
export class Brand {
  @Field(() => ID, { description: 'Brand ID' })
  id: string;
  @Field(() => String, { description: 'Brand name' })
  name: string;

  @Field(() => String, { description: 'Brand description' })
  description: string;

  @Field(() => String, { description: 'Brand logo' })
  logo: string;
}
