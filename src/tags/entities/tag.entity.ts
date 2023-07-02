import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Product } from 'src/products/entities/product.entity';

@ObjectType()
export class Tag {
  @Field(() => ID, { description: 'Tag ID' })
  id: string;

  @Field(() => String, { description: 'Tag name' })
  name: string;

  @Field(() => [Product], { description: 'Tag name', nullable: true })
  products?: Product[];
}
