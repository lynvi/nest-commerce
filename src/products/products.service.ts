import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaSelect } from '@paljs/plugins';
import { Prisma } from '@prisma/client';
import { GraphQLResolveInfo } from 'graphql';
import { PrismaService } from 'nestjs-prisma';
import slugify from 'slugify';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { FilterProductInput } from './dto/filter-product.input';

@Injectable()
export class ProductsService {
  constructor(private prismaService: PrismaService) {}
  async create(
    createProductInput: CreateProductInput,
    info: GraphQLResolveInfo,
  ) {
    try {
      const { collectionIds, ...input } = createProductInput;
      const select = new PrismaSelect(info).value;
      return await this.prismaService.product.create({
        ...select,
        data: {
          ...input,
          tags: {
            connectOrCreate: [
              ...input.tags.map((tag) => ({
                create: { name: tag },
                where: { name: tag },
              })),
            ],
          },
          collections: {
            connect: [
              ...collectionIds?.map((collectionId) => ({
                id: collectionId,
              })),
            ],
          },
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new BadRequestException(409);
      }

      throw error;
    }
  }

  findAll(info: GraphQLResolveInfo, filter: FilterProductInput) {
    const select = new PrismaSelect(info).value;

    return this.prismaService.product.findMany({
      ...select,
      where: {
        collections: filter?.collectionSlug
          ? { some: { slug: filter.collectionSlug } }
          : undefined,
      },
    });
  }

  findOne(id: string, info: GraphQLResolveInfo) {
    const select = new PrismaSelect(info).value;
    return this.prismaService.product.findUnique({
      where: { id },
      ...select,
    });
  }

  update(id: number, updateProductInput: UpdateProductInput) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
