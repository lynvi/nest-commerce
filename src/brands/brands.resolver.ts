import { Resolver, Query, Mutation, Args, Int, Info } from '@nestjs/graphql';
import { BrandsService } from './brands.service';
import { Brand } from './entities/brand.entity';
import { CreateBrandInput } from './dto/create-brand.input';
import { UpdateBrandInput } from './dto/update-brand.input';
import { GraphQLResolveInfo } from 'graphql';

@Resolver(() => Brand)
export class BrandsResolver {
  constructor(private readonly brandsService: BrandsService) {}

  @Mutation(() => Brand)
  createBrand(@Args('createBrandInput') createBrandInput: CreateBrandInput) {
    return this.brandsService.create(createBrandInput);
  }

  @Query(() => [Brand], { name: 'brands' })
  findAll(@Info() info: GraphQLResolveInfo) {
    return this.brandsService.findAll(info);
  }

  @Query(() => Brand, { name: 'brand' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.brandsService.findOne(id);
  }

  @Mutation(() => Brand)
  updateBrand(
    @Args('id', { type: () => String }) id: string,
    @Args('updateBrandInput') updateBrandInput: UpdateBrandInput,
  ) {
    return this.brandsService.update(id, updateBrandInput);
  }

  @Mutation(() => Brand)
  removeBrand(@Args('id', { type: () => String }) id: string) {
    return this.brandsService.remove(id);
  }
}
