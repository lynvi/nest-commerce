import { Resolver, Query, Mutation, Args, Int, Info } from '@nestjs/graphql';
import { CollectionsService } from './collections.service';
import { Collection } from './entities/collection.entity';
import { CreateCollectionInput } from './dto/create-collection.input';
import { UpdateCollectionInput } from './dto/update-collection.input';
import { GraphQLResolveInfo } from 'graphql';

@Resolver(() => Collection)
export class CollectionsResolver {
  constructor(private readonly collectionsService: CollectionsService) {}

  @Mutation(() => Collection)
  createCollection(
    @Args('createCollectionInput') createCollectionInput: CreateCollectionInput,
  ) {
    return this.collectionsService.create(createCollectionInput);
  }

  @Query(() => [Collection], { name: 'collections' })
  findAll(@Info() info: GraphQLResolveInfo) {
    return this.collectionsService.findAll(info);
  }

  @Query(() => Collection, { name: 'collection', nullable: true })
  findOne(
    @Info() info: GraphQLResolveInfo,
    @Args('id', { type: () => String, nullable: true }) id: string,
    @Args('slug', { type: () => String, nullable: true }) slug: string,
  ) {
    return this.collectionsService.findOne(info, id, slug);
  }

  @Mutation(() => Collection)
  updateCollection(
    @Args('updateCollectionInput') updateCollectionInput: UpdateCollectionInput,
  ) {
    return this.collectionsService.update(
      updateCollectionInput.id,
      updateCollectionInput,
    );
  }

  @Mutation(() => Collection)
  removeCollection(@Args('id', { type: () => Int }) id: number) {
    return this.collectionsService.remove(id);
  }
}
