import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { OrderStatus } from '@prisma/client';
import { Coupon } from 'src/coupons/entities/coupon.entity';
import { OrderLine } from './order-line.entity';
import { User } from 'src/users/entities/user.entity';

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

  @Field(() => User, { description: 'order customer', nullable: true })
  customer?: User;

  @Field(() => Int, { description: 'order total price', nullable: true })
  total?: number;
}
