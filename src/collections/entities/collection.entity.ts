import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Product } from 'src/products/entities/product.entity';

@ObjectType()
export class Collection {
  @Field(() => ID, { description: 'collection id' })
  id: string;

  @Field(() => String, { description: 'collection name' })
  name: string;

  @Field(() => String, { description: 'collection slug' })
  slug: string;

  @Field(() => Int, { description: 'collection position' })
  position: number;

  @Field(() => String, { description: 'collection desc' })
  description: string;

  @Field(() => Collection, { description: 'Parent collection', nullable: true })
  parent?: Collection;

  @Field(() => [Collection], {
    description: 'Collection childs',
    nullable: true,
  })
  children?: Collection[];

  @Field(() => [Product], { description: 'collection products' })
  products: Product[];
}
