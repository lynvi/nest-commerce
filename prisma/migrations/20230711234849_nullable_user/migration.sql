-- DropForeignKey
ALTER TABLE "ShippingDetail" DROP CONSTRAINT "ShippingDetail_userId_fkey";

-- AlterTable
ALTER TABLE "ShippingDetail" ALTER COLUMN "userId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "ShippingDetail" ADD CONSTRAINT "ShippingDetail_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
