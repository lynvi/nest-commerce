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
    return `
    
    █████  ██      ██████  ██   ██  █████  ███████ ██ ████████    ███    ███  █████       ██████  ██████   █████  ██████  ██   ██  ██████  ██           █████  ██████  ██     
    ██   ██ ██      ██   ██ ██   ██ ██   ██ ██      ██    ██       ████  ████ ██   ██     ██       ██   ██ ██   ██ ██   ██ ██   ██ ██    ██ ██          ██   ██ ██   ██ ██     
    ███████ ██      ██████  ███████ ███████ █████   ██    ██       ██ ████ ██ ███████     ██   ███ ██████  ███████ ██████  ███████ ██    ██ ██          ███████ ██████  ██     
    ██   ██ ██      ██      ██   ██ ██   ██ ██      ██    ██       ██  ██  ██ ██   ██     ██    ██ ██   ██ ██   ██ ██      ██   ██ ██ ▄▄ ██ ██          ██   ██ ██      ██     
    ██   ██ ███████ ██      ██   ██ ██   ██ ██      ██    ██    ██ ██      ██ ██   ██      ██████  ██   ██ ██   ██ ██      ██   ██  ██████  ███████     ██   ██ ██      ██     
                                                                                                                                       ▀▀                                      

    alphafit.ma is built using a beta version of headless ecommerce graphql api built using NestJS , Postgres (or plug in any database supported by prisma) , Prisma ORM , Graphql ,\n    Fastify x Mercuris server  \n\n\n    Built with love in Morocco <> 🇲🇦 🚀                                                                                                                    
                                                                                                                                                                               
    `;
  }

  async getProducts() {
    return await this.prismaService.product.findMany();
  }
}
