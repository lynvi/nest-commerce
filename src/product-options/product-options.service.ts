import { Injectable } from '@nestjs/common';
import { CreateProductOptionInput } from './dto/create-product-option.input';
import { UpdateProductOptionInput } from './dto/update-product-option.input';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class ProductOptionsService {
  constructor(private prismaService: PrismaService) {}
  create(createProductOptionInput: CreateProductOptionInput) {
    return this.prismaService.productOption.create({
      data: createProductOptionInput,
    });
  }

  findAll() {
    return `This action returns all productOptions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} productOption`;
  }

  update(id: number, updateProductOptionInput: UpdateProductOptionInput) {
    return `This action updates a #${id} productOption`;
  }

  remove(id: number) {
    return `This action removes a #${id} productOption`;
  }
}
