import { Injectable } from '@nestjs/common';
import { CreateTagInput } from './dto/create-tag.input';
import { UpdateTagInput } from './dto/update-tag.input';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class TagsService {
  constructor(private prismaService: PrismaService) {}
  create(createTagInput: CreateTagInput) {
    return this.prismaService.tag.create({ data: createTagInput });
  }

  findAll() {
    return this.prismaService.tag.findMany({ include: { products: true } });
  }

  findOne(name: string) {
    return this.prismaService.tag.findUnique({ where: { name } });
  }

  update(id: number, updateTagInput: UpdateTagInput) {
    return `This action updates a #${id} tag`;
  }

  remove(id: number) {
    return `This action removes a #${id} tag`;
  }
}
