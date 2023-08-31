import {
  Args,
  Context,
  Info,
  Mutation,
  Query,
  Resolver,
} from '@nestjs/graphql';
import { FastifyReply, FastifyRequest } from 'fastify';
import { GraphQLResolveInfo } from 'graphql';
import { AddCustomerToOrderInput } from './dto/add-customer.input';
import { AddToCartInput } from './dto/add-to-cart.input';
import { CreateOrderInput } from './dto/create-order.input';
import { UpdateOrderInput } from './dto/update-order.input';
import { Order } from './entities/order.entity';
import { OrdersService } from './orders.service';
import { AddShippingToOrderInput } from './dto/add-shipping.input';

@Resolver(() => Order)
export class OrdersResolver {
  constructor(private readonly ordersService: OrdersService) {}

  @Mutation(() => Order)
  createOrder(@Args('createOrderInput') createOrderInput: CreateOrderInput) {
    return this.ordersService.create(createOrderInput);
  }

  @Query(() => [Order], { name: 'orders' })
  findAll() {
    return this.ordersService.findAll();
  }

  @Query(() => Order, { name: 'order' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.ordersService.findOne(id);
  }

  @Mutation(() => Order)
  updateOrder(@Args('updateOrderInput') updateOrderInput: UpdateOrderInput) {
    return this.ordersService.update(updateOrderInput.id, updateOrderInput);
  }

  @Mutation(() => Order)
  removeOrder(@Args('id', { type: () => String }) id: string) {
    return this.ordersService.remove(id);
  }

  @Mutation(() => Order)
  async addToCart(
    @Context() context,
    @Args('addToCartInput') addToCartInput: AddToCartInput,
    @Info() info: GraphQLResolveInfo,
  ) {
    const reply = context.reply as FastifyReply;
    const request = context.req as FastifyRequest;

    return await this.ordersService.addToCart(
      addToCartInput,
      request,
      reply,
      info,
    );
  }

  @Mutation(() => Order)
  async removeFromCart(
    @Context() context,
    @Args('removeFromCartInput') removeFromCartInput: AddToCartInput,
    @Info() info: GraphQLResolveInfo,
  ) {
    const request = context.req as FastifyRequest;

    return await this.ordersService.removeFromCart(
      removeFromCartInput,
      request,
      info,
    );
  }

  @Mutation(() => Order, { nullable: true })
  async addCustomerToOrder(
    @Context() context,
    @Args('addCustomerToOrderInput')
    addCustomerToOrderInput: AddCustomerToOrderInput,
    @Info() info: GraphQLResolveInfo,
  ) {
    const request = context.req as FastifyRequest;

    return await this.ordersService.addCustomerToOrder(
      addCustomerToOrderInput,
      request,
      info,
    );
  }

  @Mutation(() => Order, { nullable: true })
  async addShippngToOrder(
    @Context() context,
    @Args('addShippingToOrderInput')
    addShippingToOrderInput: AddShippingToOrderInput,
    @Info() info: GraphQLResolveInfo,
  ) {
    const request = context.req as FastifyRequest;

    return await this.ordersService.addShippingToOrder(
      addShippingToOrderInput,
      info,
      request,
    );
  }
  @Mutation(() => Order, { nullable: true })
  async finalizeOrder(@Context() context, @Info() info: GraphQLResolveInfo) {
    const request = context.req as FastifyRequest;
    return await this.ordersService.finalizeOrder(info, request);
  }

  @Query(() => Order, { nullable: true })
  async activeOrder(@Context() context, @Info() info: GraphQLResolveInfo) {
    const request = context.req as FastifyRequest;
    return await this.ordersService.activeOrder(request, info);
  }

  @Query(() => Order, { nullable: true })
  async orderByCode(
    @Info() info: GraphQLResolveInfo,
    @Args('orderCode') code: string,
  ) {
    return await this.ordersService.orderByCode(code, info);
  }
}
