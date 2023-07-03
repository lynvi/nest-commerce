import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field(() => String, { description: '', nullable: true })
  firstName: string;

  @Field(() => String, { description: '', nullable: true })
  lastName: string;

  @Field(() => String, { description: '' })
  email: string;

  @Field(() => Boolean, { description: '', nullable: true })
  isGuest: boolean;

  @Field(() => String, { description: '', nullable: true })
  phone: string;
}

// id              String           @id @default(cuid())
// firstName       String?
// lastName        String?
// password        String?
// isGuest         Boolean          @default(true)
// orders          Order[]
// shippingDetails ShippingDetail[]
// phone           String?          @unique
// email           String?          @unique
// wishList        Wishlist?        @relation(fields: [wishlistId], references: [id])
// wishlistId      String?          @unique

// createdAt DateTime @default(now())
// updatedAt DateTime @updatedAt
