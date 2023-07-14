import { ObjectType, Field, Int, ID } from '@nestjs/graphql';

@ObjectType()
export class Asset {
  @Field(() => ID, { description: 'asset Id' })
  id: string;
  @Field(() => String, { description: 'asset url' })
  url: string;

  @Field(() => Int, { description: 'asset position' })
  postion: number;
}
