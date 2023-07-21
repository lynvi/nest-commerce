import { Field, ObjectType } from '@nestjs/graphql';
import { Brand } from 'src/brands/entities/brand.entity';
import { Product } from './product.entity';

@ObjectType()
export class SearchResults {
  @Field(() => [Brand], { description: 'brands' })
  brands: Brand[];

  @Field(() => [Product], { description: 'product' })
  products: Brand[];
}
