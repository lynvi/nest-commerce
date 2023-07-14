import { Injectable } from '@nestjs/common';
import { CreateShippingDetailInput } from './dto/create-shipping-detail.input';
import { UpdateShippingDetailInput } from './dto/update-shipping-detail.input';

@Injectable()
export class ShippingDetailsService {
  create(createShippingDetailInput: CreateShippingDetailInput) {
    return 'This action adds a new shippingDetail';
  }

  findAll() {
    return `This action returns all shippingDetails`;
  }

  findOne(id: number) {
    return `This action returns a #${id} shippingDetail`;
  }

  update(id: number, updateShippingDetailInput: UpdateShippingDetailInput) {
    return `This action updates a #${id} shippingDetail`;
  }

  remove(id: number) {
    return `This action removes a #${id} shippingDetail`;
  }
}
