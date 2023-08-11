/*
  Warnings:

  - You are about to drop the column `slug` on the `ProductVariant` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "price" SET DEFAULT 0,
ALTER COLUMN "salesPrice" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "ProductVariant" DROP COLUMN "slug",
ALTER COLUMN "ref" DROP NOT NULL;
