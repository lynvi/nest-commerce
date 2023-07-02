import { Field, ID, ObjectType } from '@nestjs/graphql';
import { OrderStatus } from '@prisma/client';
import { ProductVariant } from 'src/product-variants/entities/product-variant.entity';
import { Order } from './order.entity';

@ObjectType()
export class OrderLine {
  @Field(() => ID, { description: 'order id' })
  id: string;

  @Field(() => ProductVariant, { description: 'product variant' })
  productVariant: ProductVariant;

  @Field(() => ID, { description: 'quantity' })
  quantity: number;

  @Field(() => Order, { description: 'related order' })
  order: Order;
}
