import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateBrandInput {
  @Field(() => String, { description: 'Brand name' })
  name: string;

  @Field(() => String, { description: 'Brand description' })
  description: string;

  @Field(() => String, { description: 'Brand logo' })
  logo: string;

  @Field(() => String, { description: 'Brand website' })
  website: string;

  @Field(() => String, { description: 'Brand slug' })
  slug: string;
}
