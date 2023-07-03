import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from 'nestjs-prisma';
import { GraphQLModule } from '@nestjs/graphql';
import { MercuriusDriver, MercuriusDriverConfig } from '@nestjs/mercurius';
import { ProductsModule } from './products/products.module';
import { BrandsModule } from './brands/brands.module';
import { TagsModule } from './tags/tags.module';
import { CollectionsModule } from './collections/collections.module';
import { OrdersModule } from './orders/orders.module';
import { ProductVariantsModule } from './product-variants/product-variants.module';
import { CouponsModule } from './coupons/coupons.module';
import { ConfigModule } from '@nestjs/config';
import { validationSchema } from './config/config.schema';
import { config } from './config';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema,
      load: [config],
    }),
    PrismaModule.forRoot({ isGlobal: true }),
    GraphQLModule.forRoot<MercuriusDriverConfig>({
      driver: MercuriusDriver,

      autoSchemaFile: 'src/schema.gql',
      // subscription: true,
      graphiql: true,
    }),
    ProductsModule,
    BrandsModule,
    TagsModule,
    CollectionsModule,
    OrdersModule,
    ProductVariantsModule,
    CouponsModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
