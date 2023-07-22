-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "salesPrice" INTEGER;

-- AlterTable
ALTER TABLE "ProductVariant" ADD COLUMN     "salesPrice" INTEGER,
ALTER COLUMN "name" DROP NOT NULL,
ALTER COLUMN "description" DROP NOT NULL;
