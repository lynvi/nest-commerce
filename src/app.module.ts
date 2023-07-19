import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { MercuriusDriver, MercuriusDriverConfig } from '@nestjs/mercurius';
import { PrismaModule } from 'nestjs-prisma';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BrandsModule } from './brands/brands.module';
import { CollectionsModule } from './collections/collections.module';
import { config } from './config';
import { validationSchema } from './config/config.schema';
import { CouponsModule } from './coupons/coupons.module';
import { OrdersModule } from './orders/orders.module';
import { ProductVariantsModule } from './product-variants/product-variants.module';
import { ProductsModule } from './products/products.module';
import { TagsModule } from './tags/tags.module';
import { UsersModule } from './users/users.module';
import { AssetsModule } from './assets/assets.module';
import { ShippingDetailsModule } from './shipping-details/shipping-details.module';
import { GlobalHttpModule } from './global-http.module';
import { ProductOptionsModule } from './product-options/product-options.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema,
      load: [config],
    }),

    GlobalHttpModule,
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
    AssetsModule,
    ShippingDetailsModule,
    ProductOptionsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
