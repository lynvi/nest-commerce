import { ObjectType, Field, Int, ID } from '@nestjs/graphql';

@ObjectType()
export class ShippingDetail {
  @Field(() => ID, { description: 'id', nullable: true })
  id: string;

  @Field(() => String, { description: 'city', nullable: true })
  city: string;

  @Field(() => String, { description: 'contry', nullable: true })
  country: string;

  @Field(() => String, { description: 'postal code', nullable: true })
  zipCode: string;

  @Field(() => String, { description: 'street Address', nullable: true })
  streetAddress: string;

  @Field(() => String, { description: 'phone ', nullable: true })
  phoneNumber: string;

  @Field(() => Boolean, {
    description: 'is default shipping address ',
    nullable: true,
  })
  default: boolean;
}

// user          User     @relation(fields: [userId], references: [id])
// userId        String
// default       Boolean? @default(false)
// city          String?
// country       String?
// zipCode       String?
// streetAddress String?
// phoneNumber   String?
// firstName     String?
// lastName      String?
// email         String?
// orders        Order[]
