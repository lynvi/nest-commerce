import { Injectable } from '@nestjs/common';
import { CreateOrderInput } from './dto/create-order.input';
import { UpdateOrderInput } from './dto/update-order.input';
import { AddToCartInput } from './dto/add-to-cart.input';
import { FastifyReply, FastifyRequest } from 'fastify';
import { nanoid, customAlphabet } from 'nanoid';
import { PrismaService } from 'nestjs-prisma';
import { GraphQLResolveInfo } from 'graphql';
import { PrismaSelect } from '@paljs/plugins';

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

    const sessionId = request.cookies['session'];
    const session = await this.prismaService.session.findUnique({
      include: { activeOrder: true },
      where: { id: sessionId || '' },
    });

    const randomString = nanoid(80);

    if (!session) {
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
}
