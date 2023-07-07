import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCollectionInput } from './dto/create-collection.input';
import { UpdateCollectionInput } from './dto/update-collection.input';
import { PrismaService } from 'nestjs-prisma';
import { PrismaSelect } from '@paljs/plugins';
import { GraphQLResolveInfo } from 'graphql';

@Injectable()
export class CollectionsService {
  constructor(private prismaService: PrismaService) {}
  async create(createCollectionInput: CreateCollectionInput) {
    const collection = await this.prismaService.collection.findFirst({
      where: { name: createCollectionInput.name },
    });

    if (collection) {
      throw new BadRequestException(409);
    }
    return this.prismaService.collection.create({
      data: {
        ...createCollectionInput,
      },
    });
  }

  findAll(info: GraphQLResolveInfo) {
    const select = new PrismaSelect(info).value;
    return this.prismaService.collection.findMany({ ...select });
  }

  findOne(info: GraphQLResolveInfo, id?: string, slug?: string) {
    const select = new PrismaSelect(info).value;
    return this.prismaService.collection.findFirst({
      ...select,
      where: { OR: [{ id, slug }] },
    });
  }

  update(id: number, updateCollectionInput: UpdateCollectionInput) {
    return `This action updates a #${id} collection`;
  }

  remove(id: number) {
    return `This action removes a #${id} collection`;
  }
}
