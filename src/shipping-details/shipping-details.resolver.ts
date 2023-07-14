import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ShippingDetailsService } from './shipping-details.service';
import { ShippingDetail } from './entities/shipping-detail.entity';
import { CreateShippingDetailInput } from './dto/create-shipping-detail.input';
import { UpdateShippingDetailInput } from './dto/update-shipping-detail.input';

@Resolver(() => ShippingDetail)
export class ShippingDetailsResolver {
  constructor(private readonly shippingDetailsService: ShippingDetailsService) {}

  @Mutation(() => ShippingDetail)
  createShippingDetail(@Args('createShippingDetailInput') createShippingDetailInput: CreateShippingDetailInput) {
    return this.shippingDetailsService.create(createShippingDetailInput);
  }

  @Query(() => [ShippingDetail], { name: 'shippingDetails' })
  findAll() {
    return this.shippingDetailsService.findAll();
  }

  @Query(() => ShippingDetail, { name: 'shippingDetail' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.shippingDetailsService.findOne(id);
  }

  @Mutation(() => ShippingDetail)
  updateShippingDetail(@Args('updateShippingDetailInput') updateShippingDetailInput: UpdateShippingDetailInput) {
    return this.shippingDetailsService.update(updateShippingDetailInput.id, updateShippingDetailInput);
  }

  @Mutation(() => ShippingDetail)
  removeShippingDetail(@Args('id', { type: () => Int }) id: number) {
    return this.shippingDetailsService.remove(id);
  }
}
