import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateCollectionInput {
  @Field(() => String, { description: 'collection name' })
  name: string;

  @Field(() => String, { description: 'collection parent id', nullable: true })
  parentId: string;

  @Field(() => Int, {
    description: 'collection parent id',
    nullable: true,
    defaultValue: 0,
  })
  position: number;

  @Field(() => String, { description: 'collection desc', nullable: true })
  description: string;

  @Field(() => String, { description: 'collection slug', nullable: false })
  slug: string;
}
