/*
  Warnings:

  - A unique constraint covering the columns `[name,value]` on the table `ProductOption` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ProductOption_name_value_key" ON "ProductOption"("name", "value");
