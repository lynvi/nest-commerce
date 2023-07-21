import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaSelect } from '@paljs/plugins';
import { Prisma } from '@prisma/client';
import { GraphQLResolveInfo } from 'graphql';
import { PrismaService } from 'nestjs-prisma';
import { CreateProductInput } from './dto/create-product.input';
import { FilterProductInput } from './dto/filter-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { SearchInput } from './dto/search.input';
import { cleanUpSpecialChars } from 'src/utils';

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
      orderBy: [
        filter.orderBy && {
          [filter.orderBy]: filter.sortOrder,
        },
      ],
      where: {
        AND: [
          { price: { lte: filter?.maxPrice } },
          { price: { gte: filter?.minPrice } },
        ],

        brandId: filter?.brandId,
        collections: filter?.collectionSlug
          ? { some: { slug: filter.collectionSlug } }
          : undefined,
      },
    });
  }

  async findOne(info: GraphQLResolveInfo, id?: string, slug?: string) {
    const select = new PrismaSelect(info).value;

    return this.prismaService.product.findFirst({
      where: { OR: [{ id, slug }] },
      ...select,
    });
  }

  update(
    id: string,
    updateProductInput: UpdateProductInput,
    info: GraphQLResolveInfo,
  ) {
    const select = new PrismaSelect(info).value;
    return this.prismaService.product.update({
      where: { id },
      ...select,
      data: updateProductInput,
    });
  }

  async remove(id: string) {
    try {
      return await this.prismaService.product.delete({
        where: { id },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        switch (error.code) {
          case 'P2025': {
            throw new NotFoundException();
          }
          default:
        }
      }
    }
  }

  async search(input: SearchInput) {
    const term = cleanUpSpecialChars(input.term);

    const products = await this.prismaService.product.findMany({
      where: {
        slug: {
          search: term.replace(' ', '|'),
        },
      },
    });

    const brands = await this.prismaService.brand.findMany({
      where: {
        slug: {
          search: term.replace(' ', '|'),
          // mode: 'insensitive',
          // contains: term,
        },
      },
    });

    return { brands, products };
  }
}

const PrimaErrorCodeMapping = (code: string) => {
  //https://www.prisma.io/docs/reference/api-reference/error-reference#prisma-client-query-engine

  switch (code) {
    case 'P2025': {
      throw new NotFoundException();
    }
    case 'P2000': {
      throw new NotFoundException();
    }
    case 'P2001': {
      throw new NotFoundException();
    }
    case 'P2002': {
      //
      throw new BadRequestException(409);
    }
    case 'P2025': {
      throw new NotFoundException();
    }
    case 'P2025': {
      throw new NotFoundException();
    }
    default:
  }
};
