import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaSelect } from '@paljs/plugins';
import { FastifyReply, FastifyRequest } from 'fastify';
import { GraphQLResolveInfo } from 'graphql';
import { customAlphabet } from 'nanoid';
import { PrismaService } from 'nestjs-prisma';
import { AddCustomerToOrderInput } from './dto/add-customer.input';
import { AddToCartInput } from './dto/add-to-cart.input';
import { CreateOrderInput } from './dto/create-order.input';
import { UpdateOrderInput } from './dto/update-order.input';
import { Session } from '@prisma/client';

@Injectable()
export class OrdersService {
  constructor(private prismaService: PrismaService) {}
  create(createOrderInput: CreateOrderInput) {
    return 'This action adds a new order';
  }

  findAll() {
    return `This action returns all orders`;
  }

  findOne(id: string) {
    return `This action returns a #${id} order`;
  }

  update(id: string, updateOrderInput: UpdateOrderInput) {
    return `This action updates a #${id} order`;
  }

  remove(id: string) {
    return `This action removes a #${id} order`;
  }

  async addToCart(
    addToCartInput: AddToCartInput,
    request: FastifyRequest,
    reply: FastifyReply,
    info: GraphQLResolveInfo,
  ) {
    const select = new PrismaSelect(info).value;

    const nanoid = customAlphabet(
      '1234567890qwertyuiopasdfghjklzxcvbnQWERTYUIOP;LKJHGFDSAZXCVBN',
      10,
    );
    const productVariant = await this.prismaService.productVariant.findUnique({
      where: { id: addToCartInput.productVariantId },
    });

    if (!productVariant) {
      return new NotFoundException('Product variant not found');
    }

    const sessionId = request.cookies['session'];
    const session = await this.prismaService.session.findUnique({
      include: { activeOrder: { include: { orderLines: true } } },
      where: { id: sessionId || '' },
    });

    const randomString = nanoid(80);

    if (!session) {
      if (productVariant.stockLevel < addToCartInput.quantity) {
        return new Error('Insufisant stock');
      }
      const order = await this.prismaService.order.create({
        select: { ...select.select, id: true },
        data: {
          status: 'ACTIVE',
          code: nanoid(18).toUpperCase(),
          orderLines: {
            create: {
              quantity: addToCartInput.quantity,
              productVariantId: addToCartInput.productVariantId,
            },
          },

          total: productVariant.price * addToCartInput.quantity,
        },
      });

      const session = await this.prismaService.session.create({
        data: {
          activeOrder: {
            connect: {
              id: order.id as string,
            },
          },
          id: randomString,
          expiredAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
        },
      });

      reply.setCookie('session', session.id, {
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
        httpOnly: true, // 1 day in milliseconds
        path: '/', // The path where the cookie is valid (in this case, the root path)
      });

      return order;
    }

    const quantity = session.activeOrder.orderLines.find(
      (item) => item.productVariantId === addToCartInput.productVariantId,
    ).quantity;

    if (productVariant.stockLevel < addToCartInput.quantity + quantity) {
      return new Error('insufisant stock');
    }

    return await this.prismaService.order.upsert({
      where: { id: session.orderId || '' },
      ...select,
      create: {
        status: 'ACTIVE',
        code: nanoid(18).toUpperCase(),
        orderLines: {
          create: {
            quantity: addToCartInput.quantity,
            productVariantId: addToCartInput.productVariantId,
          },
        },
        total: productVariant.price * addToCartInput.quantity,
      },

      update: {
        orderLines: {
          upsert: {
            create: {
              quantity: addToCartInput.quantity,
              productVariantId: addToCartInput.productVariantId,
            },
            update: {
              quantity: { increment: addToCartInput.quantity },
            },
            where: {
              orderId_productVariantId: {
                orderId: session.orderId,
                productVariantId: addToCartInput.productVariantId,
              },
            },
          },
        },
        total: { increment: productVariant.price * addToCartInput.quantity },
      },
    });
  }

  async activeOrder(request: FastifyRequest, info: GraphQLResolveInfo) {
    const sessionId = request.cookies['session'];
    const select = new PrismaSelect(info).value;
    const session = await this.prismaService.session.findUnique({
      include: { activeOrder: { ...select } },
      where: { id: sessionId || '' },
    });

    return session?.activeOrder;
  }

  async addCustomerToOrder(
    addCustomerInput: AddCustomerToOrderInput,
    request: FastifyRequest,
    info: GraphQLResolveInfo,
  ) {
    const sessionId = request.cookies['session'];
    const select = new PrismaSelect(info).value;

    const session = await this.prismaService.session.findUnique({
      include: { activeOrder: { ...select } },
      where: { id: sessionId || '' },
    });

    if (!session?.activeOrder) {
      return null;
    }
    const { email, lastName, firstName } = addCustomerInput;

    await this.prismaService.user.updateMany({
      where: { email },
      data: addCustomerInput,
    });

    const order = await this.prismaService.order.update({
      ...select,
      where: { id: session?.activeOrder?.id },
      data: {
        customer: {
          connectOrCreate: {
            create: {
              firstName,
              lastName,
              email,
            },
            where: {
              email,
            },
          },
        },
      },
    });

    return order;
  }
}
