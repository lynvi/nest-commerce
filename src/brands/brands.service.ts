import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateBrandInput } from './dto/create-brand.input';
import { UpdateBrandInput } from './dto/update-brand.input';
import { PrismaService } from 'nestjs-prisma';
import { GraphQLResolveInfo } from 'graphql';
import { PrismaSelect } from '@paljs/plugins';

@Injectable()
export class BrandsService {
  constructor(private prismaService: PrismaService) {}
  async create(createBrandInput: CreateBrandInput) {
    const brand = await this.prismaService.brand.findFirst({
      where: { name: { equals: createBrandInput.name, mode: 'insensitive' } },
    });

    if (brand) {
      throw new BadRequestException(409);
    }
    return this.prismaService.brand.create({ data: createBrandInput });
  }

  findAll(info: GraphQLResolveInfo) {
    const select = new PrismaSelect(info).value;

    // this.prismaService.brand.findMany({
    //   select: {
    //     _count: {
    //       select: {
    //         products: true,
    //       },
    //     },
    //   },
    // });
    return this.prismaService.brand.findMany({ ...select });
  }

  findOne(id: string, info: GraphQLResolveInfo) {
    const select = new PrismaSelect(info).value;
    return this.prismaService.brand.findFirst({
      where: { OR: [{ id }, { slug: id }] },
      ...select,
    });
  }

  update(id: string, updateBrandInput: UpdateBrandInput) {
    return this.prismaService.brand.update({
      data: updateBrandInput,
      where: { id },
    });
  }

  remove(id: string) {
    return this.prismaService.brand.delete({
      where: { id },
    });
  }
}
