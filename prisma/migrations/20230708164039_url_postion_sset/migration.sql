/*
  Warnings:

  - You are about to drop the column `preview` on the `Asset` table. All the data in the column will be lost.
  - You are about to drop the column `source` on the `Asset` table. All the data in the column will be lost.
  - Added the required column `url` to the `Asset` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Asset" DROP COLUMN "preview",
DROP COLUMN "source",
ADD COLUMN     "position" INTEGER DEFAULT 0,
ADD COLUMN     "url" TEXT NOT NULL;
