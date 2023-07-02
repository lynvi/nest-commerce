/*
  Warnings:

  - Added the required column `price` to the `ProductVariant` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Collection" ALTER COLUMN "description" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "image" TEXT;

-- AlterTable
ALTER TABLE "ProductVariant" ADD COLUMN     "image" TEXT,
ADD COLUMN     "price" INTEGER NOT NULL;
