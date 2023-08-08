import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateProductOptionInput {
  @Field(() => String, { description: 'Example field (placeholder)' })
  name: string;
  @Field(() => String, { description: 'Example field (placeholder)' })
  value: string;
}
