import { Injectable } from '@nestjs/common';
import { CreateProductOptionInput } from './dto/create-product-option.input';
import { UpdateProductOptionInput } from './dto/update-product-option.input';

@Injectable()
export class ProductOptionsService {
  create(createProductOptionInput: CreateProductOptionInput) {
    return 'This action adds a new productOption';
  }

  findAll() {
    return `This action returns all productOptions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} productOption`;
  }

  update(id: number, updateProductOptionInput: UpdateProductOptionInput) {
    return `This action updates a #${id} productOption`;
  }

  remove(id: number) {
    return `This action removes a #${id} productOption`;
  }
}
