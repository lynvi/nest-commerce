import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductVariantInput } from './dto/create-product-variant.input';
import { UpdateProductVariantInput } from './dto/update-product-variant.input';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class ProductVariantsService {
  constructor(private prismaService: PrismaService) {}
  create(createProductVariantInput: CreateProductVariantInput) {
    return this.prismaService.productVariant.create({
      data: {
        ...createProductVariantInput,
        productOptions: createProductVariantInput?.productOptions && {
          connectOrCreate: [
            ...createProductVariantInput?.productOptions.map((item) => ({
              create: {
                name: item.name,
                value: item.value,
              },
              where: {
                name_value: {
                  name: item.name,
                  value: item.value,
                },
              },
            })),
          ],
        },
      },
    });
  }

  findAll() {
    return `This action returns all productVariants`;
  }

  findOne(id: number) {
    return `This action returns a #${id} productVariant`;
  }

  update(id: string, updateProductVariantInput: UpdateProductVariantInput) {
    return this.prismaService.productVariant.update({
      include: {
        productOptions: true,
      },
      where: {
        id,
      },
      data: {
        ...(updateProductVariantInput as any),
        productOptions: updateProductVariantInput?.productOptions && {
          connectOrCreate: [
            ...updateProductVariantInput?.productOptions.map((item) => ({
              create: {
                name: item.name,
                value: item.value,
              },
              where: {
                name_value: {
                  name: item.name,
                  value: item.value,
                },
              },
            })),
          ],
        },
      },
    });
  }

  async remove(id: string) {
    const pv = await this.prismaService.productVariant.findUniqueOrThrow({
      where: { id },
    });

    if (!pv) {
      throw new NotFoundException();
    }
    return this.prismaService.productVariant.delete({ where: { id } });
  }

  async assignProductOptionToProductVariant(
    productOptionId: string,
    productVariantId: string,
  ) {
    return await this.prismaService.productVariant.update({
      include: {
        productOptions: true,
      },
      where: {
        id: productVariantId,
      },
      data: {
        productOptions: {
          set: {
            id: productOptionId,
          },
        },
      },
    });
  }
}
