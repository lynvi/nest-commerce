import { Injectable } from '@nestjs/common';
import { CreateProductVariantInput } from './dto/create-product-variant.input';
import { UpdateProductVariantInput } from './dto/update-product-variant.input';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class ProductVariantsService {
  constructor(private prismaService: PrismaService) {}
  create(createProductVariantInput: CreateProductVariantInput) {
    return this.prismaService.productVariant.create({
      data: createProductVariantInput,
    });
  }

  findAll() {
    return `This action returns all productVariants`;
  }

  findOne(id: number) {
    return `This action returns a #${id} productVariant`;
  }

  update(id: number, updateProductVariantInput: UpdateProductVariantInput) {
    return `This action updates a #${id} productVariant`;
  }

  remove(id: number) {
    return `This action removes a #${id} productVariant`;
  }
}
