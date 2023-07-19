import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ProductOptionsService } from './product-options.service';
import { ProductOption } from './entities/product-option.entity';
import { CreateProductOptionInput } from './dto/create-product-option.input';
import { UpdateProductOptionInput } from './dto/update-product-option.input';

@Resolver(() => ProductOption)
export class ProductOptionsResolver {
  constructor(private readonly productOptionsService: ProductOptionsService) {}

  @Mutation(() => ProductOption)
  createProductOption(@Args('createProductOptionInput') createProductOptionInput: CreateProductOptionInput) {
    return this.productOptionsService.create(createProductOptionInput);
  }

  @Query(() => [ProductOption], { name: 'productOptions' })
  findAll() {
    return this.productOptionsService.findAll();
  }

  @Query(() => ProductOption, { name: 'productOption' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.productOptionsService.findOne(id);
  }

  @Mutation(() => ProductOption)
  updateProductOption(@Args('updateProductOptionInput') updateProductOptionInput: UpdateProductOptionInput) {
    return this.productOptionsService.update(updateProductOptionInput.id, updateProductOptionInput);
  }

  @Mutation(() => ProductOption)
  removeProductOption(@Args('id', { type: () => Int }) id: number) {
    return this.productOptionsService.remove(id);
  }
}
