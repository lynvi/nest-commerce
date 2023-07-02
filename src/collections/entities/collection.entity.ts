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

  @Field(() => [Product], { description: 'collection products' })
  products: Product[];
}
