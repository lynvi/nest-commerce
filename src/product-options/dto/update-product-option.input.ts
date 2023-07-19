import { CreateProductOptionInput } from './create-product-option.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateProductOptionInput extends PartialType(CreateProductOptionInput) {
  @Field(() => Int)
  id: number;
}
