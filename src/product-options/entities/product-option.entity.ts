import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ProductOption {
  @Field(() => String, { description: 'Product option id' })
  id: string;

  @Field(() => String, { description: 'Product option name' })
  name: string;

  @Field(() => String, { description: 'Product option value' })
  value: string;
}
