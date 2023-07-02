/*
  Warnings:

  - A unique constraint covering the columns `[orderId,productVariantId]` on the table `OrderLine` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "OrderLine_orderId_productVariantId_key" ON "OrderLine"("orderId", "productVariantId");
