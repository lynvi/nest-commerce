import { Module } from '@nestjs/common';
import { ProductOptionsService } from './product-options.service';
import { ProductOptionsResolver } from './product-options.resolver';

@Module({
  providers: [ProductOptionsResolver, ProductOptionsService]
})
export class ProductOptionsModule {}
