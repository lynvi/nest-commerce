import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class AppService {
  constructor(private prismaService: PrismaService) {}
  getHello(): string {
    return 'Hello abdelkader ';
  }

  async getProducts() {
    return await this.prismaService.product.findMany();
  }
}
