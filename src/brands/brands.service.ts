import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateBrandInput } from './dto/create-brand.input';
import { UpdateBrandInput } from './dto/update-brand.input';
import { PrismaService } from 'nestjs-prisma';

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

  findAll() {
    return this.prismaService.brand.findMany();
  }

  findOne(id: string) {
    return this.prismaService.brand.findUnique({ where: { id } });
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
