import { InputType, Int, Field, ID } from '@nestjs/graphql';

@InputType()
export class AddShippingToOrderInput {
  @Field(() => String, { description: '', nullable: true })
  street?: string;

  @Field(() => String, { description: '', nullable: true })
  city?: string;

  @Field(() => String, { description: '', nullable: true })
  zipCode?: string;

  @Field(() => String, { description: '', nullable: true })
  phoneNumber?: string;
}
