import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersResolver } from './orders.resolver';
import { registerEnumType } from '@nestjs/graphql';
import {
  OrderStatus,
  PaymentMethod,
  PaymentStatus,
  Prisma,
} from '@prisma/client';

@Module({
  providers: [OrdersResolver, OrdersService],
})
export class OrdersModule {
  constructor() {
    registerEnumType(OrderStatus, {
      name: 'OrderStatus',
    });
    registerEnumType(PaymentStatus, {
      name: 'PaymentStatus',
    });
    registerEnumType(PaymentMethod, {
      name: 'PaymentMethod',
    });
    registerEnumType(Prisma.SortOrder, {
      name: 'SortOrder',
    });
  }
}
