import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class AppService {
  constructor(
    private prismaService: PrismaService,
    private configService: ConfigService,
  ) {}
  getHello(): string {
    return 'You have reach our api root endpoint, if you are fullstack developer (react + nodejs) ping us careers@alphafit.ma .';
  }

  async getProducts() {
    return await this.prismaService.product.findMany();
  }
}
