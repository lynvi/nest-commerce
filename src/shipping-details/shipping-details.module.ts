import { Module } from '@nestjs/common';
import { ShippingDetailsService } from './shipping-details.service';
import { ShippingDetailsResolver } from './shipping-details.resolver';

@Module({
  providers: [ShippingDetailsResolver, ShippingDetailsService]
})
export class ShippingDetailsModule {}
