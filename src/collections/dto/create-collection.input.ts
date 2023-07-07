import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateCollectionInput {
  @Field(() => String, { description: 'collection name' })
  name: string;

  @Field(() => String, { description: 'collection desc', nullable: true })
  description: string;

  @Field(() => String, { description: 'collection slug', nullable: false })
  slug: string;
}
