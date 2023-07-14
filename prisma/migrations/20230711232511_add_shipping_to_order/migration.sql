-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "shippingDetailId" TEXT;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_shippingDetailId_fkey" FOREIGN KEY ("shippingDetailId") REFERENCES "ShippingDetail"("id") ON DELETE SET NULL ON UPDATE CASCADE;
