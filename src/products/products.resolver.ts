import { Resolver, Query, Mutation, Args, Int, Info } from '@nestjs/graphql';
import { ProductsService } from './products.service';
import { Product } from './entities/product.entity';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { GraphQLResolveInfo } from 'graphql';
import { Prisma } from '@prisma/client';
import { FilterProductInput } from './dto/filter-product.input';

@Resolver(() => Product)
export class ProductsResolver {
  constructor(private readonly productsService: ProductsService) {}

  @Mutation(() => Product)
  createProduct(
    @Args('createProductInput') createProductInput: CreateProductInput,
    @Info() info: GraphQLResolveInfo,
  ) {
    return this.productsService.create(createProductInput, info);
  }

  @Query(() => [Product], { name: 'products' })
  findAll(
    @Info() info: GraphQLResolveInfo,
    @Args('filterProductInput', { nullable: true }) filter: FilterProductInput,
  ) {
    return this.productsService.findAll(info, filter);
  }

  @Query(() => Product, { name: 'product', nullable: true })
  findOne(
    @Info() info: GraphQLResolveInfo,
    @Args('id', { type: () => String, nullable: true }) id: string,
    @Args('slug', { type: () => String, nullable: true }) slug: string,
  ) {
    return this.productsService.findOne(info, id, slug);
  }

  @Mutation(() => Product)
  updateProduct(
    @Args('updateProductInput') updateProductInput: UpdateProductInput,
    @Info() info: GraphQLResolveInfo,
  ) {
    return this.productsService.update(
      updateProductInput.id,
      updateProductInput,
      info,
    );
  }

  @Mutation(() => Product)
  removeProduct(@Args('id', { type: () => String }) id: string) {
    return this.productsService.remove(id);
  }
}
