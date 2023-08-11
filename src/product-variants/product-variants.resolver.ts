import { Resolver, Query, Mutation, Args, Int, ID } from '@nestjs/graphql';
import { ProductVariantsService } from './product-variants.service';
import { ProductVariant } from './entities/product-variant.entity';
import { CreateProductVariantInput } from './dto/create-product-variant.input';
import {
  AssignProductOptionToProductVariantInput,
  UpdateProductVariantInput,
} from './dto/update-product-variant.input';

@Resolver(() => ProductVariant)
export class ProductVariantsResolver {
  constructor(
    private readonly productVariantsService: ProductVariantsService,
  ) {}

  @Mutation(() => ProductVariant)
  createProductVariant(
    @Args('createProductVariantInput')
    createProductVariantInput: CreateProductVariantInput,
  ) {
    return this.productVariantsService.create(createProductVariantInput);
  }

  @Query(() => [ProductVariant], { name: 'productVariants' })
  findAll() {
    return this.productVariantsService.findAll();
  }

  @Query(() => ProductVariant, { name: 'productVariant' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.productVariantsService.findOne(id);
  }

  @Mutation(() => ProductVariant)
  updateProductVariant(
    @Args('updateProductVariantInput')
    updateProductVariantInput: UpdateProductVariantInput,
  ) {
    return this.productVariantsService.update(
      updateProductVariantInput.id,
      updateProductVariantInput,
    );
  }

  @Mutation(() => ProductVariant)
  removeProductVariant(@Args('id', { type: () => ID }) id: string) {
    return this.productVariantsService.remove(id);
  }

  @Mutation(() => ProductVariant)
  assignProductOptionToProductVariant(
    @Args('assignProductOptionToProductVariantInput')
    updateProductInput: AssignProductOptionToProductVariantInput,
  ) {
    const { productOptionId, productVariantId } = updateProductInput;
    return this.productVariantsService.assignProductOptionToProductVariant(
      productOptionId,
      productVariantId,
    );
  }
}
