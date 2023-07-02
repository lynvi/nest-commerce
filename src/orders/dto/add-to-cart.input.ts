import { InputType, Int, Field, ID } from '@nestjs/graphql';

@InputType()
export class AddToCartInput {
  @Field(() => ID, { description: 'order id', nullable: true })
  orderId?: string;

  @Field(() => ID, { description: 'Product variant id' })
  productVariantId: string;

  @Field(() => Int, {
    description: 'quantity',
    defaultValue: 1,
    nullable: true,
  })
  quantity: number;
}
