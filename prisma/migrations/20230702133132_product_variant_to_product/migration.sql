/*
  Warnings:

  - You are about to drop the column `stockLevel` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "stockLevel";

-- AlterTable
ALTER TABLE "ProductVariant" ADD COLUMN     "productId" TEXT,
ADD COLUMN     "stockLevel" INTEGER NOT NULL DEFAULT 1;

-- AddForeignKey
ALTER TABLE "ProductVariant" ADD CONSTRAINT "ProductVariant_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;
