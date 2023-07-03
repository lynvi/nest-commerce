import { InputType, Int, Field, ID } from '@nestjs/graphql';

@InputType()
export class AddCustomerToOrderInput {
  @Field(() => String, { description: '', nullable: true })
  firstName?: string;

  @Field(() => String, { description: '', nullable: true })
  lastName?: string;

  @Field(() => String, { description: '', nullable: true })
  email: string;
}
