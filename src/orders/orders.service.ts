import { HttpService } from '@nestjs/axios';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaSelect } from '@paljs/plugins';
import { FastifyReply, FastifyRequest } from 'fastify';
import { GraphQLResolveInfo } from 'graphql';
import { customAlphabet } from 'nanoid';
import { PrismaService } from 'nestjs-prisma';
import { lastValueFrom } from 'rxjs';
import { formatedPrice } from 'src/utils';
import { AddCustomerToOrderInput } from './dto/add-customer.input';
import { AddShippingToOrderInput } from './dto/add-shipping.input';
import { AddToCartInput } from './dto/add-to-cart.input';
import { CreateOrderInput } from './dto/create-order.input';
import { UpdateOrderInput } from './dto/update-order.input';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class OrdersService {
  constructor(
    private prismaService: PrismaService,
    private httpService: HttpService,
    private configService: ConfigService,
  ) {}
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
      '1234567890qwertyuiopasdfghjklzxcvbnQWERTYUIOPLKJHGFDSAZXCVBN',
      10,
    );
    const productVariant = await this.prismaService.productVariant.findUnique({
      where: { id: addToCartInput.productVariantId },
    });

    if (!productVariant) {
      return new NotFoundException('Product variant not found');
    }

    const sessionId = request.cookies['session'];
    let session = await this.prismaService.session.findUnique({
      include: { activeOrder: { include: { orderLines: true } } },
      where: { id: sessionId || '' },
    });

    const randomString = nanoid(80);

    if (!session) {
      session = await this.prismaService.session.create({
        include: { activeOrder: { include: { orderLines: true } } },
        data: {
          id: randomString,
          expiredAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
        },
      });
    }

    if (session?.activeOrder) {
      const quantity =
        session.activeOrder.orderLines.find(
          (item) => item.productVariantId === addToCartInput.productVariantId,
        )?.quantity || 0;

      if (productVariant.stockLevel < addToCartInput.quantity + quantity) {
        return new Error('Stock low');
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

    // adsda

    if (productVariant.stockLevel < addToCartInput.quantity) {
      return new Error('Stock low');
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

    await this.prismaService.session.update({
      where: { id: session.id },
      data: { activeOrder: { connect: { id: order.id as string } } },
    });

    reply.setCookie('session', session.id, {
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 1 day in milliseconds
      path: '/',
      secure: true,
      httpOnly: false,
      sameSite: 'none',
      domain:
        process.env.NODE_ENV === 'production' ? 'alphafit.ma' : 'localhost',
      // The path where the cookie is valid (in this case, the root path)
    });

    return order;
  }
  async removeFromCart(
    input: AddToCartInput,
    request: FastifyRequest,

    info: GraphQLResolveInfo,
  ) {
    const select = new PrismaSelect(info).value;

    const productVariant = await this.prismaService.productVariant.findUnique({
      where: { id: input.productVariantId },
    });

    if (!productVariant) {
      return new NotFoundException('Product variant not found');
    }

    const sessionId = request.cookies['session'];
    let session = await this.prismaService.session.findUnique({
      include: { activeOrder: { include: { orderLines: true } } },
      where: { id: sessionId || '' },
    });

    const quantity =
      session.activeOrder.orderLines.find(
        (item) => item.productVariantId === input.productVariantId,
      )?.quantity || 0;

    if (quantity === 0) {
      return new NotFoundException('Product variant not found zero quantity');
    }

    return await this.prismaService.order.update({
      ...select,
      where: { id: session.activeOrder.id },
      data: {
        total: {
          decrement: productVariant.price * input.quantity,
        },
        orderLines:
          (quantity === 1 || quantity === input.quantity) === true
            ? {
                disconnect: {
                  orderId_productVariantId: {
                    orderId: session.activeOrder.id,
                    productVariantId: input.productVariantId,
                  },
                },
              }
            : {
                update: {
                  data: {
                    quantity: {
                      decrement: input.quantity,
                    },
                  },
                  where: {
                    orderId_productVariantId: {
                      orderId: session.activeOrder.id,
                      productVariantId: input.productVariantId,
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
    const { orderLines, ...rest } = select.select;

    const session = await this.prismaService.session.findUnique({
      include: {
        activeOrder: {
          select: {
            ...rest,
            orderLines: {
              select: orderLines.select,
              orderBy: { createdAt: 'asc' },
            },
          },
        },
      },
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

  async addShippingToOrder(
    addShippingToOrder: AddShippingToOrderInput,
    info: GraphQLResolveInfo,
    request: FastifyRequest,
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

    const order = await this.prismaService.order.update({
      ...select,
      where: { id: session.activeOrder.id },
      data: {
        shippingDetail: {
          create: {
            userId: session?.activeOrder?.userId || null,
            city: addShippingToOrder.city,
            firstName: addShippingToOrder?.firstName,
            lastName: addShippingToOrder?.lastName,
            phoneNumber: addShippingToOrder.phoneNumber,
            zipCode: addShippingToOrder.zipCode,
            streetAddress: addShippingToOrder.street,
          },
        },
      },
    });

    console.log(order);
    return order;
  }

  async finalizeOrder(info: GraphQLResolveInfo, request: FastifyRequest) {
    const sessionId = request.cookies['session'];
    const select = new PrismaSelect(info).value;

    const session = await this.prismaService.session.findUnique({
      include: { activeOrder: { ...select } },
      where: { id: sessionId || '' },
    });

    if (!session?.activeOrder) {
      return null;
    }

    const order = await this.prismaService.order.findUnique({
      where: { id: session.activeOrder.id },
    });

    if (order.shippingDetailId && order.userId && order.status === 'ACTIVE') {
      await this.prismaService.session.update({
        where: { id: session.id },
        data: { activeOrder: { disconnect: true } },
      });

      const updatedOrder = await this.prismaService.order.update({
        select: {
          id: true,
          shippingDetail: {
            select: {
              city: true,
              zipCode: true,
              country: true,
              firstName: true,
              lastName: true,
              phoneNumber: true,
              streetAddress: true,
            },
          },
          orderLines: {
            include: {
              productVariant: true,
            },
          },
          customer: {
            select: { lastName: true, firstName: true, phone: true },
          },
        },
        where: { id: order.id },
        data: {
          status: 'SHIPPING_PENDING',
        },
      });

      const orderToSlackMessage = {
        blocks: [
          {
            type: 'header',
            text: {
              type: 'plain_text',
              text: `Nouvelle commande par ${updatedOrder.customer.firstName} ${updatedOrder.customer.lastName} 🥳`,
              emoji: true,
            },
          },
          // {
          //   type: 'section',
          //   fields: [
          //     {
          //       type: 'mrkdwn',
          //       text: `*Commander par:* <example.com|${updatedOrder.customer.firstName} ${updatedOrder.customer.lastName}>`,
          //     },
          //   ],
          // },

          {
            type: 'section',
            fields: [
              {
                type: 'mrkdwn',
                text: `*Details de livraison:*\n${updatedOrder.shippingDetail.streetAddress},${updatedOrder.shippingDetail.zipCode}, ${updatedOrder.shippingDetail.city}.\n<tel:${updatedOrder.shippingDetail.phoneNumber}|${updatedOrder.shippingDetail.phoneNumber}>`,
              },
            ],
          },
          {
            type: 'section',
            fields: [
              {
                type: 'mrkdwn',
                text: `*Produits commander:*`,
              },
            ],
          },
          {
            type: 'divider',
          },

          ...updatedOrder.orderLines.map((item) => ({
            type: 'section',
            text: {
              type: 'mrkdwn',
              text: `*${item.quantity}* • ${
                item.productVariant.name
              }\n_${formatedPrice(item.productVariant.price)}_`,
            },
            accessory: {
              type: 'image',
              image_url:
                'https://images.alphafit.ma/' +
                item.productVariant.featuredAsset,
              alt_text: item.productVariant.name,
            },
          })),

          {
            type: 'divider',
          },
          {
            type: 'section',
            fields: [
              {
                type: 'mrkdwn',
                text: `*Total:* ${formatedPrice(order.total)}`,
              },
            ],
          },
        ],
      };

      const orderChannelWebhoolUrl = this.configService.get(
        'slack.ordersChannel',
      );

      const request = await lastValueFrom(
        this.httpService.post(orderChannelWebhoolUrl, orderToSlackMessage),
      );

      return await this.prismaService.order.findUnique({
        ...select,
        where: { id: updatedOrder.id },
      });
    }

    return null;
  }

  async orderByCode(code: string, info: GraphQLResolveInfo) {
    const select = new PrismaSelect(info).value;
    return await this.prismaService.order.findUnique({
      where: { code },
      ...select,
    });
  }
}
