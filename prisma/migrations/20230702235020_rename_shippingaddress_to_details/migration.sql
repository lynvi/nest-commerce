/*
  Warnings:

  - You are about to drop the `ShippingAddress` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ShippingAddress" DROP CONSTRAINT "ShippingAddress_userId_fkey";

-- DropTable
DROP TABLE "ShippingAddress";

-- CreateTable
CREATE TABLE "ShippingDetail" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "default" BOOLEAN DEFAULT false,
    "city" TEXT,
    "country" TEXT,
    "zipCode" TEXT,
    "streetAddress" TEXT,
    "phoneNumber" TEXT,
    "firstName" TEXT,
    "lastName" TEXT,
    "email" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ShippingDetail_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ShippingDetail" ADD CONSTRAINT "ShippingDetail_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
