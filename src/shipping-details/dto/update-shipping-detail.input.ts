import { CreateShippingDetailInput } from './create-shipping-detail.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateShippingDetailInput extends PartialType(CreateShippingDetailInput) {
  @Field(() => Int)
  id: number;
}
