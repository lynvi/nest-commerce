import { Field, ID, ObjectType } from '@nestjs/graphql';
import { OrderStatus } from '@prisma/client';
import { Coupon } from 'src/coupons/entities/coupon.entity';
import { OrderLine } from './order-line.entity';

@ObjectType()
export class Order {
  @Field(() => ID, { description: 'order id' })
  id: string;

  @Field(() => String, { description: 'order code' })
  code: string;

  @Field(() => ID, { description: 'customer id' })
  userId: string;

  @Field(() => OrderStatus, { description: 'order status' })
  status: OrderStatus;

  @Field(() => [OrderLine], { description: 'order lines' })
  orderLines: OrderLine[];

  @Field(() => [Coupon], { description: 'applied coupons', nullable: true })
  appliedCoupon?: Coupon[];
}
