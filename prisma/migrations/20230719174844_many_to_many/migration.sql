/*
  Warnings:

  - You are about to drop the column `productVariantId` on the `ProductOption` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "ProductOption" DROP CONSTRAINT "ProductOption_productVariantId_fkey";

-- AlterTable
ALTER TABLE "ProductOption" DROP COLUMN "productVariantId";

-- CreateTable
CREATE TABLE "_ProductOptionToProductVariant" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ProductOptionToProductVariant_AB_unique" ON "_ProductOptionToProductVariant"("A", "B");

-- CreateIndex
CREATE INDEX "_ProductOptionToProductVariant_B_index" ON "_ProductOptionToProductVariant"("B");

-- AddForeignKey
ALTER TABLE "_ProductOptionToProductVariant" ADD CONSTRAINT "_ProductOptionToProductVariant_A_fkey" FOREIGN KEY ("A") REFERENCES "ProductOption"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductOptionToProductVariant" ADD CONSTRAINT "_ProductOptionToProductVariant_B_fkey" FOREIGN KEY ("B") REFERENCES "ProductVariant"("id") ON DELETE CASCADE ON UPDATE CASCADE;
