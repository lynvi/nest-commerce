import { CreateProductVariantInput } from './create-product-variant.input';
import { InputType, Field, Int, PartialType, ID } from '@nestjs/graphql';

@InputType()
export class UpdateProductVariantInput extends PartialType(
  CreateProductVariantInput,
) {
  @Field(() => ID)
  id: string;
}

@InputType()
export class AssignProductOptionToProductVariantInput {
  @Field(() => ID)
  productOptionId: string;

  @Field(() => ID)
  productVariantId: string;
}
